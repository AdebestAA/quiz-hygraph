"use client"
import React, { memo, useCallback, useEffect, useState } from 'react'
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = "https://api-eu-west-2.hygraph.com/v2/cm1hxxlry022j07ukn5k554xn/master";
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjczNTk5MjYsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY20xaHh4bHJ5MDIyajA3dWtuNWs1NTR4bi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiY2M2MmY2NDUtYWM5MC00MzQ1LWI1OTMtOTkyZGYxZWM0MjQxIiwianRpIjoiY20xamRpMTIzMDA0aDA4bWZmMTRsZmppeiJ9.TTEijaTcRbfD4duJsAMlSodGJ-dafML1wWHYOWSGVSW0PWbv9ClrAFigqU5hX3D1ykFfXjKScRON-i4GAecHnRBelMDotjbKWwLtZhC2oireolALxupiCSZc7hOrdLz7--IAEbkQVtKheDmoezNOfWaCQw8lSE-9QG-FqGhv_JRF5LI0UeUHDrjm_goHMskVFeiDCE0s6-EH2Oi6HMWPa1EZO5RjDSwwbVEc_bEaGI8EBFkbXem6X7ZVeph3XaJv5pthXKL6Y1aVlb6bDIgKIYjuRjrndSt0VQ0T8Z3l6IIMGdA4ECT8bLmns6sh9HPcEzf9eD3EyyYdRqTAgELeoe65OeBoKo9vum3cziyA15mq579anHNg7AGUjbNe5Xu2uRS93pMeknCuWVVKETwvCvm6iaFRA0UXiDmKDGitajoLzCaGNyc_C5kgrSmUJgAN48xwppflyu2uQpDMlugJd95fkDbdpPB48SNTtRjIXxqk8alJH2zC0at72Y0RHkZNG0ydvu-qScTVpTiP680OKWRnibrhIhiOs55-NPU-5Y4vYmvR610Udkn_oFe3SJ80w3Kr4FEWJIuE6HTGQF8R9IenpZ2iLs_f9nQJhR4nM7AgIinqIiAdu8CdZEJfrHdhqQTIaXPZPiYboj7bPowJ930-gxjOBMgBJk6rRIggln8";

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});


const TryAgain = ({typeformData}) => {
const [idToPublish,setIdToPublish] = useState(null)
const [sendingData,setSendingData] = useState(true)

//     useEffect(()=>{
// console.log();
//     if (idToPublish) {
//     //  setSendingData(false) 
//     return
//     }
//     console.log("why three times?");
// performOperation()


// return ()=> performOperation()
//     },[])

console.log("show this");

 const performOperation =  async() => {

// Define the GraphQL mutation
const mutation = gql`
  mutation createQuest($data: QuestCreateInput!) {
    createQuest(data: $data) {
      id
      placeholder
    }
  }
`;

// Prepare the data for the mutation
const data = {
  placeholder: typeformData,
   
};
if (idToPublish) {
  return
}
try {
  const createdData =await client.request(mutation, { data })
      console.log('Success:', createdData);
    // if (createdData.createQuest.id) {
    //   setSendingData(false)
    // }
        setIdToPublish(createdData.createQuest.id)
} catch (error) {
   console.error('Error:', error.response.errors || error);
}
// const createdData = client.request(mutation, { data })
//   .then((response) => {
//     console.log('Success:', response);
//     if (response.createQuest.id) {
//       setSendingData(false)
//     }
//     setIdToPublish(response.createQuest.id)

    
//   })
//   .catch((error) => {
//     console.error('Error:', error.response.errors || error);
//   });



 }
 //   publish

  useEffect(() => {
    console.log("rin once");
    performOperation(); 
  }, []);  

 const publishTheQuestions = async()=>{


    const publishQuestMutation = gql`
  mutation publishQuest($id: ID!) {
    publishQuest(where: { id: $id }) {
      id
      placeholder
      publishedAt
    }
  }
`;
    const publishQuestVariables = {
  id:idToPublish, // Use the id from the created entry
};

try {
  const publishedData = await client.request(publishQuestMutation, publishQuestVariables);
  console.log('Quest published:', publishedData);
} catch (error) {
  console.error('Error publishing quest:', error);
}
 }

 useEffect(()=>{
    console.log(idToPublish);
    
if (!idToPublish) {
    return
}
publishTheQuestions()
// setIdToPublish(null)

 },[idToPublish])

// const myFields = {
//   questions: [
//     { key: "value1" },
//     { anotherKey: "value2" }
//   ]
// };

useEffect(()=>{
// console.log(`
//     mutation {
//   createFormQuestion(
//   data: {
//   fields:` + JSON.stringify({name:"blows"}) + `
//   }
//   ) {
//   id
//   fields
//   }
//   }`);


},[])
// https://api-eu-west-2.hygraph.com/v2/cm1hxxlry022j07ukn5k554xn/master
// https://eu-west-2.cdn.hygraph.com/content/cm1hxxlry022j07ukn5k554xn/master
const getClient = new GraphQLClient('https://api-eu-west-2.hygraph.com/v2/cm1hxxlry022j07ukn5k554xn/master');

  useEffect(() => {
    const fetchQuestData = async () => {
      const query = gql`
        query {
        quests {
        id
        placeholder
        }
        }
      `;

      try {
        const getData = await getClient.request(query);
        console.log('Fetched Quest Data:', getData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // fetchQuestData();
  }, []);


  return (
    <div>
    <button
    className="px-10 rounded-md py-4 bg-red-500 "
    >send</button>
    </div>
  )
}

export default TryAgain
