export const getInitialQuestions = (prompt) => `
Provide a list of 5 questions you have which help clarify and provide detail to the prompt below. Do not evaluate the user's knowledge of the prompt. Provide answers in multiple choice format, so it is easy for the user to pick an option.

"${prompt}"

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;

export const getFileQuestions = (prompt, initialQuestions) => `
Background FAQ:
${initialQuestions
  .map(
    (question) =>
      `Question: ${question.question}\nAnswers:${question.chosenAnswers.join(
        ","
      )},${question.freeformAnswer}`
  )
  .join("\n")}

Provide a list of 5 questions you have which help clarify what the user wants in each section of the file provided below.
Make sure not to ask questions which are already answered in the background FAQ.
Use the background information and FAQ to ask informed questions. Provide answers in multiple choice format, so it is easy for the user to pick an option.

${prompt}

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;
