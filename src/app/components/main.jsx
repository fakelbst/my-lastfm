import React from 'react';
const RaisedButton = require('material-ui/lib/raised-button');
const LeftNav = require('material-ui/lib/left-nav');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MenuDivider = require('material-ui/lib/menus/menu-divider');
import ArtistIcon from 'material-ui/lib/svg-icons/social/person';
import AlbumIcon from 'material-ui/lib/svg-icons/device/wallpaper';
import TrackIcon from 'material-ui/lib/svg-icons/av/queue-music';
const ArrowDropRight = require('material-ui/lib/svg-icons/av/play-arrow');
import IconButton from 'material-ui/lib/icon-button'
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const Colors = require('material-ui/lib/styles/colors');

import TracksModule from './tracks'
import AlbumsModule from './albums'

const Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500,
    });

    this.setState({muiTheme: newMuiTheme});
  },

  render() {

    let content = <TracksModule />;
    if(this.state.method === 'tracks'){
      content = <TracksModule />;
    }
    else if(this.state.method === 'albums'){
      content = <AlbumsModule />
    }

    return (
      <div>
        <LeftNav ref="leftNavChildren" style={styles.leftmenu}>
          <MenuItem index={0} leftIcon={<TrackIcon />} onClick={this._handleContent.bind(this,0)} >Top tracks</MenuItem>
          <MenuItem index={1} leftIcon={<AlbumIcon />} onClick={this._handleContent.bind(this,1)} >Top albums</MenuItem>
          <MenuItem index={2} leftIcon={<ArtistIcon />} onClick={this._handleContent.bind(this,2)} >Top artists</MenuItem>
        </LeftNav>
        <div style={styles.content}>
         {content}
        </div>
      </div>
    );
  },

  _handleContent(index) {
    let keyArray = ['tracks', 'albums', 'artists'];
    this.setState({method: keyArray[index]});
  },

});

const styles = {
  leftmenu: {
    width: '240px',
  },
  content: {
    paddingLeft: '240px',
  },
}

module.exports = Main;
