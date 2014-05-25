Ext.define('maptest1.controller.mapControl', {
	extend: Ext.app.Controller,

	config: {
		refs: {
			mainView: 'main',
			settingsView: 'settingspanel',
			mapView: 'mappanel',

			mapBtn1: '#map-it-btn',
			mapBtn2: '#map-it-btn2',

			myMap: 'map[id="stumap"]',

		// Fault toolbar refs
			fld: '#flood-btn',
			treefall: '#treefall-btn',
			pothole: '#pothole-btn',
			lightout: '#lightout-btn',
			lightbroken: '#lightbroken-btn',
			trafficlightbroken: '#trafficlightbroken-btn'
		},
		control: {
			// map panel fired events
			mapView: {
				maprender: 'onRenderMap'
			},

		// Fault toolbar controls
			fld: {
				tap: 'onFloodTap'
			},
			treefall: {
				tap: 'onTreefallTap'
			},
			pothole: {
				tap: 'onPotholeTap'
			},
			lightout: {
				tap: 'onLightoutTap'
			},
			lightbroken: {
				tap: 'onLightbrokenTap'
			},
			trafficlightbroken: {
				tap: 'onTrafficlightbrokenTap'
			}
		}
	},	// end of config


	launch: function() {
		this.callParent()
		//console.log('launch');
		},
	init: function() {
		this.callParent();
		//console.log('init');



	},

	// Fault toolbar functions

	onFloodTap: function() {toolbarClick('flood', this.getMyMap())},
	onTreefallTap: function() {toolbarClick('treefall', this.getMyMap())},
	onPotholeTap: function() {toolbarClick('pothole', this.getMyMap())},
	onLightoutTap: function() {toolbarClick('lightout', this.getMyMap())},
	onLightbrokenTap: function() {toolbarClick('lightbroken',  this.getMyMap())},
	onTrafficlightbrokenTap: function() {toolbarClick('trafficlightbroken', this.getMyMap())},


/* ------
	When map is rendered, event mapView -> rendermap is fired and directed to this function
	so - load markers from store
*/ 
	onRenderMap: function(map, gmap, options) {
//!!! Store reference
		var markersStore = Ext.getStore("markers");
		markersStore.load();
		markersStore.each(function(record){
	            var m = new google.maps.LatLng(record.data.markerLat, record.data.markerLng);
//console.log(m);
		    var loadedMarker = addMarker(record.data.markerType, gmap, record.data.markerLat, record.data.markerLng);
		    loadedMarker.mID = record.data.id;		// add ID to marker
		    loadedMarker.details = record.data.markerTxt;	// add details to marker

		    mapMarkers.push(loadedMarker);		// add marker to marker array
		    getInfoWindow();
        	});	// END each
//alert(uselocation);
if (uselocation) {
	geo.setAutoUpdate(true);
	//console.log(geo.getAutoUpdate());
	//Ext.Msg.alert("Problem", 'Location ' + "-" + geo.getAutoUpdate() + "; lat: " + geo.getLatitude())
	geo.updateLocation();
}
	}	// END maprender

});	// END define


var mapMarkers = []; // array for all markers
//var position = new google.maps.LatLng(this.geo.getLatitude(), this.geo.getLongitude());
//console.log(position.latLng);

getInfoWindow = function() {
	 infowindow = new google.maps.InfoWindow();	// new infowindow object
}

/* ------
toolbarClick

   - If a toolbar item is clicked
   - Position a marker with custom icon onto the map, in map centre
   - store marker details in Markers Store
*/

