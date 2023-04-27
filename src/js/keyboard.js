import { Key } from "./key";
import data from './layout.json'

export class Keyboard {
    constructor() {
        this.keys = []
        this.init()
        console.log('#keys:', this.keys)
    }

    init() {
        this.createKeyboard()
    }

    createKeyboard() {
        for (let key of data) {
            this.keys.push(new Key(key))
        }
    }
}