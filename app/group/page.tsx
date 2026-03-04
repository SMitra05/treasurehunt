"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { v4 as uuidv4 } from "uuid"

export default function GroupPage(){

  const [groupName,setGroupName] = useState("")
  const [members,setMembers] = useState("")

  async function handleCreateGroup(e:any){
    e.preventDefault()

    const groupId = uuidv4()

    const memberArray = members.split(",").map(m => m.trim())

    const { error } = await supabase
      .from("groups")
      .insert([{
        id: groupId,
        group_name: groupName,
        members: memberArray
      }])

    if(error){
      alert(error.message)
    }else{
      alert("Group created successfully")
    }
  }

  return(
    <div style={{textAlign:"center",marginTop:"50px"}}>

      <h2>Create Group</h2>

      <form onSubmit={handleCreateGroup}>

        <input
          placeholder="Group Name"
          required
          onChange={(e)=>setGroupName(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Member emails (comma separated)"
          required
          onChange={(e)=>setMembers(e.target.value)}
        />

        <br/><br/>

        <button type="submit">
          Create Group
        </button>

      </form>

    </div>
  )
}
