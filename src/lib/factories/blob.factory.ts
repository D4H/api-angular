import faker from 'faker';
import { SafeUrl } from '@angular/platform-browser';

/**
 * Photo Blob Factory
 * =============================================================================
 * @see https://stackoverflow.com/a/34670057/1433400
 */

export function Blob(
  { name, type }: { name?: string, type?: string } = { name: '', type: 'image/jpeg' }
): Blob {
  return new File([''], name, { type });
}

/**
 * Photo SafeUrl Factory
 * =============================================================================
 * This saves me from having to import the DomSanitizer and extra test setup in
 * cases were I only need to assert the final return value. Never, ever gosh
 * darn ever use this piece of code in a production environment!
 *
 * @see https://angular.io/api/platform-browser/SafeUrl
 * @see https://stackoverflow.com/questions/46302873
 */

export function SafeUrl(blob: Blob = Blob()): SafeUrl {
  return {
    changingThisBreaksApplicationSecurity: URL.createObjectURL(blob)
  };
}
