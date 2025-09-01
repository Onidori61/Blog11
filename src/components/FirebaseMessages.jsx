import { useState, useEffect } from 'react';
import { db } from '../firebase';

const FirebaseMessages = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mensagens padrão caso não haja mensagens no Firebase
  const defaultMessages = [
    "Cada momento contigo é um presente especial 💕",
    "Nosso amor cresce a cada dia que passa 🌸",
    "Você é minha pessoa favorita no mundo todo 💖",
    "Juntos somos mais fortes e mais felizes ✨",
    "Obrigado por fazer meus dias mais coloridos 🌈"
  ];

  useEffect(() => {
    if (db) {
      // Buscar mensagens do Firebase usando versão compat
      const messagesRef = db.collection('mensagens');
      const query = messagesRef.orderBy('timestamp', 'desc').limit(10);

      const unsubscribe = query.onSnapshot((querySnapshot) => {
        const firebaseMessages = [];
        querySnapshot.forEach((doc) => {
          firebaseMessages.push({
            id: doc.id,
            ...doc.data()
          });
        });

        // Se há mensagens no Firebase, usar elas; senão usar as padrão
        const messagesToUse = firebaseMessages.length > 0 
          ? firebaseMessages.map(msg => msg.texto || msg.message || msg.content)
          : defaultMessages;

        setMessages(messagesToUse);
        if (messagesToUse.length > 0) {
          setCurrentMessage(messagesToUse[0]);
        }
      }, (error) => {
        console.log('Erro ao buscar mensagens do Firebase, usando mensagens padrão:', error);
        // Em caso de erro, usar mensagens padrão
        setMessages(defaultMessages);
        setCurrentMessage(defaultMessages[0]);
      });

      return () => unsubscribe();
    } else {
      // Se Firebase não está disponível, usar mensagens padrão
      setMessages(defaultMessages);
      setCurrentMessage(defaultMessages[0]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      // Trocar mensagem a cada 5 segundos
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % messages.length;
          setCurrentMessage(messages[nextIndex]);
          return nextIndex;
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [messages]);

  return (
    <div className="text-center">
      <p className="text-xs text-pink-700 italic transition-all duration-500">
        {currentMessage}
      </p>
      <div className="text-lg mt-2">💖</div>
      {messages.length > 1 && (
        <div className="flex justify-center mt-2 gap-1">
          {messages.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-pink-500' : 'bg-pink-200'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FirebaseMessages;

