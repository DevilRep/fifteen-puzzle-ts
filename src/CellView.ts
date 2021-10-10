import {AbstractCellDecorator, CellInterface} from 'fifteen-puzzle-core'
import ElementFactory from './ElementFactory';
import {default as IEventBus} from './interfaces/EventBus'
import IDocument from './interfaces/IDocument';

export default class CellView extends AbstractCellDecorator {
    private readonly eventBus: IEventBus = <IEventBus>{}
    private readonly element: Element = <Element>{}
    private readonly document: IDocument = <IDocument>{}
    private readonly elementFactory: ElementFactory = <ElementFactory>{}

    constructor(cell: CellInterface, eventBus: IEventBus, document: IDocument, elementFactory: ElementFactory) {
        super(cell);
        this.eventBus = this.eventBus || eventBus
        this.element = this.element || this.element
        this.document = this.document || document
        this.elementFactory = this.elementFactory || elementFactory
    }
}