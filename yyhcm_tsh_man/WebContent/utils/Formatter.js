jQuery.sap.declare("hcm.mytimesheet.yyhcm_tsh_man.utils.Formatter");
hcm.mytimesheet.yyhcm_tsh_man.utils.Formatter = {
	changeTime: function(sODataTime){
		if (sODataTime !== null){
			return  sODataTime.substr(2,2) +
					":" +
					sODataTime.substr(5,2) +
					":" +
					sODataTime.substr(8,2);
		}
	}
}
