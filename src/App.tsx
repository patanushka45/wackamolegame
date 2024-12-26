import { useEffect, useState } from 'react'

import hole from './assets/hole.png'
import mole from './assets/mole.png'

export default function App() {
  const [holes, setHoles] = useState<boolean[]>(Array(9).fill(true))
  const [score, setScore] = useState<number>(0)

  function moleVisibility(index: number, visible: boolean) {
    setHoles(currentHoles => {
      const newHoles = [...currentHoles]

      newHoles[index] = visible

      return newHoles
    })
  }

  function crushMole(index: number) {
    if (holes[index]) return
    moleVisibility(index, true)
    setScore(prevScore => prevScore + 1)
  }

  useEffect(() => {
    const changeImg = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * holes.length)

      moleVisibility(randomIndex, false)
      setTimeout(() => moleVisibility(randomIndex, true), 3600)
    }, 1000)

    return () => {
      clearInterval(changeImg)
    }
  }, [holes])

  return (
    <div>
      <header>
        Whack a Mole
      </header>
      <main>
        <h1>Score</h1>
        <h2>{score}</h2>
        <article>
          {holes.map((isHole, index) => (
            <section key={index}>
              <img src={isHole ? hole : mole} onClick={() => crushMole(index)} />
            </section>
          ))}
        </article>
      </main>
    </div>
  )
}
