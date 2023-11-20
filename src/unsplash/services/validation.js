const validation = {
    checkNumberValue: ({ string = 'value', value }) => {
        if (typeof value !== 'number' || isNaN(value)) {
            throw new Error(`${string} must be "number"`);
        } else if (value <= 0) {
            throw new Error(`${string} > 0`);
        }
    },
    checkBooleanValue: (value) => {
        if (typeof value !== 'boolean') {
            throw new Error('private must be "true" or "false"');
        }
    },
    checkContentFilter: (content_filter) => {
        if (!['low', 'high'].includes(content_filter)) {
            throw new Error('content_filter must be "low" or "high');
        }
    },
    checkOrientation: (orientation) => {
        if (!['landscape', 'portrait', 'squarish'].includes(orientation)) {
            throw new Error('orientation must be "landscape", "portrait", or "squarish"');
        }
    },
    checkCount: (count) => {
        if (count <= 0 || count > 30) {
            throw new Error('count must be greater than 0 and no more than 30');
        }
    },
    checkFullOrderBy: (order_by) => {
        if (!['latest', 'oldest', 'popular', 'views', 'downloads'].includes(order_by)) {
            throw new Error('order_by must be "latest", "oldest", "popular", "views" or "downloads"');
        }
    },
    checkOrderBy: (order_by) => {
        if (!['latest', 'oldest', 'popular'].includes(order_by)) {
            throw new Error('order_by must be "latest", "oldest" or "popular"');
        }
    },
    checkSearchOrderBy: (order_by) => {
        if (!['relevant', 'latest', 'editorial'].includes(order_by)) {
            throw new Error('order_by must be "relevant", "latest" or "position"');
        }
    },
    checkTopicOrderBy: (order_by) => {
        if (!['featured', 'latest', 'oldest', 'position'].includes(order_by)) {
            throw new Error('order_by must be "featured", "latest", "oldest" or "position"');
        }
    },
    checkColor: (color) => {
        if (
            ![
                'black_and_white',
                'black',
                'white',
                'yellow',
                'orange',
                'red',
                'purple',
                'magenta',
                'green',
                'teal',
                'blue',
            ].includes(color)
        ) {
            throw new Error(
                'color must be "black_and_white", "black", "white", "yellow", "orange", "red", "purple", "magenta", "green", "teal" or "blue"',
            );
        }
    },
};

export default validation;
