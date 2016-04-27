jQuery.sap.require("sap.ui.unified.FileUploader");
sap.ui.controller("hcm.mytimesheet.yyhcm_tsh_man.view.S3Custom", {
	extHookChangeHeaderFooterOptions: function(o) {
		// Place your hook implementation code here 
		var oFileUploader = new sap.ui.unified.FileUploader(
			"FILE_UPLOADER", {
				name: "myFileUploader",
				uploadUrl: "uploadUrl/",
				change: "handleUpload"
			});
		o.buttonList.push(oFileUploader);
	}
});