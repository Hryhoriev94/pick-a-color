import {hexColor, rgbColor} from "./types";


export const padZero = (str: string): string => {
    return str.length < 2 ? '0' + str : str;
}

export const getRandomNumber = (min:number, max:number):number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomShade = ():number => {
    return getRandomNumber(0, 255);
}

export const getRandomColor = ():rgbColor => {
    return [randomShade(), randomShade(), randomShade()];
}

export const toHex = (number:number):hexColor => {
    return number.toString(16).toUpperCase();

}

export const rgbToHex = (rgb: number[]): hexColor => {
    return '#'+rgb.reduce((acc, currentValue) => acc + padZero(toHex(currentValue)),'');
}



export const hexToRGB = (hexString):rgbColor => {
    hexString = hexString.replace('#', '');
    const rgbArray = hexString.split('').reduce((acc, char, index) => {
        if(index % 2 === 0) {
            acc.push(hexString.slice(index, index + 2))
        }
        return acc
    }, [])
    return rgbArray.map((shade) => parseInt(shade, 16))
}



export const isDark = (color: number[] | string):boolean => {
    // use YIQ formula
    if(typeof color === 'string') {
        color = hexToRGB(color);
    }

    const r = color[0];
    const g = color[1];
    const b = color[2];

    let y = Math.round((r * 299 + g * 587 + b * 114) / 1000);

    return y < 100;

}

