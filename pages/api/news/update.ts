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
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" })
    }

    try {
        const { title, description, _id } = req.body
        await client.connect()
        await client.db("Cluster0").collection("news").updateOne(
            { _id: new ObjectId(_id) },
            { $set: { title, description } }
          );
          
        return res.status(200).json({ message: "News updated successfully" })
    } catch (error) {
        console.error("Error creating news: ", error)
        return res.status(500).json({ message: "Failed to update news" })
    } finally {
        await client.close()
    }
}