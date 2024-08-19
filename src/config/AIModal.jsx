
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  export const apiKey =import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"hotels\": [\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50-$100 per night\",\n      \"hotelImageUrl\": \"https://images.trvl-media.com/hotels/1000000/900000/899000/898800/898869/898869_123.jpg\",\n      \"geoCoordinates\": \"36.1699, -115.1423\",\n      \"rating\": 4.0,\n      \"description\": \"A budget-friendly hotel located in the heart of downtown Las Vegas, with a casino, a rooftop pool, and live entertainment.\"\n    },\n    {\n      \"hotelName\": \"Golden Nugget Las Vegas\",\n      \"hotelAddress\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"$60-$150 per night\",\n      \"hotelImageUrl\": \"https://images.trvl-media.com/hotels/1000000/900000/899000/898800/898872/898872_127.jpg\",\n      \"geoCoordinates\": \"36.1696, -115.1429\",\n      \"rating\": 4.5,\n      \"description\": \"A classic Las Vegas hotel with a vibrant casino, a world-famous shark tank, and several dining options.\"\n    },\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"$40-$80 per night\",\n      \"hotelImageUrl\": \"https://images.trvl-media.com/hotels/1000000/900000/899000/898600/898646/898646_102.jpg\",\n      \"geoCoordinates\": \"36.1184, -115.1722\",\n      \"rating\": 3.5,\n      \"description\": \"A family-friendly hotel with a circus theme, carnival midway, and multiple dining options.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": 1,\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"A pedestrian-friendly street with a canopy of lights, live music, and street performers.\",\n          \"placeImageUrl\": \"https://www.fremontstreetexperience.com/images/gallery/fsx-gallery-12-big.jpg\",\n          \"geoCoordinates\": \"36.1699, -115.1423\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"time\": \"Evening (after sunset)\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"plan\": [\n        {\n          \"placeName\": \"Hoover Dam\",\n          \"placeDetails\": \"A massive concrete arch-gravity dam on the Colorado River, a short drive from Las Vegas.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Hoover_Dam_from_Arizona.jpg/1200px-Hoover_Dam_from_Arizona.jpg\",\n          \"geoCoordinates\": \"36.0051, -114.9872\",\n          \"ticketPricing\": \"$30 per person\",\n          \"rating\": 5.0,\n          \"time\": \"Morning\"\n        },\n        {\n          \"placeName\": \"The Strip\",\n          \"placeDetails\": \"A world-famous boulevard lined with casinos, hotels, and entertainment venues.\",\n          \"placeImageUrl\": \"https://www.visitlasvegas.com/sites/default/files/styles/page_hero/public/media/2022-03/20220317_Strip_Aerial_2.jpg\",\n          \"geoCoordinates\": \"36.1146, -115.1729\",\n          \"ticketPricing\": \"Free (except for attractions)\",\n          \"rating\": 4.0,\n          \"time\": \"Afternoon/Evening\"\n        }\n      ]\n    },\n    {\n      \"day\": 3,\n      \"plan\": [\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"A scenic desert area with red sandstone cliffs, hiking trails, and rock climbing opportunities.\",\n          \"placeImageUrl\": \"https://www.nps.gov/redr/planyourvisit/images/redrock-canyon-national-conservation-area-1024x768.jpg\",\n          \"geoCoordinates\": \"36.1303, -115.3325\",\n          \"ticketPricing\": \"$15 per vehicle\",\n          \"rating\": 4.5,\n          \"time\": \"Morning\"\n        },\n        {\n          \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n          \"placeDetails\": \"A free, world-renowned botanical garden showcasing elaborate floral displays and themed installations.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/media/images/bellagio-conservatory-botanical-garden-gallery-images/Conservatory-04-2023-4-1-2023-Flowers-1.jpg\",\n          \"geoCoordinates\": \"36.1146, -115.1725\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.0,\n          \"time\": \"Afternoon\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Explanation:**\n\n* **Hotels:** The list includes three budget-friendly hotels in Las Vegas, providing price ranges, image URLs, geo-coordinates, ratings, and descriptions.\n* **Itinerary:** A 3-day itinerary is outlined, with each day's plan consisting of:\n    * **Day:** The day number (1, 2, or 3).\n    * **Plan:** An array of places to visit, including:\n        * **Place Name:** The name of the attraction.\n        * **Place Details:** A brief description of the attraction.\n        * **Place Image Url:** A URL for a relevant image of the place.\n        * **Geo Coordinates:** Latitude and longitude coordinates for location.\n        * **Ticket Pricing:**  Estimated pricing information (if applicable).\n        * **Rating:** An approximate rating (out of 5).\n        * **Time:** Suggested time to visit, considering day and activity type.\n\n**Important Notes:**\n\n* This is a suggested itinerary; you can customize it to fit your preferences and interests.\n* Prices are approximate and can vary based on season, availability, and specific experiences.\n* Consider researching transportation options for getting between attractions.\n* Booking in advance may help secure better prices and availability, especially during peak season.\n* Remember to factor in time for eating and resting.\n* Don't forget to check the official websites of attractions for updated information and any necessary reservations. \n"},
          ],
        },
      ],
    });
  
