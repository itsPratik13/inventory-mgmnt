import { Star } from 'lucide-react'
import React from 'react'

interface RatingProps{
    rating:number
}
const Rating = ({rating}:RatingProps) => {
 return [1,2,3,4,5].map((index)=>(
    <Star
    key={index}
    fill={index <= rating ? "#FFC107" : "none"}
    color={index<=rating?"#FFC107":"#E4E5E9"}
    className='w-4 h-4'
    />
 ))
 
 
 
}

export default Rating