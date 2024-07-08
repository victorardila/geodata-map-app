import React, { useState } from "react";
import PaymentMethods from "../../assets/data/PaymentMethods.json";

const DropDownRadius = () => {
  const [indexDropDown, setIndexDropDown] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handleOnClick = (index) => {
    return () => {
      setIndexDropDown(index);
      setSelectedPaymentMethod(index);
    };
  };

  return (
    <div
      className="dropdowns-radius"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      {PaymentMethods.map((paymentMethod, index) => (
        <div key={index} style={{ width: "100%", height: "fit-content" }}>
          <div
            className="payment-methods-item"
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "50px",
              justifyContent: "flex-start",
              alignItems: "center",
              border: "1px solid #dfdfdf",
              borderLeft: selectedPaymentMethod === index ? "8px solid green" : "8px solid #dfdfdf",
              borderRadius: "5px",
              backgroundColor:
                selectedPaymentMethod === index ? "#d4f5d4" : "white", // Cambia de color si está seleccionado
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor =
                selectedPaymentMethod === index ? "#d4f5d4" : "#f5f5f5";
              e.target.style.cursor = "pointer";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor =
                selectedPaymentMethod === index ? "#d4f5d4" : "white";
            }}
            onClick={handleOnClick(index)}
          >
            <input
              type="radio"
              name="payment-method"
              checked={selectedPaymentMethod === index}
              readOnly
              style={{
                width: "20px",
                height: "20px",
                margin: "0 10px",
              }}
            />
            <span>{paymentMethod.title}</span>
          </div>
          {indexDropDown === index && selectedPaymentMethod === index ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "400px",
                borderTop: "0",
                borderRadius: "0 0 5px 5px",
              }}
            >
              <p>{paymentMethod.description}</p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default DropDownRadius;