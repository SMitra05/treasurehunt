"use client"

import { useState } from "react"
import { auth, db } from "../../lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(e: any) {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password)
      alert("Login successful!")
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input placeholder="Email" required onChange={e => setEmail(e.target.value)} />
        <br /><br />

        <input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
