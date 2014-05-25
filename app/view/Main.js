Ext.define('maptest1.view.Main', {
    extend: 'Ext.tab.Panel',
    requires: ['Ext.Map',
        'Ext.TitleBar',
        'Ext.Toolbar',
	'Ext.Img'],
    xtype: 'main',
 
    config: {
        tabBarPosition: 'bottom',
	styleHtmlContent: true,
      
        items: [
		{
                docked: 'top',
		xtype: 'titlebar',
		title: 'Road repair tool'
		},
		{
                    xtype: 'panel',		// Intro panel
		    iconCls: 'star',
		    title: 'Intro',
		    items: [
			{
                    	    xtype: 'intropanel'	// intro page
			}
			]
                },
//            {
//                xtype: 'map',
//		height: '100%',
//                mapOptions: {
//                    mapTypeId: google.maps.MapTypeId.ROADMAP,
//                    zoom: 15
//                },
//                useCurrentLocation: true
//            },


		{
                    xtype: 'panel',		// MAP panel
		    iconCls: 'maps',
		    itemId: 'mapandtools',
		    title: 'Add fault',
		    //height: '100%',
		    layout: 'hbox',
		    items: [
			{
                	docked: 'left',
			width: '4em',
			xtype: 'maptoolbar',	// toolbar
			title: 'Faults',
			flex: 1
	                },
			{
                    	    xtype: 'mappanel',		// map page
			    flex:6
			}
			]
                },
		{
                    xtype: 'markerlocalpanel',	// marker local page
		    iconCls: 'action',
		    title: 'Fault list'
                },
		{
                    xtype: 'panel',		// Info panel
		    iconCls: 'star',
		    title: 'Info',
		    items: [
			{
                    	    xtype: 'infopanel'		// info page
			}
			]
                },

		{
                    xtype: 'settingspanel',	// settings page
		    iconCls: 'settings',
		    title: 'Settings'
		}
        ]
    },
 
    initialize: function(){
        var me = this;
        me.callParent(arguments);
        this.initMap();
    },
 
    initMap: function(){
 
   //     var mapPanel = this.down('map');
   //     var gMap = mapPanel.getMap();
 

 
//        var marker = new google.maps.Marker({
//            map: gMap,
//            animation: google.maps.Animation.DROP,
//            position: new google.maps.LatLng(138.600941, -34.927713)
//        });
         //var panoramioLayer = new google.maps.panoramio.PanoramioLayer();
        //panoramioLayer.setMap(gMap);
    }
});