import clientPromise from "@/lib/mongodb"
export async function POST(request) {
const body =  await request.json()
const client = await clientPromise
const db =  client.db("kumbh")
const collection = db.collection("queries")

const result = await collection.insertOne({
    name:body.name,
    email:body.email,
    text:body.message
})

return Response.json({ success:true  , error:false ,message: 'query submitt sucessfully' })
  }