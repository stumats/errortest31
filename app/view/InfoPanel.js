// Main view for the info panel

Ext.define('maptest1.view.InfoPanel', {
    extend: 'Ext.Panel',
    xtype: 'infopanel',

    config: {


	html: ["This app is built by Stuart Sontier for the course 'Web Engineering II'.<br />The app allows input and storage of coordinate data that represents points on a map. The points refer to faults found on a road and are visualised on a Google Map.<br />Points can be dragged, and if clicked allow the fault type to be changed and notes to be added.<br /><br />Current limitations: <br />1) Points are stored locally; soon there will be an online database (limited by cross-site json issue)<br />2) Photo of fault will be able to be added soon<br /><br />Contact email: stumats@biote.net<br /> "].join(""),
	styleHtmlContent: true,
	centered: true,
	top: '50px',
	width: '70%',
	left: '15%'
    }
});
