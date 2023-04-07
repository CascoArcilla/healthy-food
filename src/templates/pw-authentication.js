import { LitElement, html, css } from 'lit';
import '@vaadin/button';
import '@vaadin/dialog';
import './pw-login-form';
import './pw-register-form';

class PwAuthentication extends LitElement {
  static get properties() {
    return {
      isLogin: { type: Boolean }
    };
  }

  static styles = css`
    :host {}
    h2, h3 {
      text-align: center;
      color: rgb(129 129 129 / 87%);
      font-family: "Elephant";
    }
    hr {
      width: 100%;
      height: 2px;
      border: none;
      background-color: #cfcfcf;
      box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2);
    }
    vaadin-button {
      margin: 20px;
    }
    .pw-authentication-contenct {
      width: 400px;
      display: flex;
      align-items: stretch;
      flex-direction: column;
    }
    @media (max-width: 920px){
      .pw-authentication-contenct {
        width: 300px;
      }
    }
  `;

  constructor() {
    super();
    this.isLogin = true;
  }

  toggleModal() {
    this.isLogin = !this.isLogin;
  }

  /*
  se cambio la linea de aqui, poruqe el componenete ya posee un form
  <form><pw-login-form></pw-login-form></form>
  */

  render() {
    return html`
      <div class = "pw-authentication-contenct">
        ${this.isLogin
        ? html`
              <h2>HealthyFood</h2>
              <h3>Login</h3>
              <pw-login-form></pw-login-form>
              <br />
              <hr />
              <vaadin-button @click="${this.toggleModal}">
                Cambiar a Registro
              </vaadin-button>
              <br />
            `
        : html`
              <h2>HealthyFood</h2>
              <h3>Registro</h3>
              <pw-register-form></pw-register-form>
              <br />
              <hr />
              <vaadin-button @click="${this.toggleModal}">
                Cambiar a Login
              </vaadin-button>
              <br />
          `}
      </div>
    `;
  }
}

customElements.define('pw-authentication', PwAuthentication);
/*
<form>
  <label>
    Nombre:
    <input type="text" required />
  </label>
  <label>
    Email:
    <input type="email" required />
  </label>
  <label>
    Contraseña:
    <input type="password" required />
  </label>
  <label>
    Confirme contraseña:
    <input type="password" required />
  </label>
  <button type="submit">Registrarse</button>
</form>
*/