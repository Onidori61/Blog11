import { useState, useEffect, useRef } from 'react'
import './App.css'
import FirebaseMessages from './components/FirebaseMessages'

// Componente para elementos flutuantes
const FloatingElement = ({ type, initialX, initialY, id }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [velocity, setVelocity] = useState({ 
    x: (Math.random() - 0.5) * 1.5, 
    y: (Math.random() - 0.5) * 1.5 
  })
  const [rotation, setRotation] = useState(0)
  const elementRef = useRef(null)
  const elementSize = 50

  // Definir o conteúdo baseado no tipo
  const getElementContent = () => {
    switch(type) {
      case 'hello-kitty':
        return <img src="/hello-kitty.png" alt="Hello Kitty" className="w-8 h-8 md:w-10 md:h-10" />
      case 'kuromi':
        return <img src="/kuromi.png" alt="Kuromi" className="w-8 h-8 md:w-10 md:h-10" />
      case 'cute-character':
        return <img src="/cute-character.png" alt="Cute Character" className="w-8 h-8 md:w-10 md:h-10" />
      case 'sparkle1':
        return <span className="text-pink-300 text-lg md:text-xl animate-pulse">₊</span>
      case 'sparkle2':
        return <span className="text-pink-400 text-lg md:text-xl animate-pulse">✧</span>
      case 'sparkle3':
        return <span className="text-pink-200 text-lg md:text-xl animate-pulse">✦</span>
      case 'sparkle4':
        return <span className="text-pink-300 text-lg md:text-xl animate-pulse">˳</span>
      case 'sparkle5':
        return <span className="text-pink-400 text-lg md:text-xl animate-pulse">·</span>
      case 'sparkle6':
        return <span className="text-pink-200 text-lg md:text-xl animate-pulse">˖</span>
      case 'sparkle7':
        return <span className="text-pink-300 text-lg md:text-xl animate-pulse">✶</span>
      case 'sparkle8':
        return <span className="text-pink-400 text-lg md:text-xl animate-pulse">⋆</span>
      default:
        return <span className="text-pink-300 text-lg md:text-xl animate-pulse">✧</span>
    }
  }

  useEffect(() => {
    const moveElement = () => {
      setPosition(prev => {
        let newX = prev.x + velocity.x
        let newY = prev.y + velocity.y

        // Rebatimento nas bordas da tela
        if (newX <= 0) {
          newX = 0
          setVelocity(v => ({ ...v, x: Math.abs(v.x) })) // Inverte para positivo
        } else if (newX >= window.innerWidth - elementSize) {
          newX = window.innerWidth - elementSize
          setVelocity(v => ({ ...v, x: -Math.abs(v.x) })) // Inverte para negativo
        }

        if (newY <= 0) {
          newY = 0
          setVelocity(v => ({ ...v, y: Math.abs(v.y) })) // Inverte para positivo
        } else if (newY >= window.innerHeight - elementSize) {
          newY = window.innerHeight - elementSize
          setVelocity(v => ({ ...v, y: -Math.abs(v.y) })) // Inverte para negativo
        }

        return { x: newX, y: newY }
      })
    }

    const interval = setInterval(moveElement, 50)
    return () => clearInterval(interval)
  }, [velocity])

  // Rotação lenta para imagens
  useEffect(() => {
    if (['hello-kitty', 'kuromi', 'cute-character'].includes(type)) {
      const rotateInterval = setInterval(() => {
        setRotation(prev => (prev + 0.5) % 360) // Rotação muito lenta
      }, 100)
      return () => clearInterval(rotateInterval)
    }
  }, [type])

  const handleMouseMove = (e) => {
    if (!elementRef.current) return

    const rect = elementRef.current.getBoundingClientRect()
    const elementCenterX = rect.left + rect.width / 2
    const elementCenterY = rect.top + rect.height / 2
    
    const distance = Math.sqrt(
      Math.pow(e.clientX - elementCenterX, 2) + 
      Math.pow(e.clientY - elementCenterY, 2)
    )

    // Desvio suave do mouse (raio de influência menor e força reduzida)
    if (distance < 80) {
      const angle = Math.atan2(elementCenterY - e.clientY, elementCenterX - e.clientX)
      const force = Math.max(0, 80 - distance) / 40 // Força muito reduzida
      
      setVelocity(prev => {
        const maxSpeed = 3 // Velocidade máxima limitada
        const newVelX = prev.x + Math.cos(angle) * force * 0.2
        const newVelY = prev.y + Math.sin(angle) * force * 0.2
        
        return {
          x: Math.max(-maxSpeed, Math.min(maxSpeed, newVelX)),
          y: Math.max(-maxSpeed, Math.min(maxSpeed, newVelY))
        }
      })
    }
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const isImage = ['hello-kitty', 'kuromi', 'cute-character'].includes(type)

  return (
    <div
      ref={elementRef}
      className="fixed pointer-events-none select-none z-10 transition-all duration-100"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isImage ? `rotate(${rotation}deg)` : 'none',
        filter: isImage 
          ? 'drop-shadow(0 0 12px rgba(255, 192, 203, 0.8)) drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))'
          : 'drop-shadow(0 0 8px rgba(255, 192, 203, 0.6))'
      }}
    >
      {getElementContent()}
    </div>
  )
}

