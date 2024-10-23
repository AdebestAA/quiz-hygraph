
import AhusPostTest from "@/components/AhusPostTest";



    const apiKey = process.env.NEXT_PUBLIC_TYPEFORM_TOKEN;
    const endpoint = `https://api.typeform.com/forms/iPDylGBA`;

const page = async() => {

 const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        
        
        if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
          }
          
          const data = await response.json();
          console.log(data);

  return (
    <AhusPostTest dataFromTypeForm={data} />
  )
}

export default page
