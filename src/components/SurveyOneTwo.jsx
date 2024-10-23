"use client"
import React, { useEffect, useRef, useState } from 'react'
import { GraphQLClient, gql, } from 'graphql-request';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


 const endpoint = "https://api-eu-west-2.hygraph.com/v2/cm1hxxlry022j07ukn5k554xn/master";
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjkzNDc4NzUsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY20xaHh4bHJ5MDIyajA3dWtuNWs1NTR4bi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiODdkZGM5NDItYmI5Zi00MTAyLTliZGMtYjM3ODQzNjk5ZmQ2IiwianRpIjoiY20yZzkyb2ljMGVncjA4bDZnd3YyZTB6YiJ9.Aou8_EyWxlNHM-8qkLJF5pjTtDcLDPKgoLr3v_EHJt0OwW36Y8Z-wpt9Sq4zHYsYFaMZZPcPccci8b-01eGUQ1_RJU5Dawv6txIGkpf5LdP--cHLtwq1t4uQYkgkH2dDX3zrGzRP1pv8p0Vk2mkTjFDKxgEdbfSMaoFbCYFcy7gEKPWP4OBePTpD3rccjSttDdrx1TvF0DenvbOqwd9FiE_wWi0yL9nZePjO0T7FrSH1s_muZQDKszg7_yBbDgPsNB2idipVZiyJ5euwM_zzv54dk9lqY3sDIVQLA4Z3WcPZIhsW5iRG2NIj0qPG-J_h16XCuJWlBxf06BF984lWcDnjBBPoZ5NurOTLOupvMyVFieRIv2JRYPFk5B2QwE1Pwd3c5eMIIaqQVPc5DMizI8cGEYqPCo5uFcDBY7dCCsEMU-rO-m40X882chVq9LYjkr5gOUL4ePOExJiMtk_Yjj0iIm9I_L2PF2F6PdJb-EXmYR9I1HVGeglW7kx_9d7EVb2-RzjgxPK3DYL8U2J1PAYOozygCyFyacP-IjXnZf3BIyCiZoDf1FWEcKWMpzMzO_jEICesvhgvz0qJ4piXv-5Bn0qSRSM_cg6zF5M9m8hKH5leYla8q0snc3DPkYCAqwQ_6DQU6UpH3nYXQbdSJfB9ega0KXpPQj1ENDUlqnM"

const SurveyOneTwo = ({dataFromTypeForm}) => {
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
 mutation deleteSurveyOneTwo($id: ID!) {
    deleteSurveyOneTwo(where: { id: $id }) {
      id
    }
  }
`;

// Mutation to create a new entry
const createQuestMutation = gql`
 mutation createSurveyOneTwo($data: SurveyOneTwoCreateInput!) {
    createSurveyOneTwo(data: $data) {
      id
      placeholder
    }
  }
`;

// Mutation to publish the new entry
const publishQuestMutation = gql`
  mutation publishSurveyOneTwo($id: ID!) {
    publishSurveyOneTwo(where: { id: $id }) {
      id
      placeholder
      publishedAt
    }
  }
`;

useEffect(()=>{
overwriteAndPublishQuest(dataFromTypeForm);
},[])

const overwriteAndPublishQuest = async (newData) => {
  try {
    // Step 1: Query to check for existing entries
    const getExistingQuestQuery = gql`
    query getExistingSurveyOneTwos {
   surveyOneTwos {
    id
    placeholder
    }
    }
    `;

    const existingData = await client.request(getExistingQuestQuery);

    if (existingData.surveyOneTwos.length > 0) {
      // Step 2: Delete the existing quest
      const questId = existingData.surveyOneTwos[0].id;
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
    const questId = newQuest.createSurveyOneTwo.id;
    console.log('New quest created:', newQuest);

    // Step 4: Publish the new quest
    const publishedQuest = await client.request(publishQuestMutation, {
      id: questId,
    });
    console.log('Quest published:', publishedQuest);
    console.log(publishedQuest.id);
    
   setDataPosted(()=> {
    if (publishedQuest.publishSurveyOneTwo.id) {
      return true
    }
    else{
      false
    }
   })
    
SurveyOneTwo
  } catch (error) {
    console.error('Error handling quest data:', error);
  }
};

 useEffect(() => {
    if (!dataPosted) {
      return
    }
    const fetchSurveyOneTwoData = async () => {
      const query = gql`
        query {
            surveyOneTwos {
            id
            placeholder
            }
        }
      `;

      try {
        const getData = await client.request(query);
        console.log('Fetched Quest Data:', getData);
        console.log(getData.surveyOneTwos[0]);
        setQuestionsToDisplay(getData.surveyOneTwos)
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  fetchSurveyOneTwoData();
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

<div className='flex flex-wrap justify-between'>

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
    
    return (
        
        <aside key={choice.id} className="my-2 w-[30%] rounded-sm text-start text-[0.95rem] border-[2px] border-[navy] flex items-start px-2 py-2 gap-x-2 bg-[#D7DDE8] hover:bg-[#A6BCDA]  cursor-pointer" 
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

export default SurveyOneTwo
