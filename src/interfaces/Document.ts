export default interface Document {
    querySelector(selector: string): Element
    querySelectorAll(selector: string): NodeList
    getElementsByClassName(className: string): HTMLCollectionOf<Element>
}