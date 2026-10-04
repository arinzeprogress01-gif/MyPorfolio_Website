import Navbar from './components/layouts/Navbar'
import Hero from './features/landing/Hero'
import ProfessionsStrip from './features/landing/ProfessionsStrip'
import Features from './features/landing/Features'

export default function App() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <Hero />
        <ProfessionsStrip />
        <Features />
      </main>
    </div>
  )
}