export const getDocumentList = (prompt) => `
Provide a list of 5 document titles (like those kept as notes by consultants, startup founders, or researchers, rather than titles which sound like article titles) that are relevant to the prompt below:

"${prompt}"

Answer with a JSON object containing an array of strings. For example:
{"documents":["Document title 1", "Document title 2", "Document title 3"]}
`;

export const getAddtFilesList = (prompt) => `
Provide a list of 3 presentation titles, 3 spreadsheet titles, and 3 image prompts (like those kept as notes by consultants, startup founders, or researchers, rather than titles which sound like article titles) that are relevant to the prompt below:

"${prompt}"

Answer with a JSON object containing an array of strings. For example:
{"presentations":["Document title 1", "Document title 2"],"spreadsheets":["Document title 1", "Document title 2"],"images":["Document title 1", "Document title 2"]}
`;
