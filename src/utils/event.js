import { Router } from "./router";
import store from "../store";

window.addEventListener("popstate", () => {
  //url이 바뀔때마다 popstate 이벤트로 URL 변경 감지
  Router.render();
});

document.addEventListener("click", (e) => {
  if (e.target.id === "profile") {
    console.log("profile클릭!!");
    window.history.pushState(null, "", "/profile");
    Router.render("/profile");
  } else if (e.target.id === "logout") {
    console.log("로그아웃");
    // localStorage.removeItem('user')
    store.deleteState();
    history.pushState(null, "", "/");
    Router.render("/");
  } else if (e.target.id === "login") {
    console.log("로그인");
    window.history.pushState(null, "", "/login");
    Router.render("/login");
  } else if (e.target.id === "home") {
    console.log("홈");
    window.history.pushState(null, "", "/");
    Router.render("/");
  }
  // Router.render();
});

document.addEventListener("submit", (e) => {
  if (e.target.id === "login-form") {
    e.preventDefault();

    const username = document.getElementById("username").value;

    store.setState({
      username,
      email: "",
      bio: "",
    });

    console.log("로그인 제출");
    if (store.state.username !== "") {
      history.pushState(null, "", "/profile");
      Router.render("/profile");
    }
  } else if (e.target.id === "profile-form") {
    e.preventDefault();
    console.log("프로필 제출");
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;
    console.log("username", username),
      console.log("email", email),
      console.log("bio", bio);

    store.setState({
      username,
      email,
      bio,
    });
    console.log("store", store.state);
    // localStorage.setItem('user', JSON.stringify({
    //     username,
    //     email,
    //     bio
    // }))
  }
});
