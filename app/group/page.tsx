"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function GroupPage() {

  const [groupName, setGroupName] = useState("")
  const [emails, setEmails] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleCreateGroup(e: any) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const emailList = emails.split(",").map(e => e.trim())

    if (emailList.length < 2 || emailList.length > 4) {
      setMessage("Group must have 2 to 4 members.")
      setLoading(false)
      return
    }

    // create group
    const { data: groupData, error: groupError } = await supabase
      .from("groups")
      .insert([{ name: groupName }])
      .select()

    if (groupError) {
      setMessage("Group name already exists.")
      setLoading(false)
      return
    }

    const groupId = groupData[0].id

    // update participants with group_id
    const { error: updateError } = await supabase
      .from("participants")
      .update({ group_id: groupId })
      .in("email", emailList)

    if (updateError) {
      setMessage("Some members not found or already in group.")
      setLoading(false)
      return
    }

    setMessage("Group created successfully!")
    setGroupName("")
    setEmails("")
    setLoading(false)
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

        <textarea
          placeholder="Enter member emails (comma separated)"
          required
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          rows={4}
          cols={40}
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Group"}
        </button>
      </form>

      {message && (
        <p style={{
          marginTop: "15px",
          color: message.includes("success") ? "green" : "red"
        }}>
          {message}
        </p>
      )}
    </div>
  )
}
