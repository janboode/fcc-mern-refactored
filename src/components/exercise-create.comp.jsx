import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.min.css"

const ExerciseCreate = () => {
  const [enteredUsername, setEnteredUsername] = useState("")
  const [enteredDescription, setEnteredDescription] = useState("")
  const [enteredDuration, setEnteredDuration] = useState(0)
  const [enteredDate, setEnteredDate] = useState(new Date())
  const [users, setUsers] = useState([])

  const userInput = useRef(null)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/")
        if (response.data.length > 0) {
          setUsers(response.data.map((user, i, a) => user.username))
          setEnteredUsername(response.data[0].username)
        }
      } catch (error) {
        console.log(`Error getting users: ${error}`)
      }
    }
    getUsers()
  }, [])

  const submitHandler = async e => {
    e.preventDefault()

    const exercise = {
      username: enteredUsername,
      description: enteredDescription,
      duration: enteredDuration,
      date: enteredDate,
    }

    console.log(`exercise to post: ${exercise}`)

    try {
      const response = await axios.post("http://localhost:5000/exercises/add", exercise)
      console.log(`created exercise: ${response.data}`)
      window.location = "/"
    } catch (error) {
      console.log(`error with posting exercise: ${error}`)
    }
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Username: </label>
          <select
            ref={userInput}
            required
            className="form-control"
            value={enteredUsername}
            onChange={e => setEnteredUsername(e.target.value)}
          >
            {users.map((user, i, a) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={enteredDescription}
            onChange={e => setEnteredDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={enteredDuration}
            onChange={e => setEnteredDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={enteredDate} onChange={setEnteredDate} />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default ExerciseCreate
