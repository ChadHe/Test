jQuery.sap.declare("mytimesheetproto.util.Formatter");
mytimesheetproto.util.Formatter = {
	getMonday : function(dDate) {
		var iDiffDate = dDate.getDay() - 1;
		return new Date(dDate.getFullYear(), dDate.getMonth(),
				dDate.getDate() - iDiffDate);
	},

	getDates : function(iIndex, dEntryDate) {
		if (iIndex == 0) {
			var dStartDate = mytimesheetproto.util.Formatter.getMonday(dEntryDate);

			var dEndDate = new Date(dStartDate);
			dEndDate.setDate(dEndDate.getDate() + 6);
			return [ dStartDate, dEndDate ];
		} else {
			var dStartDate = new Date(dEntryDate);
			dStartDate.setDate(1);

			var dEndDate = new Date(dEntryDate);
			dEndDate.setMonth(dEntryDate.getMonth() + 1);
			dEndDate.setDate(0);
			return [ dStartDate, dEndDate ];
		}
	},

	setEndDate : function(dStartDate) {
		this.dEntryDate = dStartDate.getParameter("dateValue");
		var iIndex = this.byId("RBG").getSelectedIndex();
		var aDates = mytimesheetproto.util.Formatter.getDates(iIndex,
				this.dEntryDate);

		var oFormatter = sap.ui.core.format.DateFormat.getDateInstance({
			pattern : "M/d/yy"
		});

		this.byId("StartDate").setValue(oFormatter.format(aDates[0]));
		this.byId("EndDate").setValue(oFormatter.format(aDates[1]));
	},

	setEndDateR : function(oParam) {
		var iIndex = oParam.getParameter("selectedIndex");
		var aDates = mytimesheetproto.util.Formatter.getDates(iIndex,
				this.dEntryDate);

		var oFormatter = sap.ui.core.format.DateFormat.getDateInstance({
			pattern : "M/d/yy"
		});

		this.byId("StartDate").setValue(oFormatter.format(aDates[0]));
		this.byId("EndDate").setValue(oFormatter.format(aDates[1]));
	}
}
