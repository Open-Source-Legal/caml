/**
 * US States Tile Grid Map Data
 *
 * Each state is positioned on an 11-column x 8-row grid that approximates
 * the geographic layout of the United States. This approach avoids the
 * complexity of SVG geographic paths while remaining readable at small sizes.
 *
 * Grid coordinates are [column, row] where (0, 0) is top-left.
 */

export interface StateGridEntry {
  code: string;
  name: string;
  col: number;
  row: number;
}

export const US_STATES_GRID: StateGridEntry[] = [
  // Row 0
  { code: "AK", name: "Alaska", col: 0, row: 0 },
  { code: "ME", name: "Maine", col: 10, row: 0 },

  // Row 1
  { code: "WI", name: "Wisconsin", col: 5, row: 1 },
  { code: "VT", name: "Vermont", col: 9, row: 1 },
  { code: "NH", name: "New Hampshire", col: 10, row: 1 },

  // Row 2
  { code: "WA", name: "Washington", col: 0, row: 2 },
  { code: "ID", name: "Idaho", col: 1, row: 2 },
  { code: "MT", name: "Montana", col: 2, row: 2 },
  { code: "ND", name: "North Dakota", col: 3, row: 2 },
  { code: "MN", name: "Minnesota", col: 4, row: 2 },
  { code: "IL", name: "Illinois", col: 5, row: 2 },
  { code: "MI", name: "Michigan", col: 6, row: 2 },
  { code: "NY", name: "New York", col: 8, row: 2 },
  { code: "MA", name: "Massachusetts", col: 9, row: 2 },
  { code: "CT", name: "Connecticut", col: 10, row: 2 },

  // Row 3
  { code: "OR", name: "Oregon", col: 0, row: 3 },
  { code: "NV", name: "Nevada", col: 1, row: 3 },
  { code: "WY", name: "Wyoming", col: 2, row: 3 },
  { code: "SD", name: "South Dakota", col: 3, row: 3 },
  { code: "IA", name: "Iowa", col: 4, row: 3 },
  { code: "IN", name: "Indiana", col: 5, row: 3 },
  { code: "OH", name: "Ohio", col: 6, row: 3 },
  { code: "PA", name: "Pennsylvania", col: 7, row: 3 },
  { code: "NJ", name: "New Jersey", col: 8, row: 3 },
  { code: "RI", name: "Rhode Island", col: 9, row: 3 },

  // Row 4
  { code: "CA", name: "California", col: 0, row: 4 },
  { code: "UT", name: "Utah", col: 1, row: 4 },
  { code: "CO", name: "Colorado", col: 2, row: 4 },
  { code: "NE", name: "Nebraska", col: 3, row: 4 },
  { code: "MO", name: "Missouri", col: 4, row: 4 },
  { code: "KY", name: "Kentucky", col: 5, row: 4 },
  { code: "WV", name: "West Virginia", col: 6, row: 4 },
  { code: "VA", name: "Virginia", col: 7, row: 4 },
  { code: "MD", name: "Maryland", col: 8, row: 4 },
  { code: "DE", name: "Delaware", col: 9, row: 4 },

  // Row 5
  { code: "AZ", name: "Arizona", col: 1, row: 5 },
  { code: "NM", name: "New Mexico", col: 2, row: 5 },
  { code: "KS", name: "Kansas", col: 3, row: 5 },
  { code: "AR", name: "Arkansas", col: 4, row: 5 },
  { code: "TN", name: "Tennessee", col: 5, row: 5 },
  { code: "NC", name: "North Carolina", col: 6, row: 5 },
  { code: "SC", name: "South Carolina", col: 7, row: 5 },
  { code: "DC", name: "District of Columbia", col: 8, row: 5 },

  // Row 6
  { code: "OK", name: "Oklahoma", col: 3, row: 6 },
  { code: "LA", name: "Louisiana", col: 4, row: 6 },
  { code: "MS", name: "Mississippi", col: 5, row: 6 },
  { code: "AL", name: "Alabama", col: 6, row: 6 },
  { code: "GA", name: "Georgia", col: 7, row: 6 },

  // Row 7
  { code: "HI", name: "Hawaii", col: 0, row: 7 },
  { code: "TX", name: "Texas", col: 3, row: 7 },
  { code: "FL", name: "Florida", col: 7, row: 7 },
];

/** Number of columns in the tile grid */
export const GRID_COLS = 11;

/** Number of rows in the tile grid */
export const GRID_ROWS = 8;

/** Default fill color for states without assigned status */
export const NEUTRAL_STATE_COLOR = "#e2e8f0";
