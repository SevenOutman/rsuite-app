import React, { Component } from 'react';
import SidebarMenu from './SidebarMenu';
import SidebarToggler from './SidebarToggler';

import { Sidebar } from '../constants/Menus';

class PageSidebar extends Component {
  render() {
    return (
      <div className="page-sidebar-wrapper">
        <div className="page-sidebar">
          <SidebarMenu
            menuItems={Sidebar}
          />
          <SidebarToggler />
        </div>
      </div>
    );
  }
}

export default PageSidebar;
