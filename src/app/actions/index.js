import fetch from 'isomorphic-fetch'

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
    type: 'SET_USER',
    user
  }
}

export function setMethod(method){
  return {
    type: 'SET_METHOD',
    method
  }
}

function receiveTopAlbums(user, json){
  return {
    type: RECEIVE_TOP_ALBUMS,
    user: user,
    method: METHOD_TOP_ALBUMS,
    datas: json.topalbums.album
  }
}

function receiveTopTracks(user, json){
  return {
    type: RECEIVE_TOP_TRACKS,
    user: user,
    method: METHOD_TOP_TRACKS,
    datas: json.toptracks.track
  }
}

function receiveRecentTracks(user, json){
  return {
    type: RECEIVE_RECENT_TRACKS,
    user: user,
    method: METHOD_RECENT_TRACKS,
    datas: json.recenttracks.track
  }
}

function receiveTopArtists(user, json){
  return {
    type: RECEIVE_TOP_ARTISTS,
    user: user,
    method: 'user.gettopartists',
    datas: json.topartists.artist
  }
}

function requestDatas(user) {
  return {
    type: REQUEST_DATAS,
    user
  }
}

function fetchTopTracks(user, method) {
  return dispatch => {
    dispatch(requestDatas(user, method))
    return fetch(`http://ws.audioscrobbler.com/2.0/?format=json&api_key=4dff88a0423651b3570253b10b745b2c&user=${user}&method=${method}`)
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

export function fetchDatas(user, method) {
  return (dispatch) => {
    return dispatch(fetchTopTracks(user, method))
  }
}
