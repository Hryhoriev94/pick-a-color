import {classNames, Content} from "./types";


export interface IColorBlockClassNames {
    colorBlockClasses: classNames,
    colorNames: classNames,
    rgbName: classNames,
    hexName: classNames,
    iconClasses: classNames
}

export interface IApp {
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

export interface IColorBlock {
    body: HTMLElement;
    rgbName: HTMLElement;
    hexName: HTMLElement;
    isLocked: boolean;
    colorNames: HTMLElement;
    button: HTMLElement;
    icon: HTMLElement;
    classes: IColorBlockClassNames;

    init(): void;
    getBodyClassNames(): string[];
    updateLockState(): void
}