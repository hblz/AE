import { addResources } from 'i18n'

addResources('items', require.context('./locales/', true, /\.json$/));