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
            this.html.classList.toggle('key_press')
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
        key.textContent = this.layers['en']
        this.html = key
        console.log('#key=', this.html)
        // удалить TODO
        document.querySelector('.keyboard').append(this.html)

    }
}

