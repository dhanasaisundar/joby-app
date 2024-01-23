import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isLogin: true, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({isLogin: false, errorMsg})
  }

  onUsernameInputChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordInputChange = event => {
    this.setState({password: event.target.value})
  }

  handleOnSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data.jwt_token)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      console.log(data)
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, isLogin, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-login-bg">
        <div className="login-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-image"
          />
          <form className="form-container" onSubmit={this.handleOnSubmit}>
            <label htmlFor="username" className="form-label-element">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              value={username}
              className="form-input-element"
              placeholder="username"
              onChange={this.onUsernameInputChange}
            />
            <label htmlFor="password" className="form-label-element">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="form-input-element"
              placeholder="password"
              onChange={this.onPasswordInputChange}
            />
            {isLogin ? '' : <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
