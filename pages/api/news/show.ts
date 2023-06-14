import { MongoClient, ObjectId, ServerApiVersion } from "mongodb"

const uri: string | undefined = process.env.NEXT_APP_MONGODB

const client = new MongoClient(uri as string, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

export default async function handler(req: any, res: any) {
    if (req.method !== "GET") {
        return res.status(405).json({message: "Method Not Allowed"})
    }

    try {
        const { _id } = req.query
        console.log("_id=", _id)
        await client.connect() 
        const newsCollection = await client.db("Cluster0").collection("news")
        const news = await newsCollection.findOne({_id: ObjectId(_id)})
        if (!news) {
            return res.status(404).json({message: "News not found"}) 
        }
        return res.status(200).json(news)
    } catch (error) {
        console.error("Error creating news: ", error)
        return res.status(500).json({message: "Failed to retrieve news"})
    } finally {
        await client.close()
    }
}