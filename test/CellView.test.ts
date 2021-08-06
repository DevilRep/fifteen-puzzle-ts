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

test('moving the cell', () => {
    let eventNames: string[] = []
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(name): void {
            eventNames.push(name)
        }
    })
    cell.on('move:start', () => {})
    cell.move(2)
    expect(eventNames).toEqual(['move:start'])
})

test('moving the cell up', () => {
    let directions: string[] = []
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(name, direction: string): void {
            directions.push(name + ':' + direction)
        }
    })
    cell.on('move:start', () => {})
    cell.move(2)
    expect(directions).toEqual(['move:start:up'])
})

test('moving the cell down', () => {
    let directions: string[] = []
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(name, direction: string): void {
            directions.push(name + ':' + direction)
        }
    })
    cell.on('move:start', () => {})
    cell.move(10)
    expect(directions).toEqual(['move:start:down'])
})

test('moving the cell left', () => {
    let directions: string[] = []
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(name, direction: string): void {
            directions.push(name + ':' + direction)
        }
    })
    cell.on('move:start', () => {})
    cell.move(5)
    expect(directions).toEqual(['move:start:left'])
})

test('moving the cell right', () => {
    let directions: string[] = []
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(name, direction: string): void {
            directions.push(name + ':' + direction)
        }
    })
    cell.on('move:start', () => {})
    cell.move(7)
    expect(directions).toEqual(['move:start:right'])
})

test('stop moving the cell', () => {
    let eventNames: string[] = []
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(name): void {
            eventNames.push(name)
        }
    })
    cell.on('move:end', () => {})
    cell.move(2)
    expect(eventNames).toEqual(['move:end'])
})