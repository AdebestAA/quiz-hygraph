import LetsSee from "@/components/LetsSee";
import SendTypeformData from "@/components/SendTypeformData";
import TryAgain from "@/components/TryAgain";
  const apiKey = process.env.TYPEFORM_TOKEN
    const endpoint = `https://api.typeform.com/forms/a85yckVH`;

const QuizData = async() => {

   const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        
        
        // if (!response.ok) {
          //     throw new Error(`Error: ${response.statusText}`);
          // }
          
          const data = await response.json();
          console.log(data);
   
  
 return (
 <div>  
    <SendTypeformData  dataFromTypeForm={data} />
    {/* <TryAgain typeformData={data} /> */}
 </div>
 )
}

export default QuizData





// export const  fetchTypeFormData = async()=>{


//      const response = await fetch(endpoint, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         // if (!response.ok) {
//         //     throw new Error(`Error: ${response.statusText}`);
//         // }
//         const data = await response.json();
      
        

// }

