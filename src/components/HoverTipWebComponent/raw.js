import styles from './index.css';

class MyHoverTip extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get tagName() {
        return 'my-hover-tip';
    }

    static get observedAttributes() {
        return ['visible', 'title', 'btntext'];
    }

    connectedCallback() {
        console.log('connectedCallback');
        this.render();
    }

    disconnectedCallback() {
        console.log('disconnectedCallback');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('attributeChangedCallback:', name, oldValue, newValue);
        this.render();
    }

    handleMousemove = (e) => {
        e.preventDefault();
    }
    
    handleClick = (e) => {
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: 'hidden',
        }));
    }

    render() {
        const visible = this.getAttribute('visible') || 'hidden';
        const title = this.getAttribute('title') || '点击“识别图中二维码”即可入群';
        const btnText = this.getAttribute('btntext') || '我知道了';

        this.shadowRoot.innerHTML = visible === 'visible' ? `
            <div class="hover-tip">
                <div class="title-box"><slot>${title}</slot></div>
                <div class="btn-box"><slot name="btn">${btnText}</slot></div>
            </div>
        ` : '';

        const hoverTip = this.shadowRoot.querySelector('.hover-tip');
        if (hoverTip) {
            hoverTip.onmousemove = this.handleMousemove;
            hoverTip.onclick = this.handleClick;
        }

        const sheet = new CSSStyleSheet();
        sheet.replaceSync(styles);
        this.shadowRoot.adoptedStyleSheets = [sheet];
    }
}

if (!customElements.get(MyHoverTip.tagName)) {
    customElements.define(MyHoverTip.tagName, MyHoverTip);
}