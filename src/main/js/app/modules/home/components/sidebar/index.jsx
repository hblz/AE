import React from 'react';
import { SIDEBAR } from '../../constants'
import Sidebar, { Item } from 'components/sidebar'

import './static/styles/sidebar.scss'

export default class extends React.Component {
  render() {

    let { pathname } = this.props.location;
    pathname = '#' + pathname;

    let routes = SIDEBAR;
    // routes = routes.filter(route => utils.auth.hasAuth(route.roles));

    return (
      <div className="sidebar">
        <Sidebar activeItem={pathname}>
          {
            routes.map((item) => {
              return (
                <Item key={item.title} title={item.title} icon={item.icon}>
                  <Sidebar itemHeight="46px">
                    {
                      item.routes.map((route) => {
                        return <Item
                          key={route.path}
                          title={<span><i className="round"></i>{route.title}</span>}
                          path={`#/${route.path}`}/>
                      })
                    }
                  </Sidebar>
                </Item>)
              })
            }
          }
        </Sidebar>
      </div>
    )
  }
}

{
  /*
  * examples
  *
  <Sidebar>
   <Item title="公众号管理" icon="logout">
     <Sidebar itemHeight="46px">
       <Item title="title1-1"/>
       <Item title="title1-2"/>
     </Sidebar>
   </Item>
   <Item title="消息管理" icon="logout">
     <Sidebar itemHeight="46px">
       <Item title="title2-1"/>
       <Item title="title2-2"/>
     </Sidebar>
   </Item>
  </Sidebar>
  */
}
