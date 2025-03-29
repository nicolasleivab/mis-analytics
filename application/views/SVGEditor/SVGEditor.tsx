import { useState } from 'react';
import { FileInput, Flex, Input, Text } from '@mantine/core';
import { CustomButton, SvgViz } from '../../../presentation/components';
import {
  TSvgPart,
  setHoveredPart,
  setSvgParts,
  useAppDispatch,
} from '../../../model';
import * as styles from './SVGEditor.module.css';

export default function SVGEditor() {
  const [rawSvg, setRawSvg] = useState<string>(''); // Keep the raw SVG text
  const [shapes, setShapes] = useState<TSvgPart[]>([]); // Parsed shapes
  const dispatch = useAppDispatch();

  const handleFileUpload = (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;
      const svgText = e.target.result as string;
      setRawSvg(svgText);
    };
    reader.readAsText(file);
  };

  const parseSvgText = (svgText: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const paths = Array.from(doc.querySelectorAll('path'));

    return paths.map((path, i) => ({
      name: `shape-${i}`,
      id: path.getAttribute('id') ?? `shape-${i}`,
      path: path.getAttribute('d') ?? '',
      className: path.getAttribute('class') ?? '',
      innerClass: '',
      transform: path.getAttribute('transform') ?? '',
      outerTransform: '',
      innerTransform: '',
      partTransform: '',
    }));
  };

  const handlePreview = () => {
    if (!rawSvg) return;
    const parsedShapes = parseSvgText(rawSvg);
    setShapes(parsedShapes);
    dispatch(setSvgParts({ svgParts: parsedShapes, clipPaths: [] }));
  };

  const updateShape = (index: number, updatedFields: Partial<TSvgPart>) => {
    setShapes((prev) => {
      const newShapes = [...prev];
      newShapes[index] = { ...newShapes[index], ...updatedFields };
      return newShapes;
    });
  };

  const handleExportJson = () => {
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
    <Flex className={styles.SVGEditor} direction="column" gap="md">
      <Text component="h1" fw={600} size={'24px'}>
        SVG Editor
      </Text>

      <Text>
        You can upload an SVG image file here and edit its fields to match your
        data. Each name field should be matched with the corresponding column in
        your XLSX file. This will be used during the import phase in the Home
        tab. The file can be previewed and edited, then exported with your
        changes. The exported JSON can be used directly in the app’s data import
        process.
      </Text>
      <div style={{ width: '30%', marginTop: 50 }}>
        <FileInput
          accept="image/svg+xml"
          onChange={handleFileUpload}
          placeholder="Upload SVG"
        />
      </div>

      {/* Buttons row */}
      <Flex gap="md">
        <CustomButton variant="secondary" onClick={handlePreview}>
          Preview
        </CustomButton>
        <CustomButton onClick={handleExportJson}>Export JSON</CustomButton>
      </Flex>

      {/* Editable shapes list */}
      {shapes.length > 0 && (
        <Flex gap="xl">
          <SvgViz
            selected={[]}
            onPartClick={(part: string) => console.log('Clicked path:', part)}
            stats={[]}
          />
          <Flex
            direction="column"
            gap="md"
            mt="lg"
            w="50%"
            h="700px"
            style={{ overflowY: 'auto' }}
          >
            <Text fw={700}>Edit Shapes:</Text>
            {shapes.map((shape, i) => (
              <Flex
                key={i}
                direction="column"
                gap="xs"
                p="sm"
                style={{ border: '1px solid #ccc', borderRadius: '4px' }}
                onMouseEnter={() => dispatch(setHoveredPart(shape.name))}
              >
                <Text fw={600}>{`Shape ${i + 1}`}</Text>
                <Flex gap="xs" wrap="wrap">
                  <label>Name:</label>
                  <Input
                    style={{ flex: 1 }}
                    value={shape.name}
                    onChange={(e) => updateShape(i, { name: e.target.value })}
                  />
                </Flex>
                <Flex gap="xs" wrap="wrap">
                  <label>ID:</label>
                  <Input
                    style={{ flex: 1 }}
                    value={shape.id}
                    onChange={(e) => updateShape(i, { id: e.target.value })}
                  />
                </Flex>
                <Flex gap="xs" wrap="wrap">
                  <label>Path (d):</label>
                  <Input
                    style={{ flex: 1 }}
                    value={shape.path}
                    onChange={(e) => updateShape(i, { path: e.target.value })}
                  />
                </Flex>
                {/* Can be expanded with more fields (transform, className, etc.)  */}
              </Flex>
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
