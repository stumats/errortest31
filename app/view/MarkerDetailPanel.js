// Main view for the Marker Detail panel

// A tab panel with details on one tab and Static map on another

Ext.define('maptest1.view.MarkerDetailPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'markerdetailpanel',

    config: {
	tabbar: {
		docked: 'top',
		ui: 'dark',
		layout: {
			pack: 'center',
			type: 'hbox'
		}
	},
	items: [{
		xtype: 'container',
		itemId: 'fDetail',
		//title: 'Details',
		iconCls: 'info',
		items: [
			{
			xtype: 'container',			
			itemId: 'info',
			padding: 10,
			layout: {
				type: 'vbox'
			},
			items: [
				{
					xtype: 'component',
					height: 100,
					itemId: 'text',
					tpl: [
					    '<strong>Fault: {markerType}: </strong> <br \>',
					    '<strong>Notes:</strong> {markerTxt}<br />'
					]
				},	// END component item
				{
					xtype: 'component',
					//padding: 20,
					align: 'top',
					itemId: 'extratext',
					tpl: [
					    '<strong>Entered by:</strong> {name}: {email}<br />',
					    '<strong>Date:</strong> {date}<br />'
					]
				},
				{
					xtype: 'component',
					//padding: 20,
					itemId: 'img',
					tpl: [
					    '<strong>Fault: {markerType} </strong> <br \>'
					]

				}	// END component

				]	// END items
			}	// END first info item

		]	// END info items

		},
        	{
        	    xtype: 'component',
        	    itemId: 'streetview',
        	    title: 'Streetview',
        	    iconCls: 'maps',
		    tpl: Ext.create('Ext.XTemplate',
			'{[this.getImage(values)]}',
			'<div>Fault: {markerType}</div>',
			'<div>Fault: {markerLat}</div>',
			'<div>Fault: {markerLng}</div>',
			{
 				// Returns the streetview image if available. Else shows text
				getImage: function (data) {
				        if (data.markerLat && data.markerLat !="") {
					   var centre = data.markerLat + "," + data.markerLng;
					   var imgURL = "http://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + centre + "&fov=50&pitch=-20&sensor=false";
				           return '<div class="photo"><img src="' + imgURL + '" /></div>';
				          }
 				  	// else
					return '<div class="icon-wrapper">no streetview image available</div>';
      				}
		    	}
		    )	// END tpl

        	},	// END streetview
	      	{
        	    xtype: 'map',
gmapType: 'panorama',
        	    itemId: 'detailMap',
        	    title: 'Map',
        	    iconCls: 'maps'
        	},	// END live map

        	{
        	    xtype: 'component',
        	    itemId: 'staticMap',
        	    title: 'Static map',
        	    iconCls: 'maps',
		    tpl: Ext.create('Ext.XTemplate',
			'{[this.getImage(values)]}',
			{
 				// Returns the static image if available. Else shows text
				getImage: function (data) {


					if (data.markerLat && data.markerLat !="") {
					   var markers = "&markers=color:blue|label:S|" + data.markerLat + "," + data.markerLng;
					   var centre = "&" + data.markerLat + "," + data.markerLng;
					   return '<div class="photo"><img src="http://maps.google.com/maps/api/staticmap?center=' + centre + markers + '&zoom=15&size=384x530&sensor=false" /></div>';
					}
 				 	// else
				 	return '<div class="icon-wrapper">no static map image available</div>';
      				}
		        }
		    )	// END tpl

        	}	// END static map
	]	// END contact items
    }	// END config


});	// END define

