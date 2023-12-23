export const getPresentationRevisionContent = (
  fileTitle,
  sectionContent,
  sectionQuestions
) => `
# Slide Title: ${fileTitle}
# Slide Sections:
"""
${
  sectionContent.length
    ? sectionContent
        .map((item, i) => (item.text ? `Section ${i + 1}: ${item.text}` : ""))
        .join("\n")
    : "No information provided"
}
"""

# New Information:
"""
${
  sectionQuestions.length
    ? sectionQuestions
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
"""

# Instructions:
Revise the Slide Content Sections, using the New Information as a guide / reference.

Answer with a JSON object. For example:
{
  "Slide Title": "Title Here",
  "Slide Sections": {
    "Section 1": "Content based on Section 1 and the New Information",
    "Section 2": "Content based on Section 2 and the New Information",
    "Section 3": "Content based on Section 3 and the New Information"
  }
}
`;

export const getDocumentRevisionContent = (
  fileTitle,
  sectionContent,
  sectionQuestions
) => `
# Document Title: ${fileTitle}
# Document Content:
"""
${
  sectionContent.length
    ? sectionContent
        .map((item, i) => (item.text ? `${item.text}` : ""))
        .join("\n")
    : "No information provided"
}
"""

# New Information:
"""
${
  sectionQuestions.length
    ? sectionQuestions
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
"""

# Instructions:
Revise the Document Content, using the New Information as a guide / reference.
`;
