import MainPage from "../pages/MainPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";

const routes = {
  "/login": LoginPage,
  "/": MainPage,
  "/profile": ProfilePage,
  "*": ErrorPage,
};

export const Router = {
  RouterType: "main",
  render: () => {
    console.log("window.location.pathname", window.location.pathname);
    console.log("window.location.hash 해쉬값인가요?", window.location.hash);
    const root = document.getElementById("root");
    let path;
    if (Router.RouterType === "main") {
      // if(window.location.hash == '') {
      path = window.location.pathname;
      if (window.location.pathname.includes("index.hash.html")) {
        console.log("dadas");
        path = "/";
      }
    } else if (Router.RouterType === "hash") {
      // } else if (window.location.hash !== '') {
      path = window.location.hash.slice(1);
      console.log("hahs일때 Component 그리기 위한 path값은?", path);
    }
    const Component = routes[path] || routes["*"];
    root.innerHTML = Component();
  },
};
