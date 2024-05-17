import { Box, LegacyFilters, TextField } from '@shopify/polaris'
import React, { memo, useEffect } from 'react'
import useDebounce from '~/hooks/useDebounce'
import useSearchProducts from '~/hooks/useSearchProducts'

const FilterProduct = ({ setDataSearch, queryValue, setQueryValue }) => {
    const handleQueryValueRemove = () => setQueryValue('')

    const searchValue = useDebounce(queryValue, 700)
    const { loading, data } = useSearchProducts(searchValue)

    useEffect(() => {
        setDataSearch(data)
    }, [data, setDataSearch])

    const filters = [
        {
            key: 'taggedWith1',
            label: 'Tagged with',
            // filter: (
            //     <TextField
            //         label="Tagged with"
            //         //   value={taggedWith}
            //         //   onChange={handleTaggedWithChange}
            //         autoComplete="off"
            //         labelHidden
            //     />
            // ),
            // shortcut: true,
        },
    ]

    return (
        <Box className="mb-3">
            <LegacyFilters
                queryValue={queryValue}
                filters={filters}
                // appliedFilters={appliedFilters}
                onQueryChange={setQueryValue}
                onQueryClear={handleQueryValueRemove}
                // onClearAll={handleClearAll}
            />
        </Box>
    )
}

export default memo(FilterProduct)
