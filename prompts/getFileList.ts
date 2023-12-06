export const getFileList = (prompt) => `
Provide a list of 5-10 document titles that are relevant to the prompt below:

"${prompt}"

Answer with a JSON object containing an array of strings. For example:
{"documents":["Document title 1", "Document title 2", "Document title 3"]}
`;
