
import PnhPostTest from "@/components/PnhPostTest";



    // const apiKey = process.env.NEXT_PUBLIC_TYPEFORM_TOKEN;
    
    const apiKey = 'tfp_GP2QjtEzGgDo9yb2CLDcHW6sMiBwWWq5rYJPs83v3yAm_3mNY3DvC114uKS';
    const endpoint = `https://api.typeform.com/forms/dGNnJsgE`;
    //  const token = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;

const page = async() => {

 const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        // console.log(response);
        
        
        // if (!response.ok) {
          //     throw new Error(`Error: ${response.statusText}`);
          // }
          
          const data = await response.json();
          // console.log(data);

  return (

    <PnhPostTest dataFromTypeForm={data} />
  )
}

export default page
