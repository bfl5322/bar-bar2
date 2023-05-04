import { LitElement, html, css } from '../node_modules/lit/index.js';


class BarBar2 extends LitElement {
  static get properties() {
    return {
      duration: { type: Number, reflect: true},
      intervalDuration: { type: Number, reflect: true },
      progressPercentage: { type: Number, reflect: true },
      progress: { type: Number,  reflect: true},
      time: { type: Number, reflect: true },
      name: { type: String, reflect: true },
      hasStarted: { type: Boolean },
    };
  }

  static get styles() {
    return css`
    :host {
      display: block;
      margin-bottom: 20px;
    }
    .progress-bar {
      background-color: #ddd;
      border-radius: 5px;
      height: 30px;
      width: 75%;
      margin: 0 auto;
    }
    .progress-bar-inner {
      background-image: linear-gradient(red, yellow);
      border-radius: 5px;
      height: 100%;
      width: 0;
      transition: width linear;
    }
    .timer {
      margin-top: 5px;
      text-align: center;
    }
    .name {
     top: -10%;
    }
    @media (max-width: 767px) {
        .progress-bar {
          width: 100%;
        }
      }
    `;
  }

  constructor() {
    super();
    this.duration = 10;
    this.intervalDuration = 16;
    this.progressPercentage = 100;
    this.progress = 0;
    this.time = 0;
    this.name = '';
    this.hasStarted = false;
  }



  firstUpdated() {
    const progressBarInner = this.shadowRoot.querySelector('.progress-bar-inner');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasStarted) {
          this.hasStarted = true;

          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReducedMotion) {
            setTimeout(() => {
              progressBarInner.style.width = '50%';
              setTimeout(() => {
                progressBarInner.style.width = '100%';
              }, this.duration * 1000 / 2);
            }, 10);
          } else {
            progressBarInner.style.transitionDuration = `${this.duration}s`;
            progressBarInner.style.width = `${this.progressPercentage}%`;
          }
          this.startAnimation();
        }
      });
    });

    observer.observe(this);
  }
  
  
  startAnimation() {
    const updateTime = () => {
      this.time = parseFloat((this.time + 0.1).toFixed(1));

      if (this.time < this.duration) {
        setTimeout(updateTime, 100);
      } else {
        this.time = this.duration;
      }

      this.requestUpdate();
    };

    updateTime();
  }

  render() {
    return html`
      <div class="progress-bar" aria-label="A bar graph animation showing how long it takes for ${this.name} to be installed">
        <div class="progress-bar-inner"></div>
      </div>
      <div class="name">${this.name}</div>
      <div class="timer">${this.time}s</div>
    `;
  }
}

customElements.define('bar-bar2', BarBar2);