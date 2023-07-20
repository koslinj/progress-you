import { useState } from "react";
import Running from "./components/Running/Running";
import Coding from "./components/Coding/Coding";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./components/Auth/Auth";

export type ActivityType = 'running' | 'coding' | 'home'

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
              <>
                <Header setActivity={setActivity} />
                {content}
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
  )
}

export default App
