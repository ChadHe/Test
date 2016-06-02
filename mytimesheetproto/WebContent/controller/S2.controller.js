jQuery.sap.require("mytimesheetproto.util.Formatter");
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("mytimesheetproto.controller.S2", {
		onInit: function() {
			for (var i = 1; i <= 24; i++){
				//Set Name
				if (i === 8 || i === 17 || i === 24) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "1970-01-01",
							endDay: "1970-01-01",
							row: i,
							type: "06",
							name: i + ":00"
						})
				); }
				else if (i === 1) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "1970-01-01",
							endDay: "1970-01-01",
							row: i,
							type: "06",
							name: "0:00"
						})
					);
				}
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
				
				//Set Data
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

				if (i>=8 && i<= 20) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-06-07",
							endDay: "2016-06-07",
							row: i,
							type: "02"
						})
				); }

				if (i>=0 && i<= 24) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-06-08",
							endDay: "2016-06-08",
							row: i,
							type: "01"
						})
				); }

				if (i>=8 && i<= 17) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-06-18",
							endDay: "2016-06-20",
							row: i,
							type: "01"
						})
				); }

				if (i>=8 && i<= 17) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-06-11",
							endDay: "2016-06-12",
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