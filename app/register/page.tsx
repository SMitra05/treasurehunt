"use client"
import { useState } from "react"

export default function Register() {

const [form, setForm] = useState({
name: "",
department: "",
email: "",
roll: "",
year: ""
})

function handleSubmit(e: any) {
e.preventDefault()
alert("Registration submitted successfully!")
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
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
    />
    <br /><br />

    {/* Department Dropdown */}
    <select
      required
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
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
    />
    <br /><br />

    <input
      placeholder="College Roll"
      required
      onChange={(e) =>
        setForm({ ...form, roll: e.target.value })
      }
    />
    <br /><br />

    {/* Year Dropdown */}
    <select
      required
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
      style={{
        padding: "8px 20px",
        cursor: "pointer"
      }}
    >
      Submit
    </button>

  </form>
</div>

)
}
