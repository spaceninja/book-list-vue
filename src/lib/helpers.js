/**
 * Get Parameter By Name
 *
 * Checks a URL for a parameter, and if found, returns the value.
 *
 * @see https://github.com/supabase/gotrue-js/blob/dc6cf10dcac016ba4831efdb9b8683bda109dab0/src/lib/helpers.ts#L11
 *
 * @param {string} name - the parameter to get
 * @param {string} url - the URL to check
 * @returns {string} the value of the URL parameter
 */
export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[]]/g, '\\$&');
  const regex = new RegExp('[?&#]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
