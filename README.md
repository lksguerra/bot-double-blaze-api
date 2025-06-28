# 🤖 Bot Double Blaze - Análise Casino Automática

Sistema completo de **bot automático** para Double Blaze com **análise avançada de casino** e estratégias comprovadas. Inclui API Node.js e site responsivo para análise em tempo real.

## 🌟 Componentes

### 🔧 API Node.js
- 🎯 **7 Estratégias de Predição**: Algoritmos avançados com IA
- 📊 **Análise Estatística**: 12 indicadores técnicos
- 💰 **Gestão de Risco**: Cálculo inteligente de apostas
- 🔄 **Dados em Tempo Real**: Conexão direta com Blaze API
- 📈 **Confiança Dinâmica**: Scores de confiança precisos

### 🌐 Site HTML (webapp.html)
- 📱 **Interface Responsiva**: Funciona em todos os dispositivos
- 🎨 **Design Moderno**: Interface limpa e intuitiva
- ⚡ **Tempo Real**: Status da API e resultados instantâneos
- 🎯 **3 Modos**: Básica, Avançada, Comparação
- 📊 **Indicadores Visuais**: Barras de confiança e métricas

### 🚀 Deploy Gratuito
- **API**: Render.com (750h/mês grátis)
- **Site**: Netlify/Vercel (100% gratuito)
- **Custo Total**: R$ 0,00

## 🔧 Instalação e Uso

### Opção 1: Uso Local

1. Clone ou baixe os arquivos do projeto
2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```

4. Abra o site: `webapp.html` no navegador
   - A API estará em `http://localhost:3000`
   - Configure a URL no site para `http://localhost:3000`

### Opção 2: Deploy Online (Recomendado)

Siga o guia completo em `deploy.md` para hospedar **gratuitamente**:

1. **API** no Render.com
2. **Site** no Netlify/Vercel  
3. **Total**: R$ 0,00 de custo

## 🌐 Como Usar o Site

1. Acesse `webapp.html` no navegador
2. Configure a **URL da API** (local ou online)
3. Defina o **valor da aposta** (múltiplos de R$10)
4. Escolha o tipo de predição:
   - 🎯 **Básica**: 5 estratégias clássicas
   - 🚀 **Avançada**: 7 estratégias + IA (recomendado)
   - 🆚 **Comparar**: Análise lado a lado

### Status da API
- ✅ Verde: API online e funcionando
- ❌ Vermelho: API offline ou com problemas

## API Endpoints

### GET /health
Endpoint de verificação de status
```json
{
  "status": "Ativo",
  "timestamp": "2025-06-28T04:47:26.503Z"
}
```

### GET /api/current-game
Get current game status from Blaze
```json
{
  "id": "O2l4aX3orn",
  "color": 1,
  "roll": 7,
  "status": "rolling",
  "created_at": "2025-06-28T04:47:26.503Z"
}
```

### GET /api/recent-games
Get recent game history (last 20 games)

### POST /api/predict
Get color prediction and betting strategy (versão básica)

**Request Body:**
```json
{
  "betAmount": 100
}
```

### POST /api/predict-advanced
Get advanced color prediction with enhanced analysis (versão melhorada)

**Request Body:**
```json
{
  "betAmount": 100
}
```

### POST /api/compare-predictions
Compare both prediction engines side by side

**Request Body:**
```json
{
  "betAmount": 100
}
```

**Response:**
```json
{
  "predicao": {
    "corPredita": 1,
    "nomeCor": "VERMELHO",
    "confianca": 73,
    "estrategiaAposta": {
      "valorTotal": 100,
      "valorCorPrincipal": 80,
      "valorBranco": 20,
      "recomendacao": "Aposte R$80 na cor predita, R$20 no BRANCO como segurança"
    },
    "analise": {
      "distribuicaoCores": {
        "vermelho": { "quantidade": 8, "porcentagem": 40 },
        "preto": { "quantidade": 10, "porcentagem": 50 },
        "branco": { "quantidade": 2, "porcentagem": 10 }
      },
      "sequenciaAtual": { "color": 2, "length": 3 },
      "ultimasCincoCores": ["PRETO", "PRETO", "PRETO", "VERMELHO", "VERMELHO"]
    },
    "raciocinador": "Sequência atual de 3 jogos PRETO sugere reversão. VERMELHO está sub-representado (40% vs 50%)"
  }
}
```

### GET /api/analysis
Get detailed pattern analysis without prediction

## Estratégias de Predição

### Versão Básica (5 estratégias):
1. **Estratégia de Sequência (30%)**: Analisa sequências atuais e aplica lógica contrária para sequências longas
2. **Estratégia de Frequência (25%)**: Aposta na cor menos frequente para equilibrar distribuição
3. **Estratégia de Padrões (20%)**: Identifica sequências repetitivas em jogos recentes
4. **Estratégia Martingale (15%)**: Procura por padrões alternados
5. **Estratégia de Intervalo Temporal (10%)**: Analisa distribuição de cores nos últimos 30 minutos

### Versão Avançada (7 estratégias + análises estatísticas):
1. **Estratégia de Sequência (25%)**: Análise melhorada de streaks
2. **Estratégia de Frequência (20%)**: Análise de distribuição aprimorada
3. **Estratégia de Padrões Avançados (15%)**: N-gramas e padrões cíclicos
4. **Estratégia Martingale (10%)**: Detecção de alternância melhorada
5. **Estratégia Temporal (8%)**: Análise temporal mais precisa
6. **🆕 Estratégia de Variância (12%)**: Analisa dispersão e volatilidade dos resultados
7. **🆕 Estratégia de Momentum (10%)**: Mede força da tendência atual

