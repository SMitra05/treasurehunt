"use client"

import { useEffect,useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Group(){

  const [team,setTeam] = useState("")

  useEffect(()=>{

    async function getTeam(){

      const { data:{ session } } = await supabase.auth.getSession()

      if(!session) return

      const email = session.user.email

      const { data } = await supabase
        .from("participants")
        .select("group_id")
        .eq("email",email)
        .single()

      if(data){
        setTeam(data.group_id)
      }

    }

    getTeam()

  },[])

  return(
    <div className="container">

      <div className="card">

        <div className="title">
          Team Dashboard
        </div>

        {team ?

        <>
          <p>Your Team ID</p>

          <h3>{team}</h3>

          <button>
            Scan QR
          </button>
        </>

        :

        <p>You are not in a team yet.</p>

        }

      </div>

    </div>
  )
}
