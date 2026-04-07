import { useState } from 'react'
import './HowToUse.css'

type Tab = 'filter' | 'censor' | 'custom'

const filterCode = `import { filterContent } from 'toxibr';

// Filtra a mensagem do usuario
const result = filterContent('mensagem aqui');

if (!result.allowed) {
  // Mensagem toxica — bloqueia
  console.log(result.reason);  // 'hard_block' | 'directed_insult' | ...
  console.log(result.matched); // palavra que foi detectada
} else {
  // Mensagem limpa — deixa passar
}`

const censorCode = `import { censorContent } from 'toxibr';

// Censura palavras toxicas com ***
const result = censorContent('seu arrombado vai se fuder');
console.log(result.censored);
// → "seu ********* vai se *****"
console.log(result.matches);
// → [{ word: 'arrombado', reason: 'hard_block', matched: 'arrombado' }, ...]`

const customCode = `import { createFilter, createCensor } from 'toxibr';

// Filtro customizado
const filter = createFilter({
  extraBlockedWords: ['minha-palavra'],
  extraContextWords: ['outra-palavra'],
  blockLinks: true,
  blockPhones: true,
});

const result = filter('mensagem aqui');

// Censor com opcoes
const censor = createCensor({
  censorChar: '#',           // caractere de censura
  censorPhones: true,        // censura phones inline (****)
  censorLinks: true,         // censura links inline (****)
});

const censored = censor('me liga 21994709426');
// → { censored: "me liga ***********", ... }`

export default function HowToUse() {
  const [tab, setTab] = useState<Tab>('filter')

  return (
    <section className="howto-section" id="como-usar">
      <div className="howto-inner">
        <h2 className="howto-title">Como usar</h2>
        <p className="howto-subtitle">3 passos para proteger seu chat</p>

        <div className="howto-steps">
          <div className="howto-step">
            <span className="howto-step-number">1</span>
            <div className="howto-step-content">
              <h3>Instale a dependencia</h3>
              <div className="howto-code-block">
                <code>$ npm install toxibr</code>
              </div>
            </div>
          </div>

          <div className="howto-step">
            <span className="howto-step-number">2</span>
            <div className="howto-step-content">
              <h3>Importe e use</h3>
              <div className="howto-tabs">
                <button
                  className={`howto-tab ${tab === 'filter' ? 'active' : ''}`}
                  onClick={() => setTab('filter')}
                >
                  Filtrar
                </button>
                <button
                  className={`howto-tab ${tab === 'censor' ? 'active' : ''}`}
                  onClick={() => setTab('censor')}
                >
                  Censurar
                </button>
                <button
                  className={`howto-tab ${tab === 'custom' ? 'active' : ''}`}
                  onClick={() => setTab('custom')}
                >
                  Customizado
                </button>
              </div>
              <div className="howto-code-block large">
                <pre><code>{tab === 'filter' ? filterCode : tab === 'censor' ? censorCode : customCode}</code></pre>
              </div>
            </div>
          </div>

          <div className="howto-step">
            <span className="howto-step-number">3</span>
            <div className="howto-step-content">
              <h3>Integre no seu backend ou frontend</h3>
              <div className="howto-code-block large">
                <pre><code>{`// Exemplo: Express.js
app.post('/mensagem', (req, res) => {
  const { texto } = req.body;
  const result = filterContent(texto);

  if (!result.allowed) {
    return res.status(400).json({
      erro: 'Mensagem bloqueada',
      motivo: result.reason,
    });
  }

  salvarMensagem(texto);
  res.json({ ok: true });
});`}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div className="howto-features">
          <div className="howto-feature">
            <span className="howto-feature-icon">&#9889;</span>
            <h4>Zero config</h4>
            <p>Funciona com uma linha. Sem API key, sem setup.</p>
          </div>
          <div className="howto-feature">
            <span className="howto-feature-icon">&#128274;</span>
            <h4>Client-side</h4>
            <p>Roda no browser ou Node.js. Sem servidor externo.</p>
          </div>
          <div className="howto-feature">
            <span className="howto-feature-icon">&#9881;</span>
            <h4>Customizavel</h4>
            <p>Adicione palavras, mude o caractere de censura, controle cada layer.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
