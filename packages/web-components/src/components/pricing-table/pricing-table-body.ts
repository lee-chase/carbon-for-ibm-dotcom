/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSStructuredListBody from '../structured-list/structured-list-body';
import styles from './pricing-table.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-body`)
class DDSPricingTableBody extends StableSelectorMixin(DDSStructuredListBody) {
  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-body`;
  }

  static styles = styles;
}

export default DDSPricingTableBody;
