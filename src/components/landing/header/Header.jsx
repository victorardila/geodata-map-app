import React from 'react'
import './HeaderStyles.css'
import ButtonMenu from '../../common/ButtonMenu'
import LogoTitle from '../../common/LogoTitle'

const Header = () => {
  const buttons=[
    {text: 'Inicio', path: '/start'},
    {text: 'Funcionalidades', path: '/features'},
    {text: 'Acerca', path: '/about'},
    {text: 'Contactenos', path: '/contact'},
  ]
  return (
    <div className="header">
      <d className="header-title">
        <LogoTitle title='GeoData Map'/>
      </d>
      <div className="header-menu" style={{borderRight:"1px solid rgba(0,0,0,0.4)"}}>
        {buttons.map((button, index) => {
          return <ButtonMenu key={index} text={button.text} type='button-menu'/>
        })}
      </div>
      <div className="header-login">
        <ButtonMenu text='Acceder' type='button-login'/>
      </div>
    </div>
  )
}

export default Header