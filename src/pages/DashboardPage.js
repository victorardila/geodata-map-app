import React from "react";
import Layout from "../components/app/Layout";
import MapView from "../components/app/map/MapView";

function Dashboard({ path }) {
  return (
    <Layout>
      {path === "dashboard/map" ? (
        <MapView />
      ) : null}
    </Layout>
  );
}

export default Dashboard;
