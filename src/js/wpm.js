export default class WPM {
  constructor() {
    this.html = undefined;
    this.htmlSpeedNow = undefined;
    this.htmlSpeedMax = undefined;
    this.init();
  }

  init() {
    this.createElement();
    for (let i = 0; i < 4; i += 1) {
      this.createScrewElement(i);
    }
  }

  createElement() {
    const wpmHtml = document.createElement('div');
    wpmHtml.classList.add('wpm');

    const title = document.createElement('H2');
    title.classList.add('wpm__title');
    title.textContent = 'WPM meter';
    wpmHtml.append(title);

    const nowTitle = document.createElement('p');
    nowTitle.classList.add('counter__title');
    nowTitle.textContent = 'now';
    wpmHtml.append(nowTitle);

    const nowContainer = document.createElement('div');
    const nowText = document.createElement('p');
    nowContainer.classList.add('counter__container');
    nowText.classList.add('counter__text');
    nowText.textContent = '---';
    nowContainer.append(nowText);
    this.htmlSpeedNow = nowContainer;
    wpmHtml.append(this.htmlSpeedNow);

    const maxTitle = document.createElement('p');
    maxTitle.classList.add('counter__title');
    maxTitle.textContent = 'max';
    wpmHtml.append(maxTitle);

    const maxContainer = document.createElement('div');
    const maxText = document.createElement('p');
    maxContainer.classList.add('counter__container');
    maxText.classList.add('counter__text');
    maxText.textContent = '---';
    maxContainer.append(maxText);
    this.htmlSpeedMax = maxContainer;
    wpmHtml.append(this.htmlSpeedMax);

    const credits = document.createElement('p');
    credits.classList.add('wpm__credits');
    credits.textContent = 'by @conceptroot 2023';
    wpmHtml.append(credits);

    this.html = wpmHtml;
  }

  createScrewElement() {
    const screw = document.createElement('img');
    screw.classList.add('screw');
    screw.setAttribute('alt', 'screw');
    this.html.append(screw);
  }
}
