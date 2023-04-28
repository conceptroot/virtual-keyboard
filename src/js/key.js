const UPPER = true
export class Key {
    constructor (key_config, lang) {
        this.id = key_config.id
        this.layers = key_config.layers // dict
        this.listner = "TODO"
        this.lang = lang  // ru, en
        this.style = key_config.style // primary, secondary
        this.html = null
        this.shifted = false
        this.init()
    }
    init() {
        this.createElement()
        this.initEventlistners()
    }

    // Обновляет текст на кнопке
    updateKeyModifiers(lang, shifted) {
        this.lang = lang
        this.shifted = shifted
        if (this.layers[lang]) {
            this.html.textContent = this.layers[lang]
        } else {
            this.html.textContent = this.layers['en']
        }
    }
    // Визуализация и анимация кнопки
    renderPress() {
        this.html.classList.toggle('key_press')
        setTimeout(e => {
            this.html.classList.toggle('key_press')
        }, 300)
    }
    // Запуск кастомного ивента нажата кнопка
    emitVirtualPressEvent(){
        let key
        if (this.id.startsWith('Key')) {
            if (this.lang === 'en') {
                key = this.layers['en']
            } else if (this.lang === 'ru') {
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
    // Запуск кастомного ивента, что надо поменять язык
    emitChangeLangEvent() {
        const change_lang_event = new CustomEvent(
            "change_lang",
            {
                bubbles: true,
                
            }
        )
        this.html.dispatchEvent(change_lang_event)
        
    }
    initEventlistners() {
        this.html.addEventListener('click', (e) => {
            if (this.id === "Lang") { this.emitChangeLangEvent() }
            else { this.emitVirtualPressEvent() }
            this.renderPress()
            // console.log(this)
        })
        document.body.addEventListener('keydown', e => {
            if (this.id !== e.code) return
            this.emitVirtualPressEvent()
            this.renderPress()
            // console.log(this)
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
        this.html = key
        if (this.layers[this.lang]) {
            this.html.textContent = this.layers[this.lang]
        } else {
            this.html.textContent = this.layers['en']
        }
    }
}

