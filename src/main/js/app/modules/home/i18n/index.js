import i18n, { addResources } from 'i18n'

addResources('home', require.context('./locales/', true, /\.json$/));