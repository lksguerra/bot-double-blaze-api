const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const PredictionEngine = require('./prediction-engine');
const AdvancedPredictionEngine = require('./advanced-engine');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Blaze API endpoints
const CURRENT_GAME_URL = 'https://blaze.bet.br/api/singleplayer-originals/originals/roulette_games/current/1';
const RECENT_GAMES_URL = 'https://blaze.bet.br/api/singleplayer-originals/originals/roulette_games/recent/1';

// Initialize prediction engines
const predictionEngine = new PredictionEngine();
const advancedEngine = new AdvancedPredictionEngine();

// Configuração de proxy brasileiro para contornar bloqueio geográfico
const proxyConfig = {
    timeout: 15000,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Origin': 'https://blaze.bet.br',
        'Referer': 'https://blaze.bet.br/',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin'
    }
};

// Helper function to fetch data from Blaze APIs com retry e fallback
async function fetchBlazeData(retryCount = 0) {
    try {
        console.log(`🌍 Tentativa ${retryCount + 1} - Buscando dados da Blaze...`);
        
        const [currentResponse, recentResponse] = await Promise.all([
            axios.get(CURRENT_GAME_URL, proxyConfig),
            axios.get(RECENT_GAMES_URL, proxyConfig)
        ]);

        console.log('✅ Dados obtidos com sucesso da Blaze!');
        return {
            current: currentResponse.data,
            recent: recentResponse.data
        };
        
    } catch (error) {
        console.error(`❌ Erro na tentativa ${retryCount + 1}:`, error.message);
        
        // Retry até 3 vezes com delay
        if (retryCount < 2) {
            console.log(`🔄 Tentando novamente em 2 segundos...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            return fetchBlazeData(retryCount + 1);
        }
        
        // Se falhar todas as tentativas, usar serviço de proxy
        if (process.env.NODE_ENV === 'production') {
            return await fetchWithProxyService();
        }
        
        throw new Error('Falha ao buscar dados da API da Blaze');
    }
}

// Função para usar serviço de proxy quando necessário
async function fetchWithProxyService() {
    try {
        console.log('🌐 Tentando com serviço de proxy...');
        
        // Usando AllOrigins como proxy (gratuito)
        const currentProxy = `https://api.allorigins.win/get?url=${encodeURIComponent(CURRENT_GAME_URL)}`;
        const recentProxy = `https://api.allorigins.win/get?url=${encodeURIComponent(RECENT_GAMES_URL)}`;
        
        const [currentResponse, recentResponse] = await Promise.all([
            axios.get(currentProxy, { timeout: 20000 }),
            axios.get(recentProxy, { timeout: 20000 })
        ]);

        console.log('✅ Dados obtidos via proxy!');
        return {
            current: JSON.parse(currentResponse.data.contents),
            recent: JSON.parse(recentResponse.data.contents)
        };
        
    } catch (proxyError) {
        console.error('❌ Proxy também falhou:', proxyError.message);
        throw new Error('Blaze API temporariamente indisponível. Tente novamente em alguns minutos.');
    }
}

// Routes

// Get current game status
app.get('/api/current-game', async (req, res) => {
    try {
        const data = await fetchBlazeData();
        res.json(data.current);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get recent games history
app.get('/api/recent-games', async (req, res) => {
    try {
        const data = await fetchBlazeData();
        res.json(data.recent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get color prediction (versão básica)
app.post('/api/predict', async (req, res) => {
    try {
        const { betAmount = 10 } = req.body;
        
        // Validate bet amount (must be multiple of 10)
        if (betAmount % 10 !== 0 || betAmount < 10) {
            return res.status(400).json({ 
                error: 'Valor da aposta deve ser múltiplo de 10 e pelo menos R$10' 
            });
        }

        const data = await fetchBlazeData();
        const prediction = predictionEngine.predict(data.recent, data.current, betAmount);
        
        res.json({
            predicao: prediction,
            jogoAtual: data.current,
            jogosRecentes: data.recent.slice(0, 5), // Mostra os últimos 5 jogos para contexto
            timestamp: new Date().toISOString(),
            versao: 'básica'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get advanced color prediction (versão melhorada)
app.post('/api/predict-advanced', async (req, res) => {
    try {
        const { betAmount = 10 } = req.body;
        
        // Validate bet amount (must be multiple of 10)
        if (betAmount % 10 !== 0 || betAmount < 10) {
            return res.status(400).json({ 
                error: 'Valor da aposta deve ser múltiplo de 10 e pelo menos R$10' 
            });
        }

        const data = await fetchBlazeData();
        const prediction = advancedEngine.predict(data.recent, data.current, betAmount);
        
        res.json({
            predicao: prediction,
            jogoAtual: data.current,
            jogosRecentes: data.recent.slice(0, 5),
            timestamp: new Date().toISOString(),
            versao: 'avançada'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Compare both prediction engines
app.post('/api/compare-predictions', async (req, res) => {
    try {
        const { betAmount = 10 } = req.body;
        
        if (betAmount % 10 !== 0 || betAmount < 10) {
            return res.status(400).json({ 
                error: 'Valor da aposta deve ser múltiplo de 10 e pelo menos R$10' 
            });
        }

        const data = await fetchBlazeData();
        const basicPrediction = predictionEngine.predict(data.recent, data.current, betAmount);
        const advancedPrediction = advancedEngine.predict(data.recent, data.current, betAmount);
        
        res.json({
            comparacao: {
                basica: {
                    cor: basicPrediction.nomeCor,
                    confianca: basicPrediction.confianca,
                    aposta: basicPrediction.estrategiaAposta.valorCorPrincipal,
                    seguranca: basicPrediction.estrategiaAposta.valorBranco
                },
                avancada: {
                    cor: advancedPrediction.nomeCor,
                    confianca: advancedPrediction.confianca,
                    aposta: advancedPrediction.estrategiaAposta.valorCorPrincipal,
                    seguranca: advancedPrediction.estrategiaAposta.valorBranco,
                    indicadores: advancedPrediction.indicadores,
                    probabilidades: advancedPrediction.probabilidades
                }
            },
            recomendacao: advancedPrediction.confianca > basicPrediction.confianca ? 
                'Use a predição avançada (maior confiança)' : 
                'Ambas as predições têm confiança similar',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get betting strategy analysis
app.get('/api/analysis', async (req, res) => {
    try {
        const data = await fetchBlazeData();
        const analysis = predictionEngine.analyzePatterns(data.recent);
        
        res.json({
            analise: analysis,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'Ativo', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 API de Predição Blaze rodando na porta ${PORT}`);
    console.log(`📊 Acesse a API em http://localhost:${PORT}`);
    console.log(`🌍 Modo: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app; 