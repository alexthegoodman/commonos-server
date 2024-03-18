export const getDocumentContent = (
  fileName,
  fileQuestions,
  background,
  sectionTitle
) => `
Document Title: ${fileName}
Document Background: ${background ? background : "No background provided"}
Additional Information:
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
    : "No additional information provided"
}

Current Section: ${sectionTitle ? sectionTitle : "No section provided"}

Given the provided document information, write a thorough section for the current section of the document.
Include bullet points and lists where appropriate.
`;

export const getPresentationContent = (fileName, fileQuestions, background) => `
Presentation Title: ${fileName}
Presentation Background: ${background ? background : "No background provided"}
Additional Information:
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
    : "No additional information provided"
}

Given the provided presentation title and information, please write at least 5 slides of content for the document. Write a title and a paragraph or bullet points for each slide.

Answer with a JSON object containing an array of strings. For example:
{"slides":[{"title": "Title 1", "content": "Content 1"}, {"title": "Title 2", "content": "Content 2"}]}
`;

export const getSheetContent = (fileName, fileQuestions, background) => `
Spreadsheet Title: ${fileName}
Spreadsheet Background: ${background ? background : "No background provided"}
Additional Information:
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
    : "No additional information provided"
}

Given the provided spreadsheet title and information, please create a spreadsheet with at least 10 rows and 7-10 columns of content.

Answer with a JSON object containing an array of strings. For example:
{"rows":[{"col1": "Cell Content 1", "col2": "Cell Content 2", "col3": "Cell Content 3"}, {"col1": "Cell Content 4", "col2": "Cell Content 5", "col3": "Cell Content 6"}]}
`;

export const getImageContent = (fileName, fileQuestions, background) => `
Image Title: ${fileName}
Image Information: ${background ? background : "No information provided"}
Additional Information:
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
    : "No additional information provided"
}
`;

export const getContentContent = (
  fileName,
  fileQuestions,
  background,
  sectionTitle
) => `
Content Title: ${fileName}
Content Information: ${background ? background : "No information provided"}
Additional Information:
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
    : "No additional information provided"
}

Current Section: ${sectionTitle ? sectionTitle : "No section provided"}

Given the provided content information, write a thorough section for the current section of the content.
`;

export const getWorkEmailContent = (fileName, fileQuestions, background) => `
Email Subject: ${fileName}
Email Information: ${background ? background : "No information provided"}
Additional Information:
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
    : "No additional information provided"
}

Given the provided email subject and information, please write an email body.
`;

// export const getRelationshipsContent = (fileName, fileQuestions, background) => `
// CRM Dashboard Title: ${fileName}
// Dashboard Information: ${background ? background : "No information provided"}
// Additional Information:
// ${
//   fileQuestions.length
//     ? fileQuestions
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
//     : "No additional information provided"
// }

// Given the provided dashboard title and information, please write a list of at least 5 KPIs to monitor in this dashboard.
// `;
