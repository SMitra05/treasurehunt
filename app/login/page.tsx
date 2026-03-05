"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function Login(){

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [roll,setRoll] = useState("")
  const [error,setError] = useState("")

  async function handleLogin(e:any){
    e.preventDefault()

    const { data } = await supabase
      .from("participants")
      .select("*")
      .eq("email",email)
      .eq("roll",roll)
      .single()

    if(!data){
      setError("Invalid Email or Roll Number")
      return
    }

    // store session
    localStorage.setItem("userEmail", email)

    router.push("/group")
  }

  return(
    <div className="container">

      <div className="card">

        <div className="title">
          TECTRIX 2026
        </div>

        <div className="subtitle">
          Treasure Hunt Login
        </div>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>

          <input
          placeholder="IT2023xxx"
          required
          onChange={(e)=>setRoll(e.target.value)}
          />

          <input
          type="email"
          placeholder="it2023xxx@rcciit.org.in"
          required
          onChange={(e)=>setEmail(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  )
}
