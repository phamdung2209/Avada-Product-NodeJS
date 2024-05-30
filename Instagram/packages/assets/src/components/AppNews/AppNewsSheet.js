import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Button,
  Card,
  DisplayText,
  EmptyState,
  SkeletonBodyText,
  SkeletonDisplayText,
  Spinner,
  Stack,
  TextContainer,
  TextField,
  TextStyle
} from '@shopify/polaris';
import usePaginate from '@assets/hooks/api/usePaginate';
import SheetBody from '@assets/components/Sheet/SheetBody';
import SheetHeader from '@assets/components/Sheet/SheetHeader';
import {SearchMajor} from '@shopify/polaris-icons';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import {formatDateOnly} from '@assets/helpers/utils/formatFullTime';
import useInput from '@assets/hooks/form/useInput';

const CATEGORY_UPDATE_ID = 445;
const APP_NEWS_URL = 'https://blog.avada.io/resources';
const DEFAULT_SEARCH = {openSearch: false, searchValue: ''};

/**
 * @param closeSheet
 * @returns {JSX.Element}
 * @constructor
 */
export default function AppNewsSheet({closeSheet}) {
  const lastSearchValue = useRef('');
  const [actions, handleActionsChange, setActions] = useInput(DEFAULT_SEARCH);
  const {data, pageInfo, fetched, loading, nextPage, onQueryChange, onQueriesChange} = usePaginate({
    url: '/appNews',
    defaultLimit: 2,
    defaultSort: 'published_at:desc',
    initQueries: {categories: CATEGORY_UPDATE_ID},
    keepPreviousData: true
  });

  const category = item => item.categories.find(cate => cate.id === CATEGORY_UPDATE_ID);

  const loadMoreOnScroll = async () => {
    if (!loading && fetched && pageInfo.hasNext) await nextPage();
  };

  const prepareUrl = item => `${APP_NEWS_URL}/${item.slug}.html`;

  const onSearch = () => {
    lastSearchValue.current = actions.searchValue;
    onQueriesChange({page: 1, searchKey: actions.searchValue}, true);
  };

  const toggleSearch = () => {
    // if search is closed, open search input
    if (!actions.openSearch) {
      handleActionsChange('openSearch', true);
      return;
    }
    // else close search input
    if (lastSearchValue.current) {
      // reload list with no search params
      onQueryChange('searchKey', '', true);
    }
    // reset search state to default
    setActions(DEFAULT_SEARCH);
    lastSearchValue.current = '';
  };

  return (
    <>
      <SheetHeader handleClose={closeSheet} loading={loading}>
        <Stack alignment="center">
          <Stack.Item fill>
            {actions.openSearch ? (
              <div onKeyDown={event => event.keyCode === 13 && onSearch()}>
                <TextField
                  label=""
                  autoFocus
                  value={actions.searchValue}
                  placeholder="Search by title"
                  onChange={val => handleActionsChange('searchValue', val)}
                  suffix={
                    loading && (
                      <div style={{marginTop: '5px'}}>
                        <Spinner size="small" />
                      </div>
                    )
                  }
                  autoComplete="off"
                />
              </div>
            ) : (
              <DisplayText size="small">{"What's new on Avada"}</DisplayText>
            )}
          </Stack.Item>
        </Stack>
        {!actions.openSearch && loading && (
          <div style={{marginTop: '5px'}}>
            <Spinner size="small" />
          </div>
        )}
        <div style={{marginRight: '1rem'}} />
        <Button icon={SearchMajor} disabled={loading} onClick={() => toggleSearch()} plain />
        <div style={{marginRight: '1rem'}} />
      </SheetHeader>
      <SheetBody
        footer={false}
        loading={loading}
        darkBackground={true}
        classNames={['Avada-Sheet__AppNews']}
        onScrolledToBottom={() => loadMoreOnScroll()}
      >
        <Stack vertical>
          {!fetched && <AppNewsSkeleton loop={2} />}
          {data.map((item, index) => (
            <Card sectioned key={index}>
              <Stack alignment="center" spacing="tight">
                <Badge status="success">{category(item).title}</Badge>
                <TextStyle variation="subdued">{formatDateOnly(item.updated_at)}</TextStyle>
              </Stack>
              <div style={{marginBottom: '1rem'}} />
              <Button url={prepareUrl(item)} removeUnderline external plain textAlign="left">
                <DisplayText>
                  <TextStyle variation="strong">{item.title}</TextStyle>
                </DisplayText>
              </Button>
              <ReactMarkdown
                className="prose"
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
              >
                {item.content}
              </ReactMarkdown>
            </Card>
          ))}
          {fetched && pageInfo.hasNext && <AppNewsSkeleton />}
          {fetched && data.length === 0 && (
            <EmptyState heading="No results found" image="">
              Try changing the filters or search term
            </EmptyState>
          )}
        </Stack>
      </SheetBody>
    </>
  );
}

AppNewsSheet.propTypes = {
  closeSheet: PropTypes.func
};

const AppNewsSkeleton = ({loop = 1}) => {
  return Array.from(Array(loop)).map((value, key) => (
    <Card sectioned key={key}>
      <TextContainer>
        <SkeletonDisplayText size="small" />
        <SkeletonBodyText lines={6} />
      </TextContainer>
    </Card>
  ));
};
