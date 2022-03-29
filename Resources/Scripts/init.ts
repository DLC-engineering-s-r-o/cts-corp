import { initNav } from "./navigation"
import { initMap } from "./map"
import { initAnim } from "./boxAnim"
import { setCurentYear } from "./year"
import { initEmail } from "./email"

document.addEventListener("DOMContentLoaded", function () {
  initNav()
  initAnim()
  initMap()
  setCurentYear()
  initEmail()
})
