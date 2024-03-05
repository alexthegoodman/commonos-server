export const getDocumentList = (prompt, initialQuestions, numFiles = 5) => `
Provide a list of ${numFiles} document titles (like in-depth documents kept by consultants, startup founders, or practitioners) that are relevant to the prompt below.

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
For a plan or strategy, consider the sub-goals and sub-plans that would be needed to achieve the main goal.
For a business or venture, consider the major departments or categories when determining the document titles.

Answer with a JSON object containing an array of strings. For example:
{"documents":["Document title 1", "Document title 2", "Document title 3"]}
`;

export const getMoreDocumentTitles = (relevantTreeMd) => `
Provide a list of up to 5 creative document titles that would continue the document tree below:

Document Tree:
${relevantTreeMd || "No tree provided"}

Answer with a JSON object containing an array of strings. For example:
{"documents":["Document title 1", "Document title 2", "Document title 3"]}
`;

// export const getAddtFilesList = (prompt, initialQuestions) => `
// Provide a list of 0-3 presentation titles, 0-3 spreadsheet titles, and 0-3 image prompts (like those kept as notes by consultants, startup founders, or researchers, rather than titles which sound like article titles) that are relevant to the prompt below. The number of titles should reflect whether the respective file type is needed for the prompt.

// Prompt: "${prompt}"

// Background Information:
// ${
//   initialQuestions.length
//     ? initialQuestions
//         .map((question) =>
//           question.chosenAnswers.length || question.freeformAnswer.length
//             ? `Question: ${
//                 question.question
//               }\nAnswers:${question.chosenAnswers.join(",")},${
//                 question.freeformAnswer
//               }`
//             : ""
//         )
//         .join("\n")
//     : "No information provided"
// }

// Answer with a JSON object containing an array of strings. For example:
// {"presentations":["Document title 1", "Document title 2"],"spreadsheets":["Document title 1", "Document title 2"],"images":["Document title 1", "Document title 2"]}
// `;

export const getAddtFilesList = (
  prompt,
  initialQuestions,
  fileType = "presentation",
  returnFileType = "presentations",
  numFiles = 3,
  targetItem = "titles"
) => `
Provide a list of ${numFiles} ${fileType} ${targetItem} (like those kept as notes by consultants, startup founders, or researchers, rather than ${targetItem} which sound like article titles) that are relevant to the prompt below.

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
{"${returnFileType}":["Item 1", "Item 2", "Item 3"]}
`;
