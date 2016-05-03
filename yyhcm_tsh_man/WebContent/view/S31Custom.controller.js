sap.ui.controller("hcm.mytimesheet.yyhcm_tsh_man.view.S31Custom", {
	onInit: function(){
		var oModelexch = this.oApplication.getModel("S31modelexch");
		if (oModelexch){
			var oODataModel = new sap.ui.model.odata.ODataModel("proxy/sap/opu/odata/sap/YYCATS_SRV/");
			this.getView().setModel(oODataModel,"WTAssign");
			this.getView().getModel("WTAssign").setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);

			var dSelectedDate = new Date(oModelexch.getProperty("/selectedDates")[0]);
			var sDateString = dSelectedDate.getFullYear()
							+ '-'
							+ dSelectedDate.getMonth()
							+ '-'
							+ dSelectedDate.getDate()
							+ 'T00:00:00';
			var sDatePath = "WTAssign>/WorktimeAssignSet(datetime'" + sDateString + "')";
			this.getView().byId("worktimeAssignmentPanel").bindElement(sDatePath);
		}
	},
	
	saveWorkAssign: function(){
		var oService = this.getView().getModel("WTAssign");
		var oModelexch = this.oApplication.getModel("S31modelexch");
		var dSelectedDate = new Date(oModelexch.getProperty("/selectedDates")[0]);
		var sDateString = dSelectedDate.getFullYear()
						+ '-'
						+ dSelectedDate.getMonth()
						+ '-'
						+ dSelectedDate.getDate()
						+ 'T00:00:00';
		var sDatePath = "/WorktimeAssignSet(datetime'" + sDateString + "')";
		
		oService.update(sDatePath,{
			RangeStart: "PT" +
						this.getView().byId("TR_TP1").getDateValue().getHours() +
						"H" +
						this.getView().byId("TR_TP1").getDateValue().getMinutes() +
						"M" +
						this.getView().byId("TR_TP1").getDateValue().getSeconds() +
						"S",
			RangeEnd:   "PT" +
						this.getView().byId("TR_TP2").getDateValue().getHours() +
						"H" +
						this.getView().byId("TR_TP2").getDateValue().getMinutes() +
						"M" +
						this.getView().byId("TR_TP2").getDateValue().getSeconds() +
						"S",
			Rest1Start: "PT" +
						this.getView().byId("REST1_TP1").getDateValue().getHours() +
						"H" +
						this.getView().byId("REST1_TP1").getDateValue().getMinutes() +
						"M" +
						this.getView().byId("REST1_TP1").getDateValue().getSeconds() +
						"S",
			Rest1End:   "PT" +
						this.getView().byId("REST1_TP2").getDateValue().getHours() +
						"H" +
						this.getView().byId("REST1_TP2").getDateValue().getMinutes() +
						"M" +
						this.getView().byId("REST1_TP2").getDateValue().getSeconds() +
						"S",
			OTReason: this.getView().byId("OTREASON").getValue()
		},null,null);
	}
});