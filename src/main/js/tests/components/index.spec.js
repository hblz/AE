import React from 'react'
import { Modal, Table } from 'antd'
import { mount } from 'enzyme'

import Index from 'components/list/index.jsx'
import Confirm from 'components/dialog/confirm.jsx'
import Confirmx from 'components/dialog/confirm'
import Detail from 'components/details/index.jsx'
import ImageBox from 'components/details/main/imageBox'
import AudioBox from 'components/details/main/audioBox'
import List from 'modules/packages/components/packages/list.jsx'
import Add from 'modules/packages/components/packages/add.jsx'

describe('components', () => {
  describe('<Index />', () => {
    it('allows us to set props', () => {
      let props = {
        data: '',
        currentPage: 1,
        fetch: function () {}
      }
      const wrapper = mount(
        <Index {...props}/>
      )
      expect(wrapper.props().currentPage).to.equal(1)
      wrapper.setProps({ currentPage: 3 })
      expect(wrapper.props().currentPage).to.equal(3)
    })
  })
})

describe('Confirm component', () => {
  const props = {
    width: 400,
    title: '提示',
    buttons: []
  }
  it('renders', () => {
    const wrapper = mount(<Confirm {...props}><p>这是一个弹窗！</p></Confirm>)
    expect(wrapper.find(Modal)).to.have.length(1)
  })
})

describe('Detail component', () => {
  const props = {
    record: {
      type: 'image',
      status: '3',
      content: {
        source_id: '',
        size: '',
        title: '',
        update_time: '',
        src: '',
        type: '',
        content: ''
      }
    },
    oaId: '',
    mode: 'table'
  }
  it('renders ImageBox', () => {
    const wrapper = mount(<Detail {...props} />)
    expect(wrapper.find(ImageBox)).to.have.length(1)
  })

  it('renders AudioBox', () => {
    props.record.type = 'audio'
    const wrapper = mount(<Detail {...props} />)
    expect(wrapper.find(AudioBox)).to.have.length(1)
  })
})

describe('List component', () => {
  const emotionspkg = {
    pkgList: {
      items: {
        pkg_id: '2',
        pkg_name: '3',
        label: '4',
        type: '5',
        version: '7',
        status: '1',
        release_status: '1'
      },
      total: 1
    }
  }

  it('renders List', () => {
    const wrapper = mount(<List emotionspkg={emotionspkg} />)
    expect(wrapper.find(Table)).to.have.length(1)
  })
})

describe('Add component', () => {
  it('renders List', () => {
    const wrapper = mount(<Add emotionspkg={{}}/>)
    expect(wrapper.find(Confirmx)).to.have.length(1)
  })
})
