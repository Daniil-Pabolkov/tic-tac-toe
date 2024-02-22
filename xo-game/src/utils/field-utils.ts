import type { FieldInterface } from '@app/field';
import { Field } from '@app/field';

export function fillFieldByTemplate<CellContent = unknown>(
   field: FieldInterface<CellContent>,
   template: string | ParsedTemplate,
   markersMap?: string[] | Map<string, CellContent>
): FieldInterface<CellContent> {
   const map = markersMap instanceof Map ? markersMap : new Map();

   if (markersMap instanceof Array) {
      markersMap.forEach(marker => map.set(marker, marker));
   }

   const parsed = typeof template === 'string'
      ? parseTemplate(template, map.size === 0 ? void 0 : [...map.keys()])
      : template;

   if (!markersMap) {
      parsed.markers.forEach(marker => map.set(marker, marker));
   }

   parsed.cells.forEach((cells, marker) => {
      if (!map.has(marker)) {
         return;
      }

      const content = map.get(marker)!;

      cells.forEach(({ row, col }) => {
         field.getCell(row, col).setContent(content);
      });
   });

   return field;
}

export function createFieldFromTemplate<CellContent = unknown>(
   template: string | ParsedTemplate,
   markersMap?: string[] | Map<string, CellContent>,
): FieldInterface<CellContent> {
   const parsedTemplate = typeof template === 'string' ? parseTemplate(template) : template;
   return fillFieldByTemplate(new Field<CellContent>(parsedTemplate.size), parsedTemplate, markersMap);
}

export function parseTemplate(string: string, markers?: string[]): ParsedTemplate {
   const rows = string
      .replaceAll(/(^\s+)|(\s+$)/g, '')
      .replaceAll(/(^\s*)|(\s*$)/gim, '')
      .split('\n');

   const parsed: ParsedTemplate = {
      cells: new Map(),
      markers: new Set(),
      size: rows.length,
   };

   rows.forEach((row, rowIndex) => {
      const cells = row.split(/\s+/g);

      parsed.size = Math.max(parsed.size, cells.length);

      cells.forEach((marker, colIndex) => {
         if (markers && !markers.includes(marker)) {
            return;
         }

         parsed.markers.add(marker);

         if (!parsed.cells.has(marker)) {
            parsed.cells.set(marker, []);
         }

         parsed.cells.get(marker)!.push({
            row: rowIndex,
            col: colIndex,
         });
      });
   });

   return parsed;
}

interface ParsedTemplate {
   cells: Map<string, { row: number, col: number }[]>;
   markers: Set<string>;
   size: number;
}