"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function Group(){

  const router = useRouter()

  const [teamId,setTeamId] = useState("")
  const [members,setMembers] = useState<any[]>([])
  const [image,setImage] = useState<File | null>(null)

  useEffect(()=>{

    async function loadTeam(){

      const { data:{ session } } = await supabase.auth.getSession()

      if(!session){
        router.push("/login")
        return
      }

      const email = session.user.email

      const { data:user } = await supabase
      .from("participants")
      .select("group_id")
      .eq("email",email)
      .single()

      if(user?.group_id){

        setTeamId(user.group_id)

        const { data:teamMembers } = await supabase
        .from("participants")
        .select("name,email")
        .eq("group_id",user.group_id)

        if(teamMembers){
          setMembers(teamMembers)
        }

      }

    }

    loadTeam()

  },[])

  async function logout(){

    await supabase.auth.signOut()

    router.push("/")
  }

  async function uploadImage(){

    if(!image) return

    const fileName = `${Date.now()}-${image.name}`

    await supabase.storage
    .from("team-uploads")
    .upload(fileName,image)

    alert("Image Uploaded Successfully")
  }

  return(
    <div className="container">

      <div className="card">

        <div className="title">
          Team Dashboard
        </div>

        <p>
          <strong>Team ID</strong>
        </p>

        <p>{teamId}</p>

        <hr style={{margin:"20px 0"}}/>

        <h3>Team Members</h3>

        <ul style={{listStyle:"none",padding:0}}>

          {members.map((m,i)=>(
            <li key={i}>
              {m.name} ({m.email})
            </li>
          ))}

        </ul>

        <hr style={{margin:"20px 0"}}/>

        <h3>Upload Image</h3>

        <input
        type="file"
        onChange={(e)=>setImage(e.target.files?.[0] || null)}
        />

        <button onClick={uploadImage}>
          Upload
        </button>

        <button style={{marginTop:"15px"}}>
          Scan QR
        </button>

        <button
        onClick={logout}
        style={{
          marginTop:"15px",
          background:"#ff4444",
          color:"white"
        }}>
          Logout
        </button>

      </div>

    </div>
  )
}
