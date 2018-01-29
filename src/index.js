import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'

ReactDOM.render((
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  ), document.getElementById('root'))
registerServiceWorker();