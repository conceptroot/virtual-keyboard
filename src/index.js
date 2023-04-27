import { Keyboard } from "./js/keyboard"
import { Textarea } from "./js/textarea"

window.onload = async () => {
    const textarea = new Textarea()
    const keyboard = new Keyboard()
    document.body.addEventListener('keydown', e => {
        console.log(e)
    })
}
