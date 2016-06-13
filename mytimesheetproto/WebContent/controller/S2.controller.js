jQuery.sap.require("mytimesheetproto.util.Formatter");
sap.ui.define([
    "sap/m/Dialog",
	"sap/ui/core/mvc/Controller",
    "sap/ui/layout/VerticalLayout"
], function(Dialog,Controller,VerticalLayout) {
	"use strict";

	return Controller.extend("mytimesheetproto.controller.S2", {
		onInit: function() {
			
			//add by ren start		
			/* Initializations */
			this._tcObject = {
				pernrCalendar: {}
			};			
			
			this.TextforTimesheet = new Array();
			this.TextforTimesheet = [];
			
			this.TextforSP = new Array();
			this.TextforSP = [new Date("2016/05/30"),new Date("2016/05/31"),
			                  new Date("2016/06/01"),new Date("2016/06/02"),
			                  new Date("2016/06/03")];
			
			this.timeline = new Array();
			this.timeline = [
			  "0:00","1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","8:30","9:00","9:30","10:00","10:30",
			  "11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00",
			  "17:30","18:00","18:30","19:00","19:30","20:00","21:00","22:00","23:00","24:00"
			          ];
			
			var that = this;
			
			//Calculate Monday
			this.firstDate = new Date();
			var oday = this.firstDate.getDay();
			if (oday == 0){
				this.firstDate.setDate(this.firstDate.getDate() - 6);
			}
			else{
				this.firstDate.setDate(this.firstDate.getDate() - oday + 1);
			}
			//Current start date
			this.curDate = this.firstDate;
			
			/* Date change for the calendars. Current date is set as starting date */
			this._tcObject.pernrCalendar = this.byId("id_calendar1");
			this._tcObject.pernrCalendar.setStartDate(this.firstDate);
			//this._tcObject.pernrCalendar.setStartDate('2016-06-06');
			
				
			for (var i = 1; i <= 37; i++){				
				//Set Name
				if (i === 1) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "1970-01-01",
							endDay: "1970-01-01",
							row: i,
							type: "06",
							name: "0:00"
						})
					); }
				else if (i === 11) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "1970-01-01",
							endDay: "1970-01-01",
							row: i,
							type: "06",
							name: "09:00"
						})
				); }
				else if (i === 37) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "1970-01-01",
							endDay: "1970-01-01",
							row: i,
							type: "06",
							name: "24:00"
						})
				); }
				else if (i === 19) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "1970-01-01",
							endDay: "1970-01-01",
							row: i,
							type: "06",
							name: "13:00"
						})
					);
				}					
				else if (i === 28) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "1970-01-01",
							endDay: "1970-01-01",
							row: i,
							type: "06",
							name: "17:30"
						})
					);
				}
				
				else {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "1970-01-01",
							endDay: "1970-01-01",
							row: i,
							type: "06",
							name: " "
							//name: "|"
						})
					);
				} 				
				
				//set SP data for 5/30-6/3
				//5/30
				if (i >= 11 && i<=28) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-05-30",
							endDay: "2016-05-30",
							row: i,
							type: "04"
						})
				); }
				if (i >= 29 && i<=31) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-05-30",
							endDay: "2016-05-30",
							row: i,
							type: "Selected00"
						})
				); }		
				//5/31
				if (i >= 11 && i<=28) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-05-31",
							endDay: "2016-05-31",
							row: i,
							type: "04"
						})
				); }				
				//6/1
				if (i >= 11 && i<=22) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-06-01",
							endDay: "2016-06-01",
							row: i,
							type: "04"
						})
				); }				
				if (i >= 23 && i<=25) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-06-01",
							endDay: "2016-06-01",
							row: i,
							type: "01"
						})
				); }
				if (i >= 26 && i<=28) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-06-01",
							endDay: "2016-06-01",
							row: i,
							type: "04"
						})
				); }		
				if (i >= 29 && i<=33) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-06-01",
							endDay: "2016-06-01",
							row: i,
							type: "Selected00"
						})
				); }	
				//6/2
				if (i >= 11 && i<=24) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-06-02",
							endDay: "2016-06-02",
							row: i,
							type: "04"
						})
				); }	
				if (i >= 25 && i<=28) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-06-02",
							endDay: "2016-06-02",
							row: i,
							type: "01"
						})
				); }				
				//6/3
				if (i >= 11 && i<=28) {
					this.byId("id_calendar1").addCalendarEvent(
						new sap.me.OverlapCalendarEvent({
							startDay: "2016-06-03",
							endDay: "2016-06-03",
							row: i,
							type: "01"
						})
				); }		
				
			}				