// Componente para animação de texto tipo máquina de escrever
const TypewriterText = ({ text, speed = 80 }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse text-pink-500">|</span>
    </span>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isMobile, setIsMobile] = useState(false)
  const [floatingElements] = useState(() => {
    const elements = []
    const characters = ['hello-kitty', 'kuromi', 'cute-character']
    const sparkles = ['sparkle1', 'sparkle2', 'sparkle3', 'sparkle4', 'sparkle5', 'sparkle6', 'sparkle7', 'sparkle8']
    
    // Reduzir elementos em mobile
    const elementCount = window.innerWidth < 768 ? 8 : 12
    
    for (let i = 0; i < elementCount; i++) {
      // Misturar personagens e brilhos (mais brilhos que personagens)
      let type
      if (i < 3) {
        // Primeiros 3 elementos são personagens
        type = characters[i % characters.length]
      } else {
        // Resto são brilhos
        type = sparkles[Math.floor(Math.random() * sparkles.length)]
      }
      
      elements.push({
        id: i,
        type: type,
        initialX: Math.random() * (window.innerWidth - 50),
        initialY: Math.random() * (window.innerHeight - 50)
      })
    }
    return elements
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const renderContent = () => {
    switch(currentPage) {
      case 'home':
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="kawaii-card">
              <div className="flex items-center gap-2 mb-4 flex-wrap justify-center">
                <span className="text-xl md:text-2xl">🌸</span>
                <h2 className="text-lg md:text-xl font-bold text-pink-700 text-center">Bem-vinda ao nosso cantinho</h2>
                <span className="text-xl md:text-2xl">🌸</span>
              </div>
              <div className="text-gray-700 leading-relaxed text-sm md:text-base">
                <TypewriterText 
                  text="Eu ainda não terminei de escrever o que quero aqui, volte em um mês (sim, isso vai virar o site de um ano kakakakak" 
                  speed={60}
                />
              </div>
            </div>
            
            <div className="kawaii-card">
              <h3 className="text-base md:text-lg font-bold text-pink-700 mb-3">11 Meses de Amor</h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">Ainda vou escrever algo kakaka</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="text-center p-3 bg-pink-50 rounded-lg border-2 border-pink-200">
                  <div className="text-xl md:text-2xl mb-1">💝</div>
                  <div className="text-sm font-medium text-pink-700">Em construção</div>
                  <div className="text-xs text-pink-500">Em construção</div>
                </div>
                <div className="text-center p-3 bg-pink-50 rounded-lg border-2 border-pink-200">
                  <div className="text-xl md:text-2xl mb-1">🌟</div>
                  <div className="text-sm font-medium text-pink-700">Em construção</div>
                  <div className="text-xs text-pink-500">Em construção</div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'momentos':
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="kawaii-card">
              <h2 className="text-lg md:text-xl font-bold text-pink-700 mb-4">💕 Nossos Momentos Especiais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="moment-card">
                  <div className="text-2xl md:text-3xl mb-2">💝</div>
                  <h3 className="font-bold text-pink-700 text-sm md:text-base">Primeiro Encontro</h3>
                  <p className="text-xs md:text-sm text-gray-600">Em construção.</p>
                </div>
                <div className="moment-card">
                  <div className="text-2xl md:text-3xl mb-2">🌟</div>
                  <h3 className="font-bold text-pink-700 text-sm md:text-base">Primeira Viagem</h3>
                  <p className="text-xs md:text-sm text-gray-600">Em construção.</p>
                </div>
                <div className="moment-card">
                  <div className="text-2xl md:text-3xl mb-2">💕</div>
                  <h3 className="font-bold text-pink-700 text-sm md:text-base">Primeiro "Eu te amo"</h3>
                  <p className="text-xs md:text-sm text-gray-600">Em construção.</p>
                </div>
                <div className="moment-card">
                  <div className="text-2xl md:text-3xl mb-2">🎂</div>
                  <h3 className="font-bold text-pink-700 text-sm md:text-base">Aniversários Juntos</h3>
                  <p className="text-xs md:text-sm text-gray-600">Em construção.</p>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'timeline':
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="kawaii-card">
              <h2 className="text-lg md:text-xl font-bold text-pink-700 mb-4">📅 Nossa Timeline</h2>
              <div className="space-y-3 md:space-y-4">
                <div className="timeline-item">
                  <div className="timeline-marker">1</div>
                  <div>
                    <h3 className="font-bold text-pink-700 text-sm md:text-base">Mês 1-2: Descobrindo um ao outro</h3>
                    <p className="text-xs md:text-sm text-gray-600">Primeiros encontros, conversas até tarde e eu já estava querendo me casar kakaka.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker">3</div>
                  <div>
                    <h3 className="font-bold text-pink-700 text-sm md:text-base">Mês 3-5: Construindo nossa conexão</h3>
                    <p className="text-xs md:text-sm text-gray-600">a gente já foi criando confiança um no outro.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker">6</div>
                  <div>
                    <h3 className="font-bold text-pink-700 text-sm md:text-base">Mês 6-8: Aprofundando o amor</h3>
                    <p className="text-xs md:text-sm text-gray-600">A gente começou a ter mais personalidade no nosso namoro, nem parece que demorou tanto assim para a gente ser idiota juntos</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker">11</div>
                  <div>
                    <h3 className="font-bold text-pink-700 text-sm md:text-base">Mês 9-11: Amor cada vez mais forte</h3>
                    <p className="text-xs md:text-sm text-gray-600">E aqui estamos, é até estranho, eu não esperava ter alguém que eu sou tão apaixonado ao ponto de que se precisasse, eu me sacrificaria.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'sobre':
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="kawaii-card">
              <h2 className="text-lg md:text-xl font-bold text-pink-700 mb-4">💑 Sobre Nós</h2>
              <div className="space-y-3 md:space-y-4">
                <div className="bg-pink-50 p-3 md:p-4 rounded-lg border-2 border-pink-200">
                  <h3 className="font-bold text-pink-700 mb-2 text-sm md:text-base">Nossa História</h3>
                  <p className="text-gray-600 text-xs md:text-sm">
                    Em construção
                  </p>
                </div>
                <div className="bg-pink-50 p-3 md:p-4 rounded-lg border-2 border-pink-200">
                  <h3 className="font-bold text-pink-700 mb-2 text-sm md:text-base">Em construção</h3>
                  <p className="text-gray-600 text-xs md:text-sm">
                    Em construção
                  </p>
                </div>
                <div className="bg-pink-50 p-3 md:p-4 rounded-lg border-2 border-pink-200">
                  <h3 className="font-bold text-pink-700 mb-2 text-sm md:text-base">Em construção</h3>
                  <p className="text-gray-600 text-xs md:text-sm">
                    Em construção
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  if (isMobile) {
    // Layout mobile: coluna única com navegação em tabs
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100">
        {/* Elementos flutuantes */}
        {floatingElements.map(element => (
          <FloatingElement
            key={element.id}
            type={element.type}
            initialX={element.initialX}
            initialY={element.initialY}
            id={element.id}
          />
        ))}

        {/* Header mobile */}
        <div className="bg-pink-200 border-b-4 border-pink-300 p-4 text-center">
          <h1 className="text-lg font-bold text-pink-800">💕 Nosso Blog</h1>
        </div>

        {/* Navegação mobile */}
        <div className="bg-pink-200 border-b-4 border-pink-300 p-2">
          <div className="flex justify-around gap-1">
            <button
              onClick={() => setCurrentPage('home')}
              className={`mobile-nav-button ${currentPage === 'home' ? 'active' : ''}`}
            >
              <span className="text-sm">🏠</span>
              <span className="text-xs">Home</span>
            </button>
            
            <button
              onClick={() => setCurrentPage('momentos')}
              className={`mobile-nav-button ${currentPage === 'momentos' ? 'active' : ''}`}
            >
              <span className="text-sm">💝</span>
              <span className="text-xs">Momentos</span>
            </button>
            
            <button
              onClick={() => setCurrentPage('timeline')}
              className={`mobile-nav-button ${currentPage === 'timeline' ? 'active' : ''}`}
            >
              <span className="text-sm">📅</span>
              <span className="text-xs">Timeline</span>
            </button>
            
            <button
              onClick={() => setCurrentPage('sobre')}
              className={`mobile-nav-button ${currentPage === 'sobre' ? 'active' : ''}`}
            >
              <span className="text-sm">💑</span>
              <span className="text-xs">Sobre</span>
            </button>
          </div>
        </div>

        {/* Conteúdo mobile */}
        <div className="p-4">
          {renderContent()}
        </div>

        {/* Widget contador mobile */}
        <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm border-3 border-pink-300 rounded-2xl p-3 shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">11</div>
            <div className="text-xs text-pink-700 font-medium">meses</div>
          </div>
        </div>
      </div>
    )
  }

  // Layout desktop: 3 colunas
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100">
      {/* Elementos flutuantes */}
      {floatingElements.map(element => (
        <FloatingElement
          key={element.id}
          type={element.type}
          initialX={element.initialX}
          initialY={element.initialY}
          id={element.id}
        />
      ))}

      {/* Layout de 3 colunas */}
      <div className="flex min-h-screen">
        {/* Sidebar Esquerda */}
        <div className="w-48 bg-pink-200 border-r-4 border-pink-300 p-4 space-y-3">
          <div className="text-center mb-6">
            <h1 className="text-lg font-bold text-pink-800">💕 Nosso Blog</h1>
          </div>
          
          <button
            onClick={() => setCurrentPage('home')}
            className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
          >
            <span className="text-lg">🏠</span> Home
          </button>
          
          <button
            onClick={() => setCurrentPage('momentos')}
            className={`nav-button ${currentPage === 'momentos' ? 'active' : ''}`}
          >
            <span className="text-lg">💝</span> Momentos
          </button>
          
          <button
            onClick={() => setCurrentPage('timeline')}
            className={`nav-button ${currentPage === 'timeline' ? 'active' : ''}`}
          >
            <span className="text-lg">📅</span> Timeline
          </button>
          
          <button
            onClick={() => setCurrentPage('sobre')}
            className={`nav-button ${currentPage === 'sobre' ? 'active' : ''}`}
          >
            <span className="text-lg">💑</span> Sobre Nós
          </button>
        </div>

        {/* Área Central */}
        <div className="flex-1 p-6 max-w-4xl">
          {renderContent()}
        </div>

        {/* Sidebar Direita */}
        <div className="w-64 bg-pink-200 border-l-4 border-pink-300 p-4 space-y-4">
          {/* Widget Recommended */}
          <div className="widget">
            <h3 className="widget-title">Recommended</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span>💕</span>
                <span className="text-pink-700">Meus favoritos</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>💖</span>
                <span className="text-pink-700">Nosso primeiro beijo</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>🌟</span>
                <span className="text-pink-700">Jantar romântico</span>
              </div>
            </div>
          </div>

          {/* Widget Quick Links */}
          <div className="widget">
            <h3 className="widget-title">Quick Links</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span>🌸</span>
                <span className="text-pink-700">Cores</span>
                <span>🌸</span>
              </div>
              <div className="flex justify-center gap-2 mt-2">
                <div className="w-4 h-4 bg-pink-300 rounded-full border border-pink-400"></div>
                <div className="w-4 h-4 bg-pink-400 rounded-full border border-pink-500"></div>
                <div className="w-4 h-4 bg-pink-500 rounded-full border border-pink-600"></div>
              </div>
            </div>
          </div>

          {/* Widget Contador */}
          <div className="widget">
            <h3 className="widget-title">Contador</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">11</div>
              <div className="text-sm text-pink-700 font-medium">meses juntos</div>
              <div className="text-xs text-pink-500 mt-1">E contando... 💕</div>
            </div>
          </div>

          {/* Widget Extra */}
          <div className="widget">
            <h3 className="widget-title">💌 Mensagem</h3>
            <FirebaseMessages />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

