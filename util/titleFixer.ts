export function isValidKey(key: string): boolean {
    // only allow s3 safe characters and characters which require special handling for now
    // https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html
    return /^(\w|\/|!|-|\.|\*|'|\(|\)| |&|\$|@|=|;|:|\+|,|\?)*$/.test(key)
  }

const titleFixer = (title: string): string => {
    // Mapping of disallowed characters to their allowed equivalents
    const charMap: { [key: string]: string } = {
      "ø": "o",
      "æ": "ae",
      "å": "a",
      "é": "e",
      "ü": "u",
      // Add more mappings as needed
    };
  
    // Regex to match allowed characters
    const allowedRegex = /^(\w|\/|!|-|\.|\*|'|\(|\)| |&|\$|@|=|;|:|\+|,|\?)*$/;
  
    // Replace disallowed characters
    let fixedTitle = "";
    for (const char of title) {
      if (allowedRegex.test(char)) {
        fixedTitle += char; // Keep allowed characters
      } else if (charMap[char]) {
        fixedTitle += charMap[char]; // Replace disallowed characters
      } else {
        // Optionally, remove characters that are not in the map
        console.warn(`Character "${char}" is not allowed and has no replacement.`);
      }
    }
  
    return fixedTitle;
  };
  
  export default titleFixer;