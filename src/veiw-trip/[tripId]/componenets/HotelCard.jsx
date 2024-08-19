import { GetPlacesDetails, PHOTO_URL } from '@/config/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// const PHOTO_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
const HotelCard = ({hotel}) => {

    const [photourl, setPhotourl] = useState();
    useEffect(() => {
        if(hotel){
             GetPlacePhoto();
        }
     
    }, [hotel])
    

    const GetPlacePhoto = async() => {
        const data = {
            textQuery:hotel?.hotelName
        }
        const result = await GetPlacesDetails(data).then((res)=>{
            console.log(res.data.places[0].photos[2].name);

            const photo_url = PHOTO_URL.replace('{NAME}',res.data.places[0].photos[1].name);
            console.log(photo_url);
            setPhotourl(photo_url);
        })
    }



  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+','+hotel?.hotelAddress} target='_blank'>
    <div className='hover:scale-110 transition-all cursor-pointer'>
        <img src={photourl} className='rounded-xl h-[180px] w-full object-cover'/>
        <div className='my-2 flex flex-col gap-2'>
        <h2 className='font-medium'>{hotel?.hotelName}</h2>
        <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
        <h2 className='text-sm'>💰{hotel?.price}</h2>
        <h2 className='text-sm'>⭐{hotel?.rating}</h2>
        </div>
    </div>
    </Link>

  )
}

export default HotelCard