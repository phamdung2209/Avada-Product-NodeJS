import TooltipText from '@assets/components/Utils/TooltipText';
import {defaultSortOrders} from '@assets/config/gridConfig';
import selectionTypes from '@assets/const/selectionTypes';
import usePopActionList from '@assets/hooks/grid/usePopActionList';
import {
  ActionList,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  ChoiceList,
  EmptyState,
  Filters,
  FormLayout,
  Heading,
  IndexTable,
  Pagination,
  ResourceItem,
  ResourceList,
  Select,
  SkeletonBodyText,
  Spinner,
  TextStyle,
  useIndexResourceState
} from '@shopify/polaris';
import {CaretDownMinor, CaretUpMinor, SortMinor} from '@shopify/polaris-icons';
import queryString from 'query-string';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import useFetchApi from '../api/useFetchApi';
import OptionListSelect from '@assets/components/Utils/OptionListSelect';
import compareIdCounter from '@functions/helpers/utils/compareIdCounter';
import cleanEmptyField from '@functions/helpers/utils/cleanEmptyField';
import prepareLabel from '@functions/helpers/utils/prepareLabel';
import {formatNumber, isEmpty} from '@avada/utils';
import EmptyIcon from '@assets/resources/icons/empty.svg';
import PropTypes from 'prop-types';

function filtersToObject(filters) {
  return filters.reduce((prev, filter) => ({...prev, [filter.key]: filter.defaultValue || ''}), {});
}
function prepareUrl(url, params) {
  const formatParams = Object.keys(params).reduce((prev, current) => {
    const value = params[current];
    return {...prev, [current]: Array.isArray(value) ? value.join(',') : value};
  }, {});
  return `${url}?${queryString.stringify(formatParams)}`;
}
/**
 * Extract children from parent items
 * Each parent item must have isParent = true and childDetails array
 * If childCustomTable = true, add only one row to render a custom table for children items
 *
 * @param {*[]} items
 * @param expandedItems
 * @returns {*[]}
 */
function prepareExpandItems(items, expandedItems) {
  const list = [];
  items.forEach(item => {
    list.push(item);
    if (
      !item.isParent ||
      !item.childDetails.length ||
      !expandedItems.find(x => compareIdCounter(x, item))
    ) {
      return;
    }
    if (item.childCustomTable) {
      list.push({...item, isParent: false, isChild: true, hidden: true});
    } else {
      list.push(...item.childDetails.map(item => ({...item, isChild: true})));
    }
  });
  return list;
}

/**
 * Hook for rendering table list with data fetched from URL
 *
 * @param {string} fetchUrl
 * @param {function} renderItemCols
 * @param {function} renderChildCols
 * @param {function} prepareRowUrl
 * @param {*[]} renderStates
 * @param {[{value, label?, checkbox?, expand?, sortable?, tooltip?}]} columns
 * @param {[{value, label?, checkbox?, expand?, sortable?, tooltip?}]} childColumns
 * @param {*[]} sortOrders
 * @param orderBy
 * @param defaultLimit
 * @param customKey
 * @param searchValue
 * @param searchLabel
 * @param {{key: string, label: string, choices: {value, label}[], allowMultiple: boolean, loading?: boolean}[]} filters
 * @param initQueries
 * @param tabQueries
 * @param massActions
 * @param canEdit
 * @returns {{hasPage: (*|boolean), data: (*[]|*), searchBar: JSX.Element, limit: (false|JSX.Element), paginate: (*|JSX.Element|boolean), handleCustomQueries: (function(*): Promise<void>), renderList: JSX.Element, loading: (boolean|*), fetched: (boolean|*), lastParams: React.MutableRefObject}}
 */
