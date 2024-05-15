import { Box } from '@shopify/polaris'
import React from 'react'

const Status = ({ pending, Done }) => {
    // if (pending) {
    //     return <Box className="py-[2px] px-2 bg-[#AEE9D1] w-fit text-[#202223]">pending</Box>
    // } else if (Done) {
    //     return <Box>Done</Box>
    // } else {
    //     return <Box>Error</Box>
    // }

    return (
        <Box
            className={`py-[2px] pb-[6px] px-2 w-fit text-[#202223] rounded-xl flex items-center justify-center text-[13px] leading-4
                ${pending ? 'bg-[#E4E5E7]' : Done ? 'bg-[#AEE9D1]' : 'bg-[#FECACA]'}
            `}
        >
            {pending ? 'pending' : Done ? 'Done' : 'Error'}
        </Box>
    )
}

export default Status
