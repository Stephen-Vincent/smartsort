import * as dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Ensure the RapidAPI key is loaded from the environment
const rapidApiKey = process.env.RAPIDAPI_KEY;

if (!rapidApiKey) {
  throw new Error("RapidAPI key is missing!"); // Ensure the key is available
}

async function testRapidApi() {
  const url =
    "https://free-chatgpt-api.p.rapidapi.com/chat-completion-one?prompt=hello"; // Endpoint URL

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": rapidApiKey, // Use the RapidAPI key from environment variables
      "x-rapidapi-host": "free-chatgpt-api.p.rapidapi.com", // Host URL for the RapidAPI service
    },
  };

  try {
    const response = await fetch(url);
    const data = await response.json(); // Parse the response as JSON
    console.log("API response:", data); // Log the response data
  } catch (error) {
    console.error("Error with the RapidAPI request:", error);
  }
}

// Call the function to test the API
testRapidApi();
