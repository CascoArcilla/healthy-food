import { LitElement, html, css } from 'lit-element';
import '@vaadin/button';
import '@vaadin/password-field';
import '@vaadin/email-field';
import '@vaadin/text-field';

class PwResgiterForm extends LitElement {
  static get properties() {
    return {
      nomnbre: { type: String },
      email: { type: String },
      password: { type: String },
      verifiedPassword: { type: String },
      errorMessage: { type: String },
    };
  }
  static styles = css`
      form {
        display: flex;
        flex-direction: column;
      }
      .message-form {
        display: block;
        text-align: center;
        font-size: 25px;
        border-radius: 0.5rem;
        margin-top: 1rem;
      }
      .error {
        background-color: #ffceceab;
        color: #878787;
      }
      .good {
        background-color: #b5ffb5ab;
        color: #737373;
      }
    `;

  constructor() {
    super();
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.verifiedPassword = '';
    this.errorMessage = '';
    this.expresion = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[.#$%&_-]).{10,}$/;
    this.colorError = true;
  }

  handleSubmit(event) {
    //console.log(event);
    event.preventDefault();

    if (this.email !== '' && this.nombre !== '') {

      /*
      Comprobar que el email no sea uno igual al de la base de datos
      */

      if (this.password !== '' && this.verifiedPassword !== '' && this.expresion.test(this.password)) {
        this.colorError = false;
        this.errorMessage = 'Registrando usuario, revise su correo'
      } else {
        this.colorError = true;
        this.errorMessage = 'Debe crear contraseña valida';
      }
    } else {
      this.colorError = true;
      this.errorMessage = 'Debe ingresar su nombre y un email';
    }

  }

  render() {
    return html`
      <form @submit="${this.handleSubmit}">
        <vaadin-text-field
        data-testid="name-register"
        label="Nombre"
        helper-text="Ingrese su nombre completo"
        error-message="Es necesario poner su nombre"
        @input="${e => (this.nombre = e.target.value)}"
        @change="${e => (this.errorMessage = '')}"
        .value="${this.nombre}"
        required
        ></vaadin-text-field>

        <vaadin-email-field
          label="Email"
          data-testid="email-register"
          helper-text="Revise que su correo electrónico sea el correcto."
          .value="${this.email}"
          @input="${e => (this.email = e.target.value)}"
          @change="${e => (this.errorMessage = '')}"
          error-message="Ingrese una dirección válida de email."
          required
        ></vaadin-email-field>

        <vaadin-password-field
          label="Contraseña"
          data-testid="password-register"
          helper-text="Se pide un mínimo de 10 caracteres e incluir al menos un caracter especial, una letra y un número."
          pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[.#$%&_-]).{10,}$"
          .value="${this.password}"
          @input="${e => (this.password = e.target.value)}"
          @change="${e => (this.errorMessage = '')}"
          error-message="La contraseña no es valida"
          required
        ></vaadin-password-field>

        <vaadin-password-field
          label="Verificar Contraseña"
          data-testid="verified-password-regiter"
          helper-text="Coloca otra vez la misma contraseña"
          pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[.#$%&_-]).{10,}$"
          .value="${this.verifiedPassword}"
          @input="${e => (this.verifiedPassword = e.target.value)}"
          @change="${e => (this.errorMessage = '')}"
          error-message="Este campo tambien deber ser llenado"
          required
        ></vaadin-password-field>

        <div class="message-form ${this.colorError ? 'error' : 'good'}">${this.errorMessage}</div>
        
        <br />
        <vaadin-button @click="${this.handleSubmit}">Registrar</vaadin-button>
      </form>
    `;
  }
}
customElements.define('pw-register-form', PwResgiterForm);
