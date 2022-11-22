/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import '@carbon/carbon-web-components/es/components/search/search.js';
import styles from './locale-modal.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The regions selector in locale modal.
 *
 * @element dds-regions
 */
@customElement(`${ddsPrefix}-regions`)
class DDSRegions extends StableSelectorMixin(LitElement) {
  /**
   * The shadow slot this regions selector should be in.
   */
  @property({ reflect: true })
  slot = 'regions-selector';

  render() {
    return html`
      <div class="${prefix}--row">
        <slot></slot>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--regions`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSRegions;
