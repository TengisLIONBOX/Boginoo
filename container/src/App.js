import "./App.css";
import { Home } from "./home/home";
import { Login } from "./login/loginpage";
import { Signup } from "./signup/signuppage";
import { Forgotpass } from "./forgotpass/forgotpassbody";
import { Footer } from "./footer";
import { Header } from "./header";
import { History } from "./story/history";
import { U } from "./u";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Footer />
        <U />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpass" element={<Forgotpass />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
