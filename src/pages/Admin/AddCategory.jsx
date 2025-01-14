import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
    const [category, setCategory] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/auth/add_category', {category})
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/category')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='flex justify-center items-center h-[75vh]'>
        <div className='p-6 rounded-lg w-1/4 border'>
            <h2 className='text-2xl font-semibold mb-4'>Add Category</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor="category" className='block font-semibold mb-2'>Category:</label>
                    <input 
                        type="text" 
                        name='category' 
                        placeholder='Enter Category'
                        onChange={(e) => setCategory(e.target.value)} 
                        className='form-input w-full p-3 rounded-lg border border-gray-300'
                    />
                </div>
                <button type="submit" className='btn bg-green-600 text-white w-full py-3 rounded-lg'>Add Category</button>
            </form>
        </div>
    </div>
  )
}

export default AddCategory
