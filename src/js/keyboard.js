import { Key } from "./key";
import data from './layout.json'

export class Keyboard {
    constructor() {
        this.keys = []
        this.html = null
        this.lang = 'ru' 
        this.shifted = true

        this.init()
        // console.log('#keys:', this.keys)
    }

    init() {
        this.createElement()
        this.createKeyboard()
        this.initEventListeners()
    }
    initEventListeners() {
        document.body.addEventListener('change_lang', e => {
            this.lang = (this.lang === 'en') ? 'ru' : 'en'
            this.updateKeyTexts()
        })
        document.body.addEventListener('shift_event', e => {
            console.log('====> Keyboard отловила включение шифта')
            this.shifted = true
            this.updateKeyTexts()
        })
        document.body.addEventListener('unshift_event', e => {
            console.log('====> Keyboard отловила выключение шифта')
            this.shifted = false
            this.updateKeyTexts()
        })
    }
    updateKeyTexts() {
        console.log('inside updateKeyTexts. Lang:', this.lang, ' Shifted:', this.shifted)
        for (let key of this.keys) {
            key.updateKeyModifiers( this.lang, this.shifted )
        }
    }

    createElement() {
        const keyboard = document.createElement('div')
        keyboard.classList.add('keyboard')
        document.querySelector('body').append(keyboard)
        this.html = keyboard
    }

    createKeyboard() {
        for (let key_data of data) {
            const key = new Key(key_data, this.lang, this.shifted)
            this.keys.push(key)
            this.html.append(key.html)
        }
    }
}