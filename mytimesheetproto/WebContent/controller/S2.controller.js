jQuery.sap.require("mytimesheetproto.util.Formatter");
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("mytimesheetproto.controller.S2", {
		onInit: function() {
			for (var i = 1; i <= 24; i++){
				if (i % 6 === 0) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "1970-01-01",
							endDay: "1970-01-01",
							row: i,
							type: "06",
							name: i + ":00"
						})
				); }
				else {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "1970-01-01",
							endDay: "1970-01-01",
							row: i,
							type: "06",
							name: "|"
						})
					);
				}
				
				if (i < 8) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-06-03",
							endDay: "2016-06-03",
							row: i,
							type: "01"
						})
				); }
				
				if (i >= 8 && i<=18) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-06-03",
							endDay: "2016-06-03",
							row: i,
							type: "06"
						})
				); }
				
				if (i > 18) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-06-03",
							endDay: "2016-06-03",
							row: i,
							type: "07"
						})
				); }
			}
			
		},
		
		searchEmployee: function (oEvent) {
		    if (! this._oDialog) {
		        this._oDialog = sap.ui.xmlfragment("mytimesheetproto.view.Search", this);
		        this._oDialog.setModel(this.getView().getModel("i18n"), "i18n");
		      }
		    
		    this._oDialog._oSearchField.setProperty("placeholder","氏名・組織ユニット・従業員番号を入力");
		    this._oDialog.open();
		}

	});

});