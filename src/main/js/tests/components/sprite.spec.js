import React from 'react'
import { mount, render } from 'enzyme'

import AntUploadFile from 'components/upload/antindex.jsx'
import AntUploadFilex from 'components/upload/antindex'
import UploadFile from 'components/upload/index.jsx'
import UploadFilex from 'components/upload/index'
import Operation from 'modules/sprite/components/operation/operation.jsx'
import Operationin from 'modules/sprite/components/operation/operationin.jsx'

describe('components', () => {
  describe('<Upload />', () => {
    it('allows us to set props', () => {
      const wrapper = mount(
        <AntUploadFile
          multiple={false}
          config={{
            session: {
              api: 'portal/cs_sessions?session_type=THUMB&type=THEME'
            },
            remote: {
              upload: {
                version: 'v0.1',
                api: 'upload?session={session}'
              },
              formData: {
                scope: 1
              }
            }
          }
        }/>
      )
      expect(wrapper.props().multiple).to.equal(false)
      wrapper.setProps({ multiple: true })
      expect(wrapper.props().multiple).to.equal(true)
    })
  })

  describe('<Operation />', () => {
    it('renders', () => {
      const wrapper = render(<Operation cssession={{}}/>)
      expect(wrapper.find('.col-24').length).to.equal(3)
    })

    it('renders Operation', () => {
      const wrapper = mount(<Operation cssession={{}}/>)
      expect(wrapper.find(AntUploadFilex)).to.have.length(2)
      expect(wrapper.find(UploadFilex)).to.have.length(2)
    })
  })

  describe('<Operationin />', () => {
    it('renders', () => {
      const wrapper = render(<Operationin cssession={{}}/>)
      expect(wrapper.find('.col-24').length).to.equal(3)
    })

    it('renders Operationin', () => {
      const wrapper = mount(<Operationin cssession={{}}/>)
      expect(wrapper.find(AntUploadFilex)).to.have.length(2)
      expect(wrapper.find(UploadFilex)).to.have.length(2)
    })
  })

  describe('<UploadFile />', () => {
    it('complete state', () => {
      const wrapper = mount(<UploadFile />)
      expect(wrapper.state('complete')).to.equal(false)
    })
  })
})
