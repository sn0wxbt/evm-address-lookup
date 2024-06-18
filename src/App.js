import React, { useState, useEffect } from 'react';
import { fetchData } from './data';
import Papa from 'papaparse';
import './App.css';

function App() {
  const [addresses, setAddresses] = useState('');
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  const handleInputChange = (e) => {
    setAddresses(e.target.value);
  };

  const handleSearch = () => {
    const addressList = addresses
      .split('\n')
      .map(addr => addr.trim().toLowerCase())
      .filter(addr => addr);
    const filteredResults = data
      .filter(record => addressList.includes(record.User.toLowerCase()))
      .sort((a, b) => parseFloat(b['Fees Spent']) - parseFloat(a['Fees Spent']));
    setResults(filteredResults);
  };

  const handleExport = () => {
    const csv = Papa.unparse(results);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'results.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <h1>EVM Address Lookup</h1>
      <textarea
        value={addresses}
        onChange={handleInputChange}
        placeholder="Enter EVM addresses, one per line"
        rows="10"
        cols="50"
      />
      <br />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleExport}>Export CSV</button>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Transactions</th>
            <th>Early User</th>
            <th>Durable User</th>
            <th>Fees Spent</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.Rank}</td>
              <td>{result.User}</td>
              <td>{result.Transactions}</td>
              <td>{result['Early User']}</td>
              <td>{result['Durable User']}</td>
              <td>{result['Fees Spent']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="contributors">
        <h2>Contributors</h2>
        <ul>
          <li>sn0wxbt, made dash- <a href="https://twitter.com/sn0wxbt" target="_blank" rel="noopener noreferrer">@sn0wxbt</a></li>
          <li>frank white, helped pull data - <a href="https://twitter.com/SolvingFrank" target="_blank" rel="noopener noreferrer">@SolvingFrank</a></li>
          <li>0xtoshi, provided data - <a href="https://twitter.com/0xtoshi" target="_blank" rel="noopener noreferrer">@0xtoshi</a></li>
        </ul>
      </div>
    </div>
  );
}

export default App;