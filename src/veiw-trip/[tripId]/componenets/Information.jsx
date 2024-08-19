import { Button } from '@/components/ui/button'
import { GetPlacesDetails, PHOTO_URL } from '@/config/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";


// const PHOTO_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
const Information = ({trip}) => {

    const [photourl, setPhotourl] = useState();
    useEffect(() => {
        if(trip){
             GetPlacePhoto();
        }
     
    }, [trip])
    

    const GetPlacePhoto = async() => {
        const data = {
            textQuery:trip?.userSelection?.location?.label
        }
        const result = await GetPlacesDetails(data).then((res)=>{
            console.log(res.data.places[0].photos[2].name);

            const photo_url = PHOTO_URL.replace('{NAME}',res.data.places[0].photos[2].name);
            console.log(photo_url);
            setPhotourl(photo_url);
        })
    }
  return (
    <div>
    <img src={photourl} className='h-[340px] w-full object-cover rounded-xl'/>
    <div className='flex justify-between items-center'>
    <div className='my-5 flex flex-col gap-2'>
    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
    <div className='flex gap-5'>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅{trip?.userSelection?.noOfDays} Day</h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰{trip?.userSelection?.budget} Budget</h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🍾No. of travellers: {trip?.userSelection?.noofpeople}</h2>

    </div>
    
    </div>
    <Button><IoIosSend /></Button>
    </div>
    
    </div>
  )
}

export default Information