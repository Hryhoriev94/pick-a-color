import {randomShade, getRandomColor, toHex, rgbToHex, hexToRGB, isDark} from './functions.ts';

test('Get a random shade in RGB format.', () => {
    const shade = randomShade();
    expect(shade).toBeGreaterThanOrEqual(0);
    expect(shade).toBeLessThanOrEqual(255);
})

test('getRandomColor should return an array with three numbers between 0 and 255', () => {
    const color = getRandomColor();
    expect(Array.isArray(color)).toBe(true);
    expect(color.length).toBe(3);
    color.forEach((shade) => {
        expect(shade).toBeGreaterThanOrEqual(0);
        expect(shade).toBeLessThanOrEqual(255);
    });
});

test('toHex should convert decimal number to hexadecimal string', () => {

    expect(toHex(0)).toBe("0");
    expect(toHex(5)).toBe("5");
    expect(toHex(9)).toBe("9");

    expect(toHex(10)).toBe("A");
    expect(toHex(11)).toBe("B");
    expect(toHex(15)).toBe("F");

    expect(toHex(16)).toBe("10");
    expect(toHex(31)).toBe("1F");
    expect(toHex(255)).toBe("FF");
});

test('rgbToHex should convert RGB values to a hexadecimal color string', () => {
    expect(rgbToHex([0, 0, 0])).toBe("#000000");
    expect(rgbToHex([255, 255, 255])).toBe("#FFFFFF");
    expect(rgbToHex([100, 200, 50])).toBe("#64C832");
    expect(rgbToHex([255, 0, 128])).toBe("#FF0080");
    expect(rgbToHex([0, 128, 255])).toBe("#0080FF");
})

test('hexToRGB should convert hexadecimal color string to an RGB array', () => {
    expect(hexToRGB("#000000")).toEqual([0, 0, 0]);
    expect(hexToRGB("#FFFFFF")).toEqual([255, 255, 255]);
    expect(hexToRGB("#64C832")).toEqual([100, 200, 50]);
    expect(hexToRGB("#FF0080")).toEqual([255, 0, 128]);
    expect(hexToRGB("#0080FF")).toEqual([0, 128, 255]);
});

test('isDark should determine if the color is dark based on YIQ formula, based 100', () => {
    expect(isDark("#000000")).toBe(true);
    expect(isDark([0,0,0])).toBe(true);
    expect(isDark("#FFFFFF")).toBe(false);
    expect(isDark([255,255,255])).toBe(false);
    expect(isDark("#808080")).toBe(false);
    expect(isDark([128,128,128])).toBe(false);
    expect(isDark("#64C832")).toBe(false);
    expect(isDark([100, 200, 50])).toBe(false);
    expect(isDark('#0080FF')).toBe(false);
    expect(isDark([0, 128, 255])).toBe(false);
});