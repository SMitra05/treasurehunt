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

        <div className="title">
          Team Dashboard
        </div>

        <p><strong>Team ID:</strong> {team}</p>

        <h3>Team Members</h3>

        <ul>
          {members.map((m,i)=>(
            <li key={i}>
              {m.name} ({m.email})
            </li>
          ))}
        </ul>

        <button>
          Scan QR
        </button>

        <button onClick={logout} style={{marginTop:"10px"}}>
          Logout
        </button>

      </div>

    </div>
  )
}
