export const getInitialQuestions = (prompt) => `
Provide a list of 5 questions you have which help clarify and provide detail to the prompt below. Do not evaluate the user's knowledge of the prompt. Provide answers in multiple choice format, so it is easy for the user to pick an option.

"${prompt}"

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;

// Background FAQ:
// ${initialQuestions
//   .map((question) =>
//     question.chosenAnswers.length || question.freeformAnswer.length
//       ? `Question: ${question.question}\nAnswers:${question.chosenAnswers.join(
//           ","
//         )},${question.freeformAnswer}`
//       : ""
//   )
//   .join("\n")}

// Ask the user what they would do within the Text Editor / Spreedsheet Editor app. (?)

export const getDocumentQuestions = (prompt, initialQuestions) => `
Provide a list of 5 questions you have which help clarify and provide detail to the file listed below. Do not evaluate the user's knowledge of the file. Provide answers in multiple choice format, so it is easy for the user to pick an option.

File: "${prompt}"

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;

export const getDocumentOutline = (prompt) => `
${prompt}

What would be an outline for the file title above? Provide a list of at least 5 sections.

Answer with a JSON object containing an array of strings. For example:
{"sections":["Title 1", "Title 2", "Title 3"]}
`;

export const getPresentationOutline = (prompt) => `
${prompt}

What would be an a series of slides for the file (presentation) title above? Provide a list of at least 5 slides.

Answer with a JSON object containing an array of strings. For example:
{"slides":["Title 1", "Title 2", "Title 3"]}
`;

export const getPresentationQuestions = (prompt, initialQuestions) => `
Provide a list of 5 questions you have which help clarify and provide detail to the presentation file listed below. Do not evaluate the user's knowledge of the file. Provide answers in multiple choice format, so it is easy for the user to pick an option.

File: "${prompt}"

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;

export const getSheetQuestions = (prompt) => `
Provide a list of 3 questions you have which help clarify and provide detail to the spreadsheet file listed below. Ask questions regarding what the user wants in the spreadsheet, such as what to include in the header cells and rows. Do not evaluate the user's knowledge of the file. Provide answers in multiple choice format, so it is easy for the user to pick an option.

File: "${prompt}"

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;

export const getDrawingQuestions = (prompt) => `
Provide a list of 3 questions you have which help clarify and provide detail to the image prompt listed below. Do not evaluate the user's knowledge of the prompt. Ask questions regarding what the user wants in the image and regarding the visual details of the image file. Provide answers in multiple choice format, so it is easy for the user to pick an option.

Prompt: "${prompt}"

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;

export const getContentQuestions = (prompt) => `
Provide a list of 5 questions you have which help clarify and provide detail to the CMS file listed below. Do not evaluate the user's knowledge of the file. Provide answers in multiple choice format, so it is easy for the user to pick an option.

File: "${prompt}"

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;

export const getContentOutline = (prompt) => `
${prompt}

What would be an outline for the file title above? Provide a list of at least 5 sections.

Answer with a JSON object containing an array of strings. For example:
{"sections":["Title 1", "Title 2", "Title 3"]}
`;

export const getWorkEmailQuestions = (prompt) => `
Provide a list of 3 questions you have which help clarify and provide detail to the email file listed below. Do not evaluate the user's knowledge of the file. Provide answers in multiple choice format, so it is easy for the user to pick an option.

File: "${prompt}"

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;

export const getRelationshipsQuestions = (prompt) => `
Provide a list of 3 questions you have which help clarify and provide detail to the CRM Dashboard file listed below. Do not evaluate the user's knowledge of the file. Provide answers in multiple choice format, so it is easy for the user to pick an option.

File: "${prompt}"

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;
