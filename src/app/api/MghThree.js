


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // If the request is not a POST, return a 405 Method Not Allowed
    res.status(405).json({ message: 'Only POST requests are allowed' });
    return;
  }

  try {
    // You can add your fetching and posting logic here
    // For example, fetching from Typeform and posting to Hygraph

    // Just to demonstrate, let's send a dummy response for now
    res.status(200).json({ message: 'API Route is working!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error handling request', error });
  }
}