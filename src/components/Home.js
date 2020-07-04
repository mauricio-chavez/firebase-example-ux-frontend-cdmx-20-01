import React, { Component } from 'react';
import Movies from './Movies';
import firebase from '../utils/firebase';

class Home extends Component {
  state = {
    authenticated: false,
    email: '',
    password: '',
  };

  setValue = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  signup = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password);
  };

  signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    // .then();
  };

  render() {
    return this.state.authenticated ? (
      <Movies />
    ) : (
      <div>
        <h1>Iniciar sesión</h1>
        <form onSubmit={this.signup}>
          <p>
            <label htmlFor='email'>Correo:</label>
            <input
              name='email'
              type='email'
              id='email'
              value={this.state.email}
              onChange={this.setValue}
              required
            />
          </p>
          <p>
            <label htmlFor='password'>Contraseña:</label>
            <input
              name='password'
              type='password'
              id='password'
              value={this.state.password}
              onChange={this.setValue}
              required
            />
          </p>
          <button>Crear</button>
        </form>
        <button onClick={this.signInWithGoogle}>
          O inicia sesión con Google
        </button>
      </div>
    );
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
        });
      } else {
        this.setState({
          authenticated: false,
        });
      }
    });
  }
}

export default Home;
