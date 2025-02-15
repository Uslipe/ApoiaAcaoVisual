import React from 'react';
import { Link } from 'react-router-dom';
import './resources/login.css';

export default function Login() {
  return (
    <div className="login-page">
      <div className="main">
        <div className="login">
          <form>
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input type="email" name="email" placeholder="Email" required="" />
            <input type="password" name="pswd" placeholder="Senha" required="" />
            <button>Entrar</button>
            <p className="toggle-text">
              Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}