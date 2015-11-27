import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ArtistIcon from 'material-ui/lib/svg-icons/social/person';
import AlbumIcon from 'material-ui/lib/svg-icons/device/wallpaper';
import TrackIcon from 'material-ui/lib/svg-icons/av/queue-music';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import Colors from 'material-ui/lib/styles/colors';
import TracksModule from './tracks'
import AlbumsModule from './albums'
import ArtistsModule from './artists'
import RecentTracksModule from './recent-tracks'

const periodItems = [
  { payload: '1', text: 'Overall' },
  { payload: '2', text: '12 months' },
  { payload: '3', text: '6 months' },
  { payload: '4', text: '3 months' },
  { payload: '5', text: '1 months' },
  { payload: '6', text: '7 days' },
];

const Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState () {
    return {
      period: 'overall',
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

    let content = <TracksModule period={this.state.period}/>;
    if(this.state.method === 'tracks'){
      content = <div>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup key={0} float="left">
            <DropDownMenu menuItems={periodItems} onChange={this._handlePeriod}/>
          </ToolbarGroup>
        </Toolbar>
        <TracksModule period={this.state.period} />;
      </div>
    }
    else if(this.state.method === 'albums'){
      content = <div>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup key={0} float="left">
            <DropDownMenu menuItems={periodItems} onChange={this._handlePeriod}/>
          </ToolbarGroup>
        </Toolbar>
        <AlbumsModule period={this.state.period} />
      </div>
    }
    else if(this.state.method === 'artists'){
      content = <div>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup key={0} float="left">
            <DropDownMenu menuItems={periodItems} onChange={this._handlePeriod}/>
          </ToolbarGroup>
        </Toolbar>
        <ArtistsModule period={this.state.period} />
      </div>
    }
    else if(this.state.method === 'rtracks'){
      content = <RecentTracksModule />
    }

    return (
      <div>
        <LeftNav ref="leftNavChildren" style={styles.leftmenu}>
          <MenuItem index={0} leftIcon={<TrackIcon />} onClick={this._handleContent.bind(this,0)} >Top tracks</MenuItem>
          <MenuItem index={1} leftIcon={<AlbumIcon />} onClick={this._handleContent.bind(this,1)} >Top albums</MenuItem>
          <MenuItem index={2} leftIcon={<ArtistIcon />} onClick={this._handleContent.bind(this,2)} >Top artists</MenuItem>
          <MenuItem index={2} leftIcon={<TrackIcon />} onClick={this._handleContent.bind(this,3)} >Rcent tracks</MenuItem>
        </LeftNav>
        <div style={styles.content}>
          {content}
        </div>
      </div>
    );
  },

  _handlePeriod(e, index, menuItem) {
    let value = '';
    switch (menuItem.payload) {
      case '1':
        value = 'overall';
        break;
      case '2':
        value = '12month';
        break;
      case '3':
        value = '6month';
        break;
      case '4':
        value = '3month';
        break;
      case '5':
        value = '1month';
        break;
      case '6':
        value = '7day';
        break;
    }
    this.setState({period: value});
  },

  _handleContent(index) {
    let keyArray = ['tracks', 'albums', 'artists', 'rtracks'];
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
  toolbar: {
    background: '#fff',
  },
}

module.exports = Main;
