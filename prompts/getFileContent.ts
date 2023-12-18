export const getDocumentContent = (fileName, fileQuestions) => `
Document Title: ${fileName}
Document Information:
${
  fileQuestions.length
    ? fileQuestions
        .map((question) =>
          question.chosenAnswers.length || question.freeformAnswer.length
            ? `Question: ${
                question.question
              }\nAnswers:${question.chosenAnswers.join(",")},${
                question.freeformAnswer
              }`
            : ""
        )
        .join("\n")
    : "No information provided"
}

Given the provided document title and information, please write at least 5 paragraphs of content for the document.
`;

export const getPresentationContent = (fileName, fileQuestions) => `
Presentation Title: ${fileName}
Presentation Information:
${
  fileQuestions.length
    ? fileQuestions
        .map((question) =>
          question.chosenAnswers.length || question.freeformAnswer.length
            ? `Question: ${
                question.question
              }\nAnswers:${question.chosenAnswers.join(",")},${
                question.freeformAnswer
              }`
            : ""
        )
        .join("\n")
    : "No information provided"
}

Given the provided presentation title and information, please write at least 5 slides of content for the document. Write a title and a paragraph or bullet points for each slide.

Answer with a JSON object containing an array of strings. For example:
{"slides":[{"title": "Title 1", "content": "Content 1"}, {"title": "Title 2", "content": "Content 2"}]}
`;

export const getSheetContent = (fileName, fileQuestions) => `
Spreadsheet Title: ${fileName}
Spreadsheet Information:
${
  fileQuestions.length
    ? fileQuestions
        .map((question) =>
          question.chosenAnswers.length || question.freeformAnswer.length
            ? `Question: ${
                question.question
              }\nAnswers:${question.chosenAnswers.join(",")},${
                question.freeformAnswer
              }`
            : ""
        )
        .join("\n")
    : "No information provided"
}

Given the provided spreadsheet title and information, please create a spreadsheet with at least 5 rows and 5 columns of content.

Answer with a JSON object containing an array of strings. For example:
{"rows":[{"col1": "Cell Content 1", "col2": "Cell Content 2", "col3": "Cell Content 3"}, {"col1": "Cell Content 4", "col2": "Cell Content 5", "col3": "Cell Content 6"}]}
`;

export const getImageContent = (fileName, fileQuestions) => `
Image Title: ${fileName}
Image Information:
${
  fileQuestions.length
    ? fileQuestions
        .map((question) =>
          question.chosenAnswers.length || question.freeformAnswer.length
            ? `Question: ${
                question.question
              }\nAnswers:${question.chosenAnswers.join(",")},${
                question.freeformAnswer
              }`
            : ""
        )
        .join("\n")
    : "No information provided"
}
`;
