import { useMemo } from 'react';
import { EXTRA_FIELDS, TField } from '../../definitions/ImportFields';
import { useAppSelector } from '../../store';
import {
  selectUniqueSvgParts,
  selectSvgError,
  selectSvgLoading,
} from '../../SvgViz/svgVizSelectors';

export default function useImportFields() {
  const reduxUniqueParts = useAppSelector(selectUniqueSvgParts);
  const loading = useAppSelector(selectSvgLoading);
  const error = useAppSelector(selectSvgError);

  // Build your raw fields
  const rawFields: TField[] = useMemo(
    () => [
      ...reduxUniqueParts.map((name) => ({ name: `${name} score` })),
      ...EXTRA_FIELDS, // any other fields defined in the ImportFields file
    ],
    [reduxUniqueParts]
  );

  const importFields = useMemo(
    () =>
      rawFields.map((field) => ({
        label: field.name.charAt(0).toUpperCase() + field.name.slice(1),
        key: field.name,
        fieldType: { type: 'input' },
        example: field.example ?? '0.76',
      })),
    [rawFields]
  );

  return { importFields, rawFields, loading, error };
}
