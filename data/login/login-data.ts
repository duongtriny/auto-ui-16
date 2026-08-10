export const invalidLoginData = [
    {
        email: '',
        password: '1234567890',
        expected: [
            {
                field: 'Email',
                message: 'This field can not be empty'
            }
        ]
    },
    {
        email: 'test@with.me',
        password: '',
        expected: [
            {
                field: 'Password',
                message: 'This field can not be empty'
            }
        ]
    },
    {
        email: 'test',
        password: '1234567890',
        expected: [
            {
                field: 'Email',
                message: 'Invalid email'
            }
        ]
    },
    {
        email: '',
        password: '',
        expected: [
            {
                field: 'Password',
                message: 'This field can not be empty'
            },
            {
                field: 'Email',
                message: 'This field can not be empty'
            }
        ]
    }
]