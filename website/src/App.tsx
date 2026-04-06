import { useState, useCallback } from 'react'
import { filterContent, normalize, HARD_BLOCKED, CONTEXT_SENSITIVE } from 'toxibr'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Terminal from './components/Terminal'
import Scanner from './components/Scanner'
import Examples from './components/Examples'
import Stats from './components/Stats'
import Glossary from './components/Glossary'
import SubmitWord from './components/SubmitWord'
import Footer from './components/Footer'
import Toast from './components/Toast'

export interface ScanResult {
  input: string
  normalized: string
  allowed: boolean
  reason?: string
  matched?: string
  time: number
}

function App() {
  const [result, setResult] = useState<ScanResult | null>(null)
  const [toastVisible, setToastVisible] = useState(false)

  const handleScan = useCallback((text: string) => {
    if (!text.trim()) {
      setResult(null)
      return
    }
    const start = performance.now()
    const res = filterContent(text)
    const elapsed = performance.now() - start
    setResult({
      input: text,
      normalized: normalize(text),
      allowed: res.allowed,
      reason: res.allowed ? undefined : res.reason,
      matched: res.allowed ? undefined : res.matched,
      time: elapsed,
    })
  }, [])

  const showToast = useCallback(() => {
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 1500)
  }, [])

  return (
    <>
      <div className="glow-orb" />
      <Navbar />
      <Hero onCopy={showToast} />
      <section className="playground-section">
        <div className="playground-container">
          <Terminal result={result} />
          <Scanner onScan={handleScan} onReset={() => setResult(null)} />
        </div>
      </section>
      <Examples onSelect={handleScan} />
      <Stats
        hardBlocked={HARD_BLOCKED.length}
        contextSensitive={CONTEXT_SENSITIVE.length}
      />
      <Glossary />
      <SubmitWord />
      <Footer />
      <Toast visible={toastVisible} />
    </>
  )
}

export default App
