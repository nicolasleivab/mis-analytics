import { useState } from 'react';
import * as styles from './SVGEditor.module.css';

type ShapeConfig = {
  name: string;
  id: string;
  path: string;
  className: string;
  innerClass: string;
  transform: string;
  outerTransform: string;
  innerTransform: string;
  partTransform: string;
};

export default function SVGEditor() {
  const [shapes, setShapes] = useState<ShapeConfig[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;
      const svgText = e.target.result as string;
      parseSVG(svgText);
    };
    reader.readAsText(file);
  };

  const parseSVG = (svgText: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const paths = Array.from(doc.querySelectorAll('path'));

    const initialShapes = paths.map((path, i) => ({
      name: `shape-${i}`,
      id: path.getAttribute('id') || `shape-${i}`,
      path: path.getAttribute('d') || '',
      className: path.getAttribute('class') || '',
      innerClass: '',
      transform: path.getAttribute('transform') || '',
      outerTransform: '',
      innerTransform: '',
      partTransform: '',
    }));

    setShapes(initialShapes);
  };

  const updateShape = (index: number, updatedFields: Partial<ShapeConfig>) => {
    setShapes((prev) => {
      const newShapes = [...prev];
      newShapes[index] = { ...newShapes[index], ...updatedFields };
      return newShapes;
    });
  };

  const downloadJson = () => {
    const jsonString = JSON.stringify(shapes, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'shapes-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.SVGEditor}>
      <input type="file" accept="image/svg+xml" onChange={handleFileUpload} />

      {shapes.map((shape, i) => (
        <div key={i}>
          <label>Name</label>
          <input
            value={shape.name}
            onChange={(e) => updateShape(i, { name: e.target.value })}
          />

          <label>ID</label>
          <input
            value={shape.id}
            onChange={(e) => updateShape(i, { id: e.target.value })}
          />

          <label>Path (d)</label>
          <input
            value={shape.path}
            onChange={(e) => updateShape(i, { path: e.target.value })}
          />

          {/* Similarly for transform, className, etc. */}
        </div>
      ))}

      <button onClick={downloadJson}>Export JSON</button>
    </div>
  );
}
