import {Component} from 'react'
import SideBar from '../SideBar'
import Header from '../Header'

import './index.css'

class Jobs extends Component {
  renderFindJobs = () => (
    <div className="search-jobs-container">
      <h1>Search Jobs</h1>
    </div>
  )

  render() {
    return (
      <div className="find-jobs-section">
        <Header />
        <div className="find-jobs-container">
          <SideBar />
          <>{this.renderFindJobs()}</>
        </div>
      </div>
    )
  }
}

export default Jobs
