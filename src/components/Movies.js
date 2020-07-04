import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../utils/firebase';

class Movies extends Component {
  state = {
    movies: [],
  };

  logout = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <div>
        <button onClick={this.logout}>Cerrar sesión</button>
        {this.state.movies.map(movie => (
          <div key={movie.id}>
            <h2>{movie.name}</h2>
            <Link to={'/' + movie.id}>Ir a la película</Link>
          </div>
        ))}
      </div>
    );
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collection('movies')
      .get()
      .then(querySnapshot => {
        const movies = [];
        querySnapshot.forEach(doc => {
          const movie = doc.data();
          movie.id = doc.id;
          movies.push(movie);
        });
        this.setState({ movies });
      });
  }
}

export default Movies;
