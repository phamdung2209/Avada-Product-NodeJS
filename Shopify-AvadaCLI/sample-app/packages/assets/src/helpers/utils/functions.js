export const formatDate = inputDate => {
    const date = new Date(inputDate);
    const options = {month: 'short', day: 'numeric'};
    const formattedDate = date.toLocaleDateString('en-US', options);
    // add , year to the date
    const year = date.getFullYear();
    // return formattedDate;
    return `${formattedDate}, ${year}`;
};

export const extractTime = date => {
    const now = new Date();
    const sentTime = new Date(date);

    const diffInMinutes = Math.floor((now.getTime() - sentTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) {
        return 'Just now';
    } else if (diffInMinutes < 60) {
        return `Sent ${diffInMinutes}m ago`;
    } else {
        const options = {
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric'
        };
        const sameDayFormat = sentTime.toLocaleDateString('en-US', options);

        if (
            now.getFullYear() === sentTime.getFullYear() &&
            now.getMonth() === sentTime.getMonth() &&
            now.getDate() === sentTime.getDate()
        ) {
            return `Today, ${sameDayFormat}`;
        } else {
            const dateOptions = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            };
            const differentDayFormat = sentTime.toLocaleDateString('en-US', dateOptions);
            return differentDayFormat;
        }
    }
};
