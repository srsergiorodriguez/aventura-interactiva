/**
 * Processes and optimizes an uploaded image file.
 * Clamps the maximum dimension to 1920px to prevent memory issues 
 * in the canvas and exports a lightweight WebP data URL.
 */
export function processImageFile(file) {
  return new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = (e) => {

    // --- GIF BYPASS ---
    if (file.type === 'image/gif') {
      resolve(e.target.result);
      return;
    }

    // --- STANDARD COMPRESSION FOR STATIC IMAGES ---
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      const maxSize = 1920; 

      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      ctx.drawImage(img, 0, 0, width, height);
      
      resolve(canvas.toDataURL('image/webp', 0.8));
    };
    
    img.onerror = reject;
    img.src = e.target.result;
  };

  reader.onerror = reject;
  reader.readAsDataURL(file);
  });
}

/**
 * Triggers a native browser download for a generated file blob.
 */
export function downloadFile(content, filename, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

/**
 * Spatial heuristic to determine the starting node of the story.
 * Sorts nodes by Y-coordinate (highest on canvas), using X-coordinate
 * (leftmost) as a tie-breaker.
 */
export function findStartNode(nodes) {
  if (!nodes || nodes.length === 0) return null;
  
  const sorted = nodes.slice().sort((a, b) => {
    if (a.position.y === b.position.y) {
      return a.position.x - b.position.x;
    }
    return a.position.y - b.position.y;
  });
  
  return sorted[0].id;
}

/**
 * Generates a fully self-contained HTML file containing the Aventura Engine,
 * the user's compiled story JSON, and their theme options.
 */
/**
 * Generates a fully self-contained HTML file containing the Aventura Engine,
 * the user's compiled story JSON, their theme options, and necessary dependencies.
 */
export function generateStandaloneHTML(engineString, scenesJSON, options, startNodeId, lang = 'en', miniGifString = '') {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aventura</title>
  <style>
    body {
      margin: 0; padding: 0;
      background-color: ${options.theme?.background || '#ffffff'};
      display: flex; justify-content: center;
      min-height: 100vh;
    }
    #storygeneraldiv {
      width: 100%; max-width: 600px;
      padding: 2rem 1rem;
      box-sizing: border-box;
    }
  </style>

  <script>
    ${miniGifString}
  </script>
</head>
<body>
  <script type="module">
    // Inject aventura and UI renderer
    ${engineString}
    
    // Attach to global window scope for instantiation
    window.Aventura = Aventura;
  </script>

  <script type="module">
    const scenes = ${JSON.stringify(scenesJSON)};
    const options = ${JSON.stringify(options)};
    
    // Boot aventura with the requested localization and config
    const engine = new window.Aventura('${lang}', options);
    
    // Inject text & image grammars if present
    if (typeof engine.setGrammar === 'function') {
      engine.setGrammar(options.grammar || {});
    }

    if (options.igrama && typeof engine.setIgrama === 'function') {
      engine.setIgrama(options.igrama);
    }

    engine.setScenes(scenes).startAdventure('${startNodeId}');
  </script>
</body>
</html>`;
}