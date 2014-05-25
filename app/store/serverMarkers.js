Ext.define('maptest1.store.serverMarkers', {

    extend: 'Ext.ux.OfflineSyncStore',

    config: {
        model: 'maptest1.model.serverMarkers',
	storeId: 'smarkers',
        autoSync: true,
	autoLoad: true,
	autoServerSync: true,

        localProxy: {
            type: 'localstorage',
            id: 'offline-sync-store'
        },

        serverProxy: {
            type: 'ajax',
	    //type: 'jsonp',
	    url: 'http://hybridweb.co.nz/chair/maptest2/json/markers.php?action=readmarkers',
            api: {
                read: 'http://hybridweb.co.nz/chair/maptest2/json/markers.php?action=readmarkers',
                create: 'http://hybridweb.co.nz/chair/maptest2/json/markers.php?action=createmarker'
            },
            reader: {
                type: 'json',
                rootProperty: 'markers'
            },
            writer: {
                allowSingle: false
            }
        }
    },

    initialize: function () {
        this.loadLocal();
    }
});