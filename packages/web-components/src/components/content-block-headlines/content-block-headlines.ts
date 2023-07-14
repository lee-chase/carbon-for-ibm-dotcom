/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, html, TemplateResult } from 'lit';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSContentBlock from '../content-block/content-block';
import styles from './content-block-headlines.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Content Block Headlines
 *
 * @element dds-content-block-headlines
 */
@customElement(`${ddsPrefix}-content-block-headlines`)
class DDSContentBlockHeadlines extends StableSelectorMixin(DDSContentBlock) {
  /**
   * The CSS class list for the container (grid) node.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _getContainerClasses() {
    return `${prefix}--content-layout ${prefix}--content-layout--with-headlines ${prefix}--layout--border`;
  }

  protected _renderInnerBody(): TemplateResult | string | void {
    const { _hasContent: hasContent, _handleSlotChange: handleSlotChange } =
      this;
    return html`
      <div
        ?hidden="${!hasContent}"
        class="${prefix}--content-block-headlines__item-container">
        <slot @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-block-headlines`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

export default DDSContentBlockHeadlines;
