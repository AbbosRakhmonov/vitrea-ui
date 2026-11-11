import base from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

/**
 * dayjs with the customParseFormat plugin extended.
 * Use this instance throughout the kit for consistent date handling.
 *
 * The plugin is extended inside the initializer of the exported binding on
 * purpose. The package declares only CSS as side-effectful, so a bare
 * top-level `dayjs.extend(...)` next to a plain re-export was tree-shaken
 * out of the build: importers were wired straight to `dayjs` and
 * `dayjs(value, format)` returned an Invalid Date.
 */
export const dayjs = (() => {
  base.extend(customParseFormat);
  return base;
})();
