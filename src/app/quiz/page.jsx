"use client"
// import ActionBtn from '@/components/ActionBtn'
import React, { useEffect, useState } from 'react'
import { GraphQLClient, gql } from 'graphql-request';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";


const link = "https://eu-west-2.cdn.hygraph.com/content/cm03r14ii05eg07uowf1wpoqj/master"
const hygraphEndpoint = "https://eu-west-2.cdn.hygraph.com/content/cm03r14ii05eg07uowf1wpoqj/master"
const hygraphClient = new GraphQLClient(hygraphEndpoint)

const getIntroductionData = async()=>{
  const query = gql `
query MyQuery {
  quizModels {
    answer
    answerStatement
    id
    feedback
    options
    question
  }
}
  `
  const response = await hygraphClient.request(query)
  return response
}

const Quiz = () => {
    const [currentQuestion,setCurrentQuestion] = useState(0)
    const [translateValue,setTranslateValue] = useState(0)
    const [outerContainerValue,setOuterContainerValue] = useState(0)
    const [count,setCount] = useState(0)
const [questionsFromHygraph,setQuestionsFromHygraph] = useState([])
const [loading,setLoading] = useState(false)
const [checkAnswer,setCheckAnswer] = useState(false)
const [wordAnswer,setWordAnswer] = useState(0)
// const [listOfAnswers,setListOfAnswers] = useState(["player"])
const [listOfAnswers,setListOfAnswers] = useState(["player"])

useEffect(()=>{

getDataMyData()

},[])
 const getDataMyData = async()=>{
   const getData =  await getIntroductionData()
  //  destructure your data
   const {quizModels} = getData
    console.log(quizModels);
 setQuestionsFromHygraph(quizModels)
  }



    const questionsObjects = [
        {
            question:"who is the best player in the whole world",
            answer:"Ronaldo",
            options:["adipisicing eli","ipsum dolor","Jas","Shape"],
            feedback:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui natus provident quaerat vel possimus sit odit consectetur nostrum? Reprehenderit culpa sit assumenda sequi! Dolores, optio ipsam perferendis maiores adipisci sit."

        },
        {
            question:"who is the best player in the whole world",
            answer:"Ronaldo",
            options:[" maiores adipisci","provident quaerat","Reprehenderit","assumenda sequi!"],
            feedback:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui natus provident quaerat vel possimus sit odit consectetur nostrum? Reprehenderit culpa sit assumenda sequi! Dolores, optio ipsam perferendis maiores adipisci sit."

        },
        {
            question:"who is the best player in the whole world",
            answer:"Ronaldo",
            options:["consectetur nostrum?","Qui natus provident","Dolores, optio ipsam","possimus sit odit"],
            feedback:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui natus provident quaerat vel possimus sit odit consectetur nostrum? Reprehenderit culpa sit assumenda sequi! Dolores, optio ipsam perferendis maiores adipisci sit."

        },
        {
            question:"who is the best player in the whole world",
            answer:"Ronaldo",
            options:["Messi","Ronaldo","Neymar","Mbappe"],
            feedback:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui natus provident quaerat vel possimus sit odit consectetur nostrum? Reprehenderit culpa sit assumenda sequi! Dolores, optio ipsam perferendis maiores adipisci sit."

        },
    ]

    const increaseTranslateValue= ()=>{
        if (translateValue === -100) {
             setTranslateValue((prev) => prev + 100)
        }
    if (count === 0) {
    return
    }

    if (translateValue === -100 ) {
    setTranslateValue((prev) => prev - 100)
    return
    }
    if (translateValue === 0) {
        setOuterContainerValue((prev) => prev + 100)
        setCount((prev)=> prev - 1)
        return
    }

    }
    const decreaseeTranslateValue= ()=>{
    if (count === questionsFromHygraph.length - 1) {
    return
    }
    if (translateValue === 0) {
    setTranslateValue((prev) => prev - 100)
    return
    }
    if (translateValue === -100) {
    setOuterContainerValue((prev) => prev - 100)
    setTranslateValue(0)
    setCount((prev)=> prev + 1)
    return
    }
    }

    useEffect(()=>{


    },[translateValue])
  return (
 
    <div className=' min-h-screen'>
       {/* question */}
{questionsFromHygraph.map((item,index)=>{


return (
<article className='overflow-y-hidden h-screen transition-all ease-linear duration-500 ' key={index} style={{transform:`translateY(${outerContainerValue}%)`}} >
<section className='bg-white min-h-screen flex flex-col justify-center align-center transition-all ease-linear duration-500 ' style={{transform:`translateY(${translateValue}%)`} }>
   <div className='flex flex-col lg:mx-64 sm:mx-16 mx-4 justify-center align-center'>
<h1 className='sm:font-bold xxs:font-semibold md:text-md xxs:text-sm  text-md text-[navy]'>{item.question}</h1>
<aside>
    {item.options.map((option,index)=>{
   

        return <div key={index} className='bg-blue-100 border-[2px] border-blue-800 rounded-sm my-[8px] px-[4px] md:py-[10px] relative cursor-pointer'
        onClick={()=>{
            if (option.toLowerCase() === item.answer.toLowerCase()) {   
                const copyListOfAnswer = [...listOfAnswers]
                const addNewAnswer = [...copyListOfAnswer,option]
                console.log(addNewAnswer);
                setListOfAnswers(addNewAnswer)
            }
        }}
        >
            <p>{option}</p>
         {listOfAnswers.some(eachAns => eachAns.toLowerCase() === option.toLowerCase()) && <span className='absolute top-[30%] right-[3%]'><FaCheck className='text-blue-900'/></span>}
            </div>
        
    })}
</aside>
   </div>
    </section>
    {/* feedback */}
    <section className='h-screen flex flex-col justify-center align-center transition-all ease-linear duration-500' style={{transform:`translateY(${translateValue}%)`} }>
        <div className='lg:mx-64 sm:mx-16 mx-4'>
        <p>{item.answerStatement}</p>
        <br />
        <p>{item.feedback}</p>
        </div>
    </section>
    </article>

)
})}
    <div className='w-full h-[8%] fixed bottom-[2%] left-[0%] flex justify-center gap-2 '> 
      <button
       onClick={increaseTranslateValue}
      className='py-[0px] sm:px-4 px-8 font-bold bg-green-400 font-bold rounded-md'><IoIosArrowUp className='text-2xl' /> </button>
      <button
         
           onClick={decreaseeTranslateValue}
      className='py-[0px]sm:px-4 px-8 font-bold bg-green-400 font-bold rounded-md '> < IoIosArrowDown className='text-2xl' /></button>
    </div>
    </div>
  )
}

export default Quiz
