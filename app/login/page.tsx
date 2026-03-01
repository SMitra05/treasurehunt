"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function handleLogin(e: any) {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithOtp({
      email
    })

    if (error) {
      setMessage("Login failed.")
    } else {
      setMessage("Check your email for login link.")
    }
  }

  return (
    <div style={{ textAlign:"center", marginTop:"50px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="College Email"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <br/><br/>
        <button type="submit">Send Magic Link</button>
      </form>

      <p>{message}</p>
    </div>
  )
}
