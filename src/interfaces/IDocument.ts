export default interface IDocument {
    querySelector(selector: string): Element
    querySelectorAll(selector: string): NodeList
    getElementsByClassName(className: string): HTMLCollectionOf<Element>
}