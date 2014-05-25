Ext.define('maptest1.controller.settingsControl', {
	extend: Ext.app.Controller,
	config: {
		refs: {
			mainView: 'main',
			settingsView: 'settingspanel',
			introView: '#intro',

    			btnSave: 'settingspanel button[action=refresh]'
		},
		control: {
    			'btnSave': {
				tap: 'onSettingsSaveTap'
			}
		}
	},	// end of config


    onSettingsSaveTap: function(button, e, options) {
	var formObject = button.up('settingspanel');
	var formData = formObject.getValues();

	var settingsObj = Ext.create('maptest1.model.Settings', {
		name: formData.name,
		email: formData.email,
		hideintro: formData.hideintro,
		uselocation: formData.uselocation
	});
	
	var errs = settingsObj.validate();
	var msg = "";

	if (!errs.isValid()) {
		errs.each(function (err) {
			msg += err.getField() + ' : ' + err.getMessage() + ' ' ;
		});

	Ext.Msg.alert("ERROR", msg);

	} else {

	var settingsStore = Ext.getStore('settingsSt');
	//remove previous settings
	settingsStore.removeAll();
	settingsStore.sync();

	settingsStore.add(settingsObj);
	settingsStore.sync();

	// if hideintro is false, show intro panel and tab
	if (formData.hideintro) {
	    this.hideIntro();
	}
	else	{
	    this.showIntro();
 	}

	// if uselocation is false, turn off geo.autoUpdate
	if (formData.uselocation) {
	//	console.log ("stteings: " . geo.getAutoUpdate());
	    geo.setAutoUpdate(true);
	    geo.updateLocation();
	}
	else	{
	    geo.setAutoUpdate(false);
 	}
//console.log(geo);
	//Ext.Msg.alert("SUCCESS", 'Form is valid and saved');	
	}
    },



/*
	Launch  - loads Settings data.
		- If skip Intro is set, it goes straight to the map page, else 			it loads the intro page	
*/

launch: function(app) {
    checkLocError = 0;		// so that location error only seen once
    this.getMainView().setActiveItem(3);
    loadSettingsData();
    if (typeof(email) == 'undefined')	{
	this.getMainView().setActiveItem('settingspanel');
	return false;
    }
    if (typeof(hideintro) !== 'undefined' && hideintro) {
	    this.getMainView().setActiveItem(2);

	    this.getIntroView().hide();
	    this.getMainView().getTabBar().getAt(0).hide();
    }
    else {
	    this.getMainView().setActiveItem(1);
		//console.log('going to the else');
    }
    if (uselocation) {
	geo.setAutoUpdate(true);
    }
},

showIntro: function() {
	//console.log(this);
	this.getIntroView().show();
	this.getMainView().getTabBar().getAt(0).show();
},
hideIntro: function() {
	//console.log(this);
	this.getIntroView().hide();
	this.getMainView().getTabBar().getAt(0).hide();
},


});



/* 
The method loadSettingsData() starts with showing a loading mask. 
This will display a loading throbber on the top of the Ext.Viewport, 
so it will be nice centered in the middle. 
It loads the settings store data, then unmasks the viewport
*/





loadSettingsData = function() {
	var me = this;

	Ext.Viewport.setMasked({
		xtype: 'loadmask',
		indicator: true,
		message: 'Retrieve Settings...'
	});

	Ext.getStore('settingsSt').load({
		callback: function(records, operation, success) {
			if (records.length > 0) {
				//Load details from settings
				hideintro = records[0].get('hideintro');	// global because no var
				uselocation = records[0].get('uselocation');
				name = records[0].get('name');
				email = records[0].get('email');

				//on launch - fill all fields
				if(!hideintro){
					Ext.ComponentQuery.query('settingspanel togglefield[name=hideintro]')[0].setValue(0);
				} else {
					Ext.ComponentQuery.query('settingspanel togglefield[name=hideintro]')[0].setValue(1);
				}
				if(!uselocation){
					Ext.ComponentQuery.query('settingspanel togglefield[name=uselocation]')[0].setValue(0);
					geo.setAutoUpdate(false);
					
				} else {
					Ext.ComponentQuery.query('settingspanel togglefield[name=uselocation]')[0].setValue(1);
					geo.setAutoUpdate(true);
				}
					
				Ext.ComponentQuery.query('settingspanel textfield[name=name]')[0].setValue(name);

				Ext.ComponentQuery.query('settingspanel textfield[name=email]')[0].setValue(email);
			} 
			Ext.Viewport.unmask();

		}
	});
}	// END loadSettingsData
