import { initNav } from "./navigation";
import { initMap } from "./map";
import { initAnim } from "./boxAnim";

document.addEventListener("DOMContentLoaded", function () {
  initNav();
  initAnim();
  initMap();
});
