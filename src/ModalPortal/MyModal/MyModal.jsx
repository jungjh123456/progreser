import React, { useState } from 'react';
import Modalloaders from './components/Modalloaders';
import './MyModal.scss';

const MyModal = props => {
  console.log(props);

  const visible = () => {
    props.onClick();
  };
  return (
    <div className="modal">
      <div>
        <Modalloaders />
        <span>아이디가 중복 되었습니다.</span>
        <button onClick={visible}>닫기</button>
      </div>
    </div>
  );
};

export default MyModal;
