import isLoggedIn from "../utils/Islogin";

const Nav = () => {
  const isHome = () => {
    const isHome = window.location.pathname === "/";
    return isHome ? true : false;
  };
  const isProfile = () => {
    const isProfile = window.location.pathname === "/profile";
    return isProfile ? true : false;
  };

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
<h1 class="text-2xl font-bold">항해플러스</h1>
</header>
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="#" id="home" class=${isHome() ? "text-blue-600" : "text-gray-600"}>홈</a></li>
      ${isLoggedIn() ? `<li><a href="#" id="profile" class=${isProfile() ? "text-blue-600" : "text-gray-600"}>프로필</a></li>` : ``}
      ${
        isLoggedIn()
          ? `<li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>`
          : `<li><a href="#" id="login" class="text-gray-600">로그인</a></li>`
      }
    </ul>
  </nav>
    `;
};

export default Nav;
