// export functions: Sleep, SetupAnimation, UpdateSize, UpdatePosition, Animate

export function Sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function SetupAnimation(grid) {
  Array.from(grid.children).forEach((child) => {
    const rect = child.getBoundingClientRect();

    const grandchild = child.firstElementChild;

    grandchild.style.top = `${-rect.height}px`;

    grandchild.style.left = `${
      Math.random() * screen.width * 2 - screen.width / 2
    }px`;
  });
}

export function UpdateSize(grid) {
  Array.from(grid.children).forEach((child) => {
    const rect = child.getBoundingClientRect();

    const grandchild = child.firstElementChild;

    grandchild.style.width = `${rect.width}px`;

    grandchild.style.height = `${rect.height}px`;
  });
}

export function UpdatePosition(grid) {
  Array.from(grid.children).forEach((child) => {
    const rect = child.getBoundingClientRect();

    const grandchild = child.firstElementChild;

    grandchild.style.top = `${rect.top + window.scrollY}px`;

    grandchild.style.left = `${rect.left + window.scrollX}px`;
  });
}

export function Animate(grid) {
  Array.from(grid.children)
    .slice()
    .reverse()
    .forEach(async (child, index) => {
      await Sleep(Math.random() * 150 * index + 500);

      const rect = child.getBoundingClientRect();

      const grandchild = child.firstElementChild;

      grandchild.style.top = `${rect.top + window.scrollY}px`;

      grandchild.style.left = `${rect.left + window.scrollX}px`;
    });
}

export function AddEventListeners(grid, EventListener) {
  Array.from(grid.children).forEach((child) => {
    const grandchild = child.firstElementChild;

    grandchild.addEventListener("click", EventListener);
  });
}

export function RedirectAnimation(grid, element, EventListenerToRemove) {
  Array.from(grid.children).forEach((child) => {
    const grandchild = child.firstElementChild;
    grandchild.removeEventListener("click", EventListenerToRemove);

    if (grandchild === element) {
      return;
    }

    const targetRect = element.getBoundingClientRect();
    const affectedRect = grandchild.getBoundingClientRect();

    grandchild.style.top = `${
      2 * affectedRect.top - targetRect.top + Math.random() * 100 - 50
    }px`;

    grandchild.style.left = `${
      2 * affectedRect.left - targetRect.left + Math.random() * 100 - 50
    }px`;

    grandchild.style.opacity = "0";
  });

  setTimeout(() => {
    window.location.href = element.dataset.url;
  }, 200);
}
