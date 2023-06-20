import axios from 'axios'

export interface News {
  title: string
  description: string
  timestamp: string
  _id: string
}

export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  const options: any = { month: 'long', day: 'numeric', year: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export const showNews = async (id: string) => {
  try {
    const response = await axios.get(`/api/news/show?_id=${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
