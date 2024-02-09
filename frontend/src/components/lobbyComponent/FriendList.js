import React, { useEffect,useCallback } from "react";
import useFriends from "../../hooks/useFriends";
import UseFriendsStore from "../../store/UseFriendsStore";
import useLobbyApiCall from "../../api/useLobbyApiCall";

const FriendList = () => {
  const { friendRefs } = useFriends();
  const { friends, setFriends } = UseFriendsStore();
  const { rejectFriends, listFriends } = useLobbyApiCall();

  // 친구 목록 갱신을 위한 함수 정의
  const updateFriendsList = useCallback(async () => {
    const friendsList = await listFriends();
    setFriends(friendsList);
  }, [listFriends, setFriends]);

  useEffect(() => {
    friendRefs.current = friends.map((_, i) => friendRefs.current[i] || React.createRef());
  }, [friends]);

  // 요청 상태가 아닌 친구들의 리스트만 불러옴
  const acceptedFriends = friends.filter(friend => friend.friendsState === true);

  return (
    <div className="p-[16px] overflow-y-scroll h-full scroll-smooth">
      <div className="w-1/2">
        {acceptedFriends.map((friend, i) => (
          <div
            className="ml-[12px] mb-[4px] text-l"
            ref={(el) => (friendRefs.current[i] = el)}
            key={i}
          >
            {friend.userNickname}
            {/* 친구 삭제 기능 드롭다운으로든 버튼으로든 디자인 필요 */}
            <button class="ml-2" onClick={async () => {
              if (window.confirm("삭제하시겠습니까")) {
                await rejectFriends(friend.friendsId);
                updateFriendsList()
              }
            }}>
                 x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
