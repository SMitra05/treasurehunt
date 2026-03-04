"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function LoginPage() {

  const [email, setEmail] = useState("")

  async function handleLogin(e:any){
    e.preventDefault()

    const { error } = await supabase.auth.signInWithOtp({
      email
    })

    if(error){
      alert(error.message)
    }else{
      alert("Magic login link sent to email")
    }
  }

  return (
    <div style={{textAlign:"center",marginTop:"50px"}}>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          placeholder="College Email"
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
