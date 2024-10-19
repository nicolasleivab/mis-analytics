import { useMemo } from 'react';
import { BODY_PARTS } from '../../definitions/BodyParts';
import { EXTRA_FIELDS, TField } from '../../definitions/ImportFields';

export default function useImportFields() {
  const uniqueBodyParts = [...new Set(BODY_PARTS.map((item) => item.name))];

  const rawFields: TField[] = [
    ...uniqueBodyParts.map((name) => ({ name: `${name} score` })),
    ...EXTRA_FIELDS,
  ];

  const importFields = useMemo(
    () =>
      rawFields.map((field) => ({
        label: field.name.charAt(0).toUpperCase() + field.name.slice(1),
        key: field.name,
        fieldType: {
          type: 'input',
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        example: field.example ?? '0.76',
        // validations: [
        //   {
        //     rule: "required",
        //     errorMessage: `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`,
        //     level: "error",
        //   },
        // ],
      })),
    []
  );

  return { importFields, rawFields };
}
