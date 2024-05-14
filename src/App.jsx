import { useEffect } from "react";
import { Chat, Detail, List } from "./components";
import Login from "./components/login/Login";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/UserStore";
import { useChatStore } from "./lib/CahtStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
      // console.log(user)
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
  // console.log(currentUser);
  if (isLoading) return <div className="loading">Loading...</div>;
  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Toaster />
    </div>
  );
};

export default App;
