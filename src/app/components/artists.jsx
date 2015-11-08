import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';
import Avatar from 'material-ui/lib/avatar'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import ListDivider from 'material-ui/lib/lists/list-divider'
import {BASE_URL, DEFAULT_USER, DEFAULT_LIMIT, DEFAULT_METHOD} from './api';

const Albums = React.createClass({

  getInitialState () {
    return {
      artists: [],
      loaded: false,
    };
  },

  componentDidMount() {
    this.fetchDate();
  },

  fetchDate() {
      let url = BASE_URL + '&user=' + DEFAULT_USER + '&method=' + 'user.gettopartists';
      fetch(url).then((response) => {
        return response.json()
      }).then((json) => {
        console.log('parsed json', json)
        this.setState({
          artists: json.topartists.artist,
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

    let datas = this.state.artists;
    return (
      <div>
        <List subheader="Overall">
          {datas.map(d => <ListItem
            leftAvatar={<Avatar src={d.image[3]['#text']} />}
            primaryText={d.name}
            secondaryText={
              <p>
                <span>Playcount -- </span>
                {d.playcount}
              </p>
            }
            secondaryTextLines={2} />
          )}
        </List>
      </div>
    )
  },
});

module.exports = Albums;

