import { db } from '@/config/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripsCard from './components/UserTripsCard';

const MyTrips = () => {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);
    useEffect(() => {
        GetUsertrips();
    }, [])
    
    
    const GetUsertrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if(!user){
            navigate('/');
            return;
        }
       
        const q = query(collection(db, "Trips"), where("userEmail", "==", user.email));
        
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setUserTrips(prevValue => [...prevValue,doc.data()]);
    });
    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
    <h2 className='font-bold text-3xl'>MyTrips</h2>
    <div className='grid grid-cols-2 md:grid-cols-3 mt-10 gap-5'>
        {userTrips?.length>0 ? userTrips.map((trips,index) => (
            <UserTripsCard key={index} trips={trips}/>
        
        ))
        :[1,2,3,4,5,6].map((item,index)=>(
            <div key={index} className='h-[220px] w-full bg-slate-200 animated-pulse rounded-xl'>

            </div>
        ))
        }
    </div>
    </div>
  )
}

export default MyTrips