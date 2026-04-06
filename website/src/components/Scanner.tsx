import { useState, useRef, useEffect } from 'react'
import './Scanner.css'

interface ScannerProps {
  onScan: (text: string) => void
  onReset: () => void
}

export default function Scanner({ onScan, onReset }: ScannerProps) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const handleReset = () => {
    setText('')
    onReset()
    textareaRef.current?.focus()
  }

  // Expose setText for examples
  ;(window as any).__scannerSetText = (t: string) => {
    setText(t)
    onScan(t)
  }

  return (
    <div className="scanner">
      <h2 className="scanner-title">Teste o Filtro</h2>
      <p className="scanner-desc">
        Digite uma ofensa ou uma conversa ofensiva e veja como o ToxiBR funciona em tempo real.
      </p>

      <div className="scanner-input-wrapper">
        <textarea
          ref={textareaRef}
          className="scanner-input"
          value={text}
          onChange={e => { setText(e.target.value); onScan(e.target.value) }}
          placeholder="Digite uma mensagem aqui..."
          maxLength={350}
        />
        <span className="scanner-count">{text.length}/350</span>
      </div>

      <div className="scanner-actions">
        <button className="reset-btn" onClick={handleReset}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
          Limpar
        </button>
      </div>
    </div>
  )
}
