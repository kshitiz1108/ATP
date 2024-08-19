import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({trip}) => {
  return (
    <div>
    <h2 className='font-bold text-lg'>Places To Visit</h2>

    <div>
        {trip?.tripData?.itinerary.map((item,index) => (
            <div>
                <h2 className='font-medium text-lg'>Day {item.day}</h2>
                <div className='grid md:grid-cols-2 gap-5'>
                {item.plan.map((places,index) =>(
                    <div className='my-3'>
                        <h2 className='font-medium text-sm text-orange-600'>{places.time}</h2>
                       
                        <PlaceCardItem place={places}/>
                       
                    </div>
                ))}
                </div>
            </div>
        ))}
    </div>
    </div>
  )
}

export default PlacesToVisit