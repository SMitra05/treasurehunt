"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function Register(){

  const router = useRouter()

  const [name,setName] = useState("")
  const [department,setDepartment] = useState("")
  const [email,setEmail] = useState("")
  const [roll,setRoll] = useState("")
  const [year,setYear] = useState("")
  const [success,setSuccess] = useState(false)
  const [error,setError] = useState("")

  async function handleRegister(e:any){
    e.preventDefault()

    setError("")

    const { data } = await supabase
      .from("participants")
      .select("email")
      .eq("email",email)

    if(data && data.length>0){
      setError("Email already registered")
      return
    }

    const { error:insertError } = await supabase
      .from("participants")
      .insert([
        { name,department,email,roll,year }
      ])

    if(insertError){
      setError(insertError.message)
      return
    }

    setSuccess(true)

    setTimeout(()=>{
      router.push("/login")
    },3000)
  }

  if(success){
    return(
      <div className="container">

        <div className="success-box">

          <div className="success-icon">
            ✓
          </div>

          <h2>Registration Successful</h2>

          <p>
            Redirecting to Login...
          </p>

        </div>

      </div>
    )
  }

  return(
    <div className="container">

      <div className="card">

        <div className="title">
          TECTRIX 2026
        </div>

        <div className="subtitle">
          Treasure Hunt Registration
        </div>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleRegister}>

          <input
          placeholder="Full Name"
          required
          onChange={(e)=>setName(e.target.value)}
          />

          <select
          required
          onChange={(e)=>setDepartment(e.target.value)}
          >
            <option value="">Department</option>
            <option>IT</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>EE</option>
            <option>MCA</option>
            <option>BCA</option>
          </select>

          <input
          type="email"
          placeholder="it2023xxx@rcciit.org.in"
          required
          onChange={(e)=>setEmail(e.target.value)}
          />

          <input
          placeholder="IT2023xxx"
          required
          onChange={(e)=>setRoll(e.target.value)}
          />

          <select
          required
          onChange={(e)=>setYear(e.target.value)}
          >
            <option value="">Year</option>
            <option>1st</option>
            <option>2nd</option>
            <option>3rd</option>
            <option>4th</option>
          </select>

          <button type="submit">
            Register
          </button>

        </form>

      </div>

    </div>
  )
}
