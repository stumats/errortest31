Ext.define('maptest1.store.settingsStore', {
	extend: 'Ext.data.Store',
	requires: ['maptest1.model.Settings'],
	config: {
		model: 'maptest1.model.Settings',
		storeId: 'settingsSt',
		autoLoad: true,
		proxy: {
		    type: 'localstorage',
		    id: 'settingsproxy'
		}
	}	// END config
});