import {hexColor, rgbColor} from "./types";
import {IColorBlock, IColorBlockClassNames} from "./interfaces";
import {isDark, rgbToHex} from "./functions";
import {addElement} from "./dom";

export class ColorBlock implements IColorBlock {
    color: rgbColor;
    hexColor: hexColor;
    body: HTMLElement;
    rgbName: HTMLElement;
    hexName: HTMLElement;
    isLocked: boolean;
    colorNames: HTMLElement;
    button: HTMLElement;
    icon: HTMLElement;

    classes: IColorBlockClassNames;

    constructor(color: rgbColor, isLocked: boolean) {
        this.color = color;
        this.hexColor = rgbToHex(this.color);
        this.isLocked = isLocked;
        this.classes = {
            colorBlockClasses: [...this.getBodyClassNames()],
            colorNames: 'color-names',
            rgbName: 'color-name',
            hexName: 'color-name',
            iconClasses: this.getIconClasses(),
        }
        this.init();
    }

    init():void {
        this.body = addElement({parent: document.querySelector('#colors'), classNames: this.classes.colorBlockClasses});
        this.colorNames = addElement({parent: this.body, classNames: this.classes.colorNames});
        this.rgbName = addElement({
            parent: this.colorNames,
            tag: 'h2',
            content: `rgb(${this.color})`,
            classNames: this.classes.rgbName
        });
        this.hexName = addElement({
            parent: this.colorNames,
            tag: 'h2',
            content: `${this.hexColor}`,
            classNames: this.classes.hexName
        });
        this.button = addElement({parent: this.body, tag: 'button'});
        this.icon = addElement({parent: this.button, tag: 'i', classNames: this.classes.iconClasses})

        this.body.style.backgroundColor = `rgb(${this.color})`;
        this.button.addEventListener('click', () => {
            this.isLocked = !this.isLocked;
            this.updateLockState();
        })
    }

    getBodyClassNames(): string[] {
        const classNames = ['color'];
        if (isDark(this.color)) {
            classNames.push('dark')
        }
        if (this.isLocked) {
            classNames.push('color-locked')
        }
        return classNames;
    }

    getIconClasses(): string[] {
        return this.isLocked ? ['fa-solid', 'fa-lock'] : ['fa-solid', 'fa-lock-open']
    }

    updateLockState():void {

        const colorBlockClasses = [...this.getBodyClassNames()]
        const iconClasses = this.getIconClasses();

        this.classes.colorBlockClasses = colorBlockClasses;
        this.classes.iconClasses = iconClasses;

        this.body.className = '';
        this.icon.className = '';

        this.body.classList.add(...colorBlockClasses);
        this.icon.classList.add(...iconClasses);
    }

}