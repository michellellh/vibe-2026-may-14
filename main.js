
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
    this.currentNumbers = [];
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'lotto-generator');

    const title = document.createElement('h2');
    title.textContent = 'Toto Number Generator';

    const numbersContainer = document.createElement('div');
    numbersContainer.setAttribute('class', 'numbers');

    const controls = document.createElement('div');
    controls.setAttribute('class', 'controls');

    const button = document.createElement('button');
    button.textContent = 'Generate Numbers';
    button.addEventListener('click', () => this.generateNumbers(numbersContainer));

    const audioControls = document.createElement('div');
    audioControls.setAttribute('class', 'audio-controls');

    const langSelect = document.createElement('select');
    langSelect.setAttribute('aria-label', 'Select Language');
    const languages = [
        { value: 'en', label: 'English' },
        { value: 'zh-CN', label: 'Mandarin' },
        { value: 'zh-nan', label: 'Teochew' }
    ];
    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.value;
        option.textContent = lang.label;
        langSelect.appendChild(option);
    });
    // Load saved language
    langSelect.value = localStorage.getItem('tts-lang') || 'en';
    langSelect.addEventListener('change', () => {
        localStorage.setItem('tts-lang', langSelect.value);
    });

    const speakButton = document.createElement('button');
    speakButton.setAttribute('class', 'secondary-button');
    speakButton.setAttribute('aria-label', 'Read numbers aloud');
    speakButton.textContent = '🔊 Hear';
    speakButton.addEventListener('click', () => this.speakNumbers(langSelect.value));

    audioControls.appendChild(langSelect);
    audioControls.appendChild(speakButton);

    controls.appendChild(button);
    controls.appendChild(audioControls);

    wrapper.appendChild(title);
    wrapper.appendChild(numbersContainer);
    wrapper.appendChild(controls);

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
      .controls {
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
      }
      .audio-controls {
        display: flex;
        gap: 10px;
        width: 100%;
      }
      select {
        flex: 1;
        padding: 10px;
        border-radius: 12px;
        border: 2px solid var(--accent-color);
        background: var(--card-bg);
        color: var(--text-color);
        font-weight: 600;
        cursor: pointer;
      }
      button {
        flex: 1;
        padding: 15px 25px;
        border: none;
        border-radius: 12px;
        background-color: var(--accent-color);
        color: var(--button-text);
        cursor: pointer;
        font-size: 1em;
        font-weight: 600;
        box-shadow: 0 4px 12px oklch(0 0 0 / 0.1);
        transition: all 0.2s ease;
      }
      button.secondary-button {
        flex: 0 0 auto;
        background-color: var(--card-bg);
        color: var(--text-color);
        border: 2px solid var(--accent-color);
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
    this.currentNumbers = [...numbers].sort((a, b) => a - b);
    
    this.currentNumbers.forEach((number, index) => {
      const numberEl = document.createElement('div');
      numberEl.setAttribute('class', 'number');
      numberEl.style.animationDelay = `${index * 0.1}s`;
      numberEl.textContent = number;
      container.appendChild(numberEl);
    });
  }

  speakNumbers(lang) {
    if (!('speechSynthesis' in window)) {
        alert("Sorry, your browser doesn't support text to speech.");
        return;
    }

    window.speechSynthesis.cancel();
    
    let text = "";
    let utteranceLang = lang;

    if (lang === 'en') {
        text = `Your lottery numbers are: ${this.currentNumbers.join(', ')}`;
    } else if (lang === 'zh-CN') {
        text = `您的开奖号码是：${this.currentNumbers.join('，')}`;
    } else if (lang === 'zh-nan') {
        // Teochew is a Min Nan language. zh-TW (Taiwanese Hokkien) is a very close relative.
        // We avoid zh-HK (Cantonese) as it is linguistically distinct.
        text = `您的号数是：${this.currentNumbers.join('，')}`;
        utteranceLang = 'zh-TW'; 
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = utteranceLang;
    utterance.rate = 0.7; // Even slower for dialect clarity

    // Try to find the best voice
    const voices = window.speechSynthesis.getVoices();
    if (lang === 'zh-nan') {
        // Prioritize voices that are explicitly Min Nan or Taiwanese (Hokkien)
        const bestVoice = voices.find(v => v.lang === 'zh-TW' || v.lang === 'zh-nan') || 
                          voices.find(v => v.lang.includes('zh-TW'));
        if (bestVoice) {
            utterance.voice = bestVoice;
        } else {
            // If no Min Nan/Hokkien voice, Mandarin (zh-CN) is actually a better fallback than Cantonese
            const mandarinVoice = voices.find(v => v.lang.includes('zh-CN'));
            if (mandarinVoice) utterance.voice = mandarinVoice;
        }
    } else {
        const bestVoice = voices.find(v => v.lang.startsWith(lang));
        if (bestVoice) utterance.voice = bestVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
}

customElements.define('lotto-generator', LottoGenerator);
