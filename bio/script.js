import fetchData from '../loadJsonFile.js';
import { CreateBio } from '../setupContent.js';

fetchData(['bio'], ['../bio.json']);

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('DataLoaded', (eventInfo) => {
    // Add Style Properties
    document.body.style.setProperty('--scroll', window.scrollY);

    // Fetch Data
    const data = eventInfo.detail;

    // Constants

    const sections = data['bio'] || data['../bio.json'];
    const bioDisplay = document.getElementById('bio-display');

    // Functions

    // Event Listeners
    window.addEventListener(
      'scroll',
      () => {
        document.body.style.setProperty('--scroll', window.scrollY);
      },
      false
    );

    // Main
    CreateBio(bioDisplay, sections);
  });
});
