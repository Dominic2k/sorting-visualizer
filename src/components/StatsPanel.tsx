import React, { useState, useEffect } from 'react';
import { statisticsApi, type StatisticsResponse } from '../api/statisticsApi';
import { historyApi, type HistoryResponse } from '../api/historyApi';
import './StatsPanel.css';

interface StatsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'statistics' | 'history';
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ isOpen, onClose, type }) => {
  const [stats, setStats] = useState<StatisticsResponse[]>([]);
  const [history, setHistory] = useState<HistoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        if (type === 'statistics') {
          const data = await statisticsApi.getAllStatistics();
          setStats(data);
        } else {
          const data = await historyApi.getHistory(0, 20);
          setHistory(data.content);
        }
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isOpen, type]);

  if (!isOpen) return null;

  return (
    <div className="stats-panel-overlay" onClick={onClose}>
      <div className="stats-panel" onClick={(e) => e.stopPropagation()}>
        <button className="stats-panel-close" onClick={onClose}>×</button>
        
        <h2>{type === 'statistics' ? '📊 My Statistics' : '📜 Sorting History'}</h2>
        
        {loading && <div className="stats-loading">Loading...</div>}
        
        {error && <div className="stats-error">{error}</div>}
        
        {!loading && !error && type === 'statistics' && (
          <div className="stats-grid">
            {stats.length === 0 ? (
              <p className="stats-empty">No statistics yet. Run some sorts to see your data!</p>
            ) : (
              stats.map((stat) => (
                <div key={stat.algorithmName} className="stat-card">
                  <h3>{stat.algorithmName}</h3>
                  <div className="stat-row">
                    <span>Total Runs</span>
                    <strong>{stat.totalRuns}</strong>
                  </div>
                  <div className="stat-row">
                    <span>Avg Comparisons</span>
                    <strong>{stat.avgComparisons}</strong>
                  </div>
                  <div className="stat-row">
                    <span>Avg Swaps</span>
                    <strong>{stat.avgSwaps}</strong>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        
        {!loading && !error && type === 'history' && (
          <div className="history-list">
            {history.length === 0 ? (
              <p className="stats-empty">No history yet. Run some sorts to track your progress!</p>
            ) : (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Algorithm</th>
                    <th>Size</th>
                    <th>Comparisons</th>
                    <th>Swaps</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h) => (
                    <tr key={h.id}>
                      <td>{h.algorithmName}</td>
                      <td>{h.arraySize}</td>
                      <td>{h.comparisonCount}</td>
                      <td>{h.swapCount}</td>
                      <td>{h.executionTimeMs}ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
