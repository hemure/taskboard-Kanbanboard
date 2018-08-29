
const boardLayout = {
    title: 'Kanban board',
    swimlanes: [
        {
            id: 's1',
            title: 'Operations and Incidents',
            height: '300px',
        },
        {
            id: 's2',
            title: 'Project 1',
            height: '200px',
        },
        {
            id: 's3',
            title: 'Project 2',
            height: '200px',
        },
    ],
    columns: {
        'c1': {
            id: 'c1',
            type: 'col',
            title: 'Backlog',
            taskColumn: 'B',
            allowedDragToColumns: ['c1','c2'],
        },
        'c2': {
            id: 'c2',
            type: 'col',
            title: 'Next',
            taskColumn: 'N',
            allowedDragToColumns: ['c1','c2','c31'],
        },
        'c3': {
            id: 'c3',
            type: 'group',
            title: 'Specify',
            columns: {
                'c31': {
                    id: 'c31', 
                    type: 'col',
                    title: 'Active',
                    taskColumn: 'SA',
                    allowedDragToColumns: ['c1','c2','c31','c32'],
                },
                'c32': {
                    id: 'c32',
                    type: 'col',
                    title: 'Done',
                    taskColumn: 'SD',
                    allowedDragToColumns: ['c31','c32','c41'],
                },
            },
            columnOrder: ['c31','c32'],
        },
        'c4': {
            id: 'c4',
            type: 'group',
            title: 'Implement',
            columns: {
                'c41': {
                    id: 'c41', 
                    type: 'col',
                    title: 'Active',
                    taskColumn: 'IA',
                    allowedDragToColumns: ['c31','c32','c41','c42','c43'],
                },
                'c42': {
                    id: 'c42',
                    type: 'col',
                    title: 'Waiting',
                    taskColumn: 'IW',
                    allowedDragToColumns: ['c41','c42','c43'],
                },
                'c43': {
                    id: 'c43',
                    type: 'col',
                    title: 'Done',
                    taskColumn: 'ID',
                    allowedDragToColumns: ['c41','c42','c43','c51'],
                },
            },
            columnOrder: ['c41','c42','c43'],
        },
        'c5': {
            id: 'c5',
            type: 'group',
            title: 'Validate',
            columns: {
                'c51': {
                    id: 'c51', 
                    type: 'col',
                    title: 'Active',
                    taskColumn: 'VA',
                    allowedDragToColumns: ['c41','c42','c51','c52'],
                },
                'c52': {
                    id: 'c52',
                    type: 'col',
                    title: 'Done',
                    taskColumn: 'VD',
                    allowedDragToColumns: ['c51'],
                },            
            },
            columnOrder: ['c51','c52'],
        },
    },
    columnOrder: ['c1','c2','c3','c4','c5'],
    columnWidth: '157px',
};

export default boardLayout;
