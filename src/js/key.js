const UPPER = true
export class Key {
    constructor (key_config) {
        this.id = key_config.id
        this.layers = key_config.layers // dict
        this.listner = "TODO"
        this.layer = 'ru'  // ru, en
        this.style = key_config.style // primary, secondary
        this.html = null
        this.init()
    }
    init() {
        this.createElement()
        this.initEventlistners()
    }
    // Визуализация и анимация кнопки
    renderPress() {
        this.html.classList.toggle('key_press')
        setTimeout(e => {
            this.html.classList.toggle('key_press')
        }, 300)
    }
    // Запуск кастомного ивента
    emitVirtualPressEvent(){
        let key
        if (this.id.startsWith('Key')) {
            if (this.layer === 'en') {
                key = this.layers['en']
            } else if (this.layer === 'ru') {
                key = this.layers['ru']
            } else {
                key = 'ошибка'
            }
            if (UPPER) {
                key = key.toUpperCase()
            }
        }

        const virtual_kb_press_event = new CustomEvent(
            "virtual_kb_press", 
            {
                bubbles: true,
                detail: {
                    id: this.id,
                    key: key
                }
            })
        this.html.dispatchEvent(virtual_kb_press_event)

    }
    initEventlistners() {
        this.html.addEventListener('click', (e) => {
            this.emitVirtualPressEvent()
            this.renderPress()
            console.log(this)
        })
        document.body.addEventListener('keydown', e => {
            if (this.id !== e.code) return
            this.emitVirtualPressEvent()
            this.renderPress()
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
    }
}

