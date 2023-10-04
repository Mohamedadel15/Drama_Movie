
/*
 * Handles the logic for generating the path based on the given parameters.
 * @param {string} path - The current path.
 * @param {string} Target - The target value.
 * @param {string} id - The id value.
 * @returns {string} - The generated path.
 */

export function handleGetPath(path, Target, id) {
 
  // Check if the path matches the specific pattern and return the path as is.
  if (path === `/${Target}/TargetFilm/${id}`) return `/${Target}/TargetFilm/${id}`;

  // Check if the path is "/movie" and return the modified path.
  if (path === "/movie") return `/movie/TargetFilm/${id}`;

  // Check if the path is "/tv" and return the modified path.
  if (path === "/tv") return `/tv/TargetFilm/${id}`;

  // Check if the path is "/" and return the modified path.
  if (path === "/") return `/${Target}/TargetFilm/${id}`;
}

