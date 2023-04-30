export class Key {
    constructor(key_config, key_values, lang, shifted = false) {
        this.id = key_config.id
        this.layers = key_config.layers // dict
        this.key_values = key_values
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

    isCapsKey() {
        if (this.id === "CapsLock") return true
        return false
    }
    isControlKey() {
        const controlKeys = [
            "ControlLeft",
            "ControlRight",
            "AltLeft",
            "AltRight",
            "MetaLeft",
            "MetaRight",
            "Escape",
            "Tab",
            "Delete",
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
        ]
        if (controlKeys.indexOf(this.id) !== -1) return true
        return false
    }
    isPrintableKey() {
        if (this.id.startsWith("Key")) return true
        if (this.id.startsWith("Digit")) return true
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
            "Backspace",
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
    updateKeyText(lang, shifted) {
        this.lang = lang
        this.shifted = shifted
        const symbol = this.getSymbol()
        this.html.textContent = symbol
    }
    // Визуализация и анимация клика кнопки
    renderPress() {
        this.html.classList.toggle("key_press")
        setTimeout(() => {
            this.html.classList.toggle("key_press")
        }, 300)
    }
    // Визуализация и анимация нажатия кнопки
    renderPressDown() {
        this.html.classList.add("key_press")
    }
    // Визуализация и анимация нажатия кнопки
    renderPressUp() {
        this.html.classList.remove("key_press")
    }
    // Получить symbol для отрисовки на кнопке и для отправки ивента в текстарею
    // Запуск кастомного ивента нажата кнопка
    getSymbol() {
        let symbols, symbol
        try {
            if (this.key_values[this.lang]) { // есть ли в лэйауте нужный слой
                symbols = this.key_values[this.lang]
            } else { // если слоя нет, то возвращаем символ английской раскладки
                symbols = this.key_values["en"]
            }
            if (this.shifted) {
                symbol = symbols[1] || symbols[0]
            } else {
                symbol = symbols[0]
            }
        }
        catch (e) {
            symbol = "💩"
            console.warn("В файле key_apperance.json не определены значения для:", this.id)
        }
        return symbol
    }
    emitVirtualPressEvent() {
        console.log("🔥🔥🔥 Запускаю виртуальный ивент для кнопки:", this.id)
        const symbol = this.getSymbol()
        const virtual_kb_press_event = new CustomEvent(
            "virtual_kb_press",
            {
                bubbles: true,
                detail: {
                    id: this.id,
                    symbol: symbol
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
            "shift_event",
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
            "unshift_event",
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
            console.log("Это шифт. Отжат!!!", this.id, this.shifted)
            this.emitUnshiftEvent()
            this.renderPressUp()
            return
        }
    }
    // Для физических нажатий на клавиатуру
    // Вызов происходит из класса Keyboard
    emitAndRenderKeyDown() {
        console.log("~~~~> emitAndRenderKey. this.id", this.id)
        // проверка что обычная кнопка
        if (this.isPrintableKey() || this.isEditKey()) {
            this.emitVirtualPressEvent()
            this.renderPress()
            return
        }
        // проверка что шифт нажали
        if (this.isShiftKey()) {
            console.log("Это шифт нажат!!!", this.id, this.shifted)
            this.emitShiftEvent()
            this.renderPressDown()
            return
        }
        if (this.isCapsKey()) {
            if (this.shifted) {
                this.emitUnshiftEvent()
                this.renderPressUp()
                console.log("this.shifted remove ------>")
                return
            }
            this.emitShiftEvent()
            this.renderPressDown()
            return
        }

        // проверка что служебные кнопки
        if (this.isControlKey()) {
            this.renderPress()
            return
        }

    }
    // Листнер для клика кнопки смены языка
    addEventListnerLanguage() {
        this.html.addEventListener("click", () => {
            this.emitChangeLangEvent()
            this.renderPress()
        })
    }
    // Листнер для клика шифта
    addEventListenerShift() {
        this.html.addEventListener("click", () => {
            console.log("Это шифт нажат!!!", this.id, this.shifted)
            this.renderPressDown()
            this.emitShiftEvent()
            setTimeout(() => {
                this.renderPressUp()
                this.emitUnshiftEvent()
            }, 2000)
            return
        })

    }
    // Листнер для клика на капс 
    addEventListenerCaps() {
        this.html.addEventListener("click", () => {
            if (this.shifted) {
                this.emitUnshiftEvent()
                this.renderPressUp()
                return
            }
            this.emitShiftEvent()
            this.renderPressDown()
            return
        })
    }
    // листнер для обычных кккнопок, энтер, пробел бэкспэйс
    addEventListenerCommonKeys() {
        this.html.addEventListener("click", () => {
            this.renderPress()
            // проверка что обычная кнопка
            if (this.isPrintableKey() || this.isEditKey()) {
                this.emitVirtualPressEvent()
                return
            }
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
        if (this.isShiftKey()) { //this.id === "ShiftLeft" || this.id === "ShiftRight") {
            this.addEventListenerShift()
        }
        // обработчик для капса
        if (this.isCapsKey()) {
            this.addEventListenerCaps()
        }
        // обработчики для остальных кнопок
        if (this.isControlKey() || this.isPrintableKey() || this.isEditKey()) {
            this.addEventListenerCommonKeys()
        }
    }

    createElement() {
        const key = document.createElement("div")
        key.setAttribute("id", this.id)
        key.classList.add("key")
        if (this.style === "primary") {
            key.classList.add("key_primary")
        } else if (this.style === "secondary") {
            key.classList.add("key_secondary")
        } else if (this.style === "invisible") {
            key.classList.add("key_invisible")
        }
        this.html = key

        // отрисовать на кнопке символ
        this.updateKeyText(this.lang, this.shifted)
    }
}

