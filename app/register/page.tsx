"use client"

import { useState } from "react"
import { auth, db } from "../../lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [department, setDepartment] = useState("")
  const [roll, setRoll] = useState("")
  const [year, setYear] = useState("")

  async function handleSubmit(e: any) {
    e.preventDefault()

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      await setDoc(doc(db, "participants", userCredential.user.uid), {
        name,
        department,
        email,
        roll,
        year,
        groupId: null,
        createdAt: new Date()
      })

      alert("Registration successful!")
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Name" required onChange={e => setName(e.target.value)} />
        <br /><br />

        <input placeholder="Email" required onChange={e => setEmail(e.target.value)} />
        <br /><br />

        <input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
        <br /><br />

        <input placeholder="Department" required onChange={e => setDepartment(e.target.value)} />
        <br /><br />

        <input placeholder="Roll" required onChange={e => setRoll(e.target.value)} />
        <br /><br />

        <input placeholder="Year" required onChange={e => setYear(e.target.value)} />
        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  )
}