export default function useFetchResourceList({
  fetchUrl,
  renderItemCols = _row => [],
  renderChildCols = _row => <></>,
  prepareRowUrl = _row => null,
  renderStates = [],
  columns = [],
  childColumns = [],
  sortOrders = defaultSortOrders,
  orderBy = 'id',
  orderDir = 'desc',
  defaultLimit = '20',
  searchValue = 'searchValue',
  searchLabel = '',
  filters = [],
  initQueries = {},
  tabQueries = {},
  massActions = [],
  canEdit = true,
  footerLabel = 'item',
  prepareData = data => data,
  childCheckBox = true,
  filterChild = false,
  emptyMessage = ''
}) {
  const [queries, setQueries] = useState({
    order_dir: orderDir,
    order_by: orderBy,
    limit: defaultLimit,
    [searchValue]: ''
  });
  const [sortField, direction] = [queries.order_by, queries.order_dir];
  const [appliedFilters, setAppliedFilters] = useState(filtersToObject(filters));
  const [checkedItems, setCheckedItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const {selectedResources, handleSelectionChange} = useIndexResourceState([]);
  const lastParams = useRef({
    ...queries,
    ...initQueries,
    ...tabQueries
  });

  const {data, setData, loading, fetched, fetchApi, pageInfo, additionalData} = useFetchApi({
    url: prepareUrl(fetchUrl, lastParams.current)
  });

  const items = prepareExpandItems(prepareData(data), expandedItems);
  const totalCountChild = [];
  items.forEach(item => {
    item.childDetails?.forEach(val => {
      totalCountChild.push(val);
    });
  });
  const {perPage, totalItem} = pageInfo;
  const [page, setPage] = useState(1);
  const hasPage = !data.hasOwnProperty('hasPage') || data.hasPage;
  const hasPre = page !== 1;
  const totalPage = Math.ceil(totalItem / perPage);
  const hasNext = !(totalPage === page);
  const {PopAction, togglePop} = usePopActionList({mouseOutEvent: true});

  const handleQueryChange = (key, value, isFetch = false, isCount = false, rest = []) => {
    setQueries(prev => ({...prev, [key]: value, ...rest[0]}));
    if (isFetch) {
      handleFetchApi('', {...queries, [key]: value, ...rest[0]}, isCount).then(() => {});
    }
  };

  const handleFilterChange = (key, value, isCustom = false) => {
    if (isCustom) {
      Object.keys(appliedFilters)
        .filter(k => k.search(key) !== -1)
        .forEach(z => delete appliedFilters[z]);
    }
    setAppliedFilters(prev => ({...prev, [key]: value}));
  };

  const handleOrderByChange = colId => {
    let newSortType = colId + '_';
    if (sortField === colId) {
      newSortType += direction === 'asc' ? 'desc' : 'asc';
    } else {
      newSortType += 'desc';
    }
    handleQueryChange('order', newSortType);
  };

  const handleFetchApi = async (paginate = '', paramQueries = queries, toCount = true) => {
    const pageNo = (() => {
      switch (paginate) {
        case 'prev':
          return page === 1 ? page : page - 1;
        case 'next':
          return page + 1;
        default:
          return 1;
      }
    })();
    /** @type any */
    const prepareFilter = cleanEmptyField(appliedFilters);
    const params = {
      ...tabQueries,
      ...prepareFilter,
      ...paramQueries,
      ...initQueries,
      page: pageNo
    };

    await fetchApi(prepareUrl(fetchUrl, params));
    lastParams.current = params;
    setPage(pageNo);
  };

  const handleCustomQueries = customQueries => handleFetchApi('', {...queries, ...customQueries});
  const handleCustomQuery = (key, value) => handleQueryChange(key, value, true);

  useEffect(() => {
    if (!loading && fetched) {
      handleFetchApi().then(() => {});
    }
  }, [appliedFilters]);

  const isExpanded = (item, items = expandedItems) => !!items.find(x => compareIdCounter(x, item));
  const handleExpandItem = item => {
    setExpandedItems(prev => {
      return isExpanded(item, prev)
        ? prev.filter(x => !compareIdCounter(x, item))
        : [...prev, item];
    });
  };
  const isChecked = item => !!checkedItems.find(x => compareIdCounter(x, item));
  const handleCheckItem = item => {
    const toggleType = !isChecked(item);
    setCheckedItems(prev => {
      return toggleType ? [...prev, item] : prev.filter(x => !compareIdCounter(x, item));
    });
    if (item.childCustomTable) {
      handleCheckChild(item, 'page', toggleType);
    }
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
  const handleCheckAll = toggleType => {
    setCheckedItems(prev => {
      return toggleType
        ? [...prev, ...items.filter(i => !prev.find(p => compareIdCounter(p, i)) && !i.hidden)]
        : prev.filter(p => !items.find(item => compareIdCounter(item, p)));
    });
    items.forEach(item => {
      if (item.hidden || !item.childDetails?.length || !item.childCustomTable) {
        return;
      }
      item.childDetails.forEach(child => {
        handleSelectionChange(selectionTypes.single, toggleType, child.id);
      });
    });
  };

  /**
   * @param item
   * @param {'all' | 'page' | 'multi' | 'single' | *} selectionType
   * @param {boolean} toggleType
   * @param {string | number[]} selection
   */
  const handleCheckChild = (item, selectionType, toggleType, selection = null) => {
    if (!item.childDetails?.length) {
      return;
    }
    if (
      ['Polaris-Button', 'Polaris-ActionList'].find(className => {
        return event?.target?.className?.includes(className);
      })
    ) {
      return;
    }
    const toSelect = (() => {
      switch (selectionType) {
        case 'all':
        case 'page':
          return item.childDetails
            .map(x => x.id)
            .filter(x => toggleType && !selectedResources.includes(x));
        case 'single':
          return [selection];
        case 'multi':
          return [];
      }
    })();
    if (toSelect.length) {
      toSelect.forEach(x => {
        handleSelectionChange(selectionTypes.single, toggleType, x);
      });
    } else {
      item.childDetails.forEach(child => {
        handleSelectionChange(selectionTypes.single, toggleType, child.id);
      });
    }
    setCheckedItems(prev => {
      const list = prev.filter(x => !compareIdCounter(x, item));
      if (toggleType) {
        return [...list, item];
      }
      if (toSelect.length === 0) {
        return list;
      }
      if (
        item.childDetails
          .filter(x => !toSelect.includes(x.id))
          .some(child => selectedResources.includes(child.id))
      ) {
        return [...list, item];
      }
      return list;
    });
  };

  const hasExpand = columns.find(col => col.expand) ? ' hasExpand' : '';
  const MassActionRow = () => (
    <div
      className={`MP-AdvancedResourceList__MassAction MP-FetchResourceList__MassAction` + hasExpand}
    >
      <Checkbox label="" checked={isCheckedAll()} onChange={handleCheckAll} />
      <div style={{margin: '0 1rem'}}>
        <Heading>
          {prepareLabel(checkedItems.length || [...new Set(selectedResources)].length)} selected
        </Heading>
      </div>
      <ButtonGroup segmented>
        {massActions.map((action, index) => (
          <Button
            key={index}
            onClick={() => action.onAction(checkedItems)}
            loading={action.loading || false}
            size="slim"
          >
            <span style={{color: action.color}}>{action.label}</span>
          </Button>
        ))}
        <Button
          size="slim"
          onClick={() => {
            setCheckedItems([]);
            handleSelectionChange(selectionTypes.all, false);
          }}
        >
          Clear
        </Button>
      </ButtonGroup>
    </div>
  );

  const HeaderRow = () => (
    <FormLayout>
      <FormLayout.Group>
        {columns.map((col, key) => {
          let icon = null;
          if (sortField === col.value) {
            icon = direction === 'asc' ? CaretUpMinor : CaretDownMinor;
          }
          if (col.checkbox) {
            return (
              <Checkbox
                disabled={appliedFilters?.status?.includes(2)} // To do: improve disable deleted user
                key={key}
                label=""
                checked={isCheckedAll()}
                onChange={handleCheckAll}
              />
            );
          }
          if (col.sortable) {
            return (
              <Button
                key={key}
                icon={icon}
                disabled={loading}
                onClick={() => handleOrderByChange(col.value)}
                plain
              >
                <TextStyle variation="strong">{col.label}</TextStyle>
              </Button>
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
    const item = items.find(x => x.id === id) || {};
    if (item.isChild && item.parentId) {
      return handleFetchApi();
    }
    setData(prev => prev.map(item => (item.id === id ? {...item, [key]: value} : item)));
  };

  const renderItem = useCallback(
    (item, index) => {
      if (item === 'header') {
        return (
          <ResourceItem id={index} key={index + '_item'}>
            <div className="MP-AdvancedResourceList__BodyRow">
              {canEdit && checkedItems.length > 0 ? <MassActionRow /> : <HeaderRow />}
            </div>
          </ResourceItem>
        );
      }
      const renderItem = {
        ...item,
        isRowChecked: isChecked(item),
        isRowExpanded: isExpanded(item),
        onRowChange: handleItemChange,
        onRowCheck: () => handleCheckItem(item),
        onRowExpand: () => handleExpandItem(item)
      };
      if (renderItem.isRowExpanded && item.childCustomTable && item.isChild) {
        const {childDetails: prepareChilds} = item;
        const childDetails = filterChild
          ? prepareChilds.filter(x =>
              tabQueries?.status?.length > 0 ? x.status === tabQueries.status : x
            )
          : prepareChilds;
        const childIds = childDetails.map(x => x.id);
        return (
          <ResourceItem id={index} verticalAlignment="center">
            <div className="MP-AdvancedResourceList__ChildCustomTable">
              <IndexTable
                itemCount={childDetails.length}
                selectedItemsCount={selectedResources.filter(x => childIds.includes(x)).length}
                headings={childColumns.map(x => ({title: x.label}))}
                onSelectionChange={(...params) => handleCheckChild(item, ...params)}
                selectable={childCheckBox}
              >
                {childDetails.map((child, index) => (
                  <IndexTable.Row
                    id={child.id}
                    key={index}
                    position={index}
                    selected={selectedResources.includes(child.id)}
                  >
                    {childColumns.map((col, colIndex) => (
                      <IndexTable.Cell key={colIndex}>
                        {renderChildCols({item, child, col: col.value})}
                      </IndexTable.Cell>
                    ))}
                  </IndexTable.Row>
                ))}
              </IndexTable>
            </div>
          </ResourceItem>
        );
      }

      return (
        <ResourceItem
          id={index}
          url={prepareRowUrl(item)}
          dataHref={item.isChild && 'MP-AdvancedResourceList__ChildRow'}
          verticalAlignment="center"
        >
          <div
            className={`MP-AdvancedResourceList__BodyRow ${
              item.hightlight ? 'hightlight' : 'unhightlight'
            }`}
          >
            <FormLayout>
              <FormLayout.Group>{renderItemCols(renderItem)}</FormLayout.Group>
            </FormLayout>
          </div>
        </ResourceItem>
      );
    },
    [items, checkedItems, expandedItems, ...renderStates]
  );

  const isEmptyClass = !loading && items.length === 0 ? ' isEmpty' : '';
  const hasCheckbox = columns.find(col => col.checkbox) ? ' hasCheckbox' : '';
  const renderList = useMemo(
    () => (
      <div
        className={`MP-AdvancedResourceList__Items MP-FetchResourceList__Items${isEmptyClass}${hasCheckbox}${hasExpand}`}
      >
        {loading ? (
          <Card>
            <Card.Section>
              <SkeletonBodyText lines={1} />
            </Card.Section>
            <Card.Section>
              <SkeletonBodyText lines={15} />
            </Card.Section>
          </Card>
        ) : (
          <ResourceList
            emptyState={
              <EmptyState heading="There is no data to show" image={EmptyIcon}>
                <p>
                  <TextStyle variation={'strong'}></TextStyle>
                </p>
                {emptyMessage}
              </EmptyState>
            }
            resourceName={{singular: 'item', plural: 'items'}}
            items={items.length > 0 ? ['header', ...items] : items}
            renderItem={renderItem}
          />
        )}
      </div>
    ),
    [items, checkedItems, expandedItems, loading, ...renderStates]
  );

  const filterRenders = filters.map((filter, index) => {
    const {
      key,
      label,
      shortcut = true,
      choices = [],
      allowMultiple,
      includeSearch,
      renderFilter
    } = filter;
    return {
      key,
      label,
      shortcut,
      filter: filter.loading ? (
        <Spinner key={index} size="large" />
      ) : renderFilter ? (
        renderFilter({appliedFilters, handleFilterChange, loading})
      ) : includeSearch ? (
        <OptionListSelect
          input={appliedFilters[key] || []}
          includeTagList={false}
          usePopover={false}
          list={choices}
          multiple={allowMultiple}
          onChange={val => handleFilterChange(key, val)}
        />
      ) : (
        <ChoiceList
          key={index}
          title=""
          titleHidden
          choices={choices}
          selected={appliedFilters[key]}
          allowMultiple={allowMultiple}
          onChange={val => handleFilterChange(key, val)}
          disabled={loading}
        />
      )
    };
  });

  const filterToArray = Object.keys(appliedFilters)
    .filter(key => !isEmpty(appliedFilters[key]) && filters.find(x => x.key === key))
    .map(key => {
      const value = appliedFilters[key];
      const {label, choices, removeValue} = filters.find(x => x.key === key);
      const choiceLabel = choices
        .filter(x => value.includes(x.value))
        .map(x => x.label)
        .join(', ');
      return {
        key,
        label: `${label} is ${choiceLabel}`,
        onRemove: index => {
          if (removeValue) {
            return handleFilterChange(index, '', true);
          }
          handleFilterChange(index, '');
        }
      };
    });

  const searchBar = (
    <SearchBar
      {...{
        queries,
        setAppliedFilters,
        filters,
        searchValue,
        handleFetchApi,
        searchLabel,
        filterRenders,
        filterToArray,
        handleQueryChange
      }}
    />
  );
  const sortOrder = (
    <PopAction
      id="status"
      activator={
        <Button icon={SortMinor} onClick={() => togglePop('status')}>
          Sort
        </Button>
      }
    >
      <ActionList
        items={sortOrders.map(s => ({
          content: s.label,
          active: s.order_by === queries.order_by && s.order_dir === queries.order_dir,
          disabled:
            (s.order_by === queries.order_by && s.order_dir === queries.order_dir) || loading,
          onAction: () => {
            handleQueryChange('order_by', s.order_by, true, false, [{order_dir: s.order_dir}]);
          }
        }))}
      />
    </PopAction>
  );

  const maxPage = Math.ceil(totalItem / queries.limit);
  const paginate = hasPage && (
    <div className="MP-AdvancedResourceList__Pagination">
      <Pagination
        hasPrevious={hasPre && !loading}
        onPrevious={() => !loading && handleFetchApi('prev')}
        hasNext={hasNext && !loading}
        onNext={() => !loading && handleFetchApi('next')}
        label={`Page ${[page, maxPage]
          .filter(x => x)
          .map(x => formatNumber(x))
          .join(' / ')}`}
      />
    </div>
  );

  const limit = (
    <div className="MP-AdvancedResourceList__ItemPerPage">
      <span>Items per page</span>
      <Select
        label=""
        labelHidden
        disabled={loading}
        value={queries.limit}
        onChange={val => handleQueryChange('limit', val, true)}
        options={['20', '50', '100'].map(label => ({
          label,
          value: label
        }))}
      />
    </div>
  );

  const total = (
    <div className="MP-AdvancedResourceList__TotalCount">
      {loading ? (
        <div style={{width: '4rem', textAlign: 'center'}}>
          <Spinner size="small" />
        </div>
      ) : (
        `Total ${prepareLabel(data.length)}`
      )}
    </div>
  );
  const footer = items.length > 0 && (
    <div className="MP-AdvancedResourceList__FooterRow">
      {total}
      {paginate}
      {limit}
    </div>
  );

  return {
    data,
    additionalData,
    appliedFilters,
    setData,
    renderList,
    searchBar,
    sortOrder,
    paginate,
    limit,
    totalItem,
    total,
    footer,
    loading,
    fetched,
    hasPage,
    lastParams,
    checkedItems,
    setCheckedItems,
    expandedItems,
    setExpandedItems,
    handleCustomQuery,
    handleCustomQueries,
    handleFilterChange,
    reFetch: handleFetchApi,
    checkedChildItems: selectedResources,
    handleSelectionChange,
    searchValue: queries[searchValue]
  };
}

const SearchBar = ({
  queries,
  setAppliedFilters,
  filters,
  searchValue,
  handleFetchApi,
  searchLabel,
  filterRenders,
  filterToArray,
  handleQueryChange
}) => {
  const value = queries[searchValue];
  const [input, setInput] = useState('');

  const onBlur = () => {
    if (input !== value) {
      handleQueryChange(searchValue, input);
    }
  };

  const onSearch = () => {
    onBlur();
    handleFetchApi('', {...queries, [searchValue]: input});
  };
  return (
    <div onKeyDown={event => event.keyCode === 13 && onSearch()}>
      <Filters
        queryPlaceholder={searchLabel}
        queryValue={input}
        filters={filterRenders}
        appliedFilters={filterToArray}
        onQueryChange={setInput}
        onQueryClear={() => {
          setInput('');
          handleQueryChange(searchValue, '', true, true);
        }}
        onQueryBlur={onBlur}
        onClearAll={() => {
          setInput('');
          handleQueryChange(searchValue, '');
          setAppliedFilters(filtersToObject(filters));
        }}
      />
    </div>
  );
};

SearchBar.propTypes = {
  queries: PropTypes.string,
  setAppliedFilters: PropTypes.func,
  filters: PropTypes.array,
  searchValue: PropTypes.string,
  handleFetchApi: PropTypes.func,
  searchLabel: PropTypes.string,
  filterRenders: PropTypes.any,
  filterToArray: PropTypes.any,
  handleQueryChange: PropTypes.func
};
