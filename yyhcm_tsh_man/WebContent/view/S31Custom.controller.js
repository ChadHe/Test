sap.ui.controller("hcm.mytimesheet.yyhcm_tsh_man.view.S31Custom", {
	onInit: function(){
		var date = new Date();
		var oODataModel;
		oODataModel = new sap.ui.model.odata.ODataModel("proxy/sap/opu/odata/sap/YYCATS_SRV/");
//		oODataModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
		this.getView().setModel(oODataModel,"WTAssign");
		this.getView().byId("worktimeAssignmentPanel").bindElement("WTAssign>/WorktimeAssignSet(datetime'2016-04-29T00:00:00')");
	},
	
	saveWorkAssign: function(){
		var oService = this.getView().getModel("WTAssign");
		var date = new Date();
		oService.update("/WorktimeAssignSet(datetime'2016-04-29T00:00:00')",{
				Keydate: date,
				RangeStart: date.getTime()
			});
	}
});