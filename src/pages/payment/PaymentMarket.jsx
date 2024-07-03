import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./PaymentMarket.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import IconPaymentMarket from "../../assets/icon/icon_payment_market.png";
import BgRoutesMap from "../../assets/image/bg_route_map.jpg";
import OfferContainer from "../../components/common/OffersContainer";

const InfoPageContent = ({ step }) => {
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
      <button className="btn-payment-market" onClick={handleNextStep}>
        <FontAwesomeIcon icon={faShoppingCart} />
        <strong>Continuar con la compra</strong>
      </button>
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
      <div className="payment-methods-content">
        <h2>Selecciona tu método de pago</h2>
        <div className=""></div>
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
            <h2>Resumen de oferta</h2>
            <p>Haz clic en la oferta para continuar con la compra</p>
            <OfferContainer offer={offer} />
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
