import { Provider } from "react-redux";
import "./App.css";
import AppRoutes from "./routes/router";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="w-screen bg-gray-100 min-h-screen flex flex-col">
        <AppRoutes />
      </div>
    </Provider>
  );
}

export default App;
