import React from 'react';
import loupeImage from '../../assets/image/heat-loupe.png'; // Ruta de tu imagen de logo

const LogoTitle = ({ title, color }) => {
  return (
    <div className="logo-title" style={{display:"flex", alignItems:"center", gap:"10px", height:"100%"}}>
      <img src={loupeImage} alt="Loupe" className="loupe" style={{width:"auto", height:"80%", display:"flex"}} />
      <h1 style={{fontSize:"24px", color: color === 'transparent' ? 'black' : 'white'}}>{title}</h1>
    </div>
  );
};

export default LogoTitle;
