/**
 * Represents an example for JsDoc.
 * @param {String} title - The title of the example.
 * @param {String} author - The author of the example.
 * @return {Example} Class
 * @constructor
 */
function Example(title, author) {
  if (!(this instanceof Example)) {
    return new Example(title, author);
  }

  this.title = title;
  this.author = author;

  /**
   * sayHello
   * @return {String} method
   */
  this.sayHello = function sayHello() {
    return console.log('Hello ' + this.title + ' ' + this.author + ', from dw!');
  };
}

module.exports = Example;
