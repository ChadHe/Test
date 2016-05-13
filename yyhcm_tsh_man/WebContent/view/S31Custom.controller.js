jQuery.sap.require("sap.ui.model.odata.datajs");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ca.ui.message.message");
jQuery.sap.require("sap.ui.base.EventProvider");
jQuery.sap.require("hcm.mytimesheet.utils.InitialConfigHelper");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("hcm.mytimesheet.yyhcm_tsh_man.utils.Formatter");
sap.ui.controller("hcm.mytimesheet.yyhcm_tsh_man.view.S31Custom", {
	onInit: function(){
		var oODataModel = new sap.ui.model.odata.ODataModel("proxy/sap/opu/odata/sap/yycats_srv/");
		this.getView().setModel(oODataModel,"WTAssign");
		this.getView().getModel("WTAssign").setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);

		var self = this;
		this.oRouter.attachRouteMatched(function(oEvent) {
			if (oEvent.getParameter("name") === "S31") {
				var oModelexch = this.oApplication.getModel("S31modelexch");
				if (oModelexch){
					var dSelectedDate = new Date(oModelexch.getProperty("/selectedDates")[0]);
					var sDateString = dSelectedDate.getFullYear()
									+ '-'
									+ (dSelectedDate.getMonth() + 1)
									+ '-'
									+ dSelectedDate.getDate()
									+ 'T00:00:00';
					var sDatePath = "WTAssign>/WorktimeAssignSet(datetime'" + sDateString + "')";
					this.getView().byId("worktimeAssignmentPanel").unbindElement("WTAssign");
					this.getView().byId("worktimeAssignmentPanel").bindElement(sDatePath);
				}
			}
		}, this);
	},

	onDone: function() {
		//ADD STARD CHAHE 2016/04/28
		var oFirstDate = new Date();
		oFirstDate.setDate(1);
		oFirstDate.setHours(0);
		oFirstDate.setMinutes(0);
		oFirstDate.setSeconds(0);
		oFirstDate.setMilliseconds(0);
		var aSelectedDates = this.getView().byId("weeklyCalendar").getSelectedDates();
		aSelectedDates.sort(function(a,b){
			var oDateA = new Date(a);
			var oDateB = new Date(b);
			if (oDateA.getFullYear() !== oDateB.getFullYear()){
				return oDateA.getFullYear() - oDateB.getFullYear();
			} else if (oDateA.getMonth() !== oDateB.getMonth()) {
				return oDateA.getMonth() - oDateB.getMonth();
			} else {
				return oDateA.getDate() - oDateB.getDate();
			}
		});
		var oSelectedDate = new Date(aSelectedDates[0]);
		oSelectedDate.setHours(0);
		oSelectedDate.setMinutes(0);
		oSelectedDate.setSeconds(0);
		oSelectedDate.setMilliseconds(0);
		
		if (oSelectedDate < oFirstDate){
			sap.m.MessageToast.show("You can't save. Because the date is cutoff.");
			return;
		}
		//ADD END   CHAHE 2016/04/28
		
		// clean in-line error message for the entry
		this.entry.showError = false;
		this.entry.error = "";

		this.resetMainAndChildItems();
		var mainItemFound = true;
		this.entry.notes = this.byId("S31TextArea").getValue();

		mainItemFound = false;
		// logic fetching data directly from input fields
		var inputList = this.byId("manualAccountingInfos")
			.getFormElements();
		var value;
		for (var j = 0; j < inputList.length; j++) {
			var key = inputList[j].getFields()[0].getName();
			//var value = inputList[j].getFields()[0].getValue() &&
			// inputList[j].getFields()[0].getValueStateText();
			if (inputList[j].getFields()[0].getValue().split('').indexOf('(') !== -1) {
				value = inputList[j].getFields()[0].getValueStateText();
			} else {
				value = inputList[j].getFields()[0].getValue();
			}
			if (!value) {
				value = inputList[j].getFields()[0]
					.getValue();
			}
			if (value) {
				if (!mainItemFound) {
					this.entry.mainItem = key;
					this.entry.mainName = key;
					this.entry.mainCode = value;
					mainItemFound = true;
				} else {
					if (!this.entry.childItems) {
						this.initializeChildItems();
						this.childItemsInitialized = true;
					}
					this.entry.childItems.push(key);
					this.entry.childNames.push(key);
					this.entry.childCodes.push(value);
				}
			}
		}

		if ("childItems" in this.entry) {
			if (this.entry.childItems.length > 1) {
				this.entry.subItems = this.entry.childItems
					.join(", ");
			} else if (this.entry.childItems.length === 1) {
				this.entry.subItems = this.entry.childItems[0];
			}
		}

		// Do something only if a mainItem exist.
		if (mainItemFound || this.worklistItemSelected) {
			this.onSubmit();
		} else {
			this.initializeChildItems();
		}
	},
	
	saveWorkAssign: function(){
		var oService = this.getView().getModel("WTAssign");
		var oModelexch = this.oApplication.getModel("S31modelexch");
		var dSelectedDate = new Date(oModelexch.getProperty("/selectedDates")[0]);
		var sDateString = dSelectedDate.getFullYear()
						+ '-'
						+ (dSelectedDate.getMonth() + 1)
						+ '-'
						+ dSelectedDate.getDate()
						+ 'T00:00:00';
		var sDatePath = "/WorktimeAssignSet(datetime'" + sDateString + "')";
		
		oService.update(sDatePath,{
			RangeStart: this.getView().byId("TR_TP1").getDateValue() == null?"PT00H00M00S":("PT" +
						this.getView().byId("TR_TP1").getDateValue().getHours() +
						"H" +
						this.getView().byId("TR_TP1").getDateValue().getMinutes() +
						"M" +
						this.getView().byId("TR_TP1").getDateValue().getSeconds() +
						"S"),
			RangeEnd:   this.getView().byId("TR_TP2").getDateValue() == null?"PT00H00M00S":(
						"PT" +
						this.getView().byId("TR_TP2").getDateValue().getHours() +
						"H" +
						this.getView().byId("TR_TP2").getDateValue().getMinutes() +
						"M" +
						this.getView().byId("TR_TP2").getDateValue().getSeconds() +
						"S"),
						
			Rest1Start: this.getView().byId("REST1_TP1").getDateValue() == null?"PT00H00M00S":(
						"PT" +
						this.getView().byId("REST1_TP1").getDateValue().getHours() +
						"H" +
						this.getView().byId("REST1_TP1").getDateValue().getMinutes() +
						"M" +
						this.getView().byId("REST1_TP1").getDateValue().getSeconds() +
						"S"),
			Rest1End:   this.getView().byId("REST1_TP2").getDateValue() == null?"PT00H00M00S":(
						"PT" +
						this.getView().byId("REST1_TP2").getDateValue().getHours() +
						"H" +
						this.getView().byId("REST1_TP2").getDateValue().getMinutes() +
						"M" +
						this.getView().byId("REST1_TP2").getDateValue().getSeconds() +
						"S"),
			Rest1Total: this.getView().byId("REST1_TL").getValue() == ""?"0":this.getView().byId("REST1_TL").getValue(),

			Rest2Start: this.getView().byId("REST2_TP1").getDateValue() == null?"PT00H00M00S":(
						"PT" +
						this.getView().byId("REST2_TP1").getDateValue().getHours() +
						"H" +
						this.getView().byId("REST2_TP1").getDateValue().getMinutes() +
						"M" +
						this.getView().byId("REST2_TP1").getDateValue().getSeconds() +
						"S"),
			Rest2End:   this.getView().byId("REST2_TP2").getDateValue() == null?"PT00H00M00S":(
						"PT" +
						this.getView().byId("REST2_TP2").getDateValue().getHours() +
						"H" +
						this.getView().byId("REST2_TP2").getDateValue().getMinutes() +
						"M" +
						this.getView().byId("REST2_TP2").getDateValue().getSeconds() +
						"S"),
			Rest2Total: this.getView().byId("REST2_TL").getValue() == ""?"0":this.getView().byId("REST2_TL").getValue(),

			Rest3Start: this.getView().byId("REST3_TP1").getDateValue() == null?"PT00H00M00S":(
						"PT" +
						this.getView().byId("REST3_TP1").getDateValue().getHours() +
						"H" +
						this.getView().byId("REST3_TP1").getDateValue().getMinutes() +
						"M" +
						this.getView().byId("REST3_TP1").getDateValue().getSeconds() +
						"S"),
			Rest3End:   this.getView().byId("REST3_TP1").getDateValue() == null?"PT00H00M00S":(
						"PT" +
						this.getView().byId("REST3_TP2").getDateValue().getHours() +
						"H" +
						this.getView().byId("REST3_TP2").getDateValue().getMinutes() +
						"M" +
						this.getView().byId("REST3_TP2").getDateValue().getSeconds() +
						"S"),
			Rest3Total: this.getView().byId("REST3_TL").getValue() == ""?"0":this.getView().byId("REST3_TL").getValue(),
			OTReason: 	this.getView().byId("OTREASON").getValue()
		},{	
			success: function(){},
			error: function(){
				sap.m.MessageToast.show("Error! Maybe somedata non-integration!");
			}
		});
	},
	
	submitToOdata: function() {
		var self = this,
			calendarRef = this.byId('weeklyCalendar'),
			selectedDates = calendarRef.getSelectedDates(),
			oSettings, timeFormatterShort;
		this.errors = null;
		var confirmationDialog = null,
			i = 0,
			startTime, endTime, summaryHoursText, decimalTimeEntryValue, formattedDecimal, popupHeader, popupTitle;
		if (this.isClockEntry() && !this.clkTimeDurationFilled) { //Note: 2141131 clock time duration field
			startTime = this.byId("startTime").getDateValue();
			endTime = this.byId("endTime").getDateValue();
		} //Note:Begin 2141131 clock time duration field				  
		if (!this.isClockEntry() || this.clkTimeDurationFilled) {
			if (this.clkTimeDurationFilled) {
				decimalTimeEntryValue = this.getView().byId("ClkTimeDecimalTimeEntryValue").getValue();
			} else {
				decimalTimeEntryValue = this.getView().byId("decimalTimeEntryValue").getValue();
			} //Note:Begin 2141131 clock time duration 
			if (decimalTimeEntryValue.indexOf(",") > (-1)) {
				decimalTimeEntryValue = decimalTimeEntryValue.replace(",", ".");
			}
			decimalTimeEntryValue = parseFloat(decimalTimeEntryValue);
			decimalTimeEntryValue = decimalTimeEntryValue.toFixed(2);
			formattedDecimal = sap.ca.ui.model.format.NumberFormat.getInstance({
				style: 'standard'
			}).format(decimalTimeEntryValue);
			summaryHoursText = formattedDecimal;
		}
		if (!this.releaseAllowed) {
			popupHeader = this.oBundle
				.getText('DRAFT_CONFIRMATION_SUMMARY');
			popupTitle = this.oConfiguration
				.getText("DRAFT_CONFIRMATION");
		} else {
			popupHeader = this.oBundle.getText('SUBMISSION_CONFIRMATION_SUMMARY');
			popupTitle = this.oConfiguration.getText("SUBMISSION_CONFIRMATION");
		}

		timeFormatterShort = sap.ca.ui.model.format.DateFormat.getTimeInstance({
			style: "short"
		});
		if (this.isClockEntry() && !this.clkTimeDurationFilled) { //Note: 2141131 clock time duration field
			if (this.byId("startTime").getDisplayFormat() === "hh:mm a" || this.byId("startTime").getDisplayFormat() === "h:mm a") {
				startTime = this.formatAMPM(startTime);
				endTime = this.formatAMPM(endTime);
			} else {
				startTime = timeFormatterShort.format(startTime);
				endTime = timeFormatterShort.format(endTime);
			}

			oSettings = {
				question: popupHeader,
				additionalInformation: [
					{
						label: this.oBundle
							.getText('DELETE_CONFIRMATION_SUMMARY_ENTRIES'),
						text: selectedDates.length.toString()
},
					{
						label: this.oBundle
							.getText('START_TIME'),
						text: startTime

},
					{
						label: this.oBundle
							.getText('END_TIME'),
						text: endTime
}],
				showNote: false,
				title: popupTitle,
				confirmButtonLabel: this.oBundle.getText("OK")
			};

		} else {

			oSettings = {
				question: popupHeader,
				additionalInformation: [
					{
						label: this.oBundle
							.getText('DELETE_CONFIRMATION_SUMMARY_ENTRIES'),
						text: selectedDates.length.toString()
},
					{
						label: this.oBundle
							.getText('DURATION'),
						text: summaryHoursText
}],
				showNote: false,
				title: popupTitle,
				confirmButtonLabel: this.oBundle.getText("OK")
			};
		}

		this.openConfirmationPopup(
			oSettings,
			function(response) {

				var batchCreate = [],
					workdate = "";
				var operation = (self.oApplication.getModel("S31modelexch").getData().editentryview) ? "U" : "C";
				if (selectedDates.length !== 0) {

					for (i = 0; i < selectedDates.length; i++) {
						self.entry = self.replaceSpecialChar(self.entry);
						workdate = self.getDateTimeStr(new Date(selectedDates[i]));

						batchCreate
							.push(self
								.setPostObject(
									self.entry.counter,
									operation,
									workdate,
									self.entry.time,
									self.entry.mainName,
									self.entry.mainCode,
									self.entry.notes,
									self.entry.startTime,
									self.entry.endTime,
									self.entry.subItems,
									self.entry.childCodes,
									self.entry.childNames));

					}

				}
				if (batchCreate.length === 0) {
					//   sap.ui.getCore().lock();
					confirmationDialog.close();

				} else {

					self.oService
						.submitTimeEntry(
							self,
							batchCreate, [], [],
							function() {
								var toastMsg;
								if (!self.releaseAllowed) {
									toastMsg = self.oBundle
										.getText("DRAFT_SUCCESS");
								} else {
									toastMsg = self.oBundle.getText("SUBMIT_SUCCESS");
								}

								var calendar = self.byId("weeklyCalendar");
								var selectedDate = calendar.getCurrentDate();
								var dateStr = selectedDate;
								selectedDate = dateStr + "offset" + calendar.getFirstDayOffset();
								var oModel = new sap.ui.model.json.JSONModel();
								oModel.setProperty("/currentDate", new Date(dateStr));
								self.oApplication.setModel(oModel, "S3exchangeModel");
								delete self.entry;

								//ADD STARD CHAHE 2016/04/28
								self.saveWorkAssign();
								//ADD END   CHAHE 2016/04/28
								
								//navigate to S3
								self.cleanUpOnBack();
								self.oRouter.navTo("S3", {
									context: selectedDate
								}, true);
								sap.m.MessageToast.show(toastMsg);

							},
							function(hasError, errorDates) {
								var weeklyCal = self.byId("weeklyCalendar");
								weeklyCal.unselectAllDates();
								weeklyCal.toggleDatesSelection(errorDates, true);
							});
				}
			});

	},

	manualHelpChange: function(oEvent) {
		if (this.favoriteSelected) {
			this.byId("timeAssignment").setValue("");
		}
		oEvent.getSource().setValueStateText(
			oEvent.getSource().getValue());
		oEvent.getSource().setValue(
			oEvent.getSource().getValue());
		this.validateSaveBtnVisibility(oEvent);

		//ADD STARD CHAHE 2016/04/28
		/*if (oEvent.getSource().getProperty("name") === "LSTAR" && this.getView().byId("YYApprover") === null){
			var sTaskKey = oEvent.getSource().getValue();
			this.getView().getModel("WTAssign").read("/TaskInfoSet('" + sTaskKey +"')",
					{
						success: function(oData){
							this.byId("YYApprover");
						}
					});
		}*/
		//ADD End   CHAHE 2016/04/28
	},

	handleUploadPress: function(oEvent) {
		var reader = new FileReader();
		var file = oEvent.getParameter("files")[0];
		reader.readAsText(file);
		reader.onloadend = function(){
			sap.m.MessageBox.information(reader.result);
		}
	}
});