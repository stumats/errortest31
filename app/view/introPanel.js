// Main view for the intro panel

Ext.define('maptest1.view.introPanel', {
    extend: 'Ext.Panel',
    xtype: 'intropanel',

    config: {
	itemId: 'intro',

	html: ["You have opened the Road Repair app, which allows you to quickly add roadfaults to a google map so that our repair team can get to work on it.<br /><br />Instructions<br />Operation is simple: on the Add Fault page just click the appropriate fault icon and drag it into position on the map. Click the icon to add notes or change the type. Double-click it to delete it.<br /><br />The Fault List page shows a list of all faults and clicking on each shows a streetview and a static map with marker.<br /.<br />Note that on the settings page you can list your name and email and these will be sent along with the fault notice."].join(""),
	styleHtmlContent: true,
	centered: true,
	top: '50px',
	width: '70%',
	left: '15%'
    }
});
