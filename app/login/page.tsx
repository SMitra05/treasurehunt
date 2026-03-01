"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: any) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://treasurehunt-tectrix2026.vercel.app"
      }
    })

    if (error) {
      console.error(error)
      setMessage(error.message)
    } else {
      setMessage("Check your email for login link.")
    }

    setLoading(false)
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
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Magic Link"}
        </button>
      </form>

      <p style={{ marginTop:"15px" }}>{message}</p>
    </div>
  )
}
