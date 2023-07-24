import {classNames, Content} from "./types";
import {ColorBlock} from "./ColorBlock";


export interface IColorBlockClassNames {
    lockButtonClasses?: classNames,
    colorBlockClasses: classNames,
    colorNamesClasses: classNames,
    rgbNameClasses: classNames,
    hexNameClasses: classNames,
    iconClasses: classNames
}

export interface IApp {
    colorContainer: HTMLElement,
    quantityElements: [],
    allElements: ColorBlock[],
    lockedElements: ColorBlock[],
    unlockedElements: ColorBlock[],
    refreshButton: HTMLButtonElement,
    refreshColors(): void;
}

export interface addElementParameters {
    parent?: HTMLElement | null,
    tag?: string,
    content?: Content,
    classNames?: classNames,
    place?: 'append' | 'prepend' | 'before' | 'after'
}

export interface IColorBlock {
    body: HTMLElement;
    rgbName: HTMLElement;
    hexName: HTMLElement;
    colorNames: HTMLElement;
    lockButton: HTMLElement;
    icon: HTMLElement;
    classes: IColorBlockClassNames;

    init(): void;
    updateLockState(): void;
}