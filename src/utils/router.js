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
  RouterType: "main", // "hash"로 바꿔도 작동함

  render: () => {
    const root = document.getElementById("root");

    // Vite config의 base 값을 자동으로 불러옴
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, ""); // 끝 '/' 제거
    let path;

    if (Router.RouterType === "main") {
      // "/front_5th_chapter1-1/profile" → "/profile"
      path = window.location.pathname.replace(basePath, "") || "/";
    } else if (Router.RouterType === "hash") {
      path = window.location.hash.slice(1) || "/";
    }

    console.log("라우팅 path →", path);

    const Component = routes[path] || routes["*"];
    root.innerHTML = Component();
  },
};
