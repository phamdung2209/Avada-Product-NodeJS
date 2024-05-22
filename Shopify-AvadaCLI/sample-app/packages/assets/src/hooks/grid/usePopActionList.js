import React, {useCallback, useState, useEffect} from 'react';
import {Popover} from '@shopify/polaris';
import isEmpty from '@functions/helpers/utils/isEmpty';
import PropTypes from 'prop-types';

/**
 * @param {boolean} mouseOutEvent
 * @returns {{PopAction: (function({id?: *, children: *, activator: *, sectioned?: boolean, preferredAlignment?: ("left"|"center"|"right"), preferredPosition?: ("above"|"mostSpace"|"below")})), togglePop: ((function(*, *): void)|*), popState: {}}}
 */
export default function usePopActionList({mouseOutEvent} = {}) {
  const [popoverActive, setPopoverActive] = useState({});
  const defaultId = 'PopAction';

  const togglePop = useCallback((id = defaultId, source) => {
    if (typeof mouseOutEvent === 'undefined' || typeof source === 'undefined') {
      setPopoverActive(prev => ({[id]: !prev[id]}));
    }
  }, []);

  useEffect(() => {
    // if (mouseOutEvent) {
    // dismiss popover on click outside
    document.querySelector('body').onclick = event => {
      if (isEmpty(popoverActive)) return;
      const wrapper = document.querySelector('.Avada-PopAction__Wrapper');
      if (!wrapper || wrapper.contains(event.target)) return;
      setPopoverActive({});
    };
    // }
  }, [popoverActive]);

  /**
   * @param id
   * @param activator
   * @param children
   * @param {boolean} sectioned
   * @param {'left' | 'center' | 'right'} preferredAlignment
   * @param {'above' | 'mostSpace' | 'below'} preferredPosition
   * @returns {JSX.Element}
   * @constructor
   */
  const PopAction = ({
    id = defaultId,
    children,
    activator,
    sectioned = false,
    preferredAlignment = 'right',
    preferredPosition = 'mostSpace'
  }) => (
    <Popover
      sectioned={sectioned}
      onClose={() => {}}
      active={popoverActive[id]}
      activator={activator}
      preferredAlignment={preferredAlignment}
      preferredPosition={preferredPosition}
      fullHeight
    >
      <div className="Avada-PopAction__Wrapper">{children}</div>
    </Popover>
  );

  PopAction.propTypes = {
    id: PropTypes.string,
    children: PropTypes.any,
    activator: PropTypes.any,
    sectioned: PropTypes.bool,
    preferredAlignment: PropTypes.string,
    preferredPosition: PropTypes.string
  };

  return {PopAction, togglePop, popState: popoverActive};
}
