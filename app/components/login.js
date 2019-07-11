// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/scss/login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      responseToPost: '',
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    //  const response = await
    fetch('http://localhost:1234/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    }).then((response) => {
      response.text().then((body) => {
        this.setState({ responseToPost: body });
      });
    });
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.type]: event.target.value,
    });
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <span>Login page</span>
          <label htmlFor="email">Username</label>
          <input name="email" type="email" onChange={this.handleChange} placeholder="Enter email" value={this.state.email} className="inputType" required />
          <label>Password</label>
          <input name="password" type="password" onChange={this.handleChange} placeholder="Enter password" value={this.state.password} className="inputType" required />
          <button disabled={!this.validateForm()} type="submit" className="buttonType">Login</button>
          <p>{this.state.responseToPost}</p>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {

};

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,

});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
