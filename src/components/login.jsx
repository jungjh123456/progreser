import { useCallback, useRef } from 'react';
import './Login.scss';

export default function Login({ onLogin, history }) {
  const id = useRef();
  const pass = useRef();

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      onLogin(id.current.value, pass.current.value);
    },
    [onLogin],
  );
  const signupBtn = () => {
    history.push('/signup');
  };

  return (
    <div className="Login">
      <img src="./progreser.png" alt="logo-img" className="logo" />
      <form className="form" onSubmit={onSubmit}>
        <label className="id">
          아이디 <input type="text" placeholder="이메일을 입력해주세요" ref={id} />{' '}
        </label>
        <label className="pw">
          비밀번호 <input type="password" placeholder="비밀번호를 입력해주세요" ref={pass} />{' '}
        </label>
        <input type="submit" value="로그인" className="submitBtn" />
      </form>
      <div className="itemBox">
        <button onClick={signupBtn}>회원가입 하기</button>
        <button>비밀번호 찾기</button>
      </div>
    </div>
  );
}
