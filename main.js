
/**
 * Theme Toggle Web Component
 */
class ThemeToggle extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const button = document.createElement('button');
        button.setAttribute('aria-label', 'Toggle Dark Mode');
        
        const style = document.createElement('style');
        style.textContent = `
            button {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                color: var(--text-color);
                padding: 10px;
                border-radius: 50%;
                width: 45px;
                height: 45px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                box-shadow: var(--card-shadow);
                transition: transform 0.2s ease, background-color 0.3s ease;
                z-index: 1000;
            }
            button:hover {
                transform: scale(1.1);
            }
            button:active {
                transform: scale(0.9);
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(button);

        this.updateIcon(button);

        button.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateIcon(button);
        });
    }

    updateIcon(button) {
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        button.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}
customElements.define('theme-toggle', ThemeToggle);

// Theme Initialization
(function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);
})();

class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'lotto-generator');

    const title = document.createElement('h2');
    title.textContent = 'Toto Number Generator';

    const numbersContainer = document.createElement('div');
    numbersContainer.setAttribute('class', 'numbers');

    const button = document.createElement('button');
    button.textContent = 'Generate Numbers';
    button.addEventListener('click', () => this.generateNumbers(numbersContainer));

    wrapper.appendChild(title);
    wrapper.appendChild(numbersContainer);
    wrapper.appendChild(button);

    const style = document.createElement('style');
    style.textContent = `
      .lotto-generator {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px;
        background-color: var(--card-bg);
        border: 20px solid transparent;
        border-image-source: var(--flower-border);
        border-image-slice: 40;
        border-image-repeat: round;
        border-radius: 24px;
        box-shadow: var(--card-shadow);
        transition: all 0.3s ease;
        max-width: 450px;
        width: 100%;
        box-sizing: border-box;
      }
      h2 {
        margin: 0 0 30px 0;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: var(--text-color);
      }
      .numbers {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 15px;
        margin-bottom: 30px;
      }
      .number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: var(--button-text);
        font-size: 1.4em;
        font-weight: bold;
        box-shadow: 0 4px 10px oklch(0 0 0 / 0.1);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        animation: popIn 0.5s ease backwards;
      }
      @keyframes popIn {
        0% { transform: scale(0); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      .number:hover {
        transform: scale(1.1) translateY(-5px);
      }
      button {
        padding: 15px 30px;
        border: none;
        border-radius: 12px;
        background-color: var(--accent-color);
        color: var(--button-text);
        cursor: pointer;
        font-size: 1.1em;
        font-weight: 600;
        box-shadow: 0 4px 12px oklch(0 0 0 / 0.1);
        transition: all 0.2s ease;
      }
      button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px oklch(0 0 0 / 0.15);
        filter: brightness(1.1);
      }
      button:active {
        transform: translateY(0);
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    this.generateNumbers(numbersContainer);
  }

  generateNumbers(container) {
    container.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 49) + 1);
    }
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    
    sortedNumbers.forEach((number, index) => {
      const numberEl = document.createElement('div');
      numberEl.setAttribute('class', 'number');
      numberEl.style.animationDelay = `${index * 0.1}s`;
      numberEl.textContent = number;
      container.appendChild(numberEl);
    });
  }
}

customElements.define('lotto-generator', LottoGenerator);
