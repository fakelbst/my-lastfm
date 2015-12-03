import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';

const Loading = React.createClass({

  render() {
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
});

module.exports = Loading;
