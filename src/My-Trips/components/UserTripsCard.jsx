import { GetPlacesDetails, PHOTO_URL } from '@/config/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UserTripsCard = ({trips}) => {
    const [photourl, setPhotourl] = useState();
    useEffect(() => {
        if(trips){
             GetPlacePhoto();
        }
     
    }, [trips])
    

    const GetPlacePhoto = async() => {
        const data = {
            textQuery:trips?.userSelection?.location?.label
        }
        const result = await GetPlacesDetails(data).then((res)=>{
            console.log(res.data.places[0].photos[2].name);

            const photo_url = PHOTO_URL.replace('{NAME}',res.data.places[0].photos[2].name);
            console.log(photo_url);
            setPhotourl(photo_url);
        })
    }
  return (
    <Link to={'/view-trip/'+trips?.id}>
    <div className='hover:scale-105 transition-all cursor-pointer'>
        <img src={photourl} className='object-cover h-[220px] rounded-xl'/>
        <div>
            <h2 className='font-bold text-large'>
                {trips?.userSelection?.location?.label}
            </h2>
            <h2 className='text-sm text-gray-500'>{trips?.userSelection?.noOfDays} Days trip with {trips?.userSelection?.budget} budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripsCard