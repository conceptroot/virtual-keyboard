import { Keyboard } from "./js/keyboard"
import { Textarea } from "./js/textarea"

window.onload = async () => {
    const textarea = new Textarea()
    const keyboard = new Keyboard()
    document.body.addEventListener('keydown', e => {
        console.log(e)
    })
    document.body.addEventListener('change_lang', e => {
        console.log('Меняем раскладку клавы')
    })
}
