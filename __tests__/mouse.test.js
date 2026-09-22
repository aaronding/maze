const Mouse = require('../mouse.js');

describe('Mouse movement', () => {
  test('go and back adjust position and history', () => {
    const m = new Mouse();

    expect(m.currentPosition).toEqual({ x: 0, y: 0 });
    m.go('e');
    expect(m.currentPosition).toEqual({ x: 1, y: 0 });
    expect(m.hasVisitied({ x: 1, y: 0 })).toBe(true);

    m.back();
    expect(m.currentPosition).toEqual({ x: 0, y: 0 });
  });

  test('opposite direction mapping', () => {
    const m = new Mouse();
    expect(m.getOppositeDirection('n')).toBe('s');
    expect(m.getOppositeDirection('s')).toBe('n');
    expect(m.getOppositeDirection('e')).toBe('w');
    expect(m.getOppositeDirection('w')).toBe('e');
  });
});

