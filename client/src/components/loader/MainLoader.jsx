import React from 'react'
import {HashLoader} from 'react-spinners'

const MainLoader = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <HashLoader color="#FF9E01" size={60}/>
    </div>
  )
}

export default MainLoader