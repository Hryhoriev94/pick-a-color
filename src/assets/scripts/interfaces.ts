import {classNames, Content} from "./types";


export interface colorBlockClassNames {
    colorBlockClasses: classNames,
    colorNames: classNames,
    rgbName: classNames,
    hexName: classNames,
    iconClasses: classNames
}

export interface App {
    colorElements: [],
    quantityElements: [],
    allElements: [],
    lockedElements: [],
    unlockedElements: []
}

export interface addElementParameters {
    parent?: HTMLElement,
    tag?: string,
    content?: Content,
    classNames?: classNames,
    place?: 'append' | 'prepend' | 'before' | 'after'
}