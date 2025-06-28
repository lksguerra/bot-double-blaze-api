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

// Helper function to fetch data from Blaze APIs
async function fetchBlazeData() {
    try {
        const [currentResponse, recentResponse] = await Promise.all([
            axios.get(CURRENT_GAME_URL, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            }),
            axios.get(RECENT_GAMES_URL, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            })
        ]);

        return {
            current: currentResponse.data,
            recent: recentResponse.data
        };
    } catch (error) {
        console.error('Erro ao buscar dados da Blaze:', error.message);
        throw new Error('Falha ao buscar dados da API da Blaze');
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
});

module.exports = app; 