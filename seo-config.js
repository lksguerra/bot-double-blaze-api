// Configuração de SEO para Bot Double Blaze
// Adicione este script no final do HTML para melhorar o SEO

// Schema.org markup para melhor indexação
const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Bot Double Blaze",
  "description": "Bot automático para análise de padrões do Double Blaze com estratégias avançadas de casino",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  },
  "featureList": [
    "Bot automático 24/7",
    "Análise de padrões em tempo real",
    "7 estratégias de casino",
    "Gestão de risco inteligente",
    "Interface responsiva"
  ],
  "keywords": "bot double blaze, análise double, casino online, estratégias casino, bot automático",
  "author": {
    "@type": "Organization",
    "name": "Bot Double Blaze"
  }
};

// Palavras-chave principais para rankeamento
const keywordTargets = [
  'bot double blaze',
  'análise double',
  'casino online',
  'estratégias casino',
  'bot automático',
  'double blaze',
  'análise casino',
  'bot casino',
  'predição double',
  'sistema casino'
];

// Meta tags dinâmicas
const metaConfig = {
  title: "Bot Double Blaze - Análise Casino Automática | Estratégias de Double",
  description: "Bot automático para Double Blaze com análise avançada de padrões. Estratégias de casino, análise double, bot casino e predições inteligentes para maximizar ganhos.",
  keywords: keywordTargets.join(', '),
  canonical: "https://botdoubleblaze.com"
};

// Função para adicionar Schema markup
function addSchemaMarkup() {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schemaMarkup);
  document.head.appendChild(script);
}

// Adicionar Schema markup quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addSchemaMarkup);
} else {
  addSchemaMarkup();
}

// Analytics e tracking (configurar conforme necessário)
const analytics = {
  // Google Analytics
  gtag: function(command, target, config) {
    if (typeof gtag !== 'undefined') {
      gtag(command, target, config);
    }
  },
  
  // Track eventos importantes
  trackPrediction: function(type, confidence) {
    this.gtag('event', 'prediction_made', {
      'event_category': 'bot_usage',
      'event_label': type,
      'value': confidence
    });
  },
  
  trackBetAmount: function(amount) {
    this.gtag('event', 'bet_configured', {
      'event_category': 'user_interaction',
      'value': amount
    });
  }
};

// Exportar para uso global
window.BotDoubleBlazeSEO = {
  schema: schemaMarkup,
  keywords: keywordTargets,
  meta: metaConfig,
  analytics: analytics
}; 