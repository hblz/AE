import React from 'react'
// import UserModel from './models/users'
// import VUserModel from './models/vUsers'
// import {auth} from 'utils'

/**
 * 获取用户详情
 * @example
 * import UserDetails from 'components/user/details'
 * // 默认显示成：某某某（123456）
 * <UserDetails userId={userId} />
 * // 显示成：某某某
 * <UserDetails userId={userId} format="{userName}" />
 */
export default class extends React.Component {
  /**
   * propTypes
   * @type {Object}
   * @property {number} propTypes.userId 用户 ID
   * @property {string} propTypes.format 显示格式
   * @property {function} propTypes.onData 数据返回时触发事件
   */
  static propTypes = {
    userId: React.PropTypes.number,
    format: React.PropTypes.string,
    onData: React.PropTypes.func
  }

  /**
   * defaultProps
   * @type {Object}
   */
  static defaultProps = {
    userId: '',
    format: '{username}（{userId}）',
    onData: () => {
    }
  }

  componentDidMount() {
    const {userId} = this.props
    this._getUser({userId})
  }

  componentWillReceiveProps(nextProps) {
    const {userId} = nextProps

    if (userId !== this.props.userId)
      this._getUser({userId})
  }

  render() {
    const props = {
      className: 'ellipsis',
      style: {maxWidth: '200px'}
    }

    return <span ref="userDetails" {...props}>
      {this.props.userId}
    </span>
  }

  /**
   * 获取用户信息
   * @param {number} userId 用户 ID
   */
  _getUser = ({userId}) => {
    const {onData} = this.props
    // let Model, GET

    // // 虚拟组织
    // if (auth.isVorg()) {
    //   Model = VUserModel
    //   GET = {
    //     replacement: {
    //       v_org_id: auth.getVorgId(),
    //       user_id: userId
    //     }
    //   }
    // } else {
    //   Model = UserModel
    //   GET = {uri: userId}
    // }

    window.one.OMS.getUserInfo(userId)
    .then( (res) => {
      const userDetails = this.refs.userDetails
      const value = this._format(res)
      if(userDetails){
        userDetails.innerHTML = value
        userDetails.title = value
      }
      onData(res)
    }, (res) => {
      const userDetails = this.refs.userDetails
      // const value = this._format(res.data)
      if(userDetails){
        userDetails.innerHTML =  this.props.userId ?   this.props.userId : ''
        userDetails.title =this.props.userId ?   this.props.userId : ''
      }
      onData(res)
    })
  }

  /**
   * 格式化数据
   * @param {Object} data
   * @return {string}
   */
  _format(data) {
    const {nick_name, user_name, real_name, user_id, org_user_code} = data
    const userName = real_name || nick_name || user_name
    const userId = user_id || org_user_code
    const formatted = {
      userName,
      userId
    }
    let result = this.props.format

    Object.keys(formatted).forEach((key) => {
      result = result.replace(new RegExp('{' + key + '}', 'img'), formatted[key])
    })

    return result
  }
}
