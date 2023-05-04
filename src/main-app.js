import { LitElement, html, css } from '../node_modules/lit/index.js';

import './bar-bar2.js';

class MainApp extends LitElement {
  static get properties() {
    return {
      progressBarData: { type: Array },
    };
  }

  static get styles() {
    return css`
      .spacer {
        height: 100vh;
      }
    `;
    }

  constructor() {
    super();
    this.progressBarData = [];
    this.updateRoster();
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    this.shadowRoot.querySelectorAll('bar-bar2').forEach((bar) => {
      bar.handleScroll();
    });
  }

  updateRoster() {
    const address = new URL('../assets/data.json', import.meta.url).href;
    fetch(address)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return [];
      })
      .then((data) => {
        this.progressBarData = data;
      });
  }

  render() {
    return html`
  <div style="height: 100vh; background-color: lightgrey;">
    <h1 style="text-align: center; color:green">Scroll down to see progress bars</h1>
  </div>
  <div class="progress-bars">
    ${this.progressBarData.map(
      (item) => html`
        <bar-bar2
          duration="${item.duration}"
          intervalDuration="${item.intervalDuration}"
          progressPercentage="${item.progressPercentage}"
          name="${item.name}"
          aria-label="A progress bar showing ${item.name} installation time"
        ></bar-bar2>
      `
    )}
  </div>
`;
  }
}

customElements.define('main-app', MainApp);