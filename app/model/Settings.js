Ext.define('maptest1.model.Settings', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'hideintro', type: 'boolean' },
            { name: 'uselocation', type: 'boolean' },
            { name: 'name', type: 'string' },
            { name: 'email', type: 'string' }
        ],
        validations: [
		{
			type: 'email',
			field: 'email',
			message: 'Email address is invalid.'
		}
	],
	identifier: {
        	type: 'uuid'
	}
    }	// END config
});
