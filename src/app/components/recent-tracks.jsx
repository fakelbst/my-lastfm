import React from 'react';
import Loading from './loading'
import Avatar from 'material-ui/lib/avatar'
import Paper from 'material-ui/lib/paper'
import {BASE_URL, DEFAULT_USER, DEFAULT_LIMIT, DEFAULT_METHOD} from './api';

const RecentTracks = React.createClass({

  getInitialState () {
    return {
      loaded: false,
    };
  },

  componentDidMount() {
    this.fetchDate();
  },

  fetchDate(p) {
    let period = p || this.props.period;
    let url = BASE_URL + '&user=' + DEFAULT_USER + '&method=' + DEFAULT_METHOD;
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

  render() {
    if (!this.state.loaded) {
      return <Loading />;
    }
    let datas = this.state.tracks;

    return (
      <div style={styles.container}>
        {datas.map(track =>
          <Paper zDepth={4} rounded={false} circle={true} style={styles.paper}>

            <Avatar src={track.image[3]['#text']} style={styles.paper} />
          </Paper>
        )}
      </div>
    )
  },
});

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    background: '#fff',
    justifyContent: 'space-between',
  },
  paper: {
    width: '175px',
    height: '175px',
    marginBottom: '20px',
  },
}

module.exports = RecentTracks;

