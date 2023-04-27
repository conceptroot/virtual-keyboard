
export class Key {
    constructor (key_config) {
        this.id = key_config.id
        this.layers = key_config.layers // dict
        this.listner = "TODO"
        this.style = key_config.style // primary, secondary
        this.html = null
        this.init()
    }
    init() {
        this.createElement()
        this.initEventlistners()
    }
    initEventlistners() {
        this.html.addEventListener('click', (e) => {
            // Запуск кастомного ивента
            const virtual_kb_press_event = new CustomEvent(
                "virtual_kb_press", 
                {
                    bubbles: true,
                    detail: {
                        id: this.id,
                        key: this.layers['en'] //TODO
                    }
                })
            this.html.dispatchEvent(virtual_kb_press_event)

            // Визуализация и анимация кнопки
            this.html.classList.toggle('key_press')
            setTimeout(e => {
                this.html.classList.toggle('key_press')
            }, 300)
            
            console.log(this)
        })
    }
    createElement() {
        const key = document.createElement('div')
        key.setAttribute('id', this.id)
        key.classList.add('key')
        if (this.style === 'primary') {
            key.classList.add('key_primary')
        } else if (this.style === 'secondary') {
            key.classList.add('key_secondary')
        }
        key.textContent = this.layers['en'] // TODO
        this.html = key
        // console.log('#key=', this.html)

    }
}

