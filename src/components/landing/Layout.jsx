import React from 'react'
import './LayoutStyles.css'
import Header from './header/Header'
import Content from './content/Content'

function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="body">
        <Content />
      </div>
    </div>
  )
}

export default Layout