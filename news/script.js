import fetchData from '../loadJsonFile.js';
import { CreateNews } from '../setupContent.js';

fetchData(['news'], ['news.json']);

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('DataLoaded', (eventInfo) => {
    // Fetch Data
    const data = eventInfo.detail;

    // Constants

    const news = data['news'] || data['news.json'];
    const newsList = document.getElementById('news-list');

    // Functions

    // Event Listeners

    // Main
    CreateNews(newsList, news);
  });
});
