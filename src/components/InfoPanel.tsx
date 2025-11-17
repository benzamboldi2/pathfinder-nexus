import type { SearchResult } from '@/types/map';

interface InfoPanelProps {
  results: SearchResult[];
  onFocus: (result: SearchResult) => void;
}

const InfoPanel = ({ results, onFocus }: InfoPanelProps) => {
  if (results.length === 0) {
    return <p className="empty-state">Use the search bar to explore routes.</p>;
  }

  return (
    <ul className="info-panel" aria-label="Search results">
      {results.map((result) => (
        <li key={result.id}>
          <button type="button" onClick={() => onFocus(result)}>
            <strong>{result.name}</strong>
            <span>{result.description}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default InfoPanel;
