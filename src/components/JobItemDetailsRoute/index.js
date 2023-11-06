import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'

import {BsBriefcaseFill} from 'react-icons/bs'
import {TiLocation} from 'react-icons/ti'
import {RiShareBoxLine} from 'react-icons/ri'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    JobItemDetailsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getLifeAtCompany = data => ({
    description: data.description,
    imageUrl: data.image_url,
  })

  getSkills = data => ({
    imageUrl: data.image_url,
    name: data.name,
  })

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const Token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const fetchedData = data.job_details
      const similarData = data.similar_jobs

      const ModifiedJobDetails = {
        id: fetchedData.id,
        companyLogoUrl: fetchedData.company_logo_url,
        companyWebSiteUrl: fetchedData.company_website_url,
        employmentType: fetchedData.employment_type,
        jobDescription: fetchedData.job_description,
        lifeAtCompany: this.getLifeAtCompany(fetchedData.life_at_company),
        location: fetchedData.location,
        packagePerAnnum: fetchedData.package_per_annum,
        rating: fetchedData.rating,
        skills: fetchedData.skills.map(eachitem => this.getSkills(eachitem)),

        title: fetchedData.title,
      }

      const SimilarSkills = similarData.map(eachitem => ({
        similarCompanyLogoUrl: eachitem.company_logo_url,
        similarEmploymentType: eachitem.employment_type,
        similarId: eachitem.id,
        similarJobDescription: eachitem.job_description,
        similarLocation: eachitem.location,
        similarRating: eachitem.rating,
        similarTitle: eachitem.title,
      }))

      const TotalDetails = [{ModifiedJobDetails, SimilarSkills}]
      this.setState({
        JobItemDetailsList: TotalDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getJobItemDetails()
  }

  renderSuccessView = () => {
    const {JobItemDetailsList} = this.state
    const JobitemModifiedDetails = JobItemDetailsList[0].ModifiedJobDetails

    const SimilarJobsModifiedDetails = JobItemDetailsList[0].SimilarSkills

    const {
      companyLogoUrl,
      companyWebSiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = JobitemModifiedDetails

    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-item-details-container">
        <div className="Job-item-Details-Card-Container">
          <div className="company-title-section">
            <img
              className="Company-Logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="company-title-container">
              <h1 className="Company-Title">{title}</h1>
              <div className="rating-section">
                <AiFillStar className="Star-Image" />
                <p className="Company-Rating">{rating}</p>
              </div>
            </div>
          </div>

          <div className="company-job-details-section">
            <ul className="location-employment-type-list">
              <li className="location-list">
                <TiLocation className="Location" />
                <p className="Location-Description">{location}</p>
              </li>
              <li className="location-list">
                <BsBriefcaseFill className="Location" />
                <p className="Location-Description">{employmentType}</p>
              </li>
            </ul>
            <p className="Package-Per-Annum">{packagePerAnnum}</p>
          </div>

          <hr className="lines" />

          <div className="job-description-section-container">
            <div className="Jobby_Description-Heading-Section">
              <h1 className="jobby-description-heading">Description</h1>
              <a href={companyWebSiteUrl} className="visit-container">
                <p className="visit-description">Visit</p>
                <RiShareBoxLine className="visit-icon" />
              </a>
            </div>
            <p className="jobby-description">{jobDescription}</p>
          </div>

          <div className="skills-container">
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-unordered-list">
              {skills.map(eachitem => (
                <li className="skills-list" key={eachitem.name}>
                  <img
                    className="skills-image"
                    src={eachitem.imageUrl}
                    alt={eachitem.name}
                  />
                  <p className="skil-name">{eachitem.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="life-at-company-container">
            <h1 className="life-at-company-heading">Life at Company</h1>
            <div className="life-at-company-description">
              <p className="life-at-company">{description}</p>
              <img
                className="life-at-company-image"
                src={imageUrl}
                alt="life at company"
              />
            </div>
          </div>
        </div>

        <div className="similar-jobs-list">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-unodered-list">
            {SimilarJobsModifiedDetails.map(eachitem => {
              const {
                similarCompanyLogoUrl,
                similarEmploymentType,
                similarId,
                similarJobDescription,
                similarLocation,
                similarRating,
                similarTitle,
              } = eachitem
              return (
                <li key={similarId} className="similar-job-section">
                  <div className="similar-job-title-section">
                    <img
                      className="similar-job-company-logo"
                      src={similarCompanyLogoUrl}
                      alt="similar job company logo"
                    />
                    <div className="similarjob-title-container">
                      <h1 className="similar-job-title">{similarTitle}</h1>
                      <div className="similar-rating-section">
                        <AiFillStar className="similar-star-image" />
                        <p className="similar-company-rating">
                          {similarRating}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="similar-job-description-section-container">
                    <h1 className="similar-job-description-heading">
                      Description
                    </h1>
                    <p className="similar-job-description">
                      {similarJobDescription}
                    </p>
                  </div>

                  <div className="Similar-job-details-section">
                    <ul className="location-employment-type-unordered-list">
                      <li className="location-employment-list">
                        <TiLocation className="location-employment-icon" />
                        <p className="location-employment-description">
                          {similarLocation}
                        </p>
                      </li>
                      <li className="location-employment-list">
                        <BsBriefcaseFill className="location-employment-icon" />
                        <p className="location-employment-description">
                          {similarEmploymentType}
                        </p>
                      </li>
                    </ul>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
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
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="Loading-section" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" width="50" height="50" />
    </div>
  )

  renderJobItemDetailsView = () => {
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
    return (
      <div className="Job-Item-Details-Section">
        <Header />
        <div className="Job-item-details-container">
          <>{this.renderJobItemDetailsView()}</>
        </div>
      </div>
    )
  }
}

export default JobItemDetails
