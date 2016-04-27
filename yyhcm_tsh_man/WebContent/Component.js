jQuery.sap.declare("hcm.mytimesheet.yyhcm_tsh_man.Component");
// use the load function for getting the optimized preload file if present
sap.ui.component.load({
	name: "hcm.mytimesheet",
	// Use the below URL to run the extended application when SAP-delivered application located in a local cloud environment:
	//url: jQuery.sap.getModulePath("hcm.mytimesheet.yyhcm_tsh_man") + "/../../hcm_tsh_man"	
	// Use the below url to run the extended application when SAP-delivered application located in a cloud environment:
	url: jQuery.sap.getModulePath("hcm.mytimesheet.yyhcm_tsh_man") + "/hcm_tsh_man" // we use a URL relative to our own component
		// extension application is deployed with customer namespace
});
this.hcm.mytimesheet.Component.extend("hcm.mytimesheet.yyhcm_tsh_man.Component", {
	metadata: {
		version: "1.0",
		config: {},
		customizing: {
			"sap.ui.controllerExtensions": {
				"hcm.mytimesheet.view.S3": {
					"controllerName": "hcm.mytimesheet.yyhcm_tsh_man.view.S3Custom"
				}
			}
		}
	}
});