import { Key } from "./key";
import data from './layout.json'

export class Keyboard {
    constructor() {
        this.keys = []
        this.html = null

        this.init()
        // console.log('#keys:', this.keys)
    }

    init() {
        this.createElement()
        this.createKeyboard()
    }

    createElement() {
        const keyboard = document.createElement('div')
        keyboard.classList.add('keyboard')
        document.querySelector('body').append(keyboard)
        this.html = keyboard
    }

    createKeyboard() {
        for (let key_data of data) {
            const key = new Key(key_data)
            this.keys.push(key)
            this.html.append(key.html)
        }
    }
}