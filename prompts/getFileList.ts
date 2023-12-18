export const getDocumentList = (prompt, initialQuestions) => `
Provide a list of 1-5 document titles (like high-value handwritten documents kept by consultants, startup founders, or practitioners, rather than titles which sound like article titles) that are relevant to the prompt below. The number of titles should reflect whether documents are needed for the prompt.

Prompt: "${prompt}"

Background Information:
${
  initialQuestions.length
    ? initialQuestions
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

Hints and Examples:
For creating literature, use potential literature titles for each document title.
For creating physical objects, use titles relevant to specifications, materials, and human resources.

Answer with a JSON object containing an array of strings. For example:
{"documents":["Document title 1", "Document title 2", "Document title 3"]}
`;

export const getAddtFilesList = (prompt, initialQuestions) => `
Provide a list of 0-3 presentation titles, 0-3 spreadsheet titles, and 0-3 image prompts (like those kept as notes by consultants, startup founders, or researchers, rather than titles which sound like article titles) that are relevant to the prompt below. The number of titles should reflect whether the respective file type is needed for the prompt.

Prompt: "${prompt}"

Background Information:
${
  initialQuestions.length
    ? initialQuestions
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

Answer with a JSON object containing an array of strings. For example:
{"presentations":["Document title 1", "Document title 2"],"spreadsheets":["Document title 1", "Document title 2"],"images":["Document title 1", "Document title 2"]}
`;
