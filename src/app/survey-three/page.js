
// import SurveyThree from "@/components/SurveyThree";


    const apiKey = 'tfp_7jNiNB7pBsroNt9fvjLHSWMLpkYRjABEpfDH888YB2Qp_hkTkjbhU58VN';
    const endpoint = `https://api.typeform.com/forms/U5Kt7eg9`;

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
        //       throw new Error(`Error: ${response.statusText}`);
        //   }
          
          const data = await response.json();
          // console.log(data); 

  return (
    <div>
      hello
    </div>
    // <SurveyThree dataFromTypeForm={data} />
  )
}

export default page
