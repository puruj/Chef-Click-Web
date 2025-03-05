import {Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import { getRandomColor } from '../lib/utils'
import { motion } from 'framer-motion';

const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;
const EDAMAM_ACCOUT_USER = import.meta.env.VITE_EDAMAM_ACCOUT_USER;

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async(searchQuery) => {
    setLoading(true);
    setRecipes([]);
    try {
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Edamam-Account-User': EDAMAM_ACCOUT_USER,
            'Accept-Language': 'en'              
          }
        }
      );
      const data = await res.json();
      setRecipes(data.hits);
    } catch (error) {
      console.log(error.message);
    } finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchRecipes("tofu");
  }, []);

	const handleSearchRecipe = (e) => {
		e.preventDefault();
		fetchRecipes(e.target[0].value);
	};

  return (
    <div className='bg-[#faf9fb] p-10 flex-1'>
      <div className='max-w-screen-lg mx-auto'>
        <form onSubmit= {handleSearchRecipe} className='w-full'>
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
          {!loading &&
            recipes.map(({ recipe }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <RecipeCard recipe={recipe} {...getRandomColor()} />
              </motion.div>
            ))}
				  {loading &&
						[...Array(9)].map((_, index) => (
							<div key={index} className='flex flex-col gap-4 w-full'>
								<div className='skeleton h-32 w-full'></div>
								<div className='flex justify-between'>
									<div className='skeleton h-4 w-28'></div>
									<div className='skeleton h-4 w-24'></div>
								</div>
								<div className='skeleton h-4 w-1/2'></div>
							</div>
						))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
