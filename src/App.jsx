import { createEffect, createSignal, onCleanup } from 'solid-js'
import './App.css'

function App() {
  const TEN_MINUTES = 10 * 60
  const FIVE_MINUTES = 5 * 60
  const ONE_MINUTE = 1 * 60
  const startTime = new Date()
  const [time, setTime] = createSignal(TEN_MINUTES)
  
  createEffect(() => {
    if (time() <= 0) {
      setTime(TEN_MINUTES)
      startTime = new Date()
      new Notification("Interval over!")
    } else if (time() === FIVE_MINUTES) {
      new Notification("Halfway done!")
    } else if (time() === ONE_MINUTE) {
      new Notification("One minute left!")
    }
  })
  
  const timer = setInterval(() => {
    let endTime = Math.floor(+startTime / 1000) + TEN_MINUTES
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
  
  return (
    <h1>{formatTime(time())}</h1>
  )
}

export default App
