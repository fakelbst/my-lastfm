import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import Loading from './loading'
import {BASE_URL, DEFAULT_USER, DEFAULT_LIMIT, DEFAULT_METHOD} from './api';

export default class Tracks extends Component {
  render() {
    return (
      <div>
        {this.props.datas.map(d => <Card>
            <CardHeader
              title={d.name}
              subtitle={d.artist['name']}
              avatar={d.image[2]['#text']}
            />
          </Card>
        )}
      </div>
    )
  }
}