var toolbarClick = function(markerType, map) {

	// set current location for the marker, if current location can be found, else use map centre
	if (typeof currentLat=='undefined' || typeof currentLng=='undefined') {

		if (checkLocError!=1) Ext.Msg.alert("Problem", 'Location cannot be determined now');	
		var centre = map.getMap().getCenter();
		var lat = centre.lat();
		var lng = centre.lng();
		checkLocError = 1;

	//	console.log(centre.Latitude);
	//	console.log(centre.latitude);
	}
	else {
		var lat = currentLat;
		var lng = currentLng;
	}
	//var lat = currentLat;
	//var lng = currentLng;
	var placedMarker = addMarker(markerType, map.getMap(), lat, lng);

	// get name and email from settings store
	settingsName = (typeof name !="undefined")? name : "-";
	settingsEmail = (typeof email !="undefined")? email : "-";

	//// create marker object and save to store
	var markerObj = Ext.create('maptest1.model.Markers', {
		markerType: markerType,
		markerLat: lat,
		markerLng: lng,
		markerTxt: 'some text',
		markerPic: 'pic src',
		name: settingsName,
		email: settingsEmail,
		date: new Date()
	});

	var errs = markerObj.validate();
	var msg = "";

	if (!errs.isValid()) {
		errs.each(function (err) {
			msg += err.getField() + ' : ' + err.getMessage() + ' ' ;
		});

	Ext.Msg.alert("ERROR", msg);

	} else {
	// add new marker to store (and return its ID) then add the store ID to the marker 

//!!! Store reference
	var markersStore = Ext.getStore('markers');
	var mk = markersStore.add(markerObj);
	placedMarker.mID = mk[0].getId();		// add ID to marker
	placedMarker.details = "";			// add details to it
//console.log(placedMarker.mID);
	mapMarkers.push(placedMarker);		// add marker to marker array



	// drag listener - Looks up the stored marker by its marker ID then gets the new lat and lng and updates them
	google.maps.event.addListener(placedMarker, 'dragend', function(evt) {
		var recordIndex = markersStore.findExact('id', placedMarker.mID);
//console.log("id in drag: ");
//console.log(placedMarker.mID);
		var record = markersStore.findRecord('id', placedMarker.mID);
		record.set('markerLat', evt.latLng.lat().toFixed(7));
		record.set('markerLng', evt.latLng.lng().toFixed(7));
		markersStore.sync();
		//markersStore.syncServer();
	});


	markersStore.sync();
	//Ext.Msg.alert("SUCCESS", 'Marker is valid and saved');	
	}
};	// END toolbarClick




/*--------
updateMarkerData

	when infowindow form is entered, grab info and update the marker data (ID'd by the hidden field)

	update the marker icon too, by looking through the markers array for the one matching mID,
	then close the info window
*/

 updateMarkerData = function() {
//!!! Store reference
	var markersStore = Ext.getStore('markers');
	var record = markersStore.findRecord('id', document.getElementById('mID').value);
	// get form field entries
	var iwID = document.getElementById('mID').value;
	var details = document.getElementById('details').value;
	var newMarkerType = document.getElementById('mType').value;
	// update the marker info in the store
	record.set('markerTxt', details);
	record.set('markerType', newMarkerType);
	markersStore.sync();

	// change marker icon - need to search the mapMarkers array for the one with the same mID
        for (var i = 0; i < mapMarkers.length; i++) {
		if (mapMarkers[i].mID == iwID) {
        		var index = mapMarkers.indexOf(mapMarkers[i]);
                	var id = mapMarkers[index].mID;
                	break;
                }
	}
	var iconURL = 'resources/mapicons/' + newMarkerType + '_icon.png';
	mapMarkers[index].setIcon(iconURL);	// change the icon
	mapMarkers[index].details = details;		// update the details in the actual marker object
	infowindow.close();
};	//END updateMarkerData


/* -------
add Marker 
		- adds marker with icon of markerType
		- adds a click listener which opens an info window
		- adds html to the infowindow  for info and marker change
		- adds a dblclick listener to the marker for removing it
*/

