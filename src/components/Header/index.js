import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const OnLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-large-view-container">
        <Link to="/" className="nav-link">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-large-items-list">
          <Link to="/" className="nav-link">
            <li className="nav-large-items">Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="nav-large-items">Jobs</li>
          </Link>
        </ul>
        <button className="logout-button" type="button" onClick={OnLogout}>
          Logout
        </button>
      </div>
      <div className="nav-mobile-view-container">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <ul className="nav-mobile-items-list">
          <Link to="/" className="nav-link">
            <li className="nav-large-items">
              <AiFillHome className="nav-icons" />
            </li>
          </Link>

          <Link to="/jobs" className="nav-link">
            <li className="nav-large-items">
              <BsBriefcaseFill className="nav-icons" />
            </li>
          </Link>
          <li className="nav-large-items">
            <button
              className="logout-mobile-button"
              type="button"
              onClick={OnLogout}
            >
              <FiLogOut className="nav-icons" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
