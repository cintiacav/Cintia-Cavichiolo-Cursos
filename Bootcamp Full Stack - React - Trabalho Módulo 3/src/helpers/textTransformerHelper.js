function removeSpecialCaracteres(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function toArray(text) {
  return Array.from(text);
}

function toString(text) {
  return text.toString().replaceAll(',', '');
}
function invert(text) {
  if (text.length > 1) {
    var reverse = toArray(text).reverse();
    return toString(reverse);
  }
  return text;
}

function numeric(text) {
  text = removeSpecialCaracteres(text);
  text = text.toUpperCase();
  let arrayConverted = toArray(text.toUpperCase());
  arrayConverted = arrayConverted.map((char) => {
    switch (char) {
      case 'O':
        return 0;
      case 'L':
        return 1;
      case 'E':
        return 3;
      case 'A':
        return 4;
      case 'S':
        return 5;
      case 'T':
        return 7;
      default:
        return char;
    }
  });
  return toString(arrayConverted);
}

function splitAndSeparate(text, separator, aspas) {
  let arrayText = text.split(' ');
  arrayText = arrayText.map((word) => {
    return `${aspas}${word}${aspas}${separator}`;
  });

  return toString(arrayText);
}
function withoutLast(text) {
  return text.substring(0, text.length - 1);
}

function csv(text) {
  if (text.length > 1) {
    const stringText = splitAndSeparate(text, ';', '"');
    return withoutLast(stringText);
  }
  return text;
}

function slug(text) {
  if (text.length > 1) {
    text = removeSpecialCaracteres(text);
    const slugText = splitAndSeparate(text, '-', '');
    return withoutLast(slugText.toLowerCase());
  }
  return text;
}
function isVowelRegEx(char) {
  if (char.length === 1) {
    return /[aeiouAEIOU]/.test(char);
  }
}

function vowel(text) {
  text = removeSpecialCaracteres(text);
  let arrayVowel = toArray(text);
  arrayVowel = arrayVowel.map((char) => {
    if (isVowelRegEx(char) || char === ' ') {
      return char;
    }
    return '';
  });

  return toString(arrayVowel);
}

function consonant(text) {
  text = removeSpecialCaracteres(text);
  let arrayConsonant = toArray(text);
  arrayConsonant = arrayConsonant.map((char) => {
    if (!isVowelRegEx(char)) {
      return char;
    }
    return '';
  });

  return toString(arrayConsonant);
}

function camelCase(text) {
  text = removeSpecialCaracteres(text);
  let arrayText = text.split(' ');
  let firstWord = true;
  let camelCaseText = arrayText.map((word) => {
    if (firstWord === true) {
      firstWord = false;
      return word.toLowerCase();
    }
    let arrayWord = toArray(word);
    let firstChar = true;
    arrayWord = arrayWord.map((char) => {
      if (firstChar === true) {
        firstChar = false;
        return char.toUpperCase();
      }
      return char.toLowerCase();
    });
    return toString(arrayWord);
  });
  return toString(camelCaseText);
}

export { invert, numeric, csv, slug, camelCase, vowel, consonant };
