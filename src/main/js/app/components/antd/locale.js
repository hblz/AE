import React, { Component } from 'react'
import i18n from 'i18n'

function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}

export default function locale(key) {
  return function Wrapper(WrappedComponent) {
    let t;

    return class Locale extends Component {

      static displayName = 'LocaleWrapped[' + getDisplayName(WrappedComponent) + ']';

      componentWillMount() {
        t = i18n.getFixedT(null, 'antd');
      }

      render() {
        const locale = t(key) || {};

        return <WrappedComponent {...this.props} locale={locale}/>
      }
    }
  };
}
