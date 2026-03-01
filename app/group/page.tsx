"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

export default function GroupPage() {

  const [firebaseReady, setFirebaseReady] = useState(false)
  const [auth, setAuth] = useState<any>(null)
  const [db, setDb] = useState<any>(null)
  const [user, setUser] = useState<any>(null)

  const [groupName, setGroupName] = useState("")
  const [members, setMembers] = useState<string[]>([])
  const [emailInput, setEmailInput] = useState("")

  useEffect(() => {
    async function initFirebase() {

      const { initializeApp } = await import("firebase/app")
      const { getAuth, onAuthStateChanged } = await import("firebase/auth")
      const { getFirestore, doc, setDoc } = await import("firebase/firestore")

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

      onAuthStateChanged(authInstance, (currentUser) => {
        setUser(currentUser)
      })

      setFirebaseReady(true)
    }

    initFirebase()
  }, [])

  async function handleCreateGroup(e: any) {
    e.preventDefault()

    if (!firebaseReady || !db || !user) {
      alert("Firebase not ready")
      return
    }

    const { doc, setDoc } = await import("firebase/firestore")

    const groupId = uuidv4()

    await setDoc(doc(db, "groups", groupId), {
      groupName,
      leaderId: user.uid,
      members: [user.email, ...members],
      createdAt: new Date()
    })

    alert("Group created!")
  }

  if (!firebaseReady) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Create Group</h2>

      <form onSubmit={handleCreateGroup}>
        <input
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <br /><br />

        <button type="submit">Create Group</button>
      </form>
    </div>
  )
}
