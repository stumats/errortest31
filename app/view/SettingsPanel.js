// Main view for the Settings panel

Ext.define('maptest1.view.SettingsPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'settingspanel',
requires: [
    'Ext.form.FieldSet',
    'Ext.field.Toggle',
    'Ext.field.Select',
    'Ext.field.Text',
    'Ext.Button'
],
    config: {
	items: [
		{
		xtype: 'fieldset',
		title: 'SettingsPanel',
		instructions: "Please list your name and email and these will be sent along with the fault notice. You can also turn off the intro page.",
		items: [
			{
				name: 'hideintro',
				xtype: 'togglefield',
				label: 'Hide intro page',
				value: '0'
			},
			{
				name: 'uselocation',
				xtype: 'togglefield',
				label: 'Use current location',
				value: '0'
			},
			{
				name: 'name',
				xtype: 'textfield',
				label: 'Full name'
			},
			{
				name: 'email',
				xtype: 'textfield',
				label: 'Email address'
			},
			{
				xtype: 'button',
				itemId: 'save',
				text: 'save settings',
				ui: 'confirm',
				action: 'refresh',
				width: '60%'
			}
		]	// end fieldset Items
	}	// end config items
	]	// end Config Items

    }	// END config
});
