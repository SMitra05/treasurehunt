"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Home(){

  const router = useRouter()
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    async function checkUser(){

      const { data:{ session } } = await supabase.auth.getSession()

      if(session){
        router.push("/group")
      }else{
        setLoading(false)
      }

    }

    checkUser()

  },[])

  if(loading){
    return(
      <div style={{textAlign:"center",marginTop:"120px"}}>
        Checking login...
      </div>
    )
  }

  return(
    <div style={{textAlign:"center",marginTop:"120px"}}>

      <h1>TreasureHunt.Tectrix2026</h1>

      <p>
        Welcome to the official treasure hunt platform
      </p>

      <br/><br/>

      <Link href="/register">
        <button style={{marginRight:"20px"}}>
          Register
        </button>
      </Link>

      <Link href="/login">
        <button>
          Login
        </button>
      </Link>

    </div>
  )
}
