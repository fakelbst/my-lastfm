import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import {BASE_URL, DEFAULT_USER, DEFAULT_LIMIT, DEFAULT_METHOD} from './api';

const Albums = React.createClass({

  getInitialState () {
    return {
      albums: [],
      loaded: false,
    };
  },

  componentDidMount() {
    this.fetchDate();
  },

  fetchDate() {
      let url = BASE_URL + '&user=' + DEFAULT_USER + '&method=' + 'user.gettopalbums';
      fetch(url).then((response) => {
        return response.json()
      }).then((json) => {
        console.log('parsed json', json)
        this.setState({
          albums: json.topalbums.album,
          loaded: true,
        });
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
  },

  renderLoadingView() {

    let containerStyle = {
      textAlign: 'center',
      paddingTop: '200px',
    };

    return (
      <div style={containerStyle}>
        <CircularProgress mode="indeterminate" />
      </div>
    )
  },

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    let datas = this.state.albums;
    return (
      <div>
        <GridList cols={6}>
          {datas.map(tile => <GridTile
            title={tile.name}
            subtitle={<span><b>{tile.artist['name']}</b></span>}
            ><img src={tile.image[3]['#text']} /></GridTile>
          )}
        </GridList>
      </div>
    )
  },
});

module.exports = Albums;

