import { useEffect, useRef, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import './Routine.scss';
import { MdAccessTime } from 'react-icons/md';
import { GiHistogram } from 'react-icons/gi';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import Moment from 'react-moment';
import 'moment/locale/ko';

import moment from 'moment';
import { useSelector } from 'react-redux';

const Lilist = ({ routines, removeRoutine, editRoutine }) => {
  const today = new Date();
  const boldDay = today.getDay(); // 4

  const allDays = [
    { id: 0, day: '일' },
    { id: 1, day: '월' },
    { id: 2, day: '화' },
    { id: 3, day: '수' },
    { id: 4, day: '목' },
    { id: 5, day: '금' },
    { id: 6, day: '토' },
  ];
  const checkDay = allDays.filter(today => today.id === boldDay);

  const StyleDay = ({ days }) => {
    console.log(days);
    return days.map(day => {
      return checkDay[0].day === day ? (
        <span style={{ color: 'black' }}>{day}</span>
      ) : (
        <span>{day}</span>
      );
    });
  };
  const RoutineLi = ({ routine }) => {
    const [menuActive, setMenuState] = useState(false);
    const [formActive, setFormState] = useState(false);
    const [text, setTextState] = useState(routine.routine);

    const input = useRef();
    const iconBtn = useRef();
    const btns = useRef();

    const showBtns = () => {
      setMenuState(!menuActive);
      setFormState(false);
    };

    const showform = () => {
      setFormState(!formActive);
    };

    const onChange = e => {
      setTextState(e.target.value);
    };
    const onSubmit = e => {
      e.preventDefault();
    };

    return (
      <li className="Routine-list" key={routine.id}>
        <form className={formActive ? 'show' : ''} onSubmit={onSubmit}>
          <input type="text" value={text} name="modifyText" ref={input} onChange={onChange} />
          <button
            onClick={() => {
              editRoutine(routine.id, input.current.value);
            }}
          >
            수정완료
          </button>
        </form>
        <p className={!formActive ? 'show' : ''}>{routine.routine}</p>
        <time style={{ fontWeight: 'bold' }}>
          {routine.startTime} ~ {routine.endTime} <StyleDay days={routine.day} />
        </time>
        <div className={`Routine-btn ${menuActive ? 'show' : ''}`} ref={btns}>
          <button onClick={showform}>수정</button>
          <button
            onClick={() => {
              removeRoutine(routine.id);
            }}
          >
            삭제
          </button>
        </div>
        <button ref={iconBtn} onClick={showBtns}>
          <FiMoreHorizontal />
        </button>
      </li>
    );
  };

  return routines.map(routine => <RoutineLi routine={routine} />);
};
let timeId = time => {
  setTimeout(() => {
    console.log('알람입니다');
  }, time);
};

const today = new Date();
let hour = today.getHours();
const nowTime =
  hour > 6 && hour < 12
    ? '아침'
    : hour > 12 && hour < 18
    ? '오후'
    : hour > 18 && hour < 21
    ? '저녁'
    : '밤';

const messages = [
  `평온한 ${nowTime} 입니다  :)`,
  `어떤 ${nowTime}시간을 보내고 계신가요?`,
  '나른함을 깨워줄 음악을 들어보세요!',
  '루티너와 함께 일상을 변화시켜요!',
  '좋은 변화는 좋은 습관에서 시작해요!',
  '작은 좋은 습관이 큰 변화를 만듭니다.',
];

const randomItem = messages[Math.floor(Math.random() * messages.length)];

const Routine = ({ routines, getRoutine, onLogout, history, removeRoutine, editRoutine }) => {
  useEffect(() => {
    getRoutine();
  }, []);
  console.log(history);

  const logout = () => {
    onLogout();
    localStorage.removeItem('token');
  };
  const click = () => {
    history.push('/newroutine');
  };
  return (
    <div className="Routine">
      <div className="header">
        <time>
          <Moment interval={1000} format="M.DD (dd) hh:mm A" />
        </time>
        <h1>
          <p>{randomItem}</p>
        </h1>
        <div className="logoutbtn">
          <button onClick={logout}>로그아웃</button>
        </div>
      </div>
      <ul className="section">
        <Lilist routines={routines} removeRoutine={removeRoutine} editRoutine={editRoutine} />
      </ul>
      <div className="plus">
        <button onClick={click}>
          <BsPlus />
        </button>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <button>
              <MdAccessTime />
            </button>
          </li>
          <li>
            <button>
              <GiHistogram />
            </button>
          </li>
          <li>
            <button>
              <BsFillPersonFill />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Routine;
