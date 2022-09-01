# [LLordvark](https://www.llordvark.com/)

## What is it?

The undisputed, indispensable companion-guide to [Wordvark](https://miwaro.github.io/wordvark/). Namely, a decision tree of sorts that maps out all of the best possible word-streak-combo-ramas that may be achieved for each two-letter word-starter given.
## Why is it?

To get high scores! Impress all your aardvark-ian friends!! Become Llordvark!!!

## How does it do?

It does pretty well, though, not infallible. Roughly conjecturing that 90% of the words will check out as certified-fresh words as dicated by the [api](https://dictionaryapi.dev/) utilized in Wordvark. Although the dictionary used here to generate the word-map JSON was in fact obtained from this api's open-source repo, after retrospectively glancing at the dictionary-api's source-code, it's speculated that updates were made in the second iteration of the api that enable it to dynamically scrape and source definitions from the interwebs, thus rendering the Llordvark-Library prone to occasional error. Nonetheless, parsing/formatting logic is implemented when generating the JSON to still ensure ultimate Llordvark-ery. 
## How to do the generate json-map?

From the root directory, run this command:

```
node src/lib/wvMapper.mjs
```

After a good ~6 second thumb-tweedling, a stringified object will appear in your terminal. For convienent viewing, copy/paste into a json-parser such as this [one](https://jsonformatter.org/json-parser) and 'vark on!
