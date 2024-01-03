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

    const chains = {};
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];

      if (!(word in chains)) {
        chains[word] = [this.words[i + 1] || null];
      } else {
        chains[word].push(this.words[i + 1] || null);
      }
    }
    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // - start at the first word in the input text
    // - find a random word from the following-words of that -> random int
    // - repeat until reaching the terminal null

    // let text = [this.words[0]]; // the cat (length = 2, cat = idx = 1 cat: [ hat, is whatever]
    // let randomIdx = 0;
    // let lastWord = text[0];

    let text = [];
    let randomIdx = 0;
    let nextWord = this.words[0]

    while (nextWord) {

      // console.log('lastWord: ', lastWord);
      randomIdx = Math.floor(
        (Math.random() * this.chains[nextWord].length)
      );
      // console.log("lastWord=", lastWord);

      // console.log("made it to the if condition")
      text.push(nextWord);
      // console.log('pushing!');
      console.log('text=',text);

      nextWord = this.chains[nextWord][randomIdx];

      // let lastWord = text[text.length - 1];
    }

    return text.join(" ");
  }
}


module.exports = {
  MarkovMachine,
};