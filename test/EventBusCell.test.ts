import EventBusCell from '../src/cellDecorators/EventBusCell'

test('emitting default event before move', async () => {
    let eventName = ''
    const cell = new EventBusCell({
        display: '1',
        position: 1,
        move: jest.fn().mockResolvedValue(Promise.resolve()),
        moveWhileShuffling: jest.fn().mockResolvedValue(Promise.resolve())
    }, {
        on: jest.fn(),
        off: jest.fn(),
        emit: data => eventName || (eventName = data)
    })
    await cell.move(1)
    expect(eventName).toBe('move:start')
})

test('emitting default event after move', async () => {
    let eventName = ''
    const cell = new EventBusCell({
        display: '1',
        position: 1,
        move: jest.fn().mockResolvedValue(Promise.resolve()),
        moveWhileShuffling: jest.fn().mockResolvedValue(Promise.resolve())
    }, {
        on: jest.fn(),
        off: jest.fn(),
        emit: data => eventName = data
    })
    await cell.move(1)
    expect(eventName).toBe('move:end')
})

test('emitting custom event before move', async () => {
    let eventName = ''
    const cell = new EventBusCell({
        display: '1',
        position: 1,
        move: jest.fn().mockResolvedValue(Promise.resolve()),
        moveWhileShuffling: jest.fn().mockResolvedValue(Promise.resolve())
    }, {
        on: jest.fn(),
        off: jest.fn(),
        emit: data => eventName || (eventName = data)
    })
    cell.prefixBeforeMove = 'test'
    await cell.move(1)
    expect(eventName).toBe('test:start')
})

test('emitting custom event after move', async () => {
    let eventName = ''
    const cell = new EventBusCell({
        display: '1',
        position: 1,
        move: jest.fn().mockResolvedValue(Promise.resolve()),
        moveWhileShuffling: jest.fn().mockResolvedValue(Promise.resolve())
    }, {
        on: jest.fn(),
        off: jest.fn(),
        emit: data => eventName = data
    })
    cell.prefixAfterMove = 'test'
    await cell.move(1)
    expect(eventName).toBe('test:end')
})