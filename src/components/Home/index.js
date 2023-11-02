import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="jobby-home-container">
        <Header />
        <div className="home-bg-container">
          <h1 className="home-heading">Find The Job That Fits Your Life </h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the jobs that fits your abilites and
            potential.
          </p>
          <Link to="/jobs" className="nav-link">
            <button className="find-jobs-button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
