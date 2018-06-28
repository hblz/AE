import { addResources } from 'i18n'

addResources('login', require.context('./locales/', true, /\.json$/));