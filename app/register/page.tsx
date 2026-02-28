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

    <input
      placeholder="Department (IT/CSE/ECE...)"
      required
      onChange={(e) =>
        setForm({ ...form, department: e.target.value })
      }
    />
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

    <input
      placeholder="Year (1st/2nd/3rd/4th)"
      required
      onChange={(e) =>
        setForm({ ...form, year: e.target.value })
      }
    />
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
