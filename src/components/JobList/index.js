import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link, withRouter} from 'react-router-dom'
// ******************Icons**********************************
import {HiLocationMarker, HiShoppingBag} from 'react-icons/hi'
import {AiTwotoneStar} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'

// *****************Required Files***************************

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobList extends Component {
  state = {
    jobList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobList()
  }

  componentDidUpdate(prevProps) {
    const {empTypeIdQuery, salaryRangeId} = this.props
    if (
      prevProps.empTypeIdQuery !== empTypeIdQuery ||
      prevProps.salaryRangeId !== salaryRangeId
    ) {
      this.getJobList()
    }
  }

  getJobList = async () => {
    const {empTypeIdQuery, salaryRangeId} = this.props
    console.log(empTypeIdQuery)
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jobListUrl = `https://apis.ccbp.in/jobs?employment_type=${empTypeIdQuery}&minimum_package=${salaryRangeId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobListUrl, options)
    const data = await response.json()
    const receivedJobs = data.jobs
    // console.log(receivedJobs)
    if (response.ok === true) {
      const updatedJobs = receivedJobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        packagePerAnnum: item.package_per_annum,
        rating: item.rating,
        title: item.title,
      }))

      this.setState({
        jobList: updatedJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleJobListRetryBtn = () => {
    this.getJobList()
  }

  renderNojobs = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p>We could not find any jobs. Try Other Filters.</p>
    </div>
  )

  renderJobListView = () => {
    const {jobList} = this.state
    return (
      <>
        {jobList.length > 0 ? (
          <ul className="job-list-container">
            {jobList.map(job => (
              <li className="job-list" key={job.id}>
                <Link to={`/jobs/${job.id}`} className="link-style">
                  <div className="logo-and-title">
                    <img
                      src={job.companyLogoUrl}
                      alt="job details company logo"
                      className="company-logo-image"
                    />
                    <div className="title-and-rating">
                      <h1 className="job-title">{job.title}</h1>
                      <div className="rating-container">
                        <AiTwotoneStar className="rating-icon" />
                        <p>{job.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="package-and-location-container">
                    <div className="location-and-employment-type">
                      <div className="location-container">
                        <HiLocationMarker className="rating-icon" />
                        <p>{job.location}</p>
                      </div>
                      <div className="location-container">
                        <HiShoppingBag className="rating-icon" />
                        <p>{job.employmentType}</p>
                      </div>
                    </div>
                    <div>
                      <p>{job.packagePerAnnum}</p>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <h2 className="description-heading">Description</h2>
                    <p className="description-text">{job.jobDescription}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <>{this.renderNojobs()}</>
        )}
      </>
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
        onClick={this.handleJobListRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderTheFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  handleOnSearchInput = event => {
    const searchInput = event.target.value
    this.setState({searchInput})
  }

  handleSearchBtn = () => {
    this.getJobList()
  }

  render() {
    return (
      <>
        <div className="search-container">
          <input
            type="search"
            placeholder="search"
            onChange={this.handleOnSearchInput}
            className="search-element"
          />
          <button
            type="button"
            aria-label="Close"
            data-testid="searchButton"
            className="search-btn"
            onClick={this.handleSearchBtn}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {this.renderTheFinalView()}
      </>
    )
  }
}

export default withRouter(JobList)
