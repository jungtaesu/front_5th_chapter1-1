import { Router } from "./router";
import store from "../store";

window.addEventListener("popstate", () => {
  //url이 바뀔때마다 popstate 이벤트로 URL 변경 감지

  Router.render();
});

// window.addEventListener('hashchange', (e) => {
//   e.preventDefault();

//   if(window.location.hash === ''){
//     return;
//   }
//   console.log('window.location.hash: hash 뒤에값 변경되었다!!!', window.location.hash)
//   const path = window.location.hash.slice(1);
//   Router.RouterType = 'hash';
//   Router.render(window.location.hash);
//   console.log('path', path)
// })

document.addEventListener("click", (e) => {
  if (
    e.target.id === "profile" ||
    e.target.id === "logout" ||
    e.target.id === "login" ||
    e.target.id === "home"
  ) {
    e.preventDefault();
    if (e.target.textContent === "로그아웃") {
      localStorage.removeItem("user");
      if (Router.RouterType === "hash") {
        window.location.hash = "/login";
      } else {
        window.history.pushState({}, "", "/login");
      }
      Router.render();
      return;
    }
    console.log("e.target.href", e.target.href);
    const path = e.target.href.split("/").pop();
    console.log("path", path);

    if (Router.RouterType === "hash") {
      window.location.hash = path ? "/" + path : "/";
      console.log("window.location.hash", window.location.hash);
    } else {
      window.history.pushState({}, "", path ? "/" + path : "/");
    }
    Router.render();
  }
});

// document.addEventListener("click", (e) => {

//   if (e.target.id === "profile") {
//     console.log("profile클릭!!");

//     if (Router.RouterType === "hash") {
//       window.location.hash = "/login";
//     } else {
//       window.history.replaceState({}, "", "/login");
//     }
//     Router.render();
//     return;

//     // window.history.pushState(null, "", "/profile");
//     // Router.render("/profile");

//   } else if (e.target.id === "logout") {
//     console.log("로그아웃");
//     store.deleteState();
//     //@@@@로그 아웃했으면 홈으로 가는게 c1에서 안걸림.
//     //@@@@c2에서는 login으로 가야 통과함 SPA기본기능 로그인과 로그아웃
//     // history.pushState(null, "", "/login");
//     // Router.render("/login");

//   if (Router.RouterType === "hash") {
//         window.location.hash = "/login";
//       } else {
//         window.history.replaceState({}, "", "/login");
//       }
//       Router.render();
//       return;

//   } else if (e.target.id === "login") {
//     console.log("로그인");

//     if (Router.RouterType === "hash") {
//       window.location.hash = "/login";
//     } else {
//       window.history.replaceState({}, "", "/login");
//     }
//     Router.render();
//     return;

//     // window.history.pushState(null, "", "/login");
//     // Router.render("/login");

//   } else if (e.target.id === "home") {
//     console.log("홈");

//     if (Router.RouterType === "hash") {
//       window.location.hash = "/login";
//     } else {
//       window.history.replaceState({}, "", "/login");
//     }
//     Router.render();
//     return;

//     // window.history.pushState(null, "", "/");
//     // Router.render("/");
//   }

// });

document.addEventListener("submit", (e) => {
  if (e.target.id === "login-form") {
    e.preventDefault();

    const username = document.getElementById("username").value;

    store.setState({
      username,
      email: "",
      bio: "",
    });

    if (username !== "") {
      history.pushState(null, "", "/profile");
      Router.render("/profile");
      // ❯ 5. 상태 관리 구현 (1)
      //× 로그인 상태에 따라 UI가 변경된다
      //여기서 프로필 화면 간건데 로그인 페이지를 받았다고 나온다
    }
  } else if (e.target.id === "profile-form") {
    e.preventDefault();
    console.log("프로필 제출");
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;

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
