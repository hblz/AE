import './hot-fix/modal'
import locale from './locale';

const loadLib = path => require(`../../../node_modules/antd/lib/${path}/index`)

//import enUS from '../../../node_modules/antd/lib/pagination/locale/en_US';
//import zhCN from '../../../node_modules/antd/lib/pagination/locale/zh_CN';
//console.log('enUS:', JSON.stringify(enUS));
//console.log('zhCN:', JSON.stringify(zhCN));

export default {
  Affix: loadLib('affix'),
  DatePicker: locale('dataPicker')(loadLib('date-picker')),
  Tooltip: loadLib('tooltip'),
  Carousel: loadLib('carousel'),
  Tabs: loadLib('tabs'),
  Modal: loadLib('modal'),
  Dropdown: loadLib('dropdown'),
  Progress: loadLib('progress'),
  Popover: loadLib('popover'),
  Select: loadLib('select'),
  Breadcrumb: loadLib('breadcrumb'),
  Popconfirm: loadLib('popconfirm'),
  Pagination: locale('pagination')(loadLib('pagination')),
  Steps: loadLib('steps'),
  InputNumber: loadLib('input-number'),
  Switch: loadLib('switch'),
  Checkbox: loadLib('checkbox'),
  Table: locale('table')(loadLib('table')),
  Tag: loadLib('tag'),
  Collapse: loadLib('collapse'),
  message: loadLib('message'),
  Slider: loadLib('slider'),
  QueueAnim: loadLib('queue-anim'),
  Radio: loadLib('radio'),
  notification: loadLib('notification'),
  Alert: loadLib('alert'),
  Validation: loadLib('validation'),
  Tree: loadLib('tree'),
  Upload: loadLib('upload'),
  Badge: loadLib('badge'),
  Menu: loadLib('menu'),
  Timeline: loadLib('timeline'),
  Button: loadLib('button'),
  Icon: loadLib('icon'),
  Row: loadLib('row'),
  Col: loadLib('col'),
  Spin: loadLib('spin'),
  Form: loadLib('form'),
  Input: loadLib('input'),
  Calendar: locale('dataPicker')(loadLib('calendar')),
  TimePicker: locale('time-picker')(loadLib('time-picker')),
  Transfer: loadLib('transfer')
};