import { LitElement, html, css } from 'lit';
import { dialogRenderer } from '@vaadin/dialog/lit.js';
import '@vaadin/button';
import '@vaadin/dialog';
import './templates/pw-authentication.js';

export class HealthyFood extends LitElement {
  /*static get styles() {
    return css`
      :host {
        background-color: var(--healthy-food-background-color);
      }
    `;
  }*/

  static styles = css`
    :host {
      background-color: var(--healthy-food-background-color);
    }
    .healty-food-main {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: center;
    }
  `;
  
  static get properties() {
    return {
      isAccessFormOpened: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();
    this.isAccessFormOpened = true;
  }

  render() {
    return html`
      <main class="healty-food-main">
        <h1>Healthy Food</h1>
        <vaadin-button data-testid="publish" @click=${this.openAccessForm}>
          Login
        </vaadin-button>

        <vaadin-dialog
          .opened=${this.isAccessFormOpened}
          @opened-changed=${this.accessFormChanged}
          data-testid="access-form"
          ${dialogRenderer(this.renderAccessForm)}
        >
          <pw-login></pw-login>
          <!-- Alex -->
          <pw-register></pw-register>
          <!-- Pepe -->
        </vaadin-dialog>

        <pw-publis-form></pw-publis-form
        ><!-- Octavio -->
      </main>
    `;
  }
  
  renderAccessForm() {
    return html` <pw-authentication></pw-authentication> `;
  }

  openAccessForm() {
    this.isAccessFormOpened = true;
  }

  accessFormChanged(e) {
    this.isAccessFormOpened = e.detail.value;
  }
}
