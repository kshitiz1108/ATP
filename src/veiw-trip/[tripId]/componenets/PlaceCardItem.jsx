import { GetPlacesDetails, PHOTO_URL } from '@/config/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PlaceCardItem = ({place}) => {

    
    const [photourl, setPhotourl] = useState();
    useEffect(() => {
        if(place){
             GetPlacePhoto();
        }
     
    }, [place])
    

    const GetPlacePhoto = async() => {
        const data = {
            textQuery:place?.placeName
        }
        const result = await GetPlacesDetails(data).then((res)=>{
            console.log(res.data.places[0].photos[2].name);

            const photo_url = PHOTO_URL.replace('{NAME}',res.data.places[0].photos[1].name);
            console.log(photo_url);
            setPhotourl(photo_url);
        })
    }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={photourl} className='h-[100px] w-[100px] rounded-xl'/>

        <div >
            <h2 className='font-bold text-lg'>{place?.placeName}</h2>
            <p className='text-sm text-gray-400'>{place?.placeDetails}</p>
            <h2 className='mt-2'>{place?.ticketPricing}</h2>
        </div>

    </div>
    </Link>
  )
}

export default PlaceCardItem