import React from "react";
import { Link } from 'react-router-dom';
import './resources/style.css';

export default function Footer() {
  return (
    <>
      {/* footer */}
      <footer className="footer">
          <div className="footer-icons">
              <a href="#">
                  <i className="fa-brands fa-instagram fa-2x"></i>
             </a>
              <a href="#">
                  <i className="fa-brands fa-facebook fa-2x"></i>
              </a>
              <a href="#">
                  <i className="fa-brands fa-tiktok fa-2x"></i>
              </a>
          </div>

          <div>
              <img 
              src="./images/logo_doar.png" 
              alt="logo doar" />
          </div>

          <p>&copy; 2025 ApoiaAção. Todos os direitos reservados.</p>

      </footer>

      {/* button whatsapp */}
      <a href="https://wa.me/5555208120900?text=Sobre%20mais%20informa%C3%A7%C3%B5e%20acerca%20do%20ApoiaA%C3%A7%C3%A3o%20fale%20conosco" 
      className="btn-whatsapp" 
      target="_blank">
      <img src="assets/whatssapp.svg" alt="Botao whatsapp" />
      <span className="tooltip-text">Fale conosco</span>
      </a>
    </>
  );
}