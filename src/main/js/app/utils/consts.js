import ENV from './env'

const env = new ENV()

/**
 * @constant {string} UC
 */
export const UC_API_ORIGIN = env.uc

/**
 * @constant {string} 虚拟组织 UC
 */
export const VORG_API_ORIGIN = env.vOrgUC

/**
 * @constant {string} CS
 */
export const CS_API_ORIGIN = env.cs

/**
 * @constant {string} 内容服务 cdn
 */
const CDNCS = env.csCDN

/**
 * @constant {string} OA_ARTICLE_API_ORIGIN
 */
export const OA_ARTICLE_API_ORIGIN = (() => {
  switch (env.current) {
    case ENV.prod:
      return 'http://cdncs.101.com/v0.1/static/psp/material/article/'
    case ENV.dyejia:
      return 'http://cs.dyejia.cn/v0.1/static/psp/material/article/'
    case ENV.aws:
      return 'https://awscs.101.com/v0.1/static/psp/material/article/'
    case ENV.awsca:
      return 'https://cs-awsca.101.com/v0.1/static/psp/material/article/'
    default:
      return 'http://sdpcs.beta.web.sdp.101.com/v0.1/static/preproduction_content_psp/material/article/'
  }
})()

/**
 * @constant {string} OA_API_ORIGIN 公众号接口
 */
export const OA_API_ORIGIN = env.getAPI('official-account')

/**
 * @constant {string} LEVEL_CULTURE  等级养成
 */
export const LEVEL_CULTURE = env.getAPI('level4culture')
// export const LEVEL_CULTURE = 'http://easy-mock.com/mock/5976fdeba1d30433d83cebbc'

/**
 * @constant {string} TASK_API_ORIGIN 任务系统
 */
export const TASK_API_ORIGIN = env.getAPI('task4admin')
// export const TASK_API_ORIGIN = 'http://task4admin.dev.web.nd'
// export const TASK_API_ORIGIN = 'http://task4admin.debug.web.nd'
// export const TASK_API_ORIGIN = 'http://192.168.254.7:8888'
// export const TASK_API_ORIGIN = 'http://192.168.254.28:9919'
// export const TASK_API_ORIGIN = 'http://192.168.254.126:8088'
export const PBL_BACK_API_ORIGIN = env.getAPI('pbl4remind')
export const PBL_TASK_API_ORIGIN = env.getAPI('pbl4task')
export const PBL_PERSONAL_API_ORIGIN = env.getAPI('pbl4personal')

// 通用配置服务端的入口
export const PBL4CONFIG = env.getAPI('pbl4config')

// 通用VI[P]的入口
export const PBL4VIP = env.getAPI('pbl4vip')

export const ELEARNING_TASK_GETWAY_API_ORIGIN = env.getAPI('elearning-task-gateway')
/**
 * @constant {string} TRANSFER_API_ORIGIN 二维码接口
 */
export const TRANSFER_API_ORIGIN = env.getAPI('im-transfer', {
  [ENV.prod]: 'https://qrcode.101.com',
  [ENV.dyejia]: 'https://qrcode.101.com'
})

export const PBL4VIP_API_ORIGIN = env.getAPI('pbl4vip')
export const PBL4SIGN_API_ORIGIN = env.getAPI('pbl4sign')

// VIP 管理后台 URL
export const VIP_ADMIN_URL = env.getAPI('vip-admin')

// 称号系统 URL
export const TITLE_API_ORIGIN = env.getAPI('social-reward-delivery-admin')

// 成就系统 URL
export const ACHIEVEMENT_API_ORIGIN = env.getAPI('social-achieve-delivery-admin')

// 启动页弹窗管理后台 URL
export const STARTUP_ALERT_ADMIN_URL = env.getAPI('startup-alert-admin')

// 送花中心管理后台 URL
export const PBL_FLOWER_MANAGER_URL = env.getAPI('pbl-flower-manager')

export const CONFIG_ADMIN_ORIGIN = env.getAPI('config-admin')

export const ROLES = {
  'VISITOR': 'VISITOR',                                 // 游客
  'IM_OA_CHECKER': 'IM_OA_CHECKER',                     // 公众号管理
  'IM_GROUP_MANAGER': 'IM_GROUP_MANAGER',               // 群组管理
  'IM_MESSAGE_ASSISTANT': 'IM_MESSAGE_ASSISTANT',       // 消息群发
  'IM_ROAM_MESSAGE_MANAGER': 'IM_ROAM_MESSAGE_MANAGER', // 消息管理
  'IM_REPORT_MANAGER': 'IM_REPORT_MANAGER',             // 数据报表
  'IM_TIP_OFF_CHECKER': 'IM_TIP_OFF_CHECKER',           // 举报管理
  'IM_CONF_MANAGER': 'IM_CONF_MANAGER',                 // 音视频会议
  'IM_EMOTION_MANAGER': 'IM_EMOTION_MANAGER',           // 表情包管理
  'IM_ALBUM_MANAGER': 'IM_ALBUM_MANAGER',               // 相册管理,
  'IM_SPRITE_MANAGER': 'IM_SPRITE_MANAGER',             // 个性装扮管理
  'IM_ADMINISTRATOR': 'IM_ADMINISTRATOR',               // 所有权限（超级管理员）
  'ORG_ADMIN': 'ORG_ADMIN',                             // 所有权限（组织管理员）
  'VORG_ADMIN': 'VORG_ADMIN',                           // 虚拟组织素有权限
  'IM_BONUS_ADMIN': 'IM_BONUS_ADMIN'                    // 红包管理
}

