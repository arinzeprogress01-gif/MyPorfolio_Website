import Navbar from './components/layouts/Navbar'
// import Section from './components/ui/Section'
// import Container from './components/ui/Container'
// import Card from './components/ui/Card'
import Hero from './features/landing/Hero'

export default function App() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <Hero />

        {/* <Section id="features" spacing="sm" tone="subtle">
          <Container>
            <div className="grid gap-4 md:grid-cols-3">
              {['Experience', 'Credentials', 'Projects'].map((title) => (
                <Card key={title} hoverable>
                  <h3 className="font-display font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Card test text.</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section> */}
      </main>
    </div>
  )
}