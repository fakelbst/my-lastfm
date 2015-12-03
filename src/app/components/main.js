import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDatas, setMethod, METHOD_TOP_ARTISTS, METHOD_TOP_TRACKS, METHOD_TOP_ALBUMS, METHOD_RECENT_TRACKS } from '../actions/'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import ArtistIcon from 'material-ui/lib/svg-icons/social/person'
import AlbumIcon from 'material-ui/lib/svg-icons/device/wallpaper'
import TrackIcon from 'material-ui/lib/svg-icons/av/queue-music'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme'
import DropDownMenu from 'material-ui/lib/drop-down-menu'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import TextField from 'material-ui/lib/text-field'
import Colors from 'material-ui/lib/styles/colors'
import Loading from './loading'
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

class Main extends Component {
  constructor(props) {
    super(props)
    // this.handleChange = this.handleChange.bind(this)
    // this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  // childContextTypes: {
  //   muiTheme: React.PropTypes.object,
  // }

  // getInitialState () {
  //   return {
  //     period: 'overall',
  //     muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
  //   };
  // }

  // getChildContext() {
  //   return {
  //     muiTheme: this.state.muiTheme,
  //   };
  // }

  componentDidMount() {
    const { dispatch, user, method } = this.props
    dispatch(fetchDatas(user, method))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.method !== this.props.method) {
      const { dispatch, user, method } = nextProps
      dispatch(fetchDatas(user, method))
    }
  }
  // componentWillMount() {
  //   let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
  //     accent1Color: Colors.deepOrange500,
  //   });

  //   this.setState({muiTheme: newMuiTheme});
  // },

  render() {
    const { user, method, datas, isFetching } = this.props

    let content = <RecentTracksModule datas={datas} />

    if(isFetching){
      content = <Loading />
    }
    else {
      if([METHOD_TOP_TRACKS, METHOD_TOP_ALBUMS, METHOD_TOP_ARTISTS].indexOf(method) !== -1){
        let main = <TracksModule datas={datas} />
        switch (method){
          case METHOD_TOP_TRACKS:
            main = <TracksModule datas={datas} / >
            break
          case METHOD_TOP_ALBUMS:
            main = <AlbumsModule datas={datas} / >
            break
          case METHOD_TOP_ARTISTS:
            main = <ArtistsModule datas={datas} / >
            break
          default:
            main = <TracksModule datas={datas} / >
            break
        }
        content = <div>
          <Toolbar style={styles.toolbar}>
            <ToolbarGroup key={0} float="left">
              <DropDownMenu menuItems={periodItems} onChange={this._handlePeriod}/>
            </ToolbarGroup>
          </Toolbar>
          {main}
        </div>
      }
    }
    
    return (
      <div>
        <LeftNav ref="leftNavChildren" style={styles.leftmenu}>
          <MenuItem index={0} leftIcon={<TrackIcon />} onClick={this.handleContent.bind(this,0)} >Top tracks</MenuItem>
          <MenuItem index={1} leftIcon={<AlbumIcon />} onClick={this.handleContent.bind(this,1)} >Top albums</MenuItem>
          <MenuItem index={2} leftIcon={<ArtistIcon />} onClick={this.handleContent.bind(this,2)} >Top artists</MenuItem>
          <MenuItem index={2} leftIcon={<TrackIcon />} onClick={this.handleContent.bind(this,3)} >Rcent tracks</MenuItem>
        </LeftNav>
        <div style={styles.content}>
          {content}
        </div>
      </div>
    );
  }

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
  }

  handleContent(index) {
    let keyArray = [METHOD_TOP_TRACKS, METHOD_TOP_ALBUMS, METHOD_TOP_ARTISTS, METHOD_RECENT_TRACKS]
    this.props.dispatch(setMethod(keyArray[index]))
  }

}

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
  nameInput: {
    bottom: '0',
    position: 'absolute',
    width: '80%',
    margin: '0 5px',
  },
}

function mapStateToProps(state) { 
  const { user, method, datasByMethods } = state
  const {
    isFetching,
    items: datas
  } = datasByMethods[method] || {
    isFetching: true,
    items: []
  }

  return {
    user,
    method,
    datas,
    isFetching,
  }
}

export default connect(mapStateToProps)(Main);

