import React from 'react';
import { GiveConsent, CollectedConsents } from './features/consent';
import styles from './app.module.scss';
import Button from '@mui/material/Button';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/give-consent" />} />
        <Route exact path="/give-consent" element={<Layout><GiveConsent /></Layout>} />
        <Route exact path="/collected-consents" element={<Layout><CollectedConsents /></Layout>} />
      </Routes>
    </Router>)
}

function Layout({ children }) {
  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <Link to="/give-consent">
          <Button variant="contained" color="primary">Give consent</Button>
        </Link>
        <Link to="/collected-consents">
          <Button variant="contained" color="primary">Collected consents</Button>
        </Link>
      </aside>

      <section className={styles.content}>
        {children}
      </section>
    </div>
  );
}

export default App;
