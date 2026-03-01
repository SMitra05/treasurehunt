"use client"

import { useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export default function GroupPage() {

  const [user, setUser] = useState<any>(null)
  const [groupName, setGroupName] = useState("")
  const [members, setMembers] = useState<string[]>([])
  const [emailInput, setEmailInput] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  async function handleAddMember() {
    if (!emailInput) return

    if (members.length >= 3) {
      alert("Max 4 members allowed including leader")
      return
    }

    setMembers([...members, emailInput])
    setEmailInput("")
  }

  async function handleCreateGroup(e: any) {
    e.preventDefault()

    if (!user) {
      alert("Login required")
      return
    }

    const groupId = uuidv4()

    try {
      await setDoc(doc(db, "groups", groupId), {
        groupName,
        leaderId: user.uid,
        members: [user.email, ...members],
        createdAt: new Date()
      })

      await updateDoc(doc(db, "participants", user.uid), {
        groupId: groupId
      })

      alert("Group created successfully!")
      setGroupName("")
      setMembers([])

    } catch (error: any) {
      alert(error.message)
    }
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Please login first</h2>
      </div>
    )
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Create Group</h2>

      <form onSubmit={handleCreateGroup}>
        <input
          placeholder="Group Name"
          required
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Add member email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <button type="button" onClick={handleAddMember}>
          Add
        </button>

        <br /><br />

        {members.map((m, index) => (
          <div key={index}>{m}</div>
        ))}

        <br />

        <button type="submit">Create Group</button>
      </form>
    </div>
  )
}
