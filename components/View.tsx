import React from 'react'
import Ping from "@/components/Ping"

const View = ({id}: {id: string}) => {
  return (
    <div className='flex justify-end items-center mt-5 fixed bottom-3 right-3'>
    <div className='absolute -top-2 -right-2'>
        <Ping/>
    </div>
    </div>
  )
}

export default View