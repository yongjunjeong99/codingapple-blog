import { useState } from "react";
import "./App.css";

function App() {
  const [content, setContent] = useState([
    "남자 코트 추천",
    "강남 우동 맛집",
    "파이썬독학",
  ]);
  const [good, setGood] = useState([0, 0, 0]);
  const [title, setTitle] = useState(0);
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState("");
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let postDay = `${year}년${month}월${day}일`;
  const [newDate, setNewDate] = useState(postDay);
  const sortName = () => {
    const copy = [...content];
    copy.sort();
    setContent(copy);
  };
  const modalBtn = () => {
    setModal(modal === false ? true : false);
  };
  const onBtnHandler = () => {
    const copy = [...content];
    copy[0] = "여자 코트 추천";
    setContent(copy);
  };
  const onInputHandler = (event) => {
    setInput(event.target.value);
  };
  const onAddBtn = () => {
    if (input === "") {
      return;
    }
    const copy = [...content]; // 글발행추가
    copy.unshift(input);
    setContent(copy);
    const goodCopy = [...good]; // 좋아요 배열 추가(안하면 새로 생긴 글 좋아요는 NaN 발생)
    goodCopy.unshift(0);
    setGood(goodCopy);
    setInput("");
  };
  const onDeleteBtn = (i) => {
    const copy = [...content];
    copy.splice(i, 1);
    setContent(copy);
  };

  return (
    <div className="App">
      <div className="black-nav">
        <h4>React Blog</h4>
      </div>
      <button onClick={sortName}>가나다순 정렬버튼</button>
      <button
        onClick={() => {
          onBtnHandler();
        }}
      >
        반대
      </button>
      {content.map((el, i) => {
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                modalBtn();
                setTitle(i);
              }}
            >
              {content[i]}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  const goodCopy = [...good];
                  goodCopy[i] = goodCopy[i] + 1;
                  setGood(goodCopy);
                }}
              >
                👍
              </span>
              {good[i]}
            </h4>
            <p>{newDate}</p>
            <button onClick={onDeleteBtn}>삭제</button>
          </div>
        );
      })}
      {modal === true ? (
        <Modal title={title} btn={onBtnHandler} content={content}></Modal>
      ) : null}
      <input autoFocus value={input} onChange={onInputHandler}></input>
      <button onClick={onAddBtn}>글발행</button>
    </div>
  );
}

const Modal = (props) => {
  return (
    <div className="modal">
      <h4>{props.content[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={props.btn}>글수정</button>
    </div>
  );
};

export default App;
