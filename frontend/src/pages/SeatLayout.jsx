import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import Loading from '../components/Loading';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import isoTimeFormat from '../lib/isoTimeFormat';
import BlurCircle from '../components/BlurCircle';
import toast from 'react-hot-toast';
import SplashCursor from '../components/SplashCursor';
import axios from 'axios';
import { AppContent } from '../context/AppContext';

function SeatLayout() {
  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]]
  const { id, date } = useParams();
  const {backendUrl,userData}=useContext(AppContent);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [occupiedSeats,setOccupiedSeats]=useState([]);
  const navigate = useNavigate();
  const getShow = async () => {
    try {
      const {data}=await axios(backendUrl+`/api/show/${id}`);
      if(data.success){
        setShow(data.show);
      }
    } catch (error) {
      toast(error.message);
    }

  }
  const handleBooking=async () => {
    try {
      if(!userData) {
        return toast('Please Login first');
      }
      if(!selectedTime){
        return toast('Please Select the time first');
      }
      if(selectedSeats.length<1){
        return toast('Please Select at least 1 seat');
      }
      const {data}=await axios.post(backendUrl+'/api/booking/create',{showId:selectedTime.showId,selectedSeats});
      // console.log(data);
      if(data.success){
        window.location.href=data.url;
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast(error.message);
    }
  }


  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast('Please select the time first')
    }
    if(occupiedSeats.includes(seatId)){
      return toast('This seat is already booked')
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast('You can select only 5 seats')
    }
    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat != seatId) : [...prev, seatId])
  }

  const getBookedSeats=async () => {
    try {
      // console.log(selectedTime.showId);
      
      const {data}=await axios.post(backendUrl+`/api/booking/seats/${selectedTime.showId}`);
      if(data.success){
        setOccupiedSeats(data.occupiedSeats);
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const renderSeats = (row, count = 9) => (
    <div key={row} className='flex gap-2 mt-2'>
      {/* <SplashCursor/> */}
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button key={seatId} onClick={() => handleSeatClick(seatId)} className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) && 'bg-primary text-white'} ${occupiedSeats.includes(seatId) && 'opacity-70'}`}>
              {seatId}
            </button>
          )
        })}
      </div>
    </div>
  )
  useEffect(() => {
    getShow();
  }, []);

  useEffect(()=>{
    if(selectedTime){
      getBookedSeats();
    }
  },[selectedTime]);
  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50' >
      {/* timing */}

      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30 '>
        <p className='text-lg font-semibold px-6'>Available Timings</p>
        <div className='mt-5 space-x-2'>
          {show.dateTime[date].map((item) => (
            <div key={item.time} onClick={() => setSelectedTime(item)} className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time ? 'bg-primary text-white' : 'hover:bg-primary/20'}`}>
              <ClockIcon className='w-4 h-4' />
              <p className='text-sm'>{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* seat layout */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle bottom='0px' right='0px' />
        <h1 className='text-2xl font-medium mb-4'>Select your seat</h1>
        <div className='bg-primary w-2xs h-0.5 mb-2 '></div>
        <p>Screen Side</p>
        <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
          <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
            {groupRows[0].map(row => renderSeats(row))}
          </div>
          <div className='grid grid-cols-2 gap-11'>
            {
              groupRows.slice(1).map((group, index) => (
                <div key={index}>
                  {group.map(row => renderSeats(row))}
                </div>
              ))
            }
          </div>
        </div>
        <button onClick={handleBooking} className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-90'>
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className='w-4 h-4'/>
        </button>
      </div>
    </div>
  ) : (<Loading />)
}

export default SeatLayout
