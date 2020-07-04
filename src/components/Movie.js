import React, { Component } from 'react';
import firebase from '../utils/firebase';

class Movie extends Component {
  state = {
    name: null,
    director: null,
    loading: true,
  };

  render() {
    return this.state.loading ? (
      <p>Cargando...</p>
    ) : (
      <div>
        <h1>{this.state.name}</h1>
        <p>{this.state.director}</p>
      </div>
    );
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const db = firebase.firestore();
    db.collection('movies')
      .doc(id)
      .get()
      .then(doc => {
        const movie = doc.data();
        this.setState({
          name: movie.name,
          director: movie.director,
          loading: false,
        });
      });
  }
}

export default Movie;
