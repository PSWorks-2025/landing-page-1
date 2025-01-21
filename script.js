import fetchData from '/loadJsonFile.js';
import { UpdateSize, UpdatePosition, AddEventListeners, Animate, RedirectAnimation, SetupAnimation } from '/animation.js';
import { CreateGallery } from '/setupContent.js';

fetchData(['gallery'], ['/gallery.json']);

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('DataLoaded', (eventInfo) => {
    // Fetch Data
    const data = eventInfo.detail;

    // Constants

    const gallery = data['gallery'] || data['/gallery.json'];
    const grid = document.getElementById('grid');

    // Functions

    const EventListener = (event) => {
      event.preventDefault();

      RedirectAnimation(grid, event.target, EventListener);
    };

    // Event Listeners

    window.addEventListener('resize', () => {
      UpdateSize(grid);
      UpdatePosition(grid);
    });

    // Main
    CreateGallery(grid, gallery);
    AddEventListeners(grid, EventListener);
    SetupAnimation(grid);

    UpdateSize(grid);
    Animate(grid);
  });
});
