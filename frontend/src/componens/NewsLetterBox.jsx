import React from 'react'

const NewsLetterBox = () => {
     
     const onSubmithandler = (event) =>{
         event.preventdefault(); {/* this for if we submit now the page will not realoded */ }
     }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscibe Now & Get 20% off</p>
        <p className='text-gray-400 mt-3 '>
            Lorem ipsum dolor sit amet consectetur adipisicing elit
        </p>
        <form onSubmit={onSubmithandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 pl-3'>
            
            <input className='w-full sm:flex-1 outline-none border p-2 sm:text-sm text-xs' type="email" placeholder='Enter Your Email Here ' required/>
              <button type='submit' className='bg-black text-white text-xs px-10 py-4 '> SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox