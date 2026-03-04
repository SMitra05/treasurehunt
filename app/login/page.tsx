"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Login(){

  const [email,setEmail] = useState("")
  const [sent,setSent] = useState(false)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")

  async function handleLogin(e:any){
    e.preventDefault()

    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options:{
        emailRedirectTo:"https://treasurehunt-tectrix2026.vercel.app/group"
      }
    })

    setLoading(false)

    if(error){
      setError(error.message)
    }else{
      setSent(true)
    }
  }

  if(sent){
    return(
      <div className="container">

        <div className="success-box">

          <div className="success-icon">
            ✓
          </div>

          <h2>Magic Link Sent</h2>

          <p>
            Check your email and click the login link.
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
          Treasure Hunt Login
        </div>

        {error && (
          <p style={{color:"red",marginBottom:"10px"}}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>

          <input
          type="email"
          placeholder="it2023xxx@rcciit.org.in"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Magic Link"}
          </button>

        </form>

      </div>

    </div>
  )
}
