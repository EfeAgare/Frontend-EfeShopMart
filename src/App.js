import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import './styles/index.css';
import { ThemeProvider } from '@mui/styles';
import themesConfig from "./config/theme";
import LayoutHandler from "./layouts/LayoutHandler";
import Footer from "./layouts/components/Footer";
import CartDialog from "./layouts/components/CartDialog";
import AuthDialog from "./layouts/components/AuthDialog";
import Header from "./layouts/components/Header";
import systemUrls from "./config/systemUrls";

const App = () => {
  return (

    <BrowserRouter>
      <ThemeProvider theme={themesConfig}>
        <Header
          color="dark"
          // routes={dashboardRoutes}
          brand={systemUrls.appName}
          fixed
        />
        <Routes>
          
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
        <CartDialog />
        <AuthDialog />
      </ThemeProvider>

    </BrowserRouter>
  );
};

export default App;