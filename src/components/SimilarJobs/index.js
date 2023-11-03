import {AiFillStar} from 'react-icons/ai'

import './index.css'

const SimilarJobs = props => {
  const {SimilarJobsDetailUpdated} = props
  const {
    similarCompanyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = SimilarJobsDetailUpdated

  return (
    <li className="similar-job-container">
      <div className="similar-job-title-section">
        <img
          className="similar-job-company-logo"
          src={similarCompanyLogoUrl}
          alt="company logo"
        />
        <div className="similarjob-title-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="rating-section">
            <AiFillStar className="star-image" />
            <p className="company-rating">{rating}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
