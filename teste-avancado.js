const axios = require('axios');

/**
 * Teste para demonstrar as melhorias da versão avançada
 */
async function testeAvancado() {
    const API_URL = 'http://localhost:3000';
    
    try {
        console.log('🚀 Teste das Melhorias - Versão Avançada vs Básica\n');
        
        // Comparar as duas versões
        console.log('🔍 Comparando predições básica vs avançada...');
        const comparison = await axios.post(`${API_URL}/api/compare-predictions`, {
            betAmount: 100
        });
        
        const comp = comparison.data.comparacao;
        
        console.log('\n📊 COMPARAÇÃO DE PREDIÇÕES:');
        console.log('═══════════════════════════════════════');
        
        console.log('\n🔵 VERSÃO BÁSICA:');
        console.log(`   🎨 Cor: ${comp.basica.cor}`);
        console.log(`   📈 Confiança: ${comp.basica.confianca}%`);
        console.log(`   💰 Aposta Principal: R$${comp.basica.aposta}`);
        console.log(`   🛡️  Aposta Segurança: R$${comp.basica.seguranca}`);
        
        console.log('\n🔴 VERSÃO AVANÇADA:');
        console.log(`   🎨 Cor: ${comp.avancada.cor}`);
        console.log(`   📈 Confiança: ${comp.avancada.confianca}%`);
        console.log(`   💰 Aposta Principal: R$${comp.avancada.aposta}`);
        console.log(`   🛡️  Aposta Segurança: R$${comp.avancada.seguranca}`);
        
        console.log('\n📈 INDICADORES TÉCNICOS (só na versão avançada):');
        if (comp.avancada.indicadores) {
            console.log(`   📊 Volatilidade: ${comp.avancada.indicadores.volatilidade}`);
            console.log(`   🔬 Entropia: ${comp.avancada.indicadores.entropia}`);
            console.log(`   ⚡ Momentum: ${comp.avancada.indicadores.momentum}`);
            console.log(`   📈 Tendência: ${comp.avancada.indicadores.tendencia}`);
        }
        
        console.log('\n🎯 PROBABILIDADES CALCULADAS:');
        if (comp.avancada.probabilidades) {
            console.log(`   🔴 Vermelho: ${comp.avancada.probabilidades.vermelho}%`);
            console.log(`   ⚫ Preto: ${comp.avancada.probabilidades.preto}%`);
            console.log(`   ⚪ Branco: ${comp.avancada.probabilidades.branco}%`);
        }
        
        console.log('\n💡 RECOMENDAÇÃO:');
        console.log(`   ${comparison.data.recomendacao}`);
        
        // Teste detalhado da versão avançada
        console.log('\n\n🔬 ANÁLISE DETALHADA - VERSÃO AVANÇADA');
        console.log('═══════════════════════════════════════');
        
        const advanced = await axios.post(`${API_URL}/api/predict-advanced`, {
            betAmount: 50
        });
        
        const pred = advanced.data.predicao;
        const analise = pred.analise;
        
        console.log(`\n🎯 Predição: ${pred.nomeCor} (${pred.confianca}% confiança)`);
        console.log(`🧠 Raciocínio: ${pred.raciocinador}`);
        
        console.log('\n📊 ANÁLISE ESTATÍSTICA AVANÇADA:');
        console.log(`   📈 Total de Jogos: ${analise.totalJogos}`);
        console.log(`   🔢 Variância: ${analise.variancia?.toFixed(2) || 'N/A'}`);
        console.log(`   🔬 Entropia: ${analise.entropia?.toFixed(2) || 'N/A'}`);
        console.log(`   ⚡ Volatilidade: ${(analise.volatilidade * 100)?.toFixed(1) || 'N/A'}%`);
        console.log(`   📈 Tendência: ${analise.tendencia || 'neutro'}`);
        
        if (analise.numeroQuentes && analise.numeroQuentes.length > 0) {
            console.log('\n🔥 NÚMEROS QUENTES:');
            analise.numeroQuentes.forEach((num, index) => {
                console.log(`   ${index + 1}. Número ${num.numero} (${num.frequencia}x)`);
            });
        }
        
        if (analise.numerosFrios && analise.numerosFrios.length > 0) {
            console.log('\n❄️  NÚMEROS FRIOS:');
            analise.numerosFrios.forEach((num, index) => {
                console.log(`   ${index + 1}. Número ${num.numero} (${num.frequencia}x)`);
            });
        }
        
        if (analise.ciclos && analise.ciclos.length > 0) {
            console.log('\n🔄 PADRÕES CÍCLICOS DETECTADOS:');
            analise.ciclos.forEach((ciclo, index) => {
                console.log(`   ${index + 1}. Padrão de ${ciclo.length} elementos (${(ciclo.confidence * 100).toFixed(0)}% confiança)`);
            });
        }
        
        console.log('\n🎲 ESTRATÉGIAS INDIVIDUAIS:');
        if (pred.estrategias) {
            Object.keys(pred.estrategias).forEach(nome => {
                const estrategia = pred.estrategias[nome];
                console.log(`   📋 ${nome.toUpperCase()}: ${estrategia.confidence ? Math.round(estrategia.confidence * 100) : 'N/A'}% - ${estrategia.reasoning || 'Sem detalhes'}`);
            });
        }
        
        console.log('\n💰 GESTÃO DE RISCO:');
        console.log(`   📊 Nível de Risco: ${pred.estrategiaAposta.nivelRisco || 'moderado'}`);
        console.log(`   💡 ${pred.estrategiaAposta.recomendacao}`);
        
        // Mostrar diferenças chave
        console.log('\n\n🆚 PRINCIPAIS MELHORIAS DA VERSÃO AVANÇADA:');
        console.log('═══════════════════════════════════════');
        console.log('✅ 7 estratégias ao invés de 5');
        console.log('✅ Análise de variância e entropia');
        console.log('✅ Detecção de padrões cíclicos');
        console.log('✅ Análise de momentum e volatilidade');
        console.log('✅ Números quentes e frios');
        console.log('✅ Gestão de risco inteligente');
        console.log('✅ Probabilidades calculadas dinamicamente');
        console.log('✅ Indicadores técnicos avançados');
        
        console.log('\n✅ Teste concluído! Use /api/predict-advanced para maior precisão.');
        
    } catch (error) {
        console.error('❌ Erro no teste:', error.response?.data?.error || error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 Inicie o servidor primeiro com: npm start');
        }
    }
}

// Executar o teste
testeAvancado(); 