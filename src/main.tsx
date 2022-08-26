import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './common/index.css'
// 引入游戏配置
import option from './config/gameConfig'
// 引入antd ui框架css主题样式
import 'antd/dist/antd.css'

ReactDOM.createRoot(document.getElementById('root')!).render( <App {...option}/> )
