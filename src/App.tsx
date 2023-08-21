/* import { useState } from 'react' */
import './App.css'
import background from './assets/Background.mp4'
import Testeando from './assets/components/Testeando'

function App() {


  return (
    <>
      <main className='container'>
        <section className='content'>
          <div className='titleDiv'>
            <h1 className='title'>React Quiz</h1>
          </div>
          <section className='questSection'>
            <Testeando />
          </section>
        </section>
        <video src={background} autoPlay loop muted />
      </main>
    </>
  )
}

export default App
