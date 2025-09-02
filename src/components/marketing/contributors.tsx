import { OptimizedImage } from '@/components/ui/optimized-image'
import React from 'react'

const Contributors = () => {
  const contributors = [
    'abdout.jpg',
    'sedon.png',
    'z.jpeg',
    'p.jpeg',
    
    'c.jpeg',
    's.jpeg',
    'a.jpg',
    'aa.jpeg',
    '5.jpg',
   
    
    'mazin.jpg',
    'elliot.png',
    'v.jpeg', 
    'd.jpeg',
    
    '6.jpg',
    
    '4.png',
    '2.jpg',
    '3.jpg',
    '1.jpg'
  ];

  return (
    <div className="grid grid-cols-4 gap-4 md:grid-cols-10">
      {contributors.map((contributor, index) => (
        <div key={index} className="relative w-[85px] h-[85px] rounded-full overflow-hidden bg-gray-100">
          <OptimizedImage 
            src={`/marketing/contributors/${contributor}`} 
            alt="" 
            width={85}
            height={85}
            className="object-cover w-full h-full" 
          />
        </div>
      ))}
    </div>
  )
}

export default Contributors
