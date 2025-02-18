export function CreateGallery(grid, gallery) {
  Object.entries(gallery)
    .map((entry) => [entry[0].slice(5), entry[1]])
    .sort((a, b) => a[0] - b[0])
    .forEach(([key, item]) => {
      const child = document.createElement("div");
      child.style.gridColumn = `span ${item.column}`;
      child.style.gridRow = `span ${item.row}`;

      const button = document.createElement("button");
      button.style.backgroundImage = `url(${item.imageUrl})`;
      button.classList.add('gallery-button'); 

      button.addEventListener('click', () => {
        const itemData = encodeURIComponent(JSON.stringify(item)); 
        window.location.href = `./display/index.html?data=${itemData}`; 
      });

      button.innerHTML = `
        <div class="tag">
          <div class="name-date">
            <div class="name">psdevwork</div>
            <div class="date">${item.date}</div>
          </div>
          <hr/>
          <div class="title">${item.title}</div>
        </div>
      `;

      child.appendChild(button);
      grid.appendChild(child);
    });
}

export function CreateNews(newsDisplay, news) {
  Object.entries(news)
    .sort((a, b) => b[0] - a[0])
    .forEach(([key, value]) => {
      const year = document.createElement("li");
      year.classList.add("year");
      year.innerHTML = key;
      newsDisplay.appendChild(year);
      Object.entries(value)
        .map((entry) => [entry[0].slice(6), entry[1]])
        .sort((a, b) => a[0] - b[0])
        .forEach(([key, item]) => {
          const newsItem = document.createElement("li");
          newsItem.classList.add("news-item");

          // Set up the click event to redirect and pass item information
          newsItem.addEventListener("click", () => {
            const itemData = encodeURIComponent(JSON.stringify(item)); // Convert item to a string
            window.location.href = `/display/index.html?data=${itemData}`; // Pass data as a query parameter
          });

          newsItem.innerHTML = `
            <div class="date">
              <div class="day-container">
                <div class="day">${item.day}</div>
              </div>
              <div class="month-container">
                <div class="month">${item.month}</div>
              </div>
            </div>
            <div class="title">${item.title}</div>
          `;
          newsDisplay.appendChild(newsItem);
        });
    });
}

export function CreateArts(artsDisplay, arts) {
  Object.entries(arts)
    .map((entry) => [entry[0].slice(4), entry[1]])
    .sort((a, b) => a[0] - b[0])
    .forEach(([key, item]) => {
      const art = document.createElement("div");
      art.classList.add("grid-item");
      art.style.backgroundImage = `url(${item.imageUrl})`;

      art.addEventListener("click", () => {
        const itemData = encodeURIComponent(JSON.stringify(item)); // Convert item to a string
        window.location.href = `/display/index.html?data=${itemData}`; // Pass data as a query parameter
      });

      art.innerHTML = `
        <div class="tag">
          <div class="title">${item.title}</div>
        </div>`;
      
      artsDisplay.appendChild(art);
    });
}

export function CreateBio(bioDisplay, sections) {
  Object.entries(sections)
  .map((entry) => [entry[0].slice(8), entry[1]])
  .sort((a, b) => a[0] - b[0])
  .forEach(([key, item]) => {
    const section = document.createElement("div");
    section.classList.add("section");
    section.style.height = item.height;
    if (!item.overlay) {
      section.style.display = 'flex';
    }
    section.innerHTML = Object.entries(item.parts)
      .map((entry) => {
        return [entry[0].slice(5), entry[1]];
      })
      .sort((a, b) => a[0] - b[0])
      .map(([key, value]) => {
        if (value.type === "image") {
          return `
          <div class="part" style="width: ${value.width};${item.overlay ? ` margin-top: ${parseFloat(item.height) * -key}px;` : ``}">
            <div
              style="
                  --start: ${value.startEffect};
                  --range: ${value.rangeEffect};
                  --moving-range: ${value.movingRange};
                  --zooming-range: ${parseFloat(value.zoomingRange)/100};
                  background-image: url(${value.imageUrl});
                "
              class="${value.scrollEffectType}"></div>
            </div>
          `;
        }
        else if (value.type === "text") {
          return `
          <div class="part" style="width: ${value.width};${item.overlay ? ` margin-top: ${parseFloat(item.height) * -key}px;` : ``}">
            <div
              style="
                  --start: ${value.startEffect};
                  --range: ${value.rangeEffect};
                  --moving-range: ${value.movingRange};
                  --zooming-range-per: ${value.zoomingRange};
                  --zooming-range-dec: ${parseFloat(value.zoomingRange)/100};
                "
              class="${value.scrollEffectType}">
              <div class="text-display" style="text-align: ${value.align}; color: ${value.color};">${value.text}</div>
            </div>
          </div>
          `;
        }
      })
      .join('');
    bioDisplay.appendChild(section);
  });
}
