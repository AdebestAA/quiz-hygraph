"use client"
// import ActionBtn from '@/components/ActionBtn'
import React, { useEffect, useRef, useState } from 'react'
import { GraphQLClient, gql } from 'graphql-request';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import Completed from '@/components/Completed';


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
const [questionsFromHygraph,setQuestionsFromHygraph] = useState([])
const [loading,setLoading] = useState(false)
const [listOfAnswers,setListOfAnswers] = useState([])
const [wrongAnswer,setWrongAnswer] = useState([])
const [windowHeight,setWindowHeight] = useState(0)
const [score,setScore] = useState(0)
const [questionsAnswered,setQuestionsAnswered] = useState(0)
const [completed,setCompleted] = useState(false)
const eachQuestAndFeedback =useRef([])
const [divNumber,setDivNumber] = useState(0)
const [showFeedback,setShowFeedback] = useState(true)
const [choosenAnswer,setChoosenAnswer] = useState(false)

useEffect(()=>{

getDataMyData()


},[])

useEffect(()=>{

 

},[])


  useEffect(()=>{

if (!choosenAnswer) {
  document.body.style.overflow = "hidden"
  return
}

window.scrollTo({top:windowHeight,behavior:"smooth"})
console.log(windowHeight);

  },[windowHeight])

 const getDataMyData = async()=>{
   const getData =  await getIntroductionData()
  //  destructure your data
   const {quizModels} = getData
    // console.log(quizModels);
 setQuestionsFromHygraph(quizModels)
  }



const handleScrollDown = ()=>{
// console.log("get it",eachQuestAndFeedback.current.getBoundingClientRect().height /2);
// console.log("window height",document.documentElement.clientHeight);
  if (questionsAnswered !== 0 && questionsAnswered === questionsFromHygraph.length) {
    setCompleted(true)
    // alert("completed")
    return
  }   


  if (showFeedback) {
     window.scrollTo({top:window.scrollY + eachQuestAndFeedback.current[2].getBoundingClientRect().height / 2,behavior:"smooth"})
setShowFeedback(false)
return
  }

    

  // if (divNumber % 2 !== 1 ) {
    
  //   window.scrollTo({top:window.scrollY + eachQuestAndFeedback.current[2].getBoundingClientRect().height / 2,behavior:"smooth"})
    
  //   return
  // }

      if (divNumber < eachQuestAndFeedback.current.length - 1) {
      setDivNumber((prev)=> prev + 1);
    } else {
      setDivNumber(0); // Reset to first div if it's the last one
    }
     const nextDiv = eachQuestAndFeedback.current[divNumber + 1] || eachQuestAndFeedback.current[0];
   window.scrollTo({top:nextDiv.getBoundingClientRect().top + window.scrollY,behavior:"smooth"})
setShowFeedback(true)

  // Mine
    // const height = window.innerHeight
    // const height = document.documentElement.clientHeight + 80
  //   if (windowHeight === 0) {
  //     setWindowHeight( document.documentElement.clientHeight + 80)
  //     return
  //   }
  //  setWindowHeight(prev => prev + height)
  }


  const handleScrollUp = ()=>{

        const height =  document.documentElement.clientHeight
 if (windowHeight === 0) {
      return
    }
   setWindowHeight(prev => prev - height)
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

   

    useEffect(()=>{
// console.log(wrongAnswer);

    setTimeout(()=>{
  if (wrongAnswer.length > 0 || listOfAnswers.length > 0) {
  handleScrollDown()
  }
    },1500)
    },[wrongAnswer,listOfAnswers])


  return (
 
    <div className='min-h-screen md:text-md xs:text-sm text-xs'>
       {/* question */}
{questionsFromHygraph.map((item,index)=>{


return (
<article ref={el => eachQuestAndFeedback.current[index] = el} className={``} key={index}  >
<section className='min-h-screen flex flex-col justify-center align-center transition-all ease-linear duration-500'>
   <div className='flex flex-col lg:mx-64 sm:mx-16 mx-4 justify-center align-center'>
    <div className='flex gap-2 text-[navy] font-semibold'>
      <span>{index + 1}.</span>
<h1 className='sm:font-bold xxs:font-bold md:text-md xxs:text-sm  text-md text-[navy]'>{item.question}</h1>
    </div>
<aside>
    {item.options.map((option,optionIndex)=>{
        return <div key={optionIndex} className={` ${wrongAnswer.some(wrongArray => wrongArray.trim().toLowerCase() === option?.trim().toLowerCase()) ? "bg-red-100 border-red-800" : "bg-blue-100 border-blue-800"} border-[2px] rounded-sm my-[8px] px-[4px] md:py-[10px] relative cursor-pointer`}
          onClick={(e)=>{
            if (option.toLowerCase() === item.answer.toLowerCase()) {   
                const copyListOfAnswer = [...listOfAnswers]
                const addNewAnswer = [...copyListOfAnswer,option]
                console.log(addNewAnswer);
                setListOfAnswers(addNewAnswer)
                setScore(prev => prev + 1)
            }
          else if (option.toLowerCase() !== item.answer.toLowerCase()) {
          // alert("show")
          const newArray = []
          newArray.push(option)
          setWrongAnswer(newArray)
          }
        setQuestionsAnswered(prev => prev + 1)
        setChoosenAnswer(true)

        }}
        >
          <div className='flex gap-2 items-center'>
            <span className='font-semibold border-2 border-md border-[navy] h-[50%] my-2 px-[4px]'>{optionIndex === 0 ? "A" : optionIndex === 1 ? "B" : optionIndex === 2 ? "C" : "D"}</span>
            <p>{option.slice(3,option.length)}</p>
          </div>
         {listOfAnswers.some(eachAns => eachAns.toLowerCase() === option.toLowerCase()) && <span className='absolute top-[30%] right-[3%]'><FaCheck className='text-blue-900'/></span>}
            </div>
        
    })}
</aside>
   </div>
    </section>
    {/* feedback */}
    <section className='min-h-screen flex flex-col justify-center align-center'>
        <div className='lg:mx-64 sm:mx-16 mx-4'>
        <h1 className='font-bold  text-md md:text-sm xs:text-[red]'>{item.answerStatement}</h1>
        <br />
        <p>{item.feedback}</p>
        </div>
    </section>
    </article>

)
})}

   {!showFeedback && <div className='w-full  h-[8%] fixed bottom-[2%] left-[0%] flex justify-center gap-2 '> 
      {/* <button
       onClick={handleScrollUp}
      className='py-[0px] sm:px-4 px-8 font-bold bg-green-400 font-bold rounded-md'><IoIosArrowUp className='text-2xl' /> </button> */}
      <button
           onClick={handleScrollDown}
      className='sm:px-4 px-4 h-[3rem] text-[white] font-bold text-lg bg-green-800 font-bold rounded-md w-[40%] md:w-[5rem]'> Continue </button>
    </div>}
    {/* <Completed score={score}/> */}


    {completed && <Completed score={
      score / questionsFromHygraph.length * 100 
      }/>}
    </div>
  )
}

export default Quiz
