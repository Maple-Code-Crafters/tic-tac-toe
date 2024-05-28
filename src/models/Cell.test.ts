import { Cell } from './Cell';

describe('Cell', () => {
  let cell: Cell;

  beforeEach(() => {
    cell = new Cell(0);
  });

  test('should initialize with correct index', () => {
    expect(cell.index).toBe(0);
  });

  test('should initialize with undefined value', () => {
    expect(cell.value).toBeUndefined();
  });

  test('should set value if not already set', () => {
    cell.value = 'X';
    expect(cell.value).toBe('X');
  });

  test('should not set value if already set', () => {
    cell.value = 'X';
    cell.value = 'O';
    expect(cell.value).toBe('X');
  });

  test('should convert cell to archived format correctly', () => {
    cell.value = 'X';
    cell.className = 'horizontal';

    const archivedCell = cell.toArchived();

    expect(archivedCell.index).toBe(0);
    expect(archivedCell.value).toBe('X');
    expect(archivedCell.className).toBe('horizontal');
  });
});
