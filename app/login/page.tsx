"use client"

import { useState, useEffect } from "react"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [auth, setAuth] = useState<any>(null)
  const [firebaseReady, setFirebaseReady] = useState(false)

  useEffect(() => {
    async function initFirebase() {

      const { initializeApp } = await import("firebase/app")
      const { getAuth } = await import("firebase/auth")

      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
      }

      const app = initializeApp(firebaseConfig)
      const authInstance = getAuth(app)

      setAuth(authInstance)
      setFirebaseReady(true)
    }

    initFirebase()
  }, [])

  async function handleLogin(e: any) {
    e.preventDefault()

    if (!firebaseReady || !auth) {
      alert("Firebase not ready")
      return
    }

    const { signInWithEmailAndPassword } = await import("firebase/auth")

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
        <input
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
