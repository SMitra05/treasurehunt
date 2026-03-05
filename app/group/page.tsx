"use client"

import { useEffect,useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"

export default function Group(){

const router = useRouter()

const [team,setTeam] = useState("")
const [members,setMembers] = useState<any[]>([])

useEffect(()=>{

const email = localStorage.getItem("userEmail")

if(!email){
router.push("/login")
return
}

async function loadTeam(){

const { data:user } = await supabase
.from("participants")
.select("group_id")
.eq("email",email)
.single()

if(user?.group_id){

setTeam(user.group_id)

const { data } = await supabase
.from("participants")
.select("name,email")
.eq("group_id",user.group_id)

if(data){
setMembers(data)
}

}

}

loadTeam()

},[])

function logout(){

localStorage.removeItem("userEmail")

router.push("/")

}

return(

<div className="container">

<div className="card">

<h1 className="title">
Team Dashboard
</h1>

<div className="section">

<h3 className="section-title">
Team ID
</h3>

<div className="team-id-box">
{team}
</div>

</div>

<div className="section">

<h3 className="section-title">
Team Members
</h3>

<div className="members">

{members.map((m,i)=>(

<div key={i} className="member-card">

<div className="member-header">

<span className="member-name">
{m.name}
</span>

{i===0 && (
<span className="leader-badge">
⭐ Leader
</span>
)}

</div>

<div className="member-email">
{m.email}
</div>

</div>

))}

</div>

</div>

<div className="actions">

<button className="primary-btn">
Scan QR
</button>

<button className="logout-btn" onClick={logout}>
Logout
</button>

</div>

</div>

</div>

)

}
