import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import KmxGalon from "../../../../assets/data/KmxGalon.json";
import "./CalculationView.css";

const CalculationView = ({ distance, time, route, graph, cost }) => {
  const cities = Object.keys(graph);

  // Función para construir la tabla de matriz de adyacencia
  const buildMatrixTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            {cities.length > 0 &&
              cities.map((city) => <th key={city}>{city}</th>)}
          </tr>
        </thead>
        <tbody>
          {cities.map((city1) => (
            <tr key={city1}>
              <th>{city1}</th>
              {cities.map((city2) => (
                <td key={city2}>
                  {city1 === city2
                    ? "0"
                    : (graph[city1][city2] || "∞") !== "∞"
                    ? Number(graph[city1][city2]).toFixed(3) + " km"
                    : "∞"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  const buildCostsTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Vehículo</th>
            <th>Unidad</th>
            <th>Cantidad de Galones</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(KmxGalon).map((vehicle) => (
            <tr key={vehicle}>
              <td>{vehicle}</td>
              <td>{KmxGalon[vehicle].unidad}</td>
              <td>{KmxGalon[vehicle].galon}</td>
              <td>{KmxGalon[vehicle].precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <motion.div
      className="calculation-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="calculation-container">
        <div className="calculation-title-header">
          <h1>Ruta más corta</h1>
          <FontAwesomeIcon icon={faRoad} />
        </div>
        <div className="calculation-body">
          <p>Distancia: {distance} km</p>
          {time !== null && <p>Tiempo estimado: {time} horas</p>}
          <p>Ruta: {route}</p>
          <p>Costo de ruta: ${cost}</p>
        </div>
        <div className="matrix-container">
          <div className="matrix">
            <div className="matrix-header">
              <h2>Matriz de adyacencia</h2>
            </div>
            <div className="matrix-body">{buildMatrixTable()}</div>
          </div>
        </div>
        <div className="costs-container">
          <div className="costs">
            <div className="costs-header">
              <h2>Costos de combustible</h2>
            </div>
            <div className="costs-body">{buildCostsTable()}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CalculationView;