//add by ren end
			/*
			var oDate = new Date();
			oDate.setFullYear(2016);
			oDate.setMonth(5);
			oDate.setDate(10);
			this.TextforTimesheet.push(oDate);
			*/
			
			//Set Data
			this.oendate = new Date(this.firstDate);
			this.oendate = this.oendate.setDate(this.oendate.getDate() + 4);	
			this.oendate = new Date(this.oendate);
			mytimesheetproto.util.Formatter.CopyTimesheet.call(that,this.firstDate,this.oendate);
			
			this.byId("id_calendar1").addEventDelegate({
				onAfterRendering: function() {
					
					var iIndex = that.byId("RB3-2").getSelected();
					var resourcesBundle = that.getView().getModel("i18n").getResourceBundle();
					//$("#" + that._tcObject.eventsCalendar.getId()).children(":first-child").hide();
					//var oCalendarElements = $(".calendarVContainer").children();
					
					var days = $(".sapMeOverlapCalendarDay");
					//var c = new Date (that.byId("id_calendar1").getStartDate() );
					if (!iIndex){
						days.each(function(index,ele){
							//Clear text
							while (ele.childNodes.length > 0){
								ele.removeChild(ele.childNodes[0]);
							};
							
							
							
							var targetSplits = ele.id.split("-");
							var row = targetSplits[targetSplits.length - 2];
							var column = targetSplits[targetSplits.length - 1];
														
							var tDate = new Date (that.byId("id_calendar1").getStartDate() );
							tDate.setDate(tDate.getDate() + parseInt(column, 10));
		                    
							if (row == 12){
								for (var i in that.TextforTimesheet){
										if (tDate.getFullYear() == that.TextforTimesheet[i].getFullYear() &&
												tDate.getMonth() == that.TextforTimesheet[i].getMonth() &&
												tDate.getDate() == that.TextforTimesheet[i].getDate() ) {
									var oattr = ele.getAttribute("style");
									oattr = oattr + "; height:13.7px !important;";
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
									oattr = oattr + "; height:13.7px !important;";
									//ele.setAttribute("style", oattr);			
									
									$(this).append("09:00~17:30");
									
									}
								}
							} 		

						});
					}
					else{
						//Clear text
						while (ele.childNodes.length > 0){
							ele.removeChild(ele.childNodes[0]);
						};
					}
					that._initializeEventBindings(that);
					} });

			//disabel btn_1
			//this.byId("btn_1").addStyleClass("hideFooterButton");
			this.byId("btn_2").addStyleClass("hideFooterButton");
			this.byId("btn_3").addStyleClass("hideFooterButton");
			
		},
		
		//add by ren start		
		/**
		 * Manual "click" event handlers for all the days on the calendar
		 * Every day is checked against the _eventModel to figure out the events for a day
		 * A popup is created dynamically and attached to the clicked element with "auto" popover placement
		 */
			_initializeEventBindings: function(controller) {
				$(".sapMeOverlapCalendarRowLabels").css("width", "auto");

				$(".sapMeOverlapCalendarDay").on("dblclick", function(event) {	
					
					var targetSplits = event.target.id.split("-");
					var row = targetSplits[targetSplits.length - 2];
		
					/* Calculate Offset date */
					var column = targetSplits[targetSplits.length - 1];
		
					//var tDate = new Date(JSON.parse(JSON.stringify(controller.firstDate)));
					//Get first date of Diplayed calendar
					var tDate = new Date(controller.byId("id_calendar1").getStartDate());
					tDate.setDate(tDate.getDate() + parseInt(column, 10));
                    
					var oflg = false;
					for (var i in controller.TextforTimesheet){
						if ( tDate.getFullYear() == controller.TextforTimesheet[i].getFullYear() &&
							tDate.getMonth() == controller.TextforTimesheet[i].getMonth() &&
							tDate.getDate() == controller.TextforTimesheet[i].getDate() ){
							oflg = true;
						}
					}
					
					var ostarttime = new Date(tDate);
					var oendtime = new Date(tDate);
					if (!oflg){
						//Calculate time
						var otimeline = controller.timeline[row];
						
						var splittime = otimeline.split(":");
						var ohour = parseInt(splittime[0], 10);
						var omin  = parseInt(splittime[1], 10);;
	
						ostarttime = new Date( ostarttime.setHours(ohour) );
						ostarttime = new Date( ostarttime.setMinutes(omin) );
						ostarttime = new Date( ostarttime.setSeconds(0) );
						
						
						controller.oView.getModel().setData({
							dateValue: tDate,
							starttime: ostarttime
						}); 	
						
					}
					else{
						//Calculate time
						ostarttime = new Date( ostarttime.setHours(9) );
						ostarttime = new Date( ostarttime.setMinutes(0) );
						ostarttime = new Date( ostarttime.setSeconds(0) );
						
						oendtime = new Date(oendtime.setHours(17));
						oendtime = new Date(oendtime.setMinutes(30));
						oendtime = new Date(oendtime.setSeconds(0));	
						
						controller.oView.getModel().setData({
							dateValue: tDate,
							starttime: ostarttime,
							endtime: oendtime
						}); 
						
					}
					
					//window.alert(tDate.toString());
					controller.getOwnerComponent().getRouter().navTo("S1");

				});		
				
				$(".sapMeOverlapCalendarDay").on("click", function(event) {	
					
					var targetSplits = event.target.id.split("-");
					var row = targetSplits[targetSplits.length - 2];
		
					/* Calculate Offset date */
					var column = targetSplits[targetSplits.length - 1];
		
					//var tDate = new Date(JSON.parse(JSON.stringify(controller.firstDate)));
					//Get first date of Diplayed calendar
					var tDate = new Date(controller.byId("id_calendar1").getStartDate());
					tDate.setDate(tDate.getDate() + parseInt(column, 10));
                    
					var otimeline = controller.timeline[row];				
					var splittime = otimeline.split(":");
					var ohour = parseInt(splittime[0], 10);
					var omin  = parseInt(splittime[1], 10);;
					
					//rest start time
					var orestst = new Date(tDate);
					orestst = new Date( orestst.setHours(12) );
					orestst = new Date( orestst.setMinutes(0) );
					orestst = new Date( orestst.setSeconds(0) );
					//rest end time
					var orestet = new Date(tDate);
					orestet = new Date( orestet.setHours(13) );
					orestet = new Date( orestet.setMinutes(0) );
					orestet = new Date( orestet.setSeconds(0) );
					
					var oflg = false;
					for (var i in controller.TextforTimesheet){
						if ( tDate.getFullYear() == controller.TextforTimesheet[i].getFullYear() &&
							tDate.getMonth() == controller.TextforTimesheet[i].getMonth() &&
							tDate.getDate() == controller.TextforTimesheet[i].getDate() &&
							ohour >= 9 &&
							ohour <= 18
							){
							oflg = true;
						}
					}
										
					var ostarttime = new Date(tDate);
					var oendtime = new Date(tDate);
					if (!oflg){
						//Calculate time
	
						ostarttime = new Date( ostarttime.setHours(ohour) );
						ostarttime = new Date( ostarttime.setMinutes(omin) );
						ostarttime = new Date( ostarttime.setSeconds(0) );
						
						
						controller.oView.getModel().setData({
							dateValue: tDate,
							starttime: ostarttime,
							restst: orestst,
							restet: orestet
						}); 	
						
					}
					else{
						//Calculate time
						ostarttime = new Date( ostarttime.setHours(9) );
						ostarttime = new Date( ostarttime.setMinutes(0) );
						ostarttime = new Date( ostarttime.setSeconds(0) );
						
						oendtime = new Date(oendtime.setHours(17));
						oendtime = new Date(oendtime.setMinutes(30));
						oendtime = new Date(oendtime.setSeconds(0));	
						
						controller.oView.getModel().setData({
							dateValue: tDate,
							starttime: ostarttime,
							endtime: oendtime,
							restst: orestst,
							restet: orestet
						}); 
						
					}
					
					controller.getOwnerComponent().getRouter().navTo("S1");

				});					
			},
			
			/*
			scheduleCopy: function (oEvent) {
			    if (! this._oDialog2) {
			        this._oDialog2 = sap.ui.xmlfragment("mytimesheetproto.view.ScheduleCP", this);
			        this._oDialog2.setModel(this.getView().getModel("i18n"), "i18n");
			        //Disable Search
			        //this._oDialog2._oSubHeader.setVisible(false);
			      }
			    
			    this._oDialog2.open();
			},			
			*/
			
			scheduleCopy: function () {
				var that = this;
				var resourcesBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
				var olabels = new sap.m.Label({ text: resourcesBundle.getText("startDate"), textAlign: "Center", labelFor: oStartdate});	
				olabels.addStyleClass("paddingbottom");
				var oStartdate = new sap.m.DatePicker('SartDate',{type:'sap.ui.model.type.Date'});
				
				var olabelbt = new sap.m.Label({ text: "  " });
				olabelbt.addStyleClass("paddingbottom");
				
				var olabele = new sap.m.Label({ text: resourcesBundle.getText("endDate"), textAlign: "Center", labelFor: oEnddate});
				olabele.addStyleClass("paddingbottom");
				var oEnddate = new sap.m.DatePicker('EndDate');
				
				olabels.addEventDelegate({
					onAfterRendering: function() {
						var days = $(".paddingbottom");
						
						days.each(function(index,ele){
							ele.setAttribute("style", "padding-bottom:10px;");
						});
					}
				});				
				var dialog = new Dialog({
					title: resourcesBundle.getText("scheduleCopy"),
					type: 'Message',
										
					content: [
						new sap.ui.layout.VerticalLayout({
							content:[
								new sap.ui.layout.HorizontalLayout({
									content: [
									          olabels,oStartdate
									]
								}),

								new sap.ui.layout.HorizontalLayout({
									content: [
									          olabele,oEnddate
									]
								})							
							]
						})			          
						
					],
					
					beginButton: new sap.m.Button({
						text: 'OK',
						press: function () {
							var oStartDate = sap.ui.getCore().byId('SartDate').getDateValue();
							var oEndDate = sap.ui.getCore().byId('EndDate').getDateValue();
							//sap.m.MessageToast.show('Note is: ' + oStartDate + oEndDate);
							
							
							dialog.close();
							//mytimesheetproto.util.Formatter.CopyTimesheet(oStartDate,oEndDate);
							mytimesheetproto.util.Formatter.CopyTimesheet.call(that,oStartDate,oEndDate);
						}
					}),
					endButton: new sap.m.Button({
						text: 'Cancel',
						press: function () {
							dialog.close();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					} 
				});
	 
				dialog.open();
			},
			
		handleSearch: function (oEvent){
			var sValue = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
		
		approveInfo: function (oEvent) {
		    if (!this._oDialog_apv) {
		        this._oDialog_apv = sap.ui.xmlfragment("mytimesheetproto.view.Search", this);
		        this._oDialog_apv.setModel(this.getView().getModel("i18n"), "i18n");
		      }
		    
		    var resourcesBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
		    resourcesBundle.getText("endDate");
		    
			this.getView().getModel().setData({
				Persons: [
				          {
				        	  Name: resourcesBundle.getText("Data_Name1"),
					         Org: resourcesBundle.getText("Data_OrgUnit"),
					        No: "90001001"
				          },
				          {
				        	  Name: resourcesBundle.getText("Data_Name4"),
						         Org: resourcesBundle.getText("Data_OrgUnit"),
						        No: "90001004"
				          }
				        ]
			}); 
			
		    this.getView().addDependent(this._oDialog_apv);
		    this._oDialog_apv.open();
		},		
//add by ren end		
		
		searchEmployee: function (oEvent) {
		    if (! this._oDialog) {
		        this._oDialog = sap.ui.xmlfragment("mytimesheetproto.view.Search", this);
		        this._oDialog.setModel(this.getView().getModel("i18n"), "i18n");
		      }
		    
		    var resourcesBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
		    resourcesBundle.getText("endDate");
		    
			this.getView().getModel().setData({
				Persons: [
				          {
				        	  Name: resourcesBundle.getText("Data_Name1"),
					         Org: resourcesBundle.getText("Data_OrgUnit"),
					        No: "90001001"
				          },
				          {
				        	  Name: resourcesBundle.getText("Data_Name2"),
						         Org: resourcesBundle.getText("Data_OrgUnit"),
						        No: "90001002"
				          },
				          {
				        	  Name: resourcesBundle.getText("Data_Name3"),
					         Org: resourcesBundle.getText("Data_OrgUnit"),
					        No: "90001003"
				          },
				          {
				        	  Name: resourcesBundle.getText("Data_Name4"),
					         Org: resourcesBundle.getText("Data_OrgUnit"),
					        No: "90001004"
				          }
				        ]
			}); 
			
		    this.getView().addDependent(this._oDialog);
		    this._oDialog.open();
		},
		
		serachhandleClose: function(oEvent) {
			oEvent.getSource().getBinding("items").filter([]);
		}
		
	});

	
});