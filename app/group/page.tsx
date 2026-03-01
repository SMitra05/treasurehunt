"use client"

import { useState, useEffect } from "react"
import { auth, db } from "../../lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"

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

    if (!groupName) {
      alert("Enter group name")
      return
    }

    try {
      const groupId = uuidv4()

      // Create group document
      await setDoc(doc(db, "groups", groupId), {
        groupName,
        leaderId: user.uid,
        members: [user.email, ...members],
        createdAt: new Date()
      })

      // Update leader participant record
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
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
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
          <div key={index}>
            {m}
          </div>
        ))}

        <br />

        <button type="submit">Create Group</button>
      </form>
    </div>
  )
}
