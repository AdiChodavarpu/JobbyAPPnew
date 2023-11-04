import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import JobDescription from '../JobDescription'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetailsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {EmploymentRole} = this.props
    console.log(EmploymentRole)
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/jobs'
    const Token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const ModifiedData = data.jobs.map(eachitem => ({
        id: eachitem.id,
        companyLogoUrl: eachitem.company_logo_url,
        employmentType: eachitem.employment_type,
        jobDescription: eachitem.job_description,
        location: eachitem.location,
        packagePerAnnum: eachitem.package_per_annum,
        rating: eachitem.rating,
        title: eachitem.title,
      }))

      this.setState({
        jobDetailsList: ModifiedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

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
    const {jobDetailsList} = this.state

    return (
      <ul className="job-details-list-container">
        {jobDetailsList.length === 0
          ? this.NoJobsSection()
          : jobDetailsList.map(eachitem => (
              <JobDescription key={eachitem.id} JobDetails={eachitem} />
            ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-section">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops!Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="failure-retry-button">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="Loading-section">
      <Loader type="ThreeDots" color="#0b69ff" width="50" height="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
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
