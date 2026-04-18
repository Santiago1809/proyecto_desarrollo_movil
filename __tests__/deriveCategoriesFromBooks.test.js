const { deriveCategoriesFromBooks } = require('../hooks/useBooks');

describe('deriveCategoriesFromBooks', () => {
  test('extracts unique categories from mixed book data', () => {
    const books = [
      { title: 'A', categories: ['Romance', 'Terror'] },
      { title: 'B', category: 'Thriller' },
      { title: 'C', categories: ['Romance', 'Ciencia'] },
    ];
    const result = deriveCategoriesFromBooks(books);
    expect(result).toEqual(expect.arrayContaining(['Romance', 'Terror', 'Thriller', 'Ciencia']));
    expect(result.length).toBeGreaterThanOrEqual(4);
  });
  test('handles empty and missing categories gracefully', () => {
    const books = [
      { title: 'A' },
      { title: 'B', category: '' },
      { title: 'C', categories: [] },
    ];
    const result = deriveCategoriesFromBooks(books);
    expect(result).toEqual([]);
  });
});
