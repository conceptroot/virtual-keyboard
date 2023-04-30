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
        document.body.addEventListener('keydown', e => {
            console.log('====> Keyboard отловила нажатие кнопки. Нажата e.code:', e.code, e)
            const keys = this.keys.filter(key => e.code === key.id)
            console.log( "Нашли кнопки:", keys)
            if (keys.length === 0) return
            // TODO продумать как быть с одинаковыми клавишами на клавиатуре
            keys[0].emitAndRenderKeyDown()
        })
        document.body.addEventListener('keyup', e => {
            console.log('====> Keyboard отловила отжатие кнопки. Нажата e.code:', e.code)
            const keys = this.keys.filter(key => e.code === key.id)
            console.log( "Нашли кнопки:", keys)
            if (keys.length === 0) return
            // TODO продумать как быть с одинаковыми клавишами на клавиатуре
            keys[0].emitAndRenderKeyUp()
        })
        document.body.addEventListener('change_lang', e => {
            console.log('====> Keyboard отловила смену языка')
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
            if (key.isPrintableKey()) {
                key.updateKeyModifiers( this.lang, this.shifted )
            }
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