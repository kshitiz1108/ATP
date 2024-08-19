export const SelectTraveleslist = [
   
    {
        id:1,
        title:'Just Me',
        desc:'A solo traveler in exploration',
        icon:'',
        people:'1'
    },
    {
        id:2,
        title:'A couple',
        desc:'Two Travelers in tandem',
        icon:'',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun lovig adventures',
        icon:'',
        people:'3-5'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of Thrill Seekers',
        icon:'',
        people:'6-8'
    }

];

export const SelectBudgetOptions = [
   
    {
        id:1,
        title:'Cheap',
        desc:'Stay concious of costs',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on average side',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:"Don't worry about cost",
        icon:'💸'
    }

];

export const AI_PROMPT = "Generate Travel Plan for Location: {location}, for {noofdays} Days for {noofpeople} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {noofdays} days with each day plan with best time to visit in JSON format."