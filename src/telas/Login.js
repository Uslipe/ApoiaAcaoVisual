import React from 'react';
import './form.css';

export default function Login() {
  return (
    <div className="login-page">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form>
            <label htmlFor="chk" aria-hidden="true">Cadastre-se</label>
            <input type="text" name="txt" placeholder="Usuario" required="" />
            <input type="email" name="email" placeholder="Email" required="" />
            <input type="password" name="pswd" placeholder="Senha" required="" />
            <button>Cadastrar</button>
          </form>
        </div>

        <div className="login">
          <form>
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input type="email" name="email" placeholder="Email" required="" />
            <input type="password" name="pswd" placeholder="Senha" required="" />
            <button>Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}