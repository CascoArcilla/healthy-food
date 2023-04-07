import { fixture, html, expect } from '@open-wc/testing';
import '../src/templates/pw-register-form.js';

describe('Receive an email and a password with requirements', () => {
    let component;
    let users = [
        { name: 'hugo', correo: 'hugo_1@correo.com' },
        { name: 'arturo', correo: 'arturo_1@correo.com' },
        { name: 'juli', corro: 'juli_1@correo.com'}
    ];

    beforeEach(async () => {
        component = await fixture(html`<pw-register-form></pw-register-form>`);
    });

    it('When the name input is changes, then name property is update', async () => {
        const inputNamen = component.shadowRoot.querySelector('[data-testid="name-register"]');

        inputNamen.value = 'Norberto';
        inputNamen.dispatchEvent(new InputEvent('input'));

        await component.updateComplete;

        expect(component.nombre).to.equal('Norberto');
    });

    it('When the email input is equal to an existing one, then notify the user', async () => {
        const inputEmail = component.shadowRoot.querySelector('[data-testid="email-register"]');

        inputEmail.value = 'arturo_1@correo.com';
        inputEmail.dispatchEvent(new InputEvent('input'));

        await component.updateComplete;

        let isFound = false;
        users.forEach(element => {
            if (component.email === element.correo) {
                isFound = true;
                return;
            }
        });

        expect(isFound).to.equal(true);
    });

    it('When the email input is NOT equal to an existing one, then notify the user', async () => {
        const inputEmail = component.shadowRoot.querySelector('[data-testid="email-register"]');

        inputEmail.value = 'persona_1@correo.com';
        inputEmail.dispatchEvent(new InputEvent('input'));

        await component.updateComplete;

        let isFound = false;
        users.forEach(element => {
            if (component.email === element.correo) {
                isFound = true;
            }
        });

        expect(isFound).to.equal(false);
    });

    it('When the passwords are equalas, then register a new user', async () => {
        const passwordOne = component.shadowRoot.querySelector('[data-testid="password-register"]');
        const passwordTwo = component.shadowRoot.querySelector('[data-testid="verified-password-regiter"]');

        passwordOne.value = 'password.123';
        passwordOne.dispatchEvent(new InputEvent('input'));
        passwordTwo.value = 'password.123';
        passwordTwo.dispatchEvent(new InputEvent('input'));

        await component.updateComplete;

        expect(component.password).to.equal(component.verifiedPassword);
    });

    it('When the passwords are not equalas, then notify user', async () => {
        const passwordOne = component.shadowRoot.querySelector('[data-testid="password-register"]');
        const passwordTwo = component.shadowRoot.querySelector('[data-testid="verified-password-regiter"]');

        passwordOne.value = 'password.123';
        passwordOne.dispatchEvent(new InputEvent('input'));
        passwordTwo.value = 'password.124';
        passwordTwo.dispatchEvent(new InputEvent('input'));

        await component.updateComplete;

        expect(component.password).to.not.equal(component.verifiedPassword);
    });
});
