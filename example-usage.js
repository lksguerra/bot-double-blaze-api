const axios = require('axios');

// Base URL for the API (change if running on different port)
const API_BASE_URL = 'http://localhost:3000';

/**
 * Exemplo de uso da API de Predição Blaze
 */
async function demonstrateAPI() {
    try {
        console.log('🚀 Demo da API de Predição Blaze\n');

        // 1. Verificar status da API
        console.log('1. Verificando status da API...');
        const healthResponse = await axios.get(`${API_BASE_URL}/health`);
        console.log('✅ Status da API:', healthResponse.data.status);
        console.log('');

        // 2. Buscar jogo atual
        console.log('2. Buscando jogo atual...');
        const currentGameResponse = await axios.get(`${API_BASE_URL}/api/current-game`);
        const currentGame = currentGameResponse.data;
        console.log(`🎲 Jogo Atual: ${currentGame.id}`);
        console.log(`🎨 Cor: ${getColorName(currentGame.color)} (${currentGame.color})`);
        console.log(`🎯 Número: ${currentGame.roll}`);
        console.log(`📊 Status: ${currentGame.status}`);
        console.log('');

        // 3. Buscar análise de jogos recentes
        console.log('3. Buscando análise de padrões...');
        const analysisResponse = await axios.get(`${API_BASE_URL}/api/analysis`);
        const analysis = analysisResponse.data.analise;
        console.log('📈 Distribuição de Cores:');
        console.log(`   🔴 VERMELHO: ${analysis.distribuicaoCores.vermelho.quantidade} jogos (${analysis.distribuicaoCores.vermelho.porcentagem}%)`);
        console.log(`   ⚫ PRETO: ${analysis.distribuicaoCores.preto.quantidade} jogos (${analysis.distribuicaoCores.preto.porcentagem}%)`);
        console.log(`   ⚪ BRANCO: ${analysis.distribuicaoCores.branco.quantidade} jogos (${analysis.distribuicaoCores.branco.porcentagem}%)`);
        
        if (analysis.sequenciaAtual) {
            console.log(`🔥 Sequência Atual: ${analysis.sequenciaAtual.length} ${getColorName(analysis.sequenciaAtual.color)}`);
        }
        console.log('');

        // 4. Get prediction for different bet amounts
        const betAmounts = [10, 50, 100];
        
        for (const betAmount of betAmounts) {
            console.log(`4.${betAmounts.indexOf(betAmount) + 1} Obtendo predição para aposta de R$${betAmount}...`);
            
            const predictionResponse = await axios.post(`${API_BASE_URL}/api/predict`, {
                betAmount: betAmount
            });
            
            const prediction = predictionResponse.data.predicao;
            
            console.log(`🎯 Predição: ${prediction.nomeCor} (${prediction.corPredita})`);
            console.log(`📊 Confiança: ${prediction.confianca}%`);
            console.log(`💰 Estratégia de Aposta:`);
            console.log(`   Aposta principal: R$${prediction.estrategiaAposta.valorCorPrincipal} em ${prediction.nomeCor}`);
            console.log(`   Aposta segurança: R$${prediction.estrategiaAposta.valorBranco} no BRANCO`);
            console.log(`🧠 Raciocínio: ${prediction.raciocinador}`);
            console.log('');
        }

        // 5. Mostrar estratégias individuais
        const detailedPrediction = await axios.post(`${API_BASE_URL}/api/predict`, { betAmount: 100 });
        const strategies = detailedPrediction.data.predicao.estrategias;
        
        console.log('5. Análise de Estratégias Individuais:');
        Object.keys(strategies).forEach(strategyName => {
            const strategy = strategies[strategyName];
            console.log(`   📋 ${strategyName.toUpperCase()}: ${getColorName(strategy.color)} (${Math.round(strategy.confidence * 100)}% confiança)`);
            console.log(`      💭 ${strategy.reasoning}`);
        });

    } catch (error) {
        console.error('❌ Erro:', error.response?.data?.error || error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 Certifique-se de que o servidor da API está rodando:');
            console.log('   npm start');
        }
    }
}

/**
 * Função auxiliar para converter número da cor para nome
 */
function getColorName(colorNumber) {
    const colorNames = {
        0: 'BRANCO',
        1: 'VERMELHO',
        2: 'PRETO'
    };
    return colorNames[colorNumber] || 'DESCONHECIDO';
}

/**
 * Simular monitoramento contínuo de predições
 */
async function monitorPredictions(intervalMinutes = 1) {
    console.log(`🔄 Iniciando monitoramento de predições (a cada ${intervalMinutes} minuto(s))`);
    console.log('Pressione Ctrl+C para parar\n');
    
    setInterval(async () => {
        try {
            const timestamp = new Date().toLocaleTimeString();
            console.log(`⏰ ${timestamp} - Obtendo nova predição...`);
            
            const response = await axios.post(`${API_BASE_URL}/api/predict`, { betAmount: 50 });
            const prediction = response.data.predicao;
            
            console.log(`   🎯 ${prediction.nomeCor} (${prediction.confianca}% confiança)`);
            console.log(`   💰 Aposte R$${prediction.estrategiaAposta.valorCorPrincipal} + R$${prediction.estrategiaAposta.valorBranco} branco\n`);
            
        } catch (error) {
            console.error(`   ❌ Erro: ${error.message}\n`);
        }
    }, intervalMinutes * 60 * 1000);
}

// Run the demo
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.includes('--monitor')) {
        const intervalArg = args.find(arg => arg.startsWith('--interval='));
        const interval = intervalArg ? parseInt(intervalArg.split('=')[1]) : 1;
        monitorPredictions(interval);
    } else {
        demonstrateAPI();
    }
}

module.exports = { demonstrateAPI, monitorPredictions }; 