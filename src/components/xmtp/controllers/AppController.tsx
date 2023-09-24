import "../../.storybook/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type React from "react";
import { useEffect, useState } from "react";
import { datadogRum } from "@datadog/browser-rum";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initialize } from "../helpers/i18n";
import { ENVIRONMENT } from "../helpers";
import Inbox from "../pages/inbox";
import Index from "../pages/index";
import Dm from "../pages/dm";

const AppController: React.FC = () => {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    const initI18n = async () => {
      await initialize();
      setInitialized(true);
    };
    void initI18n();
  }, []);

  return initialized ? (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/dm/:address" element={<Dm />} />
      </Routes>
    </Router>
  ) : null;
};

export default AppController;
