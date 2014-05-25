// Main view for the  google maps app

Ext.define('maptest1.view.MapToolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'maptoolbar',
    requires: [
        'Ext.Toolbar'
    ],
    config: {
	styleHtmlContent: true,

    items: [
		{
                docked: 'top',
		xtype: 'titlebar',
		title: ''
		},
		{
		scrollable: 'vertical',
                docked: 'left',
		xtype: 'toolbar',
		ui: 'light',
		defaults: {
		        width:50,
            		height:50,
			margin: '4px 4px 0 0px',
			xtype: 'image'
		},
		    items: [
		    {
			src: 'resources/images/flood_50.jpg',
			itemId: 'flood-btn',		// for delegate
			id: 'flood-btn'			// for ref in controller
		    },
		    {
			src: 'resources/images/treedown_50.jpg',
			itemId: 'treefall-btn',		// for delegate
			id: 'treefall-btn'		// for ref in controller
		    },
		    {
			src: 'resources/images/pothole_50.jpg',
			id: 'pothole-btn',
			itemId: 'pothole-btn'
		    },
		    {
			src: 'resources/images/lightout_50.jpg',
			id: 'lightout-btn',
			itemId: 'lightout-btn'
		    },
		    {
			src: 'resources/images/lightbroken_50.jpg',
			id: 'lightbroken-btn',
			itemId: 'lightbroken-btn'
		    },
		    {
			src: 'resources/images/trafficlightbroken_50.jpg',
			id: 'trafficlightbroken-btn',
			itemId: 'trafficlightbroken-btn'
		    }
			]
                }
        ]	// end Items
    }		// end Config
});		// end Define
