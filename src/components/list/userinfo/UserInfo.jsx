import "./userInfo.css";
import { useUserStore } from "../../../lib/UserStore";

const UserInfo = () => {
  const { currentUser } = useUserStore();
console.log(currentUser.avatar)
  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar} alt="" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src="more.png" alt="" />
        <img src="video.png" alt="" />
        <img src="edit.png" alt="" />
      </div>
    </div>
  );
};

export default UserInfo;
