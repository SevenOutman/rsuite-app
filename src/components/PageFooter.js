import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dropdown } from 'rsuite';
import { config } from '@rsuite/framework/helpers';
import { Component, component } from '@rsuite/framework/view';

const propTypes = {
  className: PropTypes.string,
};

class PageFooter extends Component {
  render() {
    const classes = classNames('footer', this.props.className);
    const locale = config('app.locale');
    return (
      <div className={classes}>
        <span className="copyright">&copy; COPYRIGHT HYPERS {(new Date()).getFullYear()}</span>

        <div className="pull-right" style={{ padding: '7px 18px' }}>
          <Dropdown
            dropup
            shape="default"
            activeKey={locale}
            select
            onSelect={(newLocale) => {
              newLocale !== locale && config('app.locale', newLocale);
            }}
          >
            <Dropdown.Item eventKey="zh">简体中文</Dropdown.Item>
            <Dropdown.Item eventKey="en">English</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    );
  }
}

PageFooter.propTypes = propTypes;

export default PageFooter;
