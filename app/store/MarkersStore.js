Ext.define('maptest1.store.MarkersStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'maptest1.model.Markers',
	storeId: 'markers',

//http://hybridweb.co.nz/chair/initialMarkers.json

// resources/data/initialMarkers.json

	autoLoad: true,

        proxy: {
            //type: 'ajax',
	    //url: "resources/data/Markers.json",
		type: 'localstorage',
		id: 'markersproxy'
        }
     }
});
