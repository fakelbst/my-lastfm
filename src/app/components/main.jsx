/** In this file, we create a React component which incorporates components provided by material-ui */

const React = require('react');
const RaisedButton = require('material-ui/lib/raised-button');
const Card = require('material-ui/lib/card/card');
const CardHeader = require('material-ui/lib/card/card-header');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const Colors = require('material-ui/lib/styles/colors');

const Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      tracks: [],
      loaded: false,
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

  componentDidMount() {
    this.fetchDate();
  },

  fetchDate() {
      let url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=fakelbst&api_key=4dff88a0423651b3570253b10b745b2c&format=json&limit=50&extended=1&page=1';
      fetch(url).then((response) => {
        return response.json()
      }).then((json) => {
        console.log('parsed json', json)
        this.setState({
          tracks: json.recenttracks.track,
          loaded: true,
        });
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
  },

  renderLoadingView() {
    return (
        <div></div>
    )
  },

  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    let containerStyle = {
      textAlign: 'center',
      paddingTop: '200px',
    };

    let standardActions = [
      { text: 'Okay' },
    ];

    let datas = this.state.tracks;
    console.log(datas);
    return (
      <div>
        {datas.map((d) => {
          return <Card>
            <CardHeader
              title={d.name}
              subtitle={d.artist.name}
              avatar={d.image[2]['#text']}
            />
          </Card>
        })}
      </div>
    );
  },

  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  },

});

module.exports = Main;
