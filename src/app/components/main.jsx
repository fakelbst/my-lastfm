import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ArtistIcon from 'material-ui/lib/svg-icons/social/person';
import AlbumIcon from 'material-ui/lib/svg-icons/device/wallpaper';
import TrackIcon from 'material-ui/lib/svg-icons/av/queue-music';
import IconButton from 'material-ui/lib/icon-button'
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import TracksModule from './tracks'
import AlbumsModule from './albums'
import ArtistsModule from './artists'

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
    else if(this.state.method === 'artists'){
      content = <ArtistsModule />
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
