import Papa from 'papaparse';
import recordCSV from './record.csv';

export const fetchData = () => {
  return new Promise((resolve, reject) => {
    Papa.parse(recordCSV, {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};