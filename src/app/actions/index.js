import fetch from 'isomorphic-fetch'
import {BASE_URL, API_KEY } from '../components/api'

export const SET_USER = 'SET_USER'
export const SET_METHOD = 'SET_METHOD'
export const SET_PERIOD = 'SET_PERIOD'

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'
export const REQUEST_DATAS = 'REQUEST_DATAS'
export const RECEIVE_TOP_ARTISTS = 'RECEIVE_TOP_ARTISTS'
export const RECEIVE_TOP_TRACKS = 'RECEIVE_TOP_TRACKS'
export const RECEIVE_TOP_ALBUMS = 'RECEIVE_TOP_ALBUMS'
export const RECEIVE_RECENT_TRACKS = 'RECEIVE_RECENT_TRACKS'
export const METHOD_TOP_ARTISTS = 'user.gettopartists'
export const METHOD_TOP_TRACKS = 'user.gettoptracks'
export const METHOD_TOP_ALBUMS = 'user.gettopalbums'
export const METHOD_RECENT_TRACKS = 'user.getrecenttracks'

export function setUser(user){
  return {
    type: SET_USER,
    name: user.name,
    avatar: user.avatar
  }
}

export function setMethod(method){
  return {
    type: SET_METHOD,
    method
  }
}

export function setPeriod(period){
  return {
    type: SET_PERIOD,
    period
  }
}

function requestUserInfo(user){
  return {
    type: REQUEST_USER_INFO,
    user
  }
}

function fetchUserInfos(user){
  return dispatch => {
    dispatch(requestUserInfo(user))
    return fetch(BASE_URL + '&api_key=' + API_KEY + '&method=user.getinfo&user=' + user.name)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveUserInfo(json))
      })
  }
}

function receiveUserInfo(json){
  return {
    type: RECEIVE_USER_INFO,
    avatar: json.user.image[3]['#text'],
    name: json.user.name
  }
}

function receiveTopAlbums(user, json){
  return {
    type: RECEIVE_TOP_ALBUMS,
    user,
    method: METHOD_TOP_ALBUMS,
    datas: json.topalbums.album
  }
}

function receiveTopTracks(user, json){
  return {
    type: RECEIVE_TOP_TRACKS,
    user,
    method: METHOD_TOP_TRACKS,
    datas: json.toptracks.track
  }
}

function receiveRecentTracks(user, json){
  return {
    type: RECEIVE_RECENT_TRACKS,
    user,
    method: METHOD_RECENT_TRACKS,
    datas: json.recenttracks.track
  }
}

function receiveTopArtists(user, json){
  return {
    type: RECEIVE_TOP_ARTISTS,
    user,
    method: METHOD_TOP_ARTISTS,
    datas: json.topartists.artist
  }
}

function requestDatas(user) {
  return {
    type: REQUEST_DATAS,
    user
  }
}

function toFetch(user, method, period='') {
  return dispatch => {
    dispatch(requestDatas(user, method))
    return fetch(`http://ws.audioscrobbler.com/2.0/?format=json&api_key=4dff88a0423651b3570253b10b745b2c&user=${user}&method=${method}&period=${period}`)
      .then(response => response.json())
      .then(json => {
        switch (method){
          case METHOD_TOP_ALBUMS:
            dispatch(receiveTopAlbums(user, json))
            break
          case METHOD_TOP_ARTISTS:
            dispatch(receiveTopArtists(user, json))
            break
          case METHOD_TOP_TRACKS:
            dispatch(receiveTopTracks(user, json))
            break
          case METHOD_RECENT_TRACKS:
            dispatch(receiveRecentTracks(user, json))
            break
          default:
            dispatch(receiveTopTracks(user, json))
            break
        }
      })
  }
}

export function fetchDatas(user, method, period='') {
  return (dispatch) => {
    return dispatch(toFetch(user.name, method, period))
  }
}

export function getUserInfo(user){
  return (dispatch) => {
    return dispatch(fetchUserInfos(user))
  }
}

