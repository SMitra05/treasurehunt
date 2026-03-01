"use client"

import { useState } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, sendSignInLinkToEmail } from "firebase/auth"

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default function RegisterPage() {

  const [email, setEmail] = useState("")

  async function handleLogin() {
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: window.location.origin,
        handleCodeInApp: true
      })
      alert("Magic link sent!")
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <br /><br />

      <button onClick={handleLogin}>
        Send Magic Link
      </button>
    </div>
  )
}
