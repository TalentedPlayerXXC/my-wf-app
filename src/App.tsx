import React, { useReducer, Reducer, useState, useEffect } from 'react';
import { Menu, Switch } from 'antd'
import type { MenuProps, MenuTheme } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import Router from './router';
import ThemeContext from './store';
import { StateType, Actions } from './types'
import { RenderCycle } from './utils';
import logo from './logo.png'
import styles from './App.module.css';
type MenuItem = Required<MenuProps>['items'][number];
// style={{ background: 'rgb(0, 21, 41)' }} 夜间配色方案
// background: rgba(230, 218, 218, 0.1); 白天方案
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
  scriptUrl: '//at.alicdn.com/t/c/font_4331933_mpwceba06n.js',
});
const items: MenuItem[] = [
  getItem('信息总览', 'home', <IconFont type="icon-shishixinxi" />),
  getItem('突击', 'sortie'),
  getItem('仲裁', 'arbitration'),
  getItem('平原', 'sub4'),
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
  const [selectKey, setSelectKey] = useState('home')
  const [states, dispatch] = useReducer(reducerAction, { theme: 'light' });
  // 通过选择 菜单操作切换路由
  const changeSelectKey = (e: any) => {
    setSelectKey(e?.key)
    navigate(`/${e?.key}`, { replace: true })

  }
  // useEffect(() => {
  //   earthCycle()
  //     .then((res: any) => console.log(res?.data?.timeLeft, 'shuju'))
  //     .catch(err => console.error('似乎出现问题了？', err))
  // }, [])
  //   <span style={{ marginLeft: 10 }}>
  //   地球(白昼)
  //   <p>1:00:00</p>
  // </span>
  return (
    <ThemeContext.Provider value={{ theme: states?.theme, dispatch: dispatch }}>
      <div className={styles.App}>

        <header className={styles.header}>
          <img src={logo} style={{ height: 40, marginLeft: 10, verticalAlign: 'middle' }} alt="wf" />
          <div className={styles.cycleTime}>
            {/*
           earthCycle  地球时间
           cetusCycle 地球平原时间
           vallisCycle  金星平原时间
           cambionCycle 火卫二平原时间
          */}
            <RenderCycle cycle="earthCycle" />
            <RenderCycle cycle="cetusCycle" />
            <RenderCycle cycle="vallisCycle" />
            <RenderCycle cycle="cambionCycle" />
          </div>
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
