import Header from '@/components/Header'
import { News, showNews } from '@/utils/interface'
import axios from 'axios'
import Head from 'next/head'
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import {useRouter} from 'next/router'

export default function Edit() {
  const router = useRouter()
  const {id} = router.query
  const [news, setNews] = useState<News>({
    title: '',
    description: '',
    timestamp: '',
    _id: '',
  })
  
  useEffect(() => {
    const loadData = async() => {
      const newsData: News = await showNews(id as string)
      setNews(newsData)
    }
    if (typeof window !== 'undefined' && router.isReady ) {
      loadData() 
    }
  }, [id, router.isReady]) 

  const [updating, setUpdating] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNews({
      ...news,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUpdating(true)
    await axios.post('/api/news/update', news)
    .then((res) => {
      console.log(res)
      
      setUpdating(false)
      toast.success("News Updated Successfully")
      router.push("/")
    })
    .catch((error) => {
      console.log(error)
      setUpdating(false)
      toast.error("News Updating Failed")
    })
  }

  return (
    <div>
      <Head>
        <title>Edit Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto">
        <Header />
        <div className="mt-8">
          <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                name="title"
                value={news.title}
                onChange={handleChange}
                placeholder="Enter news title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                value={news.description}
                onChange={handleChange}
                placeholder="Enter news description"
                required
              ></textarea>
            </div>
           
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}