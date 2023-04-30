export class Key {
    constructor (key_config, lang, shifted=false) {
        this.id = key_config.id
        this.layers = key_config.layers // dict
        this.lang = lang  // ru, en
        this.style = key_config.style // primary, secondary
        this.html = null
        this.shifted = shifted
        this.init()
    }
    init() {
        this.createElement()
        this.initEventlistners()
    }

    isPrintableKey() {
        if (this.id.startsWith('Key')) return true
        const printKeys = [
            "Quote",
            "Period",
            "Comma",
            "Slash",
            "Semicolon"
        ]
        if (printKeys.indexOf(this.id) !== -1) return true
        return false
    }
    isEditKey() {
        const editKeys = [
            "Enter",
            "Space", 
            "Backspace"
        ]
        if (editKeys.indexOf(this.id) !== -1) return true
        return false
    }
    isShiftKey() {
        if (this.id === "ShiftLeft") return true
        if (this.id === "ShiftRight") return true
        return false
    }
    // Обновляет текст на кнопке
    updateKeyModifiers(lang, shifted) {
        this.lang = lang
        this.shifted = shifted
        let symbol
        if (this.layers[lang]) { // есть ли в лэйауте нужный слой
            symbol = this.layers[lang]
        } else { // если слоя нет, то возвращаем символ английской раскладки
            symbol = this.layers['en']
        }
        if (this.shifted) {
            symbol = symbol.toUpperCase()
        }
        this.html.textContent = symbol
    }
    // Визуализация и анимация клика кнопки
    renderPress() {
        this.html.classList.toggle('key_press')
        setTimeout(e => {
            this.html.classList.toggle('key_press')
        }, 300)
    }
    // Визуализация и анимация нажатия кнопки
    renderPressDown() {
        this.html.classList.add('key_press')
    }
    // Визуализация и анимация нажатия кнопки
    renderPressUp() {
        this.html.classList.remove('key_press')
    }
    // Запуск кастомного ивента нажата кнопка
    emitVirtualPressEvent(){
        console.log('🔥 Запускаю виртуальный ивент для кнопки:', this.id)
        let key
        if (this.id.startsWith('Key')) {
            if (this.lang === 'en') {
                key = this.layers['en']
            } else if (this.lang === 'ru') {
                key = this.layers['ru']
            } else {
                key = 'ошибка'
            }
            if (this.shifted) {
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
    // Запуск кастомного ивента, что нажали шифт
    emitShiftEvent() {
        const virtual_shift_event = new CustomEvent(
            'shift_event',
            {
                bubbles: true,
                detail: {
                    isShifted: true
                }
            })
        this.html.dispatchEvent(virtual_shift_event)
    }
    // Запуск кастомного ивента, что отжали шифт
    emitUnshiftEvent() {
        const virtual_unshift_event = new CustomEvent(
            'unshift_event',
            {
                bubbles: true,
                detail: {
                    isShifted: false
                }
            })
        this.html.dispatchEvent(virtual_unshift_event)
    }

    // Для физических отжатий клавиатуру
    // Вызов происходит из класса Keyboard
    emitAndRenderKeyUp() {
        // проверка что шифт отжали
        if (this.isShiftKey()) { 
            console.log('Это шифт. Отжат!!!', this.id, this.shifted)
            this.emitUnshiftEvent()
            this.renderPressUp()
            return
        }
    }
    
    // Для физических нажатий на клавиатуру
    // Вызов происходит из класса Keyboard
    emitAndRenderKeyDown() {
        console.log("~~~~> emitAndRenderKey. this.id", this.id )
        console.log("~~~~> emitAndRenderKey. isPrintable?", this.isPrintableKey() )
        console.log("~~~~> emitAndRenderKey. isEditKey?", this.isEditKey() )
        console.log("~~~~> emitAndRenderKey. isShift?", this.isShiftKey() )
        // проверка что обычная кнопка
        if (this.isPrintableKey() || this.isEditKey()) { 
            this.emitVirtualPressEvent()
            this.renderPress()
            return
        } 
        // проверка что шифт нажали
        if (this.isShiftKey()) { 
            console.log('Это шифт нажат!!!', this.id, this.shifted)
            this.emitShiftEvent()
            this.renderPressDown()
            return
        }

    }
    // Листнер для кнопки смены языка
    addEventListnerLanguage() {
        this.html.addEventListener('click', (e) => {
            this.emitChangeLangEvent()
            this.renderPress()
        })
    }
    // Листнер для шифта
    addEventListenerShift() {
        console.log('this.id====>>>>>', this.id)
        this.html.addEventListener("click", e => {
            console.log("press shift")
            this.renderPress()
        })
    }
    // листнер для обычных кккнопок, энтер, пробел бэкспэйс
    addEventListenerCommonKeys() {
        this.html.addEventListener('click', e => {
            this.emitVirtualPressEvent()
            this.renderPress()
            console.log('кликнутая кнопка совпала с объектом Key:', this.id)
        })
    }
    // Инициализация листнеров для Кнопок, реагирует на клик мыши
    initEventlistners() {
        // обработчик для переключения языка
        if (this.id === "Lang") { 
            this.addEventListnerLanguage()
            return
        }
        // обработчики для шифта
        if (this.id === "ShiftLeft" || this.id === "ShiftRight") {
            this.addEventListenerShift()
        }
        // обработчики для остальных кнопок
        this.addEventListenerCommonKeys()
    }

    createElement() {
        const key = document.createElement('div')
        key.setAttribute('id', this.id)
        key.classList.add('key')
        if (this.style === 'primary') {
            key.classList.add('key_primary')
        } else if (this.style === 'secondary') {
            key.classList.add('key_secondary')
        } else if (this.style === 'invisible') {
            key.classList.add('key_invisible')
        }
        this.html = key
        if (this.layers[this.lang]) {
            this.html.textContent = this.layers[this.lang]
        } else {
            this.html.textContent = this.layers['en']
        }
    }
}

