"use client"
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GraphQLClient, gql, } from 'graphql-request';
import Link from "next/link";



export default function Home() {
  const hygraphEndpoint = "https://ap-south-1.cdn.hygraph.com/content/cm17fhlj002ay07uwmxmacwib/master"
  const router = useRouter()
// const hygraphClient = new GraphQLClient(hygraphEndpoint,{
//   method: 'GET',
//   headers: {
//     "Content-Type": "application/json",
//     authorization: `Bearer `+ key, 
//   },
// })


// const [windowHeight,setWindowHeight] = useState(0)
// const [user,setUser]= useState(false)
// const router = useRouter()
//   const listOfDivs = ["first div","second div","third div","fourth div","fifth div"]
const createAndPublishContact = async () => {
  // Create the contact
  const createResponse = await fetch(hygraphEndpoint, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer '+ key,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation {
        createTypeformQuiz(data: {listOfQuestions: {fullList:"from"}}) {
        listOfQuestions
        id
        }
        }
      `,
    }),
  });

  const createResult = await createResponse.json();
  console.log(createResult);
  const contactId = createResult.data.createTypeformQuiz.id;

  // Publish the contact
  const publishResponse = await fetch(hygraphEndpoint, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+ key,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `


         mutation {
        publishTypeformQuiz(where: {id: "${contactId}"}) {
        listOfQuestions
        id
        }
        }
      `,
    }),
  });

  const publishResult = await publishResponse.json();
  console.log(publishResult);
};

// useEffect(()=>{
// createAndPublishContact();

// return ()=> createAndPublishContact();
// },[])




//   const formerClass = "flex min-h-screen flex-col items-center justify-between p-24"

//   useEffect(()=>{

// window.scrollTo({top:windowHeight,behavior:"smooth"})
// console.log(windowHeight);

//   },[windowHeight])

//   const handleScroll = ()=>{
//     const height = window.innerHeight
//     console.log("play");
//     if (windowHeight === 0) {
//       setWindowHeight(window.innerHeight)
//       return
//     }
//    setWindowHeight(prev => prev + height)
//   }

  // if (!user) {
  //   router.push("/quiz")
  //   return
  // }


// mutation contact {
//   createContact (
//     data:{
//       firstname:"jokerhere",
//     }
//   )
//   {
//     id
//   }
// }
// const mutate = async ()=>{
// const mutationQuery =`
//  query {
//   contacts {
//     id
//     firstname
//   }
// }

// `
// const response = await hygraphClient.request(mutationQuery)
// console.log(response);

// }


useEffect(()=>{
// mutate()
// return ()=> mutate()
},[])


  return (
    <main className={"flex flex-col justify-center items-center  h-screen bg-[#F7F7F6] "}>

<h1 className="italic underline font-semibold text-lg">Surveys</h1>
<div className="w-full">
{surveyInfos.map((item,index)=>{

  return (
    <section key={index} onClick={()=> router.push(item.link)} className="border-navy flex items-center w-[90%] bg-white rounded-lg mx-auto my-4 py-2 border-[1px] border-[gray] shadow-md cursor-pointer hover:shadow-lg">
      <span className="bg-[#4C86CB] w-[40px] h-[40px] rounded-lg ml-2 mr-2" ></span> {item.name}
    </section>
  )
})}

</div>

    </main>
  );
}

const btn = ()=>{

  return (
    <>
    <button
onClick={createAndPublishContact}
className="px-10 rounded-md py-4 bg-blue-500 "
>send</button>
{/* <h1>Home</h1> */}
</>
  )
}


const surveyInfos = [
  {
    id:"1",
    name:"Survey 1-2",
    link:"/survey-one-two"
  },
  {
    id:"2",
    name:"Survey>3",
    link:"/survey-three"
  },
  {
    id:"3",
    name:"MG HIT 4",
    link:"/typeformquiz"
  },
  {
    id:"4",
    name:"MG HIT 3",
    link:"/mg-hit-three"
  },
  {
    id:"5",
    name:"PNH post-test",
    link:"/pnh-post-test"
  },
  {
    id:"6",
    name:"aHUS post-test",
    link:"/ahus-post-test"
  },
  {
    id:"7",
    name:"N.13.23 ITP Webhooks (copy) {still in process}",
    link:"/itp-webhooks"
  },
]