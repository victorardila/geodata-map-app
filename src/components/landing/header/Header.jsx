import React from 'react'
import './HeaderStyles.css'
import ButtonMenu from '../../common/ButtonMenu'
import LogoTitle from '../../common/LogoTitle'
import SpaceDivider from '../../common/SpaceDivider';

const Header = ({backgroundHeader}) => {
  const buttons = [
    { text: 'Inicio', path: '/start' },
    { text: 'Funcionalidades', path: '/features' },
    { text: 'Suscripciones', path: '/features' },
    { text: 'Acerca', path: '/about' },
    { text: 'Contactenos', path: '/contact' },
  ]
  return (
    // le pasare al backgroundHeader el color que se le asignara al header con un blur
    <div className="header" style={{ backgroundColor: backgroundHeader === 'transparent' ? 'white': backgroundHeader}}>
      <div className="header-title">
        <LogoTitle title='GeoData Map' color={backgroundHeader} />
      </div>
      <div className="header-menu">
        {buttons.map((button, index) => (
          <div key={index} className="button-container">
            <SpaceDivider color={backgroundHeader} />
            <ButtonMenu key={index} text={button.text} type='button-menu' color={backgroundHeader} />
            {index === buttons.length - 1 && <SpaceDivider color={backgroundHeader} />}
          </div>
        ))}
      </div>
      <div className="header-login">
        <ButtonMenu text='Acceder' type='button-login' color={backgroundHeader} />
      </div>
    </div>
  )
}

export default Header