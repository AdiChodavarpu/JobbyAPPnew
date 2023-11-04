import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {TiLocation} from 'react-icons/ti'

import './index.css'

const JobDescription = props => {
  const {JobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = JobDetails

  const TitleSection = () => (
    <div className="company-title-section">
      <img className="company-logo" src={companyLogoUrl} alt="company logo" />
      <div className="company-title-container">
        <h1 className="company-title">{title}</h1>
        <div className="rating-section">
          <AiFillStar className="star-image" />
          <p className="company-rating">{rating}</p>
        </div>
      </div>
    </div>
  )

  const CompanyJObDetails = () => (
    <div className="company-job-details-section">
      <ul className="location-employment-type-list">
        <li className="location-list">
          <TiLocation className="location" />
          <p className="location-description">{location}</p>
        </li>
        <li className="location-list">
          <BsBriefcaseFill className="location" />
          <p className="location-description">{employmentType}</p>
        </li>
      </ul>
      <p className="package-per-annum">{packagePerAnnum}</p>
    </div>
  )

  const DescriptionSection = () => (
    <div className="job-description-section-container">
      <h1 className="jobby-description-heading">Description</h1>
      <p className="jobby-description">{jobDescription}</p>
    </div>
  )

  return (
    <Link to={`/jobs/${id}`} className="nav-link">
      <li className="job-description-item-container">
        <div className="job-description-section">
          <>{TitleSection()}</>
          <>{CompanyJObDetails()}</>
          <hr className="lines" />
          <>{DescriptionSection()}</>
        </div>
      </li>
    </Link>
  )
}

export default JobDescription
