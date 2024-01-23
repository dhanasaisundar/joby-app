import {AiTwotoneStar} from 'react-icons/ai'
import {HiLocationMarker, HiShoppingBag} from 'react-icons/hi'
import './index.css'

function SimilarJobs(props) {
  const {similarJobs} = props
  return (
    <>
      <h1 className="similar-job-heading">Similar Jobs</h1>
      <ul className="similar-jobs-container">
        {similarJobs.map(simi => (
          <li className="similar-job" key={simi.id}>
            <div className="logo-title-rating">
              <img
                src={simi.companyLogoUrl}
                alt="similar job company logo"
                className="company-logo-image"
              />
              <div className="title-and-rating">
                <h1 className="job-title">{simi.title}</h1>
                <div className="rating-container">
                  <AiTwotoneStar className="rating-icon" />
                  <p>{simi.rating}</p>
                </div>
              </div>
            </div>
            <h3 className="simi-description-heading">Description</h3>
            <p className="similar-description-text">{simi.jobDescription}</p>
            <div className="footer-section">
              <div className="location-container">
                <p className="icon">
                  <HiLocationMarker />
                </p>
                <p>{simi.location}</p>
              </div>
              <div className="location-type">
                <p className="icon">
                  <HiShoppingBag />
                </p>
                <p>{simi.employmentType}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default SimilarJobs
