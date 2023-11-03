import {Component} from 'react'

import Cookies from 'js-cookie'

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
        companyLogoUrl: eachitem.company_logo_url,
        employmentType: eachitem.employment_type,
        id: eachitem.id,
        jobDescription: eachitem.job_description,
        location: eachitem.location,
        rating: eachitem.rating,
        title: eachitem.title,
      }))

      const TotalDetails = [ModifiedJobDetails, SimilarSkills]
      this.setState({
        JobItemDetailsList: TotalDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {JobItemDetailsList} = this.state

    console.log(JobItemDetailsList)

    return (
      <div className="Job-Item-Details-Section">
        <Header />
        <div className="Job-item-details-container">
          <div className="Job-item-Details-Card-Container">df</div>
        </div>
      </div>
    )
  }
}

export default JobItemDetails
