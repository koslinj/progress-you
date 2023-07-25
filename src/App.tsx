import { useState } from "react";
import Running from "./components/Running/Running";
import Coding from "./components/Coding/Coding";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./components/Auth/Auth";
import Calories from "./components/Calories/Calories";

export type ActivityType = 'running' | 'coding' | 'home' | 'calories'

function App() {
  const [activity, setActivity] = useState<ActivityType>('home')

  const getActivity = () => {
    switch (activity) {
      case 'running':
        return <Running />
      case 'coding':
        return <Coding />
      case 'home':
        return <Home />
      case 'calories':
        return <Calories />
      default:
        throw new Error('unknown type of activity')
    }
  }

  const content = getActivity()

  return (
      <Routes>
        <Route path='/login' element={<Auth />} />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <div className="pb-10">
                <Header setActivity={setActivity} />
                {content}
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
  )
}

export default App
