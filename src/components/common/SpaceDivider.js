import React from 'react'

const SpaceDivider=({color})=>{
    return (
      <div className="divider" style={{height:"80%", width:"1px", backgroundColor:color==='transparent' ? 'black':'white'}} />
    )
  }
  

export default SpaceDivider