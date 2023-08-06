import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { useState } from "react";
import distanceIcon from '../../icons/distance_icon.png'
import timerIcon from '../../icons/timer_icon.png'
import dateIcon from '../../icons/date_icon.png'
import addIcon from '../../icons/add_icon.png'
import { useTheme } from "../../context/ThemeContext";
import { RunType } from "../../context/RunsContext";
import { ToastContainer, toast } from "react-toastify";
import { UserAuth } from "../../context/AuthContext";

const NewRun = () => {
  const [kilometers, setKilometers] = useState(10)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(30)

  let objectDate = new Date();
  let day = String(objectDate.getDate()).padStart(2, '0');
  let month = String(objectDate.getMonth() + 1).padStart(2, '0');
  let year = objectDate.getFullYear();
  let format = year + "-" + month + "-" + day
  const [date, setDate] = useState(format)

  const { color } = useTheme()

  const { user } = UserAuth();

  const handleNewRun = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (user) {
        const toAdd: RunType = {
          km: kilometers,
          minutes: hours * 60 + minutes,
          day: date,
          userId: user.uid,
          hasImage: false
        }
        await addDoc(collection(db, "runs"), toAdd);
      }
      else {
        throw new Error('User is not logged in!')
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleDecreaseHours = () => {
    if (hours === 0) {
      return toast.error('You cannot put negative amount of hours!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
    }
    setHours(prev => prev - 1)
  }

  const handleDecreaseMinutes = (value: number) => {
    if (minutes - value < 0) {
      return toast.error('You cannot put negative amount of minutes!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
    }
    setMinutes(prev => prev - value)
  }

  const handleDecreaseKilometers = () => {
    if (kilometers === 0) {
      return toast.error('You cannot put negative amount of kilometers!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
    }
    setKilometers(prev => prev - 1)
  }

  return (
    <>
      <form onSubmit={handleNewRun} className={`${color} p-6 rounded-2xl flex justify-center gap-20 flex-wrap mt-12 mx-2`}>
        <div>
          <div className="flex flex-wrap justify-center items-center gap-x-8">
            <img src={distanceIcon} alt="Distance Icon" className="w-16" />
            <div className="flex flex-col items-center">
              <p className="text-xl">Kilometers</p>
              <div className="flex justify-center items-center bg-slate-900 rounded-xl">
                <div onClick={handleDecreaseKilometers} className="text-4xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">-</div>
                <input className="km-input" type="number" value={kilometers.toString()} onChange={(e) => setKilometers(Number(e.target.value))}></input>
                <div onClick={() => setKilometers(prev => prev + 1)} className="text-4xl p-4 hover:bg-slate-950 rounded-r-xl w-16 flex justify-center items-center cursor-pointer select-none">+</div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-8 mt-6">
            <img src={timerIcon} alt="Distance Icon" className="w-16" />
            <div className="flex flex-col items-center">
              <p className="text-xl">Hours</p>
              <div className="flex justify-center items-center bg-slate-900 rounded-xl">
                <div onClick={handleDecreaseHours} className="text-4xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">-</div>
                <input className="km-input" type="number" value={hours.toString()} onChange={(e) => setHours(Number(e.target.value))}></input>
                <div onClick={() => setHours(prev => prev + 1)} className="text-4xl p-4 hover:bg-slate-950 rounded-r-xl w-16 flex justify-center items-center cursor-pointer select-none">+</div>
              </div>
              <p className="mt-4 text-xl">Minutes</p>
              <div className="flex justify-center bg-slate-900 rounded-xl">
                <div>
                  <div onClick={() => handleDecreaseMinutes(1)} className="text-4xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">-</div>
                  <div onClick={() => handleDecreaseMinutes(5)} className="text-2xl  p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">{'<<'}</div>
                </div>
                <input className="km-input" type="number" value={minutes.toString()} onChange={(e) => setMinutes(Number(e.target.value))}></input>
                <div>
                  <div onClick={() => setMinutes(prev => prev + 1)} className="text-4xl p-4 hover:bg-slate-950 rounded-r-xl w-16 flex justify-center items-center cursor-pointer select-none">+</div>
                  <div onClick={() => setMinutes(prev => prev + 5)} className="text-2xl  p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">{'>>'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-around">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <img src={dateIcon} alt="Distance Icon" className="w-16" />
            <div className="flex justify-center items-center">
              <input className="date-input" type='date' value={date} onChange={(e) => setDate(e.target.value)}></input>
            </div>
          </div>
          <div onClick={handleNewRun} className="bg-slate-800 rounded-full mt-4 p-6 hover:scale-125 duration-300 cursor-pointer">
            <img className="w-20 invert" src={addIcon} alt="Add Icon" />
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default NewRun