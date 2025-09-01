# Site de 11 Meses de Namoro 💕

Um site romântico e interativo para celebrar 11 meses de relacionamento, com elementos flutuantes que reagem ao mouse e animação de texto tipo máquina de escrever.

## ✨ Funcionalidades

- **Elementos Flutuantes Interativos**: Corações, estrelas e emojis que vagam pela página e se afastam quando o mouse se aproxima
- **Animação de Texto**: Efeito de máquina de escrever no texto principal
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Animações Suaves**: Transições e efeitos visuais elegantes
- **Partículas de Fundo**: Efeito de partículas animadas
- **Contador Animado**: Contador que anima até o número 11
- **Timeline da Jornada**: Seção mostrando a evolução do relacionamento

## 🚀 Como Usar

### Opção 1: Executar Localmente (Recomendado)

1. **Pré-requisitos**: Certifique-se de ter o Node.js instalado (versão 16 ou superior)

2. **Instalar dependências**:
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. **Executar em modo de desenvolvimento**:
   ```bash
   npm run dev
   # ou
   pnpm run dev
   ```

4. **Abrir no navegador**: Acesse `http://localhost:5173`

### Opção 2: Build de Produção

1. **Gerar build**:
   ```bash
   npm run build
   # ou
   pnpm run build
   ```

2. **Servir arquivos estáticos**:
   ```bash
   npm run preview
   # ou
   pnpm run preview
   ```

## 📁 Estrutura do Projeto

```
site-11-meses/
├── public/                 # Arquivos públicos
├── src/
│   ├── assets/            # Imagens e recursos
│   ├── components/        # Componentes React
│   ├── App.jsx           # Componente principal
│   ├── App.css           # Estilos personalizados
│   ├── index.css         # Estilos globais
│   └── main.jsx          # Ponto de entrada
├── index.html            # HTML principal
├── package.json          # Dependências do projeto
└── README.md            # Este arquivo
```

## 🎨 Personalização

### Alterando o Texto Principal

Edite a variável `loveText` no arquivo `src/App.jsx`:

```javascript
const loveText = "Seu texto personalizado aqui..."
```

### Modificando Elementos Flutuantes

No arquivo `src/App.jsx`, encontre o array `emojis` e `stars` para adicionar ou remover elementos:

```javascript
const emojis = ['💕', '💖', '💗', '💝', '💘', '💞', '💓', '💟', '❤️', '🌟', '✨', '⭐']
const stars = ['✦', '✧', '✩', '✪'] // Estrelas de 4 pontas
```

### Ajustando Cores

As cores podem ser modificadas no arquivo `src/App.css` ou diretamente nas classes Tailwind no `src/App.jsx`.

## 🛠️ Tecnologias Utilizadas

- **React 18**: Framework JavaScript
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Framework de CSS utilitário
- **CSS3**: Animações e efeitos personalizados
- **JavaScript ES6+**: Lógica de interação

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🎯 Funcionalidades Especiais

### Elementos Flutuantes
- Movimento contínuo pela tela
- Rebote nas bordas
- Afastamento quando o mouse se aproxima (raio de 100px)
- Velocidade e direção aleatórias

### Animações
- Texto tipo máquina de escrever
- Contador animado
- Partículas de fundo
- Efeitos de hover nos cards
- Transições suaves

## 💡 Dicas

1. **Performance**: O site é otimizado para performance, mas em dispositivos mais antigos, você pode reduzir o número de elementos flutuantes editando o loop no `App.jsx`

2. **Personalização**: Todos os textos, cores e animações podem ser facilmente personalizados

3. **Deploy**: Para hospedar online, você pode usar serviços como Vercel, Netlify ou GitHub Pages

## 🐛 Solução de Problemas

### Site não carrega
- Verifique se o Node.js está instalado
- Execute `npm install` para instalar dependências
- Certifique-se de estar na pasta correta

### Elementos flutuantes não funcionam
- Verifique se o JavaScript está habilitado no navegador
- Teste em um navegador moderno (Chrome, Firefox, Safari, Edge)

### Layout quebrado no mobile
- Limpe o cache do navegador
- Teste em modo incógnito

## 📞 Suporte

Se encontrar algum problema ou quiser fazer modificações, os arquivos estão bem comentados e organizados para facilitar a edição.

---

Feito com 💕 para celebrar momentos especiais!

