import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MarketIndices from './MarketIndices';
import StockTable from './StockTable';
import { fetchMarketIndices, fetchCompanyList } from '../services/api';
import { IndexData, CompanyData } from '../types/market';
import './Dashboard.css';

export default function Dashboard() {
  const { i18n } = useTranslation();
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [loadingIndices, setLoadingIndices] = useState(true);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    loadMarketData();

    // Refresh data every 5 minutes
    const interval = setInterval(loadMarketData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  async function loadMarketData() {
    setLoadingIndices(true);
    setLoadingCompanies(true);

    const [indicesData, companiesData] = await Promise.all([
      fetchMarketIndices(),
      fetchCompanyList()
    ]);

    setIndices(indicesData);
    setCompanies(companiesData);
    setLoadingIndices(false);
    setLoadingCompanies(false);
    setLastUpdate(new Date());
  }

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Hrisa Bourse</h1>
            <p className="tagline">Bourse de Tunis - Marché des Valeurs Mobilières</p>
          </div>

          <div className="header-actions">
            <div className="language-switcher">
              <button
                onClick={() => changeLanguage('fr')}
                className={i18n.language === 'fr' ? 'active' : ''}
              >
                FR
              </button>
              <button
                onClick={() => changeLanguage('ar')}
                className={i18n.language === 'ar' ? 'active' : ''}
              >
                AR
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={i18n.language === 'en' ? 'active' : ''}
              >
                EN
              </button>
            </div>

            <div className="last-update">
              <span className="update-label">Dernière mise à jour:</span>
              <span className="update-time">
                {lastUpdate.toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </span>
            </div>

            <button onClick={loadMarketData} className="refresh-btn" disabled={loadingIndices || loadingCompanies}>
              🔄 Actualiser
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <MarketIndices indices={indices} loading={loadingIndices} />
        <StockTable companies={companies} loading={loadingCompanies} />
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2026 Hrisa Bourse - Données en temps réel de la BVMT</p>
      </footer>
    </div>
  );
}
