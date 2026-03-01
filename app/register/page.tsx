"use client"

import { useState, useEffect } from "react"

export default function RegisterPage() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [auth, setAuth] = useState<any>(null)
  const [db, setDb] = useState<any>(null)
  const [firebaseReady, setFirebaseReady] = useState(false)

  useEffect(() => {
    async function initFirebase() {

      const { initializeApp } = await import("firebase/app")
      const { getAuth } = await import("firebase/auth")
      const { getFirestore } = await import("firebase/firestore")

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
      const dbInstance = getFirestore(app)

      setAuth(authInstance)
      setDb(dbInstance)
      setFirebaseReady(true)
    }

    initFirebase()
  }, [])

  async function handleRegister(e: any) {
    e.preventDefault()

    if (!firebaseReady || !auth || !db) {
      alert("Firebase not ready")
      return
    }

    const { createUserWithEmailAndPassword } = await import("firebase/auth")
    const { doc, setDoc } = await import("firebase/firestore")

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      await setDoc(doc(db, "participants", user.uid), {
        name,
        email,
        createdAt: new Date(),
        groupId: null
      })

      alert("Registration successful!")
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          placeholder="Full Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

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

        <button type="submit">Register</button>
      </form>
    </div>
  )
}
