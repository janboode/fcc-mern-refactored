import React, { useState, useEffect } from "react"
import axios from "axios"

import Exercise from "./exercise.comp"

const ExerciseList = () => {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const getExercises = async () => {
      try {
        const response = await axios.get("http://localhost:5000/exercises/")
        setExercises(response.data)
      } catch (error) {
        console.log(`Error getting exercises: ${error}`)
      }
    }
    getExercises()
  }, [])

  const deleteExercise = async id => {
    try {
      const response = await axios.delete(`http://localhost:5000/exercises/${id}`)
      console.log(`Deleted exercise: ${response.data}`)
      setExercises(exercises.filter(el => el._id !== id))
    } catch (error) {
      console.log(`Error deleting exercise: ${error}`)
    }
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise, i, a) => (
            <Exercise
              exercise={exercise}
              deleteExercise={deleteExercise}
              key={exercise._id}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExerciseList
