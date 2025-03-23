import postData from "./postData";

const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  // console.log("user", user);
  return user ? true : false;
};

function render() {
  const path = window.location.pathname;
  const root = document.getElementById("root");
  if (!root) return;
  console.log("root:", root);
  if (path === "/") {
    root.innerHTML = MainPage();
  } else if (path === "/profile") {
    //여길 들어간다면 user 정보 확인
    if (!isLoggedIn()) {
      history.pushState(null, "", "/login");
      render();
      return;
    }
    console.log(JSON.parse(localStorage.getItem("profile") || "{}"));
    root.innerHTML = ProfilePage();
  } else if (path === "/login") {
    root.innerHTML = LoginPage();
  } else {
    root.innerHTML = ErrorPage();
  }
}

const isHome = () => {
  const isHome = window.location.pathname === "/";
  return isHome ? true : false;
};

const isProfile = () => {
  const isProfile = window.location.pathname === "/profile";

  return isProfile ? true : false;
};
// const isLogin = window.location.pathname === "/login";

const Nav = () => `
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

const MainPage = () => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Nav()}
      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>

        <div class="space-y-4">

          ${postData.map(Post).join("")}
         
        </div>
      </main>

      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    </div>
  </div>
`;

const Post = (post) => `
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex items-center mb-2">
      <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
      <div>
        <p class="font-bold">${post.username}</p>
        <p class="text-sm text-gray-500">${post.createdAt}</p>
      </div>
    </div>
    <p>${post.content}</p>
    <div class="mt-2 flex justify-between text-gray-500">
      <button>좋아요</button>
      <button>댓글</button>
      <button>공유</button>
    </div>
  </div>
`;

const LoginPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input id="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input id="userPw" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
      </div>
      <hr class="my-6">
      <div class="text-center">
        <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
      </div>
    </div>
  </main>
`;

const ProfilePage = () => {
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log("profile", profile);

  console.log("user", user);
  console.log(
    'document.getElementById("username").value:',
    document.getElementById("username"),
  );
  return `
    <div id="root">
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
        ${Nav()}
          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
              <form id="profile-submit">
                <div class="mb-4">
                  <label
                    for="username"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >사용자 이름</label
                  >
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="사용자 이름"
                    value="${profile.username || user.username || ""}"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="email"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >이메일</label
                  >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value=${profile.email || "aaa"}
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="bio"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >자기소개</label
                  >
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    class="w-full p-2 border rounded"
                  >
${profile.bio || "aaa"}</textarea
                  >
                </div>
                <button
                  type="submit"
                  class="w-full bg-blue-600 text-white p-2 rounded font-bold"
                >
                  프로필 업데이트
                </button>
              </form>
            </div>
          </main>

          <footer class="bg-gray-200 p-4 text-center">
            <p>&copy; 2024 항해플러스. All rights reserved.</p>
          </footer>
        </div>
      </div>
  </div>
  `;
};

const ErrorPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
      <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
      <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
      <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <p class="text-gray-600 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
        홈으로 돌아가기
      </a>
    </div>
  </main>
`;

// document.body.innerHTML = `
//   ${MainPage()}
//   ${ProfilePage()}
//   ${window.location.pathname == '/login' ? LoginPage() : null}
//   ${ErrorPage()}
// `;

window.addEventListener("popstate", render);
document.addEventListener("DOMContentLoaded", render);

document.addEventListener("submit", (e) => {
  if (e.target.id == "login-form") {
    e.preventDefault();
    //없으면 새로고침됨.
    console.log("로그인 시도");
    const id = document.getElementById("username");
    // const password = document.getElementById("userPw");

    localStorage.setItem(
      "user",
      JSON.stringify({
        username: id.value,
        // password: password.value,
        email: "",
        bio: "",
      }),
    );

    const user = localStorage.getItem("user");

    if (user !== null) {
      console.log("로그인 성공");
      history.pushState(null, "", "/");
      render();
    } else {
      console.log("로그인 실패");
      render();
    }
  }
});

document.addEventListener("click", (e) => {
  if (e.target.id === "logout") {
    console.log("로그아웃");
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    // history.go(0);
    history.pushState(null, "", "/login");
    render();
  }
  if (e.target.id === "login") {
    console.log("로그인 페이지 이동");
    history.pushState(null, "", "/login");
    render();
  }
  if (e.target.id === "profile") {
    console.log("profile 페이지 이동");
    history.pushState(null, "", "/profile");
    console.log("window.location.pathname:", window.location.pathname);
    render();
  }
  if (e.target.id === "home") {
    console.log("home 페이지 이동");
    history.pushState(null, "", "/");
    console.log("window.location.pathname:", window.location.pathname);
    render();
  }
});

document.addEventListener("submit", (e) => {
  console.log("e", e);
  if (e.target.id == "profile-submit") {
    e.preventDefault();
    //없으면 새로고침됨.
    console.log("프로필 시도");

    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const bio = document.getElementById("bio");

    localStorage.setItem(
      "profile",
      JSON.stringify({
        username: username.value,
        email: email.value,
        bio: bio.value,
      }),
    );

    console.log("localStorage", localStorage.getItem("profile"));
  }
});
