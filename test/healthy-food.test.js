import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/healthy-food.js';

describe('Not and registered User, no logged in:', () => {});
describe('Given a unregistered User that opened the app', () => {
  let element;
  let root;
  
  beforeEach(async () => {
    element = await fixture(html`<healthy-food></healthy-food>`);
    root = element.shadowRoot;
  });

  it('When this user wants to create a new post, Then a register/login form should be shown', async() => {
    const btn = root.querySelector('[data-testid="publish"]');
    btn.click();

    await element.updateComplete;

    const modal = root.querySelector('[data-testid="access-form"]');
    expect(modal).to.has.property('opened', true);
  })

});
