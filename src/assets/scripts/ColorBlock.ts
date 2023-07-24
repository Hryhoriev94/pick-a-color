import {hexColor, rgbColor} from "./types";
import {IColorBlock, IColorBlockClassNames} from "./interfaces";
import {getRandomColor, isDark, rgbToHex} from "./functions";
import {addElement} from "./dom";
import {App} from "./App";

export class ColorBlock implements IColorBlock {
    app: App;
    color: rgbColor;
    hexColor: hexColor;
    body: HTMLElement;
    rgbName: HTMLElement;
    hexName: HTMLElement;
    private _isLocked: boolean;
    colorNames: HTMLElement;
    lockButton: HTMLElement;
    icon: HTMLElement;
    classes: IColorBlockClassNames;

    constructor(color: rgbColor = getRandomColor(), isLocked: boolean, app: App) {
        this.app = app;
        this.color = color;
        this._isLocked = isLocked;
        this.init();
    }

    private getClasses(): IColorBlockClassNames {
        return {
            colorBlockClasses: [...this.getBodyClassNames()],
            colorNamesClasses: 'color-names',
            rgbNameClasses: 'color-name',
            hexNameClasses: 'color-name',
            iconClasses: this.getIconClasses(),
        };
    }

    init(): void {
        this.classes = this.getClasses();

        const {colorBlockClasses, colorNamesClasses, rgbNameClasses, hexNameClasses, iconClasses} = this.classes;

        this.body = addElement({parent: this.app.colorContainer, classNames: colorBlockClasses});
        this.colorNames = addElement({parent: this.body, classNames: colorNamesClasses});
        this.rgbName = addElement({parent: this.colorNames, tag: 'h2', content: `rgb(${this.color})`, classNames: rgbNameClasses});
        this.hexName = addElement({parent: this.colorNames, tag: 'h2', content: `${this.hexColor}`, classNames: hexNameClasses});
        this.lockButton = addElement({parent: this.body, tag: 'button'});
        this.icon = addElement({parent: this.lockButton, tag: 'i', classNames: iconClasses});

        this.body.style.backgroundColor = `rgb(${this.color})`;
        this.lockButton.addEventListener('click', this.toggleLockState);
        this.rgbName.addEventListener('click', () => this.copyColor(this.rgbName));
        this.hexName.addEventListener('click', () => this.copyColor(this.hexName));
    }

    private toggleLockState = (): void => {
        this.IsLocked = !this.IsLocked;
    }

    private setStylesAndClasses(): void {
        this.body.style.backgroundColor = `rgb(${this.color})`;
        this.body.className = '';
        this.body.classList.add(...this.getBodyClassNames());
    }

    private getBodyClassNames(): string[] {
        const classNames = ['color'];
        if (isDark(this.color)) {
            classNames.push('dark')
        }
        if (this.IsLocked) {
            classNames.push('color-locked')
        }
        return classNames;
    }

    private getIconClasses(): string[] {
        return this.IsLocked ? ['fa-solid', 'fa-lock'] : ['fa-solid', 'fa-lock-open']
    }

    updateLockState(): void {
        this.app.lockedElements = this.app.allElements.filter(colorBlock => colorBlock.IsLocked);
        this.app.unlockedElements = this.app.allElements.filter(colorBlock => !colorBlock.IsLocked);

        const colorBlockClasses = [...this.getBodyClassNames()]
        const iconClasses = this.getIconClasses();

        this.classes.colorBlockClasses = colorBlockClasses;
        this.classes.iconClasses = iconClasses;

        this.body.className = '';
        this.icon.className = '';

        this.body.classList.add(...colorBlockClasses);
        this.icon.classList.add(...iconClasses);
    }

    updateContent(element: HTMLElement, content: string | HTMLElement | rgbColor): void {
        if(typeof content === 'string') {
            element.innerHTML = content;
        } else if(content instanceof  HTMLElement) {
            element.children[0]?.remove();
            element.append(content);
        }
    }

    updateColor(color?: rgbColor): void {
        this.color = color ? color : getRandomColor();
        this.hexColor = rgbToHex(this.color);

        this.updateContent(this.rgbName, `rgb(${this.color})`);
        this.updateContent(this.hexName, this.hexColor);

        this.body.style.backgroundColor = `rgb(${this.color})`;
        this.setStylesAndClasses();
    }

    private copyColor(element: HTMLElement): Promise<void> {
        return navigator.clipboard.writeText(element.innerText);
    }

    remove(): void {
        if (this.IsLocked) {
            return;
        }

        this.body.remove();

        const index = this.app.allElements.indexOf(this);
        if (index > -1) {
            this.app.allElements.splice(index, 1);
        }

        const unlockedIndex = this.app.unlockedElements.indexOf(this);
        if (unlockedIndex > -1) {
            this.app.unlockedElements.splice(unlockedIndex, 1);
        }
    }

    set IsLocked(lockState: boolean) {
        this._isLocked = lockState;
        this.updateLockState();
        this.app.updateMinQuantity();
    }

    get IsLocked(): boolean {
        return this._isLocked;
    }
}