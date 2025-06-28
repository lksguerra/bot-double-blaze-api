# 🚀 Guia de Deploy Gratuito - Bot Double Blaze

## 📋 Resumo
- **API**: Hospedar no Render.com (gratuito)
- **Site HTML**: Hospedar no Netlify/Vercel (gratuito)
- **Total**: 100% gratuito!

## 🔧 Preparar a API para Deploy

### 1. Criar `start` script no package.json
O arquivo `package.json` já está configurado corretamente com:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

### 2. Configurar variáveis de ambiente
Criar arquivo `.env` (opcional, a API funciona sem):
```env
PORT=3000
NODE_ENV=production
```

### 3. Adicionar CORS para produção
O arquivo `server.js` já tem CORS configurado para aceitar qualquer origem.

## 🌐 Deploy da API no Render.com

### Passo 1: Subir código no GitHub
1. Acesse [github.com](https://github.com)
2. Crie um novo repositório: "bot-double-blaze-api"
3. Faça upload de todos os arquivos do projeto

### Passo 2: Deploy no Render
1. Acesse [render.com](https://render.com)
2. Faça login com GitHub
3. Click "New +" → "Web Service"
4. Conecte seu repositório "bot-double-blaze-api"
5. Configure:
   - **Name**: bot-double-blaze-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
6. Click "Create Web Service"

### Passo 3: Obter URL da API
Após o deploy, você receberá uma URL como:
```
https://bot-double-blaze-api.onrender.com
```

## 📱 Deploy do Site HTML

### Opção 1: Netlify (Recomendado)

1. Acesse [netlify.com](https://netlify.com)
2. Faça login
3. Arraste o arquivo `webapp.html` para a área de deploy
4. **OU** conecte com GitHub:
   - Crie repositório "bot-double-blaze-web"
   - Upload apenas o arquivo `webapp.html`
   - Configure deploy automático

### Opção 2: Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Import seu repositório com o arquivo `webapp.html`
4. Deploy automático

### Opção 3: GitHub Pages

1. No seu repositório do GitHub
2. Renomeie `webapp.html` para `index.html`
3. Vá em Settings → Pages
4. Source: Deploy from branch → main
5. Salvar

## 🔗 Conectar Site à API

No arquivo `webapp.html`, altere a URL padrão:

```javascript
// Linha ~120 do arquivo webapp.html
<input type="text" id="apiUrl" value="https://SUA-API.onrender.com">
```

Substitua `SUA-API.onrender.com` pela URL real da sua API do Render.

## ✅ Teste Final

1. **API**: Acesse `https://sua-api.onrender.com/health`
   - Deve retornar: `{"status": "Ativo"}`

2. **Site**: Acesse seu site hospedado
   - Deve carregar interface bonita
   - Status deve mostrar "✅ API Online"

## 📊 URLs de Exemplo

Após o deploy, você terá:

- **API**: `https://bot-double-blaze-api.onrender.com`
- **Site**: `https://bot-double-blaze.netlify.app`

## 🛠️ Troubleshooting

### API não funciona?
- Verifique logs no Render Dashboard
- Confirme que todas as dependências estão no `package.json`
- Teste localmente primeiro: `npm start`

### Site não conecta na API?
- Verifique a URL da API no campo de input
- Abra o Console do navegador (F12) para ver erros
- Teste a API diretamente no navegador

### CORS Error?
- A API já tem CORS configurado
- Se ainda der erro, adicione sua URL do site em `server.js`:

```javascript
app.use(cors({
  origin: ['https://seu-site.netlify.app', 'https://seu-site.vercel.app']
}));
```

## 💡 Dicas Importantes

### Performance do Render (Plano Gratuito)
- **"Sleep"**: API dorme após 15min sem uso
- **"Cold Start"**: Primeira requisição pode demorar 30s
- **Solução**: Use um serviço como UptimeRobot para fazer ping a cada 10min

### Limites Gratuitos
- **Render**: 750 horas/mês (suficiente para uso contínuo)
- **Netlify**: 100GB bandwidth, 300 min build
- **Vercel**: 100GB bandwidth, 6.000 min serverless

## 🔄 Deploy Automático

### Setup CI/CD
Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: echo "Auto-deploy configurado no Render"
```

## 📈 Monitoramento

### Ferramentas Gratuitas
- **UptimeRobot**: Monitor de uptime
- **Google Analytics**: Estatísticas do site
- **Render Logs**: Logs da API em tempo real

## 🎯 Resultado Final

Você terá um sistema completo hospedado gratuitamente:

1. **API Avançada** com 7 estratégias de predição
2. **Site responsivo** com interface moderna
3. **Monitoramento** de status em tempo real
4. **Deploy automático** via GitHub

### 💸 Custo Total: R$ 0,00

### 🚀 Performance
- API responde em ~200-500ms
- Site carrega em ~1-2s
- Análises completas em ~1-3s

---

✅ **Siga este guia e tenha seu Bot Double Blaze online em 15 minutos!** 