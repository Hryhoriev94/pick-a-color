import {IApp} from "./interfaces";
import {ColorBlock} from "./ColorBlock";
import {debounce, getRandomColor} from "./functions";
import {rgbColor} from "./types";
import {addElement} from "./dom";

const variables = {
    gridSize: 1200
}


export class App implements IApp {
    colorContainer: HTMLElement;
    quantityElements;
    allElements: ColorBlock[] = [];
    lockedElements: ColorBlock[] = [];
    unlockedElements: ColorBlock[] = [];
    minQuantity: number;
    maxQuantity: number;
    currentQuantity: number;
    inputQuantity: HTMLInputElement;
    labelQuantity: HTMLElement;
    refreshButton: HTMLButtonElement;
    constructor() {

        this.inputQuantity = document.querySelector('#colors-quantity');
        this.minQuantity = this.lockedElements.length;
        this.currentQuantity = this.getQuantityColors();
        this.labelQuantity = document.querySelector('.quantity label');
        this.labelQuantity.innerText = this.currentQuantity.toString();
        this.lockedElements = [];
        this.unlockedElements = [];
        this.colorContainer = document.querySelector('#colors');
        this.refreshButton = document.querySelector('#all-refresh');
        this.init();
    }
    init() {
        window.addEventListener('resize', debounce(this.updateLayout, 100));
        let hash = window.location.hash.substr(1);
        if (hash) {
            let colorsString = atob(hash);
            let colors = JSON.parse(colorsString);
            this.createColorBlocks(colors);
        } else {
            this.createColorBlocks(this.currentQuantity);
        }
        this.keydownHandler();
        this.quantityInputHandler();
        this.updateHash();
        this.updateLayout();
    }
    createColorBlock(color = getRandomColor(), isLocked = false) {
        const colorBlock = new ColorBlock(color, isLocked, this);
        this.allElements.push(colorBlock);
        (isLocked ? this.lockedElements : this.unlockedElements).push(colorBlock);
    }
    createColorBlocks(colorsOrQuantity: number | rgbColor[]) {
        if (typeof colorsOrQuantity === 'number') {
            for (let i = 0; i < colorsOrQuantity; i++) {
                this.createColorBlock();
            }
        } else {
            colorsOrQuantity.forEach(color => {
                this.createColorBlock(color);
            });
        }
        this.splitIntoRows(this.colorContainer);
    }
    refreshColors() {
        this.allElements.forEach(colorBlock => this.allElements.forEach(colorBlock => !colorBlock.IsLocked && colorBlock.updateColor()))
        this.updateHash()
    }
    keydownHandler() {
        window.addEventListener('keydown', (e) => {
            e.preventDefault();
            if(e.code === 'Space') {
                this.refreshColors();
            }
        })
        this.refreshButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.refreshColors();
        })
    }
    getQuantityColors = (): number => {
        return parseInt(this.inputQuantity?.value);
    }
    quantityInputHandler() {
        this.inputQuantity.addEventListener('change', this.changeInputQuantity)

        this.inputQuantity.addEventListener('input', () => {
            const value = this.getQuantityColors();
            if (value < this.minQuantity) {
                this.inputQuantity.value = this.minQuantity.toString();
                this.refreshCurrentQuantity();
            }
        });
    }
    changeInputQuantity = () => {
        this.refreshCurrentQuantity();
        this.updateColorBlocks();
    }
    updateColorBlocks() {
        const diff = this.currentQuantity - this.allElements.length;
        if (diff > 0) {
            this.createColorBlocks(diff);
        } else if (diff < 0) {
            for (let i = 0; i < -diff; i++) {
                const colorBlock = this.unlockedElements.pop();
                if (colorBlock) {
                    colorBlock.remove();
                    this.allElements = this.allElements.filter(el => el !== colorBlock);
                }
            }
        }
        this.updateHash()
        this.splitIntoRows(this.colorContainer);
    }
    updateMinQuantity() {
        this.minQuantity = this.lockedElements.length;
        if(parseInt(this.inputQuantity.value) < this.minQuantity) this.inputQuantity.value = this.maxQuantity.toString();
        this.labelQuantity.innerText = this.getQuantityColors().toString();
        this.refreshCurrentQuantity();
    }
    refreshCurrentQuantity() {
        this.currentQuantity = this.getQuantityColors();
        this.labelQuantity.innerText = this.currentQuantity.toString();
        this.updateHash()
    }
    updateHash() {
        let colors = this.allElements.map(el => el.color);
        let colorsString = JSON.stringify(colors);
        let colorsHash = btoa(colorsString);
        window.history.pushState(null, "", `#${colorsHash}`);
    }
    splitIntoRows(container: HTMLElement) {
        let colorBlocks = Array.from(container.querySelectorAll('.color'));
        let rows = container.querySelectorAll('.grid-row');

        rows.forEach(row => {
            row.remove();
        });

        let totalColors = colorBlocks.length;
        let itemsPerRow;

        if (totalColors <= 7) {
            itemsPerRow = totalColors;
        } else if (totalColors <= 8) {
            itemsPerRow = Math.ceil(totalColors / 2);
        } else if (totalColors <= 9) {
            itemsPerRow = 3;
        } else {
            itemsPerRow = 5;
        }

        let numRows = Math.ceil(totalColors / itemsPerRow);

        for(let i = 0; i < numRows; i++){
            let row = addElement({
                parent: container,
                classNames: "grid-row",
            }) as HTMLElement;

            row.style.display = "grid";
            row.style.gridTemplateColumns = "repeat(auto-fit, minmax(100px, 1fr))";

            for(let j = 0; j < itemsPerRow; j++){
                let blockIndex = i * itemsPerRow + j;
                if(colorBlocks[blockIndex]){
                    row.appendChild(colorBlocks[blockIndex]);
                }
            }
        }
    }
    updateLayout = () => {
        if (window.innerWidth <= variables.gridSize) {
            this.destroyGrid();
        } else {
            this.createGrid();
        }
    }

    createGrid() {
        if (window.innerWidth > variables.gridSize) {
            this.splitIntoRows(this.colorContainer);
        }
    }

    destroyGrid() {
        let rows = Array.from(this.colorContainer.querySelectorAll('.grid-row'));

        rows.forEach(row => {
            let colorBlocks = Array.from(row.querySelectorAll('.color'));

            colorBlocks.forEach(block => {
                this.colorContainer.append(block);
            });

            row.remove();
        });
    }
}