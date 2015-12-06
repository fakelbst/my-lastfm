import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Main from './components/main'
import configureStore from './store/configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin'

const store = configureStore()

injectTapEventPlugin();

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
)
