export function clickFadeOut(className: string) {
  const coverBoxes = document.querySelectorAll(className);
  coverBoxes.forEach((box) => {
    box.addEventListener('click', () => {
      box.classList.add('fade');
    });
  });
}

export function createGridItems(totalItems: number) {
  const gridContainer = document.getElementById('overlay');

  if (gridContainer) {
    gridContainer.innerHTML = ''; // Clear existing items

    for (let i = 1; i <= totalItems; i++) {
      const item = document.createElement('div');
      item.classList.add('gridItem');
      item.textContent = `${i}`;
      gridContainer.appendChild(item);
    }
  } else {
    console.error('Grid container not found');
  }
}

export function handleEscapePress(): void {
  const imageCanvas = document.getElementById('resized') as HTMLElement;
  if (document.fullscreenElement) {
    return;
  } else {
    imageCanvas.style.width = '50rem';
  }
}

export function ToggleFullScreen(): void {
  const appElement = document.getElementById('container') as HTMLElement;
  const imageCanvas = document.getElementById('resized') as HTMLElement;
  const attributionElement = document.getElementById(
    'attribution'
  ) as HTMLElement;

  if (!document.fullscreenElement) {
    imageCanvas.style.width = '79rem';
    attributionElement.style.display = 'none';
    appElement?.requestFullscreen().catch((err) => {
      console.error(
        `Error attempting to enable fullscreen mode: ${err.message}`
      );
    });
    const children = appElement.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      child.style.width = '100%';
    }
  } else {
    document.exitFullscreen();
    imageCanvas.style.width = '50rem';
    attributionElement.style.display = 'block';
    attributionElement.style.width = 'fit-content';
  }
}

export async function resizeImage(imagePath: string): Promise<void> {
  const img = new Image();
  const canvas = document.getElementById('resized') as HTMLCanvasElement;

  // Ensure the canvas is found
  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }

  const ctx = canvas.getContext('2d');

  // Check if the context is available
  if (!ctx) {
    console.error('Failed to get 2D context');
    return;
  }

  // Create a promise to load the image
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    });
  };

  try {
    // Await the image loading
    await loadImage(imagePath);

    // Set canvas dimensions to fill the container
    const containerWidth = canvas.parentElement?.clientWidth || 0;
    const containerHeight = canvas.parentElement?.clientHeight || 0;
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // Draw the image to fit the canvas
    ctx.drawImage(img, 0, 0, containerWidth, containerHeight);
  } catch (error) {
    console.error(error);
  }
}
