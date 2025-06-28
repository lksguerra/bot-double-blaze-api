class AdvancedPredictionEngine {
    constructor() {
        this.colorNames = {
            0: 'BRANCO',
            1: 'VERMELHO', 
            2: 'PRETO'
        };
        
        // Pesos dinâmicos que se ajustam baseado na performance
        this.strategyWeights = {
            streak: 0.25,
            frequency: 0.20,
            pattern: 0.15,
            martingale: 0.10,
            timeInterval: 0.08,
            variance: 0.12,
            momentum: 0.10
        };

        // Histórico de predições para learning
        this.predictionHistory = [];
    }

    /**
     * Predição principal com análises avançadas
     */
    predict(recentGames, currentGame, betAmount) {
        const analysis = this.analyzeAdvancedPatterns(recentGames);
        
        // Estratégias avançadas
        const strategies = {
            streak: this.streakStrategy(recentGames),
            frequency: this.frequencyStrategy(recentGames),
            pattern: this.advancedPatternStrategy(recentGames),
            martingale: this.martingaleStrategy(recentGames),
            timeInterval: this.timeIntervalStrategy(recentGames),
            variance: this.varianceStrategy(recentGames),
            momentum: this.momentumStrategy(recentGames)
        };

        // Predição com maior confiança
        const weightedPrediction = this.calculateAdvancedPrediction(strategies, analysis);
        
        // Estratégia de aposta mais inteligente
        const bettingStrategy = this.calculateSmartBettingStrategy(betAmount, weightedPrediction, analysis);
        
        const prediction = {
            corPredita: weightedPrediction.color,
            nomeCor: this.colorNames[weightedPrediction.color],
            confianca: Math.round(weightedPrediction.confidence * 100),
            estrategias: strategies,
            estrategiaAposta: bettingStrategy,
            analise: analysis,
            raciocinador: this.generateAdvancedReasoning(strategies, analysis),
            probabilidades: this.calculateProbabilities(analysis),
            indicadores: this.getTechnicalIndicators(recentGames)
        };

        return prediction;
    }

    /**
     * Análise avançada de padrões com mais métricas
     */
    analyzeAdvancedPatterns(recentGames) {
        const colors = recentGames.map(game => game.color);
        const rolls = recentGames.map(game => game.roll);
        const timestamps = recentGames.map(game => new Date(game.created_at));
        
        const colorCounts = { 0: 0, 1: 0, 2: 0 };
        colors.forEach(color => colorCounts[color]++);
        
        const analysis = {
            totalJogos: colors.length,
            distribuicaoCores: {
                branco: { quantidade: colorCounts[0], porcentagem: Math.round((colorCounts[0] / colors.length) * 100) },
                vermelho: { quantidade: colorCounts[1], porcentagem: Math.round((colorCounts[1] / colors.length) * 100) },
                preto: { quantidade: colorCounts[2], porcentagem: Math.round((colorCounts[2] / colors.length) * 100) }
            },
            
            // Análises avançadas
            variancia: this.calculateVariance(colors),
            entropia: this.calculateEntropy(colors),
            ciclos: this.detectCycles(colors),
            numeroQuentes: this.getHotNumbers(rolls),
            numerosFrios: this.getColdNumbers(rolls),
            tendencia: this.calculateTrend(colors.slice(0, 10)),
            volatilidade: this.calculateVolatility(colors),
            
            // Análises básicas melhoradas
            sequencias: this.findAdvancedStreaks(colors),
            sequenciaAtual: this.getCurrentStreak(colors),
            padraoRecente: colors.slice(0, 5),
            ultimasCincoCores: colors.slice(0, 5).map(c => this.colorNames[c])
        };

        return analysis;
    }

    /**
     * Estratégia de variância - analisa a dispersão dos resultados
     */
    varianceStrategy(recentGames) {
        const colors = recentGames.map(game => game.color).slice(0, 15);
        const variance = this.calculateVariance(colors);
        
        let prediction = 1;
        let confidence = 0.5;

        if (variance < 0.5) {
            // Baixa variância - continuar o padrão dominante
            const colorCounts = { 1: 0, 2: 0 };
            colors.forEach(color => {
                if (color === 1 || color === 2) colorCounts[color]++;
            });
            prediction = colorCounts[1] > colorCounts[2] ? 1 : 2;
            confidence = 0.7;
        } else if (variance > 1.2) {
            // Alta variância - apostar no contrário do último
            const lastColor = colors[0];
            prediction = lastColor === 1 ? 2 : 1;
            confidence = 0.6;
        }

        return {
            color: prediction,
            confidence,
            reasoning: `Análise de variância: ${variance.toFixed(2)} - ${variance < 0.5 ? 'baixa volatilidade' : 'alta volatilidade'}`
        };
    }

    /**
     * Estratégia de momentum - analisa a força da tendência atual
     */
    momentumStrategy(recentGames) {
        const colors = recentGames.map(game => game.color).slice(0, 10);
        const momentum = this.calculateMomentum(colors);
        
        let prediction = 1;
        let confidence = 0.5;

        if (Math.abs(momentum) > 0.3) {
            // Momentum forte - continuar a tendência
            prediction = momentum > 0 ? 1 : 2;
            confidence = 0.6 + Math.abs(momentum) * 0.2;
        } else {
            // Momentum fraco - possível reversão
            const lastColor = colors[0];
            prediction = lastColor === 1 ? 2 : 1;
            confidence = 0.55;
        }

        return {
            color: prediction,
            confidence: Math.min(confidence, 0.8),
            reasoning: `Momentum: ${momentum.toFixed(2)} - ${Math.abs(momentum) > 0.3 ? 'tendência forte' : 'possível reversão'}`
        };
    }

    /**
     * Padrões avançados com análise de n-gramas
     */
    advancedPatternStrategy(recentGames) {
        const colors = recentGames.map(game => game.color).slice(0, 15);
        
        // Análise de n-gramas (2, 3, 4)
        const patterns = [];
        for (let n = 2; n <= 4; n++) {
            patterns.push(...this.findNGramPatterns(colors, n));
        }

        // Análise de sequências cíclicas
        const cycles = this.detectCycles(colors);
        
        let prediction = 1;
        let confidence = 0.5;

        if (patterns.length > 0) {
            const bestPattern = patterns.sort((a, b) => b.strength - a.strength)[0];
            prediction = bestPattern.nextColor;
            confidence = 0.5 + bestPattern.strength * 0.3;
        }

        if (cycles.length > 0) {
            const strongestCycle = cycles[0];
            if (strongestCycle.confidence > confidence) {
                prediction = strongestCycle.nextColor;
                confidence = strongestCycle.confidence;
            }
        }

        return {
            color: prediction,
            confidence: Math.min(confidence, 0.8),
            reasoning: `Padrões avançados: ${patterns.length} n-gramas, ${cycles.length} ciclos detectados`
        };
    }

    // === Implementações das estratégias básicas ===
    
    streakStrategy(recentGames) {
        const colors = recentGames.map(game => game.color);
        const currentStreak = this.getCurrentStreak(colors);
        
        let prediction = 1;
        let confidence = 0.5;
        
        if (currentStreak && currentStreak.length >= 3) {
            prediction = currentStreak.color === 1 ? 2 : 1;
            confidence = Math.min(0.8, 0.5 + (currentStreak.length * 0.1));
        } else if (currentStreak && currentStreak.length === 1) {
            prediction = currentStreak.color === 0 ? 1 : currentStreak.color;
            confidence = 0.6;
        }
        
        return { color: prediction, confidence, reasoning: `Análise de sequência: ${currentStreak ? `${currentStreak.length} ${this.colorNames[currentStreak.color]}` : 'Sem sequência'}` };
    }

    frequencyStrategy(recentGames) {
        const colors = recentGames.map(game => game.color);
        const colorCounts = { 0: 0, 1: 0, 2: 0 };
        
        colors.forEach(color => colorCounts[color]++);
        
        const redCount = colorCounts[1];
        const blackCount = colorCounts[2];
        
        let prediction = redCount < blackCount ? 1 : 2;
        let confidence = Math.abs(redCount - blackCount) / colors.length + 0.4;
        
        return { 
            color: prediction, 
            confidence: Math.min(confidence, 0.8),
            reasoning: `Frequência: VERMELHO ${redCount}, PRETO ${blackCount} - apostando no menos frequente`
        };
    }

    martingaleStrategy(recentGames) {
        const colors = recentGames.map(game => game.color);
        const recent = colors.slice(0, 5);
        
        let alternatingCount = 0;
        for (let i = 0; i < recent.length - 1; i++) {
            if (recent[i] !== recent[i + 1] && recent[i] !== 0 && recent[i + 1] !== 0) {
                alternatingCount++;
            }
        }
        
        const lastColor = recent[0];
        let prediction = lastColor === 1 ? 2 : 1;
        let confidence = 0.4 + (alternatingCount / recent.length * 0.3);
        
        return { 
            color: prediction, 
            confidence,
            reasoning: `Martingale: Última cor ${this.colorNames[lastColor]}, padrão alternado detectado`
        };
    }

    timeIntervalStrategy(recentGames) {
        const now = new Date();
        const timeBasedColors = recentGames.filter(game => {
            const gameTime = new Date(game.created_at);
            const diffMinutes = (now - gameTime) / (1000 * 60);
            return diffMinutes <= 30;
        });
        
        const colorCounts = { 1: 0, 2: 0 };
        timeBasedColors.forEach(game => {
            if (game.color === 1 || game.color === 2) {
                colorCounts[game.color]++;
            }
        });
        
        let prediction = colorCounts[1] < colorCounts[2] ? 1 : 2;
        let confidence = 0.5;
        
        return { 
            color: prediction, 
            confidence,
            reasoning: `Baseado no tempo: Últimos 30min - VERMELHO ${colorCounts[1]}, PRETO ${colorCounts[2]}`
        };
    }

    /**
     * Cálculo de predição com análise estatística avançada
     */
    calculateAdvancedPrediction(strategies, analysis) {
        const votes = { 1: 0, 2: 0 };
        let totalWeight = 0;

        // Votos ponderados com ajuste de confiança
        Object.keys(strategies).forEach(strategyName => {
            const strategy = strategies[strategyName];
            const weight = this.strategyWeights[strategyName];
            const adjustedWeight = weight * strategy.confidence;
            
            votes[strategy.color] += adjustedWeight;
            totalWeight += adjustedWeight;
        });

        // Fator de correção baseado na análise
        const correctionFactor = this.calculateCorrectionFactor(analysis);
        
        const predictedColor = votes[1] > votes[2] ? 1 : 2;
        const rawConfidence = Math.max(votes[1], votes[2]) / totalWeight;
        const finalConfidence = Math.min(rawConfidence * correctionFactor, 0.95);

        return { color: predictedColor, confidence: finalConfidence };
    }

    /**
     * Estratégia de aposta inteligente com gestão de risco
     */
    calculateSmartBettingStrategy(totalAmount, prediction, analysis) {
        const baseWhitePercentage = 0.15;
        const confidenceAdjustment = (1 - prediction.confidence) * 0.15;
        const volatilityAdjustment = analysis.volatilidade * 0.1;
        
        const whitePercentage = Math.min(0.3, baseWhitePercentage + confidenceAdjustment + volatilityAdjustment);
        
        let whiteAmount = Math.floor((totalAmount * whitePercentage) / 10) * 10;
        let mainAmount = totalAmount - whiteAmount;
        
        // Ajustes baseados em indicadores técnicos
        if (analysis.tendencia !== 'neutro') {
            whiteAmount = Math.max(10, whiteAmount);
        }

        return {
            valorTotal: totalAmount,
            valorCorPrincipal: mainAmount,
            valorBranco: whiteAmount,
            distribuicao: {
                principal: Math.round((mainAmount / totalAmount) * 100),
                branco: Math.round((whiteAmount / totalAmount) * 100)
            },
            recomendacao: `Aposte R$${mainAmount} em ${this.colorNames[prediction.color]}, R$${whiteAmount} no BRANCO (risco ${whitePercentage > 0.2 ? 'alto' : 'moderado'})`,
            nivelRisco: whitePercentage > 0.25 ? 'alto' : whitePercentage > 0.15 ? 'moderado' : 'baixo'
        };
    }

    /**
     * Cálculo de probabilidades para cada cor
     */
    calculateProbabilities(analysis) {
        const total = analysis.totalJogos;
        const red = analysis.distribuicaoCores.vermelho.quantidade;
        const black = analysis.distribuicaoCores.preto.quantidade;
        const white = analysis.distribuicaoCores.branco.quantidade;

        // Probabilidades ajustadas por tendência
        let redProb = red / total;
        let blackProb = black / total;
        let whiteProb = white / total;

        // Ajuste baseado na tendência
        if (analysis.tendencia === 'vermelho') {
            redProb *= 1.1;
            blackProb *= 0.95;
        } else if (analysis.tendencia === 'preto') {
            blackProb *= 1.1;
            redProb *= 0.95;
        }

        return {
            vermelho: Math.round(redProb * 100),
            preto: Math.round(blackProb * 100),
            branco: Math.round(whiteProb * 100)
        };
    }

    // === Funções auxiliares avançadas ===

    calculateVariance(colors) {
        const mean = colors.reduce((a, b) => a + b, 0) / colors.length;
        const variance = colors.reduce((acc, color) => acc + Math.pow(color - mean, 2), 0) / colors.length;
        return variance;
    }

    calculateEntropy(colors) {
        const counts = { 0: 0, 1: 0, 2: 0 };
        colors.forEach(color => counts[color]++);
        
        let entropy = 0;
        Object.values(counts).forEach(count => {
            if (count > 0) {
                const p = count / colors.length;
                entropy -= p * Math.log2(p);
            }
        });
        return entropy;
    }

    calculateMomentum(colors) {
        const recent = colors.slice(0, 5);
        const older = colors.slice(5, 10);
        
        const recentRed = recent.filter(c => c === 1).length / recent.length;
        const olderRed = older.filter(c => c === 1).length / older.length;
        
        return recentRed - olderRed;
    }

    calculateTrend(colors) {
        const redCount = colors.filter(c => c === 1).length;
        const blackCount = colors.filter(c => c === 2).length;
        
        if (redCount > blackCount * 1.3) return 'vermelho';
        if (blackCount > redCount * 1.3) return 'preto';
        return 'neutro';
    }

    calculateVolatility(colors) {
        let changes = 0;
        for (let i = 1; i < colors.length; i++) {
            if (colors[i] !== colors[i-1]) changes++;
        }
        return changes / (colors.length - 1);
    }

    detectCycles(colors) {
        const cycles = [];
        for (let cycleLength = 3; cycleLength <= 8; cycleLength++) {
            const cycle = this.findCycle(colors, cycleLength);
            if (cycle.confidence > 0.6) {
                cycles.push(cycle);
            }
        }
        return cycles.sort((a, b) => b.confidence - a.confidence);
    }

    findCycle(colors, length) {
        const pattern = colors.slice(0, length);
        let matches = 0;
        let totalChecks = 0;
        
        for (let i = length; i < colors.length - length; i += length) {
            const segment = colors.slice(i, i + length);
            totalChecks++;
            if (JSON.stringify(pattern) === JSON.stringify(segment)) {
                matches++;
            }
        }
        
        const confidence = totalChecks > 0 ? matches / totalChecks : 0;
        const nextColor = colors.length >= length ? colors[colors.length - length] : 1;
        
        return { pattern, confidence, nextColor, length };
    }

    findNGramPatterns(colors, n) {
        const patterns = new Map();
        
        for (let i = 0; i <= colors.length - n; i++) {
            const gram = colors.slice(i, i + n).join('-');
            const nextColor = i + n < colors.length ? colors[i + n] : null;
            
            if (nextColor !== null) {
                if (!patterns.has(gram)) {
                    patterns.set(gram, { count: 0, nextColors: { 0: 0, 1: 0, 2: 0 } });
                }
                patterns.get(gram).count++;
                patterns.get(gram).nextColors[nextColor]++;
            }
        }
        
        const results = [];
        patterns.forEach((data, gram) => {
            if (data.count >= 2) {
                const mostLikely = Object.keys(data.nextColors).reduce((a, b) => 
                    data.nextColors[a] > data.nextColors[b] ? a : b
                );
                const strength = data.nextColors[mostLikely] / data.count;
                
                results.push({
                    pattern: gram,
                    nextColor: parseInt(mostLikely),
                    strength,
                    occurrences: data.count
                });
            }
        });
        
        return results;
    }

    getCurrentStreak(colors) {
        if (colors.length === 0) return null;
        
        let streakColor = colors[0];
        let streakLength = 1;
        
        for (let i = 1; i < colors.length; i++) {
            if (colors[i] === streakColor) {
                streakLength++;
            } else {
                break;
            }
        }
        
        return { color: streakColor, length: streakLength };
    }

    findAdvancedStreaks(colors) {
        const streaks = [];
        let currentColor = colors[0];
        let currentLength = 1;
        
        for (let i = 1; i < colors.length; i++) {
            if (colors[i] === currentColor) {
                currentLength++;
            } else {
                if (currentLength >= 2) {
                    streaks.push({ color: currentColor, length: currentLength, position: i - currentLength });
                }
                currentColor = colors[i];
                currentLength = 1;
            }
        }
        
        if (currentLength >= 2) {
            streaks.push({ color: currentColor, length: currentLength, position: colors.length - currentLength });
        }
        
        return streaks;
    }

    getHotNumbers(rolls) {
        const counts = {};
        rolls.forEach(roll => {
            counts[roll] = (counts[roll] || 0) + 1;
        });
        
        return Object.entries(counts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([num, count]) => ({ numero: parseInt(num), frequencia: count }));
    }

    getColdNumbers(rolls) {
        const possibleNumbers = Array.from({length: 15}, (_, i) => i);
        const counts = {};
        possibleNumbers.forEach(num => counts[num] = 0);
        rolls.forEach(roll => counts[roll] = (counts[roll] || 0) + 1);
        
        return Object.entries(counts)
            .sort(([,a], [,b]) => a - b)
            .slice(0, 5)
            .map(([num, count]) => ({ numero: parseInt(num), frequencia: count }));
    }

    calculateCorrectionFactor(analysis) {
        let factor = 1.0;
        
        // Ajuste baseado na entropia
        if (analysis.entropia < 1.0) factor *= 1.1;
        if (analysis.entropia > 1.8) factor *= 0.9;
        
        // Ajuste baseado na volatilidade
        if (analysis.volatilidade < 0.3) factor *= 1.05;
        if (analysis.volatilidade > 0.8) factor *= 0.95;
        
        return Math.max(0.7, Math.min(1.3, factor));
    }

    generateAdvancedReasoning(strategies, analysis) {
        const reasons = [];
        
        if (analysis.sequenciaAtual && analysis.sequenciaAtual.length >= 3) {
            reasons.push(`Sequência de ${analysis.sequenciaAtual.length} ${this.colorNames[analysis.sequenciaAtual.color]} indica possível reversão`);
        }
        
        if (analysis.volatilidade > 0.7) {
            reasons.push(`Alta volatilidade (${(analysis.volatilidade * 100).toFixed(0)}%) sugere imprevisibilidade`);
        }
        
        if (analysis.ciclos.length > 0) {
            reasons.push(`${analysis.ciclos.length} padrões cíclicos detectados`);
        }
        
        if (analysis.tendencia !== 'neutro') {
            reasons.push(`Tendência atual favorece ${analysis.tendencia.toUpperCase()}`);
        }
        
        return reasons.length > 0 ? reasons.join('. ') : 'Análise baseada em múltiplos indicadores técnicos';
    }

    getTechnicalIndicators(recentGames) {
        const colors = recentGames.map(g => g.color);
        
        return {
            volatilidade: (this.calculateVolatility(colors) * 100).toFixed(1) + '%',
            entropia: this.calculateEntropy(colors).toFixed(2),
            momentum: this.calculateMomentum(colors).toFixed(2),
            tendencia: this.calculateTrend(colors)
        };
    }
}

module.exports = AdvancedPredictionEngine; 