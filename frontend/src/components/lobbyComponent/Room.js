import { useNavigate } from "react-router-dom";
import DontEnter from "../Modal/DontEnter";
import { useState } from "react";
// 개별 방
const Room = (props) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleRoomClick = () => {
    if (props.isLocked) {
      setShowModal(true); // 잠금 방 클릭 시 모달 표시
    } else {
      navigate(`/room/${props.sessionId}`); // 잠금되지 않은 방 클릭 시 이동
    }
  };

  return (
    <div className="px-2">
      {props.isPlaying === false ? (
        <div onClick={handleRoomClick} className="h-full m-4 p-4 border rounded-3xl bg-formButton">
          <div className="flex justify-start items-center space-x-2">
            <p>{props.isLocked === null ? "안잠금" : "잠금"}</p>
            <h4>{props.roomTitle}</h4>
          </div>
          <p>Wait</p>
          <div className="">
            <p>{props.gameType === 100 ? "고요 속의 외침" : "인물 맞추기"}</p>
            <p>
              {props.numberOfPeople}/{props.totalNumberOfPeople}
            </p>
          </div>
        </div>
      ) : (
        <div onClick={handleRoomClick} className="m-4 px-4 border rounded-3xl bg-white">
          <div className="flex justify-start items-center space-x-2">
            <p>{props.isLocked === null ? "안잠금" : "잠금"}</p>
            <h4>{props.roomTitle}</h4>
          </div>
          <p>Play</p>
          <div className="">
            <p>{props.gameType === 100 ? "고요 속의 외침" : "인물 맞추기"}</p>
            <p>
              {props.numberOfPeople}/{props.totalNumberOfPeople}
            </p>
          </div>
          {showModal && <DontEnter onClose={() => setShowModal(false)} />}
        </div>
      )}
    </div>
  );
};

export default Room;