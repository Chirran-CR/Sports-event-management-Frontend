import React from 'react'
import { Link } from 'react-router-dom'
import App from './MyApp'

const Signup = () => {
  return (
    <div>Signup
        <Link to="/">Home</Link>
        <App/>
    </div>
  )
}

export default Signup