/**
 * Generates an asymmetric layout pattern for the bento grid
 * Creates organic, flowing patterns by varying between:
 * - Large images (2x2) and small images (1x1)
 * - Different arrangements (large left, large right, clusters)
 */

export interface ImageLayout {
  id: number;
  src: string;
  alt: string;
  colSpan: string;
  rowSpan: string;
}

const LARGE_SPAN = "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2";
const LARGE_ROW = "row-span-1 sm:row-span-2 md:row-span-2 lg:row-span-2";
const SMALL_SPAN = "col-span-1";
const SMALL_ROW = "row-span-1";

/**
 * Pattern variations to create asymmetry:
 * Pattern 0: Large left (2x2), 2 small right
 * Pattern 1: 2 small left, large right (2x2)
 * Pattern 2: Large left (2x2), 3 small right
 * Pattern 3: 3 small left, large right (2x2)
 * Pattern 4: 4 small photos in a row
 * Pattern 5: 1 small, large right (2x2), 2 small
 * Pattern 6: Large left (2x2), 1 small, then 2 small below
 */
const PATTERNS = [
  [LARGE_SPAN, LARGE_ROW, SMALL_SPAN, SMALL_ROW, SMALL_SPAN, SMALL_ROW],
  [SMALL_SPAN, SMALL_ROW, SMALL_SPAN, SMALL_ROW, LARGE_SPAN, LARGE_ROW],
  [LARGE_SPAN, LARGE_ROW, SMALL_SPAN, SMALL_ROW, SMALL_SPAN, SMALL_ROW, SMALL_SPAN, SMALL_ROW],
  [SMALL_SPAN, SMALL_ROW, SMALL_SPAN, SMALL_ROW, SMALL_SPAN, SMALL_ROW, LARGE_SPAN, LARGE_ROW],
  [SMALL_SPAN, SMALL_ROW, SMALL_SPAN, SMALL_ROW, SMALL_SPAN, SMALL_ROW, SMALL_SPAN, SMALL_ROW],
  [SMALL_SPAN, SMALL_ROW, LARGE_SPAN, LARGE_ROW, SMALL_SPAN, SMALL_ROW, SMALL_SPAN, SMALL_ROW],
  [LARGE_SPAN, LARGE_ROW, SMALL_SPAN, SMALL_ROW],
];

export function generateAsymmetricLayout(imagePaths: string[]): ImageLayout[] {
  const layouts: ImageLayout[] = [];
  let patternIndex = 0;
  let imageIndex = 0;

  while (imageIndex < imagePaths.length) {
    const currentPattern = PATTERNS[patternIndex % PATTERNS.length];
    const patternLength = currentPattern.length / 2; // Each pattern has colSpan + rowSpan pairs
    
    // Apply current pattern
    for (let i = 0; i < patternLength && imageIndex < imagePaths.length; i++) {
      const colSpanIndex = i * 2;
      const rowSpanIndex = i * 2 + 1;
      
      layouts.push({
        id: imageIndex + 1,
        src: imagePaths[imageIndex],
        alt: `Travel photo ${imageIndex + 1}`,
        colSpan: currentPattern[colSpanIndex] || SMALL_SPAN,
        rowSpan: currentPattern[rowSpanIndex] || SMALL_ROW,
      });
      
      imageIndex++;
    }
    
    patternIndex++;
  }

  return layouts;
}
