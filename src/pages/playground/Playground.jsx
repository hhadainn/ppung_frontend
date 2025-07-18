import React, { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import clickSound from '../../assets/audio/click.mp3'; // 경로 주의
import CheckIcon from '@mui/icons-material/Check';
const rhythmPattern = [0, 500, 1000]; // 리듬 간격
const PREVIEW_DELAY = 3000;

export default function Playground() {
  const [phase, setPhase] = useState('start'); // start → preview → countdown → play
  const [judgements, setJudgements] = useState([]);
  const [countdown, setCountdown] = useState(3);
  const expectedTimesRef = useRef([]);
  const inputTimesRef = useRef([]);
  const startTimeRef = useRef(null);
  const click = useRef(null);

  const handleStart = () => {
    click.current = new Howl({ src: [clickSound] });
    setPhase('preview');

    // 1단계: 리듬 안내
    rhythmPattern.forEach((time) => {
      setTimeout(() => click.current.play(), time);
    });

    // 2단계: 카운트다운 시작 (1초마다 감소)
    setTimeout(() => {
      setPhase('countdown');
      let count = 3;
      setCountdown(count);

      const countdownInterval = setInterval(() => {
        count -= 1;
        if (count === 0) {
          clearInterval(countdownInterval);
          setCountdown('Start!');
          setTimeout(() => {
            startPlay();
          }, 1000); // Start! 보여준 후 1초 후 재생
        } else {
          setCountdown(count);
        }
      }, 1000);
    }, PREVIEW_DELAY);
  };

  const startPlay = () => {
    setPhase('play');
    startTimeRef.current = performance.now();
    expectedTimesRef.current = rhythmPattern.map((t) => startTimeRef.current + t);

    rhythmPattern.forEach((time) => {
      setTimeout(() => click.current.play(), time);
    });
  };

  // 스페이스바 입력
  useEffect(() => {
    const onKeyDown = (e) => {
      if (phase !== 'play') return;
      if (e.code === 'Space') {
        const now = performance.now();
        inputTimesRef.current.push(now);
        const judgment = checkTiming(now);
        setJudgements((prev) => [...prev, judgment]);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase]);

  const checkTiming = (inputTime) => {
    const expected = expectedTimesRef.current;
    for (let i = 0; i < expected.length; i++) {
      if (expected[i] === null) continue;
      const diff = Math.abs(expected[i] - inputTime);
      if (diff <= 100) {
        expected[i] = null;
        return 'Perfect';
      } else if (diff <= 250) {
        expected[i] = null;
        return 'Good';
      }
    }
    return 'Miss';
  };

  return (
    <div style={styles.container}>
      {phase === 'start' && (
        <button style={styles.button} onClick={handleStart}>
          ▶ 게임 시작
        </button>
      )}
      {phase === 'preview' && <h2>👂 리듬을 듣고 기억하세요!</h2>}
      {phase === 'countdown' && (
        <div style={styles.countdown}>{countdown}</div>
      )}
      {phase === 'play' && <h2>🎵 리듬에 맞춰 스페이스바를 누르세요!</h2>}

      <div style={styles.judgementBox}>
        {judgements.map((j, i) => (
          <span key={i} style={{ marginRight: '10px' }}>{j}</span>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '80px',
    fontFamily: 'sans-serif',
  },
  button: {
    fontSize: '20px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  countdown: {
    fontSize: '80px',
    fontWeight: 'bold',
    margin: '40px 0',
    animation: 'pop 0.3s ease',
  },
  judgementBox: {
    marginTop: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
};
