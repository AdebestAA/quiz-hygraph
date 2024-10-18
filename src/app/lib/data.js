
export async function getForms() {
    const apiKey = 'tfp_HCy9DgL8mKzrx1SvWywAj36WC1BFEbDesVBxMddpHKYQ_3mPHrzNJZVgh5L';
    const endpoint = `https://api.typeform.com/forms/NZtMaBON`;

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching forms:', error)
    }
}


getForms();

console.log("ade");