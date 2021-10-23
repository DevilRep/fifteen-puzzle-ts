import AnimatedCell from '../src/cellDecorators/AnimatedCell';

test('adding direction class when move started: move right', () => {
    const cell: AnimatedCell = new AnimatedCell({
        display: '1',
        position: 1,
        move: jest.fn().mockResolvedValue(Promise.resolve()),
        moveWhileShuffling: jest.fn().mockResolvedValue(Promise.resolve())
    })
    cell.move(2)
    expect(cell.style.classes).toEqual(['animate__slideOutRight'])
})

test('adding direction class when move started: move down', () => {
    const cell: AnimatedCell = new AnimatedCell({
        display: '1',
        position: 1,
        move: jest.fn().mockResolvedValue(Promise.resolve()),
        moveWhileShuffling: jest.fn().mockResolvedValue(Promise.resolve())
    })
    cell.move(5)
    expect(cell.style.classes).toEqual(['animate__slideOutDown'])
})

test('adding direction class when move started: move left', () => {
    const cell: AnimatedCell = new AnimatedCell({
        display: '2',
        position: 2,
        move: jest.fn().mockResolvedValue(Promise.resolve()),
        moveWhileShuffling: jest.fn().mockResolvedValue(Promise.resolve())
    })
    cell.move(1)
    expect(cell.style.classes).toEqual(['animate__slideOutLeft'])
})

test('adding direction class when move started: move up', () => {
    const cell: AnimatedCell = new AnimatedCell({
        display: '5',
        position: 5,
        move: jest.fn().mockResolvedValue(Promise.resolve()),
        moveWhileShuffling: jest.fn().mockResolvedValue(Promise.resolve())
    })
    cell.move(1)
    expect(cell.style.classes).toEqual(['animate__slideOutUp'])
})

test('adding position class after move', async () => {
    const cell: AnimatedCell = new AnimatedCell({
        display: '1',
        position: 1,
        move: jest.fn().mockResolvedValue(Promise.resolve()),
        moveWhileShuffling: jest.fn().mockResolvedValue(Promise.resolve())
    })
    await cell.move(2)
    expect(cell.style.classes).toEqual(['cell2'])
})
