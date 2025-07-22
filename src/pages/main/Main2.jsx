import React, { useState, useRef, useEffect } from 'react';
import '../../styles/main.scss';

import fartImg from '../../assets/images/fart_farting.png';
import fart_standingImg from '../../assets/images/fart_standing.png';
import coughImg from '../../assets/images/cough.png';
import cough_standing from '../../assets/images/cough_stand.png';
import { ReactComponent as FartWind } from '../../assets/images/fart_wind2.svg';
import { ReactComponent as CaughSound } from '../../assets/images/caugh_sound.svg';
import StartScreen from './components/StartScreen';
import BlackScreen from './components/BlackScreen';

import generateId from '../../utils/generateId';
import bitSound from '../../assets/audio/background_bits.mp3';
import sneezeSound from '../../assets/audio/sneeze.mp3';
import failSound from '../../assets/audio/fail_effect.mp3';
import successSound from '../../assets/audio/success_effect.mp3';

import { useBGMStore } from '../../store/backgroundSound';
import { useSearchParams } from 'react-router-dom';
import { Howl } from 'howler';

// 원하는 테스트 시작 시간 (초 단위로 자유롭게 바꾸세요)
const TEST_START_TIME_SEC = 56;

const emojiTimings = [5.0, 6.0, 7.0, 8.0, 9.0, 10.0];
const clickTimings = [1.5, 3.0, 4.25, 6.0];

const zoomSequence = [
  [0, '1'],
  [3.4, '2'],
  [29.3, '3'],
  [37.1, 'left1'],
  [38.8, 'right1'],
  [40.7, 'left1'],
  [42.5, 'right1'],
  [44.3, 'left1'],
  [46.1, 'right1'],
  [48.0, 'left1'],
  [49.9, 'right1'],
  [51.8, 'left1'],
  [53.7, 'right1'],
  [55.5, 'left1'],
  [57.2, 'right1'],
  [59.2, '2'],
  [59.5, 'min0'],
  [59.7, 'min1'],
  [59.9, 'min2'],
  [60.9, 'min3'],
  [61.3, 'min4'],
  [61.6, 'min5'],
];

