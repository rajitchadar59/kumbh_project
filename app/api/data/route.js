import clientPromise from "@/lib/mongodb"
export async function POST(request) {
let loggedin;
const body =  await request.json()
const client = await clientPromise
const db =  client.db("kumbh")
const collection = db.collection("users")
const user = await collection.findOne({username:body.username})

if(user){
  loggedin=false
if(user.password == body.password){
    loggedin=true
}
  
}
else{
  loggedin=false
}
return Response.json({ success:loggedin , user:user })
  }