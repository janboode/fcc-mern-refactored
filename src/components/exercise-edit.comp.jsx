import React, { useState, useEffect } from "react"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.min.css"

const ExerciseEdit = ({ history, location, match, num, someProp }) => {
  const [enteredUsername, setEnteredUsername] = useState("")
  const [enteredDescription, setEnteredDescription] = useState("")
  const [enteredDuration, setEnteredDuration] = useState(0)
  const [enteredDate, setEnteredDate] = useState(new Date())
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getExerciseById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/exercises/${match.params.id}`
        )
        setEnteredUsername(response.data.username)
        setEnteredDescription(response.data.description)
        setEnteredDuration(response.data.duration)
        setEnteredDate(new Date(response.data.date))
      } catch (error) {
        console.log(`Error getting exercise by id: ${error}`)
      }
    }

    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/")
        if (response.data.length > 0) {
          setUsers(response.data.map((user, i, a) => user.username))
        }
      } catch (error) {
        console.log(`Error getting users: ${error}`)
      }
    }

    getExerciseById()
    getUsers()
  }, [match.params.id])

  const submitHandler = async e => {
    e.preventDefault()

    const exercise = {
      username: enteredUsername,
      description: enteredDescription,
      duration: enteredDuration,
      date: enteredDate,
    }

    console.log(`exercise to update: ${exercise}`)

    try {
      const response = await axios.post(
        `http://localhost:5000/exercises/update/${match.params.id}`,
        exercise
      )
      console.log(`updated exercise: ${response.data}`)
      window.location = "/"
    } catch (error) {
      console.log(`error with posting exercise: ${error}`)
    }
  }

  return (
    <>
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label>Username: </label>
            <select
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
            <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
      <div>
        <p>{history.length}</p>
        <p>{location.pathname}</p>
        <p>{match.params.id}</p>
        <p>{num}</p>
        <p>{someProp}</p>
      </div>
    </>
  )
}

export default ExerciseEdit
