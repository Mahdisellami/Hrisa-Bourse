import { CompanyData } from '../types/market';

interface StockTableProps {
  companies: CompanyData[];
  loading: boolean;
}

export default function StockTable({ companies, loading }: StockTableProps) {
  // Group companies by sector
  const groupedBySector = companies.reduce((acc, company) => {
    if (!acc[company.sector]) {
      acc[company.sector] = [];
    }
    acc[company.sector].push(company);
    return acc;
  }, {} as Record<string, CompanyData[]>);

  const sectors = Object.keys(groupedBySector).sort();

  if (loading) {
    return (
      <div className="stock-table loading">
        <div className="loading-spinner">Chargement des sociétés...</div>
      </div>
    );
  }

  return (
    <div className="stock-table">
      <h2>Cotations</h2>

      {companies.length === 0 ? (
        <div className="no-data">
          <p>Aucune cotation disponible</p>
          <p className="hint">Les cotations seront affichées une fois la connexion au marché établie</p>
        </div>
      ) : (
        <div className="sectors-container">
          {sectors.map((sector) => (
            <div key={sector} className="sector-group">
              <h3 className="sector-title">{sector}</h3>
              <table className="companies-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Nom</th>
                    <th>Cours</th>
                    <th>Var.</th>
                    <th>Var. %</th>
                    <th>Volume</th>
                    <th>Plus Haut</th>
                    <th>Plus Bas</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedBySector[sector].map((company) => (
                    <tr key={company.ticker} className="company-row">
                      <td className="ticker">{company.ticker}</td>
                      <td className="name">{company.name}</td>
                      <td className="price">
                        {company.price ? company.price.toFixed(3) : '-'}
                      </td>
                      <td className={`change ${company.change ? (company.change >= 0 ? 'positive' : 'negative') : ''}`}>
                        {company.change !== undefined ? (company.change >= 0 ? '+' : '') + company.change.toFixed(3) : '-'}
                      </td>
                      <td className={`change-percent ${company.changePercent ? (company.changePercent >= 0 ? 'positive' : 'negative') : ''}`}>
                        {company.changePercent !== undefined ? (company.changePercent >= 0 ? '+' : '') + company.changePercent.toFixed(2) + '%' : '-'}
                      </td>
                      <td className="volume">
                        {company.volume ? company.volume.toLocaleString() : '-'}
                      </td>
                      <td className="high">
                        {company.high ? company.high.toFixed(3) : '-'}
                      </td>
                      <td className="low">
                        {company.low ? company.low.toFixed(3) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
