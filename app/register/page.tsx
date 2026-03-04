"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function RegisterPage(){

  const router = useRouter()

  const [name,setName] = useState("")
  const [department,setDepartment] = useState("")
  const [email,setEmail] = useState("")
  const [roll,setRoll] = useState("")
  const [year,setYear] = useState("")
  const [success,setSuccess] = useState(false)
  const [errorMsg,setErrorMsg] = useState("")

  async function handleRegister(e:any){
    e.preventDefault()

    setErrorMsg("")

    // check duplicate email
    const { data:emailCheck } = await supabase
      .from("participants")
      .select("email")
      .eq("email",email)

    if(emailCheck && emailCheck.length > 0){
      setErrorMsg("This email is already registered")
      return
    }

    // check duplicate roll
    const { data:rollCheck } = await supabase
      .from("participants")
      .select("roll")
      .eq("roll",roll)

    if(rollCheck && rollCheck.length > 0){
      setErrorMsg("This roll number is already registered")
      return
    }

    // insert participant
    const { error } = await supabase
      .from("participants")
      .insert([
        {
          name,
          department,
          email,
          roll,
          year
        }
      ])

    if(error){
      setErrorMsg(error.message)
      return
    }

    setSuccess(true)

    setTimeout(()=>{
      router.push("/login")
    },3000)
  }

  if(success){
    return(
      <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"100vh",
        background:"#f4f7f9"
      }}>

        <div style={{
          background:"#ffffff",
          padding:"50px",
          borderRadius:"14px",
          textAlign:"center",
          boxShadow:"0 10px 30px rgba(0,0,0,0.1)",
          width:"350px"
        }}>

          <div style={{
            width:"90px",
            height:"90px",
            margin:"0 auto 20px auto",
            borderRadius:"50%",
            background:"#00c853",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            fontSize:"50px",
            color:"white",
            animation:"pop 0.5s ease"
          }}>
            ✓
          </div>

          <h2 style={{color:"#00a152"}}>
            Registration Successful
          </h2>

          <p>Redirecting to Login...</p>

        </div>

        <style jsx>{`
          @keyframes pop {
            0% { transform: scale(0); }
            70% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}</style>

      </div>
    )
  }

  return(
    <div style={{textAlign:"center",marginTop:"50px"}}>

      <h1>Register</h1>

      {errorMsg && (
        <p style={{color:"red"}}>{errorMsg}</p>
      )}

      <form onSubmit={handleRegister}>

        <input
          placeholder="Full Name"
          required
          onChange={(e)=>setName(e.target.value)}
        />

        <br/><br/>

        <select required onChange={(e)=>setDepartment(e.target.value)}>
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EE">EE</option>
          <option value="MCA">MCA</option>
          <option value="BCA">BCA</option>
        </select>

        <br/><br/>

        <input
          type="email"
          placeholder="example: it2023xxx@rcciit.org.in"
          required
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="example: IT2023xxx"
          required
          onChange={(e)=>setRoll(e.target.value)}
        />

        <br/><br/>

        <select required onChange={(e)=>setYear(e.target.value)}>
          <option value="">Select Year</option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
        </select>

        <br/><br/>

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  )
}
