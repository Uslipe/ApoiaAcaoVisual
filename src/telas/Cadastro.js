import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './resources/signup.css';

export default function Cadastro() {
    return (
        <div className="signup-page">
          <div className="main">
            <div className="signup">
              <form>
                <label htmlFor="chk" aria-hidden="true">Cadastre-se</label>
                <input type="text" name="txt" placeholder="Usuario" required="" />
                <input type="email" name="email" placeholder="Email" required="" />
                <input type="password" name="pswd" placeholder="Senha" required="" />
                <button>Cadastrar</button>
                <p className="toggle-text">
                  Já tem uma conta? <Link to="/login">Faça login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      );
    }