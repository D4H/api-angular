/**
 * Photo Blob Factory
 * =============================================================================
 * @see https://stackoverflow.com/a/34670057/1433400
 */

export function Photo(
  { name, type }: { name?: string, type?: string } = { name: '', type: 'image/jpeg' }
): Blob {
  return new File([''], name, { type });
}
