    Ext.define('maptest1.controller.listMarkersControl', {
    extend: 'Ext.app.Controller',
    requires: [
		'Ext.data.proxy.JsonP'
    ],
    config: {
   // 	models: ['initialMarkers'],
   // 	stores: ['initialMarkersStore'],
	
    	refs: {
    		markerdumppanel: 'markerdumppanel',
		markerlocalpanel: 'markerlocalpanel',
		markerdetailpanel: 'markerdetailpanel',
    		mapView: 'mappanel'
    	},
    	control: {
    		"markerdumppanel": {
    			itemtap: 'onMarkerItemTap'
    		},
    		"markerlocalpanel list": {
    			itemtap: 'onMarkerLocalItemTap'
    		}
    	}
    },	// END config



slideLeftTransition: { type: 'slide', direction: 'left' },


    onMarkerItemTap: function(dataview, index, target, record, e, options) {

    // get markerType from selected list item
    this.markerFilter = record.get("markerType");
    // filter initialMarkersStore store based on marker type
   // Ext.getStore('initialMarkersStore').filter("markerType",this.markerFilter);
   

	alert('dump');
	var markerOnMap = this.getMapView();
	Ext.Viewport.animateActiveItem(markerOnMap, this.slideLeftTransition);
	

    },


/*
  onMarkerLocalItemTap

   when an item in the list is tapped, set up a tab panel using the markerDetailPanel class, and send the 
   text and map information to it, and then make that panel active

*/
    onMarkerLocalItemTap: function(dataview, index, target, record, e, options) {

	if (record) {
		// not sure why this was in here, but it stops details panel from loading a second time
		//if (!this.details) {
			// set up the detail panel object, using MarkerDetailPanel class
			this.details = Ext.create('maptest1.view.MarkerDetailPanel', {
				title: 'Fault details'
			});

			// get detailMap object and add options and centre it around the lat,lng
			var dmap = this.details.child('#detailMap');
			dmap.setMapOptions({
				zoom: 14,
				streetViewControl: true
			});	//END map
			dmap.setMapCenter({
				latitude: record.get('markerLat'),
				longitude: record.get('markerLng')
			});	// END set map center

var point = new google.maps.LatLng(record.get('markerLat'), record.get('markerLng'));

			var placedMarker = new google.maps.Marker({
	       			position:  point, 
				title: 'fault',	
				map: dmap.getMap()
			});
			dmap.setMapCenter(point);

			//dmap.getMap().setStreetView();

//			var centre = record.get('markerLat') + "," + record.get('markerLng');
			// get the decord data and fire it to the components with the matching ID
			// then push the details panel to the markerlocalpanel
			var info = this.details.child('#fDetail').child('#info');
			info.child('#text').setData(record.data);
			info.child('#extratext').setData(record.data);

			info.child('#img').setData(record.data);
			this.details.child('#staticMap').setData(record.data);
			this.details.child('#streetview').setData(record.data);
			this.getMarkerlocalpanel().push(this.details);

		//}	// END if !this.details
	}	// END if record

    }	// END onMarkerLocalItemTap function



    }); 	// END define
