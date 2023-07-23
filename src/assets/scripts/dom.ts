import {getRandomColor, isDark, rgbToHex} from "./functions";
import {Content, classNames, rgbColor, hexColor} from './types'
import {addElementParameters, colorBlockClassNames} from "./interfaces";
import {ColorBlock} from "./ColorBlock";

export const app: HTMLElement = document.querySelector('#app');

export const addElement = ({parent = app, classNames = null, tag = 'div',  content = '', place = 'append'} : addElementParameters) : HTMLElement => {
    const newElement = document.createElement(tag);
    if (classNames) {
        if (typeof classNames === 'string') {
            newElement.classList.add(classNames);
        } else if(Array.isArray(classNames)) {
            newElement.classList.add(...classNames)
        }
    }
    if(content) {
        if(typeof content === 'string') {
            newElement.innerHTML = content;
        } else {
            newElement.append(content)
        }
    }
    switch (place) {
        case 'append' :
            parent.append(newElement);
            break;
        case 'prepend' :
            parent.prepend(newElement);
            break;
        case 'before' :
            parent.before(newElement);
            break;
        case 'after' :
            parent.after(newElement);
            break;
    }
    return newElement;
}

export const createColorBlock = (color = null, isLocked = false) => {
    color = color ? color : getRandomColor();

    const colorBlock = new ColorBlock(color, isLocked);

    return colorBlock;
}

export const getQuantityColors = (): number => {
    const input = document.querySelector('.colors-quantity') as HTMLInputElement ;
    if(input == null) return 1;
    return parseInt(input?.value);
}

export const generateColors = (init = true) => {
    const lockedColors:NodeList = getLockedColors();
    const unlockedColors:NodeList = getUnlockedColors();

    const quantity = getQuantityColors() - lockedColors.length;

    unlockedColors.forEach(unlockedColor => (unlockedColor as Element).remove());

    for(let i = 0; i < quantity; i++) {
        createColorBlock()
    }
}

export const getAllColorsBlocks = (): NodeList => {
    return document.querySelectorAll('#colors .color');
}

export const getLockedColors = ():NodeList => {
    return document.querySelectorAll('#colors .color-locked');
}

export const getUnlockedColors = () : NodeList => {
    return document.querySelectorAll('#colors .color:not(.color-locked)');
}

export const spaceHandler = () => {
    window.addEventListener('keydown', (e) => {
        if(e.code === 'Space') generateColors();
    })
    return;
}

