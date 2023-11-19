import React, { useReducer, Reducer, useState, useEffect } from 'react';
import { Menu, Switch } from 'antd'
import type { MenuProps, MenuTheme } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import Router from './router';
import ThemeContext from './store';
import { StateType, Actions } from './types'
import RenderCycle from './component/RenderCycle';
import logo from './logo.png'
import styles from './App.module.css';
type MenuItem = Required<MenuProps>['items'][number];
// rgb(0, 21, 41)' }} 夜间配色方案
// rgba(230, 218, 218, 0.1); 白天方案
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: [],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4331933_1tn7queh4jkj.js',
});
const items: MenuItem[] = [
  getItem('信息总览', 'overview', <IconFont type="icon-shishixinxi" />),
  getItem('warframeMarket', 'wm', <IconFont type="icon-shichang" />),
  // getItem('仲裁', 'arbitration', <IconFont type="icon-shishixinxi" />),
  // getItem('平原', 'sub4', <IconFont type="icon-shishixinxi" />),
];
function App() {
  const navigate = useNavigate()
  const reducerAction: Reducer<StateType, Actions> = (
    state,
    action,
  ) => {
    switch (action.type) {
      case 'theme':
        return { ...state, theme: action.payload };
      default:
        return state;
    }
  };
  const [selectKey, setSelectKey] = useState('overview')
  const [width, setWidth] = useState(0)
  const [states, dispatch] = useReducer(reducerAction, { theme: 'light', platform: window.navigator?.userAgent.toLowerCase()?.includes('windows') || false });
  // 通过选择 菜单操作切换路由
  const changeSelectKey = (e: any) => {
    setSelectKey(e?.key)
    navigate(`/${e?.key}`, { replace: true })

  }
  const resizeUpdate = (e: any) => {
    // 通过事件对象获取浏览器窗口的高度
    let h = e?.target?.innerWidth;
    setWidth(h);
  };

  useEffect(() => {
    // TODO:高度监控
    let h = window.innerWidth;
    setWidth(h)
    window.addEventListener('resize', resizeUpdate)
    return () => { window.removeEventListener('resize', resizeUpdate) }
  }, [])
  return (
    <ThemeContext.Provider value={{ theme: states?.theme, platform: states?.platform, dispatch: dispatch }}>
      <div className={styles.App} style={{ background: states?.theme === 'light' ? 'rgba(230, 218, 218, 0.1)' : 'rgb(0, 21, 41)' }}>
        <header className={styles.header}>
          <img src={logo} style={{ width: '20%', minWidth: 200, maxWidth: '300px', marginLeft: 10, verticalAlign: 'middle' }} alt="wf" />
          {
            width > 900 &&
            <div className={styles.cycleTime}>
              <RenderCycle cycle="earthCycle" />
              <RenderCycle cycle="cetusCycle" />
              <RenderCycle cycle="vallisCycle" />
              <RenderCycle cycle="cambionCycle" />
              <RenderCycle cycle="zarimanCycle" />
            </div>
          }
          <Switch
            style={{ marginRight: '50px' }}
            checked={states?.theme === 'dark'}
            checkedChildren={<IconFont type="icon-ansemoshi" />}
            unCheckedChildren={<IconFont type="icon-baitianmoshi1" />}
            onChange={() => dispatch({ type: 'theme', payload: states?.theme === 'light' ? 'dark' : 'light' })}
          />
        </header>
        <div style={{ display: 'flex' }}>
          <Menu
            onClick={changeSelectKey}
            selectedKeys={[selectKey]}
            style={{ height: 'calc(100vh - 60px)', background: 'rgba(250, 250, 250, 0.2)', textAlign: 'center' }}
            theme={states?.theme as MenuTheme}
            mode='inline'
            inlineCollapsed={true}
            items={items}
          />
          <Router />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
