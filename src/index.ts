const app: HTMLElement = document.querySelector('#app');

interface  addElementParameters {
    parent?: HTMLElement,
    tag?: string,
    content?: string | HTMLElement,
    classNames?: string | string[],
    place?: 'append' | 'prepend' | 'before' | 'after'
}


const addElement = ({parent = app, classNames = ['colorBlock'], tag = 'div', content = '', place = 'append'} : addElementParameters): void => {
    const newElement = document.createElement(tag);
    if(classNames) {
        if(typeof classNames === 'string') {
            newElement.classList.add(classNames);
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
}

for(let i = 0; i < 10; i++) {
    addElement({parent: app, tag: 'div', classNames: `${i}`});
}


