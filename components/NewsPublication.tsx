import React from 'react'
import { News } from '@/utils/interface'

const NewsPublication = ({news}: {news: News}) => {
  return (
    <div className="border border-gray-300 rounded p-4 mb-4">
      <h2 className="text-xl font-bold">{news.title}</h2>
      <p className="text-gray-700 mt-2">{news.description}</p>
      <p className="text-gray-500 mt-2">Published: {news.date}</p>
    </div>
  )
}

export default NewsPublication
