/* global React */

import { addons } from 'react/addons';
import Ripple from '../ripple';
import style from './style';
import events from '../utils/events';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Checkbox',

  propTypes: {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      checked: false,
      className: '',
      disabled: false
    };
  },

  getInitialState () {
    return { checked: this.props.checked };
  },

  handleChange (event) {
    this.setState({checked: !this.state.checked}, () => {
      if (this.props.onChange) this.props.onChange(event, this);
    });
  },

  handleClick (event) {
    events.pauseEvent(event);
    if (!this.props.disabled) this.handleChange(event);
  },

  handleMouseDown (event) {
    if (!this.props.disabled) this.refs.ripple.start(event);
  },

  handleInputClick (event) {
    events.pauseEvent(event);
  },

  render () {
    let fieldClassName = style.field;
    let checkboxClassName = style.check;
    if (this.props.disabled) fieldClassName += ` ${style.disabled}`;
    if (this.props.className) fieldClassName += ` ${this.props.className}`;
    if (this.state.checked) checkboxClassName += ` ${style.checked}`;

    return (
      <label
        data-react-toolbox='checkbox'
        className={fieldClassName}
        onClick={this.handleClick}
      >
        <input
          {...this.props}
          ref='input'
          type='checkbox'
          checked={this.state.checked}
          className={style.input}
          onChange={this.handleChange}
          onClick={this.handleInputClick}
        />
        <span role='checkbox' className={checkboxClassName} onMouseDown={this.handleMouseDown}>
          <Ripple ref='ripple' role='ripple' className={style.ripple} spread={3} centered />
        </span>
        { this.props.label ? <span className={style.text}>{this.props.label}</span> : null }
      </label>
    );
  },

  blur () {
    this.refs.input.getDOMNode().blur();
  },

  focus () {
    this.refs.input.getDOMNode().focus();
  },

  getValue () {
    return this.state.checked;
  },

  setValue (value) {
    this.setState({checked: value});
  }
});
