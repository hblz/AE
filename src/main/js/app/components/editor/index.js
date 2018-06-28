import React from 'react';
import './static/styles/index.scss';
import 'kindeditor';
import 'kindeditor/themes/default/default.css';

export default class extends React.Component {
  componentDidMount() {
    var editorItems = [
      'source', 'fullscreen', 'undo', 'redo', 'justifyleft', 'justifycenter', 'justifyright',
      'justifyfull', 'indent', 'outdent', 'subscript',
      'superscript', 'link',
      'fontname', 'formatblock',
      'fontsize',
      'forecolor', 'hilitecolor', 'bold',
      'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', 'picture',
      'hr'
    ];

    var options = {
      minWidth: this.props.width || 500,
      minHeight: 300,
      maxHeight: 500,
      items: this.props.editorItems || editorItems,
      pluginsPath: `KEPlugins/`
    }

    KindEditor.lang({
      new_image: this.props.t_image || "",
      label_text: this.props.labelText,
      btn_text: this.props.btnText,
      error_text: this.props.errorText,
      yes_text: this.props.yesText,
      no_text: this.props.noText
    });

    this.editor = KindEditor.create(this.refs.content, {...options, ...this.props.options});

    // FIX: 动态插入内容，为了解决刚开始时，鼠标滚动，滚动条不滚动的 bug
    setTimeout(function () {
      this.editor.appendHtml(this.props.defaultValue);
    }.bind(this), 100);
  }

  componentWillReceiveProps(nextProps) {
    KindEditor.lang({
      new_image: nextProps.t_image || "",
      label_text: nextProps.labelText,
      btn_text: nextProps.btnText,
      error_text: nextProps.errorText,
      yes_text: nextProps.yesText,
      no_text: nextProps.noText
    });
  }

  // 取值
  getValue() {
    this.editor.sync();
    return this.refs.content.value;
  }

  // 设值
  setValue(html) {
    this.editor.html("");
  }

  render() {
    return (
      <textarea ref="content" defaultValue=""></textarea>
    );
  }
};