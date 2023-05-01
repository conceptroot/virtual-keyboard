export default class WPM {
  constructor() {
    this.html = undefined;
    this.htmlSpeedNow = undefined;
    this.htmlSpeedMax = undefined;
    this.nowSpeed = undefined;
    this.maxSpeed = undefined;
    this.queueSizeInMs = 5000;
    this.refreshTime = 1000;
    this.keysSet = new Set();

    this.init();
  }

  init() {
    this.createElement();
    for (let i = 0; i < 4; i += 1) {
      this.createScrewElement(i);
    }
    this.startCounter();
    this.initEventListeners();
  }

  initEventListeners() {
    document.body.addEventListener('keydown', () => {
      this.tickKeyPress();
    });
  }

  startCounter() {
    setInterval(() => {
      this.countWpm();
    }, this.refreshTime);
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
    wpmHtml.append(nowContainer);
    this.htmlSpeedNow = nowText;

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
    wpmHtml.append(maxContainer);
    this.htmlSpeedMax = maxText;

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

  renderSpeed(currentSpeed) {
    this.nowSpeed = currentSpeed;
    this.htmlSpeedNow.innerText = this.nowSpeed;
    if (this.nowSpeed > 0 && this.maxSpeed === undefined) this.maxSpeed = 0;
    if (this.nowSpeed > this.maxSpeed) {
      this.maxSpeed = this.nowSpeed;
      this.htmlSpeedMax.innerText = this.maxSpeed;
    }
  }

  countWpm() {
    this.filterActualKeyPresses();
    const currentSpeed = this.keysSet.size * (60000 / this.queueSizeInMs);
    this.renderSpeed(currentSpeed);
  }

  tickKeyPress() {
    this.keysSet.add(new Date());
  }

  filterActualKeyPresses() {
    const now = new Date();
    this.keysSet = new Set([...this.keysSet].filter((data) => data > (now - this.queueSizeInMs)));
  }
}
