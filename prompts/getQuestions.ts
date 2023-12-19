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

export const getDocumentQuestions = (prompt, initialQuestions, outline) => `
${prompt}

File Outline:
${outline.map((section) => `* ${section}`).join("\n")}

Provide a list of 5 multiple choice questions (each with 4 selections). Ask questions regarding what the user wants in each section of the outline.

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

export const getPresentationQuestions = (prompt, initialQuestions, outline) => `
${prompt}

Presentation Slides:
${outline.map((section) => `* ${section}`).join("\n")}

Provide a list of 5 multiple choice questions (each with 4 selections). Ask questions regarding what the user wants in each slide.

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;

export const getSheetQuestions = (prompt) => `
${prompt}

Provide a list of 3 multiple choice questions, each regarding the content of the spreadsheet file. Ask questions regarding what the user wants in the spreadsheet, such as what to include in the header cells and rows.

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;

export const getDrawingQuestions = (prompt) => `
${prompt}

Provide a list of 3 multiple choice questions, each regarding the visual details of the image file. Ask questions regarding what the user wants in the image.

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;
