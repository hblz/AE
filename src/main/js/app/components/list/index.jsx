import React from 'react';
import './static/styles/index.scss';
import { Breadcrumb, Menu, Dropdown, Button, Icon, Select, Input, Row, Col, Pagination, Table } from 'antd';
import utils from 'utils';
import i18n from 'i18n'

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      current: 1
    };
  }

  componentWillMount() {
    this.props.fetch(
      this.props.restParams
    );
  }

  reset() {
    this.setState({
      current: 1
    });
  }

  onChange(pagination, filters, sorter) {
    let restParams = this.props.restParams;
    let page = 1;
    if(!!sorter.order){
      restParams.params['$orderby'] = sorter.field + " " + sorter.order.substring(0, sorter.order.length - 3);
    }else{
      restParams.params['$orderby'] = this.props.defultOrderby;
    }
    // if(pagination.current != this.state.current){
      page = pagination.current !==undefined ? pagination.current : 1 ;
      this.setState({
        current: page
      });

      restParams.params['$offset'] = (page - 1) * (!!this.props.pageSize ? this.props.pageSize : utils.PAGE_SIZE);
    // }

    this.props.fetch(restParams, page);
  }

  expandedRowRender(record){
    return this.props.expandedRowRender(record);
  }

  render() {
    let columns = [];

    let columnsData = this.props.columnsData || [];
    for (let key in this.props.labelMap) {
      let right = true;
      for (let item in columnsData) {
        if (key == columnsData[item].dataIndex) {
          columns.push(columnsData[item]);
          right = false;
        }
      }
      if (right) {
        columns.push({
          dataIndex: key,
          title: this.props.labelMap[key]
        });
      }
      ;
    }

    columns.push(this.props.operation);

    let data = this.props.data || {};
    let total = data.count || data.total || 1;

    let dataSource = (function (items) {
        return items.map(function (item, key) {
          // key
          item.key = item[this.props.keyName] || key;
          return this.props.inFilter ? this.props.inFilter(item) : item;
        }.bind(this));
      }.bind(this))(data.items || []) || [];

    let pagination = {
      total: total,
      pageSize: !!this.props.pageSize ? this.props.pageSize : utils.PAGE_SIZE,
      onChange: () => {},
      current: !!this.props.currentPage ? this.props.currentPage : this.state.current
    };
    let tableProps = {
      columns: columns,
      dataSource: dataSource,
      pagination: this.props.noPagination || total <= pagination.pageSize ? false : pagination,
      onChange: this.onChange.bind(this)
    }
    if(this.props.hasExpanded){
      tableProps.expandedRowRender = this.expandedRowRender.bind(this);
    }
    if(this.props.expandedRowKeys){
      tableProps.expandedRowKeys = this.props.expandedRowKeys;
    }
    if(this.props.rowSelection){
      tableProps.rowSelection = this.props.rowSelection;
    }

    return (
      <div className="cmp-list">
        <Table {...tableProps} />
      </div>
    );
  }
};
