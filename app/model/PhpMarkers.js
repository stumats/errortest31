Ext.define('maptest1.model.PhpMarkers', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'markerType', type: 'string' },
            { name: 'markerLat', type: 'float' },
            { name: 'markerLng', type: 'float' },
            { name: 'markerTxt', type: 'string' },
            { name: 'markerPic', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'date', type: 'date' }
        ],
        validations: [
	            { type: 'presence', field: 'id' },
	            { type: 'presence', field: 'markerLat', message: 'There is no lat for this marker.' },
	            { type: 'presence', field: 'markerLng', message: 'There is no lng for this marker.' }
	],
	identifier: {
        	type: 'uuid'
	},
        proxy: {
            //type: 'ajax',
	    type: 'jsonp',
            api: {
                create: 'http://hybridweb.co.nz/chair/maptest2/json/markers.php?action=createmarker',
                read: 'http://hybridweb.co.nz/chair/maptest2/json/markers.php?action=loadmarkers',
                update: 'http://hybridweb.co.nz/chair/maptest2/json/markers.php?action=updatemarker',
                destroy: 'http://hybridweb.co.nz/chair/maptest2/json/markers.php?action=erasemarker'
            },
            reader: {
                rootProperty:'markers'
            }
        }
    }
});
