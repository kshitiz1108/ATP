import { db } from '@/config/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import Information from './componenets/Information';
import Hotels from './componenets/Hotels';
import PlacesToVisit from './componenets/PlacesToVisit';

const ViewTrip = () => {

  const {tripId} = useParams();
  const [trip,setTrip] = useState([]); 

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId])
  

  const GetTripData = async () => {
    const docRef = doc(db,'Trips',tripId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      console.log("Document" , docSnap.data());
      setTrip(docSnap.data());
    }
    else{
      console.log("No suct Trip Found");
      toast("No Trips found");
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <Information trip = {trip}/>

      <Hotels trip={trip}/>

      <PlacesToVisit trip={trip}/>
    </div>
  )
}

export default ViewTrip