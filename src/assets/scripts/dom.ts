import {getRandomColor} from "./functions";
import {addElementParameters, IApp} from "./interfaces";
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

export const getQuantityColors = (): number => {
    const input = document.querySelector('.colors-quantity') as HTMLInputElement ;
    if(input == null) return 1;
    return parseInt(input?.value);
}


export class App implements IApp {
    colorElements;
    quantityElements;
    allElements: ColorBlock[] = [];
    lockedElements: ColorBlock[] = [];
    unlockedElements: ColorBlock[] = [];
    constructor() {
        this.quantityElements = getQuantityColors() - this.lockedElements.length;
        this.init();
    }
    init() {
        for(let i = 0; i < this.quantityElements; i++) {
            this.createColorBlock(null, false);
        }
        this.keydownHandler();
    }
    createColorBlock(color = null, isLocked = false) {
        color = color ? color : getRandomColor();
        const colorBlock = new ColorBlock(color, isLocked);
        this.allElements.push(colorBlock);
        colorBlock.isLocked ? this.lockedElements.push(colorBlock) : this.unlockedElements.push(colorBlock);
    }
    refreshColors() {
        this.allElements.forEach(colorBlock => {
            if(!colorBlock.isLocked) colorBlock.updateColor();
        })
    }
    keydownHandler() {
        window.addEventListener('keydown', (e) => {
            e.preventDefault();
            if(e.code === 'Space') {
                this.refreshColors();
            }
        })
    }
}