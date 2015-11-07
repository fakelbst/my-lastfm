import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import {BASE_URL, DEFAULT_USER, DEFAULT_LIMIT, DEFAULT_METHOD} from './api';

const Tracks = React.createClass({

  getInitialState () {
    return {
      tracks: [],
      loaded: false,
    };
  },

  componentDidMount() {
    this.fetchDate();
  },

  fetchDate() {
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

    let datas = this.state.tracks;
    return (
      <div>
        {datas.map((d) => {
          return <Card>
            <CardHeader
              title={d.name}
              subtitle={d.artist['#text']}
              avatar={d.image[2]['#text']}
            />
          </Card>
        })}
      </div>
    )
  },
});

module.exports = Tracks;

