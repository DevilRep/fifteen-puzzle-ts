import CellView from '../src/cellDecorators/CellView'
import Style from '../src/Style';

test('creating the element while creating the cell', () => {
    const mock =  jest.fn()
    new CellView(
        {
            display: '1',
            position: 1,
            move: jest.fn(),
            moveWhileShuffling: jest.fn()
        },
        {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn()
        },
        {
            querySelector: jest.fn(),
            querySelectorAll: jest.fn(),
            getElementsByClassName: jest.fn()
        },
        {
            create: mock
        }
    )
    expect(mock).toBeCalled()
})

test('using the document while creating the cell', () => {
    const mock =  jest.fn()
    new CellView(
        {
            display: '1',
            position: 1,
            move: jest.fn(),
            moveWhileShuffling: jest.fn()
        },
        {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn()
        },
        {
            querySelector: mock,
            querySelectorAll: jest.fn(),
            getElementsByClassName: mock
        },
        {
            create: jest.fn()
        }
    )
    expect(mock).toBeCalled()
})

test('reacting on animation:start', async () => {
    let eventName = ''
    new CellView(
        {
            display: '1',
            position: 1,
            move: jest.fn(),
            moveWhileShuffling: jest.fn()
        },
        {
            on: data => eventName || (eventName = data),
            off: jest.fn(),
            emit: jest.fn()
        },
        {
            querySelector: jest.fn(),
            querySelectorAll: jest.fn(),
            getElementsByClassName: jest.fn()
        },
        {
            create: jest.fn()
        }
    )
    expect(eventName).toBe('animation:start')
})

test('reacting on animation:end', async () => {
    let eventName = ''
    new CellView(
        {
            display: '1',
            position: 1,
            move: jest.fn(),
            moveWhileShuffling: jest.fn()
        },
        {
            on: data => eventName = data,
            off: jest.fn(),
            emit: jest.fn()
        },
        {
            querySelector: jest.fn(),
            querySelectorAll: jest.fn(),
            getElementsByClassName: jest.fn()
        },
        {
            create: jest.fn()
        }
    )
    expect(eventName).toBe('animation:end')
})

test('adding classes when emit style:update', async () => {
    let callbackToBeCalled: Function = jest.fn()
    const mock = new Element()
    mock.classList.add('test1')
    new CellView(
        {
            display: '1',
            position: 1,
            move: jest.fn(),
            moveWhileShuffling: jest.fn()
        },
        {
            on: (name, callback) => name === 'style:update' && (callbackToBeCalled = callback),
            off: jest.fn(),
            emit: jest.fn()
        },
        {
            querySelector: jest.fn(),
            querySelectorAll: jest.fn(),
            getElementsByClassName: jest.fn()
        },
        {
            create: () => mock
        }
    )
    const style = new Style()
    style.classes = ['test2']
    callbackToBeCalled(style)
    expect(mock.classList).toEqual(['cell1', 'animated', 'test2'])
})
