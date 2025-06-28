class PredictionEngine {
    constructor() {
        this.colorNames = {
            0: 'BRANCO',
            1: 'VERMELHO', 
            2: 'PRETO'
        };
        
        // Weights for different prediction strategies
        this.strategyWeights = {
            streak: 0.3,
            frequency: 0.25,
            pattern: 0.2,
            martingale: 0.15,
            timeInterval: 0.1
        };
    }

    /**
     * Main prediction method
     * @param {Array} recentGames - Array of recent game results
     * @param {Object} currentGame - Current game data
     * @param {number} betAmount - Total amount to bet
     * @returns {Object} Prediction result with betting strategy
     */
    predict(recentGames, currentGame, betAmount) {
        const analysis = this.analyzePatterns(recentGames);
        
        // Get predictions from different strategies
        const strategies = {
            streak: this.streakStrategy(recentGames),
            frequency: this.frequencyStrategy(recentGames),
            pattern: this.patternStrategy(recentGames),
            martingale: this.martingaleStrategy(recentGames),
            timeInterval: this.timeIntervalStrategy(recentGames)
        };

        // Calculate weighted prediction
        const weightedPrediction = this.calculateWeightedPrediction(strategies);
        
        // Calculate betting amounts
        const bettingStrategy = this.calculateBettingStrategy(betAmount, weightedPrediction.confidence);
        
        return {
            corPredita: weightedPrediction.color,
            nomeCor: this.colorNames[weightedPrediction.color],
            confianca: Math.round(weightedPrediction.confidence * 100),
            estrategias: strategies,
            estrategiaAposta: bettingStrategy,
            analise: analysis,
            raciocinador: this.generateReasoning(strategies, analysis)
        };
    }

    /**
     * Analyze patterns in recent games
     */
    analyzePatterns(recentGames) {
        const colors = recentGames.map(game => game.color);
        const colorCounts = { 0: 0, 1: 0, 2: 0 };
        
        colors.forEach(color => colorCounts[color]++);
        
        const totalGames = colors.length;
        const streaks = this.findStreaks(colors);
        const lastStreak = streaks[streaks.length - 1];
        
        return {
            totalJogos: totalGames,
            distribuicaoCores: {
                branco: { quantidade: colorCounts[0], porcentagem: Math.round((colorCounts[0] / totalGames) * 100) },
                vermelho: { quantidade: colorCounts[1], porcentagem: Math.round((colorCounts[1] / totalGames) * 100) },
                preto: { quantidade: colorCounts[2], porcentagem: Math.round((colorCounts[2] / totalGames) * 100) }
            },
            sequencias: streaks,
            sequenciaAtual: lastStreak,
            maiorSequencia: Math.max(...streaks.map(s => s.length)),
            padraoRecente: colors.slice(0, 5),
            ultimasCincoCores: colors.slice(0, 5).map(c => this.colorNames[c])
        };
    }

    /**
     * Strategy based on current streaks
     */
    streakStrategy(recentGames) {
        const colors = recentGames.map(game => game.color);
        const streaks = this.findStreaks(colors);
        const currentStreak = streaks[streaks.length - 1];
        
        let prediction = 1; // Default to RED
        let confidence = 0.5;
        
        if (currentStreak && currentStreak.length >= 3) {
            // If there's a long streak, bet against it (contrarian approach)
            prediction = currentStreak.color === 1 ? 2 : 1;
            confidence = Math.min(0.8, 0.5 + (currentStreak.length * 0.1));
        } else if (currentStreak && currentStreak.length === 1) {
            // Short streak, continue the trend
            prediction = currentStreak.color === 0 ? 1 : currentStreak.color;
            confidence = 0.6;
        }
        
        return { color: prediction, confidence, reasoning: `Análise de sequência: ${currentStreak ? `${currentStreak.length} ${this.colorNames[currentStreak.color]}` : 'Sem sequência'}` };
    }

    /**
     * Strategy based on color frequency
     */
    frequencyStrategy(recentGames) {
        const colors = recentGames.map(game => game.color);
        const colorCounts = { 0: 0, 1: 0, 2: 0 };
        
        colors.forEach(color => colorCounts[color]++);
        
        // Find the least frequent color (excluding white)
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

    /**
     * Strategy based on pattern recognition
     */
    patternStrategy(recentGames) {
        const colors = recentGames.map(game => game.color).slice(0, 10);
        const patterns = this.findRepeatingPatterns(colors);
        
        let prediction = 1;
        let confidence = 0.5;
        
        if (patterns.length > 0) {
            const bestPattern = patterns[0];
            prediction = bestPattern.nextColor;
            confidence = 0.6 + (bestPattern.occurrences * 0.1);
        }
        
        return { 
            color: prediction, 
            confidence: Math.min(confidence, 0.75),
            reasoning: `Análise de padrões: ${patterns.length} padrões encontrados`
        };
    }

    /**
     * Martingale-inspired strategy
     */
    martingaleStrategy(recentGames) {
        const colors = recentGames.map(game => game.color);
        const recent = colors.slice(0, 5);
        
        // Look for alternating patterns
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

    /**
     * Strategy based on time intervals
     */
    timeIntervalStrategy(recentGames) {
        const now = new Date();
        const timeBasedColors = recentGames.filter(game => {
            const gameTime = new Date(game.created_at);
            const diffMinutes = (now - gameTime) / (1000 * 60);
            return diffMinutes <= 30; // Last 30 minutes
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
     * Calculate weighted prediction from all strategies
     */
    calculateWeightedPrediction(strategies) {
        const votes = { 1: 0, 2: 0 };
        let totalConfidence = 0;
        
        Object.keys(strategies).forEach(strategyName => {
            const strategy = strategies[strategyName];
            const weight = this.strategyWeights[strategyName];
            
            votes[strategy.color] += weight * strategy.confidence;
            totalConfidence += weight * strategy.confidence;
        });
        
        const predictedColor = votes[1] > votes[2] ? 1 : 2;
        const confidence = totalConfidence / Object.keys(strategies).length;
        
        return { color: predictedColor, confidence };
    }

    /**
     * Calculate betting strategy including white safety bet
     */
    calculateBettingStrategy(totalAmount, confidence) {
        // White safety percentage (5-20% based on confidence)
        const whitePercentage = Math.max(0.05, 0.25 - confidence * 0.2);
        
        let whiteAmount = Math.floor((totalAmount * whitePercentage) / 10) * 10;
        let mainAmount = totalAmount - whiteAmount;
        
        // Ensure minimum amounts
        if (whiteAmount < 10 && totalAmount >= 20) {
            whiteAmount = 10;
            mainAmount = totalAmount - 10;
        }
        
        return {
            valorTotal: totalAmount,
            valorCorPrincipal: mainAmount,
            valorBranco: whiteAmount,
            distribuicao: {
                principal: Math.round((mainAmount / totalAmount) * 100),
                branco: Math.round((whiteAmount / totalAmount) * 100)
            },
            recomendacao: `Aposte R$${mainAmount} na cor predita, R$${whiteAmount} no BRANCO como segurança`
        };
    }

    /**
     * Find streaks in color sequence
     */
    findStreaks(colors) {
        const streaks = [];
        let currentStreak = { color: colors[0], length: 1 };
        
        for (let i = 1; i < colors.length; i++) {
            if (colors[i] === currentStreak.color) {
                currentStreak.length++;
            } else {
                if (currentStreak.length > 1) {
                    streaks.push({ ...currentStreak });
                }
                currentStreak = { color: colors[i], length: 1 };
            }
        }
        
        if (currentStreak.length > 1) {
            streaks.push(currentStreak);
        }
        
        return streaks;
    }

    /**
     * Find repeating patterns in color sequence
     */
    findRepeatingPatterns(colors) {
        const patterns = [];
        
        for (let patternLength = 2; patternLength <= 4; patternLength++) {
            for (let i = 0; i <= colors.length - patternLength * 2; i++) {
                const pattern = colors.slice(i, i + patternLength);
                let occurrences = 0;
                
                for (let j = i + patternLength; j <= colors.length - patternLength; j++) {
                    const candidate = colors.slice(j, j + patternLength);
                    if (JSON.stringify(pattern) === JSON.stringify(candidate)) {
                        occurrences++;
                    }
                }
                
                if (occurrences > 0) {
                    const nextIndex = i + patternLength;
                    const nextColor = nextIndex < colors.length ? colors[nextIndex] : 1;
                    
                    patterns.push({
                        pattern,
                        occurrences,
                        nextColor: nextColor === 0 ? 1 : nextColor, // Default to RED if WHITE
                        length: patternLength
                    });
                }
            }
        }
        
        return patterns.sort((a, b) => b.occurrences - a.occurrences);
    }

    /**
     * Generate human-readable reasoning
     */
    generateReasoning(strategies, analysis) {
        const reasons = [];
        
        if (analysis.sequenciaAtual && analysis.sequenciaAtual.length >= 3) {
            reasons.push(`Sequência atual de ${analysis.sequenciaAtual.length} jogos ${this.colorNames[analysis.sequenciaAtual.color]} sugere reversão`);
        }
        
        const redPerc = analysis.distribuicaoCores.vermelho.porcentagem;
        const blackPerc = analysis.distribuicaoCores.preto.porcentagem;
        
        if (Math.abs(redPerc - blackPerc) > 20) {
            const dominant = redPerc > blackPerc ? 'VERMELHO' : 'PRETO';
            const underdog = redPerc < blackPerc ? 'VERMELHO' : 'PRETO';
            reasons.push(`${underdog} está sub-representado (${Math.min(redPerc, blackPerc)}% vs ${Math.max(redPerc, blackPerc)}%)`);
        }
        
        return reasons.length > 0 ? reasons.join('. ') : 'Sinais mistos de múltiplas estratégias';
    }
}

module.exports = PredictionEngine; 