var addMarker = function(markerType, map, lat, lng) {
// make sure that the markerType is the selected option in the dropdown

	var phSel = loSel = tfSel = lbSel = fSel = tlbSel = "";
	switch (markerType) {
		case 'pothole':
			phSel = 'SELECTED';
		break;
		case 'lightout':
			loSel = 'SELECTED';
		break;
		case 'treefall':
			tfSel = 'SELECTED';
		break;
		case 'lightbroken':
			lbSel = 'SELECTED';
		break;
		case 'flood':
			fSel = 'SELECTED';
		break;
		case 'trafficlightbroken':
			tlbSel = 'SELECTED';
		break;
	};


	var image = {
  		url: 'resources/mapicons/' + markerType + '_icon.png',
  		size: new google.maps.Size(30, 42),
  		origin: new google.maps.Point(0, 0),
  		anchor: new google.maps.Point(17, 34),
  		scaledSize: new google.maps.Size(30, 42)
	}


	var pos = new google.maps.LatLng(lat, lng);

	var centre = map.getCenter();
	var placedMarker = new google.maps.Marker({
	       	position:  pos, 
		title: markerType,
		draggable: true,
		map: map,
		icon: image,
		animation: google.maps.Animation.DROP
	});


	// set the map centre to the location of the marker, if current location can be found
	if (typeof currentLat=='undefined' || typeof currentLng=='undefined') {
		if (checkLocError!=1) Ext.Msg.alert("Problem", 'Location cannot be determined');
		checkLocError = 1;	
	}
	else {
		map.setCenter(	new google.maps.LatLng(currentLat, currentLng));
	}
	//  add a listener to remove marker (on doubleclick for desktop)
	google.maps.event.addListener(placedMarker, "dblclick", function() {
//		console.log(mapMarkers);
		if (confirm("Deselect " + placedMarker.title + " and remove from Map?")) {
            		placedMarker.setMap(null);
            		for (var i = 0; i < mapMarkers.length; i++) {
		       		if (mapMarkers[i].getPosition().equals(placedMarker.getPosition())) {
                			var index = mapMarkers.indexOf(placedMarker);
                			mapMarkers.splice(index, 1);
                			break;
                		}
            		}
        	}
        });	// END listener for remove


	// drag listener - Looks up the stored marker by its marker ID then gets the new lat and lng and updates them
	google.maps.event.addListener(placedMarker, 'dragend', function(evt) {
//!!! Store reference
		var markersStore = Ext.getStore('markers');
		var recordIndex = markersStore.findExact('id', placedMarker.mID);

		var record = markersStore.findRecord('id', placedMarker.mID);
		record.set('markerLat', evt.latLng.lat().toFixed(7));
		record.set('markerLng', evt.latLng.lng().toFixed(7));
		markersStore.sync();
	});

	// add info window listener to it, for a click

	google.maps.event.addListener(placedMarker, "click", function() {

		// html for the info window form
//console.log(placedMarker.details);
//console.log("ID: " + placedMarker.mID);
		var details = (typeof placedMarker.details!="undefined") ? placedMarker.details : "Enter any notes/details";

        	var html = "<table>" +
                 "<tr><td>Details:</td> <td><textarea rows=\"3\" cols=\"30\" id='details' onfocus=\"this.value='';\"/>" + details + "</textarea> </td> </tr>" +
"<tr><td></td> <td><input type='hidden' id='mID' value='" + placedMarker.mID + "' /></td> </tr>" +

                 "<tr><td>Change fault:</td> <td><select id='mType'>" +
                 "<option value='pothole' " + phSel + ">Pothole</option>" +
                 "<option value='lightout' " + loSel + ">Light out</option>" +
                 "<option value='treefall' " + tfSel + ">Tree down</option>" +
                 "<option value='lightbroken' " + lbSel + ">Broken light</option>" +
                 "<option value='flood' " + fSel + ">Flood</option>" +
                 "<option value='trafficlightbroken' " + tlbSel + ">Broken traffic light</option>" +

                 "</select> </td></tr>" +
                 "<tr><td></td><td><input type='button' value='Update' onclick='updateMarkerData()'/></td></tr></table>";

		infowindow.setContent(html);
          	infowindow.open(map, placedMarker);
	});	// END marker click listener
	return placedMarker;
};	// END addMarker function



//// geolocation - now here instead of in mapPanel
 geo = Ext.create('Ext.util.Geolocation', {

    autoUpdate: false,
    listeners: {
        locationupdate: function(geo) {
    			 currentLat = geo.getLatitude();
    			 currentLng = geo.getLongitude();
    			var altitude = geo.getAltitude();
    			var speed = geo.getSpeed();
    			var heading= geo.getHeading();
        },
        locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
            if(bTimeout){
                alert('Timeout occurred.');
            } else {
                alert('Error occurred.');
            }
        }
    }
});
//geo.setAutoUpdate(true);
//console.log(geo.getAutoUpdate());
//Ext.Msg.alert("Problem", 'Location ' + "-" + geo.getAutoUpdate() + "; lat: " + geo.getLatitude())
//geo.updateLocation();