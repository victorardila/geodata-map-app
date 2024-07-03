import React, { useState } from "react";
import "./PaymentMarket.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import IconPaymentMarket from "../../assets/icon/icon_payment_market.png";
import BgRoutesMap from "../../assets/image/bg_route_map.jpg";

const InfoPageContent = ({ step }) => {
  const [nextStep, setNextStep] = useState(0);

  const handleNextStep = () => {
    setNextStep(nextStep + 1);
    step(nextStep);
  };

  return (
    <div
      className="info-page-content"
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
      <button className="btn-payment-market" onClick={() => handleNextStep()}>
        <span onClick={() => handleNextStep()}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </span>
        <strong onClick={() => handleNextStep()}>Continuar con la compra</strong>
      </button>
    </div>
  );
};

const PaymentMethods = ({step}) => {
  const [nextStep, setNextStep] = useState(1);

  const handleNextStep = () => {
    setNextStep(nextStep - 1);
    step(nextStep);
  };
  return (
    <div
      className="payment-methods"
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="payment-methods-options" style={{ display: "flex", width: "100%", alignItems: "flex-satrt" }}>
        <button
          className="btn-back"
          style={{ border: "none", background: "none", cursor: "pointer" }}
          onClick={() => handleNextStep()}
        >
          <span style={{ fontSize: "20px", marginRight: "10px" }} onClick={() => handleNextStep()}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
          <span style={{ fontSize: "20px" }} onClick={() => handleNextStep()}>Regresar</span>
        </button>
      </div>
      <div
        className="payment-methods-content"
        style={{ display: "flex", width: "100%", height: "-webkit-fill-available", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
      >
        <h2>Selecciona tu método de pago</h2>
        <div className="payment-methods-list">
          <div className="payment-method">
            <img
              src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg"
              alt="paypal"
            />
          </div>
          <div className="payment-method">
            <img
              src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg"
              alt="paypal"
            />
          </div>
          <div className="payment-method">
            <img
              src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg"
              alt="paypal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentMarket = ({ offer }) => {
  const [nextStep, setNextStep] = useState(0);
  return (
    <div className="payment-market">
      <div className="container-offer-payment-market">
        <div className="card-offer-payment-market">
          <div
            className="card-blur-background"
            style={{ backgroundImage: `url(${BgRoutesMap})` }}
          ></div>
          <div className="card-content">
            {/*Detalles de oferta*/}
            <h2>Resumen de la oferta</h2>
            <p>¡Aprovecha la oferta de la semana!</p>
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
