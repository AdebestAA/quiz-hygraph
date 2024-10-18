export default async function GET() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();


    // const apiKey = 'tfp_HCy9DgL8mKzrx1SvWywAj36WC1BFEbDesVBxMddpHKYQ_3mPHrzNJZVgh5L';
    // const endpoint = `https://api.typeform.com/forms/NZtMaBON`;

    //  const response = await fetch(endpoint, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${apiKey}`,
    //             'Content-Type': 'application/json'
    //         }
    //     });

    //     // if (!response.ok) {
    //     //     throw new Error(`Error: ${response.statusText}`);
    //     // }

    //     const data = await response.json();
    //     console.log(data);
       

  

  // Return the posts data as JSON
  res.status(200).json(posts);
 
}