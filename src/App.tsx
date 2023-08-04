import { AuthContextProvider } from "./context";
import { MainStackRouter } from "./router";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <MainStackRouter />
      </AuthContextProvider>
    </div>
  );
}

export default App;
