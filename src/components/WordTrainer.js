import React, { useState, useEffect } from 'react';
import { words } from './words';
import './WordTrainer.css';

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
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="word-trainer">
      <header className="header">
        <h1>Тренажёр слов</h1>
      </header>

      <main className="main-content">
        <div className="word-card">
          <div className="word-section">
            <h2>Слово:</h2>
            <div className="word-display">
              {currentWord.word}
            </div>
          </div>

          <div className="translation-section">
            <h2>Перевод:</h2>
            {showTranslation ? (
              <div className="translation-display show">
                {currentWord.translation}
              </div>
            ) : (
              <div className="translation-display hidden">
                ???
              </div>
            )}
          </div>

          <div className="progress">
            Изучено слов: {usedWords.length} из {words.length}
          </div>
        </div>

        <div className="controls">
          {!showTranslation ? (
            <button 
              className="btn btn-primary"
              onClick={handleShowTranslation}
            >
              Показать перевод
            </button>
          ) : (
            <button 
              className="btn btn-secondary"
              onClick={handleNextWord}
            >
              Следующее слово
            </button>
          )}
        </div>
      </main>

      <footer className="footer"></footer>
    </div>
  );
};

export default WordTrainer;