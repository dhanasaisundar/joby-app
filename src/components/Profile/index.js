import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Profile extends Component {
  state = {profileData: {}, isProfileAvailable: true}

  componentDidMount() {
    this.renderProfilePhoto()
  }

  handleProfileRetryBtn = () => {
    this.renderProfilePhoto()
  }

  renderProfilePhoto = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = data.profile_details
      // console.log(profileDetails)
      const updatedProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({profileData: updatedProfileDetails})
    } else {
      this.setState({isProfileAvailable: false})
    }
  }

  render() {
    const {profileData, isProfileAvailable} = this.state
    return (
      <div className="bio-container">
        {isProfileAvailable ? (
          <div className="profile-background-container">
            <img
              src={profileData.profileImageUrl}
              alt="profile"
              className="profile-image"
            />
            <h1 className="profile-name">{profileData.name}</h1>
            <p className="short-bio">{profileData.shortBio}</p>
          </div>
        ) : (
          <button
            type="button"
            className="retry-btn"
            onClick={this.handleProfileRetryBtn}
          >
            Retry
          </button>
        )}
      </div>
    )
  }
}

export default Profile
