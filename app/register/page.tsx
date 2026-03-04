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
      .insert([
        {
          name,
          department,
          email,
          roll,
          year
        }
      ])

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

        {/* Department Dropdown */}

        <select
          required
          onChange={(e)=>setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EE">EE</option>
          <option value="MCA">MCA</option>
          <option value="BCA">BCA</option>
        </select>

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

        {/* Year Dropdown */}

        <select
          required
          onChange={(e)=>setYear(e.target.value)}
        >
          <option value="">Select Year</option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
        </select>

        <br/><br/>

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  )
}
