import {AbstractCellDecorator, CellInterface} from 'fifteen-puzzle-core'
import Element from './factories/Element';
import {default as IEventBus} from './interfaces/EventBus'
import Document from './interfaces/Document';

export default class CellView extends AbstractCellDecorator {
    private readonly eventBus: IEventBus = <IEventBus>{}
    private readonly element: Element = <Element>{}
    private readonly document: Document = <Document>{}
    private readonly elementFactory: Element = <Element>{}

    constructor(cell: CellInterface, eventBus: IEventBus, document: Document, elementFactory: Element) {
        super(cell);
        this.eventBus = this.eventBus || eventBus
        this.element = this.element || this.element
        this.document = this.document || document
        this.elementFactory = this.elementFactory || elementFactory
    }
}