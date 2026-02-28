"use client"
import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabase"

export default function GroupPage() {

  const [groupName, setGroupName] = useState("")
  const [search, setSearch] = useState("")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [selectedMembers, setSelectedMembers] = useState<any[]>([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  // Fetch suggestions
  useEffect(() => {
    if (search.length < 2) {
      setSuggestions([])
      return
    }

    const fetchUsers = async () => {
      const { data } = await supabase
        .from("participants")
        .select("id, email, name")
        .ilike("email", `%${search}%`)
        .limit(5)

      setSuggestions(data || [])
    }

    fetchUsers()
  }, [search])

  function addMember(member: any) {
    if (selectedMembers.length >= 4) {
      setMessage("Maximum 4 members allowed.")
      return
    }

    if (selectedMembers.find(m => m.email === member.email)) {
      return
    }

    setSelectedMembers([...selectedMembers, member])
    setSearch("")
    setSuggestions([])
  }

  function removeMember(email: string) {
    setSelectedMembers(selectedMembers.filter(m => m.email !== email))
  }

  async function handleCreateGroup(e: any) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    if (selectedMembers.length < 2) {
      setMessage("Minimum 2 members required.")
      setLoading(false)
      return
    }

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

    const emails = selectedMembers.map(m => m.email)

    const { error } = await supabase
      .from("participants")
      .update({ group_id: groupId })
      .in("email", emails)

    if (error) {
      setMessage("Failed to assign members.")
    } else {
      setMessage("Group created successfully!")
      setGroupName("")
      setSelectedMembers([])
    }

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

        <input
          placeholder="Search member by email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div style={{
            border: "1px solid #ccc",
            width: "300px",
            margin: "auto",
            background: "white"
          }}>
            {suggestions.map((user) => (
              <div
                key={user.id}
                style={{
                  padding: "8px",
                  cursor: "pointer"
                }}
                onClick={() => addMember(user)}
              >
                {user.email}
              </div>
            ))}
          </div>
        )}

        <br />

        {/* Selected Members */}
        <div>
          {selectedMembers.map((member) => (
            <div key={member.email}>
              {member.email}
              <button
                type="button"
                onClick={() => removeMember(member.email)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <br />

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
