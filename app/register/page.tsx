"use client"
import { useState } from "react"
import { auth, db } from "@/lib/firebase"

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    department: "",
    email: "",
    roll: "",
    year: ""
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { error } = await supabase
      .from("participants")
      .insert([form])

    if (error) {
      if (error.message.includes("duplicate")) {
        setMessage("Email or Roll already registered.")
      } else {
        setMessage("Something went wrong. Try again.")
      }
    } else {
      setMessage("Registration successful!")
      setForm({
        name: "",
        department: "",
        email: "",
        roll: "",
        year: ""
      })
    }

    setLoading(false)
  }

  return (
    <div style={{
      textAlign: "center",
      marginTop: "50px",
      fontFamily: "Arial"
    }}>

      <h2>Register for Treasure Hunt</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Full Name"
          required
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <br /><br />

        <select
          required
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EE">EE</option>
          <option value="AIML">AIML</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
          <option value="MTech">MTech</option>
        </select>
        <br /><br />

        <input
          placeholder="College Email"
          required
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <br /><br />

        <input
          placeholder="College Roll"
          required
          value={form.roll}
          onChange={(e) =>
            setForm({ ...form, roll: e.target.value })
          }
        />
        <br /><br />

        <select
          required
          value={form.year}
          onChange={(e) =>
            setForm({ ...form, year: e.target.value })
          }
        >
          <option value="">Select Year</option>
          <option value="1st">1st Year</option>
          <option value="2nd">2nd Year</option>
          <option value="3rd">3rd Year</option>
          <option value="4th">4th Year</option>
        </select>
        <br /><br />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "8px 20px",
            cursor: "pointer"
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

      </form>

      {message && (
        <p style={{
          marginTop: "15px",
          color: message.includes("successful") ? "green" : "red"
        }}>
          {message}
        </p>
      )}

    </div>
  )
}
