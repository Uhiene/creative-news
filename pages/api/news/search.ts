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
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { searchQuery } = req.query;
        await client.connect();
        const newsCollection = client.db("Cluster0").collection("news");

        const query = {
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { description: { $regex: searchQuery, $options: "i" } },
            ],
        };

        const news = await newsCollection.find(query).toArray();
        if (news.length === 0) {
            return res.status(404).json({ message: "No news found" });
        }
        return res.status(200).json(news);
    } catch (error) {
        console.error("Error retrieving news: ", error);
        return res.status(500).json({ message: "Failed to retrieve news" });
    } finally {
        await client.close();
    }
}