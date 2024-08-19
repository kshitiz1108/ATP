import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Header from './components/custom/Header'
import { Route, Router, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import CreateTrip from './pages/CreateTrip'
import ViewTrip from './veiw-trip/[tripId]/ViewTrip'
import MyTrips from './My-Trips/MyTrips'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element ={<Homepage/>}/>
      <Route path='/create-trip' element={<CreateTrip/>}/>
      <Route path='/view-trip/:tripId' element={<ViewTrip/>}/>
      <Route path='/my-trips' element={<MyTrips/>}/>
    </Routes>
    </>
  )
}


export default App
