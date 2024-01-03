/**
 * Widon't
 *
 * Replaces last space with a non-breaking space to avoid typographical widows.
 *
 * @see http://justinhileman.info/article/a-jquery-widont-snippet/
 *
 * @param {string} string
 * @returns string
 */
export const widont = (string) => {
  return string.replace(/\s([^\s<]+)\s*$/, '\xa0$1');
};

/**
 * Generate a random UUID
 * To get a unique ID for each input component.
 * @see https://gist.github.com/jed/982883
 */
export const getUUID = (a) => {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, getUUID);
};
