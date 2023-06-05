import { MongoClient, ServerApiVersion } from "mongodb"

const uri: string | undefined = process.env.NEXT_APP_MONGODB

const client = new MongoClient(uri as string, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        res.status(405).json({message: "Method Not Allowed"})
        return
    }

    try {
        const {title, description} = req.body
        await client.connect() 
        await client.db("news")
    } catch (error) {
        
    }
}