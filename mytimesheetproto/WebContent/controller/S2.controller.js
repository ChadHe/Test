jQuery.sap.require("mytimesheetproto.util.Formatter");
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("mytimesheetproto.controller.S2", {
		//	onInit: function() {
		//
		//	},
		
		searchEmployee: function (oEvent) {
		    if (! this._oDialog) {
		        this._oDialog = sap.ui.xmlfragment("sap.m.sample.SelectDialog.Dialog", this);
		        this._oDialog.setModel(this.getView().getModel());
		      }

		      // Multi-select if required
		      var bMultiSelect = !!oEvent.getSource().data("multi");
		      this._oDialog.setMultiSelect(bMultiSelect);

		      // Remember selections if required
		      var bRemember = !!oEvent.getSource().data("remember");
		      this._oDialog.setRememberSelections(bRemember);

		      // clear the old search filter
		      this._oDialog.getBinding("items").filter([]);

		      // toggle compact style
		      jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
		      this._oDialog.open();
		    }

	});

});