import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div className="input-login-container">
        <label className="input-label" htmlFor="myusername">
          USERNAME
        </label>
        <input
          className="login-input-element"
          id="myusername"
          type="text"
          placeholder="Username"
          onChange={this.onChangeUserName}
          value={username}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="input-login-container">
        <label className="input-label" htmlFor="myPassword">
          PASSWORD
        </label>
        <input
          className="login-input-element"
          id="myPassword"
          type="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  onSuccessLogin = Token => {
    const {history} = this.props
    Cookies.set('jwt_token', Token, {expires: 30})
    history.replace('/')
  }

  onFailureLogin = ErrorMsg => {
    this.setState({showSubmitError: true, errorMsg: ErrorMsg})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const Url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(Url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const Token = Cookies.get('jwt_token')
    if (Token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="jobby-bg-container">
        <div className="jobby-login-card-container">
          <div className="login-card-container">
            <img
              className="login-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
            <form className="form-contianer" onSubmit={this.onSubmitLogin}>
              <>{this.renderUsername()}</>
              <>{this.renderPassword()}</>
              <button className="login-button" type="submit">
                Login
              </button>
              {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
