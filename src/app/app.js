import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Main from './components/main'
import configureStore from './store/configureStore'

const store = configureStore()

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
)
