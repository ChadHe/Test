sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"mytimesheetproto/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("mytimesheetproto.Component", {

		metadata: {
			"version": "1.0.0",
			"rootView": {
				viewName: "mytimesheetproto.view.App",
				type: sap.ui.core.mvc.ViewType.XML
			},
			
			//*********add by ren start

			routing: {
				config: {
					routerClass: "sap.m.routing.Router",
					viewPath: "mytimesheetproto.view",
					controlId: "rootControl",
					controlAggregation: "pages",
					viewType: "XML"
				},			
			
			routes: [
						{
							name: "S2",
							// empty hash - normally the start page
							pattern: "",
							target: "S2"
						},
						{
							name: "S1",
							pattern: "S1",
							target: "S1"
						}
					],
			targets: {
				S1: {
					viewName: "S1",
					viewLevel: 0
				},
				S2: {
					viewName: "S2",
					viewLevel: 1
				} 
				}
			}, 
					
//*********add by ren end			
			
			"dependencies": {
				"libs": ["sap.ui.core", "sap.m", "sap.ui.layout"]
			},
			"config": {
				"i18nBundle": "mytimesheetproto.i18n.i18n",
				"icon": "",
				"favIcon": "",
				"phone": "",
				"phone@2": "",
				"tablet": "",
				"tablet@2": ""
			}
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this method, the resource and application models are set.
		 * @public
		 * @override
		 */
		init: function() {
			var mConfig = this.getMetadata().getConfig();

			// set the i18n model
			this.setModel(models.createResourceModel(mConfig.i18nBundle), "i18n");


			var otimesheet = {
					dateValue: new Date(),					
					starttime: new Date(),
					endtime: new Date(),
					restst: new Date(),
					restet: new Date(),
					outst: new Date(),
					outet: new Date(),
					
					Persons: [
					         
					         ],
					        
					         
					timesheet: [
						{
							startDay: this.firstDate,
							endDay: this.firstDate,
							row: 1,
							type: "02",
							typeName: "",
							name: "09:00~10:00"
							}, 
							{
							startDay: this.firstDate,
							endDay: this.firstDate,
							row: 2,
							type: "01",
							typeName: "",
							name: "10:00~11:00"
							},
							{
							startDay: this.firstDate+1,
							endDay: this.firstDate+1,
							row: 1,
							type: "01",
							typeName: "",
							name: "09:00~10:00"
							}
						]
				};
			this.oJsonModel = new sap.ui.model.json.JSONModel();
			this.oJsonModel.setData(otimesheet);
			this.setModel(this.oJsonModel);
				
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			//ADD BY REN
			// Parse the current url and display the targets of the route that matches the hash
			this.getRouter().initialize();
			
		}
	});

});