export const getPresentationGuideQuestions = (fileTitle, sectionContent) => `
Slide Title: ${fileTitle}
${
  sectionContent.length
    ? sectionContent
        .map((item, i) => (item.text ? `Section ${i + 1}: ${item.text}` : ""))
        .join("\n")
    : "No information provided"
}

Provide a list of 3 multiple choice questions (each with 4 selections). 
Ask questions regarding what the user wants in the sections provided. 
Make sure to ask questions which extract new information from the user.

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;
