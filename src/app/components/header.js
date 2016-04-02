import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch' 
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import {BASE_URL, DEFAULT_USER, DEFAULT_LIMIT, DEFAULT_METHOD} from './api'

export default class HeaderInfos extends Component{
  render() {
    return (
      <div>
        <Card>
          <CardHeader
            title={this.props.name}
            avatar={this.props.avatar}
          />
        </Card>
      </div>
    )
  }
}

