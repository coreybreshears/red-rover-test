// Decode the text recursively based on [ '(', ',', ')' ]
// If it doesn't have child an item { text: 'current text', child: null } will be pushed into the array
// Otherwise, { text: 'current text', child: [ ... ] } will be pushed into the array

export default function convertToList(text) {
  if (!text) return null;
  if (text[0] !== "(" || text.slice(-1) !== ")")
    throw new Error("Invalid Input");

  let isChild = false;
  let currentText = "";
  let childText = "";
  let retList = [];
  let countParentheses = 0;

  for (const letter of text.slice(1, -1).split("")) {
    if (!isChild && childText) {
      // throw an error if any child contains ()
      if (childText === "()") throw new Error("Invalid Input");

      if (currentText) {
        // Calculate recursively and push for valid substring when it contains child string
        retList.push({ text: currentText, child: convertToList(childText) });
        currentText = childText = "";
      }
    }

    if (letter === ",") {
      if (!isChild) {
        // Calculate recursively and push for valid substring when it dosen't have child string
        if (currentText)
          retList.push({
            text: currentText,
            child: convertToList(childText),
          });

        currentText = "";
      } else {
        childText += letter;
      }
    } else if (letter === "(") {
      // Throw an error if it contains ,( or starts without prefix
      if (!currentText) throw new Error("Invalid Input");

      isChild = true;
      countParentheses++;
      childText += letter;
    } else if (letter === ")") {
      countParentheses--;
      if (isChild) childText += letter;
      else currentText += letter;

      // Throw an error it ) count is bigger than ( count in possible substring
      if (countParentheses < 0) throw new Error("Invalid Input");
      else if (countParentheses === 0) isChild = false;
    } else {
      // Throws an error if , is not following after valid substring ending with )
      if (!isChild && childText) throw new Error("Invalid Input");
      if (isChild) childText += letter;
      else currentText += letter;
    }
  }

  if (isChild || currentText === "" || childText === "()")
    throw new Error("Invalid Input");

  retList.push({ text: currentText, child: convertToList(childText) });

  return retList;
}
