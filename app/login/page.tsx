"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function LoginPage(){

  const [email,setEmail] = useState("")
  const [sent,setSent] = useState(false)

  async function handleLogin(e:any){
    e.preventDefault()

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options:{
        emailRedirectTo: "https://treasurehunt-tectrix2026.vercel.app/group"
      }
    })

    if(!error){
      setSent(true)
    }
  }

  if(sent){
    return(
      <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"100vh",
        background:"#f4f7f9"
      }}>

        <div style={{
          background:"#ffffff",
          padding:"50px",
          borderRadius:"14px",
          textAlign:"center",
          boxShadow:"0 10px 30px rgba(0,0,0,0.1)",
          width:"360px"
        }}>

          <div style={{
            width:"90px",
            height:"90px",
            margin:"0 auto 20px auto",
            borderRadius:"50%",
            background:"#00c853",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            fontSize:"50px",
            color:"white"
          }}>
            ✓
          </div>

          <h2 style={{color:"#00a152"}}>
            Magic Link Sent
          </h2>

          <p>
            Check your email and click the login link.
          </p>

        </div>

      </div>
    )
  }

  return(
    <div style={{textAlign:"center",marginTop:"80px"}}>

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="it2023xxx@rcciit.org.in"
          required
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br/><br/>

        <button type="submit">
          Send Magic Link
        </button>

      </form>

    </div>
  )
}
