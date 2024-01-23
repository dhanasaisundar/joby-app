import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

function Home() {
  function body() {
    return (
      <div className="home-job-description">
        <div className="home-sub-descp">
          <h1 className="home-main-heading">
            Find The Job That Fits Your Life
          </h1>
          <p className="home-description-text">
            Millions of people are searching for jobs, salary information,
            company reviews. FInd the job that fits your abilities and potential
          </p>
          <Link to="/jobs">
            <button type="button" className="find-job-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Header />
      {body()}
    </div>
  )
}

export default Home
