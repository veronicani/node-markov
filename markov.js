/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    const chain = {};
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      if (chain[word] === undefined) {
        chain[word] = [this.words[i + 1] || null];
      } else {
        chain[word].push(this.words[i + 1] || null);
      }
    }
    return chain;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // - start at the first word in the input text
    // - find a random word from the following-words of that -> random int
    // - repeat until reaching the terminal null

    let text = [this.words[0]]; // the cat (length = 2, cat = idx = 1 cat: [ hat, is whatever]


    while (true) {

      let lastWord = text[text.length - 1];
      let randomIdx = Math.floor(
        (Math.random() * this.chains[lastWord].length) + 1
      );

      // console.log("lastWord=", lastWord);

      if (this.chains[lastWord][randomIdx]) {
        // console.log("made it to the if condition")
        text.push(this.chains[lastWord][randomIdx]);
        // console.log('pushing!');
        // console.log('text=',text);
      } else {
        // console.log(text.join(" "));
        return (text.join(" "));
      }
    }
  }
}


module.exports = {
  MarkovMachine,
};