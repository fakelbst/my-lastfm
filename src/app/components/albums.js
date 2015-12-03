import React, { Component, PropTypes } from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import Loading from './loading'
import {BASE_URL, DEFAULT_USER, DEFAULT_LIMIT, DEFAULT_METHOD} from './api';

export default class Albums extends Component{
  render() {
    return (
      <div>
        <GridList cols={6}>
          {this.props.datas.map(tile => <GridTile
            title={tile.name}
            subtitle={<span><b>{tile.artist['name']}</b></span>}
            ><img src={tile.image[3]['#text']} /></GridTile>
          )}
        </GridList>
      </div>
    )
  }
}


