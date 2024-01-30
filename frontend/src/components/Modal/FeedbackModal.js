import React, { useState } from "react";
import axios from "axios";

const FeedbackModal = (props) => {
  const [feedbackContent, setFeedback] = useState("");
  const userSeq = sessionStorage.getItem("userSeq");
  const [feedbackError, setFeedbackError] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);
  const modalOnOff = () => {
    setModalOpen(!ModalOpen);
  };

  const onChange = (e) => {
    setFeedback(e.currentTarget.value);
    setFeedbackError(""); // 입력 시 에러 메시지 초기화
  };
  // sendFeedback console 버전
  const sendFeedbackConsole = () => {
    console.log({ userSeq, feedbackContent });
    props.setFeedback(false);
  };

  // 피드백 내용을 가지고 axios 요청
  const sendFeedback = async (e) => {
    e.preventDefault();
    if (!feedbackContent.trim()) {
      // feedbackContent가 빈 문자열이거나 공백만 있는 경우
      setFeedbackError("뭐라도 써주세요ㅠㅠ"); // 에러 메시지 설정
      return; // 함수 실행 중단
    }
    try {
      await axios.post("http://localhost:5000/feedback", 
      { userSeq, feedbackContent }, 
      { withCredentials: true}
      );
      console.log({ userSeq, feedbackContent });
      props.setFeedback(false);
    } catch (error) {
      console.error("feedback 전송 실패", error);
    }
  };
  return (
    <>
      <div
        onClick={modalOnOff}
        className="min-w-100 min-h-96 absolute inset-0
    flex justify-center items-center"
      >
        <form
          onClick={(e) => e.stopPropagation()}
          className=" bg-formBG rounded-2xl border-2 border-modalBorder justify-center items-center p-2 flex flex-col"
        >
          <div className="text-center">
            <label>피드백</label>
            <div>
              <textarea
                placeholder="피드백을 입력해주세요!"
                className="m-1 px-2 
          border rounded-3xl bg-white"
                value={feedbackContent}
                onChange={onChange}
              />
              {feedbackError && <div className="text-red-500">{feedbackError}</div>}
            </div>
            <button onClick={sendFeedback} className="bg-formButton py-2 px-4 m-2 rounded">
              보내기
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FeedbackModal;
