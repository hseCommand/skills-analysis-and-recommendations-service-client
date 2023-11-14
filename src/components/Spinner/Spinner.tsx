import React from 'react'
import './spinner.less'

const Spinner: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-ring"></div>
    </div>
  )
}

export default Spinner
