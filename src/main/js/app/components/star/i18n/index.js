import { addResources } from 'i18n'

addResources('star', require.context('./locales/', true, /\.json$/));