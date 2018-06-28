import ListModel from 'modules/sprite/models/group/list'
import 'utils/polyfill'

describe('MODEL', () => {
  it('GET THEME LIST', (done) => {
  	new ListModel().onAny(opts => {
      opts.replacement = {
        type: 'THEME'
      },
      opts.params = {
        $limit: 10,
          $offset: 0
        }
      }).GET().then(res => {
        done()
      }).catch(err => {
        done()
      })
    })
})
