import * as actionTypes from './action-types';
import utils from 'utils';
import ENV from 'utils/env'

const env = new ENV()

//action常量定义
export default actionTypes;

//export const ROLES = [
//  'IM_MESSAGE_ASSISTANT',       // 消息群发（消息助理）
//  'IM_OA_CHECKER',              // 公众号管理(公众号审核员)
//  'IM_EMOTION_MANAGER',         // 表情包管理（表情包管理员）
//  'IM_GROUP_MANAGER',           // 群组管理（群组管理员）
//  'IM_ROAM_MESSAGE_MANAGER',    // 消息管理、消息统计（消息管理员）
//  'IM_TIP_OFF_CHECKER',         // 举报管理（举报审核员）
//  'IM_ADMINISTRATOR',           // 所有权限（超级管理员）
//  'ORG_ADMIN'                   // 所有权限（组织管理员）
//];

// 二维码应用标识 appid
export const APPID = (function () {
  switch (env.current) {
    // 生产环境
    case ENV.prod:
    case ENV.aws:
    case ENV.awsca:
      return 'im2iyxnk1b54cp82eo';

    // 其他环境
    default:
      return 'imhsgla49grbx8dqrm';
  }
})();
