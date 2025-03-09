/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import "./resources/style.css";
import logo from "./images/logo_doar.png";
import whatsapp from "./images/whatssapp.svg";

export default function Footer() {
  return (
    <>
      {/* footer */}
      <footer id="footer" className="footer">
        <div className="footer-content">
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
            <img src={logo} alt="Logo" />
          </div>
          <div>
            <p>&copy; 2025 ApoiaAção.</p>
            <p> Todos os direitos reservados.</p>
          </div>
        </div>

        <div className="footer-sobre">
          <div className="Box-texto">
            <div className="titulo">
              <strong>PAGAMENTO</strong>
            </div>
            <ul className="ulbox">
              <li className="pag-img">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pag-link"
                >
                  <img
                    src="https://down-br.img.susercontent.com/file/a65c5d1c5e556c6197f8fbd607482372"
                    alt="logo"
                  />
                </a>
              </li>
              <li className="pag-img">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pag-link"
                >
                  <img
                    src="https://down-br.img.susercontent.com/file/95d849253f75d5e6e6b867af4f7c65aa"
                    alt="logo"
                  />
                </a>
              </li>
              <li className="pag-img">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pag-link"
                >
                  <img
                    src="https://down-br.img.susercontent.com/file/5ee8fb5f33fdf1e42ea32b86f47f54c4"
                    alt="logo"
                  />
                </a>
              </li>
              <li className="pag-img">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pag-link"
                >
                  <img
                    src="https://down-br.img.susercontent.com/file/br-11134258-7r98o-lxsovyseln7jc5"
                    alt="logo"
                  />
                </a>
              </li>
              <li className="pag-img">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pag-link"
                >
                  <img
                    src="https://down-br.img.susercontent.com/file/285e5ab6207eb562a9e893a42ff7ee46"
                    alt="logo"
                  />
                </a>
              </li>
              <li className="pag-img">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pag-link"
                >
                  <img
                    src="https://down-br.img.susercontent.com/file/44734b7fc343eb46237c2d90c6c9ca60"
                    alt="logo"
                  />
                </a>
              </li>
              <li className="pag-img">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pag-link"
                >
                  <img
                    src="https://down-br.img.susercontent.com/file/2a2cfeb34b00ef7b3be23ea516dcd1c5"
                    alt="logo"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="Box-texto">
            <span className="footer-text">
              <div className="titulo">
                <strong>ATENDIMENTO AO CLIENTE</strong>
              </div>
              <ul className="ulbox">
                <li>
                  <a>Central de ajuda</a>
                </li>
                <li>
                  <a>Como Cadastrar</a>
                </li>
                <li>
                  <a>Métodos de pagamentos</a>
                </li>
                <li>
                  <a>Fale conosco</a>
                </li>
              </ul>
            </span>
          </div>
          <div className="Box-texto">
            <span className="footer-text">
              <div className="titulo">
                <strong>SOBRE A APOIAAÇÃO</strong>
              </div>
              <ul className="ulbox">
                <li>
                  <a>Sobre Nós</a>
                </li>
                <li>
                  <a>Políticas ApoiaAção</a>
                </li>
                <li>
                  <a>Políticas de privacidade</a>
                </li>
                <li>
                  <a>Seja um colaborador</a>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </footer>

      {/* button whatsapp */}
      <a
        href="https://wa.me/5555208120900?text=Sobre%20mais%20informa%C3%A7%C3%B5e%20acerca%20do%20ApoiaA%C3%A7%C3%A3o%20fale%20conosco"
        className="btn-whatsapp"
        target="_blank"
      >
        <img src={whatsapp} alt="Botao whatsapp" />
        <span className="tooltip-text">Fale conosco</span>
      </a>
    </>
  );
}
