jQuery.sap.require("sap.ui.unified.FileUploader");
sap.ui.controller("hcm.mytimesheet.yyhcm_tsh_man.view.S3Custom", {
	init: function(){
		var date = new Date();
		var oODataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/YYCATS_SRV/WorktimeAssignSet('"+date+"')");
		this.getView().setModel(oOdataModel,"WTAssign");
	},
	
	extHookChangeHeaderFooterOptions: function(o) {
		// Place your hook implementation code here
		/*var oFileUploader = new sap.ui.unified.FileUploader(
			"FILE_UPLOADER", {
				name: "myFileUploader",
				uploadUrl: "uploadUrl/",
				change: "handleUpload"
			});
		o.buttonList.push(oFileUploader);*/
		return o;
	},
	
	saveWorkAssign: function(){
		var oService = this.getView().getModel("WTAssign");
		oService.update("/WorktimeAssignSet",oService.oData);
	}
});