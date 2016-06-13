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
		},

		onNavBack: function (evt) {
			this.getOwnerComponent().getRouter().navTo("S2");
		},
		
		onPress: function (evt) {
			//this.getOwnerComponent().getRouter().navTo("S2");
		},
		
		handleCheckTime: function (evt) {
			/*
			 var newValue = evt.getParameter("value");					     
		     if (newValue){
		    	 var targetSplits = newValue.split(":");
			     if (targetSplits.length != 2){
			    	 sap.m.MessageToast.show("It's not a time format!");
			     }
			     else {
			    	if (targetSplits[0] >= 0 && targetSplits[0] <=23 && 
			    		targetSplits[1] >= 0 && targetSplits[1] <=59 ){
			    		
			    		}
			    	else{
			    		sap.m.MessageToast.show("It's not a time format!");
			    	}
			     }
		     }
		     */
		     
		}		
		
	});

});