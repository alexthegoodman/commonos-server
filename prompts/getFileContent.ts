export const getDocumentContent = (fileName, fileQuestions) => `
Document Title: ${fileName}
Document Information:
${fileQuestions
  .map((question) =>
    question.chosenAnswers.length || question.freeformAnswer.length
      ? `Question: ${question.question}\nAnswers:${question.chosenAnswers.join(
          ","
        )},${question.freeformAnswer}`
      : ""
  )
  .join("\n")}

Given the provided document title and information, please write at least 5 paragraphs of content for the document.
`;
