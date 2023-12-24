export const getDocumentGuideQuestions = (fileTitle, sectionContent) => `
Document Title: ${fileTitle}
${
  sectionContent.length
    ? sectionContent
        .map((item, i) => (item.text ? `Section ${i + 1}: ${item.text}` : ""))
        .join("\n")
    : "No information provided"
}

Provide a list of 3 multiple choice questions (each with 4 selections).
Considering the goal of the title, ask in-depth questions regarding what the user wants in the sections provided. 
Make sure the questions extract information that is not already provided in the sections.
Avoid asking about what the user likes, what appeals to them, or what they are interested in, instead ask about what they want in the sections.
Also avoid asking the questions which are already answered by the sections.

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;

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
Considering the goal of the title, ask in-depth questions regarding what the user wants in the sections provided. 
Make sure the questions extract information that is not already provided in the sections.
Avoid asking about what the user likes, what appeals to them, or what they are interested in, instead ask about what they want in the sections.
Also avoid asking the questions which are already answered by the sections.

Answer with a JSON object containing an array of strings. For example:
{"questions":[{"question":"Question 1","answers":["Answer 1","Answer 2","Answer 3"]},{"question":"Question 2","answers":["Answer 1","Answer 2","Answer 3"]}]}
`;
