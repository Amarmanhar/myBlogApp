import React from 'react'
import Logo from '../img/logo4.jpg'
const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>
        Made with <span style={{ color: 'red' }}><b>❤</b></span>
      </span>
    </footer>
  )
}

export default Footer
