import React, { useState, useEffect } from 'react';
import { words } from './words';

const WordTrainer = () => {
  const [currentWord, setCurrentWord] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [usedWords, setUsedWords] = useState([]);

  const getRandomWord = () => {
    let availableWords = words.filter(word => !usedWords.includes(word.word));
    
    if (availableWords.length === 0) {
      availableWords = words;
      setUsedWords([]);
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const selectedWord = availableWords[randomIndex];
    
    setCurrentWord(selectedWord);
    setShowTranslation(false);
    setUsedWords(prev => [...prev, selectedWord.word]);
  };

  useEffect(() => {
    getRandomWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowTranslation = () => {
    setShowTranslation(true);
  };

  const handleNextWord = () => {
    getRandomWord();
  };

  if (!currentWord) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Загрузка...</div>;
  }

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <header style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Тренажёр слов</h1>
        <p style={{ fontSize: '1.1rem' }}>Изучайте английские слова эффективно!</p>
      </header>

      <main style={{ 
        background: 'white', 
        borderRadius: '20px', 
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        marginBottom: '30px'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#666', textAlign: 'center' }}>Слово:</h2>
          <div style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            color: '#4a5568',
            margin: '20px 0',
            minHeight: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {currentWord.word}
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#666', textAlign: 'center' }}>Перевод:</h2>
          {showTranslation ? (
            <div style={{ 
              fontSize: '2.5rem', 
              textAlign: 'center', 
              color: '#2d3748',
              fontWeight: 'bold',
              margin: '20px 0',
              minHeight: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {currentWord.translation}
            </div>
          ) : (
            <div style={{ 
              fontSize: '2.5rem', 
              textAlign: 'center', 
              color: '#cbd5e0',
              fontStyle: 'italic',
              margin: '20px 0',
              minHeight: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              ???
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#718096', fontSize: '0.9rem' }}>
          Изучено слов: {usedWords.length} из {words.length}
        </div>
      </main>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {!showTranslation ? (
          <button 
            onClick={handleShowTranslation}
            style={{
              padding: '15px 40px',
              fontSize: '1.1rem',
              backgroundColor: '#48bb78',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >
            Показать перевод
          </button>
        ) : (
          <button 
            onClick={handleNextWord}
            style={{
              padding: '15px 40px',
              fontSize: '1.1rem',
              backgroundColor: '#4299e1',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >
            Следующее слово
          </button>
        )}
      </div>

      <footer style={{ textAlign: 'center', color: 'white', marginTop: '30px' }}></footer>
    </div>
  );
};

export default WordTrainer;