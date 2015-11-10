import React from 'react';
import Avatar from 'material-ui/lib/avatar'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import ListDivider from 'material-ui/lib/lists/list-divider'
import Loading from './loading'
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
    let url = BASE_URL + '&user=' + DEFAULT_USER + '&method=' + 'user.gettopartists' + '&period=' + this.props.period;
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

  render() {
    console.log(11111111);
    if (!this.state.loaded) {
      return <Loading />;
    }

    let datas = this.state.artists;
    return (
      <div>
        <List>
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

