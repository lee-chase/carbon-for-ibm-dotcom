/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property, query, state } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import BXAccordionItem from '@carbon/carbon-web-components/es/components/accordion/accordion-item.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './filter-panel.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSFilterPanelComposite from './filter-panel-composite';
import DDSFilterPanelCheckbox from './filter-panel-checkbox';
import DDSFilterPanelInputSelectItem from './filter-panel-input-select-item';
import DDSFilterPanelInputSelect from './filter-panel-input-select';

const { stablePrefix: ddsPrefix } = ddsSettings;
const { prefix } = settings;

const viewAllClassName = `${ddsPrefix}-filter-group-item__view-all`;

/**
 * DDSFilterGroupItem renders each individual accordion
 *
 * @element dds-filter-group-item
 */
@customElement(`${ddsPrefix}-filter-group-item`)
class DDSFilterGroupItem extends StableSelectorMixin(BXAccordionItem) {
  /**
   * Extends BXAccordionItem component
   */
  static get stableSelector() {
    return `${ddsPrefix}--filter-group-item`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader

  static get viewAllSelector(): string {
    return `button.${viewAllClassName}`;
  }

  /**
   * The element containing the default slot.
   */
  @query(`.${prefix}--accordion__content`)
  accordionContent: any;

  /**
   * The text for the button that reveals all filters in the group.
   */
  @property({ type: String, attribute: 'view-all-text' })
  viewAllText: string = 'View all';

  /**
   * The number of filters that can be shown without needing to hide any.
   */
  @property({ type: Number, attribute: 'max-filters' })
  maxFilters: number = 7;

  /**
   * The number of filters to show when not all filters are visible.
   */
  @property({ type: Number, attribute: 'filter-cutoff' })
  filterCutoff: number = 5;

  /**
   * Whether or not any hidden filters have been revealed.
   */
  @property({ type: Boolean })
  allRevealed = false;

  /**
   * An element to set focus to on reveal.
   */
  @state()
  _focusedElement: HTMLElement | null = null;

  /**
   * Whether or not to add view all button functionality.
   */
  protected _needsViewAll(): boolean {
    return this.children.length > this.maxFilters;
  }

  /**
   * Checks if any filters beyond the cutoff point have been selected.
   */
  protected _hasHiddenActiveFilter(): boolean {
    const { children, filterCutoff } = this;
    let result: boolean = false;

    [...children].slice(filterCutoff, children.length).forEach((elem) => {
      if (elem instanceof DDSFilterPanelCheckbox) {
        if (elem.checked) result = true;
      }
      if (
        elem instanceof DDSFilterPanelInputSelectItem ||
        elem instanceof DDSFilterPanelInputSelect
      ) {
        if (elem.selected) result = true;
      }
    });

    return result;
  }

  /**
   * Hides or reveals excess filters.
   */
  protected _handleAllRevealed(revealed: boolean): void {
    const { children, filterCutoff, accordionContent } = this;
    const hasHiddenActiveFilter = this._hasHiddenActiveFilter();

    [...children].slice(filterCutoff, children.length).forEach((elem) => {
      (elem as HTMLElement).style.display =
        revealed || hasHiddenActiveFilter ? '' : 'none';
    });

    if (!revealed && !hasHiddenActiveFilter) {
      accordionContent.appendChild(this._renderViewAll());
    }

    this._dispatchViewAllEvent(revealed);
  }

  /**
   * Generates a view all button.
   */
  protected _renderViewAll(): HTMLButtonElement {
    const { children, filterCutoff } = this;

    const viewAll = document.createElement('button');
    viewAll.classList.add(viewAllClassName, `${prefix}--btn--ghost`);
    viewAll.type = 'button';
    viewAll.innerText = this.viewAllText;

    viewAll.addEventListener(
      'click',
      (e): void => {
        this.allRevealed = true;
        if (e.target instanceof HTMLElement) e.target.remove();

        const firstHidden = children[filterCutoff];
        if (firstHidden instanceof HTMLElement) {
          this._focusedElement = firstHidden;
        }
      },
      { passive: true, once: true }
    );

    return viewAll;
  }

  /**
   * Dispatches a custom event that notifies listeners whether or not this
   * filter group has all options revealed.
   */
  protected _dispatchViewAllEvent(removed: boolean): void {
    const { eventViewAll } = this.constructor as typeof DDSFilterGroupItem;
    this.dispatchEvent(
      new CustomEvent(eventViewAll, {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          id: this.titleText,
          value: removed,
        },
      })
    );
  }

  /**
   * Retrieves view all state stored in the filter panel composite. Returns
   * internal value if no cache is found.
   */
  protected _getCachedViewAllValue(): boolean {
    const { allRevealed, titleText } = this;
    let result: boolean = allRevealed;

    const filterPanel = this.closest('dds-filter-panel');
    if (filterPanel !== null) {
      // Indicates this is composite's duplicated content.
      let parentHost: Element | undefined;
      const parent = filterPanel.parentNode;
      if (parent instanceof ShadowRoot) {
        parentHost = parent.host;
      }
      if (parentHost instanceof DDSFilterPanelComposite) {
        const match = parentHost._filterGroupsAllRevealed.find((entry) => {
          return entry.id === titleText;
        });
        if (match !== undefined) {
          result = match.value;
        }
      }
    }

    return result;
  }

  protected firstUpdated(): void {
    if (this._needsViewAll()) {
      this.allRevealed = this._getCachedViewAllValue();
    }
  }

  protected updated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    const { allRevealed, _focusedElement } = this;
    if (this._needsViewAll()) {
      const prevOpen = _changedProperties.get('open');
      const hasAllRevealed = _changedProperties.has('allRevealed');
      const prevAllRevealed = _changedProperties.get('allRevealed');

      // Reset `allRevealed` on accordion close.
      if (prevOpen) {
        this.allRevealed = this._hasHiddenActiveFilter() || false;
      }

      // Respect `allRevealed` attribute.
      if (hasAllRevealed) {
        if (prevAllRevealed === undefined) {
          this._handleAllRevealed(this._getCachedViewAllValue());
        } else {
          this._handleAllRevealed(allRevealed);

          if (allRevealed && _focusedElement instanceof HTMLElement) {
            _focusedElement.focus();
            this._focusedElement = null;
          }
        }
      }
    }
  }

  /**
   * The name of the event that fires when the view all button is toggled.
   */
  static get eventViewAll() {
    return `${ddsPrefix}-filter-group-view-all-toggle`;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSFilterGroupItem;
