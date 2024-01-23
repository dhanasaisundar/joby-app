import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

function Header(props) {
  function handleLogoutBtn() {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-bg">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div className="header-routing-container">
        <ul className="header-routing">
          <li>
            <Link to="/" className="link-style">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link-style">
              Jobs
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="logout-btn"
              onClick={handleLogoutBtn}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Header)
