jQuery.sap.declare("com.abeam.zccitsollib.util.Formatter");

com.abeam.zccitsollib.util.Formatter = {
	changeDate: function(oDate){
		if (!oDate){
			return oDate;
		} else {
			return sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd.MM.yyyy"
			}).format(oDate);
		}
	},
	
	changeMail: function(sMailURL){
		if (sMailURL && sMailURL.substr(0,7) == 'mailto:'){
			return sMailURL;
		} else {
			return 'mailto:' + sMailURL;
		}
	},
	
	changeWebUrl: function(sWebURL){
		if (sWebURL && (sWebURL.substr(0,7) == 'http://' || sWebURL.substr(0,8) == 'https://')){
			return sWebURL;
		} else {
			return 'http://' + sWebURL;
		}
	}
}