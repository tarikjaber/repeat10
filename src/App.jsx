import { createEffect, createSignal, onCleanup } from 'solid-js'
import './App.css'

function App() {
  const FIVE_MINUTES = 5 * 60
  const ONE_MINUTE = 1 * 60
  const [time, setTime] = createSignal(100)
  const [startTime, setStartTime] = createSignal(new Date());
  
  createEffect(() => {
    const timer = setInterval(() => {
      let endTime = Math.floor(+startTime() / 1000) + time()
      let currTime = Math.floor(+(new Date()) / 1000)
      let secondsLeft = endTime - currTime

      setTime(secondsLeft)

      if (time() <= 0) {
        setTime(100)
        setStartTime(new Date())
        new Notification("Interval over!")
      } else if (time() === FIVE_MINUTES) {
        new Notification("Halfway done!")
      } else if (time() === ONE_MINUTE) {
        new Notification("One minute left!")
      }
    }, 1000)
    onCleanup(() => clearInterval(timer))
  })
  
  function formatTime(time) {
    let minutes = Math.floor(time / 60)
    let minuteString = String(minutes).padStart(2, '0')
    let seconds = time % 60
    let secondString = String(seconds).padStart(2, '0')

    return minuteString + ":" + secondString
  }
  
  return (
    <>
      <h1>{time()}</h1>
      <h1>{formatTime(time())}</h1>
    </>
  )
}

export default App
