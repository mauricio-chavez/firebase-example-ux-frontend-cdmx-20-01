import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../utils/firebase';
import Modal from './Modal';

class Movies extends Component {
  state = {
    movies: [],
    open: false,
  };

  logout = () => {
    firebase.auth().signOut();
  };

  toggleModalVisibility = prevState => {
    this.setState({
      open: !prevState.open,
    });
  };

  render() {
    return (
      <div>
        <Modal open={this.state.open} />
        <button onClick={this.toggleModalVisibility}>
          {this.state.open ? 'Cerrar modal' : 'Abrir modal'}
        </button>
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
