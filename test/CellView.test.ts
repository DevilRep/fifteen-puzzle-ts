import CellView from '../src/CellView'

test('adding event callback', () => {
    let hasEventCallback: boolean = false
    const cell: CellView = new CellView(1, 'test', {
        on(): void { hasEventCallback = true },
        off(): void {},
        emit(): void {}
    })
    cell.on('test1', () => {})
    expect(hasEventCallback).toBeTruthy()
})

test('triggering event callback', () => {
    let isEventTriggered: boolean = false
    const cell: CellView = new CellView(1, 'test', {
        on(): void {},
        off(): void {},
        emit(): void { isEventTriggered = true }
    })
    cell.on('test1', () => {})
    cell.emit('test1')
    expect(isEventTriggered).toBeTruthy()
})

test('removing callback ', () => {
    let isEventCallbackRemoved: boolean = false
    const cell: CellView = new CellView(1, 'test', {
        on(): void {},
        off(): void { isEventCallbackRemoved = true },
        emit(): void {}
    })
    cell.on('test1', () => {})
    cell.off('test1')
    expect(isEventCallbackRemoved).toBeTruthy()
})