const axios = require('axios');

/**
 * Teste simples da API em português
 */
async function testeRapido() {
    const API_URL = 'http://localhost:3000';
    
    try {
        console.log('🚀 Teste da API de Predição Blaze em Português\n');
        
        // Verificar se a API está funcionando
        console.log('Verificando status...');
        const health = await axios.get(`${API_URL}/health`);
        console.log(`✅ Status: ${health.data.status}\n`);
        
        // Fazer uma predição para R$50
        console.log('🎯 Fazendo predição para aposta de R$50...');
        const response = await axios.post(`${API_URL}/api/predict`, {
            betAmount: 50
        });
        
        const predicao = response.data.predicao;
        const analise = predicao.analise;
        
        console.log('\n📊 RESULTADO DA PREDIÇÃO:');
        console.log(`🎨 Cor Predita: ${predicao.nomeCor}`);
        console.log(`📈 Confiança: ${predicao.confianca}%`);
        console.log(`💰 Valor Principal: R$${predicao.estrategiaAposta.valorCorPrincipal} em ${predicao.nomeCor}`);
        console.log(`🛡️  Valor Segurança: R$${predicao.estrategiaAposta.valorBranco} no BRANCO`);
        console.log(`🧠 Raciocínio: ${predicao.raciocinador}`);
        
        console.log('\n📈 ANÁLISE DE CORES:');
        console.log(`🔴 VERMELHO: ${analise.distribuicaoCores.vermelho.quantidade} jogos (${analise.distribuicaoCores.vermelho.porcentagem}%)`);
        console.log(`⚫ PRETO: ${analise.distribuicaoCores.preto.quantidade} jogos (${analise.distribuicaoCores.preto.porcentagem}%)`);
        console.log(`⚪ BRANCO: ${analise.distribuicaoCores.branco.quantidade} jogos (${analise.distribuicaoCores.branco.porcentagem}%)`);
        
        if (analise.sequenciaAtual) {
            console.log(`🔥 Sequência atual: ${analise.sequenciaAtual.length} vezes a mesma cor`);
        }
        
        console.log('\n✅ Teste concluído com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro no teste:', error.response?.data?.error || error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 Inicie o servidor primeiro com: npm start');
        }
    }
}

// Executar o teste
testeRapido(); 