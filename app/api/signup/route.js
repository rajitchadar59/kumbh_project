import clientPromise from "@/lib/mongodb"
export async function POST(request) {
const body =  await request.json()
const client = await clientPromise
const db =  client.db("kumbh")
const collection = db.collection("users")

const result = await collection.insertOne({
    name:body.name,
    username:body.username,
    email:body.email,
    mobilenumber:body.mobilenumber,
    password:body.password
})

return Response.json({ success:true  , error:false ,message: 'signed up sucessfully' })
  }
