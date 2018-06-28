import { addResources } from 'i18n'

addResources('details', require.context('./locales/', true, /\.json$/));