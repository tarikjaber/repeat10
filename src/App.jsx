import { createEffect, createSignal, onCleanup } from 'solid-js'
import './App.css'

function App() {
  const FIVE_MINUTES = 5 * 60
  const ONE_MINUTE = 1 * 60
  const randomTime = () => Math.floor(Math.random() * 30 * 60 + 1)
  let timeLength = randomTime()
  const [time, setTime] = createSignal(timeLength)
  const [startTime, setStartTime] = createSignal(new Date());
  
  function intervalOver() {
    timeLength = randomTime()
    setTime(timeLength)
    setStartTime(new Date())
  }
  
  createEffect(() => {
    if (time() <= 0) {
      intervalOver()
      new Notification("Time out!")
    } else if (time() === FIVE_MINUTES) {
      new Notification("Halfway done!")
    } else if (time() === ONE_MINUTE) {
      new Notification("One minute left!")
    }
  })
  
  const timer = setInterval(() => {
    console.log(timeLength)
    let endTime = Math.floor(+startTime() / 1000) + timeLength
    let currTime = Math.floor(+(new Date()) / 1000)
    let secondsLeft = endTime - currTime
    setTime(secondsLeft)
  }, 1000)
  onCleanup(() => clearInterval(timer))
  
  function formatTime(time) {
    let minutes = Math.floor(time / 60)
    let minuteString = String(minutes).padStart(2, '0')
    let seconds = time % 60
    let secondString = String(seconds).padStart(2, '0')

    return minuteString + ":" + secondString
  }
  
  function done() {
    intervalOver()
  }
  
  return (
    <>
      <h1>{formatTime(time())}</h1>
      <button onClick={done}>Done</button>
    </>
  )
}

export default App
