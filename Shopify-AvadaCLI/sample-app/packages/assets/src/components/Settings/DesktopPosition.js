import React, {memo, useCallback} from 'react';

const DesktopPosition = ({idxPosition = 1, setDesktopPosition, desktopPosition}) => {
    const alignItems = useCallback(() => {
        switch (idxPosition) {
            case 1:
                return 'flex-start';
            case 2:
                return 'flex-start';
            case 3:
                return 'flex-end';
            case 4:
                return 'flex-end';

            default:
                return 'flex-start';
        }
    }, [idxPosition]);

    const justifyContent = useCallback(() => {
        switch (idxPosition) {
            case 1:
                return 'flex-start';
            case 2:
                return 'flex-end';
            case 3:
                return 'flex-end';
            case 4:
                return 'flex-start';

            default:
                return 'flex-start';
        }
    }, [idxPosition]);

    return (
        <div
            className="desktop-position"
            onClick={() => setDesktopPosition(idxPosition)}
            style={{
                alignItems: alignItems(),
                justifyContent: justifyContent(),
                borderColor:
                    desktopPosition === idxPosition
                        ? 'var(--a-ig-primary-color)'
                        : 'var(--p-color-gray)'
            }}
        >
            <div
                style={{
                    backgroundColor:
                        desktopPosition === idxPosition
                            ? 'var(--a-ig-primary-color)'
                            : 'var(--p-color-gray)'
                }}
            />
        </div>
    );
};

export default memo(DesktopPosition);
