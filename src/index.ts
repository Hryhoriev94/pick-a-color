import './assets/styles/_style.scss'
import {isDark} from "./assets/scripts/functions.ts";
import {generateColors, spaceHandler} from "./assets/scripts/dom";

spaceHandler();
generateColors()

isDark([0, 128, 255]);


