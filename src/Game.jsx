import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import './Game.css';
import normalImage from './images/normal.png';
import oddImage from './images/odd.png';

const timeLimits = [24, 18, 10, 4, 1];

const Game = ({ onGameOver = () => {} }) => {
  const [stage, setStage] = useState(1);
  const [gridSize, setGridSize] = useState(2);
  const [timeLeft, setTimeLeft] = useState(timeLimits[0]);
  const [oddIndex, setOddIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalCallback, setModalCallback] = useState(() => () => {});

  // 단계 초기화
  useEffect(() => {
    const size = stage + 1;
    setGridSize(size);
    setTimeLeft(timeLimits[stage - 1]);
    setOddIndex(Math.floor(Math.random() * size * size));
  }, [stage]);

  // 타이머 및 프로그레스바 업데이트
  useEffect(() => {
    if (modalOpen) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          showModal('⏰ 시간 초과', '시간이 초과되었습니다.', onGameOver);
          return 0;
        }
        return prev - 1;
      });
    }, 500);
    return () => clearInterval(timer);
  }, [stage, modalOpen]);

  const showModal = (title, message, callback) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalCallback(() => callback);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    modalCallback();
  };

  const handleCardClick = (idx) => {
    if (idx === oddIndex) {
      if (stage === 5) {
        showModal('🎉 클리어!', '모든 스테이지를 완료했습니다.', onGameOver);
      } else {
        showModal('✅ 정답!', `스테이지 ${stage + 1}로 이동합니다.`, () => setStage(stage + 1));
      }
    } else {
      showModal('❌ 오답!', '틀렸습니다.', onGameOver);
    }
  };

  const progressPercent = Math.max((timeLeft / timeLimits[stage - 1]) * 100, 0);

  return (
    <div>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="game-header">
        스테이지 {stage} / 5 | 남은 시간: {timeLeft/2}s
      </div>
      <div
        className="game-grid"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, i) => (
          <img
            key={i}
            src={i === oddIndex ? oddImage : normalImage}
            alt="card"
            className="card-image"
            onClick={() => handleCardClick(i)}
          />
        ))}
      </div>
      <Modal
        isOpen={modalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={handleClose}
      />
    </div>
  );
};

export default Game;