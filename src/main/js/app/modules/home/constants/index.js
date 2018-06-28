import * as actionTypes from './action-types'
import utils from 'utils'
import i18n from 'i18n'

const t = i18n.getFixedT(null, 'home')

let SIDEBAR
i18n.on('added languageChanged', () => {
  const sidebar = t('sidebar')
  if (!sidebar) return
  const achievements = t('achievements')
  if (!achievements) return
  const title = t('title')
  if (!title) return

  SIDEBAR = [
    {
      icon: 'config',
      title: '任务配置',
      roles: utils.OA_ROLES,
      routes: [{
        title: sidebar.tasks.manage,
        path: '403'
      }, {
        title: '测试',
        path: '404'
      }]
    }
  ]
})

i18n.emit('added')

export default actionTypes
export {SIDEBAR}
export const LANGUAGES = ['zh', 'en']
