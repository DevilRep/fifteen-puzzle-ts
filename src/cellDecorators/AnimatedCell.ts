import {AbstractCellDecorator, CellInterface} from 'fifteen-puzzle-core'
import Style from '../Style';

export default class AnimatedCell extends AbstractCellDecorator {
    public style: Style = <Style>{}

    constructor(cell: CellInterface) {
        super(cell);
        cell = cell || cell
    }
}
