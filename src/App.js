import Routes from "./Routes";
import { GlobalStateProvider } from "./hooks/GlobalStateContext";
import "./App.css";

function App() {
  return (
    <div className="App">
      <GlobalStateProvider>
        <Routes />
      </GlobalStateProvider>
    </div>
  );
}

export default App;
