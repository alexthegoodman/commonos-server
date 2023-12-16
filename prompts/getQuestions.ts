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

export const getFileQuestions = (prompt, initialQuestions, outline) => `
${prompt}

File Outline:
${outline.map((section) => `* ${section}`).join("\n")}

Provide a list of 5 multiple choice questions (each with 4 selections), one for each section of the outline. Ask questions regarding what the user wants in each section.

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;

export const getFileOutline = (prompt) => `
${prompt}

What would be an outline for the file title above? Provide a list of at least 5 sections.

Answer with a JSON object containing an array of strings. For example:
{"sections":["Title 1", "Title 2", "Title 3"]}
`;
