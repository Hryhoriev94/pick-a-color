import {addElementParameters,} from "./interfaces";

export const app: HTMLElement = document.querySelector('#app');

export const addElement = ({parent = app, classNames = null, tag = 'div', content = '', place = 'append'}: addElementParameters): HTMLElement => {
    const newElement = document.createElement(tag);

    if (classNames) {
        newElement.classList.add(...Array.isArray(classNames) ? classNames : [classNames]);
    }

    if (content) {
        newElement.innerHTML = typeof content === 'string' ? content : '';
        if (!(typeof content === 'string') && content instanceof HTMLElement) newElement.append(content);
    }

    const placementMethods = {
        'append': 'append',
        'prepend': 'prepend',
        'before': 'before',
        'after': 'after'
    };

    if (parent) {
        parent[placementMethods[place]](newElement);
    }

    return newElement;
}








