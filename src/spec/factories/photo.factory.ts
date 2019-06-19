/**
 * Photo Blob Factory
 * =============================================================================
 * @see https://stackoverflow.com/a/34670057/1433400
 *
 * Yes, I'm that lazy.
 */

interface Photo {
  name: string;
  type: string;
}

export function Photo(
  { name, type }: Partial<Photo> = { name: '', type: 'image/jpeg' }
): Blob {
  return new File([''], name, { type });
}
