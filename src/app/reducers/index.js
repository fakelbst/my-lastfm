import { combineReducers } from 'redux'
import { SET_USER, RECEIVE_USER_INFO, SET_PERIOD, REQUEST_DATAS, RECEIVE_TOP_ARTISTS, RECEIVE_TOP_TRACKS, RECEIVE_TOP_ALBUMS, RECEIVE_RECENT_TRACKS, METHOD_TOP_TRACKS } from '../actions'

function user(state = {name: 'fakelbst', avatar: ''}, action){
  switch (action.type) {
    case SET_USER:
    case RECEIVE_USER_INFO:
      return {
        name: action.name,
        avatar: action.avatar
      }
    default:
      return state
  }
}

function period(state = 'overall', action){
  switch (action.type) {
    case SET_PERIOD:
      return action.period
    default:
      return state
  }
}

function method(state = METHOD_TOP_TRACKS, action){
  switch (action.type) {
    case 'SET_METHOD':
      return action.method
    default:
      return state
  }
}

function datas(state = {
  isFetching: false,
  items: []
}, action){
  switch (action.type){
    case REQUEST_DATAS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_TOP_ARTISTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.datas
      })
    case RECEIVE_TOP_ALBUMS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.datas
      })
    case RECEIVE_TOP_TRACKS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.datas
      })
    case RECEIVE_RECENT_TRACKS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.datas
      })
    default:
      return state
  }
}

function datasByMethods(state = { }, action) {
  switch (action.type) {
    case RECEIVE_TOP_ARTISTS:
    case RECEIVE_TOP_TRACKS:
    case RECEIVE_TOP_ALBUMS:
    case RECEIVE_RECENT_TRACKS:
      return Object.assign({}, state, {
        [action.method]: datas(state[action.method], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user,
  method,
  period,
  datasByMethods
})

export default rootReducer

