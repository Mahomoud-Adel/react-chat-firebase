import { useState } from "react";
import "./login.css";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, storage } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
  const [form, setForm] = useState("login");
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const handleForm = () => {
    if (form == "login") {
      setForm("signup");
    } else {
      setForm("login");
    }
  };
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });
      toast.success("Acount created! You can login now!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login">
      <h1>{form == "login" ? "Welcome Back..." : "Create a new Account..."}</h1>
      <form onSubmit={form == "login" ? handleLoginSubmit : handleSignUpSubmit}>
        {form == "signup" && (
          <>
            <label style={{ textAlign: "center" }} htmlFor="file">
              <img
                src={avatar.url || "./avatar.png"}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
                alt=""
              />
              <p>Uploud an image</p>
            </label>
            <input type="file" id="file" hidden onChange={handleAvatar} />
            <input type="text" name="username" placeholder="username" />
          </>
        )}
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button disabled={loading} type="submit">
          {form == "login"
            ? loading
              ? "Loading..."
              : "Login"
            : loading
            ? "Loading..."
            : "Sign Up"}
        </button>
        {form == "login" ? (
          <p>
            You have an Account <span onClick={handleForm}>Login</span>
          </p>
        ) : (
          <p>
            Don't have an Account <span onClick={handleForm}>Sign Up</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
