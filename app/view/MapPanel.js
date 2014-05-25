// Main view for the Map panel

Ext.define('maptest1.view.MapPanel', {
    extend: 'Ext.Map',
    xtype: 'mappanel',
    id: 'stumap',
    name: 'faultmap', 
    title: 'Map',
    requires: [
	'Ext.util.Geolocation'
    ],
    config: {

	  useCurrentLocation: false,
	  mapOptions: {
		//center: new google.maps.LatLng(this.geo.getLatitude(), this.geo.getLongitude()),
		//center: new google.maps.LatLng (-36.9149749,174.4915772),
		//mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 16
	  },

        listeners: {
	    maprender: function(t, map, eOpts) {
		//this.fireEvent("renderMap", this);
	    }


     }	,	// end Listeners

	constructor: function(config) {
	    this.callParent(config);
	    if (!(window.google || {}).maps) {
	            this.setHtml('<p id="maperror">Internet Connection Required!</p>');
	    }
	}	// END constructor
    }		// end config
});		// end Define