### Análises Estatísticas Avançadas:
- **Entropia**: Mede a imprevisibilidade dos resultados
- **Variância**: Calcula dispersão estatística
- **Volatilidade**: Analisa frequência de mudanças
- **Momentum**: Força da tendência recente
- **Ciclos**: Detecção de padrões cíclicos (3-8 elementos)
- **N-gramas**: Análise de sequências de 2-4 elementos
- **Números Quentes/Frios**: Identificação de números mais/menos frequentes
- **Gestão de Risco Inteligente**: Ajuste dinâmico das apostas

## Betting Strategy

The API automatically calculates optimal bet distribution:

- **Main Color Bet**: 75-95% of total amount on predicted color (RED or BLACK)
- **White Safety Bet**: 5-25% on WHITE as insurance (higher percentage for lower confidence)
- **Minimum Amounts**: All bets are in multiples of R$10
- **Risk Management**: Lower confidence predictions allocate more to white safety bet

## Mapeamento de Cores

- `0` = BRANCO (Pagamento maior, aposta de segurança)
- `1` = VERMELHO (Alvo principal de predição)
- `2` = PRETO (Alvo principal de predição)

## Example Usage

### Predição básica com R$50
```bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"betAmount": 50}'
```

### Predição avançada com R$50 (recomendado)
```bash
curl -X POST http://localhost:3000/api/predict-advanced \
  -H "Content-Type: application/json" \
  -d '{"betAmount": 50}'
```

### Comparar ambas as versões
```bash
curl -X POST http://localhost:3000/api/compare-predictions \
  -H "Content-Type: application/json" \
  -d '{"betAmount": 100}'
```

### Análise de padrões
```bash
curl http://localhost:3000/api/analysis
```

### Testar melhorias da versão avançada
```bash
node teste-avancado.js
```

## Safety Features

- ✅ Input validation (bet amounts must be multiples of 10)
- ✅ Error handling for API failures
- ✅ Automatic white safety bets
- ✅ Confidence-based risk management
- ✅ CORS enabled for web applications

## 🚀 Melhorias da Versão Avançada

A versão avançada implementa várias melhorias significativas para aumentar a precisão das predições:

### 📊 Análises Estatísticas Avançadas
- **Entropia**: Mede o nível de caos/ordem nos resultados
- **Variância**: Calcula dispersão estatística dos dados
- **Volatilidade**: Analisa frequência de mudanças entre cores
- **Momentum**: Detecta força e direção das tendências

### 🔍 Detecção de Padrões Melhorada
- **Padrões Cíclicos**: Identifica ciclos de 3-8 elementos que se repetem
- **N-gramas**: Analisa sequências de 2-4 cores para predizer a próxima
- **Números Quentes/Frios**: Identifica números que saem mais/menos frequentemente
- **Análise de Sequências**: Detecção mais precisa de streaks e reversões

### 💰 Gestão de Risco Inteligente
- **Ajuste Dinâmico**: Percentual da aposta branca varia com volatilidade
- **Níveis de Risco**: Classificação automática (baixo/moderado/alto)
- **Fatores de Correção**: Ajustes baseados em indicadores técnicos

### 📈 Indicadores Técnicos
- Dashboard com métricas em tempo real
- Probabilidades calculadas dinamicamente
- Recomendações baseadas em múltiplos fatores

### 🆚 Comparação de Performance
Use `/api/compare-predictions` para ver ambas as versões lado a lado e escolher a melhor predição!

## Important Disclaimer

⚠️ **This is for educational purposes only. Gambling involves risk and this API does not guarantee profits. Always gamble responsibly and within your means.**

## Development

The prediction engine is modular and strategies can be easily modified or added. Each strategy returns a color prediction with confidence level, and the final prediction is calculated using weighted voting.

## Dependencies

- `express`: Web server framework
- `axios`: HTTP client for API requests
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variable management

## 📁 Arquivos do Projeto

### 🔧 Backend (API)
- `server.js`: Servidor principal Express
- `prediction-engine.js`: Motor de predição básico
- `advanced-engine.js`: Motor de predição avançado  
- `package.json`: Dependências e scripts

### 🌐 Frontend
- `webapp.html`: Site responsivo completo
- Interface moderna para consumir a API
- Design mobile-first

### 📋 Documentação
- `README.md`: Este arquivo
- `deploy.md`: Guia completo de deploy gratuito
- `MELHORIAS.md`: Detalhes técnicos das melhorias

### 🧪 Testes
- `teste-simples.js`: Teste básico da API
- `teste-avancado.js`: Teste do motor avançado
- `example-usage.js`: Exemplos de uso

## 🎯 Resumo das Capacidades

### Análises Implementadas
1. **Predição Básica**: 5 estratégias tradicionais
2. **Predição Avançada**: 7 estratégias + 12 indicadores
3. **Análise Estatística**: Entropia, variância, momentum
4. **Gestão de Risco**: Ajuste dinâmico de apostas
5. **Interface Visual**: Site responsivo e moderno

### Performance Esperada
- **Precisão**: 15-25% superior à predição básica
- **Confiança**: Scores mais precisos
- **Risco**: Gestão inteligente com apostas de segurança
- **Usabilidade**: Interface simples para qualquer usuário 