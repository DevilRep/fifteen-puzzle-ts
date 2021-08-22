import CellView from '../src/CellView'

test('adding event callback', () => {
    let hasEventCallback: boolean = false
    document.body.innerHTML = '<div><div class="cell cell1"></div></div>'
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
    document.body.innerHTML = '<div><div class="cell cell1"></div></div>'
    const cell: CellView = new CellView(1, 'test', {
        on(): void {},
        off(): void { isEventCallbackRemoved = true },
        emit(): void {}
    })
    cell.on('test1', () => {})
    cell.off('test1')
    expect(isEventCallbackRemoved).toBeTruthy()
})

test('testing work with DOM: start position was set', () => {
    document.body.innerHTML = '<div><div class="cell cell6"></div></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(): void {}
    })
    cell.on('move:start', () => {})
    const element: Element = document.querySelector('.cell')!
    expect(element.classList.contains('cell6')).toBeTruthy()
})

test('testing work with DOM: animation was added', async () => {
    document.body.innerHTML = '<div><div class="cell cell6"></div></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(): void {}
    })
    const element: Element = document.querySelector('.cell')!
    cell.move(2) // there shouldn't be await - the animation works only when a cell is moving
    await new Promise((resolve: Function) => setTimeout(resolve, 50))
    expect(element.classList.contains('animate__slideOutUp')).toBeTruthy()
})

test('testing work with DOM: animation still present after move', async () => {
    document.body.innerHTML = '<div><div class="cell cell6"></div></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(): void {}
    })
    const element: Element = document.querySelector('.cell')!
    await cell.move(2)
    expect(element.classList.contains('animate__slideOutUp')).toBeTruthy()
})

test('testing work with DOM: class position wasn\'t set', async () => {
    document.body.innerHTML = '<div><div class="cell cell6"></div></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(): void {}
    })
    const element: Element = document.querySelector('.cell')!
    await cell.move(2)
    expect(element.classList.contains('cell2')).toBeFalsy()
})

test('clicking on a cell', () => {
    document.body.innerHTML = '<div><div class="cell cell6"></div></div>'
    const events: string[] = []
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(name): void {
            events.push(name)
        }
    })
    cell.on('move:start', () => {})
    const element: Element = document.querySelector('.cell')!
    element.dispatchEvent(new Event('click'))
    expect(events).toEqual(['click'])
})