const Main2 = () => {
  const [zoomState, setZoomState] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCoughClicked, setIsCoughClicked] = useState(false);
  const [isFartClicked, setIsFartClicked] = useState(false);
  const [sendList, setSendList] = useState([]);
  const [isBackground, setIsBackground] = useState(true);
  const [isBlackScreen, setIsBlackScreen] = useState(true);
  const [isStart, setIsStart] = useState(false);

  const searchParams = useSearchParams()[0];
  const setSearchParams = useSearchParams()[1];
  const play = searchParams.get('play');

  const queueRef = useRef([]);
  const queueRef2 = useRef([]);
  const timerRefs = useRef([]);
  const audioRef = useRef(null);
  const startTimeRef = useRef(null);
  const isProcessingRef = useRef(false);
  const isProcessingRef2 = useRef(false);

  const pauseBackgroundSound = useBGMStore(state => state.pause);
  const setAudio = useBGMStore(state => state.setAudio);

  const successEffect = new Howl({ src: [successSound] });
  const failEffect = new Howl({ src: [failSound] });

  const handleCoughClick = () => setIsCoughClicked(prev => !prev);
  const handleFartClick = () => setIsFartClicked(prev => !prev);

  const processQueue = () => {
    if (isProcessingRef.current || queueRef.current.length === 0) return;
    isProcessingRef.current = true;
    queueRef.current.shift()();
    setTimeout(() => {
      isProcessingRef.current = false;
      processQueue();
    }, 150);
  };

  const processQueue2 = () => {
    if (isProcessingRef2.current || queueRef2.current.length === 0) return;
    isProcessingRef2.current = true;
    queueRef2.current.shift()();
    setTimeout(() => {
      isProcessingRef2.current = false;
      processQueue2();
    }, 150);
  };

  useEffect(() => {
    if (isStart) {
      const handleKeyDown = (e) => {
        if (e.code === 'Space') {
          const now = performance.now();
          const elapsed = (now - startTimeRef.current) / 1000;
          const targetTime = clickTimings[currentIndex];
          const diff = Math.abs(elapsed - targetTime);
          if (diff <= 0.15) {
            successEffect.play();
            setCurrentIndex((i) => i + 1);
          } else {
            failEffect.play();
          }
          queueRef.current.push(() => {
            setIsFartClicked(true);
            setTimeout(() => setIsFartClicked(false), 150);
          });
          processQueue();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isStart, currentIndex]);

  useEffect(() => {
    if (currentIndex >= clickTimings.length || !startTimeRef.current) return;
    const now = performance.now();
    const delay = clickTimings[currentIndex] * 1000 - (now - startTimeRef.current);
    const timeout = setTimeout(() => {
      failEffect.play();
      setCurrentIndex((i) => i + 1);
    }, delay + 150);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  useEffect(() => {
    if (sendList.length === 0) return;
    const lastEmoji = sendList[sendList.length - 1];
    const timeout = setTimeout(() => {
      setSendList((prev) => prev.filter((e) => e.id !== lastEmoji.id));
    }, 1500);
    return () => clearTimeout(timeout);
  }, [sendList]);

  useEffect(() => {
    if (play === 'true') {
      setTimeout(() => {
        setIsBackground(false);
        pauseBackgroundSound();
        setTimeout(() => {
          setIsBlackScreen(false);
          setIsStart(true);
          searchParams.set('play', 'false');
          setSearchParams(searchParams);
        }, 1000);
      }, 3000);
    }
  }, [play]);

  useEffect(() => {
    if (!isStart) return;

    const audio = new Audio(bitSound);
    audio.currentTime = TEST_START_TIME_SEC;

    audio.onplay = () => {
      startTimeRef.current = performance.now() - TEST_START_TIME_SEC * 1000;

      emojiTimings
        .filter(t => t >= TEST_START_TIME_SEC)
        .forEach(timeInSec => {
          const timeout = setTimeout(() => {
            const effect = new Howl({ src: [sneezeSound] });
            effect.play();
            queueRef2.current.push(() => {
              setIsCoughClicked(true);
              setTimeout(() => setIsCoughClicked(false), 150);
            });
            processQueue2();
            setSendList((prev) => [...prev, { id: generateId() }]);
          }, (timeInSec - TEST_START_TIME_SEC) * 1000);
          timerRefs.current.push(timeout);
        });

      zoomSequence
        .filter(([time]) => time >= TEST_START_TIME_SEC)
        .forEach(([delaySec, state]) => {
          const timeout = setTimeout(() => setZoomState(state), (delaySec - TEST_START_TIME_SEC) * 1000);
          timerRefs.current.push(timeout);
        });
    };

    audio.play().catch(err => console.warn('autoplay blocked', err));
    setAudio(audio);

    return () => {
      timerRefs.current.forEach(clearTimeout);
    };
  }, [isStart]);

  return (
    <>
      <StartScreen 
        isBackground={isBackground}
        onClick={() => {
          if (play !== 'true' && isBackground) {
            searchParams.set('play', 'true');
            setSearchParams(searchParams);
          }
        }}
      />
      <BlackScreen isBlackScreen={isBlackScreen} />
      <div className="viewport">
        <div className={`comic-board zoom-${zoomState}`}>
          <div className="row top-row">
            <div className="container" />
            <div style={{ position: 'absolute', left: 493, width: 15, height: '100%', backgroundColor: '#f1f3df', zIndex: 10 }} />
            {sendList.map(data => (
              <CaughSound key={data.id} className="caugh-sound fly-left2right" />
            ))}
            <div className="panel">
              <img
                className="bottom-left-image"
                src={isCoughClicked ? coughImg : cough_standing}
                alt="Cough Character"
              />
              {isCoughClicked && (
                <div style={{ fontFamily: 'BMkkubulimTTF-Regular', color: 'blue', position: 'absolute', left: 180, bottom: 120 }}>
                  <p style={{ margin: 0 }}>에</p>
                  <p style={{ margin: 0 }}>취</p>
                </div>
              )}
            </div>
            <div className="panel">
              <img
                className="bottom-right-image"
                src={isFartClicked ? fartImg : fart_standingImg}
                alt="Fart Character"
              />
              {isFartClicked && (
                <FartWind
                  style={{ position: 'absolute', right: 200, bottom: 45, height: 100, width: 100 }}
                />
              )}
            </div>
          </div>
          <div className="row bottom-row">
            <div className="panel" />
            <div className="panel" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main2;
