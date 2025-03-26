import { Router } from "./utils/Router.js";
import "./utils/Event.js";

window.addEventListener("hashchange", () => {
  Router.render();
});

Router.RouterType = "hash";
Router.render();
