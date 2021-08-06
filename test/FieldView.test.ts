import FieldView from '../src/FieldView'
import CellViewFactory from '../src/CellViewFactory'

const template = `
    <div class="cell cell1"></div>
    <div class="cell cell2"></div>
    <div class="cell cell3"></div>
    <div class="cell cell4"></div>
    <div class="cell cell5"></div>
    <div class="cell cell6"></div>
    <div class="cell cell7"></div>
    <div class="cell cell8"></div>
    <div class="cell cell9"></div>
    <div class="cell cell10"></div>
    <div class="cell cell11"></div>
    <div class="cell cell12"></div>
    <div class="cell cell13"></div>
    <div class="cell cell14"></div>
    <div class="cell cell15"></div>
    <div class="cell cell16"></div>
    `

test('creating a field: are all cells on the field?', () => {
    document.body.innerHTML = template
    const field: FieldView = new FieldView(new CellViewFactory())
    expect(field.toString()).toBe('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16')
})

test('creating a field: was a new game started?', () => {
    document.body.innerHTML = template
    const field: FieldView = new FieldView(new CellViewFactory())
    expect(field.isNewGame).toBeTruthy()
})

test('creating a field: was added the class `in-game`?', () => {
    document.body.innerHTML = template
    const field: FieldView = new FieldView(new CellViewFactory())
    field.toString()
    const fieldElement: Element = document.querySelector('.field')!
    expect(fieldElement.classList.contains('in-game')).toBeFalsy()
})

test('moving a cell: was changed the free cell position?', async () => {
    document.body.innerHTML = template
    const field: FieldView = new FieldView(new CellViewFactory())
    const freeCell: Element = document.querySelector('.freeCell')!
    let freeCellPosition: number = 0
    freeCell.classList.forEach(className => {
        switch (className) {
            case 'cell':
            case 'freeCell':
                return
            default:
                freeCellPosition = +className.slice(4)
        }
    })
    let selectedCell: number
    if (freeCellPosition <= 4) { // can move cell up
        selectedCell = freeCellPosition + 4
    } else { // move down
        selectedCell = (Math.ceil(freeCellPosition / 4) - 2) * 4 + Math.floor(freeCellPosition % 4) // find cell under the free one
    }
    const selectedCellElement: Element = document.querySelector(`.cell${selectedCell}`)!
    selectedCellElement.dispatchEvent(new Event('click'))
    await new Promise((resolve: Function) => setTimeout(resolve, 1000))
    freeCell.classList.forEach(className => {
        switch (className) {
            case 'cell':
            case 'freeCell':
                return
            default:
                freeCellPosition = +className.slice(4)
        }
    })
    field.toString()
    expect(freeCellPosition).toBe(selectedCell)
})

test('moving a cell: was changed the selected cell position?', async () => {
    document.body.innerHTML = template
    const field: FieldView = new FieldView(new CellViewFactory())
    const freeCell: Element = document.querySelector('.freeCell')!
    let freeCellPosition: number = 0
    freeCell.classList.forEach(className => {
        switch (className) {
            case 'cell':
            case 'freeCell':
                return
            default:
                freeCellPosition = +className.slice(4)
        }
    })
    let selectedCell: number
    if (freeCellPosition <= 4) { // can move cell up
        selectedCell = freeCellPosition + 4
    } else { // move down
        selectedCell = (Math.ceil(freeCellPosition / 4) - 2) * 4 + Math.floor(freeCellPosition % 4) // find cell under the free one
    }
    const selectedCellElement: Element = document.querySelector(`.cell${selectedCell}`)!
    selectedCellElement.dispatchEvent(new Event('click'))
    await new Promise((resolve: Function) => setTimeout(resolve, 1000))
    freeCell.classList.forEach(className => {
        switch (className) {
            case 'cell':
            case 'freeCell':
                return
            default:
                freeCellPosition = +className.slice(4)
        }
    })
    field.toString()
    expect(selectedCell).toBe(freeCellPosition)
})

test('moving a cell: was a new game started?', async () => {
    document.body.innerHTML = template
    const field: FieldView = new FieldView(new CellViewFactory())
    const freeCell: Element = document.querySelector('.freeCell')!
    let freeCellPosition: number = 0
    freeCell.classList.forEach(className => {
        switch (className) {
            case 'cell':
            case 'freeCell':
                return
            default:
                freeCellPosition = +className.slice(4)
        }
    })
    let selectedCell: number
    if (freeCellPosition <= 4) { // can move cell up
        selectedCell = freeCellPosition + 4
    } else { // move down
        selectedCell = (Math.ceil(freeCellPosition / 4) - 2) * 4 + Math.floor(freeCellPosition % 4) // find cell under the free one
    }
    const selectedCellElement: Element = document.querySelector(`.cell${selectedCell}`)!
    selectedCellElement.dispatchEvent(new Event('click'))
    await new Promise((resolve: Function) => setTimeout(resolve, 1000))
    freeCell.classList.forEach(className => {
        switch (className) {
            case 'cell':
            case 'freeCell':
                return
            default:
                freeCellPosition = +className.slice(4)
        }
    })
    expect(field.isNewGame).toBeFalsy()
})

test('moving a cell: was added the class `in-game`?', async () => {
    document.body.innerHTML = template
    const field: FieldView = new FieldView(new CellViewFactory())
    const freeCell: Element = document.querySelector('.freeCell')!
    let freeCellPosition: number = 0
    freeCell.classList.forEach(className => {
        switch (className) {
            case 'cell':
            case 'freeCell':
                return
            default:
                freeCellPosition = +className.slice(4)
        }
    })
    let selectedCell: number
    if (freeCellPosition <= 4) { // can move cell up
        selectedCell = freeCellPosition + 4
    } else { // move down
        selectedCell = (Math.ceil(freeCellPosition / 4) - 2) * 4 + Math.floor(freeCellPosition % 4) // find cell under the free one
    }
    const selectedCellElement: Element = document.querySelector(`.cell${selectedCell}`)!
    selectedCellElement.dispatchEvent(new Event('click'))
    await new Promise((resolve: Function) => setTimeout(resolve, 1000))
    freeCell.classList.forEach(className => {
        switch (className) {
            case 'cell':
            case 'freeCell':
                return
            default:
                freeCellPosition = +className.slice(4)
        }
    })
    field.toString()
    const fieldElement: Element = document.querySelector('.field')!
    expect(fieldElement.classList.contains('in-game')).toBeFalsy()
})
