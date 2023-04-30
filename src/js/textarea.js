class Textarea {
  constructor() {
    this.html = null;
    this.init();
  }

  init() {
    this.createElement();
    this.initEventListeners();
  }

  initEventListeners() {
    document.body.addEventListener('virtual_kb_press', (e) => {
      // console.log('----> Textarea отловил:', e.detail.id);
      if (e.detail.id === 'Backspace') {
        this.html.textContent = this.html.textContent.slice(0, -1);
      } else if (e.detail.id === 'Enter') {
        this.html.textContent += '\n';
      } else if (e.detail.id === 'Space') {
        this.html.textContent += ' ';
      } else {
        this.html.textContent += e.detail.symbol;
      }
    });
  }

  createElement() {
    const textarea = document.createElement('textarea');
    textarea.classList.add('textarea');
    textarea.setAttribute('id', 'textarea');
    textarea.setAttribute('name', 'textarea');
    textarea.setAttribute('readonly', '');
    document.querySelector('body').append(textarea);
    this.html = textarea;
  }
}

export default function createTextarea() {
  window.conceptTextarea = new Textarea();
}
