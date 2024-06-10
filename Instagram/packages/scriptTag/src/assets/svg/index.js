import React from 'react'

export const Loading = () => (
    <svg
        preserveAspectRatio="none"
        viewBox="0 0 200 200"
        width="48"
        height="48"
        style={{
            display: 'block',
            margin: '6px auto',
        }}
    >
        <defs>
            <mask id="redhole-1705022992824">
                <rect width="100%" height="100%" fill="white"></rect>
                <circle
                    style={{
                        strokeWidth: 0,
                        r: '36px',
                        cy: '99px',
                        cx: '128px',
                        animation:
                            '1s cubic-bezier(0.05, 0, 1, 1) 0s infinite normal none running animation-1gjz153',
                        fill: 'rgb(0, 0, 0)',
                    }}
                ></circle>
            </mask>
            <mask id="greenhole-1705022992824">
                <rect width="100%" height="100%" fill="white"></rect>
                <circle
                    style={{
                        strokeWidth: 0,
                        r: '36px',
                        cy: '99px',
                        cx: '60px',
                        animation:
                            '1s cubic-bezier(0.05, 0, 1, 1) 0s infinite normal none running animation-1u0u36m',
                        fill: 'rgb(0, 0, 0)',
                    }}
                ></circle>
            </mask>
        </defs>
        <circle
            strokeWidth="2"
            stroke="#3AF2FF"
            style={{
                stroke: 0,
                r: '36px',
                cy: '99px',
                fill: 'rgb(15, 15, 15)',
                cx: '60px',
                animation:
                    '1s cubic-bezier(0.05, 0, 1, 1) 0s infinite normal none running animation-1u0u36m',
            }}
        ></circle>
        <circle
            mask="url(#redhole-1705022992824)"
            style={{
                strokeWidth: 0,
                r: '36px',
                cy: '99px',
                fill: 'rgb(58, 242, 255)',
                cx: '60px',
                animation:
                    '1s cubic-bezier(0.05, 0, 1, 1) 0s infinite normal none running animation-1u0u36m',
            }}
        ></circle>
        <circle
            mask="url(#greenhole-1705022992824)"
            style={{
                strokeWidth: 0,
                r: '36px',
                cy: '99px',
                fill: 'rgb(254, 44, 85)',
                cx: '128px',
                animation:
                    '1s cubic-bezier(0.05, 0, 1, 1) 0s infinite normal none running animation-1gjz153',
            }}
        ></circle>
    </svg>
)
