import { addResources } from 'i18n'
addResources('uploader', require.context('./locales/', true, /\.json$/))
