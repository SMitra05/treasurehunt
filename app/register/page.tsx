"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function RegisterPage(){

  const [name,setName] = useState("")
  const [department,setDepartment] = useState("")
  const [email,setEmail] = useState("")
  const [roll,setRoll] = useState("")
  const [year,setYear] = useState("")

  async function handleRegister(e:any){
    e.preventDefault()

    const { error } = await supabase
      .from("participants")
      .insert([{
        name,
        department,
        email,
        roll,
        year
      }])

    if(error){
      alert(error.message)
    }else{
      alert("Registration successful")
    }
  }

  return(
    <div style={{textAlign:"center",marginTop:"50px"}}>

      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        <input
          placeholder="Full Name"
          required
          onChange={(e)=>setName(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Department"
          required
          onChange={(e)=>setDepartment(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="College Email"
          required
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="College Roll"
          required
          onChange={(e)=>setRoll(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Year (1st/2nd/3rd/4th)"
          required
          onChange={(e)=>setYear(e.target.value)}
        />

        <br/><br/>

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  )
}
