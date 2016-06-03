sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("mytimesheetproto.controller.S1", {
		changeSelect: function(oItem){
			if (oItem.getParameter("selectedItem").getKey() === "srest"){
				this.byId("Select2").setEnabled(true);
			} else {
				this.byId("Select2").setEnabled(false);
				this.byId("Select2").setSelectedKey("Default");
			}
		}

	});

});