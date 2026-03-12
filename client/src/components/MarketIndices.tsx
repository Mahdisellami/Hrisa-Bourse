import { IndexData } from '../types/market';

interface MarketIndicesProps {
  indices: IndexData[];
  loading: boolean;
}

export default function MarketIndices({ indices, loading }: MarketIndicesProps) {
  if (loading) {
    return (
      <div className="market-indices loading">
        <div className="loading-spinner">Chargement des indices...</div>
      </div>
    );
  }

  return (
    <div className="market-indices">
      <h2>Indices du Marché</h2>
      <div className="indices-grid">
        {indices.length === 0 ? (
          <div className="no-data">
            <p>Aucune donnée d'indice disponible</p>
            <p className="hint">Les données seront affichées une fois la connexion au marché établie</p>
          </div>
        ) : (
          indices.map((index) => (
            <div key={index.name} className="index-card">
              <div className="index-name">{index.name}</div>
              <div className="index-value">{index.value.toFixed(2)}</div>
              <div className={`index-change ${index.change >= 0 ? 'positive' : 'negative'}`}>
                <span className="change-value">
                  {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
                </span>
                <span className="change-percent">
                  ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
