"use client"
import React, { useEffect } from 'react'

const LetsSee = ({data}) => {
  

    useEffect(()=>{
      console.log("lets see");
      
console.log(data);
    },[data])
  return (
    <div>
      from lets see
    </div>
  )
}

export default LetsSee
