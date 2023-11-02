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

  renderSuccessView = () => {
    const {jobDetailsList} = this.state

    return (
      <ul className="job-details-list-container">
        {jobDetailsList.map(eachitem => (
          <JobDescription key={eachitem.id} JobDetails={eachitem} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => <div>Failure view</div>

  renderLoadingView = () => (
    <div>
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
    const {jobDetailsList, apiStatus} = this.state

    return <div className="jobDetails-view">{this.renderJobDetailsView()}</div>
  }
}

export default JobDetails
