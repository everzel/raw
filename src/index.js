/**
 * Build styles
 */
import './index.css';

/**
 * Raw HTML Tool for CodeX Editor
 *
 * @author CodeX (team@codex.so)
 * @copyright CodeX 2018
 * @license The MIT License (MIT)
 */

/**
 *
 */
export default class RawInsertTool {
  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Should this tool be displayed at the Editor's Toolbox
   *
   * @returns {boolean}
   * @public
   */
  static get displayInToolbox() {
    return true;
  }

  /**
   * Allow to press Enter inside the RawInsertTool textarea
   *
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: '<svg version="1.1" width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve">\n' +
          '<g>\n' +
          '\t<g>\n' +
          '\t\t<g>\n' +
          '\t\t\t<path d="M282.503,149.97c-11.43-2.858-23.013,4.092-25.87,15.522l-42.667,170.667c-2.858,11.43,4.092,23.013,15.522,25.87\n' +
          '\t\t\t\ts23.013-4.092,25.87-15.522l42.667-170.667C300.883,164.41,293.933,152.828,282.503,149.97z"></path>\n' +
          '\t\t\t<path d="M170.662,234.667V192c11.782,0,21.333-9.551,21.333-21.333c0-11.782-9.551-21.333-21.333-21.333\n' +
          '\t\t\t\tc-25.201,0-42.667,17.466-42.667,42.667v33.83l-15.085,15.085c-8.331,8.331-8.331,21.839,0,30.17l15.085,15.085V320\n' +
          '\t\t\t\tc0,25.201,17.466,42.667,42.667,42.667c11.782,0,21.333-9.551,21.333-21.333c0-11.782-9.551-21.333-21.333-21.333v-42.667\n' +
          '\t\t\t\tc0-5.658-2.248-11.084-6.248-15.085L158.166,256l6.248-6.248C168.415,245.751,170.662,240.325,170.662,234.667z"></path>\n' +
          '\t\t\t<path d="M383.996,225.83V192c0-25.201-17.466-42.667-42.667-42.667c-11.782,0-21.333,9.551-21.333,21.333\n' +
          '\t\t\t\tc0,11.782,9.551,21.333,21.333,21.333v42.667c0,5.658,2.248,11.084,6.248,15.085l6.248,6.248l-6.248,6.248\n' +
          '\t\t\t\tc-4.001,4.001-6.248,9.427-6.248,15.085V320c-11.782,0-21.333,9.551-21.333,21.333c0,11.782,9.551,21.333,21.333,21.333\n' +
          '\t\t\t\tc25.201,0,42.667-17.466,42.667-42.667v-33.83l15.085-15.085c8.331-8.331,8.331-21.839,0-30.17L383.996,225.83z"></path>\n' +
          '\t\t\t<path d="M426.731,0H85.269C38.181,0,0,38.181,0,85.269v341.461C0,473.819,38.181,512,85.269,512h341.461\n' +
          '\t\t\t\tC473.819,512,512,473.819,512,426.731V85.269C512,38.181,473.819,0,426.731,0z M469.333,426.731\n' +
          '\t\t\t\tc0,23.525-19.078,42.603-42.603,42.603H85.269c-23.525,0-42.603-19.078-42.603-42.603V85.269\n' +
          '\t\t\t\tc0-23.525,19.078-42.603,42.603-42.603h341.461c23.525,0,42.603,19.078,42.603,42.603V426.731z"></path>\n' +
          '\t\t</g>\n' +
          '\t</g>\n' +
          '</g>\n' +
          '<g>\n' +
          '</g>\n' +
          '<g>\n' +
          '</g>\n' +
          '<g>\n' +
          '</g>\n' +
          '<g>\n' +
          '</g>\n' +
          '<g>\n' +
          '</g>\n' +
          '<g>\n' +
          '</g>\n' +
          '<g>\n' +
          '</g>\n' +
          '<g>\n' +
          '</g>\n' +
          '<g>\n' +
          '</g>\n' +
          '<g>\n' +
          '</g>\n' +
          '<g>\n' +
          '</g>\n' +
          '<g>\n' +
          '</g>\n' +
          '<g>\n' +
          '</g>\n' +
          '<g>\n' +
          '</g>\n' +
          '<g>\n' +
          '</g>\n' +
          '</svg>',
      title: 'Raw HTML',
    };
  }

  /**
   * @typedef {object} RawData — plugin saved data
   * @param {string} html - previously saved HTML code
   * @property
   */

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {RawData} data — previously saved HTML data
   * @param {object} config - user config for Tool
   * @param {object} api - CodeX Editor API
   * @param {boolean} readOnly - read-only mode flag
   */
  constructor({ data, config, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;

    this.placeholder = config.placeholder || RawInsertTool.DEFAULT_PLACEHOLDER;

    this.CSS = {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      wrapper: 'ce-rawtool',
      textarea: 'ce-rawtool__textarea',
    };

    this.data = {
      html: data.html || '',
    };

    this.textarea = null;
    this.resizeDebounce = null;
  }

  /**
   * Return Tool's view
   *
   * @returns {HTMLDivElement} this.element - RawInsertTool's wrapper
   * @public
   */
  render() {
    const wrapper = document.createElement('div');
    const renderingTime = 100;

    this.textarea = document.createElement('textarea');

    wrapper.classList.add(this.CSS.baseClass, this.CSS.wrapper);

    this.textarea.classList.add(this.CSS.textarea, this.CSS.input);
    this.textarea.textContent = this.data.html;
    this.textarea.placeholder = this.placeholder;

    if (this.readOnly) {
      this.textarea.disabled = true;
    } else {
      this.textarea.addEventListener('input', () => {
        this.onInput();
      });
    }


    wrapper.appendChild(this.textarea);

    setTimeout(() => {
      this.resize();
    }, renderingTime);

    return wrapper;
  }

  /**
   * Extract Tool's data from the view
   *
   * @param {HTMLDivElement} rawToolsWrapper - RawInsertTool's wrapper, containing textarea with raw HTML code
   * @returns {RawData} - raw HTML code
   * @public
   */
  save(rawToolsWrapper) {
    return {
      html: rawToolsWrapper.querySelector('textarea').value,
    };
  }

  /**
   * Default placeholder for RawInsertTool's textarea
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_PLACEHOLDER() {
    return 'Enter HTML code';
  }

  /**
   * Automatic sanitize config
   */
  static get sanitize() {
    return {
      html: true, // Allow HTML tags
    };
  }

  /**
   * Textarea change event
   *
   * @returns {void}
   */
  onInput() {
    if (this.resizeDebounce) {
      clearTimeout(this.resizeDebounce);
    }

    this.resizeDebounce = setTimeout(() => {
      this.resize();
    }, 200);
  }

  /**
   * Resize textarea to fit whole height
   *
   * @returns {void}
   */
  resize() {
    this.textarea.style.height = 'auto';
    this.textarea.style.height = this.textarea.scrollHeight + 'px';
  }
}
