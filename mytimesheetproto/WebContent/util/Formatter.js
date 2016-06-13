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
		this.byId("id_calendar1").setStartDate(aDates[0]);
	},

	setEndDateR : function(oParam) {
		var iIndex = oParam.getParameter("selectedIndex");
		/*
		var aDates = mytimesheetproto.util.Formatter.getDates(iIndex,
				this.dEntryDate);

		var oFormatter = sap.ui.core.format.DateFormat.getDateInstance({
			pattern : "M/d/yy"
		});

		this.byId("StartDate").setValue(oFormatter.format(aDates[0]));
		this.byId("EndDate").setValue(oFormatter.format(aDates[1]));
		this.byId("id_calendar1").setStartDate(aDates[0]);
		*/
		
		if (iIndex === 0){
			this.byId("id_calendar1").setWeeksPerRow(1);
			$(".hideFooterButton").css("visibility","visible");
		} else {
			this.byId("id_calendar1").setWeeksPerRow(4);
			$(".hideFooterButton").css("visibility","hidden");
		}
		
		//fire chagngedate
	    var c = new Date (this.byId("id_calendar1").getStartDate() );
	    this.byId("id_calendar1").fireChangeDate( {firstDate: c } );		
	},
	
	
	CopyTimesheet : function(dStartDate, dEndDate) {
		
		var oDate = new Date( dStartDate );
		var odate322 = new Date();
		var oStartDate = new Date( dStartDate );
		var oEndDate = new Date( dEndDate );
		var that = this;
		
		while (oDate <= oEndDate){
			var oflg = false;
			//check if is Satuday Sunday 
			if (oDate.getDay() > 0 && oDate.getDay() < 6){
				
				for (var i in this.TextforTimesheet){
					if ( oDate.getFullYear() == this.TextforTimesheet[i].getFullYear() &&
						oDate.getMonth() == this.TextforTimesheet[i].getMonth() &&
						oDate.getDate() == this.TextforTimesheet[i].getDate() ){
						oflg = true;
					}
				}
				
				if (!oflg){
					this.TextforTimesheet.push(new Date(oDate));
				}
				var ostr = new String();
				var omonth =  oDate.getMonth() + 1;
				if (omonth < 10){
					omonth = "0" + omonth;
				}
				var oday = oDate.getDate();
				if (oday < 10){
					oday = "0" + oday;
				}				
				
				ostr = oDate.getFullYear() + "-" + omonth + "-" + oday;
				
				for (var i = 11; i <= 28; i++){
					this.byId("id_calendar1").addCalendarEvent(
							new sap.me.OverlapCalendarEvent({
								startDay: ostr,
								endDay: ostr,
								row: i,
								type: "06"
							})
					); 
										
				}
			}
			
			oDate.setDate(oDate.getDate() + 1);
		};
		
	}, 
	
	changeDate : function(oEvent) {
		var that = this;
		var days = $(".sapMeOverlapCalendarDay");
		var resourcesBundle = this.oView.getModel("i18n").getResourceBundle();
		var iIndexsel = this.byId("RB3-2").getSelected();
		var odates = oEvent.getParameters( );
		days.each(function(index,ele){
			
			//Clear text
			while (ele.childNodes.length > 0){
				ele.removeChild(ele.childNodes[0]);
			}	
			
			if (!iIndexsel){		
				
				var targetSplits = ele.id.split("-");
				var row = targetSplits[targetSplits.length - 2];
				var column = targetSplits[targetSplits.length - 1];
				
				var tDate = new Date (that.byId("id_calendar1").getStartDate() );
				tDate.setDate(tDate.getDate() + parseInt(column, 10));
                
				//var oattr = ele.getAttribute("style");
				//oattr = oattr + "; height:14px !important;";
				//ele.setAttribute("style", oattr);
				
				//check special date
				var ospflg = false;
				for (var j in that.TextforSP){
					if (tDate.getFullYear() == that.TextforSP[j].getFullYear() &&
							tDate.getMonth() == that.TextforSP[j].getMonth() &&
							tDate.getDate() == that.TextforSP[j].getDate() ) {
						ospflg = true;
					}
				}
				
				if (!ospflg){

					if (row == 12){
						for (var i in that.TextforTimesheet){
								if (tDate.getFullYear() == that.TextforTimesheet[i].getFullYear() &&
										tDate.getMonth() == that.TextforTimesheet[i].getMonth() &&
										tDate.getDate() == that.TextforTimesheet[i].getDate() ) {
									
							var oattr = ele.getAttribute("style");
							oattr = oattr + "; height:14px !important;";
							//ele.setAttribute("style", oattr);
							var ostr= resourcesBundle.getText("typ_Work");
							$(this).append(ostr);
							
							}
						}
					} 
					
					if (row == 13){
						for (var i in that.TextforTimesheet){
								if (tDate.getFullYear() == that.TextforTimesheet[i].getFullYear() &&
										tDate.getMonth() == that.TextforTimesheet[i].getMonth() &&
										tDate.getDate() == that.TextforTimesheet[i].getDate() ) {
							
							var oattr = ele.getAttribute("style");
							oattr = oattr + "; height:14px !important;";
							//ele.setAttribute("style", oattr);
							$(this).append("09:00~17:30");
							
							}
						}
					} 	
				}
				//set text for 5/30~6/3
				else{
					//5/30
					if (tDate.getFullYear() == '2016' &&
							tDate.getMonth() == '4' &&
							tDate.getDate() == '30' ) {
						if (row == 12){
							var ostr= resourcesBundle.getText("typ_Work");
							$(this).append(ostr);		
						}
						if (row == 13){

							$(this).append("09:00~19:00");		
						}									
					} 
					
					//5/31
					if (tDate.getFullYear() == '2016' &&
							tDate.getMonth() == '4' &&
							tDate.getDate() == '31' ) {
						if (row == 12){
							var ostr= resourcesBundle.getText("typ_Work");
							$(this).append(ostr);		
						}
						if (row == 13){

							$(this).append("09:00~17:30");		
						}	
					}
					//6/1
					if (tDate.getFullYear() == '2016' &&
							tDate.getMonth() == '5' &&
							tDate.getDate() == '1' ) {
						
						if (row == 12){
							var ostr= resourcesBundle.getText("typ_Work");
							$(this).append(ostr);		
						}
						if (row == 13){
							$(this).append("09:00~15:00");		
						}	
						if (row == 23){
							var ostr= resourcesBundle.getText("typ_outside");
							$(this).append(ostr);		
						}
						if (row == 24){
							$(this).append("15:00~16:00");		
						}	
						if (row == 26){
							var ostr= resourcesBundle.getText("typ_Work");
							$(this).append(ostr);		
						}
						if (row == 27){
							$(this).append("16:00~20:00");		
						}						
					}
					//6/2
					if (tDate.getFullYear() == '2016' &&
							tDate.getMonth() == '5' &&
							tDate.getDate() == '2' ) {
						
						if (row == 12){
							var ostr= resourcesBundle.getText("typ_Work");
							$(this).append(ostr);		
						}
						if (row == 13){
							$(this).append("09:00~15:30");		
						}	
						if (row == 26){
							var ostr= resourcesBundle.getText("typ_annualleave_hour");
							$(this).append(ostr);		
						}	
						if (row == 27){
							$(this).append("15:30~17:30");		
						}							
					}
					//6/3
					if (tDate.getFullYear() == '2016' &&
							tDate.getMonth() == '5' &&
							tDate.getDate() == '3' ) {
						
						if (row == 12){
							var ostr= resourcesBundle.getText("typ_annualleave");
							$(this).append(ostr);		
						}						
					}					
				}
			}
			
		});
		
	}	
}
