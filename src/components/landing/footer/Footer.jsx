import React from 'react'
import './FooterStyles.css'
import SocialMediaBar from '../../common/SocialMediaBar'
import Credits from '../../common/Credits'

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <SocialMediaBar />
        <Credits />
        <div className="footer-text">
          <p>© 2024 - All rights reserved</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </div>
    </div>
  )
}

export default Footer