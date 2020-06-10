import React from "react";
import Routes from "./routes";

/** importa os estilos da pasta global */
import "./styles/global.scss";

function App() {
  return (
    <div className="App">
      {/* rotas da aplicação, endpoints */}
      <Routes />
    </div>
  );
}

export default App;
