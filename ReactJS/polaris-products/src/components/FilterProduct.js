import { Box, LegacyFilters } from '@shopify/polaris'
import React, { forwardRef, memo, useImperativeHandle } from 'react'

const FilterProduct = ({ queryValue, setQueryValue }, ref) => {
    const handleQueryValueRemove = () => setQueryValue('')
    console.log('render FilterProduct')

    useImperativeHandle(
        ref,
        () => ({
            queryValue,
        }),
        [queryValue],
    )

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

export default memo(forwardRef(FilterProduct))
