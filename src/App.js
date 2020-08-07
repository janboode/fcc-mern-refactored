import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"

import NavBar from "./components/navbar.comp"
import ExerciseList from "./components/exercise-list.comp"
import ExerciseEdit from "./components/exercise-edit.comp"
import ExerciseCreate from "./components/exercise-create.comp"
import UserCreate from "./components/user-create.comp"

const App = () => {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <br />
        <Route path="/" exact component={ExerciseList} />
        <Route
          path="/edit/:id"
          exact
          render={props => <ExerciseEdit num={2} someProp="hallo" {...props} />}
        />
        <Route path="/create" exact component={ExerciseCreate} />
        <Route path="/user" exact component={UserCreate} />
      </div>
    </Router>
  )
}

export default App
