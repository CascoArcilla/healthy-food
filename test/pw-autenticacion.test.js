import { fixture, html, expect } from '@open-wc/testing';
import '../src/templates/pw-autenticacion.js';

describe('Given the component PwAuthentication is launched', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<pw-authentication></pw-authentication>`);
  });

  it('When the component is initialized, Then it shows register mode by default', () => {
    expect(element.isLogin).to.be.false;
  });

  it('When the switch button is clicked, Then the component should switch to login mode', async () => {
    const button = element.shadowRoot.querySelector('vaadin-button');

    button.click();
    await element.updateComplete;

    expect(element.isLogin).to.be.true;
  });

  it('When the switch button is clicked again, Then the component should switch back to register mode', async () => {
    const el = await fixture(
      html`<pw-authentication .isLogin=${true}></pw-authentication>`
    );
    const button = el.shadowRoot.querySelector('vaadin-button');

    button.click();
    await el.updateComplete;

    expect(el.isLogin).to.be.false;
  });
});
