import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <div>Home</div>
        <Link to={"/select-exam"} >Click to Select Exam</Link>
    </div>
  )
}

export default Home