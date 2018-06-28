import { addResources } from 'i18n'

addResources('chart', require.context('../i18n/locales/', true, /\.json$/))
