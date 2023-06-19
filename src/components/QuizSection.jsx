import React from 'react'

function QuizSection({categoryName}) {
  return (
    <div className='className="flex  items-center border-b-2 p-3 font-sans font-bold'>
        <div>Category Name : {categoryName}</div>
    </div>
  )
}

export default QuizSection