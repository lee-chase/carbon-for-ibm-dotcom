/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import BXCheckbox from '@carbon/carbon-web-components/es/components/checkbox/checkbox.js';
import FocusMixin from '@carbon/carbon-web-components/es/globals/mixins/focus.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import '@carbon/carbon-web-components/es/components/modal/modal.js';
import styles from './filter-panel.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Filter Panel Checkbox
 *
 * @element dds-filter-panel-checkbox
 * @fires dds-checkbox-select - The custom event fired after this changebox changes its checked state.
 */
@customElement(`${ddsPrefix}-filter-panel-checkbox`)
class DDSFilterPanelCheckbox extends FocusMixin(
  StableSelectorMixin(BXCheckbox)
) {
  /**
   * Handles `click` event on the `<input>` in the shadow DOM.
   */
  protected _handleChange() {
    const { checked, indeterminate } = this._checkboxNode;
    this.checked = checked;
    this.indeterminate = indeterminate;
    const { eventChange } = this.constructor as typeof BXCheckbox;
    this.dispatchEvent(
      new CustomEvent(eventChange, {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
        },
      })
    );
  }

  /**
   * The name of the event that fires upon checkbox is selected
   */
  static get eventChange() {
    return `${ddsPrefix}-checkbox-select`;
  }

  static get stableSelector() {
    return `${ddsPrefix}-filter-panel-checkbox`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSFilterPanelCheckbox;
