import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal from '../ModalPortal/Modal';
import MyModal from '../ModalPortal/MyModal/MyModal';
import userService from '../modules/services/AuthService';
import './Signup.scss';

export default function Signup({ onSign }) {
  const id = useRef();
  const pass = useRef();
  const repass = useRef();
  const name = useRef();
  const failid = useRef();
  const birthday = useRef();
  const formData = useRef();
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  console.log(visible);
  const [checked, setChecked] = useState({
    check: false,
    ok: false,
    email: false,
    pass: false,
  });
  const [btn, setBtn] = useState(false);

  const Submit = useCallback(
    e => {
      e.preventDefault();
      const obj = {};
      const formData = new FormData(e.target);
      for (let [key, value] of formData.entries()) {
        obj[key] = value;
      }
      console.log(obj);
      onSign(obj);
    },
    [onSign],
  );
  const click = async e => {
    e.preventDefault();
    show();
    const userId = await userService.getUser(id.current.value);
    console.log(id.current.value);
    console.log(checked);
    if (userId.length) {
      setChecked({ ...checked, check: true });
      id.current.style = 'border-color: red;';
    } else {
      setChecked({ ...checked, ok: true });
      id.current.style = 'border-color: blue;';
    }
    // console.log(checked);
  };
  const passChange = useCallback(() => {
    if (pass.current.value === repass.current.value) {
      setChecked({ ...checked, pass: false });
      repass.current.style = 'border-color: blue;';
      pass.current.style = 'border-color: blue;';
    } else {
      setChecked({ ...checked, pass: true });
      pass.current.style = 'border-color: red;';
      repass.current.style = 'border-color: red;';
    }
  }, [checked]);
  const isEmail = useCallback(asValue => {
    let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
  }, []);
  const emailChange = useCallback(() => {
    if (isEmail(id.current.value)) {
      setChecked({ ...checked, email: false });
    } else {
      setChecked({ ...checked, email: true });
    }
  }, [checked, isEmail]);

  const checkInput = () => {
    if (
      id.current.value !== '' &&
      pass.current.value !== '' &&
      repass.current.value !== '' &&
      name.current.value !== '' &&
      birthday.current.maxLength !== +birthday.current.value
    ) {
      setBtn(true);
    } else {
      setBtn(false);
    }
  };
  return (
    <div className="Signup">
      <h1>만나서 반가워요!</h1>
      <p>알찬 하루를 보낼 준비가 됐나요?</p>
      <form onSubmit={Submit} ref={formData} onChange={checkInput}>
        <div>
          <label htmlFor="user-id" ref={failid}>
            이메일 * <span>{checked.check && '아이디가 중복되었습니다.'}</span>
            <span
              style={{
                color: 'blue',
              }}
            >
              {checked.ok && '이 아이디를 사용할 수 있습니다.'}
            </span>
            <span>{checked.email && '이메일 형식이 아닙니다.'}</span>
          </label>
          <input type="email" onChange={emailChange} required name="user-id" ref={id} />
          {visible && (
            <Modal>
              <MyModal visible={visible} onClick={hide} />
            </Modal>
          )}
          <button onClick={click}>중복 확인</button>
        </div>
        <div>
          <label htmlFor="user-pass">비밀번호 *</label>
          <input type="password" required name="user-pass" ref={pass} />
        </div>
        <div>
          <label htmlFor="user-repass">비밀번호 *</label>
          <input type="password" required name="user-repass" onChange={passChange} ref={repass} />
          <span className="user-pass">{checked.pass && '비밀번호가 다릅니다.'}</span>
        </div>
        <div>
          <label htmlFor="user-name">이름 *</label>
          <input type="text" required name="user-name" ref={name} />
        </div>
        <div>
          <label>성별</label>
          <ul className="gender-list">
            <li>남</li>
            <li>녀</li>
          </ul>
        </div>
        <div>
          <label htmlFor="user-birth">생년월일</label>
          <input
            type="text"
            maxLength="6"
            placeholder="ex)950812"
            required
            ref={birthday}
            name="user-birth"
          />
        </div>
        <div class="check-div">
          <input type="checkbox" name="user-ok" />
          <span>마이루틴의 이용약관과 개인정 취급방식에 동의합니다.</span>
        </div>
        {btn ? (
          <button
            type="submit"
            style={{
              cursor: 'pointer',
            }}
          >
            하루 관리 시작하기
          </button>
        ) : (
          <button
            type="submit"
            disabled
            style={{
              cursor: 'not-allowed',
            }}
          >
            하루 관리 시작하기
          </button>
        )}
      </form>
    </div>
  );
}
