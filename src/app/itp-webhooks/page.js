
import AhusPostTest from "@/components/AhusPostTest";
import ItpWebhooks from "@/components/ItpWebhooks";



    const apiKey = process.env.TYPEFORM_TOKEN
    const endpoint = `https://api.typeform.com/forms/YpYxShez`;

const page = async() => {

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
    <ItpWebhooks dataFromTypeForm={data} />
  )
}

export default page
