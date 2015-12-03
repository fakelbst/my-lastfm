import React, { Component, PropTypes } from 'react'
import Avatar from 'material-ui/lib/avatar'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import ListDivider from 'material-ui/lib/lists/list-divider'
import Loading from './loading'
import {BASE_URL, DEFAULT_USER, DEFAULT_LIMIT, DEFAULT_METHOD} from './api'

export default class Artists extends Component {
  render() {
    return (
      <div>
        <List>
          {this.props.datas.map(d => <ListItem
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
  }
}

