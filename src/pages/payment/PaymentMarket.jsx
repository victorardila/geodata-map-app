import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./PaymentMarket.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import IconPaymentMarket from "../../assets/icon/icon_payment_market.png";
import BgRoutesMap from "../../assets/gif/MapGif.gif";
import OfferContainer from "../../components/common/OffersContainer";
import DropDownsRadius from "../../components/common/DropDownsRadius";

const InfoPageContent = ({ step }) => {
  const location = useLocation();
  const { offer } = location.state || {};
  const handleNextStep = () => {
    step(1); // Cambia el paso a 1 para avanzar
  };

  return (
    <div className="info-page-content">
      <h2>¿Qué es Payment Market?</h2>
      <p>
        Payment Market es una plataforma de pagos en línea que te permite
        realizar tus compras de manera segura y rápida. Con Payment Market
        podrás realizar tus compras en línea de manera segura y rápida.
      </p>
      <h2>¿Cómo funciona?</h2>
      <p>
        Para realizar una compra en línea con Payment Market, solo debes
        seleccionar el producto que deseas comprar, agregarlo al carrito de
        compras y proceder a realizar el pago. Una vez realizado el pago,
        recibirás un correo electrónico con la confirmación de tu compra.
      </p>
      <h2>¿Qué beneficios ofrece?</h2>
      <p>
        Con Payment Market podrás realizar tus compras en línea de manera segura
        y rápida. Además, podrás disfrutar de promociones y descuentos
        exclusivos en tus compras en línea.
      </p>
      <p>
        ¡No esperes más y comienza a disfrutar de los beneficios de Payment
        Market!
      </p>
      {offer !== undefined ? (
        <button className="btn-payment-market" onClick={handleNextStep}>
          <FontAwesomeIcon icon={faShoppingCart} />
          <strong>Continuar con la compra</strong>
        </button>
      ) : null}
    </div>
  );
};

const PaymentMethods = ({ step }) => {
  const location = useLocation();
  const { offer } = location.state || {};
  const handlePreviousStep = () => {
    step(0); // Cambia el paso a 0 para retroceder
  };

  return (
    <div className="payment-methods">
      <div className="payment-methods-options">
        <button className="btn-back" onClick={handlePreviousStep}>
          <FontAwesomeIcon icon={faAngleLeft} />
          <span>Regresar</span>
        </button>
      </div>
      <div className="payment-methods-title">
        <h2>Finalizar compra</h2>
      </div>
      <div className="billing-details-container">
        <h2>Detalles de facturación</h2>
        <div className="billing-details">
          <div className="billing-details-form">
            <div className="form-group">
              <label htmlFor="name">
                Nombre<small>*</small>
              </label>
              <input type="text" id="name" placeholder="Nombre" />
              <label htmlFor="lastname">
                Apellido<small>*</small>
              </label>
              <input type="text" id="lastname" placeholder="Apellido" />
            </div>
            <div className="form-group">
              <label htmlFor="cedula">
                Numero de cedula<small>*</small>
              </label>
              <input type="text" id="cedula" placeholder="Cedula" />
            </div>
            <div className="form-group">
              <label htmlFor="contry-region">
                Pais/Region<small>*</small>
              </label>
              <select id="contry-region">
                <option value="ecuador">Ecuador</option>
                <option value="colombia">Colombia</option>
                <option value="peru">Peru</option>
                <option value="chile">Chile</option>
                <option value="argentina">Argentina</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="department">
                Provincia / departamento<small>*</small>
              </label>
              <select id="department">
                <option value="pichincha">Pichincha</option>
                <option value="guayas">Guayas</option>
                <option value="azuay">Azuay</option>
                <option value="tungurahua">Tungurahua</option>
                <option value="manabi">Manabi</option>
              </select>
              <label htmlFor="city">
                Ciudad<small>*</small>
              </label>
              <select id="city">
                <option value="quito">Quito</option>
                <option value="guayaquil">Guayaquil</option>
                <option value="cuenca">Cuenca</option>
                <option value="ambato">Ambato</option>
                <option value="manta">Manta</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="address">
                Dirección<small>*</small>
              </label>
              <input
                type="text"
                id="address"
                placeholder="Calle, Manzana, Lote, Apartamento, Casa o Suite"
              />
              <label htmlFor="zip-code">
                Código Postal<small>(opcional)</small>
              </label>
              <input type="text" id="zip-code" placeholder="Código Postal" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">
                Número de teléfono<small>*</small>
              </label>
              <input type="text" id="phone" placeholder="Teléfono" />
              <label htmlFor="email">
                Correo electrónico<small>*</small>
              </label>
              <input type="email" id="email" placeholder="Correo" />
            </div>
          </div>
        </div>
      </div>
      <div className="payment-container">
        <h2>Revisa tu compra</h2>
        <div className="payment-content">
          <div className="payment-content-item">
            <h2>Suscripcion</h2>
            <h2>Valor</h2>
          </div>
          <div className="payment-content-item">
            <p>{offer.title}</p>
            <p>${offer.price}</p>
          </div>
          <div className="payment-content-item">
            <p>SubTotal</p>
            <p>${offer.price}</p>
          </div>
          <div className="payment-content-item">
            <p>IVA</p>
            <p>$0</p>
          </div>
          <div className="payment-content-item">
            <p>Total</p>
            <p>${offer.price}</p>
          </div>
        </div>
        <h2>¿Cómo deseas pagar?</h2>
        <div className="payment-methods">
          <DropDownsRadius />
        </div>
      </div>
    </div>
  );
};

const PaymentMarket = () => {
  const [nextStep, setNextStep] = useState(0);
  const location = useLocation();
  const { offer } = location.state || {};

  return (
    <div className="payment-market">
      <div className="container-offer-payment-market">
        <div className="card-offer-payment-market">
          <div
            className="card-blur-background"
            style={{ backgroundImage: `url(${BgRoutesMap})` }}
          ></div>
          <div className="card-content">
            {offer !== undefined ? (
              <>
                <h2>Resumen de oferta</h2>
                <p>Selecciona tu forma de pago y finaliza tu compra</p>
                <p>
                  Una vez realizado el pago, recibirás un correo electrónico con
                  la confirmación de tu compra.
                </p>
                <p>
                  En el correo electrónico encontrarás un enlace para crear tu
                  cuenta en nuestra plataforma y acceder a tu oferta.
                </p>
                <p>
                  ¡No esperes más y comienza a disfrutar de los beneficios de
                  GeoData Map!
                </p>
                <OfferContainer offer={offer} />
              </>
            ) : (
              <div className="no-offer">
                <h2>No se ha seleccionado una oferta</h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="payment-market-section">
        <div className="payment-market-container">
          <div className="payment-market-title">
            <div className="payment-market-logo">
              <h2>Payment Market</h2>
              <img src={IconPaymentMarket} alt="icon-payment-market" />
            </div>
            <p>¡Compra en línea de manera segura y rápida!</p>
          </div>
          <hr />
          <div className="payment-market-content">
            {nextStep === 0 ? (
              <InfoPageContent step={setNextStep} />
            ) : (
              <PaymentMethods step={setNextStep} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMarket;
