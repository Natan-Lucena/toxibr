import './Glossary.css'

const terms = [
  {
    term: 'HARD_BLOCK',
    color: 'red',
    desc: 'Termo sempre proibido, independente do contexto. Palavras como "estupro", "pedofilo", "pornhub" nunca tem uso inocente e sao bloqueadas automaticamente.',
    example: '"estupro" → BLOCKED',
  },
  {
    term: 'DIRECTED_INSULT',
    color: 'orange',
    desc: 'Palavra ofensiva quando dirigida a outra pessoa (2a pessoa: voce, seu, tu), mas permitida em auto-expressao (1a pessoa: eu, me sinto). O filtro analisa o contexto da frase.',
    example: '"voce e um lixo" → BLOCKED | "eu me sinto um lixo" → ALLOWED',
  },
  {
    term: 'FUZZY_MATCH',
    color: 'yellow',
    desc: 'Algoritmo de Levenshtein detecta variantes com typos intencionais. Calcula a "distancia de edicao" (quantas letras precisam mudar) entre a palavra digitada e as bloqueadas. Threshold: 1 pra palavras de 5-7 chars, 2 pra 8+ chars.',
    example: '"viadro" → distancia 1 de "viado" → BLOCKED',
  },
  {
    term: 'NORMALIZE',
    color: 'purple',
    desc: 'Pipeline de 11 etapas que transforma o texto antes da analise: remove zero-width chars, converte homoglyphs cirilicos, tira acentos, colapsa repeticoes (viiaaado → viado), converte leetspeak (3stupr0 → estupro), remove pontos/tracos e expande abreviacoes BR.',
    example: '"3stupr0" → normalize → "estupro" → BLOCKED',
  },
  {
    term: 'LINK_DETECTED',
    color: 'blue',
    desc: 'Detecta URLs e dominios na mensagem. Bloqueia qualquer mensagem contendo https://, www., .com, .br, .net, .io e outros TLDs.',
    example: '"me acha no instagram.com" → BLOCKED',
  },
  {
    term: 'PHONE_DETECTED',
    color: 'blue',
    desc: 'Detecta numeros de telefone brasileiros em diversos formatos. Bloqueia mensagens com 9+ digitos ou padroes como (XX) XXXXX-XXXX, incluindo tentativas de separar os numeros.',
    example: '"(21) 99470-9426" → BLOCKED',
  },
  {
    term: 'CONTEXT_SENSITIVE',
    color: 'green',
    desc: 'Palavras que podem ser toxicas ou inocentes dependendo do contexto. "caralho", "foda", "lixo", "idiota" sao permitidas como exclamacao ou auto-expressao, mas bloqueadas quando dirigidas a alguem.',
    example: '"caralho, hoje ta foda" → ALLOWED | "seu caralho" → BLOCKED',
  },
  {
    term: 'SELF_EXPRESSION',
    color: 'green',
    desc: 'Padrao de auto-expressao (1a pessoa). Quando o usuario fala de si mesmo usando "eu", "me sinto", "sou um", palavras context-sensitive sao permitidas. Importante para apps de saude mental.',
    example: '"eu me sinto um idiota" → ALLOWED',
  },
]

export default function Glossary() {
  return (
    <section className="glossary-section">
      <div className="glossary-inner">
        <h2 className="glossary-title">Glossario</h2>
        <p className="glossary-subtitle">Entenda cada tipo de deteccao do ToxiBR</p>
        <div className="glossary-grid">
          {terms.map((t) => (
            <div key={t.term} className="glossary-card">
              <div className="glossary-card-header">
                <span className={`glossary-badge ${t.color}`}>{t.term}</span>
              </div>
              <p className="glossary-desc">{t.desc}</p>
              <div className="glossary-example">
                <code>{t.example}</code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
