"use client";
import Image from "next/image";
import { useState } from "react";
import {FiAlertTriangle} from 'react-icons/fi'
import {AiOutlineClose} from 'react-icons/ai'

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setloading] = useState(false)
  const [image, setImage] = useState('')
  const [error, seterror] = useState(false);
  const [errormsg, seterrormsg] = useState('')
  const HandleSubmit = async() => {
    try {
      setloading(true)
    const res = await fetch('/api/generate',
    {
      method:'POST',
      body: JSON.stringify({prompt}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data = await res.json()
    console.log(res);
    console.log(data.message)
    if(res.status === 200){
      setImage(data.url)
      setloading(false)
      setPrompt('')
    }else{
      seterrormsg(data.message || 'something went wrong')
      seterror(true);
      setloading(false)
    }
    
    } catch (error) {
      console.log(error)
    }
    
  };
  return (
    <div className="dark">
     
      <div className="min-h-screen  flex flex-col justify-start items-center dark:bg-gradient-to-t from-gray-700 via-gray-900 to-black ">
      <div className=" w-full max-w-6xl p-4">
        <h1 
      className="bg-gradient-to-t mb-4 from-pink-300 via-purple-200 to-indigo-300  inline-block h-full p-1 w-full  text-transparent bg-clip-text  text-2xl font-bold font-sans tracking-tight  sm:text-3xl  drop-shadow-[0_5px_35px_rgba(255,255,255,0.5)] ">
       AI Image generator
      </h1>
        <p className="text-zinc-50 mb-2 w-full text-left  p-1 inline-block">
          this is a next-app working with a OpenAi Api to generate images from prompt
        </p></div>
      
      <div className="p-3 max-w-6xl w-full ">
        <form className="w-full p-2">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative w-full ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write you prompt"
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              value={prompt}
              required
            />
            <button
              type="button"
              onClick={HandleSubmit}
              disabled={loading}
              className="text-white transition-all min-w-[100px] min-h-[30px] absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
            >
             
            {loading ? 
            <div className="flex items-center justify-center gap-2">
            <span>Generating</span>
            <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div> </div> : 'Generate'
          } 
            </button>
          </div>
        </form>
        {error &&  
        <div className="text-zinc-50 w-full p-3 h-full ">
               <div className="border border-orange-400/50 max-w-md mx-auto p-3 rounded-md bg-slate-800">
                <p className="flex items-center justify-between gap-2"> 
                <span><FiAlertTriangle/></span> 
                Something went wrong
                <span onClick={()=>seterror(false)} ><AiOutlineClose className='hover:scale-150' /></span>
                </p>
               </div>
              </div>
              }
       
        <div className=" w-96 h-96 mx-auto mt-28 flex  items-center justify-center  "> 
       
          {
          image &&  
          <div className="w-full h-full  border rounded-md max-w-xs border-zinc-50/10">
          <img src={image}
          className="w-full h-full max-w-lg object-cover rounded-md drop-shadow-[0_5px_35px_rgba(255,255,255,0.2)]"
          alt="Generated image"
          />
          </div>
        }
        </div>
      
      </div>
    </div>
    </div>
  );
}
