"use client"
import React, { useEffect, useRef, useState } from 'react'
import { GraphQLClient, gql, } from 'graphql-request';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


//  const endpoint = "https://api-eu-west-2.hygraph.com/v2/cm1hxxlry022j07ukn5k554xn/master";
 const endpoint = "https://eu-west-2.cdn.hygraph.com/content/cm1hxxlry022j07ukn5k554xn/master";

const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjczNTk5MjYsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY20xaHh4bHJ5MDIyajA3dWtuNWs1NTR4bi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiY2M2MmY2NDUtYWM5MC00MzQ1LWI1OTMtOTkyZGYxZWM0MjQxIiwianRpIjoiY20xamRpMTIzMDA0aDA4bWZmMTRsZmppeiJ9.TTEijaTcRbfD4duJsAMlSodGJ-dafML1wWHYOWSGVSW0PWbv9ClrAFigqU5hX3D1ykFfXjKScRON-i4GAecHnRBelMDotjbKWwLtZhC2oireolALxupiCSZc7hOrdLz7--IAEbkQVtKheDmoezNOfWaCQw8lSE-9QG-FqGhv_JRF5LI0UeUHDrjm_goHMskVFeiDCE0s6-EH2Oi6HMWPa1EZO5RjDSwwbVEc_bEaGI8EBFkbXem6X7ZVeph3XaJv5pthXKL6Y1aVlb6bDIgKIYjuRjrndSt0VQ0T8Z3l6IIMGdA4ECT8bLmns6sh9HPcEzf9eD3EyyYdRqTAgELeoe65OeBoKo9vum3cziyA15mq579anHNg7AGUjbNe5Xu2uRS93pMeknCuWVVKETwvCvm6iaFRA0UXiDmKDGitajoLzCaGNyc_C5kgrSmUJgAN48xwppflyu2uQpDMlugJd95fkDbdpPB48SNTtRjIXxqk8alJH2zC0at72Y0RHkZNG0ydvu-qScTVpTiP680OKWRnibrhIhiOs55-NPU-5Y4vYmvR610Udkn_oFe3SJ80w3Kr4FEWJIuE6HTGQF8R9IenpZ2iLs_f9nQJhR4nM7AgIinqIiAdu8CdZEJfrHdhqQTIaXPZPiYboj7bPowJ930-gxjOBMgBJk6rRIggln8"

 
 const  PnhPostTest = ({dataFromTypeForm}) => {
   const [typeformData,setTypeFromData] = useState(dataFromTypeForm)
   const [dataPosted,setDataPosted] = useState(false)
   const [questionsToDisplay,setQuestionsToDisplay] = useState([])
   const [step,setStep] = useState(0)
   const [startQuiz,setStartQuiz] = useState(false)
   
   const eachQuestAndFeedback =useRef([])
   

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});
 
  const deleteQuestMutation = gql`
 mutation deletePnhPostTest($id: ID!) {
    deletePnhPostTest(where: { id: $id }) {
      id
    }
  }
`;

// Mutation to create a new entry
const createQuestMutation = gql`
 mutation createPnhPostTest($data: PnhPostTestCreateInput!) {
    createPnhPostTest(data: $data) {
      id
      placeholder
    }
  }
`;

// Mutation to publish the new entry
const publishQuestMutation = gql`
  mutation publishPnhPostTest($id: ID!) {
    publishPnhPostTest(where: { id: $id }) {
      id
      placeholder
      publishedAt
    }
  }
`;

useEffect(()=>{
overwriteAndPublishQuest(dataFromTypeForm);
// console.log(dataFromTypeForm);

},[])

