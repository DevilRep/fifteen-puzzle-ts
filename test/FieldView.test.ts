import FieldView from '../src/FieldView'
import CellView from '../src/factories/CellView'

const document = new Document()
const fieldElement: Element = document.createElement('div')
fieldElement.classList.add('field')

test('creating a field: are all cells was created', () => {
    const field: FieldView = new FieldView(
        {
            create: jest.fn().mockResolvedValue({
                display: '1',
                position: 1,
                move: jest.fn(),
                moveWhileShuffling: jest.fn()
            })
        },
        new Document(),
        {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        }
    )
    expect(field.toString()).toBe('1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1')
})

test('creating a field: was added the class `in-game`?', () => {
    const field: FieldView = new FieldView(
        {
            create: jest.fn().mockResolvedValue({
                display: '1',
                position: 1,
                move: jest.fn(),
                moveWhileShuffling: jest.fn()
            })
        },
        document,
        {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        }
    )
    expect(fieldElement.classList.contains('in-game')).toBeFalsy()
})

test('starting a new game: was added the class `in-game`?', async () => {
    const field: FieldView = new FieldView(
        {
            create: jest.fn().mockResolvedValue({
                display: '1',
                position: 1,
                move: jest.fn(),
                moveWhileShuffling: jest.fn()
            })
        },
        document,
        {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        }
    )
    await field.newGame()
    expect(fieldElement.classList.contains('in-game')).toBeFalsy()
})

test('starting a new game: was changed the free cell position?', async () => {
    const mock = jest.fn()
    const field: FieldView = new FieldView(
        {
            create: jest.fn()
                .mockImplementation((position: number, data: string) => ({
                    display: data,
                    position,
                    move: jest.fn(),
                    moveWhileShuffling: data === '0' ? mock : jest.fn()
                }))
        },
        document,
        {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        }
    )
    await field.newGame()
    expect(mock).toBeCalled()
})

test('starting a new game: was changed the other cell positions?', async () => {
    const mock = jest.fn()
    const field: FieldView = new FieldView(
        {
            create: jest.fn()
                .mockImplementation((position: number, data: string) => ({
                    display: data,
                    position,
                    move: jest.fn(),
                    moveWhileShuffling: data === '0' ? jest.fn() : mock
                }))
        },
        document,
        {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        }
    )
    await field.newGame()
    expect(mock).toBeCalled()
})

test('moving a cell: was added the class `in-game`?', async () => {
    fieldElement.classList.remove('in-game')
    const field: FieldView = new FieldView(
        {
            create: jest.fn().mockResolvedValue({
                display: '1',
                position: 1,
                move: jest.fn(),
                moveWhileShuffling: jest.fn()
            })
        },
        document,
        {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        }
    )
    await field.newGame()
    await field.move(15)
    expect(fieldElement.classList.contains('in-game')).toBeTruthy()
})
