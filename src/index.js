import { Keyboard } from "./js/keyboard"

window.onload = async () => {
    const keyboard = new Keyboard()
    
    document.querySelector('body').addEventListener('virtual_kb_press', e => {
        console.log('triggerd virtual_kb_press', e.detail)
    }, false)
}