// 后台管理权限
// 正式环境需要管理员权限，其他环境不限
export const OA_ROLES = env.current === ENV.prod ? [
  ROLES.VORG_ADMIN,
  ROLES.IM_ADMINISTRATOR,
  ROLES.ORG_ADMIN
] : [
  ROLES.VISITOR
]

// 图片类型
export const imgTypes = ['.bmp', '.gif', '.png', '.jpeg', '.jpg']

/*
 * @constant {string} 用户头像
 */
export const USER_FACE_URL = env.userFace + '/'

/**
 * @constant {number} PAGE_SIZE 分页大小
 */
export const PAGE_SIZE = 10

/**
 * @constant {string} TIME_FORMAT 时间格式
 */
export const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

/**
 * @constant {number} PAGE_SIZE_SEARCH 搜索分页大小（用于组织节点的加载）
 */
export const PAGE_SIZE_SEARCH = 2000

/**
 * @constant 网页可见区域高
 */
export const WINDOW_HEIGHT = window.innerHeight

/**
 * @constant {string}  透明图片
 */
export const BLANK = 'data:image/gifbase64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='

export const CS_SERVICE_TASKSYSTEM = (() => {
  switch (env.current) {
    case ENV.dev:
      return 'preproduction_content_tasksystem'
    case ENV.debug:
      return 'preproduction_content_tasksystem'
    case ENV.beta:
    case ENV.pressure:
    case ENV.oldBeta:
      return 'preproduction_content_tasksystem'
    case ENV.prod:
    case ENV.dyejia:
    case ENV.aws:
    case ENV.awsca:
    default:
      return 'production_tasksystem'
  }
})()

export const CS_SERVICE_PBL4CONFIG = (() => {
  switch (env.current) {
    case ENV.dev:
      return 'dev_content_pbl4config'
    case ENV.debug:
      return 'qa_content_pbl4config'
    case ENV.beta:
    case ENV.pressure:
      return 'preproduction_content_pbl4config'
    case ENV.oldBeta:
      return 'preproduction_content_pbl4config'
    case ENV.prod:
      return 'production_content_pbl4config'
    case ENV.dyejia:
    case ENV.aws:
    case ENV.awsca:
    default:
      return 'qa_content_pbl4config'
  }
})()

export const CS_SERVICE_LEVEL4CULTURE = (() => {
  switch (env.current) {
    case ENV.dev:
      return 'dev_content_level4culture'
    case ENV.debug:
      return 'qa_content_level4culture'
    case ENV.beta:
    case ENV.pressure:
      return 'preproduction_content_culture'
    case ENV.oldBeta:
      return 'preproduction_content_culture'
    case ENV.prod:
      return 'production_content_level4culture'
    case ENV.dyejia:
    case ENV.aws:
    case ENV.awsca:
    default:
      return 'qa_content_level4culture'
  }
})()

/**
 * @constant {string}  SIGN_API_ORIGIN 签到接口
 */
export const SIGN_API_ORIGIN = env.getAPI('im-sign')
// export const SIGN_API_ORIGIN = 'http://im-sign.dev.web.nd'

/**
 * @constant {string}  SIGNOUT_API_ORIGIN 日事日清
 */

export const SIGNOUT_API_ORIGIN = env.getAPI('sign-out')
// export const SIGNOUT_API_ORIGIN = 'http://192.168.254.7:8087'

/**
 * @constant {string}  DATE_CONFIG 日清时间配置
 */

export const DATE_CONFIG = env.getAPI('date-config')
// export const DATE_CONFIG = 'http://date-config.debug.web.nd'

/**
 * @constant {string} RANK_ADMIN 排行榜接口
 */
export const RANK_ADMIN = env.getAPI('rank-admin')

/**
 * @constant {string}  CONFIG_LOGS 配置日志
 */
export const CONFIG_LOGS = env.getAPI('pbl4configlog')


export const CS_SERVICE_DAILYCONFIG = (() => {
  switch (env.current) {
    case ENV.dev:
      return 'dev_content_sign_out'
    case ENV.debug:
      return 'dev_content_sign_out'
    case ENV.beta:
    case ENV.pressure:
    case ENV.oldBeta:
      return 'preproduction_content_sign_out'
    case ENV.prod:
    case ENV.dyejia:
    case ENV.aws:
    case ENV.awsca:
    default:
      return 'sign_out'
  }
})()

export const CS_SERVICE_SIGNCONFIG = (() => {
  switch (env.current) {
    case ENV.dev:
      return 'dev_content_sign'
    case ENV.debug:
      return 'dev_content_sign'
    case ENV.beta:
    case ENV.oldBeta:
    case ENV.pressure:
      return 'preproduction_content_sign'
    case ENV.prod:
    case ENV.dyejia:
    case ENV.aws:
    case ENV.awsca:
    default:
      return 'sign'
  }
})()

export const CS_SERVICE_PERSONAL = (() => {
  switch (env.current) {
    case ENV.dev:
      return 'dev_content_pbl_personal'
    case ENV.debug:
      return 'qa_content_pbl_personal'
    case ENV.beta:
    case ENV.oldBeta:
    case ENV.pressure:
      return 'preproduction_content_pbl_person'
    case ENV.prod:
    case ENV.dyejia:
    case ENV.aws:
    case ENV.awsca:
    default:
      return 'production_content_pbl_person'
  }
})()
