import Key from './key';
import keyAppearance from './key_apperance.json';
import keyValuesList from './key_values.json';

export class Keyboard {
  constructor() {
    this.keys = [];
    this.html = null;
    this.htmlLines = [];
    this.lang = localStorage.getItem('keyboard_language') || 'en';
    this.shifted = false;
    this.init();
  }

  init() {
    this.createElement();
    this.createKeyboard();
    this.initEventListeners();
  }

  initEventListeners() {
    document.body.addEventListener('keydown', (e) => {
      // console.log('====> Keyboard отловила нажатие кнопки. Нажата e.code:', e.code);
      const keys = this.keys.filter((key) => e.code === key.id);
      if (keys.length === 0) return;
      keys.forEach((key, i) => {
        if (i === 0) key.emitAndRenderKeyDown();
        else key.renderPress();
      });
    });
    // пока используется для шифта
    document.body.addEventListener('keyup', (e) => {
      // console.log('====> Keyboard отловила отжатие кнопки. Нажата e.code:', e.code)
      const keys = this.keys.filter((key) => e.code === key.id);
      if (keys.length === 0) return;
      keys[0].emitAndRenderKeyUp();
    });
    document.body.addEventListener('change_lang', () => {
      // console.log('====> Keyboard отловила смену языка');
      this.lang = (this.lang === 'en') ? 'ru' : 'en';
      localStorage.setItem('keyboard_language', this.lang);
      this.updateKeyTexts();
    });
    document.body.addEventListener('shift_event', () => {
      // console.log('====> Keyboard отловила включение шифта');
      this.shifted = true;
      this.updateKeyTexts();
    });
    document.body.addEventListener('unshift_event', () => {
      // console.log('====> Keyboard отловила выключение шифта');
      this.shifted = false;
      this.updateKeyTexts();
    });
  }

  updateKeyTexts() {
    // console.log('inside updateKeyTexts. Lang:', this.lang, ' Shifted:', this.shifted);
    this.keys.forEach((key) => {
      key.updateKeyText(this.lang, this.shifted);
    });
  }

  createElement() {
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    document.querySelector('body').append(keyboard);
    this.html = keyboard;
    this.createLine();
  }

  createLine() {
    const line = document.createElement('div');
    line.classList.add('keyboard__line');
    this.htmlLines.push(line);
    this.html.append(line);
    return line;
  }

  createKeyboard() {
    keyAppearance.forEach((keyData) => {
      if (keyData.id === 'nextline') {
        this.createLine();
        return;
      }
      const keyValues = keyValuesList.filter((e) => e.id === keyData.id)[0].lang;
      const key = new Key(keyData, keyValues, this.lang, this.shifted);
      this.keys.push(key);
      this.htmlLines.slice(-1)[0].append(key.html);
    });
  }
}

export default function createKeyboard() {
  window.conceptKeyboard = new Keyboard();
}
