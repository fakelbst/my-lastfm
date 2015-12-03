import React, { Component } from 'react';
import Loading from './loading'
import Avatar from 'material-ui/lib/avatar'
import Paper from 'material-ui/lib/paper'
import {BASE_URL, DEFAULT_USER, DEFAULT_LIMIT, DEFAULT_METHOD} from './api';

export default class RecentTracks extends Component {
  render() {
    return (
      <div style={styles.container}>
        {this.props.datas.map(track =>
          <Paper zDepth={4} rounded={false} circle={true} style={styles.paper}>

            <Avatar src={track.image[3]['#text']} style={styles.paper} />
          </Paper>
        )}
      </div>
    )
  }
}

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
  }
}

