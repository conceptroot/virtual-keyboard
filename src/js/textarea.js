export class Textarea {
    constructor() {
        this.html = null
        this.init()
    }
    
    init() {
        this.createElement()
        this.initEventListeners()
    }
    initEventListeners() {
        document.body.addEventListener('virtual_kb_press', e => {
            if (e.detail.id === 'Backspace') {
                this.html.textContent = this.html.textContent.slice(0,-1)
            } else if (e.detail.id === 'Enter') {
                this.html.textContent += '\n'
            } else if (e.detail.id === 'Space') {
                this.html.textContent += ' '
            } else if (e.detail.id.startsWith('Key')) {
                this.html.textContent += e.detail.key 
            }
            else {
                console.log('Не попали:', e.detail)
            }
        })

    }
    createElement() {
        const textarea = document.createElement('textarea')
        textarea
        textarea.classList.add('textarea')
        textarea.setAttribute('id', 'textarea')
        textarea.setAttribute('name', 'textarea')
        document.querySelector('body').append(textarea)
        this.html = textarea
    }
}