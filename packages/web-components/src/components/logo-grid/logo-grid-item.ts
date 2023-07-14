/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { html } from 'lit';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './logo-grid.scss';
import DDSImage from '../image/image';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Logo-grid-item.
 *
 * @element dds-logo-grid-item
 */
@customElement(`${ddsPrefix}-logo-grid-item`)
class DDSLogoGridItem extends StableSelectorMixin(DDSImage) {
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader

  static get stableSelector() {
    return `${ddsPrefix}--logo-grid-item`;
  }

  render() {
    return html` <div class="bx--logo-grid__logo">${super.render()}</div> `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLogoGridItem;
