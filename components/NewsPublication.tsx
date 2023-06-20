import React from 'react'
import { News, formatDate } from '@/utils/interface'
import axios from 'axios'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NewsPublication: React.FC = ({ news }: { news: News }) => {
  const router = useRouter()
  const deleteNews = async (selectedNews: News) => {
    await axios
      .delete('/api/news/delete', { data: selectedNews })
      .then(() => {
        toast.success('News Deleted Successfully')
        router.reload()
      })
      .catch((error) => {
        console.log(error)
        toast.error('News Deletion Failed')
      })
  }

  return (
    <div className="flex justify-between items-center border border-gray-300 rounded p-4 mb-4">
      <Link href={'/news/' + news._id} className="">
        <h2 className="text-xl font-bold">{news.title}</h2>
        <p className="text-gray-700 mt-2">{news.description}</p>
        <p className="text-gray-500 mt-2">Published: {formatDate(news.timestamp)}</p>
      </Link>
      <div className="flex justify-between items-center w-1/6">
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={() => deleteNews(news)}
        >
          Delete
        </button>
        <Link href={'/edit/' + news._id} className="bg-black text-white px-4 py-2 rounded-md">
          Edit
        </Link>
      </div>
    </div>
  )
}

export default NewsPublication