const overwriteAndPublishQuest = async (newData) => {
  try {
    // Step 1: Query to check for existing entries
    const getExistingQuestQuery = gql`
    query getExistingPnhPostTests {
   pnhPostTests {
    id
    placeholder
    }
    }
    `;

    const existingData = await client.request(getExistingQuestQuery);

    if (existingData.pnhPostTests.length > 0) {
      // Step 2: Delete the existing quest
      const questId = existingData.pnhPostTests[0].id;
      await client.request(deleteQuestMutation, { id: questId });
      console.log('Existing quest deleted');
    }

    // Step 3: Create a new quest
    const data = {
  placeholder: newData
   
};
      const newQuest =await client.request(createQuestMutation, { data })
    // const newQuest = await client.request(createQuestMutation, {
    //   fields: newData,
    // });
    const questId = newQuest.createPnhPostTest.id;
    console.log('New quest created:', newQuest);

    // Step 4: Publish the new quest
    const publishedQuest = await client.request(publishQuestMutation, {
      id: questId,
    });
    console.log('Quest published:', publishedQuest);
    console.log(publishedQuest.id);
    
   setDataPosted(()=> {
    if (publishedQuest.publishPnhPostTest.id) {
      return true
    }
    else{
      false
    }
   })
    
  } catch (error) {
    console.error('Error handling quest data:', error);
  }
};

 useEffect(() => {
    if (!dataPosted) {
      return
    }
    const fetchPnhPostTestData = async () => {
      const query = gql`
        query {
            pnhPostTests {
            id
            placeholder
            }
        }
      `;

      try {
        const getData = await client.request(query);
        console.log('Fetched Quest Data:', getData);
        console.log(getData.pnhPostTests[0]);
        setQuestionsToDisplay(getData.pnhPostTests)
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  fetchPnhPostTestData();
  console.log(dataPosted);
  
  }, [dataPosted]);

useEffect(()=>{
document.body.style.overflow = "hidden"
window.scrollTo({top:0,behavior:"smooth"})
},[])

useEffect(()=>{
console.log(questionsToDisplay[0]?.placeholder?.fields?.length);
console.log("steps",step);


},[step])

const handleScroll = ()=>{


window.scrollTo({top:window.scrollY + eachQuestAndFeedback.current[step].getBoundingClientRect().top,behavior:"smooth"})
}
useEffect(()=>{
if (!startQuiz) {
return
}
handleScroll()
},[step,startQuiz])


if (questionsToDisplay.length < 1) {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-[200px] h-[200px]  flex justify-center items-center flex-col">
      <img src="spinner.svg" alt="spinner" className="w-[100px]" />
      <p className="text-[#000080] font-semibold">loading questions</p>
      </div>
    </div>
  )
}



  return (
     <main className={"bg-[#EFEFEF] text-[#403D99]  h-[100%]"}>
{/* scroll up and down btn */}

<div className=" fixed space-x-[2px] bottom-[10%] right-[5%]">
    <button className="bg-green-800 px-4 py-2 rounded-md" 
    onClick={()=>{
    if (!startQuiz) {
    return
}
    if (step + 1  == questionsToDisplay[0]?.placeholder?.fields?.length) {
        return
    }
    setStep(prev => prev + 1)
}}
    ><IoIosArrowDown className="text-white"/></button>
    <button className="bg-green-800 px-4 py-2 rounded-md" 
    onClick={()=>{
        if (!startQuiz) {
            return
        }
        if (step == 0) {
            return
        }
        setStep(prev => prev - 1)
    }}
    ><IoIosArrowUp className="text-white"/></button>
</div>

{questionsToDisplay[0]?.placeholder?.welcome_screens?.length > 0  && <div className="text-center px-64 text-lg flex flex-col items-center justify-center min-h-screen">
<h1 className="font-bold text-[navy] text-[2rem] px-32">{questionsToDisplay[0]?.placeholder?.welcome_screens[0].title.split("*").join("")}</h1>
<article>{questionsToDisplay[0]?.placeholder?.welcome_screens[0]?.properties.description.split("\n").map((item,index)=>{

if (index === 0) {
    return <p key={index} className="mt-4  text-[0.95rem]">
        {item.split("*").map((ash,ashInd)=>{
          if (ash.trim() === "argenx, US".trim()) {
            return (
              <span key={ashInd} className="font-bold">{ash}</span>
            )
          }
          return (
            <span key={ash}>{ash}</span>
          )
        })}
    </p>
}
    return <p key={index} className="mt-4  text-[0.95rem]">
        {item}
    </p>
})}</article>
{questionsToDisplay[0]?.placeholder?.welcome_screens[0]?.properties.show_button && 

<button className="bg-green-800 text-white py-2 px-4 rounded-md"
onClick={()=>{
    setStartQuiz(true)
}}
>{questionsToDisplay[0]?.placeholder?.welcome_screens[0]?.properties.button_text}</button>

}
</div>
}

{/* questions */}

<div>
   {questionsToDisplay[0]?.placeholder?.fields?.map((item,index)=>{

if (item.type == "statement") {
return (
    <div  ref={el => eachQuestAndFeedback.current[index] = el}   key={item?.id} className="text-center px-64 py-16 text-lg flex flex-col items-center justify-center  h-screen overflow-y-scroll space-y-4">
{item?.title?.split("\n").map((statement,statementIndex)=>{

return (
    <p key={statementIndex} className="text-start w-full text-[0.95rem]">
        {statement}
    </p>
) 

})}
<button
onClick={()=>{
    if (step + 1  == questionsToDisplay[0]?.placeholder?.fields?.length) {
        return
    }
    setStep(prev => prev + 1)
}}
className="bg-green-800 text-white py-2 px-4 rounded-md" >{item.properties.button_text}</button>
    </div>
)
}

else if (item.type == "multiple_choice") {
  
    return (
    <div  ref={el => eachQuestAndFeedback.current[index] = el}  key={item?.id} className="text-center px-64 text-lg flex flex-col items-center  h-screen  justify-center">
<h1 className="w-full text-start font-bold" >{item.title}</h1>

<div className='w-full'>

{item?.properties?.choices?.map((choice,choiceIndex)=>{
    
    let option = "A"
    if (choiceIndex == 1) {
        option = "B"
    }
    else if (choiceIndex === 2) {
        option = "C"
    }
    else if (choiceIndex === 3) {
        option = "D"
    }
    else if (choiceIndex === 4) {
        option = "E"
    }
    else if (choiceIndex === 5) {
        option = "F"
    }
    else if (choiceIndex === 6) {
        option = "G"
    }
    else if (choiceIndex === 7) {
        option = "H"
    }
    
    else if (choiceIndex === 8) {
        option = "I"
    }
    else if (choiceIndex === 9) {
        option = "J"
    }
    
    return (
        
        <aside key={choice.id} className="my-2 w-[35%] rounded-sm text-start text-[0.95rem] border-[2px] border-[navy] flex items-start px-2 py-2 gap-x-2 bg-[#D7DDE8] hover:bg-[#A6BCDA]  cursor-pointer" 
        onClick={()=>{
            if (step + 1 == questionsToDisplay[0]?.placeholder?.fields?.length) {
                return
            }
            
            setStep(prev => prev + 1)
        }}
        >
  <span className="border-[2px] border-[navy] px-2 rounded-sm " 
  >{option}</span> 
  <p>
     {choice.label}
    </p>
    </aside>
    
)

})}
</div>
<div className='w-full flex flex-start'>

<button
onClick={()=>{
    if (step + 1 == questionsToDisplay[0]?.placeholder?.fields?.length) {
        return
    }
    
    setStep(prev => prev + 1)
}}
className="bg-green-800 text-white py-2 px-4 rounded-md">ok</button>
    </div>
</div>
    )
}

   })}

</div>


    </main>
  )
}

export default PnhPostTest
