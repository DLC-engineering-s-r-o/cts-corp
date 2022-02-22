import { initNav } from "./navigation";
import { initMap } from "./map";
import { initAboutBox } from "./animationsAboutBox";
import { initAboutNumbers } from "./animationsAboutNumber";

document.addEventListener("DOMContentLoaded", function () {
  initNav();
  initAboutBox();
  initAboutNumbers();
  initMap();
});
