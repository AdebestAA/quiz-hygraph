
import ItpWebhooks from "@/components/ItpWebhooks";
import React from 'react'



    // const apiKey = 'tfp_7jNiNB7pBsroNt9fvjLHSWMLpkYRjABEpfDH888YB2Qp_hkTkjbhU58VN';
    // const endpoint = `https://api.typeform.com/forms/YpYxShez`;

const page = async() => {

//  const response = await fetch(endpoint, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'Content-Type': 'application/json'
//             }
//         });
//         // console.log(response);
        
        
//         if (!response.ok) {
//               throw new Error(`Error: ${response.statusText}`);
//           }
          
//           const data = await response.json();
//           // console.log(data);

  return (
 <div>
  still working on it....
 </div>
  )
}


export default page





// const apiKey ='tfp_7jNiNB7pBsroNt9fvjLHSWMLpkYRjABEpfDH888YB2Qp_hkTkjbhU58VN'; 
// const endpoint = `https://api.typeform.com/forms/YpYxShez`;

// export const getStaticProps = async () => {
//   const response = await fetch(endpoint, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${apiKey}`,
//       'Content-Type': 'application/json'
//     }
//   });

//   const data = await response.json();

//   return {
//     props: {
//       dataFromTypeForm: data
//     },
//     // Optionally, you can set revalidate to regenerate the page after a specified number of seconds
//     revalidate: 10, // Rebuild the page every 10 seconds
//   };
// };

// const Page = ({ dataFromTypeForm }) => {
//   return <ItpWebhooks dataFromTypeForm={dataFromTypeForm} />;
// };

// export default Page;
