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
        sheet.replaceSync(`
            .hover-tip {
                width: 100vw;
                height: 100vh;
                box-sizing: border-box;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 99999;
                background: rgba(0, 0, 0, 0.7);
                padding: 20vh 0 30vh;
            }
            .title-box {
                height: 1rem;
                width: 86.6vw;
                max-width: 750px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.36rem;
                font-weight: bold;
                color: #363636;
                background: #ffffff;
                border-radius: 0.3rem;
                position: relative;
            }
            .title-box::after {
                content: '';
                width: 0;
                height: 0;
                border-top: 0.3rem solid #ffffff;
                border-right: 0.3rem solid transparent;
                border-left: 0.3rem solid transparent;
                position: absolute;
                z-index: 9;
                bottom: -0.2rem;
                left: 50%;
                transform: translateX(-50%);
            }
            .btn-box {
                height: 1.2rem;
                width: 48.8vw;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.4rem;
                font-weight: bold;
                color: #ffffff;
                padding-bottom: 1px;
                background: no-repeat url('https://qiniu.whjiaoy.com/xbyschool/m6BcwUv7xp9aDNyMPHECC9L7rWmeIc3q') center center;
                background-size: contain;
            }
        `);
        this.shadowRoot.adoptedStyleSheets = [sheet];
    }
}

if (!customElements.get(MyHoverTip.tagName)) {
    customElements.define(MyHoverTip.tagName, MyHoverTip);
}