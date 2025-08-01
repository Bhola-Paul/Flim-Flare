import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import AdminTitle from '../../components/Admin/AdminTitle';
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
import { kConverter } from '../../lib/kCoverter';
import { useContext } from 'react';
import { AppContent } from '../../context/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios';

function AddShow() {
  const currency = import.meta.env.VITE_CURRENCY
  const {backendUrl,baseUrl,userData}=useContext(AppContent);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [addingShow,setAddingShow]=useState(false);

  const fetchNowPlayingMovies = async () => {
    try {
      const {data}=await axios.get(backendUrl+'/api/show/now-playing');
      // console.log(data.movies);
      
      if(data.success){
        setNowPlayingMovies(data.movies);
        toast.success('All Movies fetched successfully')
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleDateTimeAdd =() => {
    // console.log(dateTimeInput);
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;
    setDateTimeSelection((prev) => {
      const times = prev[date] ?? [];
      if (times.includes(time)) {
        // console.log("No change — duplicate time:", prev);
        return prev;
      }
      const next = { ...prev, [date]: [...times, time] };
      // console.log("Updating to:", next);
      return next;
    })
  }
  const handleRemoveDateTime=(date,time)=>{ 
    setDateTimeSelection((prev)=>{
      const filteredTimes=prev[date].filter((t)=>t!==time);
      if(filteredTimes.length===0){
        const {[date]:_,...rest}=prev;
        return rest;
      }
      return {
        ...prev,
        [date]:filteredTimes,
      }
    })
  }
  const handleSubmit=async () => {
    try {
      setAddingShow(true);
      if(!selectedMovie || Object.keys(dateTimeSelection).length===0 || !showPrice){
        return toast.error('Missing required Fields');
      }
      const dateTime=Object.entries(dateTimeSelection).map(([date,time])=>({date,time}));
      const payload={
        movieId:selectedMovie,
        dateTime,
        price: Number(showPrice),
      }
      const {data}=await axios.post(backendUrl+'/api/show/add',payload);
      if(data.success){
        toast.success(data.message);
        setSelectedMovie(null);
        setDateTimeSelection({});
        setShowPrice('');
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setAddingShow(false);
  }
  useEffect(() => {
    fetchNowPlayingMovies();
  }, [userData])
  return nowPlayingMovies.length > 0 ? (
    <>
      <AdminTitle text1="Add" text2="Shows" />
      <p className='mt-10 text-lg font-medium'>Now Playing Movies</p>
      <div className='overflow-x-auto pb-4'>
        <div className='group flex flex-wrap gap-4 mt-4 w-max'>
          {
            nowPlayingMovies.map((movie,index) => (
              <div onClick={() => setSelectedMovie(movie.id)} key={index} className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300`}>
                <div className='relative rounded-lg overflow-hidden'>
                  {/* console.log(movie.poster_path); */}
                  
                  <img src={baseUrl+movie.poster_path} alt="" />

                  <div className='text-sm flex items-center justify-between  p-2 bg-black/70 w-full absolute bottom-0 left-0'>
                    <p className='flex items-center gap-1 text-gray-400'>
                      <StarIcon className='w-4 h-4 text-primary fill-primary' />
                      {movie.vote_average.toFixed(1)}
                    </p>
                    <p className='text-gray-300'>{kConverter(movie.vote_count)} votes</p>
                  </div>
                </div>
                {
                  selectedMovie == movie.id && (
                    <div className='absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded'>
                      <CheckIcon className='w-4 h-4 text-white' strokeWidth={2.5} />
                    </div>
                  )
                }
                <p className='font-medium truncate'>{movie.title}</p>
                <p className='text-gray-400 text-sm'>{movie.release_date}</p>
              </div>
            ))
          }
        </div>
      </div>
      {/* price */}
      <div className='mt-8'>
        <label className='block text-sm font-medium mb-2'>Show Price</label>
        <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
          <p className='text-gray-400 text-sm'>{currency}</p>
          <input type="number" min={0} value={showPrice} onChange={(e) => setShowPrice(e.target.value)} placeholder='Enter show price' className='outline-none' />
        </div>
      </div>
      {/* date and time */}
      <div className='mt-6'>
        <label className='block text-sm font-medium mb-2'>Select Date and time</label>
        <div className='inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg'>
          <input type="datetime-local" value={dateTimeInput}  onChange={(e) => setDateTimeInput(e.target.value)} className='outline-none text-white rounded-md' />
          <button onClick={handleDateTimeAdd} className='bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer'>
            Add Time
          </button>
        </div>
      </div>
      {/* selected times */}
      {
        Object.keys(dateTimeSelection).length>0 && (
          <div className='mt-6'>
            <h2 className='mb-2'>Selected Date-Time</h2>
            <ul className='space-y-3'>
              {
                Object.entries(dateTimeSelection).map(([date,times])=>(
                  <li key={date}>
                    <div className='font-medium'>{date}</div>
                    <div className='flex flex-wrap gap-2 mt-1 text-sm'>
                      {
                        times.map((time)=>(
                          <div key={time} className='border border-primary px-2 py-1 flex items-center rounded'>
                            <span>{time}</span>
                            <DeleteIcon onClick={()=>handleRemoveDateTime(date,time)} width={15} className='ml-2 text-red-500 hover:text-red-700 cursor-pointer'/>
                          </div>
                        ))
                      }
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }
      <button onClick={handleSubmit} disabled={addingShow} className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'>
        Add Show
      </button>
    </>
  ) : (<Loading />)
}

export default AddShow
