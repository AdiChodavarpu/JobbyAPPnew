import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import JobDetails from '../JobDetaills'

import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const jobsApiStatusConstants = {
  jobsInitial: 'INITIAL',
  jobsSuccess: 'SUCCESS',
  jobsFailure: 'FAILURE',
  jobsInProgress: 'IN_PROGRESS',
}

class JobsRoute extends Component {
  state = {
    profileDetails: {},
    apiStatus: apiStatusConstants.initial,
    isChecked: {
      FULLTIME: false,
      PARTTIME: false,
      FREELANCE: false,
      INTERNSHIP: false,
    },
    employmentType: '',
    SalaryRange: '',
    onChangeSearchInput: '',
    searchInput: '',

    jobDetailsList: [],
    JobsApiStatus: jobsApiStatusConstants.jobsInitial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const Token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const FetchedData = data.profile_details
      const ModifiedData = {
        name: FetchedData.name,
        profielImageUrl: FetchedData.profile_image_url,
        shortBio: FetchedData.short_bio,
      }

      this.setState({
        profileDetails: ModifiedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getJobDetails = async () => {
    const {employmentType, SalaryRange, searchInput} = this.state

    this.setState({JobsApiStatus: jobsApiStatusConstants.jobsInProgress})
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${SalaryRange}&search=${searchInput}`
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
        JobsApiStatus: jobsApiStatusConstants.jobsSuccess,
      })
    } else {
      this.setState({JobsApiStatus: jobsApiStatusConstants.jobsFailure})
    }
  }

  onSelectCheckBox = event => {
    const {isChecked} = this.state
    const SelectedValue = event.target.value
    const updateCheckBox = {...isChecked}

    updateCheckBox[SelectedValue] = !updateCheckBox[SelectedValue]

    const filterEmployment = Object.keys(updateCheckBox).filter(
      eachitem => updateCheckBox[eachitem] === true,
    )

    const result = filterEmployment.join()

    this.setState(
      {
        isChecked: updateCheckBox,
        employmentType: result,
      },
      this.getJobDetails,
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" width="50" height="50" />
    </div>
  )

  renderProfie = () => {
    const {profileDetails} = this.state
    const {name, profielImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-bg-container">
        <img className="profile-image" src={profielImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  renderLine = () => <hr className="line" />

  renderEmployeeType = () => {
    const {isChecked} = this.state

    return (
      <div className="employe-container">
        <h1 className="employee-heading">Type of Employment</h1>
        <ul className="employe-unordered-list">
          {employmentTypesList.map(eachitem => (
            <li className="employee-container" key={eachitem.employmentTypeId}>
              <input
                checked={isChecked.employmentTypeId}
                value={eachitem.employmentTypeId}
                className="checkbox-element"
                type="checkbox"
                id={eachitem.employmentTypeId}
                onChange={this.onSelectCheckBox}
              />
              <label
                className="checkbox-label"
                htmlFor={eachitem.employmentTypeId}
              >
                {eachitem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  onChangeSalary = event =>
    this.setState({SalaryRange: event.target.value}, this.getJobDetails)

  renderSalaryRange = () => {
    const {SalaryRange} = this.state

    return (
      <div className="salary-container">
        <h1 className="salary-heading">Salary Range</h1>
        <ul className="salary-unordered-list">
          {salaryRangesList.map(eachitem => (
            <li className="salary-container-list" key={eachitem.salaryRangeId}>
              <input
                className="radio-element"
                type="radio"
                checked={SalaryRange === eachitem.salaryRangeId}
                id={eachitem.salaryRangeId}
                value={eachitem.salaryRangeId}
                onChange={this.onChangeSalary}
              />
              <label className="radio-label" htmlFor={eachitem.salaryRangeId}>
                {eachitem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderSuccessView = () => <> {this.renderProfie()}</>

  onClickRetry = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <button
      type="button"
      className="failure-button"
      onClick={this.onClickRetry}
    >
      Retry
    </button>
  )

  onFailureRetry = () => {
    this.getJobDetails()
  }

  renderProfileDetailsView = () => {
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

  renderSideBar = () => (
    <div className="sidebar-container">
      <div className="profile-container">{this.renderProfileDetailsView()}</div>
      <div className="side-view">
        <> {this.renderLine()}</>
        <>{this.renderEmployeeType()}</>
        <> {this.renderLine()}</>
        <>{this.renderSalaryRange()}</>
      </div>
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({onChangeSearchInput: event.target.value})
  }

  onClickSearchButton = () => {
    const {onChangeSearchInput} = this.state

    this.setState({searchInput: onChangeSearchInput}, this.getJobDetails)
  }

  renderSearchBar = () => {
    const {onChangeSearchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          onChange={this.onChangeSearchInput}
          value={onChangeSearchInput}
        />
        <button
          className="search-button"
          type="button"
          label="true"
          data-testid="searchButton"
          onClick={this.onClickSearchButton}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    const {jobDetailsList, JobsApiStatus} = this.state

    return (
      <div className="Jobs-section">
        <Header />

        <div className="Jobs-Maincontainer">
          <div className="mobile-view-search-container">
            {this.renderSearchBar()}
          </div>
          <>{this.renderSideBar()}</>
          <div className="search-results-section">
            <div className="search-bar-container">{this.renderSearchBar()}</div>
            <div className="search-results-container">
              <JobDetails
                JobDetailsList={jobDetailsList}
                JobsApiStatus={JobsApiStatus}
                onFailureRetry={this.onFailureRetry}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default JobsRoute
