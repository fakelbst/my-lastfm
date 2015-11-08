import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import Loading from './loading'
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

  render() {
    if (!this.state.loaded) {
      return <Loading />;
    }

    let datas = this.state.tracks;
    return (
      <div>
        {datas.map(d => <Card>
            <CardHeader
              title={d.name}
              subtitle={d.artist['#text']}
              avatar={d.image[2]['#text']}
            />
          </Card>
        )}
      </div>
    )
  },
});

module.exports = Tracks;

