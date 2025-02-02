import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <NavBar />       
          <AppRouter />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
