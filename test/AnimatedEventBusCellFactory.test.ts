import AnimatedEventBusCellFactory from '../src/factories/AnimatedEventBusCell';

test('calling method `create` from decorated factory', () => {
    const mock = jest.fn()
    new AnimatedEventBusCellFactory(
        {
            create: mock,
        },
        {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        }
    )
    expect(mock).toBeCalled()
})

test('adding events after `move:start` and `move:end`', () => {
    const eventListeners: string[] = []
    new AnimatedEventBusCellFactory(
        {
            create: jest.fn().mockResolvedValue({
                display: '1'
            }),
        },
        {
            on: (name) => eventListeners.push(name),
            off: jest.fn(),
            emit: jest.fn(),
        }
    )
    expect(eventListeners).toEqual(['cell-1:move:start', 'cell-1:move:end'])
})

test('emiting event `style:update` while `move:start` emiting', () => {
    let realCallback: Function = jest.fn()
    let eventName: string = ''
    new AnimatedEventBusCellFactory(
        {
            create: jest.fn().mockResolvedValue({
                display: '1'
            }),
        },
        {
            on: (name: string, callback: Function) => name === 'cell-1:move:start' && (realCallback = callback),
            off: jest.fn(),
            emit: (name: string) => eventName = name,
        }
    )
    realCallback()
    expect(eventName).toBe('cell-1:style:update')
})

test('emiting event `style:update` while `move:end` emiting', () => {
    let realCallback: Function = jest.fn()
    let eventName: string = ''
    new AnimatedEventBusCellFactory(
        {
            create: jest.fn().mockResolvedValue({
                display: '1'
            }),
        },
        {
            on: (name: string, callback: Function) => name === 'cell-1:move:end' && (realCallback = callback),
            off: jest.fn(),
            emit: (name: string) => eventName = name,
        }
    )
    realCallback()
    expect(eventName).toBe('cell-1:style:update')
})
