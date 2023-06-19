import React from 'react'
import { useLocation } from 'react-router-dom'

function Result() {
    const location = useLocation()
    const {result} = location.state
    console.log(result);
  return (
    <div>
        <div>Result</div>
        <div>You Got {result.right} out of {result.total}</div>
    </div>
  )
}

export default Result