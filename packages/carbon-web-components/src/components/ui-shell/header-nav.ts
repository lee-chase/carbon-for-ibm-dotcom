/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { html, property, customElement, LitElement } from 'lit-element';
import styles from './header.scss';

const { prefix } = settings;

/**
 * Header.
 *
 * @element bx-header-nav
 * @csspart menu-body The menu body.
 * @csspart divider The divider.
 */
@customElement(`${prefix}-header-nav`)
class BXHeaderNav extends LitElement {
  /**
   * The `aria-label` attribute for the menu bar UI.
   */
  @property({ attribute: 'menu-bar-label' })
  menuBarLabel!: string;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'navigation');
    }
    super.connectedCallback();
  }

  render() {
    const { menuBarLabel } = this;
    return html`
      <div part="divider" class="${prefix}-ce--header__divider"></div>
      <ul part="menu-body" class="${prefix}--header__menu-bar" aria-label="${menuBarLabel}">
        <slot></slot>
      </ul>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXHeaderNav;
