import { LitElement, html, css } from 'lit-element';
import '@vaadin/button';
import '@vaadin/password-field';
import '@vaadin/email-field';

class PwLoginForm extends LitElement {
  static get properties() {
    return {
      email: { type: String },
      password: { type: String },
      errorMessage: { type: String },
    };
  }

  static styles = css`
    :host { 
    }
    form {
      display: flex;
      flex-direction: column;
    }
    .error-message {
      display: block;
      text-align: center;
      font-size: 25px;
      background-color: #ffafaf91;
      border-radius: 0.5rem;
      margin-top: 1rem;
      color: #878787;
    }
  `;

  /*
    static get styles() {
      return css`
        form {
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }
        vaadin-text-button {
          margin: 20px;
        }
      `;
    }
  */

  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.errorMessage = '';
    this.correctLogin = false;
  }

  handleSubmit(event) {
    //console.log(event);
    event.preventDefault();
    
    // Envía una petición para comprobar que las credenciales email y password son correctas.
    // Si sí lo son, (email y password correctos), redirije al usuario a su /feed?/tablero?
    // Si no lo son, (email y password incorrectos), muestra un mensaje de error.

    if (this.email !== '' && this.password !== '') {
      /*
      Si el email no existe, notificar usiario
      Su el email existe infresar a su feed
      */
      if (!this.correctLogin) {
        this.errorMessage = 'Credenciales invalidas';
      }

    } else {
      this.errorMessage = 'Llene los campos';
    }

  }

  render() {
    return html`
      <form @submit="${this.handleSubmit}">
        <vaadin-email-field
          label="Email"
          data-testid="email-login"
          helper-text="Revise que su correo electrónico sea el correcto."
          .value="${this.email}"
          @input="${e => (this.email = e.target.value)}"
          @change="${e => (this.errorMessage = '')}"
          error-message="Ingrese una dirección válida de email."
          required
        ></vaadin-email-field>

        <vaadin-password-field
          label="Contraseña"
          data-testid="password-login"
          helper-text="Ingrese su contraseña para iniciar secion"
          .value="${this.password}"
          @input="${e => (this.password = e.target.value)}"
          @change="${e => (this.errorMessage = '')}"
          error-message="No es una contraseña válida."
          required
        ></vaadin-password-field>
        
        <div class="error-message">${this.errorMessage}</div>
        <br />
        <vaadin-button
          data-testid="button-login"
          @click="${this.handleSubmit}"
        >
        Ingresar
        </vaadin-button>
      </form>
    `;
  }
}
customElements.define('pw-login-form', PwLoginForm);
