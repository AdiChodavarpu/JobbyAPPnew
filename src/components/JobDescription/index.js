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

  return <li className="job-description-item-container">{title}</li>
}

export default JobDescription
