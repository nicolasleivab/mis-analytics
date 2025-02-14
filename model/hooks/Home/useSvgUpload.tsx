import { useState } from 'react';
import {
  setSvgParts,
  TSvgPart,
  TClipPath,
  useAppDispatch,
  setSvgThresholds,
} from '../..';
import demoViz from '../../definitions/demoViz.json';
import demoClipPaths from '../../definitions/demoClipPaths.json';
import { TStatId } from '../../definitions/Stats';
import { DEFAULT_THRESHOLD } from '../../SvgViz/definitions';

/**
 * Manages uploading of user-provided JSON files and/or using default SVG data.
 */
export default function useSvgUpload(
  setOpenImportModal: React.Dispatch<React.SetStateAction<boolean>>
) {
  const dispatch = useAppDispatch();

  // Local state for handling files and error alerts
  const [svgPartsFile, setSvgPartsFile] = useState<File | null>(null);
  const [clipPathsFile, setClipPathsFile] = useState<File | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [openSvgModal, setOpenSvgModal] = useState<boolean>(false);
  const [selectedThresholdStat, setSelectedThresholdStat] = useState<TStatId>(
    DEFAULT_THRESHOLD.stat
  );
  const [selectedThresholdValue1, setSelectedThresholdValue1] =
    useState<number>(DEFAULT_THRESHOLD.values[0]);
  const [selectedThresholdValue2, setSelectedThresholdValue2] =
    useState<number>(DEFAULT_THRESHOLD.values[1]);

  /**
   * Attempts to parse and dispatch the uploaded SVG/ClipPath JSON files.
   */
  const handleSvgPartsSubmit = async (): Promise<void> => {
    if (!svgPartsFile) {
      setShowAlert(true);
      return;
    }

    try {
      // Read/parse SVG Parts JSON
      const svgPartsText = await svgPartsFile.text();
      const svgPartsJson: TSvgPart[] = JSON.parse(svgPartsText) as TSvgPart[];

      // Read/parse optional ClipPaths JSON
      const clipPathsText = clipPathsFile ? await clipPathsFile.text() : '';
      const clipPathsJson: TClipPath[] = clipPathsFile
        ? (JSON.parse(clipPathsText) as TClipPath[])
        : [];

      // Dispatch parsed data to Redux
      dispatch(
        setSvgParts({ svgParts: svgPartsJson, clipPaths: clipPathsJson })
      );
      dispatch(
        setSvgThresholds({
          stat: selectedThresholdStat,
          values: [selectedThresholdValue1, selectedThresholdValue2],
        })
      );

      // Close the modal after successful upload
      setOpenSvgModal(false);
      setOpenImportModal(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error parsing JSON files:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      // Also close the modal if upload fails
      setOpenSvgModal(false);
      setOpenImportModal(true);
    }
  };

  /**
   * Uses demo JSON data for SVG/ClipPaths (no upload needed).
   * Body parts default viz adapted from Nan Montaño's codesandbox:
   * https://codesandbox.io/s/body-diagram-svg-spike-58g6d?file=/src/BodySvg.js:0-24179
   */
  const handleUseDefaultSvg = () => {
    dispatch(setSvgParts({ svgParts: demoViz, clipPaths: demoClipPaths }));
    dispatch(
      setSvgThresholds({
        stat: selectedThresholdStat,
        values: [selectedThresholdValue1, selectedThresholdValue2],
      })
    );
    setOpenSvgModal(false);
    setOpenImportModal(true);
  };

  return {
    // State
    svgPartsFile,
    setSvgPartsFile,
    clipPathsFile,
    setClipPathsFile,
    showAlert,
    setShowAlert,
    openSvgModal,
    setOpenSvgModal,
    setSelectedThresholdStat,
    setSelectedThresholdValue1,
    setSelectedThresholdValue2,

    // Handlers
    handleSvgPartsSubmit,
    handleUseDefaultSvg,
  };
}
