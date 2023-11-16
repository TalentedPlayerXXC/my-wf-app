import axios from 'axios'
// axios.defaults.proxy = {
//     host: 'http://127.0.0.1:3001',
//     port: 3001,
//   };
const request = axios.create({
    baseURL: 'http://127.0.0.1:3001/',
    // headers: {
    //     'Access-Control-Allow-Origin': '*'
    // },

})
export default request