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
