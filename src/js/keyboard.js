import Key from './key';
import keyAppearance from './key_apperance.json';
import keyValuesList from './key_values.json';
import WPM from './wpm';

export class Keyboard {
  constructor() {
    this.keys = [];
    this.html = null;
    this.htmlLines = [];
    this.lang = localStorage.getItem('keyboard_language') || 'en';
    this.shifted = false;
    this.wpm = undefined;
    this.init();
  }

  init() {
    this.createElement();
    this.createKeyboard();
    this.initEventListeners();
    this.initWPM();
  }

  initWPM() {
    this.wpm = new WPM();
    this.html.append(this.wpm.html);
  }

  initEventListeners() {
    document.body.addEventListener('keydown', (e) => {
      const keys = this.keys.filter((key) => e.code === key.id);
      if (keys.length === 0) return;
      keys.forEach((key, i) => {
        if (i === 0) key.emitAndRenderKeyDown();
        else key.renderPress();
      });
    });
    // пока используется для шифта
    document.body.addEventListener('keyup', (e) => {
      const keys = this.keys.filter((key) => e.code === key.id);
      if (keys.length === 0) return;
      keys[0].emitAndRenderKeyUp();
    });
    document.body.addEventListener('change_lang', () => {
      this.lang = (this.lang === 'en') ? 'ru' : 'en';
      localStorage.setItem('keyboard_language', this.lang);
      this.updateKeyTexts();
    });
    document.body.addEventListener('shift_event', () => {
      this.shifted = true;
      this.updateKeyTexts();
    });
    document.body.addEventListener('unshift_event', () => {
      this.shifted = false;
      this.updateKeyTexts();
    });
  }

  updateKeyTexts() {
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
