import Cookies from 'js-cookie'
// ******************************************
import {AiTwotoneStar} from 'react-icons/ai'
import {FiExternalLink} from 'react-icons/fi'
import {HiLocationMarker, HiShoppingBag} from 'react-icons/hi'

// ******************************************
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class IndividualJobDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  handleJobItemRetryBtn = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobDetailUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobDetailUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const jobInfo = data.job_details
      const similarJobInfo = data.similar_jobs
      const upDatedJobDetail = {
        companyLogoUrl: jobInfo.company_logo_url,
        companyWebsiteUrl: jobInfo.company_website_url,
        employmentType: jobInfo.employment_type,
        jobDescription: jobInfo.job_description,
        id: jobInfo.id,
        lifeAtCompany: jobInfo.life_at_company,
        location: jobInfo.location,
        rating: jobInfo.rating,
        skills: jobInfo.skills,
        title: jobInfo.title,
        packagePerAnnum: jobInfo.package_per_annum,
      }
      const UpdatedSimilarJobs = similarJobInfo.map(info => ({
        companyLogoUrl: info.company_logo_url,
        employmentType: info.employment_type,
        id: info.id,
        jobDescription: info.job_description,
        location: info.location,
        rating: info.rating,
        skills: info.skills,
        title: info.title,
      }))
      this.setState({
        jobDetails: upDatedJobDetail,
        similarJobs: UpdatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderMainComponent = () => {
    const {jobDetails} = this.state
    return (
      <div className="indi-job-list-container">
        <div className="indi-job-list " key={jobDetails.id}>
          <div className="logo-and-title">
            <img
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
              className="company-logo-image"
            />
            <div className="title-and-rating">
              <p className="job-title">{jobDetails.title}</p>
              <div className="rating-container">
                <AiTwotoneStar className="rating-icon" />
                <p>{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="package-and-location-container">
            <div className="location-and-employment-type">
              <div className="location-container">
                <HiLocationMarker className="rating-icon" />
                <p>{jobDetails.location}</p>
              </div>
              <div className="location-container">
                <HiShoppingBag className="rating-icon" />
                <p>{jobDetails.employmentType}</p>
              </div>
            </div>
            <div>
              <p>{jobDetails.packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div>
            <div className="description-and-visit-container">
              <h2 className="description-heading">Description</h2>
              <a href={jobDetails.companyWebsiteUrl} className="visit-us">
                Visit <FiExternalLink />
              </a>
            </div>
            <p className="description-text-at-company">
              {jobDetails.jobDescription}
            </p>
          </div>
          <div className="skills-container">
            <h3>Skills</h3>
            <ul className="skill-container">
              {jobDetails.skills.map(skill => (
                <li className="skills" key={skill.name}>
                  <img
                    src={skill.image_url}
                    alt={skill.name}
                    className="skill-image"
                  />
                  <p className="skill-text">{skill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <h2>Life at Company</h2>
            <div className="life-at-company">
              <p className="description-text">
                {jobDetails.lifeAtCompany.description}
              </p>
              <img
                src={jobDetails.lifeAtCompany.image_url}
                alt="life at company"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.handleJobItemRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderTheFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMainComponent()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {similarJobs} = this.state
    return (
      <div className="individual-main-bg">
        <Header />
        <div className="body-indi-container">
          {this.renderTheFinalView()}
          <SimilarJobs similarJobs={similarJobs} />
        </div>
      </div>
    )
  }
}

export default IndividualJobDetails
