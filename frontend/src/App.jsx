import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/landing";
import Authentication from "./pages/authentication";
import { AuthProvider } from "./contexts/Authcontext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Authentication />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
