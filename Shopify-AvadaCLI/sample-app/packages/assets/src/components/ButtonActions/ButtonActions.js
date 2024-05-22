import React from 'react';
import {Button, ButtonGroup, Icon} from '@shopify/polaris';
import * as PropTypes from 'prop-types';
import {DeleteMinor, EditMinor, ViewMinor} from '@shopify/polaris-icons';

/**
 *
 * @param canEdit
 * @param canView
 * @param canDelete
 * @param handleView
 * @param handleEdit
 * @param handleDelete
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export default function ButtonActions({
  canEdit = false,
  canView = false,
  canDelete = false,
  handleView,
  handleEdit,
  handleDelete,
  children
}) {
  return (
    <ButtonGroup spacing="extraTight">
      {canView && handleView && (
        <Button disabled={!canView} plain onClick={() => handleView()}>
          <Icon source={ViewMinor} backdrop />
        </Button>
      )}
      {handleEdit && (
        <Button disabled={!canEdit} plain onClick={() => handleEdit()}>
          <Icon source={EditMinor} backdrop color="highlight" />
        </Button>
      )}
      {handleDelete && (
        <Button disabled={!canDelete} plain onClick={() => handleDelete()}>
          <Icon source={DeleteMinor} backdrop color="critical" />
        </Button>
      )}
      {children}
    </ButtonGroup>
  );
}

ButtonActions.propTypes = {
  canEdit: PropTypes.bool,
  canView: PropTypes.bool,
  canDelete: PropTypes.bool,
  handleView: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  handleEdit: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  handleDelete: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  children: PropTypes.node
};
