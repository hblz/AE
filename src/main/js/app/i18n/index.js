import i18n from 'i18next'
import LngDetector from 'i18next-browser-languagedetector'

const DEFAULT_LANGUAGE = 'zh'

i18n
  .use(LngDetector)
  .init({
    // lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    fallbackNS: 'translation',
    debug: __DEV__,
    returnObjects: true,
    interpolation: {
      escapeValue: false // not needed for react!!
    },
    parseMissingKeyHandler: () => null
  });

addResources(null, require.context('./locales/', true, /\.json$/));

/**
 * append resources to i18next
 * @param moduleName {string} - use module name as namespace
 * @param req {function} - project convention of require.context('./locales/', true, /\.json$/)
 */
function addResources(moduleName, req) {
  req.keys().forEach(path => {
    let resource = req(path);

    path = path.replace(/(\.\/|\.json)/ig, '').split('/');

    let language = path[0]; // 'en', 'zh', 'fr', etc.
    let ns = path[1];       // 'error', 'translation' as convention

    if (ns === 'translation' && moduleName) {
      ns = moduleName;
    }

    i18n.addResourceBundle(language, ns, resource, true, true)
  });
}

export { addResources, DEFAULT_LANGUAGE }
export default i18n;
