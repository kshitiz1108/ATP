import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatSession } from '@/config/AIModal';
import { apiKey } from '@/config/AIModal';
import { AI_PROMPT, SelectBudgetOptions, SelectTraveleslist } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
    const [place,setPlace] = useState();
    const [loading,setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData,setFormData] = useState([]);
    const navigate = useNavigate();

    const handleInputChange = (name,value) => {
       setFormData({
        ...formData,
        [name]:value
       })
    }

    useEffect(() => {
      console.log(formData)
    }, [formData]);
    
const login = useGoogleLogin({
  onSuccess:(codeResp) => GetUserProfile(codeResp),
  onError:(error)=>console.error(error)
  
})



const OnGenerateTrip =  async () => {

  console.log(apiKey);
    
   const user  = localStorage.getItem('user');

   if(!user){
    setOpenDialog(true);
    return;
   }
   
    if(formData?.noOfDays > 10 && !formData?.budget || !formData?.location || !formData?.noOfDays || !formData?.noofpeople){
        toast("Please Fill all the details")
    }
    setLoading(true);
   const FINAL_PROMPT = AI_PROMPT
   .replace('{location}' ,formData?.location?.label )
   .replace('{noofdays}' ,formData?.noOfDays)
   .replace('{noofpeople}' ,formData?.noofpeople )
   .replace('{budget}' ,formData?.budget )
   .replace('{noofdays}' ,formData?.noOfDays)

   console.log(FINAL_PROMPT);

   const result = await chatSession.sendMessage(FINAL_PROMPT)
   console.log(result?.response?.text());
   
   setLoading(false);
   SaveTrips(result?.response?.text());


}

const SaveTrips = async (TripData) => {
  setLoading(true);
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.email) {
      toast("User not found or email is missing. Please log in.");
      setLoading(false);
      return;
  }

  const docId = Date.now().toString();
  try {
    const parsedTripData = JSON.parse(TripData);
      await setDoc(doc(db, "Trips", docId), {
          userSelection: formData,
          tripData: parsedTripData,
          userEmail: user.email,
          id: docId
      });
      toast("Trip saved successfully!");
  } catch (error) {
      console.error("Error saving trip:", error);
      toast("Failed to save trip. Please try again.");
  } finally {
      setLoading(false);
      navigate('/view-trip/'+docId);
  }
}

const GetUserProfile = (tokenInfo) => {
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
    headers:{
      Authorization:`Bearer ${tokenInfo?.access_token}`,
      Accept:'Application/json'
    }

  }).then((res) => {
    console.log(res);
    localStorage.setItem('user',JSON.stringify(res.data));
    setOpenDialog(false);
    OnGenerateTrip();
  })
}

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
    <h2 className='font-bold text-3xl'>
        Tell us yout Travel preferences
    </h2>
    <p className='mt-3 text-gray-500 text-xl'>
       Just Provide some basic information and our trip planner will generate a 
       customised itinerary based on your preferences 
    </p>

    <div className='mt-20 flex flex-col gap-9'>
      <div>
        <h2 className='text-l my-3 font-medium'>What is destination of your choice?</h2>
        <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
                place,
                onChange:(v)=>{setPlace(v); handleInputChange('location',v)}
            }}
        />
      </div>
      <div>
      <h2 className='text-l my-3 font-medium'>Tell us the number of Days?</h2>
      <Input placeholder ={'Ex.3'} type = 'number' 
        onChange={(e) => {handleInputChange('noOfDays',e.target.value)}}
      />
      </div>
      <div>
      <h2 className='text-l my-3 font-medium'>What is Your Budget?</h2>
      <div className='grid grid-cols-3 gap-5 mt-5'>
      {SelectBudgetOptions.map((item,index) => (
        <div onClick={() => {handleInputChange('budget',item.title)}}
        key={index} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
        ${formData?.budget === item.title&& 'shadow-lg border-black'}
        `}>
        <h2 className='text-4xl'>{item.icon}</h2>
        <h2 className='font-bold text-lg'>{item.title}</h2>
        <h2 className='text-sm text-gray-500'>{item.desc}</h2>
        </div>
      ))}
      </div>
      </div>
      
      <div>
      <h2 className='text-l my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
      <div className='grid grid-cols-3 gap-5 mt-5'>
      {SelectTraveleslist.map((item,index) => (
        <div onClick={() => {handleInputChange('noofpeople',item.people)}}
        key={index} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
        ${formData?.noofpeople === item.people&& 'shadow-lg border-black'}
        `}>
        <h2 className='text-4xl'>{item.icon}</h2>
        <h2 className='font-bold text-lg'>{item.title}</h2>
        <h2 className='text-sm text-gray-500'>{item.desc}</h2>
        </div>
      ))}
      </div>
      </div>
<div className='my-10 justify-end flex'>
<Button 
disabled = {loading}
onClick ={OnGenerateTrip}
>
{loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>:'Generate Trip'}
</Button>
</div>
      
    </div>
    <Dialog open = {openDialog}>
  <DialogContent>
    <DialogHeader>
  
      <DialogDescription>
       <img src='/logo.svg'/>
       <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
       <p>Sign in to the app with google authentication security</p>
       <Button onClick = {login} className = 'w-full mt-5 flex gap-3 items-center'> <FcGoogle className='h-7 w-7' />Sign In with Google</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


    </div>
  )
}

export default CreateTrip