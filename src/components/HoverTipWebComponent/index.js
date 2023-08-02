import { FASTElement, html, css, when, Observable } from '@microsoft/fast-element';

export class MyHoverTip extends FASTElement {
    constructor() {
        super();
        this.clicked = false;
    }

    get getTitle() {
        return this.title || '点击“识别图中二维码”即可入群';
    }

    get getBtnText() {
        return this.btnText || '我知道了';
    }

    handleClick(e) {
        this.clicked = true;
        this.$emit('change', 'hidden');
    }

    static definition = {
        name: 'my-hover-tip',
        attributes: ['visible', 'title', 'btnText'],
        template: html`
            ${when(
                x => x.visible === 'visible',
                html`
                    <div
                        class="hover-tip"
                        @touchmove="${(x, c) => c.event.preventDefault()}"
                        @click="${(x, c) => x.handleClick(c.event)}"
                    >
                        <div class="title-box"><slot>${x => x.getTitle}</slot></div>
                        <div class="btn-box"><slot name="btn">${x => x.getBtnText}</slot></div>
                    </div>
                `,
            )}
        `,
        styles: css`
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
                background: no-repeat url('https://qiniu.whjiaoy.com/xbyschool/m6BcwUv7xp9aDNyMPHECC9L7rWmeIc3q') center
                    center;
                background-size: contain;
            }
        `,
    };
}

const states = ['clicked'];
states.map(key => Observable.defineProperty(MyHoverTip.prototype, key));

FASTElement.define(MyHoverTip);
