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
      if (childText === "()") throw new Error("Invalid Input");

      if (currentText) {
        retList.push({ text: currentText, child: convertToList(childText) });
        currentText = childText = "";
      }
    }

    if (letter === ",") {
      if (!isChild) {
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
      if (!currentText) throw new Error("Invalid Input");

      isChild = true;
      countParentheses++;
      childText += letter;
    } else if (letter === ")") {
      countParentheses--;
      if (isChild) childText += letter;
      else currentText += letter;

      if (countParentheses < 0) throw new Error("Invalid Input");
      else if (countParentheses === 0) isChild = false;
    } else {
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
