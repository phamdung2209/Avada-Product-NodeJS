import React, {useEffect} from 'react';
import {Frame, Loading, Toast} from '@shopify/polaris';
import {useHistory, useLocation} from 'react-router-dom';
import '../../styles/layout/navigation.scss';
import BadgeBranch from '@assets/components/BadgeBranch';
import isStaging from '@assets/helpers/isStaging';
import {useStore} from '@assets/reducers/storeReducer';
import {closeToast} from '@assets/actions/storeActions';
import PropTypes from 'prop-types';
/**
 * @param children
 * @returns {Element}
 * @constructor
 */
function AppEmbeddedLayout({children}) {
  const history = useHistory();
  const location = useLocation();
  const {pathname} = location;

  const {state, dispatch} = useStore();
  const {loading, toast} = state;

  useEffect(() => {
    if (pathname === '/embed/reviews') {
      history.push('/reviews/import');
    }
  }, [pathname]);

  return (
    <Frame>
      <div className="Avada-Frame">
        {isStaging && <BadgeBranch />}
        {children}
      </div>
      {loading && <Loading />}
      {toast && <Toast onDismiss={() => closeToast(dispatch)} {...toast} />}
    </Frame>
  );
}

AppEmbeddedLayout.propTypes = {
  children: PropTypes.string
};

export default AppEmbeddedLayout;
