import React, { useEffect, useState } from "react";
import Position from "../../assets/data/Positions.json";
import Awns from "../../assets/data/Awns.json";
// import Costs from "../../assets/costs/Costs.json";
import MapView from "./map-model/MapView";
import CalculationView from "./calculation-card/CalculationView";
import Costs from "../../assets/data/Costs.json";
import { motion } from "framer-motion";
import KmxGalon from "../../assets/data/KmxGalon.json";
import "./AlgorithmDijkstra.css";

const AlgorithmDijkstra = ({
  checkNodes,
  checkSeeRoute,
  cardOption,
  cityOrigin,
  cityDestinity,
  transport,
  onEstimtedTime,
  onEstimtedDistance,
  onNumberNodes,
  onRoute,
  onCost,
}) => {
  const [startNode, setStartNode] = useState("Valledupar");
  const [endNode, setEndNode] = useState("Valledupar");
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [graph, setGraph] = useState({});
  const [routeArray, setRouteArray] = useState([]);
  const [nodeList, setNodeList] = useState([]);
  const [cost, setCost] = useState(0);

  //Se usa este hook para calcular la ruta más corta
  useEffect(() => {
    function findShortestPath() {
      var start;
      var end;
      if (cityOrigin.city !== undefined && cityDestinity.city !== undefined) {
        start = cityOrigin.city;
        end = cityDestinity.city;
        const graph = buildGraph();
        console.log(graph);
        const optimalRoute = dijkstra(graph, start, end, Costs);
        if (optimalRoute.distance > 0) {
          setGraph(graph);
          const distance = optimalRoute.distance.toFixed(2);
          onEstimtedDistance(distance);
          setDistance(optimalRoute.distance.toFixed(2));
        } else {
          onEstimtedDistance(0);
          setDistance(0);
        }
        if (optimalRoute.path.length > 0) {
          onNumberNodes(optimalRoute.path.length);
          setNodeList(optimalRoute.path);
          console.log(optimalRoute.path);
        } else {
          onNumberNodes(0);
          setNodeList([]);
        }
        if (transport) {
          const averageSpeed = parseFloat(transport.Velocidad); // Convertir la velocidad a número
          const time = distance / averageSpeed;
          setTime(time.toFixed(2));
          onEstimtedTime(time.toFixed(2));
          let cost = 0;
          if (KmxGalon[transport.Tipo]) {
            const precio = KmxGalon[transport.Tipo].precio;
            if (transport.Tipo === "Avión") {
              // Fórmula para Avión: (distancia * galon del avión) / 100
              cost = (distance * precio) / 100;
            } else {
              if (transport.Tipo === "Bus") {
                // Fórmula para Bus: (distancia * precio * delta * 2)
                const delta = optimalRoute.path.length / 100;
                cost = distance * precio * delta * 2;
              }else{
                // Otras formas de transporte: distancia * galon del transporte
                cost = distance * precio;
              }
            }
          }
          setCost(cost.toFixed(3));
          onCost(cost.toFixed(3));
        } else {
          setTime(0);
          onEstimtedTime(0);
        }
      } else {
        start = startNode;
        end = endNode;
        console.log("No hay ciudades seleccionadas");
      }
    }

    function buildGraph() {
      const graph = {};
      for (const location in Position) {
        graph[location] = {};
        for (const neighbor of Awns[location]) {
          const neighborName = Object.keys(Position)[neighbor - 1]; // El JSON está basado en 1-index, ajustar a 0-index
          const lat1 = Position[location].lat;
          const lon1 = Position[location].lon;
          const lat2 = Position[neighborName].lat;
          const lon2 = Position[neighborName].lon;
          const distance = haversine(lat1, lon1, lat2, lon2);
          graph[location][neighborName] = distance;
        }
      }
      return graph;
    }
    function haversine(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radio de la Tierra en kilómetros
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }
    function dijkstra(graph, start, end, costs) {
      const distances = {};
      const visited = {};
      const parents = {};
      const queue = [...Object.keys(graph)];

      // Inicializar las distancias con infinito y el nodo inicial con distancia 0
      for (const node of queue) {
        distances[node] = Infinity;
      }
      distances[start] = 0;

      while (queue.length) {
        const current = queue.reduce((min, node) =>
          distances[node] < distances[min] ? node : min
        );

        const neighbors = graph[current];

        for (const neighbor in neighbors) {
          const distance = distances[current] + neighbors[neighbor];
          if (distance < distances[neighbor]) {
            distances[neighbor] = distance;
            parents[neighbor] = current;
          }
        }

        visited[current] = true;
        queue.splice(queue.indexOf(current), 1);
      }

      const path = [end];
      let current = end;
      while (current !== start) {
        path.unshift(parents[current]);
        current = parents[current];
      }

      // Calcular el costo total al desplazarse en la ruta óptima
      let totalCost = 0;
      for (let i = 0; i < path.length - 1; i++) {
        const currentNode = path[i];
        const nextNode = path[i + 1];
        totalCost += costs[currentNode][nextNode];
      }

      return { distance: distances[end], path, totalCost };
    }
    findShortestPath();
  }, [
    startNode,
    endNode,
    distance,
    cityOrigin,
    cityDestinity,
    transport,
    onEstimtedDistance,
    onNumberNodes,
    onEstimtedTime,
    onCost,
  ]);
  //Se usa este hook para enviar la ruta al componente padre
  useEffect(() => {
    if (nodeList.length > 0) {
      const route = nodeList.join(" -> ");
      setRouteArray(route);
      onRoute(route);
    } else {
      onRoute("No hay ruta");
    }
  }, [nodeList, onRoute]);

  return (
    <motion.div
      className="container-map"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {cardOption ? (
        <CalculationView
          distance={distance}
          time={time}
          route={routeArray}
          graph={graph}
          cost={cost}
        />
      ) : (
        <MapView
          route={routeArray}
          checkNodes={checkNodes}
          checkSeeRoute={checkSeeRoute}
          transport={transport}
        />
      )}
    </motion.div>
  );
};

export default AlgorithmDijkstra;
