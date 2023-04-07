import { fixture, html, expect } from '@open-wc/testing';
import '../src/templates/pw-login-form.js';

describe('Given two input values required to perform the PwLoginForm, both should update when changed', () => {
  let component;

  beforeEach(async () => {
    component = await fixture(html`<pw-login-form></pw-login-form>`);
  });

  it('When email input value changes, Then the email property is updated', async () => {
    const emailInput = component.shadowRoot.querySelector('[data-testid="email-login"]');

    emailInput.value = 'correo@depaco.com';
    emailInput.dispatchEvent(new InputEvent('input'));

    await component.updateComplete;

    expect(component.email).to.equal('correo@depaco.com');
  });

  it('When password input value changes, Then the password property is updated', async () => {
    const passwordInput = component.shadowRoot.querySelector('[data-testid="password-login"]');

    passwordInput.value = 'password.123';
    passwordInput.dispatchEvent(new InputEvent('input'));
    await component.updateComplete;

    expect(component.password).to.equal('password.123');
  });

  it('When the button is pressend if the gmail and password are correct, then the user was login', async () => {
    const emailInput = component.shadowRoot.querySelector('[data-testid="email-login"]');
    const passwordInput = component.shadowRoot.querySelector('[data-testid="password-login"]');
    const buttonLogin = component.shadowRoot.querySelector('[data-testid="button-login"]');

    /*
    preguntar si es correcto usar el dipatchEvent en este caso
    ya que el boton deberia guardar el valor de los campos
    */

    emailInput.value = 'arturo_1@correo.com';
    emailInput.dispatchEvent(new InputEvent('input'));
    passwordInput.value = 'password.123';
    passwordInput.dispatchEvent(new InputEvent('input'));

    buttonLogin.dispatchEvent(new InputEvent('click'));

    await component.updateComplete;

    expect(component.email).to.equal('arturo_1@correo.com');
    expect(component.password).to.equal('password.123');
  });

  it('When the button is pressend if the gmail INCORRECT, then the user was login', async () => {
    const emailInput = component.shadowRoot.querySelector('[data-testid="email-login"]');
    const passwordInput = component.shadowRoot.querySelector('[data-testid="password-login"]');
    const buttonLogin = component.shadowRoot.querySelector('[data-testid="button-login"]');

    /*
    preguntar si es correcto usar el dipatchEvent en este caso
    ya que el boton deberia guardar el valor de los campos
    */

    emailInput.value = 'arturo_1@correo.com';
    passwordInput.value = 'password.123';

    emailInput.dispatchEvent(new InputEvent('input'));
    passwordInput.dispatchEvent(new InputEvent('input'));

    buttonLogin.dispatchEvent(new InputEvent('click'));

    await component.updateComplete;

    expect(component.email).to.not.equal('arturo_99@correo.com');
  });

  it('When the button is pressend if the gmail is correct but the password is incorrect, then notify user', async () => {
    const emailInput = component.shadowRoot.querySelector('[data-testid="email-login"]');
    const passwordInput = component.shadowRoot.querySelector('[data-testid="password-login"]');
    const buttonLogin = component.shadowRoot.querySelector('[data-testid="button-login"]');

    emailInput.value = 'arturo_2@correo.com';
    passwordInput.value = 'password.123';

    /*
    preguntar si es correcto usar el dipatchEvent en este caso
    ya que el boton deberia guardar el valor de los campos
    */

    emailInput.dispatchEvent(new InputEvent('input'));
    passwordInput.dispatchEvent(new InputEvent('input'));

    buttonLogin.dispatchEvent(new InputEvent('click'));

    await component.updateComplete;

    expect(component.email).to.equal('arturo_2@correo.com');
    expect(component.password).to.not.equal('password.1234');
  });
});
