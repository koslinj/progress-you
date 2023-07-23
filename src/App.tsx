import { lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

export type ActivityType = 'running' | 'coding' | 'home'

const Home = lazy(() => import("./components/Home/Home"))
const Running = lazy(() => import("./components/Running/Running"))
const Coding = lazy(() => import("./components/Coding/Coding"))
const Header = lazy(() => import("./components/Header"))
const Auth = lazy(() => import("./components/Auth/Auth"))

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
