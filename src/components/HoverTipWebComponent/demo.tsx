import { QuarkElement, customElement, property, state } from 'quarkc';
import style from './index.css'

@customElement({ tag: 'my-hover-tip', style })
export class MyHoverTip extends QuarkElement {
  @property({ type: String, })
  visible = 'hidden';

  @property({ type: String, })
  title = '点击“识别图中二维码”即可入群';

  @property({ type: String, })
  btnText = '我知道了';

  @state()
  clicked = false;

  handleClick(e: any) {
    this.clicked = true;
    this.$emit('change', { detail: 'hidden' });
  }

  render() {
    return (
      <div
        class="hover-tip"
        onTouchmove={(e) => e.preventDefault()}
        onClick={(e) => this.handleClick(e)}
      >
        <div class="title-box"><slot>{this.title}</slot></div>
        <div class="btn-box"><slot name="btn">{this.btnText}</slot></div>
      </div>
    )
  }
}
