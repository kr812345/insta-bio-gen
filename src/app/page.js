'use client'

import { React, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import axios from 'axios';

const App = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    niche: '',
    vibe: '',
  });
  const [flag, setFlag] = useState(false);
  const [bios, setBios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleForm = (e, title) => {
    setForm(prev => ({
      ...prev,
      [title]: e.target.value,
    }));
  }

  const handleSubmit = () => {
    setFlag(!flag);
    setIsLoading(true);
    console.log('flag:',flag);
  }

  useEffect(() => {
     async function kyaNameDu () {
      try {
        const response = await axios.post('/api/gen-bio', form);
        const biosData = response.data;
        setBios([biosData.bio1, biosData.bio2, biosData.bio3]);
      } catch (err) { 
        console.error(err)
      } finally {
        setIsLoading(false);
      }
    }
    kyaNameDu();
  },[flag]);

  const LoadingSkeleton = () => (
    <div className="animate-pulse grid grid-cols-3 gap-6 relative w-[90vw]" role="status" aria-label="Loading bio suggestions">
      {[1, 2, 3].map((item) => (
        <div key={item} className="h-40 w-full bg-gray-200 rounded p-2 relative border-2 border-gray-300 mb-6" aria-hidden="true">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" aria-hidden="true"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" aria-hidden="true"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3" aria-hidden="true"></div>
          <div className="h-8 w-12 absolute bg-gray-300 bottom-0 right-0 rounded m-1" aria-hidden="true"></div>
        </div>
      ))}
      <span className="sr-only">Loading Instagram bio suggestions...</span>
    </div>
  );

  return (
    <main className="flex flex-col items-center justify-center h-screen pt-36">
      <section className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">Insta Bio Generator</h1>
        <p className="text-lg w-[60%] text-center">Generate creative and engaging Instagram bios instantly. Perfect for influencers, businesses, and personal accounts. Free and easy to use. Specially designed for Indian creators and brands.</p>
      </section>
      <section className="flex flex-col items-center gap-8 mt-8">
        <h2 className="sr-only">Bio Generator Form</h2>
        <div className='h-fit w-[90%] rounded-md justify-around flex gap-4 text-white not-md:flex-col'>
          <input onChange={(e)=>(handleForm(e,'name'))} required className='border-1 rounded px-2 w-40 focus:outline-none' type='text' placeholder='name' aria-label="Your Name"></input>
          <input onChange={(e)=>(handleForm(e,'age'))} required className='border-1 rounded px-2 w-40 focus:outline-none' type='number' placeholder='age' aria-label="Your Age"></input>
          <select onChange={(e)=>(handleForm(e,'niche'))} required className='border-1 rounded px-2 w-40 focus:outline-none text-white' type='text' default='niche' placeholder='niche' aria-label="Select Your Niche">
            <option value="" disabled>Select Niche</option>
            {['Fitness','Fashion','Travel','Foodie','Tech','Gaming','Finance','Motivation','Photography','Education','Music','Dance','Makeup & Beauty','Memes','Movies & Series','Startups','Cricket','Lifestyle','Art & Design','Coding'
            ].map((item,idx) => (
              <option key={idx} className='text-gray-700' value={item}> {item} </option>
            ))}
          </select>
          <select onChange={(e)=>(handleForm(e,'vibe'))} required className='border-1 rounded px-2 w-40 focus:outline-none text-white' type='text' default='vibe' placeholder='vibe' aria-label="Select Your Vibe">
            <option value="" disabled>Select Vibe</option>
            {['Chill','Funny','Aesthetic','Desi Swag','Emotional','Motivational','Sarcastic','Romantic','Savage','Bold','Cute','Classy','Filmy','Wholesome','Witty','Dark Humour','Mysterious','Friendly','Professional','Trendy'
            ].map((item,idx) => (
              <option key={idx} className='text-gray-700' value={item}> {item} </option>
            ))}
          </select>
        </div>
        <div className=''>
          <button 
            onClick={handleSubmit} 
            className='border-2 px-3 py-2 rounded-md hover:bg-green-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed' 
            aria-label="Generate Bio"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Bio'}
          </button>
        </div>
      </section>
      <section className='relative h-[50vh] w-[90%] grid gap-6 grid-cols-3 not-md:h-[90dvh] not-md:grid-cols-1 mt-10'>
        <h2 className="sr-only">Generated Bios</h2>
        {isLoading ? (
            <LoadingSkeleton />
        ) : (
          bios.map((bio,idx) => (
            <article key={idx} className='h-40 w-full bg-white rounded p-2 relative border-2 border-green-500'>
              <p className="text-gray-800">{bio}</p>
              <button onClick={() => navigator.clipboard.writeText(bio)} className='h-8 w-12 absolute bg-gray-400 bottom-0 right-0 flex items-center p-2 m-1 text-white rounded' aria-label={`Copy bio ${idx + 1}`}>
                copy
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  )
}

export default App;