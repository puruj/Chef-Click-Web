import {Search } from 'lucide-react'
import React from 'react'
import RecipeCard from '../components/RecipeCard'

const HomePage = () => {
  return (
    <div className='bg-[#faf9fb] p-10 flex-1'>
      <div className='max-w-screen-lg mx-auto'>
        <form className='w-full'>
          <label className='input flex items-center gap-2 w-full shadow-md p-3'>
            <Search size={24}/>
            <input
              type='text'
              className='text-sm md:text-md grow'
              placeholder='Search for a recipes...'            
            />
          </label>
        </form>
        <h1 className='font-bold text-3xl md:text-5xl mt-4'>Recommended Recipes</h1>
        <p className='text-slate-500 font-semibold m1-1 my-2 text-sm tracking-tight'>Popular Choices</p>
        <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {/* 1st recipe */}
         <RecipeCard />
        </div>
      </div>
    </div>
  )
}

export default HomePage
