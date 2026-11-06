import { About } from './components/About'
import { Capabilities } from './components/Capabilities'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { DimensionTV } from './components/DimensionTV'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { SketchDefs } from './components/Ipe'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { ScrollProgress } from './components/ScrollProgress'
import { Stars } from './components/Stars'
import { useAnimatedFavicon } from './favicon'
import { LangProvider } from './i18n'

export default function App() {
  useAnimatedFavicon()
  return (
    <LangProvider>
      <SketchDefs />
      <Stars />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Projects />
        <DimensionTV />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  )
}
