import React from 'react'
import { News } from '@/utils/interface'
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';

const NewsPublication = ({news}: {news: News} ) => {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const options: any = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const deleteNews = async (selectedNews: News) => {
    await axios.delete('/api/news/delete', {data: selectedNews})
    .then((res) => {
      console.log(res)
      toast.success("News Created Successfully")
    })
    .catch((error) => {
      console.log(error)
      toast.error("News Creation Failed")
    })
  }

  return (
    <div className="flex justify-between items-center border border-gray-300 rounded p-4 mb-4">
      <div className="">
        <h2 className="text-xl font-bold">{news.title}</h2>
        <p className="text-gray-700 mt-2">{news.description}</p>
        <p className="text-gray-500 mt-2">Published: {formatDate(news.timestamp)}</p>
      </div>
      <div className="flex justify-between items-center w-1/6">
        <button className="bg-black text-white px-4 py-2 rounded-md" onClick={() => deleteNews( news )}>Delete</button>
        <Link href={"/edit/" + news._id} className="bg-black text-white px-4 py-2 rounded-md">Edit</Link>
      </div>
    </div>
  )
}

export default NewsPublication
