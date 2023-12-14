import React from 'react';

import loader from './images/loader.gif';

const Loading = () => {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <img src={loader} alt='Loading...' />
    </div>
  )
}

export default Loading;