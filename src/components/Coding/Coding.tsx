import { useCoding } from "../../context/CodingContext"
import Code from "./Code"
import NewCode from "./NewCode"


const Coding = () => {
  const { coding } = useCoding()

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-4xl mb-4 mt-2 italic'>Coding</h1>
      <div className='flex justify-center items-center gap-8 flex-wrap'>
        {coding ? coding.map((code, i) => {
          return <Code key={i} code={code} />
        }) : <h2>Loading...</h2>}
      </div>
      <NewCode />
    </div>
  )
}

export default Coding