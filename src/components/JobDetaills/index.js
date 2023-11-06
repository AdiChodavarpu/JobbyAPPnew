import {Component} from 'react'
import Loader from 'react-loader-spinner'

import JobDescription from '../JobDescription'

import './index.css'

const jobsApiStatusConstants = {
  jobsInitial: 'INITIAL',
  jobsSuccess: 'SUCCESS',
  jobsFailure: 'FAILURE',
  jobsInProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  NoJobsSection = () => (
    <div className="no-jobs-container">
      <img
        className="no-jobs-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderSuccessView = () => {
    const {JobDetailsList} = this.props
    console.log(JobDetailsList)

    return (
      <ul className="job-details-list-container">
        {JobDetailsList.length === 0
          ? this.NoJobsSection()
          : JobDetailsList.map(eachitem => (
              <JobDescription key={eachitem.id} JobDetails={eachitem} />
            ))}
      </ul>
    )
  }

  renderFailureView = () => {
    const {onFailureRetry} = this.props

    const onRetry = () => {
      onFailureRetry()
    }

    return (
      <div className="failure-section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="failure-retry-button"
          onClick={onRetry}
        >
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="Loading-section" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" width="50" height="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {JobsApiStatus} = this.props

    switch (JobsApiStatus) {
      case jobsApiStatusConstants.jobsSuccess:
        return this.renderSuccessView()
      case jobsApiStatusConstants.jobsInProgress:
        return this.renderLoadingView()
      case jobsApiStatusConstants.jobsFailure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return <div className="jobDetails-view">{this.renderJobDetailsView()}</div>
  }
}

export default JobDetails
