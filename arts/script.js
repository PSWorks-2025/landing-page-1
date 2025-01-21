import fetchData from '/loadJsonFile.js';
import { CreateArts } from '/setupContent.js';

fetchData(['arts'], ['/arts.json']);

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('DataLoaded', (eventInfo) => {
    // Fetch Data
    const data = eventInfo.detail;

    // Constants
    const arts = data['arts'] || data['/arts.json'];
    const artsGrid = document.getElementById('arts-grid');

    // Functions

    // Event Listeners

    // Main
    CreateArts(artsGrid, arts);
  });
});
