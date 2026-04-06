import { useState } from 'react'
import './SubmitWord.css'

const categories = [
  { value: 'slur', label: 'Slur / Ofensa grave' },
  { value: 'sexual', label: 'Conteudo sexual' },
  { value: 'violence', label: 'Violencia / Ameaca' },
  { value: 'racism', label: 'Racismo' },
  { value: 'bullying', label: 'Bullying / Assedio' },
  { value: 'abbreviation', label: 'Abreviacao BR' },
  { value: 'bypass', label: 'Bypass que nao foi pego' },
  { value: 'false_positive', label: 'Falso positivo (nao deveria bloquear)' },
  { value: 'other', label: 'Outro' },
]

export default function SubmitWord() {
  const [word, setWord] = useState('')
  const [category, setCategory] = useState('slur')
  const [context, setContext] = useState('')

  const handleSubmit = () => {
    if (!word.trim()) return

    const cat = categories.find(c => c.value === category)?.label || category
    const isFP = category === 'false_positive'

    const title = isFP
      ? `[Falso positivo] "${word.trim()}"`
      : `[Nova palavra] "${word.trim()}"`

    const body = [
      `## ${isFP ? 'Falso positivo reportado' : 'Palavra sugerida'}`,
      '',
      `**Palavra/frase:** \`${word.trim()}\``,
      `**Categoria:** ${cat}`,
      '',
      context.trim() ? `**Contexto/exemplo:** ${context.trim()}` : '',
      '',
      isFP
        ? '> Esta palavra esta sendo bloqueada mas nao deveria ser. Por favor revise.'
        : '> Esta palavra foi sugerida pela comunidade via o site do ToxiBR.',
      '',
      '---',
      '*Enviado pelo formulario do site ToxiBR*',
    ].filter(Boolean).join('\n')

    const labels = isFP ? 'false-positive' : 'wordlist'
    const url = `https://github.com/Diaum/toxibr/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=${encodeURIComponent(labels)}`

    window.open(url, '_blank')
  }

  return (
    <section className="submit-section">
      <div className="submit-inner">
        <div className="submit-header">
          <h2 className="submit-title">Sugira uma palavra</h2>
          <p className="submit-desc">
            Encontrou uma palavra que deveria ser bloqueada ou um falso positivo?
            Envie sua sugestao — ela vira uma issue no GitHub para revisao.
          </p>
        </div>

        <div className="submit-form">
          <div className="submit-row">
            <div className="submit-field">
              <label className="submit-label">Palavra ou frase</label>
              <input
                type="text"
                className="submit-input"
                value={word}
                onChange={e => setWord(e.target.value)}
                placeholder='Ex: "palavrao", "expressao ofensiva"'
                maxLength={100}
              />
            </div>
            <div className="submit-field">
              <label className="submit-label">Categoria</label>
              <select
                className="submit-select"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {categories.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="submit-field">
            <label className="submit-label">Contexto / exemplo (opcional)</label>
            <input
              type="text"
              className="submit-input"
              value={context}
              onChange={e => setContext(e.target.value)}
              placeholder='Ex: "usuario usou essa palavra pra ofender no chat"'
              maxLength={200}
            />
          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={!word.trim()}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            Abrir issue no GitHub
          </button>

          <p className="submit-note">
            Voce sera redirecionado para o GitHub para confirmar o envio.
            Precisa ter uma conta no GitHub.
          </p>
        </div>
      </div>
    </section>
  )
}
