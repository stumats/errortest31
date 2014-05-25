// Main view for the Marker local panel

Ext.define('maptest1.view.MarkerLocalPanel', {
    extend: 'Ext.navigation.View',
    xtype: 'markerlocalpanel',
    requires: [
	'Ext.dataview.List'
    ],
    config: {
	items: [{
		xtype: 'list',
		itemId: 'local',
		inline: true,
		store: 'markers',
 		//onItemDisclosure: true,
		variableHeights: false,
		itemHeight: 60,
		itemTpl: [
		    '*** <strong>{markerType}: </strong> <br />',
		    '{markerTxt} <br />',
		    'Entered: {date}',
		    '<br /><strong>Click for streetview, map etc</strong>'
		]
	}]	// END items
    }	// END config
});	// END define

