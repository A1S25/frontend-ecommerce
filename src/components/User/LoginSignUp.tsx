import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";


const LoginSignUp = (history:any, location:any) => {
    const dispatch = useDispatch();
    const { error, loading, isAuthenticated } = useSelector( (state:any) => state.user );

    const loginTab = useRef(document.createElement("div"));
    const registerTab = useRef(document.createElement("div"));
    const switcherTab = useRef(document.createElement("div"));

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({ name: "", email: "", password: "", });
    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const { name, email, password } = user;

    const loginSubmit = (e:any) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };

    const registerSubmit = (e:any) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    };

    const registerDataChange = (e:any) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
                if (typeof reader.result === 'string') {
              setAvatarPreview(reader.result );
              setAvatar(reader.result);
                }
            }
          };

          reader.readAsDataURL(e.target.files[0]);
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    useEffect(() => {
       if (error) {
        if (typeof alert === 'string') {
          alert.error(error);
        };
          dispatch(clearErrors());
        }

        //if (isAuthenticated) {
        //   history.push(redirect);
        //}
    }, [dispatch, error, alert, history, isAuthenticated, redirect]);

    const switchTabs = (e:any, tab:any) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };  


    return(
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div>
                        <div className="login_signUp_toggle">
                            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>

                    <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail"> <MailOutlineIcon />
                            <input type="email" placeholder="Email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                        </div>
                        <div className="loginPassword"> <LockOpenIcon />
                            <input type="password" placeholder="Password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        </div>
                        <Link to="/password/forgot">Forget Password ?</Link>
                        <input type="submit" value="Login" className="loginBtn" />
                    </form>

                    <form className="signUpForm" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
                        <div className="signUpName"> <FaceIcon />
                            <input type="text" placeholder="Name" required name="name" value={name} onChange={registerDataChange} />
                        </div>
                        <div className="signUpEmail"> <MailOutlineIcon />
                            <input type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange} />
                        </div>
                        <div className="signUpPassword"> <LockOpenIcon />
                            <input type="password" placeholder="Password" required name="password" value={password} onChange={registerDataChange} />
                        </div>
                        <div id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input type="file" name="avatar" accept="image/*" onChange={registerDataChange} />
                        </div>
                        <input type="submit" value="Register" className="signUpBtn" />
                    </form>
                </div>
            </div>
        </Fragment>
        )}
    </Fragment>
    );
};

export default LoginSignUp;