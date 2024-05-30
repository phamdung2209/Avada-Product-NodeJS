import React, {useCallback, useMemo, useState} from 'react';
import {
  Button,
  ButtonGroup,
  Checkbox,
  EmptyState,
  FormLayout,
  Heading,
  ResourceItem,
  ResourceList
} from '@shopify/polaris';
import prepareLabel from '@avada/functions/src/helpers/utils/prepareLabel';
import compareIdCounter from '@functions/helpers/utils/compareIdCounter';
import TooltipText from '@assets/components/Utils/TooltipText';

/**
 * Hook for rendering table list with data fetched from URL
 *
 * @param {function} renderItemCols
 * @param renderChildCols
 * @param {*[]} columns
 * @param childColumns
 * @param {{label: string, onAction, disabled: boolean}[]} massActions
 * @param renderStates
 * @param items
 * @param setItems
 * @param canEdit
 * @returns {{setCheckedItems, checkedItems, handleCheckAll, renderList}}
 */
export default function useDataResourceList({
  renderItemCols = _row => [],
  renderChildCols = _row => <></>,
  columns = [],
  massActions = [],
  renderStates = [],
  items = [],
  setItems,
  canEdit = true
}) {
  const [checkedItems, setCheckedItems] = useState([]);

  const isChecked = (item, items = checkedItems) => !!items.find(x => compareIdCounter(x, item));
  const handleCheckItem = item => {
    setCheckedItems(prev => {
      return isChecked(item, prev) ? prev.filter(x => !compareIdCounter(x, item)) : [...prev, item];
    });
  };

  /**
   * @returns {boolean | 'indeterminate'}
   */
  const isCheckedAll = () => {
    if (!items.length) {
      return false;
    }
    if (items.every(item => checkedItems.find(check => compareIdCounter(check, item)))) {
      return true;
    }
    if (items.some(item => checkedItems.find(check => compareIdCounter(check, item)))) {
      return 'indeterminate';
    }
    return false;
  };
  const handleCheckAll = (checked = true) => {
    setCheckedItems(prev => {
      return checked
        ? [...prev, ...items.filter(item => !prev.find(p => compareIdCounter(p, item)))]
        : prev.filter(p => !items.find(item => compareIdCounter(item, p)));
    });
  };

  const MassActionRow = () => (
    <div className="Avada-AdvancedResourceList__MassAction">
      <Checkbox label="" checked={isCheckedAll()} onChange={handleCheckAll} />
      <div style={{margin: '0 1rem'}}>
        <Heading>{prepareLabel(checkedItems.length)} selected</Heading>
      </div>
      <ButtonGroup segmented>
        {massActions.map((action, index) => (
          <Button
            key={index}
            disabled={action.disabled === true}
            onClick={() => action.onAction(checkedItems)}
            size="slim"
          >
            {action.label}
          </Button>
        ))}
        <Button onClick={() => setCheckedItems([])} size="slim">
          Clear
        </Button>
      </ButtonGroup>
    </div>
  );

  const HeaderRow = () => (
    <FormLayout>
      <FormLayout.Group>
        {columns.map((col, key) => {
          if (col.checkbox) {
            return (
              <Checkbox key={key} label="" checked={isCheckedAll()} onChange={handleCheckAll} />
            );
          }
          return (
            <TooltipText
              key={key}
              label={col.label || ''}
              tooltip={col.tooltip}
              variation="strong"
            />
          );
        })}
      </FormLayout.Group>
    </FormLayout>
  );

  const handleItemChange = (id, key, value) => {
    setItems(prev => prev.map(item => (item.id === id ? {...item, [key]: value} : item)));
  };

  const renderItem = useCallback(
    (item, index) => {
      if (item === 'header') {
        return (
          <ResourceItem id={index}>
            <div className="Avada-AdvancedResourceList__BodyRow">
              {canEdit && checkedItems.length > 0 ? <MassActionRow /> : <HeaderRow />}
            </div>
          </ResourceItem>
        );
      }

      const renderItem = {
        ...item,
        isRowChecked: isChecked(item),
        onRowChange: handleItemChange,
        onRowCheck: () => handleCheckItem(item)
      };

      if (item.childCustomTable && item.isChild) {
        return (
          <ResourceItem id={index} verticalAlignment="center">
            {renderChildCols(renderItem)}
          </ResourceItem>
        );
      }

      return (
        <ResourceItem id={index}>
          <div className="Avada-AdvancedResourceList__BodyRow">
            <FormLayout>
              <FormLayout.Group>
                {renderItemCols(renderItem, index).map(col => col)}
              </FormLayout.Group>
            </FormLayout>
          </div>
        </ResourceItem>
      );
    },
    [items, checkedItems, ...renderStates]
  );

  const isEmptyClass = items.length === 0 ? ' isEmpty' : '';
  const hasCheckbox = columns.find(col => col.checkbox) ? ' hasCheckbox' : '';
  const renderList = useMemo(
    () => (
      <div
        className={`Avada-AdvancedResourceList__Items Avada-DataResourceList__Items${isEmptyClass}${hasCheckbox}`}
      >
        <ResourceList
          emptyState={<EmptyState image="" heading="No results found" />}
          resourceName={{singular: 'item', plural: 'items'}}
          items={items.length > 0 ? ['header', ...items] : items}
          renderItem={renderItem}
        />
      </div>
    ),
    [items, checkedItems, ...renderStates]
  );

  return {renderList, checkedItems, setCheckedItems, handleCheckAll};
}
