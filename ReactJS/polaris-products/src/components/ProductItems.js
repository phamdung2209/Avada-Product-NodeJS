import { LegacyCard, Pagination } from '@shopify/polaris'
import React, { memo, useState } from 'react'

import useGetProducts from '~/hooks/useGetProducts'
import SkeletonProduct from '~/skeletons/SkeletonProduct'
import useDebounce from '~/hooks/useDebounce'
import MainContent from './MainContent'

const ProductItems = () => {
    const [sortBy, setSortBy] = useState('desc')
    const [queryValue, setQueryValue] = useState('')
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 5,
    })

    const searchData = useDebounce(queryValue, 700)

    const { data, loading } = useGetProducts({ sortBy, pagination, q: searchData })
    console.log('render ProductItems')
    return (
        <LegacyCard>
            {loading ? (
                <SkeletonProduct />
            ) : (
                <MainContent
                    data={data}
                    loading={loading}
                    queryValue={queryValue}
                    setQueryValue={setQueryValue}
                    setSortBy={setSortBy}
                    sortBy={sortBy}
                />
            )}

            <Pagination
                onPrevious={() => {
                    setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                }}
                onNext={() => {
                    setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                }}
                type="table"
                hasNext
                label="1-50 of 8,450 orders"
            />
        </LegacyCard>
    )
}

export default memo(ProductItems)
