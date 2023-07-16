import { useState } from "react";
import Running from "./components/Running/Running";
import Coding from "./components/Coding/Coding";
import Header from "./components/Header";
import Home from "./components/Home/Home";

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
    <>
      <Header setActivity={setActivity} />
      {content}
    </>
  )
}

export default App
