import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: '#000',
          display: this.props.open ? 'block' : 'none',
          position: 'absolute',
          left: '20%',
          right: '20%',
          top: '25%',
          color: '#fff'
        }}
      >
        <h1>Modal</h1>
        <p>Este es mi modal</p>
      </div>
    );
  }
}

export default Movie;
