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

// export const Router = {
//   //   RouterType: "basic",
//   render: () => {
//     const root = document.getElementById("root");
//     let path;
//     path = window.location.pathname;
//     console.log("path", path);

//     const Component = routes[path] || routes["*"];
//     root.innerHTML = Component();
//     console.log("root.inner", root.innerHTML);
//   },
// };

export const Router = {
  RouterType: "basic",
  render: () => {
    const root = document.getElementById("root");
    let path;
    if (Router.RouterType === "basic") {
      path = window.location.pathname;
    } else if (Router.RouterType === "hash") {
      path = window.location.hash.slice(1);
    }
    const Component = routes[path] || routes["*"];
    root.innerHTML = Component();
  },
};
