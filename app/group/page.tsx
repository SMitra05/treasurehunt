"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function GroupPage(){

const router = useRouter()

const [group,setGroup] = useState<any>(null)
const [members,setMembers] = useState<any[]>([])
const [user,setUser] = useState<any>(null)

useEffect(()=>{
loadData()
},[])


async function loadData(){

const { data: { session } } = await supabase.auth.getSession()

if(!session){
router.push("/login")
return
}

setUser(session.user)

const { data: participant } = await supabase
.from("participants")
.select("*")
.eq("email",session.user.email)
.single()

if(!participant?.group_id){
router.push("/")
return
}

const { data: groupData } = await supabase
.from("groups")
.select("*")
.eq("id",participant.group_id)
.single()

setGroup(groupData)

const { data: memberList } = await supabase
.from("participants")
.select("*")
.eq("group_id",participant.group_id)

setMembers(memberList || [])

}


async function removeMember(id:string){

if(group.team_locked){
alert("Team is locked. Cannot remove members.")
return
}

if(!confirm("Remove this member?")) return

await supabase
.from("participants")
.update({ group_id:null })
.eq("id",id)

loadData()

}


async function leaveTeam(){

if(group.team_locked){
alert("Team is locked. Cannot leave team.")
return
}

await supabase
.from("participants")
.update({ group_id:null })
.eq("id",user.id)

router.push("/")

}


async function logout(){

await supabase.auth.signOut()
router.push("/")

}


return(

<div className="container">

<div className="card">

<h1 className="title">Team Dashboard</h1>


{/* TEAM ID */}

<div className="section">

<div className="section-title">Team ID</div>

<div className="team-id-box">
{group?.id}
</div>

</div>


{/* MEMBERS */}

<div className="section">

<div className="section-title">Team Members</div>

<div className="members">

{members.map(member =>(

<div key={member.id} className="member-card">

<div className="member-header">

<div>

<div className="member-name">
{member.name}
</div>

<div className="member-email">
{member.email}
</div>

</div>

{member.id === group.leader_id && (
<span className="leader-badge">
⭐ Leader
</span>
)}

</div>


<div className="member-details">

<p>Department: {member.department}</p>
<p>Year: {member.year}</p>
<p>Roll: {member.roll}</p>

</div>


<div className="member-actions">

{user.id === group.leader_id && member.id !== group.leader_id && (

<button
className="danger-btn"
onClick={()=>removeMember(member.id)}
>
Remove
</button>

)}

</div>

</div>

))}

</div>

</div>


{/* ACTION BUTTONS */}

<div className="actions">

<button>
Scan QR
</button>

<button onClick={leaveTeam}>
Leave Team
</button>

<button
className="logout-btn"
onClick={logout}
>
Logout
</button>

</div>

</div>

</div>

)

}
