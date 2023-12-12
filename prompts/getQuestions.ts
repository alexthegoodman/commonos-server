export const getInitialQuestions = (prompt) => `
Provide a list of 5 questions you have which help clarify and provide detail to the prompt below. Do not evaluate the user's knowledge of the prompt. Provide answers in multiple choice format, so it is easy for the user to pick an option.

"${prompt}"

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;

export const getFileQuestions = (prompt) => `
Provide a list of 5 questions you have which help clarify and provide detail regarding the contents of the file below.
Do not evaluate the user's knowledge of the file. Do not ask them questions about the background information, just use it to inform your questions.
Provide answers in multiple choice format, so it is easy for the user to pick an option.

${prompt}

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;
