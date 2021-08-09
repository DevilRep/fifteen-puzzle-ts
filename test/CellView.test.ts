import CellView from '../src/CellView'
import {AnimationSpeed} from '../src/types'

test('adding event callback', () => {
    let hasEventCallback: boolean = false
    document.body.innerHTML = '<div class="cell cell1"></div>'
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
    document.body.innerHTML = '<div class="cell cell1"></div>'
    const cell: CellView = new CellView(1, 'test', {
        on(): void {},
        off(): void { isEventCallbackRemoved = true },
        emit(): void {}
    })
    cell.on('test1', () => {})
    cell.off('test1')
    expect(isEventCallbackRemoved).toBeTruthy()
})

test('moving the cell', async () => {
    let eventNames: string[] = []
    document.body.innerHTML = '<div class="cell cell6"></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(name): void {
            if (eventNames.length) {
                return
            }
            eventNames.push(name)
        }
    })
    cell.on('move:start', () => {})
    await cell.move(2)
    expect(eventNames).toEqual(['move:start'])
})

test('moving the cell up', async () => {
    let directions: string[] = []
    document.body.innerHTML = '<div class="cell cell6"></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(name, direction: string): void {
            if (directions.length) {
                return
            }
            directions.push(name + ':' + direction)
        }
    })
    cell.on('move:start', () => {})
    await cell.move(2)
    expect(directions).toEqual(['move:start:up'])
})

test('moving the cell down', async () => {
    let directions: string[] = []
    document.body.innerHTML = '<div class="cell cell6"></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(name, direction: string): void {
            if (directions.length) {
                return
            }
            directions.push(name + ':' + direction)
        }
    })
    cell.on('move:start', () => {})
    await cell.move(10)
    expect(directions).toEqual(['move:start:down'])
})

test('moving the cell left', async () => {
    let directions: string[] = []
    document.body.innerHTML = '<div class="cell cell6"></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(name, direction: string): void {
            if (directions.length) {
                return
            }
            directions.push(name + ':' + direction)
        }
    })
    cell.on('move:start', () => {})
    await cell.move(5)
    expect(directions).toEqual(['move:start:left'])
})

test('moving the cell right', async () => {
    let directions: string[] = []
    document.body.innerHTML = '<div class="cell cell6"></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(name, direction: string): void {
            if (directions.length) {
                return
            }
            directions.push(name + ':' + direction)
        }
    })
    cell.on('move:start', () => {})
    await cell.move(7)
    expect(directions).toEqual(['move:start:right'])
})

test('stop moving the cell', async () => {
    let eventNames: string[] = []
    document.body.innerHTML = '<div class="cell cell6"></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(name): void {
            eventNames.push(name)
        }
    })
    cell.on('move:end', () => {})
    await cell.move(2)
    expect(eventNames).toEqual(['move:start', 'move:end'])
})

test('testing work with DOM: start position was set', () => {
    document.body.innerHTML = '<div class="cell cell6"></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(): void {}
    })
    cell.on('move:start', () => {})
    const element: Element = document.querySelector('.cell')!
    expect(element.classList.contains('cell6')).toBeTruthy()
})

test('testing work with DOM: animation was added', () => {
    document.body.innerHTML = '<div class="cell cell6"></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(): void {}
    })
    const element: Element = document.querySelector('.cell')!
    cell.move(2) // there shouldn't be await - the animation works only when a cell is moving
    expect(element.classList.contains('animate__slideOutUp')).toBeTruthy()
})

test('testing work with DOM: animation was removed', async () => {
    document.body.innerHTML = '<div class="cell cell6"></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(): void {}
    })
    const element: Element = document.querySelector('.cell')!
    await cell.move(2)
    expect(element.classList.contains('animate__slideOutUp')).toBeFalsy()
})

test('testing work with DOM: end position was set', async () => {
    document.body.innerHTML = '<div class="cell cell6"></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(): void {}
    })
    const element: Element = document.querySelector('.cell')!
    await cell.move(2)
    expect(element.classList.contains('cell2')).toBeTruthy()
})

test('clicking on a cell', () => {
    document.body.innerHTML = '<div class="cell cell6"></div>'
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

test('updating animation speed to fast', async () => {
    document.body.innerHTML = '<div class="cell cell6"></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(): void {}
    })
    cell.animationSpeed = AnimationSpeed.Fast
    const timeWas = Date.now()
    await cell.move(2)
    expect(Date.now() - timeWas - AnimationSpeed.Fast).toBeLessThan(50)
})

test('updating animation speed: are changes work?', async () => {
    document.body.innerHTML = '<div class="cell cell6"></div>'
    const cell: CellView = new CellView(6, 'test', {
        on(): void {},
        off(): void {},
        emit(): void {}
    })
    cell.animationSpeed = AnimationSpeed.Default
    let timeWas: number = Date.now()
    await cell.move(2)
    const defaultSpeedDuration = Date.now() - timeWas
    cell.animationSpeed = AnimationSpeed.Fast
    timeWas = Date.now()
    await cell.move(2)
    const fastSpeedDuration = Date.now() - timeWas
    expect(defaultSpeedDuration - fastSpeedDuration).toBeGreaterThan(100)
})