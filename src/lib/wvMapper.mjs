// UTILS

import { dict } from './dict.mjs';

const filteredDict = dict.filter((word) => {
  const badChAARacters = ['-', '.', ' '];
  const isVarkWorthy = (bc) => word?.includes(bc) === false;

  return badChAARacters.every(isVarkWorthy)
});

const isVowelWorthy = (str) => (str.match(/[aeiouy]/gi) || []).length > 0



// CREATE MAPPING STRUCTS

let wvWordMap = {};

const generateTwoLetterWordStarterList = () => {
  let wordStarters = {}
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  letters.forEach(firstLetter => {
    letters.forEach(secondLetter => {
      wordStarters = {
        ...wordStarters,
        [`${firstLetter}${secondLetter}`]: {
          wordStarterKey: `${firstLetter}${secondLetter}`,
          thePathOfTheAardvark: []
        }
      }
    });
  });

  return wordStarters;
}

const twoLetterWordStarters = generateTwoLetterWordStarterList();

wvWordMap = {
  ...twoLetterWordStarters
}




// POPULATE MAP STRUCT

const findBestStartingWordAndWordFamilyPerTwoLetterWordStarters = ({ wsSubstr, wordList, strLength }) => {
  const wsWords = wordList.filter((word) => word?.startsWith(wsSubstr) && word.length > strLength)

  if (wsWords.length) {
    let highestCount = 0;
    let currCount = 0;
    let currWordFamily = [];

    let mostCommonSubstr = '';
    let mostCommonSubstrWordFamily = [];

    wsWords.forEach((outerArrWord) => {
      wsWords.forEach((innerArrWord) => {
        if (innerArrWord.startsWith(outerArrWord)) {
          currWordFamily = [...currWordFamily, innerArrWord]
          currCount++
        }

        if (currCount >= highestCount) {
          mostCommonSubstr = outerArrWord
          mostCommonSubstrWordFamily = currWordFamily
          highestCount = currCount
        }
      })

      currWordFamily = [];
      currCount = 0
    });

    wvWordMap[wsSubstr] = {
      wsSubstr,
      wordList: [...mostCommonSubstrWordFamily],
      strLength: mostCommonSubstr.length,
      thePathOfTheAardvark: [...wvWordMap[wsSubstr].thePathOfTheAardvark, mostCommonSubstr],
    }

    findBestStartingWordAndWordFamilyPerTwoLetterWordStarters(wvWordMap[wsSubstr]);
  } else {
    if (strLength < 4 || !isVowelWorthy(wsSubstr)) {
      delete wvWordMap[wsSubstr]
    } else {
      delete wvWordMap[wsSubstr].wsSubstr
      delete wvWordMap[wsSubstr].wordList
      delete wvWordMap[wsSubstr].strLength
    }
  }

  return;
}


// CONFIG INPUT & INVOKE

Object.keys(wvWordMap).forEach((key) => {
  const initialInputConfig = {
    wsSubstr: key,
    wordList: filteredDict,
    strLength: 2
  }

  findBestStartingWordAndWordFamilyPerTwoLetterWordStarters(initialInputConfig)
})

console.log(JSON.stringify(wvWordMap))

// https://jsonformatter.org/json-parser

// https://dictionaryapi.dev/
// https://api.dictionaryapi.dev/api/v2/entries/en/awesomesauce

// https://github.com/miwaro/wordvark
// https://miwaro.github.io/wordvark/