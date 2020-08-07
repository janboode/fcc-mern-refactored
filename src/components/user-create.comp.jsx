import React, { useState } from "react"
import Axios from "axios"

const UserCreate = () => {
  const [username, setUsername] = useState("")

  const submitHandler = async e => {
    e.preventDefault()

    const user = {
      username,
    }
    console.log(`user: ${user.username}`)

    try {
      const response = await Axios.post("http://localhost:5000/users/add", user)
      console.log(`New user added! ${response.data}`)
      setUsername("")
    } catch (error) {
      console.log(`Error creating new user: ${error}`)
    }
  }
  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default UserCreate
