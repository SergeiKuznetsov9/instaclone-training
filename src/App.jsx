import { Provider } from "react-redux";
import { PagesRoutes } from "./components/PagesRoutes";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
        <PagesRoutes />
    </Provider>
  );
}

export default App;
