jQuery.sap.registerPreloadedModules({
"name":"hcm/mytimesheet/Component-preload",
"version":"2.0",
"modules":{
	"hcm/mytimesheet/Component.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.Component");
jQuery.sap.require("sap.ca.scfld.md.ComponentBase");

// extent of sap.ca.scfld.md.ComponentBase
sap.ca.scfld.md.ComponentBase.extend("hcm.mytimesheet.Component", {
	metadata : sap.ca.scfld.md.ComponentBase.createMetaData("FS", {
										"name" : "My Timesheet", 
										"version" : "1.7.24",
										"library" : "hcm.mytimesheet",
										"includes" : [],
										"dependencies" : {
											"libs" : [ "sap.m", "sap.me" ],
											"components" : []
										},
										"config" : {
											"titleResource" : "TIMESHEET_TITLE",
											"resourceBundle" : "i18n/i18n.properties",
											"icon" : "sap-icon://Fiori2/F0397",
											"favIcon" : "./resources/sap/ca/ui/themes/base/img/favicon/My_Timesheet.ico",
											"homeScreenIconPhone" : "./resources/sap/ca/ui/themes/base/img/launchicon/My_Timesheet/57_iPhone_Desktop_Launch.png",
											"homeScreenIconPhone@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/My_Timesheet/114_iPhone-Retina_Web_Clip.png",
											"homeScreenIconTablet" : "./resources/sap/ca/ui/themes/base/img/launchicon/My_Timesheet/72_iPad_Desktop_Launch.png",
											"homeScreenIconTablet@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/My_Timesheet/144_iPad_Retina_Web_Clip.png"
										},
										viewPath : "hcm.mytimesheet.view",
										fullScreenPageRoutes : {
											
											"S3" : {
												"pattern" : "",
												"view" : "S3"
											},
											"S31" : {
												"pattern" : "detail/{context}",
												"view" : "S31"
											}
										}

									}),	

	/**
	 * Initialize the application
	 * 
	 * @returns {sap.ui.core.Control} the content
	 */
	createContent : function() {
		var oViewData = {component: this};
		return sap.ui.view({
			viewName : "hcm.mytimesheet.Main",
			type : sap.ui.core.mvc.ViewType.XML,
			viewData : oViewData
		});
	}
});
},
	"hcm/mytimesheet/Configuration.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");
jQuery.sap.require("sap.ca.scfld.md.app.Application");

sap.ca.scfld.md.ConfigurationBase.extend("hcm.mytimesheet.Configuration", {

	oServiceParams: {
		serviceList: [
			{
			    name: "HCM_TIMESHEET_MAN_SRV",
                masterCollection: "Favorites",
                serviceUrl: "/sap/opu/odata/sap/HCM_TIMESHEET_MAN_SRV/",
                isDefault: true,
                mockedDataSource: "/hcm.emp.mytimesheet/model/metadata.xml"}
		]
	},

	getServiceParams: function () {
		return this.oServiceParams;
	},

	getAppConfig: function() {
		return this.oAppConfig;
	},

	getServiceList: function () {
		return this.oServiceParams.serviceList;
	}

});
},
	"hcm/mytimesheet/Main.controller.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
sap.ui.controller("hcm.mytimesheet.Main", {

	onInit: function() {
		jQuery.sap.require("sap.ca.scfld.md.Startup");
		sap.ca.scfld.md.Startup.init("hcm.mytimesheet", this);
// 		var effectiveUrl = jQuery.sap.getModulePath("hcm.mytimesheet") + "/" + "css/mts.css";
// 		jQuery.sap.includeStyleSheet(effectiveUrl, "notes_css");
	},
	onExit: function() {
		try {
			jQuery.sap.require("hcm.mytimesheet.utils.ConcurrentEmployment");
			var x = hcm.mytimesheet.utils.ConcurrentEmployment.getControllerInstance();
			x.oCEDialog.Cancelled = true;
			x.oCEDialog.close();
			x.oApplication.pernr = "";
		} catch (e) {
			jQuery.sap.log.error("couldn't execute onExit", ["onExit failed in main controller"], ["hcm.mytimesheet.Main"]);
		}
	}
});
},
	"hcm/mytimesheet/Main.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<core:View xmlns:core="sap.ui.core"\n           xmlns="sap.m" controllerName="hcm.mytimesheet.Main"  displayBlock="true" height="100%">\n        <App id="fioriContent" showHeader="false">\n        </App>\n</core:View>',
	"hcm/mytimesheet/i18n/i18n.properties":'# My Timesheet V2\n# __ldi.translation.uuid=98558aa0-590c-11e4-8ed6-0800200c9a66\n\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Choose a Personnel Assignment\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Personnel Assignments\n\n#XFLD: label for from time\nFROM=from\n\n#XFLD: label for to time\nTO=to\n\n#XBUT: Button to cancel\nCANCEL=Cancel\n\n#XBUT: Button to close popover\nCLOSE=Close\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=YES\n\n#XBUT: Button to decline\nNO=NO\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Save Draft\n\n# XTIT: \nTIMESHEET_TITLE=My Timesheet\n\n#XTIT:\nINTERNAL_ERROR = Internal Error\n\n#XTIT:\nERROR = Error\n\n#XFLD:\nINTERNAL_ERROR_BODY = There is an Internal error in the application related to the error handling\n\n# XTIT:\nFAV_DIALOG_BOX=Delete Favorites\n\n# XTIT: \nTIMESHEET=Timesheet Entries\n\n#XBUT: Button for quick entry\nQUICK_FILL=Quick Entry\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Apply To\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Details\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Create Time Entry\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Create Entry for {0} days\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Entry Details\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Entry Details for {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Create Entry for {0}\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=May\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Aug\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Oct\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dec\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=January\n# XTIT: Month title for calendar\nMONTH_FULL_1=February\n# XTIT: Month title for calendar\nMONTH_FULL_2=March\n# XTIT: Month title for calendar\nMONTH_FULL_3=April\n# XTIT: Month title for calendar\nMONTH_FULL_4=May\n# XTIT: Month title for calendar\nMONTH_FULL_5=June\n# XTIT: Month title for calendar\nMONTH_FULL_6=July\n# XTIT: Month title for calendar\nMONTH_FULL_7=August\n# XTIT: Month title for calendar\nMONTH_FULL_8=September\n# XTIT: Month title for calendar\nMONTH_FULL_9=October\n# XTIT: Month title for calendar\nMONTH_FULL_10=November\n# XTIT: Month title for calendar\nMONTH_FULL_11=December\n\n# XTIT: Legend missing day\nMISSING_DAY=Action Required\n# XTIT: Legend filled day\nFILLED_DAY=Done\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Approver Action Needed\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Rejected\n# XFLD: Legend future working day\nWORKING_DAY=Working day\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Non-working day\n# XFLD: Legend selected working day\nSELECTED_DAY=Selected day\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Selected Non-working day\n# XFLD: Legend current day\nCURRENT_DAY=Current day\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Total Missing Hours: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} hours)\n\n#XBUT: Button\nSAVE=Save\n\n#XBUT: Button \nSUBMIT=Submit\n\n# XMSG\nFILL_ALL=Enter {0} hours for:\n\n#XFLD\nNO_TASK_TYPE=No Task Type\n\n#XFLD\nMISSING_DAYS=Missing Days:{0}\n\n#XBUT: Button\nHOME=Home\n\n#XTIT: confirmation header\nCONFIRMATION=Confirmation\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Confirm Deletion\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Confirm Submission\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Confirm Draft\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Summary of time entries selected for Deletion\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Summary of time entries selected for Submission\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Summary of time entries selected\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Number of Entries\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Number of Hours\n\n#XBUT: Confirm Button\nCONFIRM=Confirm\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} Hour\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} Hours\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} hour / {1} hours\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} Hours / {1} Hours\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Target: {0} Hours \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} Time Assignments\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 Time Assignment\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=No Assignments\n\n#XMSG: No Recordings\nNO_RECORDING=No Recordings\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} Hours Approved\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Save with time\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Save without time\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Delete Favorites\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Save as Favorite\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Manage favorites\n\n#XFLD: Week \nWEEK=Week\n\n#XFLD:\nMEET_TARGET_HOURS=Apply hours to:\n\n#XBUT\nALL_MISSING=All Missing Time ({0} hours)\n\n#XBUT: Delete Button Text\nDELETE=Delete\n\n#XBUT: Copy Button Text\nCOPY=Copy\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Add Entry\n\n#XFLD: label for duration\nDURATION=Duration\n\n#XFLD: label for total duration\nTOTAL_DURATION=Total Duration\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Start Time\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Favorite Name\n\n#XFLD: label for end Time\nEND_TIME=End Time\n\n#XFLD: label for note\nNOTE=Note\n\n#XBUT: Done button\nDONE=Done\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manual\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Edit Entry\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Time Assignment\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Select Favorite / Worklist\n\n# XTIT: select worklist\nSELECT_WORKLIST=Select Worklist\n\n# XTIT: Favorite\nFAVORITE=Favorites\n\n# XTIT: Worklist\nWORKLIST=Worklist\n\n# XTIT: Add Favorite\nADD_FAVORITE=Add Favorite\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Edit Favorites\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Load More\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Loading...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Continue Search on Server...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Loading...\n\n#XFLD: BLANK\nEMPTY=Empty\n\n#XFLD: None\nNONE=None\n\n#XFLD\nNO_WORKLIST = No worklist available\n\n#XFLD\nNO_FAVORITE = No favorites available\n\n# XTIT: Select\nSELECT=Select {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Select\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Search...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=hours\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=minutes\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=MMM DD, YYYY\n\n#XBUT:\nDETAIL=Detail\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Settings\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Any unsaved data will be discarded. Are you sure you want to proceed?\n\n# XTIT: \nUNSAVED_CHANGES=Unsaved Changes\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Request Submitted\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Please enter a favorite name\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Please enter some fields to store as your favorite\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Please enter a valid Duration\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Please enter valid Start and End Time\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Draft Saved Successfully\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favorite Created\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favorite Updated\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favorite Deleted\n\n#XBUT:\nHELP=Help\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} hours entered for this week.\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Turn ON Pre-Fill to quickly populate hours for the week based on your last successful entry.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Some entries are incorrect. Review error details and correct entries.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Time Entry for {0} and {1} more day(s)\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Edit Time Entry\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Time entry for {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0}hours {1}minutes\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0}h {1}m\n\n#XBUT: Button to reset\nRESET=Reset\n\n#XBUT: Button to update\nUPDATE=Update\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Add Favorite\n\n#XBUT: Button to create\nCREATE=Create\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME= Existing Favorite Name\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME = New Favorite Name\n\n#XTIT: time\nTIME = Time',
	"hcm/mytimesheet/i18n/i18n_ar.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=\\u0645\\u0646\r\n\r\n#XFLD: label for to time\r\nTO=\\u0625\\u0644\\u0649\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=\\u0625\\u0644\\u063A\\u0627\\u0621\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=\\u0625\\u063A\\u0644\\u0627\\u0642\r\n\r\n#XBUT: Button to accept\r\nOK=\\u0645\\u0648\\u0627\\u0641\\u0642\r\n\r\n#XBUT: Button to affirm\r\nYES=\\u0646\\u0639\\u0645\r\n\r\n#XBUT: Button to decline\r\nNO=\\u0644\\u0627\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=\\u062D\\u0641\\u0638 \\u0627\\u0644\\u0645\\u0633\\u0648\\u062F\\u0629\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=\\u0633\\u062C\\u0644 \\u0627\\u0644\\u062D\\u0636\\u0648\\u0631 \\u0627\\u0644\\u062E\\u0627\\u0635 \\u0628\\u064A\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=\\u062E\\u0637\\u0623 \\u062F\\u0627\\u062E\\u0644\\u064A\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=\\u062D\\u062F\\u062B \\u062E\\u0637\\u0623 \\u062F\\u0627\\u062E\\u0644\\u064A \\u0645\\u0631\\u062A\\u0628\\u0637 \\u0628\\u0645\\u0639\\u0627\\u0644\\u062C\\u0629 \\u0627\\u0644\\u0623\\u062E\\u0637\\u0627\\u0621 \\u0641\\u064A \\u0627\\u0644\\u062A\\u0637\\u0628\\u064A\\u0642.\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=\\u062D\\u0630\\u0641 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\r\n\r\n# XTIT: \r\nTIMESHEET=\\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u0635\\u062D\\u064A\\u0641\\u0629 \\u0627\\u0644\\u062D\\u0636\\u0648\\u0631\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=\\u0625\\u062F\\u062E\\u0627\\u0644 \\u0633\\u0631\\u064A\\u0639\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=\\u062A\\u0637\\u0628\\u064A\\u0642 \\u0639\\u0644\\u0649\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=\\u0625\\u0646\\u0634\\u0627\\u0621 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0648\\u0642\\u062A\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=\\u0625\\u0646\\u0634\\u0627\\u0621 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0644\\u0639\\u062F\\u062F {0} \\u0645\\u0646 \\u0627\\u0644\\u0623\\u064A\\u0627\\u0645\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644 \\u0644\\u0639\\u062F\\u062F {0}\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=\\u0625\\u0646\\u0634\\u0627\\u0621 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0644\\u0639\\u062F\\u062F {0}\r\n\r\n# XTIT: Month short header\r\nMONTH_0=\\u064A\\u0646\\u0627\r\n# XTIT: Month short header\r\nMONTH_1=\\u0641\\u0628\\u0631\r\n# XTIT: Month short header\r\nMONTH_2=\\u0645\\u0627\\u0631\r\n# XTIT: Month short header\r\nMONTH_3=\\u0623\\u0628\\u0631\r\n# XTIT: Month short header\r\nMONTH_4=\\u0645\\u0627\\u064A\r\n# XTIT: Month short header\r\nMONTH_5=\\u064A\\u0648\\u0646\r\n# XTIT: Month short header\r\nMONTH_6=\\u064A\\u0648\\u0644\r\n# XTIT: Month short header\r\nMONTH_7=\\u0623\\u063A\\u0633\r\n# XTIT: Month short header\r\nMONTH_8=\\u0633\\u0628\\u062A\r\n# XTIT: Month short header\r\nMONTH_9=\\u0623\\u0643\\u062A\r\n# XTIT: Month short header\r\nMONTH_10=\\u0646\\u0648\\u0641\r\n# XTIT: Month short header\r\nMONTH_11=\\u062F\\u064A\\u0633\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=\\u064A\\u0646\\u0627\\u064A\\u0631\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=\\u0641\\u0628\\u0631\\u0627\\u064A\\u0631\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=\\u0645\\u0627\\u0631\\u0633\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=\\u0623\\u0628\\u0631\\u064A\\u0644\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=\\u0645\\u0627\\u064A\\u0648\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=\\u064A\\u0648\\u0646\\u064A\\u0648\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=\\u064A\\u0648\\u0644\\u064A\\u0648\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=\\u0623\\u063A\\u0633\\u0637\\u0633\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=\\u0633\\u0628\\u062A\\u0645\\u0628\\u0631\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=\\u0623\\u0643\\u062A\\u0648\\u0628\\u0631\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=\\u0646\\u0648\\u0641\\u0645\\u0628\\u0631\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=\\u062F\\u064A\\u0633\\u0645\\u0628\\u0631\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=\\u0627\\u0644\\u0625\\u062C\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0645\\u0637\\u0644\\u0648\\u0628\r\n# XTIT: Legend filled day\r\nFILLED_DAY=\\u062A\\u0645\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=\\u0625\\u062C\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0645\\u0639\\u062A\\u0645\\u0650\\u062F \\u0645\\u0637\\u0644\\u0648\\u0628\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=\\u0645\\u0631\\u0641\\u0648\\u0636\r\n# XFLD: Legend future working day\r\nWORKING_DAY=\\u064A\\u0648\\u0645 \\u0639\\u0645\\u0644\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=\\u064A\\u0648\\u0645 \\u0639\\u0637\\u0644\\u0629\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=\\u0627\\u0644\\u064A\\u0648\\u0645 \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=\\u064A\\u0648\\u0645 \\u0627\\u0644\\u0639\\u0637\\u0644\\u0629 \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\r\n# XFLD: Legend current day\r\nCURRENT_DAY=\\u0627\\u0644\\u064A\\u0648\\u0645 \\u0627\\u0644\\u062D\\u0627\\u0644\\u064A\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=\\u0625\\u062C\\u0645\\u0627\\u0644\\u064A \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A \\u0627\\u0644\\u0645\\u0641\\u0642\\u0648\\u062F\\u0629\\: {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1} ({2} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A)\r\n\r\n#XBUT: Button\r\nSAVE=\\u062D\\u0641\\u0638\r\n\r\n#XBUT: Button \r\nSUBMIT=\\u062A\\u0642\\u062F\\u064A\\u0645\r\n\r\n# XMSG\r\nFILL_ALL=\\u0623\\u062F\\u062E\\u0644 {0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A \\u0644\\u0640\\:\r\n\r\n#XFLD\r\nNO_TASK_TYPE=\\u0628\\u062F\\u0648\\u0646 \\u0646\\u0648\\u0639 \\u0645\\u0647\\u0645\\u0629\r\n\r\n#XFLD\r\nMISSING_DAYS=\\u0627\\u0644\\u0623\\u064A\\u0627\\u0645 \\u0627\\u0644\\u0645\\u0641\\u0642\\u0648\\u062F\\u0629\\: {0}\r\n\r\n#XBUT: Button\r\nHOME=\\u0627\\u0644\\u0635\\u0641\\u062D\\u0629 \\u0627\\u0644\\u0631\\u0626\\u064A\\u0633\\u064A\\u0629\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=\\u062A\\u0623\\u0643\\u064A\\u062F\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=\\u062A\\u0623\\u0643\\u064A\\u062F \\u0627\\u0644\\u062D\\u0630\\u0641\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=\\u062A\\u0623\\u0643\\u064A\\u062F \\u0627\\u0644\\u0625\\u0631\\u0633\\u0627\\u0644\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=\\u062A\\u0623\\u0643\\u064A\\u062F \\u0627\\u0644\\u0645\\u0633\\u0648\\u062F\\u0629\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=\\u0645\\u0644\\u062E\\u0635 \\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u0627\\u0644\\u0648\\u0642\\u062A \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\\u0629 \\u0644\\u0644\\u062D\\u0630\\u0641\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=\\u0645\\u0644\\u062E\\u0635 \\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u0627\\u0644\\u0648\\u0642\\u062A \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\\u0629 \\u0644\\u0644\\u0625\\u0631\\u0633\\u0627\\u0644\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=\\u0645\\u0644\\u062E\\u0635 \\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u0627\\u0644\\u0648\\u0642\\u062A \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\\u0629\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u0639\\u062F\\u062F \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u0639\\u062F\\u062F \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=\\u062A\\u0623\\u0643\\u064A\\u062F\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR={0} \\u0633\\u0627\\u0639\\u0629\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR={0} \\u0633\\u0627\\u0639\\u0629 / {1} \\u0633\\u0627\\u0639\\u0627\\u062A\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} \\u0633\\u0627\\u0639\\u0627\\u062A / {1} \\u0633\\u0627\\u0639\\u0627\\u062A\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=\\u0627\\u0644\\u0645\\u0633\\u062A\\u0647\\u062F\\u0641\\: {0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS={0} \\u0645\\u0646 \\u062A\\u0639\\u064A\\u064A\\u0646\\u0627\\u062A \\u0627\\u0644\\u0648\\u0642\\u062A\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=1 \\u062A\\u0639\\u064A\\u064A\\u0646 \\u0627\\u0644\\u0648\\u0642\\u062A\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=\\u0644\\u0627 \\u062A\\u0648\\u062C\\u062F \\u062A\\u0639\\u064A\\u064A\\u0646\\u0627\\u062A\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=\\u0644\\u0627 \\u064A\\u0648\\u062C\\u062F \\u062A\\u0633\\u062C\\u064A\\u0644\\u0627\\u062A\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS=\\u062A\\u0645 \\u0627\\u0639\\u062A\\u0645\\u0627\\u062F {0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=\\u062D\\u0641\\u0638 \\u0628\\u0627\\u0644\\u0648\\u0642\\u062A\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=\\u062D\\u0641\\u0638 \\u0628\\u062F\\u0648\\u0646 \\u0627\\u0644\\u0648\\u0642\\u062A\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=\\u062D\\u0630\\u0641 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=\\u062D\\u0641\\u0638 \\u0643\\u0645\\u0641\\u0636\\u0644\\u0629\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=\\u0625\\u062F\\u0627\\u0631\\u0629 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\r\n\r\n#XFLD: Week \r\nWEEK=\\u0627\\u0644\\u0623\\u0633\\u0628\\u0648\\u0639\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=\\u062A\\u0637\\u0628\\u064A\\u0642 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A \\u0639\\u0644\\u0649\\:\r\n\r\n#XBUT\r\nALL_MISSING=\\u0627\\u0644\\u0648\\u0642\\u062A \\u0627\\u0644\\u0645\\u0641\\u0642\\u0648\\u062F \\u0628\\u0627\\u0644\\u0643\\u0627\\u0645\\u0644 ({0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A)\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=\\u062D\\u0630\\u0641\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=\\u0646\\u0633\\u062E\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0625\\u062F\\u062E\\u0627\\u0644\r\n\r\n#XFLD: label for duration\r\nDURATION=\\u0627\\u0644\\u0645\\u062F\\u0629\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=\\u0625\\u062C\\u0645\\u0627\\u0644\\u064A \\u0627\\u0644\\u0645\\u062F\\u0629\r\n\r\n#XFLD: label for status\r\nSTATUS=\\u0627\\u0644\\u062D\\u0627\\u0644\\u0629\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=\\u0648\\u0642\\u062A \\u0627\\u0644\\u0628\\u062F\\u0621\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=\\u0627\\u0633\\u0645 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=\\u0648\\u0642\\u062A \\u0627\\u0644\\u0627\\u0646\\u062A\\u0647\\u0627\\u0621\r\n\r\n#XFLD: label for note\r\nNOTE=\\u0645\\u0644\\u0627\\u062D\\u0638\\u0629\r\n\r\n#XBUT: Done button\r\nDONE=\\u062A\\u0645\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=\\u064A\\u062F\\u0648\\u064A\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=\\u062A\\u062D\\u0631\\u064A\\u0631 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=\\u062A\\u0639\\u064A\\u064A\\u0646 \\u0627\\u0644\\u0648\\u0642\\u062A\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=\\u062A\\u062D\\u062F\\u064A\\u062F \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629 \\u0623\\u0648 \\u0642\\u0627\\u0626\\u0645\\u0629 \\u0627\\u0644\\u0639\\u0645\\u0644\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=\\u062A\\u062D\\u062F\\u064A\\u062F \\u0642\\u0627\\u0626\\u0645\\u0629 \\u0627\\u0644\\u0639\\u0645\\u0644\r\n\r\n# XTIT: Favorite\r\nFAVORITE=\\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\r\n\r\n# XTIT: Worklist\r\nWORKLIST=\\u0642\\u0627\\u0626\\u0645\\u0629 \\u0627\\u0644\\u0639\\u0645\\u0644\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0645\\u0641\\u0636\\u0644\\u0629\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=\\u062A\\u062D\\u0631\\u064A\\u0631 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=\\u062A\\u062D\\u0645\\u064A\\u0644 \\u0627\\u0644\\u0645\\u0632\\u064A\\u062F...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=\\u062C\\u0627\\u0631\\u064D \\u0627\\u0644\\u062A\\u062D\\u0645\\u064A\\u0644 ...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629 \\u0627\\u0644\\u0628\\u062D\\u062B \\u0641\\u064A \\u0627\\u0644\\u062E\\u0627\\u062F\\u0645...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u062C\\u0627\\u0631\\u064D \\u0627\\u0644\\u062A\\u062D\\u0645\\u064A\\u0644 ...\r\n\r\n#XFLD: BLANK\r\nEMPTY=\\u0641\\u0627\\u0631\\u063A\r\n\r\n#XFLD: None\r\nNONE=\\u0644\\u0627 \\u0634\\u064A\\u0621\r\n\r\n#XFLD\r\nNO_WORKLIST=\\u0628\\u062F\\u0648\\u0646 \\u0642\\u0627\\u0626\\u0645\\u0629 \\u0639\\u0645\\u0644 \\u0645\\u062A\\u0648\\u0641\\u0631\\u0629\r\n\r\n#XFLD\r\nNO_FAVORITE=\\u0644\\u0627 \\u062A\\u062A\\u0648\\u0641\\u0631 \\u0645\\u0641\\u0636\\u0644\\u0629\r\n\r\n# XTIT: Select\r\nSELECT=\\u062D\\u062F\\u062F {0}\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=\\u062A\\u062D\\u062F\\u064A\\u062F\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=\\u0628\\u062D\\u062B...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=\\u0633\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=\\u062F\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=\\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=\\u062F\\u0642\\u0627\\u0626\\u0642\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=MMM DD, YYYY\r\n\r\n#XBUT:\r\nDETAIL=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=\\u0627\\u0644\\u0625\\u0639\\u062F\\u0627\\u062F\\u0627\\u062A\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=\\u0633\\u0648\\u0641 \\u064A\\u062A\\u0645 \\u062A\\u062C\\u0627\\u0647\\u0644 \\u0623\\u064A\\u0629 \\u0628\\u064A\\u0627\\u0646\\u0627\\u062A \\u0644\\u0645 \\u064A\\u062A\\u0645 \\u062D\\u0641\\u0638\\u0647\\u0627. \\u0647\\u0644 \\u062A\\u0631\\u064A\\u062F \\u0627\\u0644\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629 \\u0628\\u0627\\u0644\\u062A\\u0623\\u0643\\u064A\\u062F\\u061F\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=\\u062A\\u063A\\u064A\\u064A\\u0631\\u0627\\u062A \\u063A\\u064A\\u0631 \\u0645\\u062D\\u0641\\u0648\\u0638\\u0629\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=\\u062A\\u0645 \\u062A\\u0642\\u062F\\u064A\\u0645 \\u0627\\u0644\\u0637\\u0644\\u0628.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=\\u0627\\u0644\\u0631\\u062C\\u0627\\u0621 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0627\\u0633\\u0645 \\u0645\\u0641\\u0636\\u0644\\u0629 \\u0641\\u064A \\u062D\\u0642\\u0644 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644 "\\u062A\\u0639\\u064A\\u064A\\u0646 \\u0627\\u0644\\u0648\\u0642\\u062A".\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=\\u0627\\u062C\\u0639\\u0644 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u0644\\u0644\\u062A\\u062E\\u0632\\u064A\\u0646 \\u0643\\u0645\\u0641\\u0636\\u0644\\u0629 \\u0644\\u062F\\u064A\\u0643.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=\\u0627\\u0644\\u0631\\u062C\\u0627\\u0621 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0645\\u062F\\u0629 \\u0635\\u0627\\u0644\\u062D\\u0629.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=\\u0623\\u062F\\u062E\\u0644 \\u0648\\u0642\\u062A \\u0628\\u062F\\u0627\\u064A\\u0629 \\u0648\\u0627\\u0646\\u062A\\u0647\\u0627\\u0621 \\u0635\\u0627\\u0644\\u062D\\u064B\\u0627.\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=\\u062A\\u0645 \\u062D\\u0641\\u0638 \\u0627\\u0644\\u0645\\u0633\\u0648\\u062F\\u0629 \\u0628\\u0646\\u062C\\u0627\\u062D.\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=\\u062A\\u0645 \\u0625\\u0646\\u0634\\u0627\\u0621 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629.\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=\\u062A\\u0645 \\u062A\\u062D\\u062F\\u064A\\u062B \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629.\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=\\u062A\\u0645 \\u062D\\u0630\\u0641 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629.\r\n\r\n#XBUT:\r\nHELP=\\u0645\\u0633\\u0627\\u0639\\u062F\\u0629\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED=\\u062A\\u0645 \\u0625\\u062F\\u062E\\u0627\\u0644 {0}/{1} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A \\u0644\\u0647\\u0630\\u0627 \\u0627\\u0644\\u0623\\u0633\\u0628\\u0648\\u0639.\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=\\u0642\\u0645 \\u0628\\u062A\\u0634\\u063A\\u064A\\u0644 \\u0645\\u064A\\u0632\\u0629 \\u0627\\u0644\\u0645\\u0644\\u0621 \\u0627\\u0644\\u0645\\u0633\\u0628\\u0642 \\u0644\\u062A\\u0648\\u0632\\u064A\\u0639 \\u0633\\u0627\\u0639\\u0627\\u062A \\u0627\\u0644\\u0623\\u0633\\u0628\\u0648\\u0639 \\u0628\\u0633\\u0631\\u0639\\u0629 \\u0627\\u0633\\u062A\\u0646\\u0627\\u062F\\u064B\\u0627 \\u0625\\u0644\\u0649 \\u0622\\u062E\\u0631 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0646\\u0627\\u062C\\u062D.\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=\\u0628\\u0639\\u0636 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u063A\\u064A\\u0631 \\u0635\\u062D\\u064A\\u062D\\u0629. \\u0628\\u0631\\u062C\\u0627\\u0621 \\u0645\\u0631\\u0627\\u062C\\u0639\\u0629 \\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0627\\u0644\\u0623\\u062E\\u0637\\u0627\\u0621 \\u0648\\u0642\\u0645 \\u0628\\u062A\\u0635\\u062D\\u064A\\u062D \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A.\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT=\\u0625\\u062F\\u062E\\u0627\\u0644 \\u0627\\u0644\\u0648\\u0642\\u062A \\u0644\\u0639\\u062F\\u062F {0} \\u0648{1} \\u0645\\u0646 \\u0627\\u0644\\u0623\\u064A\\u0627\\u0645 \\u0627\\u0644\\u0623\\u062E\\u0631\\u0649\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u062A\\u062D\\u0631\\u064A\\u0631 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0627\\u0644\\u0648\\u0642\\u062A\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE=\\u0625\\u062F\\u062E\\u0627\\u0644 \\u0627\\u0644\\u0648\\u0642\\u062A \\u0644\\u0639\\u062F\\u062F {0}\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A {1} \\u0645\\u0646 \\u0627\\u0644\\u062F\\u0642\\u0627\\u0626\\u0642\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} \\u0633{1} \\u062F\r\n\r\n#XBUT: Button to reset\r\nRESET=\\u0625\\u0639\\u0627\\u062F\\u0629 \\u062A\\u0639\\u064A\\u064A\\u0646\r\n\r\n#XBUT: Button to update\r\nUPDATE=\\u062A\\u062D\\u062F\\u064A\\u062B\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0645\\u0641\\u0636\\u0644\\u0629\r\n\r\n#XBUT: Button to create\r\nCREATE=\\u0625\\u0646\\u0634\\u0627\\u0621\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=\\u0627\\u0633\\u0645 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629 \\u0627\\u0644\\u062D\\u0627\\u0644\\u064A\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=\\u0627\\u0633\\u0645 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629 \\u0627\\u0644\\u062C\\u062F\\u064A\\u062F\r\n\r\n#XTIT: time\r\nTIME=\\u0627\\u0644\\u0648\\u0642\\u062A\r\n',
	"hcm/mytimesheet/i18n/i18n_cs.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=Od\r\n\r\n#XFLD: label for to time\r\nTO=Do\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=Zru\\u0161it\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=Zav\\u0159\\u00EDt\r\n\r\n#XBUT: Button to accept\r\nOK=OK\r\n\r\n#XBUT: Button to affirm\r\nYES=Ano\r\n\r\n#XBUT: Button to decline\r\nNO=Ne\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=Ulo\\u017Eit n\\u00E1vrh\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=Moje evidence \\u010Dasu\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=Intern\\u00ED chyba\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=V aplikaci do\\u0161lo k intern\\u00ED chyb\\u011B souvisej\\u00EDc\\u00ED se zpracov\\u00E1n\\u00EDm chyby.\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=Vymazat obl\\u00EDben\\u00E9\r\n\r\n# XTIT: \r\nTIMESHEET=Z\\u00E1znamy evidence \\u010Dasu\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=Rychl\\u00FD z\\u00E1znam\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=Pou\\u017E\\u00EDt na\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=Detaily\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=Vytvo\\u0159it \\u010Dasov\\u00FD z\\u00E1znam\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=Vytvo\\u0159it z\\u00E1znam pro {0} dn\\u00ED\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=Detaily z\\u00E1znamu\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE=Detaily z\\u00E1znamu pro {0}\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=Vytvo\\u0159it z\\u00E1znam pro {0}\r\n\r\n# XTIT: Month short header\r\nMONTH_0=Led\r\n# XTIT: Month short header\r\nMONTH_1=\\u00DAno\r\n# XTIT: Month short header\r\nMONTH_2=B\\u0159e\r\n# XTIT: Month short header\r\nMONTH_3=Dub\r\n# XTIT: Month short header\r\nMONTH_4=Kv\\u011B\r\n# XTIT: Month short header\r\nMONTH_5=\\u010Cer\r\n# XTIT: Month short header\r\nMONTH_6=\\u010Cvc\r\n# XTIT: Month short header\r\nMONTH_7=Srp\r\n# XTIT: Month short header\r\nMONTH_8=Z\\u00E1\\u0159\r\n# XTIT: Month short header\r\nMONTH_9=\\u0158\\u00EDj\r\n# XTIT: Month short header\r\nMONTH_10=Lis\r\n# XTIT: Month short header\r\nMONTH_11=Pro\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=Leden\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=\\u00DAnor\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=B\\u0159ezen\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=Duben\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=Kv\\u011Bten\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=\\u010Cerven\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=\\u010Cervenec\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=Srpen\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=Z\\u00E1\\u0159\\u00ED\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=\\u0158\\u00EDjen\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=Listopad\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=Prosinec\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=Vy\\u017Eadov\\u00E1na akce\r\n# XTIT: Legend filled day\r\nFILLED_DAY=Hotovo\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=Je po\\u017Eadov\\u00E1na akce schvalovatele\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=Zam\\u00EDtnuto\r\n# XFLD: Legend future working day\r\nWORKING_DAY=Pracovn\\u00ED den\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=Nepracovn\\u00ED den\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=Vybran\\u00FD den\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=Vybran\\u00FD nepracovn\\u00ED den\r\n# XFLD: Legend current day\r\nCURRENT_DAY=Aktu\\u00E1ln\\u00ED den\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=Celkem chyb\\u00ED hodin\\: {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1} ({2} hodin)\r\n\r\n#XBUT: Button\r\nSAVE=Ulo\\u017Eit\r\n\r\n#XBUT: Button \r\nSUBMIT=Odeslat\r\n\r\n# XMSG\r\nFILL_ALL=Zadat {0} hodin pro\\:\r\n\r\n#XFLD\r\nNO_TASK_TYPE=\\u017D\\u00E1dn\\u00FD typ \\u00FAlohy\r\n\r\n#XFLD\r\nMISSING_DAYS=Chyb\\u011Bj\\u00EDc\\u00ED dny\\:  {0}\r\n\r\n#XBUT: Button\r\nHOME=Dom\\u016F\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=Potvrzen\\u00ED\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=Potvrdit vymaz\\u00E1n\\u00ED\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=Potvrdit odesl\\u00E1n\\u00ED\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=Potvrdit n\\u00E1vrh\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=Souhrn \\u010Dasov\\u00FDch z\\u00E1znam\\u016F k vymaz\\u00E1n\\u00ED\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=Souhrn \\u010Dasov\\u00FDch z\\u00E1znam\\u016F vybran\\u00FDch k odesl\\u00E1n\\u00ED\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=Souhrn vybran\\u00FDch \\u010Dasov\\u00FDch z\\u00E1znam\\u016F\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Po\\u010Det z\\u00E1znam\\u016F\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=Po\\u010Det hodin\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=Potvrdit\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR={0} hodina\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} hodin\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR={0} hodina / {1} hodiny \r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} hodin / {1} hodin\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=C\\u00EDl\\: {0} hodin \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS=P\\u0159i\\u0159azen\\u00ED \\u010Dasu\\: {0} \r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=Jednor\\u00E1zov\\u00E9 p\\u0159i\\u0159azen\\u00ED\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=\\u017D\\u00E1dn\\u00E9 p\\u0159i\\u0159azen\\u00ED\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=\\u017D\\u00E1dn\\u00E9 z\\u00E1znamy\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS=Schv\\u00E1len\\u00E9 hodiny\\: {0} \r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=Ulo\\u017Eit s \\u010Dasem\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=Ulo\\u017Eit bez \\u010Dasu\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=Vymazat obl\\u00EDben\\u00E9\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=Ulo\\u017Eit jako obl\\u00EDben\\u00E9\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=Spr\\u00E1va obl\\u00EDben\\u00FDch\r\n\r\n#XFLD: Week \r\nWEEK=T\\u00FDden\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=Pou\\u017E\\u00EDt hodiny na\\:\r\n\r\n#XBUT\r\nALL_MISSING=Ve\\u0161ker\\u00FD chyb\\u011Bj\\u00EDc\\u00ED \\u010Das (hodin\\: {0})\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=Vymazat\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=Kop\\u00EDrov\\u00E1n\\u00ED\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=P\\u0159idat z\\u00E1znam\r\n\r\n#XFLD: label for duration\r\nDURATION=Trv\\u00E1n\\u00ED\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=Celkov\\u00E9 trv\\u00E1n\\u00ED\r\n\r\n#XFLD: label for status\r\nSTATUS=Status\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=Po\\u010D\\u00E1te\\u010Dn\\u00ED \\u010Das\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=N\\u00E1zev obl\\u00EDben\\u00E9 polo\\u017Eky\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=\\u010Cas ukon\\u010Den\\u00ED\r\n\r\n#XFLD: label for note\r\nNOTE=Pozn\\u00E1mka\r\n\r\n#XBUT: Done button\r\nDONE=Hotovo\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=Manu\\u00E1ln\\u011B\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=Upravit z\\u00E1znam\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=P\\u0159i\\u0159azen\\u00ED \\u010Dasu\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=Vybrat obl\\u00EDben\\u00E9 nebo z\\u00E1sobu pr\\u00E1ce\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=Vybrat z\\u00E1sobu pr\\u00E1ce\r\n\r\n# XTIT: Favorite\r\nFAVORITE=Obl\\u00EDben\\u00E9\r\n\r\n# XTIT: Worklist\r\nWORKLIST=Z\\u00E1soba pr\\u00E1ce\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=P\\u0159idat k obl\\u00EDben\\u00FDm\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=Upravit obl\\u00EDben\\u00E9\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=Na\\u010D\\u00EDst v\\u00EDce...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=Na\\u010D\\u00EDt\\u00E1n\\u00ED...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=Pokra\\u010Dovat v hled\\u00E1n\\u00ED na serveru...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=Na\\u010D\\u00EDt\\u00E1n\\u00ED...\r\n\r\n#XFLD: BLANK\r\nEMPTY=Pr\\u00E1zdn.\r\n\r\n#XFLD: None\r\nNONE=Nic\r\n\r\n#XFLD\r\nNO_WORKLIST=Z\\u00E1soba pr\\u00E1ce nen\\u00ED k dispozici\r\n\r\n#XFLD\r\nNO_FAVORITE=Nejsou k dispozici \\u017E\\u00E1dn\\u00E9 obl\\u00EDben\\u00E9 polo\\u017Eky\r\n\r\n# XTIT: Select\r\nSELECT=Vybrat {0}\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=Vybrat\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=Hled\\u00E1n\\u00ED...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=hod.\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=min.\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=Hodiny\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=Minuty\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=MMM DD, RRRR\r\n\r\n#XBUT:\r\nDETAIL=Detaily\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=Nastaven\\u00ED\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=V\\u0161echna neulo\\u017Een\\u00E1 data budou zru\\u0161ena. Chcete pokra\\u010Dovat?\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=Neulo\\u017Een\\u00E9 zm\\u011Bny\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=Po\\u017Eadavek byl odesl\\u00E1n.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=Zadejte n\\u00E1zev obl\\u00EDben\\u00E9 polo\\u017Eky do vstupn\\u00EDho pole p\\u0159i\\u0159azen\\u00ED \\u010Dasu.\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=Vypl\\u0148te z\\u00E1znamy k ulo\\u017Een\\u00ED mezi obl\\u00ED\\u017Een\\u00E9 polo\\u017Eky.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=Zadejte platn\\u00E9 trv\\u00E1n\\u00ED.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=Zadejte platn\\u00FD po\\u010D\\u00E1te\\u010Dn\\u00ED a koncov\\u00FD \\u010Das.\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=N\\u00E1vrh byl \\u00FAsp\\u011B\\u0161n\\u011B ulo\\u017Een.\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=Obl\\u00EDben\\u00E1 polo\\u017Eka byla vytvo\\u0159ena.\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=Obl\\u00EDben\\u00E1 polo\\u017Eka byla aktualizov\\u00E1na.\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=Obl\\u00EDben\\u00E1 polo\\u017Eka byla vymaz\\u00E1na.\r\n\r\n#XBUT:\r\nHELP=N\\u00E1pov\\u011Bda\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED={0}/{1} hodin zad\\u00E1no pro tento t\\u00FDden\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=Zapnout automatick\\u00E9 vypln\\u011Bn\\u00ED a rychle vyplnit hodiny pro dan\\u00FD t\\u00FDden na z\\u00E1klad\\u011B posledn\\u00EDho \\u00FAsp\\u011B\\u0161n\\u00E9ho z\\u00E1znamu.\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=N\\u011Bkter\\u00E9 z\\u00E1znamy nejsou spr\\u00E1vn\\u00E9. Zkontrolujte detaily chyby a opravte z\\u00E1znamy.\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT=Evidence \\u010Dasu pro {0} a {1} dal\\u0161\\u00EDch dn\\u00ED\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Upravit \\u010Dasov\\u00FD z\\u00E1znam\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE=\\u010Casov\\u00FD z\\u00E1znam pro {0}\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} hodin {1} minut\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} hod. {1} min.\r\n\r\n#XBUT: Button to reset\r\nRESET=Resetovat\r\n\r\n#XBUT: Button to update\r\nUPDATE=Aktualizovat\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=P\\u0159idat k obl\\u00EDben\\u00FDm\r\n\r\n#XBUT: Button to create\r\nCREATE=Vytvo\\u0159it\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=Aktu\\u00E1ln\\u00ED n\\u00E1zev obl\\u00EDben\\u00E9 polo\\u017Eky\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=Nov\\u00FD n\\u00E1zev obl\\u00EDben\\u00E9 polo\\u017Eky\r\n\r\n#XTIT: time\r\nTIME=\\u010Cas\r\n',
	"hcm/mytimesheet/i18n/i18n_de.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=Von\r\n\r\n#XFLD: label for to time\r\nTO=Bis\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=Abbrechen\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=Schlie\\u00DFen\r\n\r\n#XBUT: Button to accept\r\nOK=OK\r\n\r\n#XBUT: Button to affirm\r\nYES=Ja\r\n\r\n#XBUT: Button to decline\r\nNO=Nein\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=Entwurf sichern\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=Zeiterfassung\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=Interner Fehler\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=In der Anwendung ist bei der Fehlerbehandlung ein interner Fehler aufgetreten.\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=Favoriten l\\u00F6schen\r\n\r\n# XTIT: \r\nTIMESHEET=Arbeitszeiteintr\\u00E4ge\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=Schnellerfassung\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=Anwenden auf\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=Details\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=Zeiteintrag anlegen\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=Zeit f\\u00FCr {0} Tage erfassen\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=Details zum Eintrag\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE=Zeiterfassung \\u2013 Details f\\u00FCr {0}\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=Zeit f\\u00FCr {0} erfassen\r\n\r\n# XTIT: Month short header\r\nMONTH_0=Jan\r\n# XTIT: Month short header\r\nMONTH_1=Feb\r\n# XTIT: Month short header\r\nMONTH_2=M\\u00E4r\r\n# XTIT: Month short header\r\nMONTH_3=Apr\r\n# XTIT: Month short header\r\nMONTH_4=Mai\r\n# XTIT: Month short header\r\nMONTH_5=Jun\r\n# XTIT: Month short header\r\nMONTH_6=Jul\r\n# XTIT: Month short header\r\nMONTH_7=Aug\r\n# XTIT: Month short header\r\nMONTH_8=Sep\r\n# XTIT: Month short header\r\nMONTH_9=Okt\r\n# XTIT: Month short header\r\nMONTH_10=Nov\r\n# XTIT: Month short header\r\nMONTH_11=Dez\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=Januar\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=Februar\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=M\\u00E4rz\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=April\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=Mai\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=Juni\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=Juli\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=August\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=September\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=Oktober\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=November\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=Dezember\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=Aktion erforderlich\r\n# XTIT: Legend filled day\r\nFILLED_DAY=Fertig\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=Genehmigung ausstehend\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=Abgelehnt\r\n# XFLD: Legend future working day\r\nWORKING_DAY=Arbeitstag\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=Arbeitsfreier Tag\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=Ausgew\\u00E4hlter Tag\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=Ausgew\\u00E4hlter arbeitsfreier Tag\r\n# XFLD: Legend current day\r\nCURRENT_DAY=Aktueller Tag\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=Insgesamt fehlende Stunden\\: {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1} ({2} Stunden)\r\n\r\n#XBUT: Button\r\nSAVE=Sichern\r\n\r\n#XBUT: Button \r\nSUBMIT=Absenden\r\n\r\n# XMSG\r\nFILL_ALL={0} Stunden erfassen f\\u00FCr\\:\r\n\r\n#XFLD\r\nNO_TASK_TYPE=Kein Aufgabentyp\r\n\r\n#XFLD\r\nMISSING_DAYS=Fehlende Tage\\: {0}\r\n\r\n#XBUT: Button\r\nHOME=Startseite\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=Best\\u00E4tigung\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=L\\u00F6schen best\\u00E4tigen\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=Senden best\\u00E4tigen\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=Entwurf best\\u00E4tigen\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=\\u00DCbersicht \\u00FCber zum L\\u00F6schen ausgew\\u00E4hlte Zeiteintr\\u00E4ge\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=\\u00DCbersicht \\u00FCber zum Senden ausgew\\u00E4hlte Zeiteintr\\u00E4ge\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=\\u00DCbersicht \\u00FCber ausgew\\u00E4hlte Zeiteintr\\u00E4ge\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Anzahl der Eintr\\u00E4ge\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=Stundenanzahl\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=Best\\u00E4tigen\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR={0} Stunde\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} Stunden\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR={0} Stunde/{1} Stunden\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} Stunden/{1} Stunden\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=Soll\\: {0} Stunden \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS={0} Zeitzuordnungen\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=1 Zeitzuordnung\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=Keine Zuordnungen\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=Keine Datens\\u00E4tze\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS={0} Stunden genehmigt\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=Mit Zeit sichern\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=Ohne Zeit sichern\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=Favoriten l\\u00F6schen\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=Als Favorit sichern\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=Favoriten verwalten\r\n\r\n#XFLD: Week \r\nWEEK=Woche\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=Stunden anwenden auf\\:\r\n\r\n#XBUT\r\nALL_MISSING=Alle fehlenden Zeiten ({0} Stunden)\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=L\\u00F6schen\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=Kopieren\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=Eintrag hinzuf\\u00FCgen\r\n\r\n#XFLD: label for duration\r\nDURATION=Dauer\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=Gesamtdauer\r\n\r\n#XFLD: label for status\r\nSTATUS=Status\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=Beginn (Zeit)\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=Favoritenname\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=Ende (Zeit)\r\n\r\n#XFLD: label for note\r\nNOTE=Notiz\r\n\r\n#XBUT: Done button\r\nDONE=Fertig\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=Manuell\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=Eintrag bearbeiten\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=Zeitzuordnung\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=Favorit oder Arbeitsvorrat ausw\\u00E4hlen\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=Arbeitsvorrat ausw\\u00E4hlen\r\n\r\n# XTIT: Favorite\r\nFAVORITE=Favoriten\r\n\r\n# XTIT: Worklist\r\nWORKLIST=Arbeitsvorrat\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=Favorit hinzuf\\u00FCgen\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=Favoriten bearbeiten\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=Weitere laden ...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=Ladevorgang l\\u00E4uft ...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=Suche auf Server fortsetzen ...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=Ladevorgang l\\u00E4uft ...\r\n\r\n#XFLD: BLANK\r\nEMPTY=Leer\r\n\r\n#XFLD: None\r\nNONE=Keine\r\n\r\n#XFLD\r\nNO_WORKLIST=Kein Arbeitsvorrat verf\\u00FCgbar\r\n\r\n#XFLD\r\nNO_FAVORITE=Keine Favoriten verf\\u00FCgbar\r\n\r\n# XTIT: Select\r\nSELECT={0} ausw\\u00E4hlen\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=Ausw\\u00E4hlen\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=Suche ...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=Std.\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=Min.\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=Stunden\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=Minuten\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=DD. MMM YYYY\r\n\r\n#XBUT:\r\nDETAIL=Details\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=Einstellungen\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=Ungesicherte Daten gehen verloren. M\\u00F6chten Sie fortfahren?\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=Ungesicherte \\u00C4nderungen\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=Der Antrag wurde gesendet.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=Geben Sie im Bereich \'\'Zeitzuordnung\'\' einen Favoritennamen ein.\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=Nehmen Sie Eintr\\u00E4ge vor, die sie als Favoriten hinterlegen m\\u00F6chten.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=Geben Sie eine g\\u00FCltige Dauer an.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=Geben Sie einen g\\u00FCltigen Beginn und ein g\\u00FCltiges Ende an.\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=Der Entwurf wurde gesichert.\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=Der Favorit wurde angelegt.\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=Der Favorit wurde aktualisiert.\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=Der Favorit wurde gel\\u00F6scht.\r\n\r\n#XBUT:\r\nHELP=Hilfe\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED={0}/{1} Stunden f\\u00FCr diese Woche erfasst.\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=Um Wochenstunden auf Basis des zuletzt gemachten Eintrags automatisch zu erfassen, aktivieren Sie \'\'Vorbelegen\'\'.\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=Einige Eintr\\u00E4ge sind fehlerhaft. Pr\\u00FCfen Sie die Fehlerdetails, und korrigieren Sie die Eingaben.\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT=Zeiteintrag f\\u00FCr {0} und {1} weiteren Tag/weitere Tage\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Zeiteintrag bearbeiten\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE=Zeiteintrag f\\u00FCr {0}\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} Stunden {1} Minuten\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} Std. {1} Min.\r\n\r\n#XBUT: Button to reset\r\nRESET=Zur\\u00FCcksetzen\r\n\r\n#XBUT: Button to update\r\nUPDATE=Aktualisieren\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=Favorit hinzuf\\u00FCgen\r\n\r\n#XBUT: Button to create\r\nCREATE=Anlegen\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=Aktueller Favoritenname\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=Neuer Favoritenname\r\n\r\n#XTIT: time\r\nTIME=Zeit\r\n',
	"hcm/mytimesheet/i18n/i18n_en.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=From\r\n\r\n#XFLD: label for to time\r\nTO=To\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=Cancel\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=Close\r\n\r\n#XBUT: Button to accept\r\nOK=OK\r\n\r\n#XBUT: Button to affirm\r\nYES=Yes\r\n\r\n#XBUT: Button to decline\r\nNO=No\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=Save Draft\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=My Timesheet\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=Internal Error\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=An internal error related to the error handling has occured in the application.\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=Delete Favorites\r\n\r\n# XTIT: \r\nTIMESHEET=Timesheet Entries\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=Quick Entry\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=Apply To\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=Details\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=Create Time Entry\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=Create entry for {0} days\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=Entry Details\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE=Entry details for {0}\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=Create entry for {0}\r\n\r\n# XTIT: Month short header\r\nMONTH_0=Jan\r\n# XTIT: Month short header\r\nMONTH_1=Feb\r\n# XTIT: Month short header\r\nMONTH_2=Mar\r\n# XTIT: Month short header\r\nMONTH_3=Apr\r\n# XTIT: Month short header\r\nMONTH_4=May\r\n# XTIT: Month short header\r\nMONTH_5=Jun\r\n# XTIT: Month short header\r\nMONTH_6=Jul\r\n# XTIT: Month short header\r\nMONTH_7=Aug\r\n# XTIT: Month short header\r\nMONTH_8=Sep\r\n# XTIT: Month short header\r\nMONTH_9=Oct\r\n# XTIT: Month short header\r\nMONTH_10=Nov\r\n# XTIT: Month short header\r\nMONTH_11=Dec\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=January\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=February\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=March\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=April\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=May\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=June\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=July\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=August\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=September\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=October\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=November\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=December\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=Action Required\r\n# XTIT: Legend filled day\r\nFILLED_DAY=Done\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=Approver Action Needed\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=Rejected\r\n# XFLD: Legend future working day\r\nWORKING_DAY=Workday\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=Non-Working Day\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=Selected Day\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=Selected Non-Working Day\r\n# XFLD: Legend current day\r\nCURRENT_DAY=Current Day\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=Total missing hours\\: {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1} ({2} hours)\r\n\r\n#XBUT: Button\r\nSAVE=Save\r\n\r\n#XBUT: Button \r\nSUBMIT=Submit\r\n\r\n# XMSG\r\nFILL_ALL=Enter {0} hours for\\:\r\n\r\n#XFLD\r\nNO_TASK_TYPE=No Task Type\r\n\r\n#XFLD\r\nMISSING_DAYS=Missing days\\: {0}\r\n\r\n#XBUT: Button\r\nHOME=Home\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=Confirmation\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=Confirm Deletion\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=Confirm Submission\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=Confirm Draft\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=Summary of Time Entries Selected for Deletion\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=Summary of Time Entries Selected for Submission\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=Summary of Time Entries Selected\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Number of Entries\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=Number of Hours\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=Confirm\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR={0} Hour\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} hours\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR={0} hour / {1} hours\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} hours / {1} hours\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=Target\\: {0} hours \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS={0} time assignments\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=1 time assignment\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=No Assignments\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=No Records\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS={0} hours approved\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=Save With Time\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=Save Without Time\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=Delete Favorites\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=Save as Favorite\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=Manage Favorites\r\n\r\n#XFLD: Week \r\nWEEK=Week\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=Apply hours to\\:\r\n\r\n#XBUT\r\nALL_MISSING=All missing time ({0} hours)\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=Delete\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=Copy\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=Add Entry\r\n\r\n#XFLD: label for duration\r\nDURATION=Duration\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=Total Duration\r\n\r\n#XFLD: label for status\r\nSTATUS=Status\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=Start Time\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=Favorite Name\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=End Time\r\n\r\n#XFLD: label for note\r\nNOTE=Note\r\n\r\n#XBUT: Done button\r\nDONE=Done\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=Manual\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=Edit Entry\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=Time Assignment\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=Select Favorite or Worklist\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=Select Worklist\r\n\r\n# XTIT: Favorite\r\nFAVORITE=Favorites\r\n\r\n# XTIT: Worklist\r\nWORKLIST=Worklist\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=Add Favorite\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=Edit Favorites\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=Load More...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=Loading ...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=Continue Search on Server...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=Loading ...\r\n\r\n#XFLD: BLANK\r\nEMPTY=Empty\r\n\r\n#XFLD: None\r\nNONE=None\r\n\r\n#XFLD\r\nNO_WORKLIST=No Worklist Available\r\n\r\n#XFLD\r\nNO_FAVORITE=No Favorites Available\r\n\r\n# XTIT: Select\r\nSELECT=Select {0}\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=Select\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=Search...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=h\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=m\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=Hours\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=Minutes\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=MMM DD, YYYY\r\n\r\n#XBUT:\r\nDETAIL=Details\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=Settings\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=Any unsaved data will be discarded. Are you sure you want to proceed?\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=Unsaved Changes\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=Request was submitted.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=Please enter a favorite name in the Time Assignment input field.\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=Make entries to store as your favorite.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=Please enter a valid duration.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=Enter a valid start and end time.\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=Draft was saved successfully.\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=Favorite was created.\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=Favorite was updated.\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=Favorite was deleted.\r\n\r\n#XBUT:\r\nHELP=Help\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED={0}/{1} hours entered for this week\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=Turn ON Pre-Fill to quickly populate hours for the week based on your last successful entry.\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=Some entries are incorrect. Please review error details and correct entries.\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT=Time entry for {0} and {1} more day(s)\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Edit Time Entry\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE=Time entry for {0}\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} hours {1} minutes\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\r\n\r\n#XBUT: Button to reset\r\nRESET=Reset\r\n\r\n#XBUT: Button to update\r\nUPDATE=Update\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=Add Favorite\r\n\r\n#XBUT: Button to create\r\nCREATE=Create\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=Current Favorite Name\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=New Favorite Name\r\n\r\n#XTIT: time\r\nTIME=Time\r\n',
	"hcm/mytimesheet/i18n/i18n_en_US_sappsd.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\nPERSONAL_ASSIGN=[[[\\u0108\\u0125\\u014F\\u014F\\u015F\\u0113 \\u0105 \\u01A4\\u0113\\u0157\\u015F\\u014F\\u014B\\u014B\\u0113\\u013A \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XTIT: Select Personnel Assignment Title\r\nPERSONAL_ASSIGN_TITLE=[[[\\u01A4\\u0113\\u0157\\u015F\\u014F\\u014B\\u014B\\u0113\\u013A \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: label for from time\r\nFROM=[[[\\u0192\\u0157\\u014F\\u0271]]]\r\n\r\n#XFLD: label for to time\r\nTO=[[[\\u0163\\u014F\\u2219\\u2219]]]\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=[[[\\u0108\\u0105\\u014B\\u010B\\u0113\\u013A\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=[[[\\u0108\\u013A\\u014F\\u015F\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XBUT: Button to accept\r\nOK=[[[\\u014E\\u0136\\u2219\\u2219]]]\r\n\r\n#XBUT: Button to affirm\r\nYES=[[[\\u0176\\u0114\\u015C\\u2219]]]\r\n\r\n#XBUT: Button to decline\r\nNO=[[[\\u0143\\u014E\\u2219\\u2219]]]\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=[[[\\u015C\\u0105\\u028B\\u0113 \\u010E\\u0157\\u0105\\u0192\\u0163\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=[[[\\u039C\\u0177 \\u0162\\u012F\\u0271\\u0113\\u015F\\u0125\\u0113\\u0113\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=[[[\\u012C\\u014B\\u0163\\u0113\\u0157\\u014B\\u0105\\u013A \\u0114\\u0157\\u0157\\u014F\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=[[[\\u0162\\u0125\\u0113\\u0157\\u0113 \\u012F\\u015F \\u0105\\u014B \\u012C\\u014B\\u0163\\u0113\\u0157\\u014B\\u0105\\u013A \\u0113\\u0157\\u0157\\u014F\\u0157 \\u012F\\u014B \\u0163\\u0125\\u0113 \\u0105\\u03C1\\u03C1\\u013A\\u012F\\u010B\\u0105\\u0163\\u012F\\u014F\\u014B \\u0157\\u0113\\u013A\\u0105\\u0163\\u0113\\u018C \\u0163\\u014F \\u0163\\u0125\\u0113 \\u0113\\u0157\\u0157\\u014F\\u0157 \\u0125\\u0105\\u014B\\u018C\\u013A\\u012F\\u014B\\u011F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=[[[\\u010E\\u0113\\u013A\\u0113\\u0163\\u0113 \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: \r\nTIMESHEET=[[[\\u0162\\u012F\\u0271\\u0113\\u015F\\u0125\\u0113\\u0113\\u0163 \\u0114\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=[[[\\u01EC\\u0171\\u012F\\u010B\\u0137 \\u0114\\u014B\\u0163\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=[[[\\u0100\\u03C1\\u03C1\\u013A\\u0177 \\u0162\\u014F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=[[[\\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=[[[\\u0108\\u0157\\u0113\\u0105\\u0163\\u0113 \\u0162\\u012F\\u0271\\u0113 \\u0114\\u014B\\u0163\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=[[[\\u0108\\u0157\\u0113\\u0105\\u0163\\u0113 \\u0114\\u014B\\u0163\\u0157\\u0177 \\u0192\\u014F\\u0157 {0} \\u018C\\u0105\\u0177\\u015F]]]\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=[[[\\u0114\\u014B\\u0163\\u0157\\u0177 \\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE=[[[\\u0114\\u014B\\u0163\\u0157\\u0177 \\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F \\u0192\\u014F\\u0157 {0}]]]\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=[[[\\u0108\\u0157\\u0113\\u0105\\u0163\\u0113 \\u0114\\u014B\\u0163\\u0157\\u0177 \\u0192\\u014F\\u0157 {0}]]]\r\n\r\n# XTIT: Month short header\r\nMONTH_0=[[[\\u0134\\u0105\\u014B\\u2219]]]\r\n# XTIT: Month short header\r\nMONTH_1=[[[\\u0191\\u0113\\u0183\\u2219]]]\r\n# XTIT: Month short header\r\nMONTH_2=[[[\\u039C\\u0105\\u0157\\u2219]]]\r\n# XTIT: Month short header\r\nMONTH_3=[[[\\u0100\\u03C1\\u0157\\u2219]]]\r\n# XTIT: Month short header\r\nMONTH_4=[[[\\u039C\\u0105\\u0177\\u2219]]]\r\n# XTIT: Month short header\r\nMONTH_5=[[[\\u0134\\u0171\\u014B\\u2219]]]\r\n# XTIT: Month short header\r\nMONTH_6=[[[\\u0134\\u0171\\u013A\\u2219]]]\r\n# XTIT: Month short header\r\nMONTH_7=[[[\\u0100\\u0171\\u011F\\u2219]]]\r\n# XTIT: Month short header\r\nMONTH_8=[[[\\u015C\\u0113\\u03C1\\u2219]]]\r\n# XTIT: Month short header\r\nMONTH_9=[[[\\u014E\\u010B\\u0163\\u2219]]]\r\n# XTIT: Month short header\r\nMONTH_10=[[[\\u0143\\u014F\\u028B\\u2219]]]\r\n# XTIT: Month short header\r\nMONTH_11=[[[\\u010E\\u0113\\u010B\\u2219]]]\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=[[[\\u0134\\u0105\\u014B\\u0171\\u0105\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=[[[\\u0191\\u0113\\u0183\\u0157\\u0171\\u0105\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=[[[\\u039C\\u0105\\u0157\\u010B\\u0125\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=[[[\\u0100\\u03C1\\u0157\\u012F\\u013A\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=[[[\\u039C\\u0105\\u0177\\u2219]]]\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=[[[\\u0134\\u0171\\u014B\\u0113]]]\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=[[[\\u0134\\u0171\\u013A\\u0177]]]\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=[[[\\u0100\\u0171\\u011F\\u0171\\u015F\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=[[[\\u015C\\u0113\\u03C1\\u0163\\u0113\\u0271\\u0183\\u0113\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=[[[\\u014E\\u010B\\u0163\\u014F\\u0183\\u0113\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=[[[\\u0143\\u014F\\u028B\\u0113\\u0271\\u0183\\u0113\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=[[[\\u010E\\u0113\\u010B\\u0113\\u0271\\u0183\\u0113\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=[[[\\u0100\\u010B\\u0163\\u012F\\u014F\\u014B \\u0158\\u0113\\u01A3\\u0171\\u012F\\u0157\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219]]]\r\n# XTIT: Legend filled day\r\nFILLED_DAY=[[[\\u010E\\u014F\\u014B\\u0113]]]\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=[[[\\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113\\u0157 \\u0100\\u010B\\u0163\\u012F\\u014F\\u014B \\u0143\\u0113\\u0113\\u018C\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=[[[\\u0158\\u0113\\u0135\\u0113\\u010B\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n# XFLD: Legend future working day\r\nWORKING_DAY=[[[\\u0174\\u014F\\u0157\\u0137\\u012F\\u014B\\u011F \\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=[[[\\u0143\\u014F\\u014B-\\u0175\\u014F\\u0157\\u0137\\u012F\\u014B\\u011F \\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219]]]\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163\\u0113\\u018C \\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163\\u0113\\u018C \\u0143\\u014F\\u014B-\\u0175\\u014F\\u0157\\u0137\\u012F\\u014B\\u011F \\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n# XFLD: Legend current day\r\nCURRENT_DAY=[[[\\u0108\\u0171\\u0157\\u0157\\u0113\\u014B\\u0163 \\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=[[[\\u0162\\u014F\\u0163\\u0105\\u013A \\u039C\\u012F\\u015F\\u015F\\u012F\\u014B\\u011F \\u0124\\u014F\\u0171\\u0157\\u015F\\: {0}]]]\r\n\r\n#XFLD:\r\nMONTH_YEAR=[[[{0} {1} ({2} \\u0125\\u014F\\u0171\\u0157\\u015F)]]]\r\n\r\n#XBUT: Button\r\nSAVE=[[[\\u015C\\u0105\\u028B\\u0113]]]\r\n\r\n#XBUT: Button \r\nSUBMIT=[[[\\u015C\\u0171\\u0183\\u0271\\u012F\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XMSG\r\nFILL_ALL=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 {0} \\u0125\\u014F\\u0171\\u0157\\u015F \\u0192\\u014F\\u0157\\:]]]\r\n\r\n#XFLD\r\nNO_TASK_TYPE=[[[\\u0143\\u014F \\u0162\\u0105\\u015F\\u0137 \\u0162\\u0177\\u03C1\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD\r\nMISSING_DAYS=[[[\\u039C\\u012F\\u015F\\u015F\\u012F\\u014B\\u011F \\u010E\\u0105\\u0177\\u015F\\:{0}]]]\r\n\r\n#XBUT: Button\r\nHOME=[[[\\u0124\\u014F\\u0271\\u0113]]]\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271\\u0105\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271 \\u010E\\u0113\\u013A\\u0113\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271 \\u015C\\u0171\\u0183\\u0271\\u012F\\u015F\\u015F\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271 \\u010E\\u0157\\u0105\\u0192\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=[[[\\u015C\\u0171\\u0271\\u0271\\u0105\\u0157\\u0177 \\u014F\\u0192 \\u0163\\u012F\\u0271\\u0113 \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F \\u015F\\u0113\\u013A\\u0113\\u010B\\u0163\\u0113\\u018C \\u0192\\u014F\\u0157 \\u010E\\u0113\\u013A\\u0113\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=[[[\\u015C\\u0171\\u0271\\u0271\\u0105\\u0157\\u0177 \\u014F\\u0192 \\u0163\\u012F\\u0271\\u0113 \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F \\u015F\\u0113\\u013A\\u0113\\u010B\\u0163\\u0113\\u018C \\u0192\\u014F\\u0157 \\u015C\\u0171\\u0183\\u0271\\u012F\\u015F\\u015F\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=[[[\\u015C\\u0171\\u0271\\u0271\\u0105\\u0157\\u0177 \\u014F\\u0192 \\u0163\\u012F\\u0271\\u0113 \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F \\u015F\\u0113\\u013A\\u0113\\u010B\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=[[[\\u0143\\u0171\\u0271\\u0183\\u0113\\u0157 \\u014F\\u0192 \\u0114\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=[[[\\u0143\\u0171\\u0271\\u0183\\u0113\\u0157 \\u014F\\u0192 \\u0124\\u014F\\u0171\\u0157\\u015F\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY=[[[{0} - {1}]]]\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE=[[[{0} - {1}]]]\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR=[[[{0} \\u0124\\u014F\\u0171\\u0157]]]\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS=[[[{0} \\u0124\\u014F\\u0171\\u0157\\u015F]]]\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR=[[[{0} \\u0125\\u014F\\u0171\\u0157 / {1} \\u0125\\u014F\\u0171\\u0157\\u015F]]]\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS=[[[{0} \\u0124\\u014F\\u0171\\u0157\\u015F / {1} \\u0124\\u014F\\u0171\\u0157\\u015F]]]\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=[[[\\u0162\\u0105\\u0157\\u011F\\u0113\\u0163\\: {0} \\u0124\\u014F\\u0171\\u0157\\u015F ]]]\r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS=[[[{0} \\u0162\\u012F\\u0271\\u0113 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u015F]]]\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=[[[1 \\u0162\\u012F\\u0271\\u0113 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=[[[\\u0143\\u014F \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=[[[\\u0143\\u014F \\u0158\\u0113\\u010B\\u014F\\u0157\\u018C\\u012F\\u014B\\u011F\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS=[[[{0} \\u0124\\u014F\\u0171\\u0157\\u015F \\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113\\u018C]]]\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=[[[\\u015C\\u0105\\u028B\\u0113 \\u0175\\u012F\\u0163\\u0125 \\u0163\\u012F\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=[[[\\u015C\\u0105\\u028B\\u0113 \\u0175\\u012F\\u0163\\u0125\\u014F\\u0171\\u0163 \\u0163\\u012F\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=[[[\\u010E\\u0113\\u013A\\u0113\\u0163\\u0113 \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=[[[\\u015C\\u0105\\u028B\\u0113 \\u0105\\u015F \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=[[[\\u039C\\u0105\\u014B\\u0105\\u011F\\u0113 \\u0192\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: Week \r\nWEEK=[[[\\u0174\\u0113\\u0113\\u0137]]]\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=[[[\\u0100\\u03C1\\u03C1\\u013A\\u0177 \\u0125\\u014F\\u0171\\u0157\\u015F \\u0163\\u014F\\:\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XBUT\r\nALL_MISSING=[[[\\u0100\\u013A\\u013A \\u039C\\u012F\\u015F\\u015F\\u012F\\u014B\\u011F \\u0162\\u012F\\u0271\\u0113 ({0} \\u0125\\u014F\\u0171\\u0157\\u015F)]]]\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=[[[\\u010E\\u0113\\u013A\\u0113\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=[[[\\u0108\\u014F\\u03C1\\u0177]]]\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=[[[\\u0100\\u018C\\u018C \\u0114\\u014B\\u0163\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: label for duration\r\nDURATION=[[[\\u010E\\u0171\\u0157\\u0105\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=[[[\\u0162\\u014F\\u0163\\u0105\\u013A \\u010E\\u0171\\u0157\\u0105\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: label for status\r\nSTATUS=[[[\\u015C\\u0163\\u0105\\u0163\\u0171\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=[[[\\u015C\\u0163\\u0105\\u0157\\u0163 \\u0162\\u012F\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=[[[\\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u0143\\u0105\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=[[[\\u0114\\u014B\\u018C \\u0162\\u012F\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: label for note\r\nNOTE=[[[\\u0143\\u014F\\u0163\\u0113]]]\r\n\r\n#XBUT: Done button\r\nDONE=[[[\\u010E\\u014F\\u014B\\u0113]]]\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=[[[\\u039C\\u0105\\u014B\\u0171\\u0105\\u013A\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=[[[\\u0114\\u018C\\u012F\\u0163 \\u0114\\u014B\\u0163\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=[[[\\u0162\\u012F\\u0271\\u0113 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 / \\u0174\\u014F\\u0157\\u0137\\u013A\\u012F\\u015F\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0174\\u014F\\u0157\\u0137\\u013A\\u012F\\u015F\\u0163\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: Favorite\r\nFAVORITE=[[[\\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: Worklist\r\nWORKLIST=[[[\\u0174\\u014F\\u0157\\u0137\\u013A\\u012F\\u015F\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=[[[\\u0100\\u018C\\u018C \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=[[[\\u0114\\u018C\\u012F\\u0163 \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=[[[\\u013B\\u014F\\u0105\\u018C \\u039C\\u014F\\u0157\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=[[[\\u013B\\u014F\\u0105\\u018C\\u012F\\u014B\\u011F...\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=[[[\\u0108\\u014F\\u014B\\u0163\\u012F\\u014B\\u0171\\u0113 \\u015C\\u0113\\u0105\\u0157\\u010B\\u0125 \\u014F\\u014B \\u015C\\u0113\\u0157\\u028B\\u0113\\u0157...\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=[[[\\u013B\\u014F\\u0105\\u018C\\u012F\\u014B\\u011F...\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: BLANK\r\nEMPTY=[[[\\u0114\\u0271\\u03C1\\u0163\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: None\r\nNONE=[[[\\u0143\\u014F\\u014B\\u0113]]]\r\n\r\n#XFLD\r\nNO_WORKLIST=[[[\\u0143\\u014F \\u0175\\u014F\\u0157\\u0137\\u013A\\u012F\\u015F\\u0163 \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD\r\nNO_FAVORITE=[[[\\u0143\\u014F \\u0192\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: Select\r\nSELECT=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 {0}]]]\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=[[[\\u015C\\u0113\\u0105\\u0157\\u010B\\u0125...\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=[[[\\u0125\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=[[[\\u0271\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=[[[\\u0125\\u014F\\u0171\\u0157\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=[[[\\u0271\\u012F\\u014B\\u0171\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=[[[\\u039C\\u039C\\u039C \\u010E\\u010E, \\u0176\\u0176\\u0176\\u0176\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XBUT:\r\nDETAIL=[[[\\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=[[[\\u015C\\u0113\\u0163\\u0163\\u012F\\u014B\\u011F\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=[[[\\u0100\\u014B\\u0177 \\u0171\\u014B\\u015F\\u0105\\u028B\\u0113\\u018C \\u018C\\u0105\\u0163\\u0105 \\u0175\\u012F\\u013A\\u013A \\u0183\\u0113 \\u018C\\u012F\\u015F\\u010B\\u0105\\u0157\\u018C\\u0113\\u018C. \\u0100\\u0157\\u0113 \\u0177\\u014F\\u0171 \\u015F\\u0171\\u0157\\u0113 \\u0177\\u014F\\u0171 \\u0175\\u0105\\u014B\\u0163 \\u0163\\u014F \\u03C1\\u0157\\u014F\\u010B\\u0113\\u0113\\u018C?\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=[[[\\u016E\\u014B\\u015F\\u0105\\u028B\\u0113\\u018C \\u0108\\u0125\\u0105\\u014B\\u011F\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=[[[\\u0158\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163 \\u015C\\u0171\\u0183\\u0271\\u012F\\u0163\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=[[[\\u01A4\\u013A\\u0113\\u0105\\u015F\\u0113 \\u0113\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u0192\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u014B\\u0105\\u0271\\u0113 \\u012F\\u014B \\u0163\\u0125\\u0113 \\u0162\\u012F\\u0271\\u0113 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163 \\u012F\\u014B\\u03C1\\u0171\\u0163 \\u0192\\u012F\\u0113\\u013A\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=[[[\\u01A4\\u013A\\u0113\\u0105\\u015F\\u0113 \\u0113\\u014B\\u0163\\u0113\\u0157 \\u015F\\u014F\\u0271\\u0113 \\u0192\\u012F\\u0113\\u013A\\u018C\\u015F \\u0163\\u014F \\u015F\\u0163\\u014F\\u0157\\u0113 \\u0105\\u015F \\u0177\\u014F\\u0171\\u0157 \\u0192\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=[[[\\u01A4\\u013A\\u0113\\u0105\\u015F\\u0113 \\u0113\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u028B\\u0105\\u013A\\u012F\\u018C \\u010E\\u0171\\u0157\\u0105\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=[[[\\u01A4\\u013A\\u0113\\u0105\\u015F\\u0113 \\u0113\\u014B\\u0163\\u0113\\u0157 \\u028B\\u0105\\u013A\\u012F\\u018C \\u015C\\u0163\\u0105\\u0157\\u0163 \\u0105\\u014B\\u018C \\u0114\\u014B\\u018C \\u0162\\u012F\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=[[[\\u010E\\u0157\\u0105\\u0192\\u0163 \\u015C\\u0105\\u028B\\u0113\\u018C \\u015C\\u0171\\u010B\\u010B\\u0113\\u015F\\u015F\\u0192\\u0171\\u013A\\u013A\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=[[[\\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u0108\\u0157\\u0113\\u0105\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=[[[\\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u016E\\u03C1\\u018C\\u0105\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=[[[\\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u010E\\u0113\\u013A\\u0113\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XBUT:\r\nHELP=[[[\\u0124\\u0113\\u013A\\u03C1]]]\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED=[[[{0}/{1} \\u0125\\u014F\\u0171\\u0157\\u015F \\u0113\\u014B\\u0163\\u0113\\u0157\\u0113\\u018C \\u0192\\u014F\\u0157 \\u0163\\u0125\\u012F\\u015F \\u0175\\u0113\\u0113\\u0137.]]]\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=[[[\\u0162\\u0171\\u0157\\u014B \\u014E\\u0143 \\u01A4\\u0157\\u0113-\\u0191\\u012F\\u013A\\u013A \\u0163\\u014F \\u01A3\\u0171\\u012F\\u010B\\u0137\\u013A\\u0177 \\u03C1\\u014F\\u03C1\\u0171\\u013A\\u0105\\u0163\\u0113 \\u0125\\u014F\\u0171\\u0157\\u015F \\u0192\\u014F\\u0157 \\u0163\\u0125\\u0113 \\u0175\\u0113\\u0113\\u0137 \\u0183\\u0105\\u015F\\u0113\\u018C \\u014F\\u014B \\u0177\\u014F\\u0171\\u0157 \\u013A\\u0105\\u015F\\u0163 \\u015F\\u0171\\u010B\\u010B\\u0113\\u015F\\u015F\\u0192\\u0171\\u013A \\u0113\\u014B\\u0163\\u0157\\u0177.\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=[[[\\u015C\\u014F\\u0271\\u0113 \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F \\u0105\\u0157\\u0113 \\u012F\\u014B\\u010B\\u014F\\u0157\\u0157\\u0113\\u010B\\u0163. \\u0158\\u0113\\u028B\\u012F\\u0113\\u0175 \\u0113\\u0157\\u0157\\u014F\\u0157 \\u018C\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F \\u0105\\u014B\\u018C \\u010B\\u014F\\u0157\\u0157\\u0113\\u010B\\u0163 \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F.\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT=[[[\\u0162\\u012F\\u0271\\u0113 \\u0114\\u014B\\u0163\\u0157\\u0177 \\u0192\\u014F\\u0157 {0} \\u0105\\u014B\\u018C {1} \\u0271\\u014F\\u0157\\u0113 \\u018C\\u0105\\u0177(\\u015F)]]]\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=[[[\\u0114\\u018C\\u012F\\u0163 \\u0162\\u012F\\u0271\\u0113 \\u0114\\u014B\\u0163\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE=[[[\\u0162\\u012F\\u0271\\u0113 \\u0113\\u014B\\u0163\\u0157\\u0177 \\u0192\\u014F\\u0157 {0}]]]\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN=[[[{0}\\u0125\\u014F\\u0171\\u0157\\u015F {1}\\u0271\\u012F\\u014B\\u0171\\u0163\\u0113\\u015F]]]\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN=[[[{0}\\u0125 {1}\\u0271]]]\r\n\r\n#XBUT: Button to reset\r\nRESET=[[[\\u0158\\u0113\\u015F\\u0113\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XBUT: Button to update\r\nUPDATE=[[[\\u016E\\u03C1\\u018C\\u0105\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=[[[\\u0100\\u018C\\u018C \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XBUT: Button to create\r\nCREATE=[[[\\u0108\\u0157\\u0113\\u0105\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=[[[\\u0114\\u03C7\\u012F\\u015F\\u0163\\u012F\\u014B\\u011F \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u0143\\u0105\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=[[[\\u0143\\u0113\\u0175 \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u0143\\u0105\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XTIT: time\r\nTIME=[[[\\u0162\\u012F\\u0271\\u0113]]]\r\n',
	"hcm/mytimesheet/i18n/i18n_en_US_saptrc.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\nPERSONAL_ASSIGN=DAq19kZlqArqiDtIHySHuQ_Choose a Personnel Assignment\r\n\r\n#XTIT: Select Personnel Assignment Title\r\nPERSONAL_ASSIGN_TITLE=5M4GsLqpBwUZ/YozxfkzaQ_Personnel Assignments\r\n\r\n#XFLD: label for from time\r\nFROM=4o8WqRygT/lr/W/UX+BCfw_from\r\n\r\n#XFLD: label for to time\r\nTO=3/Q1OxMcz6BHGGbQE9guAA_to\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=YwHqzGh9ve+HkLkHJ9Jk6w_Cancel\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=5ihwBYh2CZ+dcVkM4TSy3Q_Close\r\n\r\n#XBUT: Button to accept\r\nOK=K5fF0NdjNkM7TzPvUwF7Ow_OK\r\n\r\n#XBUT: Button to affirm\r\nYES=pk1wZxP3H5vElmWpP03QBA_YES\r\n\r\n#XBUT: Button to decline\r\nNO=ZC/t1sZVor8hKPjVlSXSBA_NO\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=zBeFP/XRmZx0kCpGCFOvyw_Save Draft\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=vqs19sWu5s5TL8R8cuDyzg_My Timesheet\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=+TLMtlq5TXErv2CLIONwGw_Internal Error\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=y9iL1WIpcJkRMDhjS2vSXQ_There is an Internal error in the application related to the error handling\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=//TMGyzDlcHv9nCt3W/j2Q_Delete Favorites\r\n\r\n# XTIT: \r\nTIMESHEET=t0UhplIdQV/qqF9ahrSG2g_Timesheet Entries\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=WUGl1cMboH+oSz0yBvPF1w_Quick Entry\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=IKMofNdrwMvXij3Ldh2yrg_Apply To\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=Sg/s3bBgzpaYKXHhzjXj0g_Details\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=eaXQcf/8NS+5hSrXPxXbWQ_Create Time Entry\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=/yvbGm/a18GZBY7fA9RfTg_Create Entry for {0} days\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=B3t81I1pnGi568d8OVtfPQ_Entry Details\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE=nCUGLKOBpEZoEJx6MLuomQ_Entry Details for {0}\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=JVvXICO8sApzdHMlGxUTYw_Create Entry for {0}\r\n\r\n# XTIT: Month short header\r\nMONTH_0=Kj4X7VqGUetv2KvWmxjgKg_Jan\r\n# XTIT: Month short header\r\nMONTH_1=Z6mWoA+UQuF9CHDYIxoUUA_Feb\r\n# XTIT: Month short header\r\nMONTH_2=ZiuZPL8tHQm+YvDHUle/1g_Mar\r\n# XTIT: Month short header\r\nMONTH_3=h8vAbKwiBBrWG4AeoMBVNg_Apr\r\n# XTIT: Month short header\r\nMONTH_4=PjEYCILHs4Bs0t0q1+gcJw_May\r\n# XTIT: Month short header\r\nMONTH_5=TJXgRWnqwc/VA3M/Tf69GQ_Jun\r\n# XTIT: Month short header\r\nMONTH_6=tSYFuP59ti4jBv0wNFFhaw_Jul\r\n# XTIT: Month short header\r\nMONTH_7=TDQyBI+XGctokKzKv5TMfg_Aug\r\n# XTIT: Month short header\r\nMONTH_8=IynbrxXLV+fmrMvy+TvF4A_Sep\r\n# XTIT: Month short header\r\nMONTH_9=o39jw+cP24K3vbwJ6ax0cQ_Oct\r\n# XTIT: Month short header\r\nMONTH_10=QpHy+MzBa2Ay+j7RWFin9g_Nov\r\n# XTIT: Month short header\r\nMONTH_11=OoQJg64JmBQ1NYnjpk/OIA_Dec\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=WdWg8+RwZScDcrlUl56Xsg_January\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=oKSvXZA3Aeh5K6fgjFXJ4Q_February\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=uoheH5NZHG4ZaWmtBFRZ+w_March\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=BkykAomBw7HRfWdIEpNoPQ_April\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=65y060XYw5OWdHaU3DY7yg_May\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=h7VUlQunAD0GqFXwZ49mcA_June\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=3kkRJc/ayNUZm87fL7zTwA_July\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=TPEExBH9WDDKSKe3u4/+VA_August\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=+rBP+K28RP7YCIJjF7no9A_September\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=QG/usYC+IJg4xKjbp0DSbQ_October\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=KJg94+JMUgWp9QDwtEdn7g_November\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=KgjbsqZBOqqnB6urToht6w_December\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=a0R+cVv7xKDyc+fDLgcyTg_Action Required\r\n# XTIT: Legend filled day\r\nFILLED_DAY=AzV6kHUmJ59Rx6pfgRfR/w_Done\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=L7swmLH7IFYIBWKkdqa56Q_Approver Action Needed\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=KgDQCyEkSKgxNiKq5CruyA_Rejected\r\n# XFLD: Legend future working day\r\nWORKING_DAY=UIaM8DmUCsepCd0cnhDk+g_Working day\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=n6QkVbprPrsr8Hrcd5Skhw_Non-working day\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=NxXQgF5RhEMcphuOR6BXYw_Selected day\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=mWyGW8vV8Usrc4mOALuYag_Selected Non-working day\r\n# XFLD: Legend current day\r\nCURRENT_DAY=F+4Yc/Ys0Y99W5hg0fKktw_Current day\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=INwOTR6dIhYp5MVZMVouiA_Total Missing Hours\\: {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR=RJgFJ5Cs+tRzfFue/Nuu/Q_{0} {1} ({2} hours)\r\n\r\n#XBUT: Button\r\nSAVE=GTAPwFXMfvnG+Nnt6fRByg_Save\r\n\r\n#XBUT: Button \r\nSUBMIT=6iXPTNMsxcFNfCnzmhQzBA_Submit\r\n\r\n# XMSG\r\nFILL_ALL=mzRsYOD2FUMEy43ioizxvA_Enter {0} hours for\\:\r\n\r\n#XFLD\r\nNO_TASK_TYPE=BCISDDwBhqNbBgvXN/Gi0w_No Task Type\r\n\r\n#XFLD\r\nMISSING_DAYS=AIbM1WvqLd+JBqeMfyQQig_Missing Days\\:{0}\r\n\r\n#XBUT: Button\r\nHOME=YjamQl40rx5uPBfa2zPIGQ_Home\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=1PmSBuodWJbUExHxP7RbLg_Confirmation\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=UlB9ywFjyY34l+rn05V5nw_Confirm Deletion\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=uKBNz0KDpcMik8+dQQYq4Q_Confirm Submission\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=5pk0kjVc2n12XuA+nlg28w_Confirm Draft\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=Hm6SOQ5Q+1zDJD2/wHtJHw_Summary of time entries selected for Deletion\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=XFLKYXW2N0l34VwgOKYBqw_Summary of time entries selected for Submission\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=v5ZnM8qh4b0vyKs+rIlcNg_Summary of time entries selected\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=M6L8Zrh2v8j/uKItvQ780w_Number of Entries\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=omQFqT7LESXq2qjRhPCYkg_Number of Hours\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=pVpQTih2vwAj/BA3H/cx0A_Confirm\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY=Y7Z+QdZHcs61dcOTEdzTsA_{0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE=Xq6MmKom0GYqBF3dDYX2vQ_{0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR=fvBm3/0UugHhO8qam1bamQ_{0} Hour\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS=m2e/E1ruLBDeuSVitK5AqA_{0} Hours\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR=H1cfjJDUjj5pJND8XQ3daQ_{0} hour / {1} hours\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS=ImR7uQGcWcJAZ25AhINHbA_{0} Hours / {1} Hours\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=dTssye91o1xGCXh0dQ/UJA_Target\\: {0} Hours \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS=CfOACJDDGUIeOcax/Js6mw_{0} Time Assignments\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=RkQYJgDQ94hXboycIiDvJg_1 Time Assignment\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=cZFaTiWHDYGDl5jhLtlg2A_No Assignments\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=B4yoBnEz5zQjiWSa7E8zmQ_No Recordings\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS=46FoDxZm90vRUyGjKtaZ6A_{0} Hours Approved\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=KKUxCM1USF5mFWE8N0atgQ_Save with time\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=zQ3h7ijUs3WuJdhGXb0Alw_Save without time\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=EgLVXjajFxNhf4rafLyIPQ_Delete Favorites\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=DV9y8KpGS25wztepE3ZWkA_Save as Favorite\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=JrKTPIVaiI1q5l8JoMiqiw_Manage favorites\r\n\r\n#XFLD: Week \r\nWEEK=OVtGoQFSAaUa3CeMOlENJg_Week\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=A8oeym9JlrXvzrk268uSAA_Apply hours to\\:\r\n\r\n#XBUT\r\nALL_MISSING=aNST74IjbZjgfe0QM4Obhg_All Missing Time ({0} hours)\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=5X2GeTzuqFr5qXaQ1Tk/xw_Delete\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=Pf27WVvxx5Fzln7sVEHPhw_Copy\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=2qH4w5wfpuj5ZZgdc3iEeA_Add Entry\r\n\r\n#XFLD: label for duration\r\nDURATION=pH0pChNmq/egKwt1y3z7xQ_Duration\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=eFkKAzqBGRciZxu5/S1FYQ_Total Duration\r\n\r\n#XFLD: label for status\r\nSTATUS=UVfvo9DwGr3BFTe5Wkr9eg_Status\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=tCrtwIExF67LVpkFLxDf3w_Start Time\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=g9pe1I7Ly+MLVm/LK1EmKA_Favorite Name\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=d6xzBaVNcef8uPC4hRKazg_End Time\r\n\r\n#XFLD: label for note\r\nNOTE=v2MuseYApa74IfKwUpD1hw_Note\r\n\r\n#XBUT: Done button\r\nDONE=XMfyyi7etGGfPUCJ+6d6iQ_Done\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=YBmfKHKRcSaGyKqaGqyvWA_Manual\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=cMlAx1gvzFAH76tPwysv3g_Edit Entry\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=anBhwhiF5bydY1D30+6IFg_Time Assignment\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=bNw85hHFkTnn/VuyVimlDQ_Select Favorite / Worklist\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=dTloUWutrxxsnhfUee6TQA_Select Worklist\r\n\r\n# XTIT: Favorite\r\nFAVORITE=drKOcb+y1f3sz/mxwvEwXw_Favorites\r\n\r\n# XTIT: Worklist\r\nWORKLIST=JLh1+uDUA/mada2SIUEMdw_Worklist\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=LR9L45wTiPn6jJmiNVY0Hg_Add Favorite\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=nhsuLyya7MHbdFBvhMHedQ_Edit Favorites\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=VeFORAY6c5mwYgAkqFd1jQ_Load More\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=yq/CuBWtTPPrnOhxfq1AvA_Loading...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=FXoZjUj4eudUgh8JeyH82w_Continue Search on Server...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=ZDL1APQLFACypnPgfZpilA_Loading...\r\n\r\n#XFLD: BLANK\r\nEMPTY=wRlQN9pizZObcXTiNTQpwg_Empty\r\n\r\n#XFLD: None\r\nNONE=l1ZpfC6CkM+lpvyEvFiqlA_None\r\n\r\n#XFLD\r\nNO_WORKLIST=mc/jq29fW3J0uFE9EDN0tA_No worklist available\r\n\r\n#XFLD\r\nNO_FAVORITE=ohg6xndGR7PZGsHzjUTqOw_No favorites available\r\n\r\n# XTIT: Select\r\nSELECT=VJ7u73khGsiWDoJaaQNW/A_Select {0}\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=gsBEsTzPPQvHR9RBjVqTIA_Select\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=uWEzV9wCiRRoWSIVZUIVYw_Search...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=YRPgvOPH2kd484dLLj9WSQ_h\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=aM5wEoRTfgSyg2Qiu3s3wQ_m\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=jc5QOvzpF4zEuzSghHf19g_hours\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=7GR68GWoU2huneO+CrobYg_minutes\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=yr7l4Fox+EiH5MH2DPG6sA_MMM DD, YYYY\r\n\r\n#XBUT:\r\nDETAIL=TAsO83nvObNfvRucsLm/kg_Detail\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=cWStAMD+R0nfu77m97PaLw_Settings\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=YC/Bje1glbSy8VBF48Ereg_Any unsaved data will be discarded. Are you sure you want to proceed?\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=cQs2dmsIuVyhhzuCD3FdJA_Unsaved Changes\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=naas4y9HxT81pfbZpUHKwA_Request Submitted\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=6opPOPxN0I8mjPk9GE6TJg_Please enter a favorite name in the Time Assignment input field\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=XrP+e/TJnniNq23a7yuxug_Please enter some fields to store as your favorite\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=gQFXnwpT019cP9hfeu1ACg_Please enter a valid Duration\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=PVJQ+MQ546y/cwO9DsNPeg_Please enter valid Start and End Time\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=iBlbZaTxEeCTPlZNN6C0VA_Draft Saved Successfully\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=ZmUgYJTCH5BDJR8PdXohUQ_Favorite Created\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=wU39bDoSwBmCApGstF3gzQ_Favorite Updated\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=T7nujxZhv3rynu6DaKM9KQ_Favorite Deleted\r\n\r\n#XBUT:\r\nHELP=Yu3hLsUM+uDWEoJfTQpO3Q_Help\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED=9hMyNxbKRY9Uu/3ggeF3bw_{0}/{1} hours entered for this week.\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=w+ocDcTbAtnVAqbtdheIgQ_Turn ON Pre-Fill to quickly populate hours for the week based on your last successful entry.\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=xOJ7xkkS0N1l/595cejdaA_Some entries are incorrect. Review error details and correct entries.\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT=dgnjOefqybQIA3qp+77odA_Time Entry for {0} and {1} more day(s)\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=/BfhqaJyBL3q4GZ2SNZFuA_Edit Time Entry\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE=ivQ4ELRSU/02Kq9MGCVp8g_Time entry for {0}\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN=cqQke8dANDtabQpW+VHiJA_{0}hours {1}minutes\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN=YlMtKAjzcgOrDIlNjhw7Gg_{0}h {1}m\r\n\r\n#XBUT: Button to reset\r\nRESET=GJEMiqEJSvWASo0OOFc0ng_Reset\r\n\r\n#XBUT: Button to update\r\nUPDATE=Ek65nnTJR9PEQO3I2JKhJg_Update\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=2QSKKa2gtYtBAa0tjeSpVQ_Add Favorite\r\n\r\n#XBUT: Button to create\r\nCREATE=J5NJ2GsNz9X3XbFqUoAQhw_Create\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=f1hotalEMIVMFZ7ciLA+Nw_Existing Favorite Name\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=VSqvGez1mSH4k7SiDhqADQ_New Favorite Name\r\n\r\n#XTIT: time\r\nTIME=28ipaRbNACOElFpqTj6CMQ_Time\r\n',
	"hcm/mytimesheet/i18n/i18n_es.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=De\\:\r\n\r\n#XFLD: label for to time\r\nTO=A\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=Cancelar\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=Cerrar\r\n\r\n#XBUT: Button to accept\r\nOK=Aceptar\r\n\r\n#XBUT: Button to affirm\r\nYES=S\\u00ED\r\n\r\n#XBUT: Button to decline\r\nNO=No\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=Guardar borrador\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=Registro de tiempos\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=Error interno\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=Se ha producido un error interno relacionado con el tratamiento de errores en la aplicaci\\u00F3n\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=Eliminar Favoritos\r\n\r\n# XTIT: \r\nTIMESHEET=Entradas en registro de tiempos\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=Entrada r\\u00E1pida\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=Aplicar a\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=Detalles\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=Crear entrada para fecha\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=Crear entrada para {0} d\\u00EDas\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=Detalles de entrada\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE=Detalles de entrada para {0}\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=Crear entrada para {0}\r\n\r\n# XTIT: Month short header\r\nMONTH_0=Ene\r\n# XTIT: Month short header\r\nMONTH_1=Feb\r\n# XTIT: Month short header\r\nMONTH_2=Mar\r\n# XTIT: Month short header\r\nMONTH_3=Abr\r\n# XTIT: Month short header\r\nMONTH_4=May\r\n# XTIT: Month short header\r\nMONTH_5=Jun\r\n# XTIT: Month short header\r\nMONTH_6=Jul\r\n# XTIT: Month short header\r\nMONTH_7=Ago\r\n# XTIT: Month short header\r\nMONTH_8=Sep\r\n# XTIT: Month short header\r\nMONTH_9=Oct\r\n# XTIT: Month short header\r\nMONTH_10=Nov\r\n# XTIT: Month short header\r\nMONTH_11=Dic\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=Enero\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=Febrero\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=Marzo\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=Abril\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=Mayo\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=Junio\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=Julio\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=Agosto\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=Septiembre\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=Octubre\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=Noviembre\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=Diciembre\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=Acci\\u00F3n necesaria\r\n# XTIT: Legend filled day\r\nFILLED_DAY=Finalizar\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=Es necesaria la acci\\u00F3n del autorizador\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=Rechazadas\r\n# XFLD: Legend future working day\r\nWORKING_DAY=D\\u00EDa laborable\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=D\\u00EDa no laborable\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=D\\u00EDa seleccionado\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=D\\u00EDa festivo seleccionado\r\n# XFLD: Legend current day\r\nCURRENT_DAY=D\\u00EDa actual\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=Total de horas que faltan\\: {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1} ({2} horas)\r\n\r\n#XBUT: Button\r\nSAVE=Grabar\r\n\r\n#XBUT: Button \r\nSUBMIT=Enviar\r\n\r\n# XMSG\r\nFILL_ALL=Introducir {0} horas para\\:\r\n\r\n#XFLD\r\nNO_TASK_TYPE=No hay tipo de tarea\r\n\r\n#XFLD\r\nMISSING_DAYS=D\\u00EDas que faltan\\: {0}\r\n\r\n#XBUT: Button\r\nHOME=P\\u00E1gina principal\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=Confirmaci\\u00F3n\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=Confirmar borrado\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=Confirmar env\\u00EDo\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=Confirmar borrador\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=Total de valores para fecha seleccionados para borrado\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=Total de valores para fecha seleccionados para gastos\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=Resumen de entradas de tiempos seleccionadas\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Cantidad de entradas\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=Cantidad de horas\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=Confirmar\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR={0} horas\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} horas\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR={0} hora / {1} horas\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} horas / {1} horas\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=Objetivo\\: {0} horas \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS={0} asignaciones de tiempos\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=1 asignaci\\u00F3n de tiempos\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=Sin asignaciones\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=Sin registros\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS={0} horas autorizadas\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=Grabar con tiempo\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=Grabar sin tiempo\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=Eliminar Favoritos\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=Guardar como favorito\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=Gestionar favoritos\r\n\r\n#XFLD: Week \r\nWEEK=Semana\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=Imputar horas a\\:\r\n\r\n#XBUT\r\nALL_MISSING=Tiempo que falta en total ({0} horas)\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=Eliminar\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=Copiar\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=A\\u00F1adir entrada\r\n\r\n#XFLD: label for duration\r\nDURATION=Duraci\\u00F3n\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=Duraci\\u00F3n total\r\n\r\n#XFLD: label for status\r\nSTATUS=Estado\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=Hora de inicio\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=Nombre de favorito\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=Hora de fin\r\n\r\n#XFLD: label for note\r\nNOTE=Nota\r\n\r\n#XBUT: Done button\r\nDONE=Finalizar\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=Manual\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=Editar entrada\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=Asignaci\\u00F3n de tiempo\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=Seleccionar favorito o lista de trabajo\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=Seleccionar lista de trabajo\r\n\r\n# XTIT: Favorite\r\nFAVORITE=Favoritos\r\n\r\n# XTIT: Worklist\r\nWORKLIST=Lista de trabajo\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=A\\u00F1adir favorito\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=Tratar favoritos\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=Cargar m\\u00E1s...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=Cargando...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=Continuar la b\\u00FAsqueda en el servidor...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=Cargando...\r\n\r\n#XFLD: BLANK\r\nEMPTY=Vac\\u00EDo\r\n\r\n#XFLD: None\r\nNONE=Ninguno\r\n\r\n#XFLD\r\nNO_WORKLIST=Ninguna lista de trabajo disponible\r\n\r\n#XFLD\r\nNO_FAVORITE=No hay favoritos disponibles\r\n\r\n# XTIT: Select\r\nSELECT=Seleccionar {0}\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=Seleccionar\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=Buscar...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=h\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=m\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=Horas\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=Minutos\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=DD MMM, YYYY\r\n\r\n#XBUT:\r\nDETAIL=Detalles\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=Opciones\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=Todos los datos no grabados se descartar\\u00E1n. \\u00BFDesea continuar?\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=Modificaciones no guardadas\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=Solicitud enviada\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=Introduzca un nombre de favorito en el campo de entrada Asignaci\\u00F3nn de tiempo\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=Complete los campos para almacenar como favoritos\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=Introduzca una duraci\\u00F3n v\\u00E1lida\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=Introduzca una fecha de inicio y una fecha de fin v\\u00E1lidas\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=Borrador guardado correctamente\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=Favorito enviado\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=Favorito actualizado\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=Favorito eliminado\r\n\r\n#XBUT:\r\nHELP=Ayuda\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED={0}/{1} horas introducidas para esta semana\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=Pulse Prerrellenar para completar r\\u00E1pidamente horas de la semana basada en su \\u00FAltima entrada correcta.\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=Algunas entradas son incorrectas. Revise los detalles del error y corrija las entradas.\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT=Entrada de tiempo para {0} y {1} d\\u00EDa(s) de m\\u00E1s\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Editar entrada de tiempo\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE=Entrada de tiempo para {0}\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} horas {1} minutos\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\r\n\r\n#XBUT: Button to reset\r\nRESET=Reinicializar\r\n\r\n#XBUT: Button to update\r\nUPDATE=Actualizar\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=A\\u00F1adir favorito\r\n\r\n#XBUT: Button to create\r\nCREATE=Crear\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=Nombre actual de favorito\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=Nuevo nombre de favorito\r\n\r\n#XTIT: time\r\nTIME=Tiempo\r\n',
	"hcm/mytimesheet/i18n/i18n_fr.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=De\r\n\r\n#XFLD: label for to time\r\nTO=\\u00C0\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=Annuler\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=Fermer\r\n\r\n#XBUT: Button to accept\r\nOK=OK\r\n\r\n#XBUT: Button to affirm\r\nYES=Oui\r\n\r\n#XBUT: Button to decline\r\nNO=Non\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=Sauvegarder version pr\\u00E9liminaire\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=Ma feuille de saisie des temps\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=Erreur interne\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=Une erreur interne li\\u00E9e \\u00E0 la correction des erreurs s\'est produite dans l\'application.\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=Supprimer favoris\r\n\r\n# XTIT: \r\nTIMESHEET=Entr\\u00E9es sur la feuille de saisie des temps\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=Saisie rapide\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=Appliquer \\u00E0\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=D\\u00E9tails\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=Cr\\u00E9er saisie des temps\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=Cr\\u00E9er entr\\u00E9e pour {0} jours\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=D\\u00E9tails de l\'entr\\u00E9e\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE=D\\u00E9tails d\'\'entr\\u00E9e pour {0}\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=Cr\\u00E9er entr\\u00E9e pour {0}\r\n\r\n# XTIT: Month short header\r\nMONTH_0=Jan\r\n# XTIT: Month short header\r\nMONTH_1=F\\u00E9v\r\n# XTIT: Month short header\r\nMONTH_2=Mar\r\n# XTIT: Month short header\r\nMONTH_3=Avr\r\n# XTIT: Month short header\r\nMONTH_4=Mai\r\n# XTIT: Month short header\r\nMONTH_5=Jui\r\n# XTIT: Month short header\r\nMONTH_6=Juil\r\n# XTIT: Month short header\r\nMONTH_7=Ao\\u00FB\r\n# XTIT: Month short header\r\nMONTH_8=Sep\r\n# XTIT: Month short header\r\nMONTH_9=Oct\r\n# XTIT: Month short header\r\nMONTH_10=Nov\r\n# XTIT: Month short header\r\nMONTH_11=D\\u00E9c\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=Janvier\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=F\\u00E9vrier\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=Mars\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=Avril\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=Mai\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=Juin\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=Juillet\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=Ao\\u00FBt\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=Septembre\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=Octobre\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=Novembre\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=D\\u00E9cembre\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=Action requise\r\n# XTIT: Legend filled day\r\nFILLED_DAY=Termin\\u00E9\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=Action de l\'approbateur requise\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=Rejet\\u00E9\r\n# XFLD: Legend future working day\r\nWORKING_DAY=Jour ouvr\\u00E9\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=Jour ch\\u00F4m\\u00E9\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=Jour s\\u00E9lectionn\\u00E9\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=Jour s\\u00E9lectionn\\u00E9 non ouvr\\u00E9\r\n# XFLD: Legend current day\r\nCURRENT_DAY=Jour actuel\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=Heures manquantes au total\\u00A0\\: {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1} ({2} heures)\r\n\r\n#XBUT: Button\r\nSAVE=Sauvegarder\r\n\r\n#XBUT: Button \r\nSUBMIT=Envoyer\r\n\r\n# XMSG\r\nFILL_ALL=Saisir {0} heures pour\\u00A0\\:\r\n\r\n#XFLD\r\nNO_TASK_TYPE=Aucun type de t\\u00E2che\r\n\r\n#XFLD\r\nMISSING_DAYS=Jours manquants\\u00A0\\: {0}\r\n\r\n#XBUT: Button\r\nHOME=Page d\'accueil\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=Confirmation\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=Confirmer la suppression\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=Confirmer l\'envoi\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=Confirmer version pr\\u00E9liminaire\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=Synth\\u00E8se des saisies des temps marqu\\u00E9es pour suppression\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=Synth\\u00E8se des saisies des temps marqu\\u00E9es pour envoi\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=R\\u00E9sum\\u00E9 des saisies des temps s\\u00E9lectionn\\u00E9es\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Nombre d\'entr\\u00E9es\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=Nombre d\'heures\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=Confirmer\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR={0}\\u00A0heure\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} heures\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR={0}\\u00A0heure\\u00A0/\\u00A0{1}\\u00A0heures\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} heures\\u00A0/\\u00A0{1} heures\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=Objectif\\u00A0\\: {0} heures \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS={0} affectations des temps\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=1 affectation des temps\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=Aucune affectation\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=Aucun enregistrement\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS={0} heures approuv\\u00E9es\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=Sauvegarder avec les temps\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=Sauvegarder sans les temps\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=Supprimer favoris\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=Ajouter aux favoris\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=Organiser favoris\r\n\r\n#XFLD: Week \r\nWEEK=Semaine\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=Appliquer les heures \\u00E0 \\:\r\n\r\n#XBUT\r\nALL_MISSING=Temps manquant au total ({0} heure/s)\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=Supprimer\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=Copier\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=Ajouter entr\\u00E9e\r\n\r\n#XFLD: label for duration\r\nDURATION=Dur\\u00E9e\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=Dur\\u00E9e totale\r\n\r\n#XFLD: label for status\r\nSTATUS=Statut\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=Heure de d\\u00E9but\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=Nom du favori\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=Heure de fin\r\n\r\n#XFLD: label for note\r\nNOTE=Note\r\n\r\n#XBUT: Done button\r\nDONE=Termin\\u00E9\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=Manuellement\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=Traiter entr\\u00E9e\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=Affectation temps\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=S\\u00E9lection de favori ou r\\u00E9serve de travail\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=S\\u00E9lection de r\\u00E9serve de travail\r\n\r\n# XTIT: Favorite\r\nFAVORITE=Favoris\r\n\r\n# XTIT: Worklist\r\nWORKLIST=R\\u00E9serve de travail\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=Ajouter favori\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=Modifier favoris\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=Charger plus...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=Chargement...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=Continuer la recherche sur le serveur...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=Chargement...\r\n\r\n#XFLD: BLANK\r\nEMPTY=Vide\r\n\r\n#XFLD: None\r\nNONE=N\\u00E9ant\r\n\r\n#XFLD\r\nNO_WORKLIST=Aucune r\\u00E9serve de travail disponible\r\n\r\n#XFLD\r\nNO_FAVORITE=Aucun favori disponible\r\n\r\n# XTIT: Select\r\nSELECT=S\\u00E9lectionner {0}\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=S\\u00E9lectionner\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=Rechercher...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=h\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=m\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=Heures\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=Minutes\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=DD MMM YYYY\r\n\r\n#XBUT:\r\nDETAIL=D\\u00E9tails\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=Options\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=Toutes les donn\\u00E9es non sauvegard\\u00E9es seront perdues. Voulez-vous continuer ?\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=Modifications non sauvegard\\u00E9es\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=Demande correctement envoy\\u00E9e\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=Saisissez un nom de favori dans la zone de saisie Affectation des temps\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=Effectuez des entr\\u00E9es \\u00E0 archiver comme favoris\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=Saisissez une dur\\u00E9e valide\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=Saisissez une heure de d\\u00E9but et de fin valide\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=Version pr\\u00E9liminaire correctement sauvegard\\u00E9e\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=Favori cr\\u00E9\\u00E9\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=Favori mis \\u00E0 jour\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=Favori supprim\\u00E9\r\n\r\n#XBUT:\r\nHELP=Aide\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED={0}/{1} heures saisies pour cette semaine\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=Activez l\'option Pr\\u00E9-remplissage pour renseigner rapidement les heures de la semaine, bas\\u00E9es sur votre derni\\u00E8re entr\\u00E9e r\\u00E9ussie.\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=Certaines entr\\u00E9es sont incorrectes. Examinez les d\\u00E9tails d\'erreur et corrigez les entr\\u00E9es.\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT=Saisie des temps pour {0} et {1} jour(s) de plus\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Modifier saisie des temps\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE=Cr\\u00E9er saisie des temps pour {0}\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} heures {1} minutes\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\r\n\r\n#XBUT: Button to reset\r\nRESET=R\\u00E9initialiser\r\n\r\n#XBUT: Button to update\r\nUPDATE=Mettre \\u00E0 jour\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=Ajouter favori\r\n\r\n#XBUT: Button to create\r\nCREATE=Cr\\u00E9er\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=Nom de favori actuel\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=Nouveau nom de favori\r\n\r\n#XTIT: time\r\nTIME=Heure\r\n',
	"hcm/mytimesheet/i18n/i18n_hu.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=Kezdete\\:\r\n\r\n#XFLD: label for to time\r\nTO=V\\u00E9ge\\:\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=M\\u00E9gse\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=Bez\\u00E1r\\u00E1s\r\n\r\n#XBUT: Button to accept\r\nOK=Rendben\r\n\r\n#XBUT: Button to affirm\r\nYES=Igen\r\n\r\n#XBUT: Button to decline\r\nNO=Nem\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=Tervezet ment\\u00E9se\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=Saj\\u00E1t id\\u0151adatlap\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=Bels\\u0151 hiba\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=Hibakezel\\u00E9ssel \\u00F6sszef\\u00FCgg\\u0151 bels\\u0151 hiba t\\u00F6rt\\u00E9nt az alkalmaz\\u00E1sban.\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=Kedvencek t\\u00F6rl\\u00E9se\r\n\r\n# XTIT: \r\nTIMESHEET=Id\\u0151adatlap-bejegyz\\u00E9sek\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=Gyors bejegyz\\u00E9s\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=Alkalmaz\\u00E1s\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=R\\u00E9szletek\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=Id\\u0151bejegyz\\u00E9s l\\u00E9trehoz\\u00E1sa\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=Bejegyz\\u00E9s l\\u00E9trehoz\\u00E1sa {0} naphoz\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=Bejegyz\\u00E9s r\\u00E9szletei\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE=Bejegyz\\u00E9s r\\u00E9szletei - {0}\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=Bejegyz\\u00E9s l\\u00E9trehoz\\u00E1sa - {0}\r\n\r\n# XTIT: Month short header\r\nMONTH_0=Jan.\r\n# XTIT: Month short header\r\nMONTH_1=Febr.\r\n# XTIT: Month short header\r\nMONTH_2=M\\u00E1rc.\r\n# XTIT: Month short header\r\nMONTH_3=\\u00C1pr.\r\n# XTIT: Month short header\r\nMONTH_4=M\\u00E1j.\r\n# XTIT: Month short header\r\nMONTH_5=J\\u00FAn.\r\n# XTIT: Month short header\r\nMONTH_6=J\\u00FAl.\r\n# XTIT: Month short header\r\nMONTH_7=Aug.\r\n# XTIT: Month short header\r\nMONTH_8=Szept.\r\n# XTIT: Month short header\r\nMONTH_9=Okt.\r\n# XTIT: Month short header\r\nMONTH_10=Nov.\r\n# XTIT: Month short header\r\nMONTH_11=Dec.\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=Janu\\u00E1r\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=Febru\\u00E1r\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=M\\u00E1rcius\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=\\u00C1prilis\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=M\\u00E1jus\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=J\\u00FAnius\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=J\\u00FAlius\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=Augusztus\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=Szeptember\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=Okt\\u00F3ber\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=November\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=December\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=M\\u0171velet sz\\u00FCks\\u00E9ges\r\n# XTIT: Legend filled day\r\nFILLED_DAY=K\\u00E9sz\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=Enged\\u00E9lyez\\u0151i m\\u0171velet kell\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=Elutas\\u00EDtva\r\n# XFLD: Legend future working day\r\nWORKING_DAY=Munkanap\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=Nem munkanap\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=Kiv\\u00E1lasztott nap\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=Kiv\\u00E1lasztott szabadnap\r\n# XFLD: Legend current day\r\nCURRENT_DAY=Aktu\\u00E1lis nap\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=\\u00D6sszes hi\\u00E1nyz\\u00F3 \\u00F3ra\\: {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1} ({2} \\u00F3ra)\r\n\r\n#XBUT: Button\r\nSAVE=Ment\\u00E9s\r\n\r\n#XBUT: Button \r\nSUBMIT=Elk\\u00FCld\\u00E9s\r\n\r\n# XMSG\r\nFILL_ALL={0} \\u00F3ra megad\\u00E1sa a k\\u00F6vetkez\\u0151h\\u00F6z\\:\r\n\r\n#XFLD\r\nNO_TASK_TYPE=Nincs feladatt\\u00EDpus\r\n\r\n#XFLD\r\nMISSING_DAYS=Hi\\u00E1nyz\\u00F3 napok\\:  {0}\r\n\r\n#XBUT: Button\r\nHOME=Kezd\\u0151lap\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=Visszaigazol\\u00E1s\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=T\\u00F6rl\\u00E9s meger\\u0151s\\u00EDt\\u00E9se\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=K\\u00FCld\\u00E9s meger\\u0151s\\u00EDt\\u00E9se\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=Tervezet meger\\u0151s\\u00EDt\\u00E9se\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=T\\u00F6rl\\u00E9sre kiv\\u00E1lasztott id\\u0151bejegyz\\u00E9sek \\u00F6sszegz\\u00E9se\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=K\\u00FCld\\u00E9sre kiv\\u00E1lasztott id\\u0151bejegyz\\u00E9sek \\u00F6sszegz\\u00E9se\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=A kiv\\u00E1lasztott id\\u0151bejegyz\\u00E9sek \\u00F6sszegz\\u00E9se\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Bejegyz\\u00E9sek sz\\u00E1ma\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u00D3r\\u00E1k sz\\u00E1ma\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=Visszaigazol\\u00E1s\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR={0} \\u00F3ra\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} \\u00F3ra\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR={0} \\u00F3ra / {1} \\u00F3ra\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} \\u00F3ra / {1} \\u00F3ra\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=C\\u00E9l\\: {0} \\u00F3ra \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS={0} id\\u0151-hozz\\u00E1rendel\\u00E9s\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=1 id\\u0151-hozz\\u00E1rendel\\u00E9s\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=Nincs hozz\\u00E1rendel\\u00E9s\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=Nincs rekord\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS={0} \\u00F3ra enged\\u00E9lyezve\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=Ment\\u00E9s id\\u0151vel\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=Ment\\u00E9s id\\u0151 n\\u00E9lk\\u00FCl\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=Kedvencek t\\u00F6rl\\u00E9se\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=Ment\\u00E9s a kedvencek k\\u00F6z\\u00E9\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=Kedvencek kezel\\u00E9se\r\n\r\n#XFLD: Week \r\nWEEK=H\\u00E9t\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=\\u00D3r\\u00E1k alkalmaz\\u00E1sa\\:\r\n\r\n#XBUT\r\nALL_MISSING=\\u00D6sszes hi\\u00E1nyz\\u00F3 id\\u0151 ({0} \\u00F3ra)\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=T\\u00F6rl\\u00E9s\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=M\\u00E1sol\\u00E1s\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=Bejegyz\\u00E9s hozz\\u00E1ad\\u00E1sa\r\n\r\n#XFLD: label for duration\r\nDURATION=Id\\u0151tartam\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=\\u00D6sszid\\u0151tartam\r\n\r\n#XFLD: label for status\r\nSTATUS=St\\u00E1tus\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=Kezd\\u00E9s id\\u0151pontja\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=Kedvenc neve\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=Befejez\\u00E9s id\\u0151pontja\r\n\r\n#XFLD: label for note\r\nNOTE=Megjegyz\\u00E9s\r\n\r\n#XBUT: Done button\r\nDONE=K\\u00E9sz\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=Manu\\u00E1lis\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=Bejegyz\\u00E9s feldolgoz\\u00E1sa\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=Id\\u0151-hozz\\u00E1rendel\\u00E9s\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=V\\u00E1lassza ki a kedvenceket vagy a munka\\u00E1llom\\u00E1nyt\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=Munka\\u00E1llom\\u00E1ny kiv\\u00E1laszt\\u00E1sa\r\n\r\n# XTIT: Favorite\r\nFAVORITE=Kedvencek\r\n\r\n# XTIT: Worklist\r\nWORKLIST=Munka\\u00E1llom\\u00E1ny\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=Kedvenc hozz\\u00E1ad\\u00E1sa\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=Kedvencek szerkeszt\\u00E9se\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=T\\u00F6bb bet\\u00F6lt\\u00E9se...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=Bet\\u00F6lt\\u00E9s...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=Keres\\u00E9s folytat\\u00E1sa a szerveren...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=Bet\\u00F6lt\\u00E9s...\r\n\r\n#XFLD: BLANK\r\nEMPTY=\\u00DCres\r\n\r\n#XFLD: None\r\nNONE=Nincs\r\n\r\n#XFLD\r\nNO_WORKLIST=Nem \\u00E1ll rendelkez\\u00E9sre munka\\u00E1llom\\u00E1ny\r\n\r\n#XFLD\r\nNO_FAVORITE=Nem \\u00E1llnak rendelkez\\u00E9sre kedvencek\r\n\r\n# XTIT: Select\r\nSELECT={0} kiv\\u00E1laszt\\u00E1sa\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=Kiv\\u00E1laszt\\u00E1s\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=Keres\\u00E9s...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=\\u00F3\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=p\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=\\u00D3r\\u00E1k\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=Percek\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=YYYY. MMM DD.\r\n\r\n#XBUT:\r\nDETAIL=R\\u00E9szletek\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=Be\\u00E1ll\\u00EDt\\u00E1sok\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=A nem mentett adatok el lesznek vetve. Biztosan folytatja?\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=Nem mentett m\\u00F3dos\\u00EDt\\u00E1sok\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=K\\u00E9relem elk\\u00FCldve.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=K\\u00E9rem, adjon meg egy kedvenc nevet az id\\u0151-hozz\\u00E1rendel\\u00E9s beviteli mez\\u0151j\\u00E9ben.\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=K\\u00E9rem, t\\u00F6ltse ki a mez\\u0151ket, hogy a kedvencek k\\u00F6z\\u00E9 tudja menteni.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=K\\u00E9rem, adjon meg \\u00E9rv\\u00E9nyes id\\u0151tartamot.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=K\\u00E9rem, \\u00E9rv\\u00E9nyes kezd\\u0151 \\u00E9s z\\u00E1r\\u00F3 d\\u00E1tumot adjon meg.\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=A tervezet sikeresen elmentve.\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=Kedvenc l\\u00E9trehozva.\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=Kedvencek friss\\u00EDtve.\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=T\\u00F6r\\u00F6lve a kedvencekb\\u0151l.\r\n\r\n#XBUT:\r\nHELP=Seg\\u00EDts\\u00E9g\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED={0}/{1} \\u00F3ra lett be\\u00EDrva erre a h\\u00E9tre.\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=Kapcsolja be az el\\u0151zetes kit\\u00F6lt\\u00E9st, ha gyorsan fel szeretn\\u00E9 t\\u00F6lteni a h\\u00E9t \\u00F3r\\u00E1it az utols\\u00F3 sikeres bejegyz\\u00E9s alapj\\u00E1n.\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=N\\u00E9h\\u00E1ny bejegyz\\u00E9s helytelen. Vizsg\\u00E1lja meg a hib\\u00E1t, \\u00E9s jav\\u00EDtsa a bejegyz\\u00E9seket.\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT=Id\\u0151bejegyz\\u00E9s a k\\u00F6vetkez\\u0151h\\u00F6z\\: {0} \\u00E9s {1} tov\\u00E1bbi nap\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Id\\u0151bejegyz\\u00E9s feldolgoz\\u00E1sa\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE=Id\\u0151bejegyz\\u00E9s - {0}\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} \\u00F3ra {1} perc\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} \\u00F3 {1} p\r\n\r\n#XBUT: Button to reset\r\nRESET=Vissza\\u00E1ll\\u00EDt\\u00E1s\r\n\r\n#XBUT: Button to update\r\nUPDATE=Friss\\u00EDt\\u00E9s\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=Kedvenc hozz\\u00E1ad\\u00E1sa\r\n\r\n#XBUT: Button to create\r\nCREATE=L\\u00E9trehoz\\u00E1s\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=Aktu\\u00E1lis kedvencn\\u00E9v\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=\\u00DAj kedvencn\\u00E9v\r\n\r\n#XTIT: time\r\nTIME=Id\\u0151pont\r\n',
	"hcm/mytimesheet/i18n/i18n_it.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=Da\r\n\r\n#XFLD: label for to time\r\nTO=A\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=Annulla\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=Chiudi\r\n\r\n#XBUT: Button to accept\r\nOK=OK\r\n\r\n#XBUT: Button to affirm\r\nYES=S\\u00EC\r\n\r\n#XBUT: Button to decline\r\nNO=No\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=Salva bozza\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=Il mio timesheet\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=Errore interno\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=Nell\'applicazione si \\u00E8 verificato un errore interno legato al trattamento degli errori.\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=Elimina preferiti\r\n\r\n# XTIT: \r\nTIMESHEET=Inserimenti timesheet\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=Acquisizione rapida\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=Applica a\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=Dettagli\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=Crea inserimento orari\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=Crea inserimento per {0} giorni\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=Dettagli inserimento\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE=Dettagli inserimento per {0}\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=Crea inserimento per {0}\r\n\r\n# XTIT: Month short header\r\nMONTH_0=Gen\r\n# XTIT: Month short header\r\nMONTH_1=Feb\r\n# XTIT: Month short header\r\nMONTH_2=Mar\r\n# XTIT: Month short header\r\nMONTH_3=Apr\r\n# XTIT: Month short header\r\nMONTH_4=Mag\r\n# XTIT: Month short header\r\nMONTH_5=Giu\r\n# XTIT: Month short header\r\nMONTH_6=Lug\r\n# XTIT: Month short header\r\nMONTH_7=Ago\r\n# XTIT: Month short header\r\nMONTH_8=Set\r\n# XTIT: Month short header\r\nMONTH_9=Ott\r\n# XTIT: Month short header\r\nMONTH_10=Nov\r\n# XTIT: Month short header\r\nMONTH_11=Dic\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=Gennaio\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=Febbraio\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=Marzo\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=Aprile\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=Maggio\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=Giugno\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=Luglio\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=Agosto\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=Settembre\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=Ottobre\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=Novembre\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=Dicembre\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=Azione necessaria\r\n# XTIT: Legend filled day\r\nFILLED_DAY=Fatto\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=Approvazione in sospeso\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=Rifiutato\r\n# XFLD: Legend future working day\r\nWORKING_DAY=Giorno lavorativo\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=Giorno non lavorativo\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=Giorno selezionato\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=Giorno non lavorativo selezionato\r\n# XFLD: Legend current day\r\nCURRENT_DAY=Giorno corrente\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=Totale ore mancanti\\: {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1} ({2} ore)\r\n\r\n#XBUT: Button\r\nSAVE=Salva\r\n\r\n#XBUT: Button \r\nSUBMIT=Invia\r\n\r\n# XMSG\r\nFILL_ALL=Inserisci {0} ore per\\:\r\n\r\n#XFLD\r\nNO_TASK_TYPE=Nessun tipo di task\r\n\r\n#XFLD\r\nMISSING_DAYS=Giorni mancanti\\: {0}\r\n\r\n#XBUT: Button\r\nHOME=Pagina iniziale\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=Conferma\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=Conferma eliminazione\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=Conferma invio\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=Conferma bozza\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=Riepilogo di inserimenti orari selezionato per eliminazione\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=Riepilogo di inserimenti orari selezionato per invio\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=Riepilogo di inserimenti orari selezionato\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Numero di inserimenti\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=Numero di ore\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=Conferma\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR={0} ora\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} ore\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR={0} ora / {1} ore\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} ore / {1} ore\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=Obiettivo\\: {0} ore \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS={0} assegnazioni orari\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=1 assegnazione orari\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=Nessuna assegnazione\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=Nessun record\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS={0} ore approvate\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=Salva con tempo\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=Salva senza tempo\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=Elimina preferiti\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=Salva come Preferito\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=Gestisci Preferiti\r\n\r\n#XFLD: Week \r\nWEEK=Settimana\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=Applica ore a\\:\r\n\r\n#XBUT\r\nALL_MISSING=Tutti gli orari mancanti ({0} ore)\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=Elimina\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=Copia\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=Aggiungi inserimento\r\n\r\n#XFLD: label for duration\r\nDURATION=Durata\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=Durata totale\r\n\r\n#XFLD: label for status\r\nSTATUS=Stato\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=Ora di inizio\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=Nome Preferito\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=Ora di fine\r\n\r\n#XFLD: label for note\r\nNOTE=Nota\r\n\r\n#XBUT: Done button\r\nDONE=Fatto\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=Manuale\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=Elabora inserimento\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=Assegnazione orari\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=Seleziona preferito o lista di lavoro\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=Seleziona lista di lavoro\r\n\r\n# XTIT: Favorite\r\nFAVORITE=Preferiti\r\n\r\n# XTIT: Worklist\r\nWORKLIST=Lista di lavoro\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=Aggiungi Preferito\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=Elabora Preferiti\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=Carica altro...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=In caricamento ...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=Continua ricerca sul server...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=In caricamento ...\r\n\r\n#XFLD: BLANK\r\nEMPTY=Vuoto\r\n\r\n#XFLD: None\r\nNONE=Nessun elemento\r\n\r\n#XFLD\r\nNO_WORKLIST=Nessuna lista di lavoro disponibile\r\n\r\n#XFLD\r\nNO_FAVORITE=Nessun preferito disponibile\r\n\r\n# XTIT: Select\r\nSELECT=Seleziona {0}\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=Seleziona\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=Cerca...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=h\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=m\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=Ore\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=Minuti\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=DD MMM, YYYY\r\n\r\n#XBUT:\r\nDETAIL=Dettagli\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=Impostazioni\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=I dati non salvati andranno persi. Continuare?\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=Modifiche non salvate\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=Richiesta inviata.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=Inserisci un nome di un Preferito nel campo di input Assegnazione orari.\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=Inserisci valori da archiviare come Preferiti.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=Inserisci una durata valida.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=Inserisci un\'ora d\'inizio e di fine valide.\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=Bozza salvata correttamente.\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=Preferito creato.\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=Preferito aggiornato.\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=Preferito eliminato.\r\n\r\n#XBUT:\r\nHELP=Help\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED={0}/{1} ore inserite per questa settimana\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=Attiva Precompila per acquisire rapidamente ore della settimana in base all\'ultimo inserimento effettuato.\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=Alcuni inserimenti sono errati; verifica dettagli errore e correggi gli inserimenti.\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT=Inserimento orari per {0} e {1} pi\\u00F9 giorni\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Elabora inserimento orari\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE=Inserimento orari per {0}\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} ore {1} minuti\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\r\n\r\n#XBUT: Button to reset\r\nRESET=Resetta\r\n\r\n#XBUT: Button to update\r\nUPDATE=Aggiorna\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=Aggiungi Preferito\r\n\r\n#XBUT: Button to create\r\nCREATE=Crea\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=Nome Preferito attuale\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=Nuovo nome Preferito\r\n\r\n#XTIT: time\r\nTIME=Ora\r\n',
	"hcm/mytimesheet/i18n/i18n_iw.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=\\u05DE-\r\n\r\n#XFLD: label for to time\r\nTO=\\u05E2\\u05D3\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=\\u05D1\\u05D8\\u05DC\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=\\u05E1\\u05D2\\u05D5\\u05E8\r\n\r\n#XBUT: Button to accept\r\nOK=OK\r\n\r\n#XBUT: Button to affirm\r\nYES=\\u05DB\\u05DF\r\n\r\n#XBUT: Button to decline\r\nNO=\\u05DC\\u05D0\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=\\u05E9\\u05DE\\u05D5\\u05E8 \\u05D8\\u05D9\\u05D5\\u05D8\\u05D4\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=\\u05D2\\u05D9\\u05DC\\u05D9\\u05D5\\u05DF \\u05D4\\u05E9\\u05E2\\u05D5\\u05EA \\u05E9\\u05DC\\u05D9\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=\\u05E9\\u05D2\\u05D9\\u05D0\\u05D4 \\u05E4\\u05E0\\u05D9\\u05DE\\u05D9\\u05EA\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=\\u05E9\\u05D2\\u05D9\\u05D0\\u05D4 \\u05E4\\u05E0\\u05D9\\u05DE\\u05D9\\u05EA \\u05D4\\u05E7\\u05E9\\u05D5\\u05E8\\u05D4 \\u05DC\\u05D8\\u05D9\\u05E4\\u05D5\\u05DC \\u05D1\\u05E9\\u05D2\\u05D9\\u05D0\\u05D5\\u05EA \\u05D0\\u05D9\\u05E8\\u05E2\\u05D4 \\u05D1\\u05D9\\u05D9\\u05E9\\u05D5\\u05DD.\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=\\u05DE\\u05D7\\u05E7 \\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD\r\n\r\n# XTIT: \r\nTIMESHEET=\\u05D4\\u05D6\\u05E0\\u05D5\\u05EA \\u05D1\\u05D2\\u05D9\\u05DC\\u05D9\\u05D5\\u05DF \\u05E9\\u05E2\\u05D5\\u05EA\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=\\u05D4\\u05D6\\u05E0\\u05D4 \\u05DE\\u05D4\\u05D9\\u05E8\\u05D4\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=\\u05D4\\u05D7\\u05DC \\u05E2\\u05DC\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=\\u05E4\\u05E8\\u05D8\\u05D9\\u05DD\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=\\u05E6\\u05D5\\u05E8 \\u05E8\\u05D9\\u05E9\\u05D5\\u05DD \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=\\u05E6\\u05D5\\u05E8 \\u05D4\\u05D6\\u05E0\\u05D4 \\u05E2\\u05D1\\u05D5\\u05E8 {0} \\u05D9\\u05DE\\u05D9\\u05DD\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=\\u05E4\\u05E8\\u05D8\\u05D9 \\u05D4\\u05D6\\u05E0\\u05D4\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE=\\u05E4\\u05E8\\u05D8\\u05D9 \\u05D4\\u05D6\\u05E0\\u05D4 \\u05E2\\u05D1\\u05D5\\u05E8 {0}\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=\\u05E6\\u05D5\\u05E8 \\u05D4\\u05D6\\u05E0\\u05D4 \\u05E2\\u05D1\\u05D5\\u05E8 {0}\r\n\r\n# XTIT: Month short header\r\nMONTH_0=\\u05D9\\u05E0\\u05D5\\u05D0\\u05E8\r\n# XTIT: Month short header\r\nMONTH_1=\\u05E4\\u05D1\\u05E8\\u05D5\\u05D0\\u05E8\r\n# XTIT: Month short header\r\nMONTH_2=\\u05DE\\u05E8\\u05E5\r\n# XTIT: Month short header\r\nMONTH_3=\\u05D0\\u05E4\\u05E8\\u05D9\\u05DC\r\n# XTIT: Month short header\r\nMONTH_4=\\u05DE\\u05D0\\u05D9\r\n# XTIT: Month short header\r\nMONTH_5=\\u05D9\\u05D5\\u05E0\\u05D9\r\n# XTIT: Month short header\r\nMONTH_6=\\u05D9\\u05D5\\u05DC\\u05D9\r\n# XTIT: Month short header\r\nMONTH_7=\\u05D0\\u05D5\\u05D2\\u05D5\\u05E1\\u05D8\r\n# XTIT: Month short header\r\nMONTH_8=\\u05E1\\u05E4\\u05D8\\u05DE\\u05D1\\u05E8\r\n# XTIT: Month short header\r\nMONTH_9=\\u05D0\\u05D5\\u05E7\\u05D8\\u05D5\\u05D1\\u05E8\r\n# XTIT: Month short header\r\nMONTH_10=\\u05E0\\u05D5\\u05D1\\u05DE\\u05D1\\u05E8\r\n# XTIT: Month short header\r\nMONTH_11=\\u05D3\\u05E6\\u05DE\\u05D1\\u05E8\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=\\u05D9\\u05E0\\u05D5\\u05D0\\u05E8\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=\\u05E4\\u05D1\\u05E8\\u05D5\\u05D0\\u05E8\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=\\u05DE\\u05E8\\u05E5\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=\\u05D0\\u05E4\\u05E8\\u05D9\\u05DC\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=\\u05DE\\u05D0\\u05D9\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=\\u05D9\\u05D5\\u05E0\\u05D9\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=\\u05D9\\u05D5\\u05DC\\u05D9\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=\\u05D0\\u05D5\\u05D2\\u05D5\\u05E1\\u05D8\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=\\u05E1\\u05E4\\u05D8\\u05DE\\u05D1\\u05E8\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=\\u05D0\\u05D5\\u05E7\\u05D8\\u05D5\\u05D1\\u05E8\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=\\u05E0\\u05D5\\u05D1\\u05DE\\u05D1\\u05E8\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=\\u05D3\\u05E6\\u05DE\\u05D1\\u05E8\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=\\u05E4\\u05E2\\u05D5\\u05DC\\u05D4 \\u05E0\\u05D3\\u05E8\\u05E9\\u05EA\r\n# XTIT: Legend filled day\r\nFILLED_DAY=\\u05D1\\u05D5\\u05E6\\u05E2\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=\\u05E0\\u05D3\\u05E8\\u05E9\\u05EA \\u05E4\\u05E2\\u05D9\\u05DC\\u05D5\\u05EA \\u05DE\\u05E6\\u05D3 \\u05D4\\u05DE\\u05D0\\u05E9\\u05E8\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=\\u05E0\\u05D3\\u05D7\\u05D4\r\n# XFLD: Legend future working day\r\nWORKING_DAY=\\u05D9\\u05D5\\u05DD \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=\\u05D9\\u05D5\\u05DD \\u05E9\\u05D0\\u05D9\\u05E0\\u05D5 \\u05D9\\u05D5\\u05DD \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=\\u05D9\\u05D5\\u05DD \\u05E9\\u05E0\\u05D1\\u05D7\\u05E8\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=\\u05D9\\u05D5\\u05DD \\u05E0\\u05D1\\u05D7\\u05E8 \\u05E9\\u05D0\\u05D9\\u05E0\\u05D5 \\u05D9\\u05D5\\u05DD \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\r\n# XFLD: Legend current day\r\nCURRENT_DAY=\\u05D9\\u05D5\\u05DD \\u05E0\\u05D5\\u05DB\\u05D7\\u05D9\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=\\u05E1\\u05D4"\\u05DB \\u05E9\\u05E2\\u05D5\\u05EA \\u05D7\\u05E1\\u05E8\\u05D5\\u05EA\\: {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1} ({2} \\u05E9\\u05E2\\u05D5\\u05EA)\r\n\r\n#XBUT: Button\r\nSAVE=\\u05E9\\u05DE\\u05D5\\u05E8\r\n\r\n#XBUT: Button \r\nSUBMIT=\\u05D4\\u05D2\\u05E9\r\n\r\n# XMSG\r\nFILL_ALL=\\u05D4\\u05D6\\u05DF {0} \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05E8\\:\r\n\r\n#XFLD\r\nNO_TASK_TYPE=\\u05D0\\u05D9\\u05DF \\u05E1\\u05D5\\u05D2 \\u05DE\\u05E9\\u05D9\\u05DE\\u05D4\r\n\r\n#XFLD\r\nMISSING_DAYS=\\u05D9\\u05DE\\u05D9\\u05DD \\u05D7\\u05E1\\u05E8\\u05D9\\u05DD\\: {0}\r\n\r\n#XBUT: Button\r\nHOME=\\u05D3\\u05E3 \\u05D4\\u05D1\\u05D9\\u05EA\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=\\u05D0\\u05D9\\u05E9\\u05D5\\u05E8\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=\\u05D0\\u05E9\\u05E8 \\u05DE\\u05D7\\u05D9\\u05E7\\u05D4\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=\\u05D0\\u05E9\\u05E8 \\u05D4\\u05D2\\u05E9\\u05D4\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=\\u05D0\\u05E9\\u05E8 \\u05D8\\u05D9\\u05D5\\u05D8\\u05D4\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=\\u05E1\\u05D9\\u05DB\\u05D5\\u05DD \\u05E9\\u05DC \\u05E8\\u05D9\\u05E9\\u05D5\\u05DE\\u05D9 \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4 \\u05E9\\u05E0\\u05D1\\u05D7\\u05E8\\u05D5 \\u05DC\\u05DE\\u05D7\\u05D9\\u05E7\\u05D4\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=\\u05E1\\u05D9\\u05DB\\u05D5\\u05DD \\u05E9\\u05DC \\u05E8\\u05D9\\u05E9\\u05D5\\u05DE\\u05D9 \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4 \\u05E9\\u05E0\\u05D1\\u05D7\\u05E8\\u05D5 \\u05DC\\u05D4\\u05D2\\u05E9\\u05D4\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=\\u05E1\\u05D9\\u05DB\\u05D5\\u05DD \\u05E9\\u05DC \\u05E8\\u05D9\\u05E9\\u05D5\\u05DE\\u05D9 \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4 \\u05E9\\u05E0\\u05D1\\u05D7\\u05E8\\u05D5\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u05DE\\u05E1\\u05E4\\u05E8 \\u05D4\\u05D6\\u05E0\\u05D5\\u05EA\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u05DE\\u05E1\\u05E4\\u05E8 \\u05E9\\u05E2\\u05D5\\u05EA\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=\\u05D0\\u05E9\\u05E8\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR=\\u05E9\\u05E2\\u05D4 {0} \r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} \\u05E9\\u05E2\\u05D5\\u05EA\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR=\\u05E9\\u05E2\\u05D4 {0} / {1} \\u05E9\\u05E2\\u05D5\\u05EA\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} \\u05E9\\u05E2\\u05D5\\u05EA / {1} \\u05E9\\u05E2\\u05D5\\u05EA\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=\\u05D9\\u05E2\\u05D3\\: {0} \\u05E9\\u05E2\\u05D5\\u05EA \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS={0} \\u05D4\\u05E7\\u05E6\\u05D0\\u05D5\\u05EA \\u05D6\\u05DE\\u05DF\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=\\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05D6\\u05DE\\u05DF 1\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=\\u05DC\\u05DC\\u05D0 \\u05D4\\u05E7\\u05E6\\u05D0\\u05D5\\u05EA\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=\\u05D0\\u05D9\\u05DF \\u05E8\\u05E9\\u05D5\\u05DE\\u05D5\\u05EA\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS={0} \\u05E9\\u05E2\\u05D5\\u05EA \\u05D0\\u05D5\\u05E9\\u05E8\\u05D5\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=\\u05E9\\u05DE\\u05D5\\u05E8 \\u05E2\\u05DD \\u05D6\\u05DE\\u05DF\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=\\u05E9\\u05DE\\u05D5\\u05E8 \\u05DC\\u05DC\\u05D0 \\u05D6\\u05DE\\u05DF\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=\\u05DE\\u05D7\\u05E7 \\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=\\u05E9\\u05DE\\u05D5\\u05E8 \\u05DB\\u05DE\\u05D5\\u05E2\\u05D3\\u05E3\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=\\u05E0\\u05D4\\u05DC \\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD\r\n\r\n#XFLD: Week \r\nWEEK=\\u05E9\\u05D1\\u05D5\\u05E2\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=\\u05D4\\u05D7\\u05DC \\u05E9\\u05E2\\u05D5\\u05EA \\u05DC\\:\r\n\r\n#XBUT\r\nALL_MISSING=\\u05DB\\u05DC \\u05D4\\u05D6\\u05DE\\u05DF \\u05D4\\u05D7\\u05E1\\u05E8 ({0} \\u05E9\\u05E2\\u05D5\\u05EA)\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=\\u05DE\\u05D7\\u05E7\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=\\u05D4\\u05E2\\u05EA\\u05E7\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05D4\\u05D6\\u05E0\\u05D4\r\n\r\n#XFLD: label for duration\r\nDURATION=\\u05DE\\u05E9\\u05DA \\u05D6\\u05DE\\u05DF\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=\\u05DE\\u05E9\\u05DA \\u05D6\\u05DE\\u05DF \\u05DB\\u05D5\\u05DC\\u05DC\r\n\r\n#XFLD: label for status\r\nSTATUS=\\u05E1\\u05D8\\u05D0\\u05D8\\u05D5\\u05E1\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=\\u05E9\\u05E2\\u05EA \\u05D4\\u05EA\\u05D7\\u05DC\\u05D4\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=\\u05E9\\u05DD \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=\\u05E9\\u05E2\\u05EA \\u05E1\\u05D9\\u05D5\\u05DD\r\n\r\n#XFLD: label for note\r\nNOTE=\\u05D4\\u05E2\\u05E8\\u05D4\r\n\r\n#XBUT: Done button\r\nDONE=\\u05D1\\u05D5\\u05E6\\u05E2\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=\\u05D9\\u05D3\\u05E0\\u05D9\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=\\u05E2\\u05E8\\u05D5\\u05DA \\u05D4\\u05D6\\u05E0\\u05D4\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=\\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05E9\\u05E2\\u05D4\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=\\u05D1\\u05D7\\u05E8 \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05D0\\u05D5 \\u05E8\\u05E9\\u05D9\\u05DE\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=\\u05D1\\u05D7\\u05E8 \\u05E8\\u05E9\\u05D9\\u05DE\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\r\n\r\n# XTIT: Favorite\r\nFAVORITE=\\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD\r\n\r\n# XTIT: Worklist\r\nWORKLIST=\\u05E8\\u05E9\\u05D9\\u05DE\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=\\u05E2\\u05E8\\u05D5\\u05DA \\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=\\u05D8\\u05E2\\u05DF \\u05E2\\u05D5\\u05D3...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=\\u05D8\\u05D5\\u05E2\\u05DF ...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=\\u05D4\\u05DE\\u05E9\\u05DA \\u05D7\\u05D9\\u05E4\\u05D5\\u05E9 \\u05D1\\u05E9\\u05E8\\u05EA...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u05D8\\u05D5\\u05E2\\u05DF ...\r\n\r\n#XFLD: BLANK\r\nEMPTY=\\u05E8\\u05D9\\u05E7\r\n\r\n#XFLD: None\r\nNONE=\\u05D0\\u05D9\\u05DF\r\n\r\n#XFLD\r\nNO_WORKLIST=\\u05D0\\u05D9\\u05DF \\u05E8\\u05E9\\u05D9\\u05DE\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4 \\u05D6\\u05DE\\u05D9\\u05E0\\u05D4\r\n\r\n#XFLD\r\nNO_FAVORITE=\\u05D0\\u05D9\\u05DF \\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD \\u05D6\\u05DE\\u05D9\\u05E0\\u05D9\\u05DD\r\n\r\n# XTIT: Select\r\nSELECT=\\u05D1\\u05D7\\u05E8 {0}\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=\\u05D1\\u05D7\\u05E8\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=\\u05D7\\u05E4\\u05E9...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=\\u05E9\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=\\u05D3\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=\\u05E9\\u05E2\\u05D5\\u05EA\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=\\u05D3\\u05E7\\u05D5\\u05EA\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=DD MMM, YYYY\r\n\r\n#XBUT:\r\nDETAIL=\\u05E4\\u05E8\\u05D8\\u05D9\\u05DD\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=\\u05D4\\u05D2\\u05D3\\u05E8\\u05D5\\u05EA\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=\\u05E0\\u05EA\\u05D5\\u05E0\\u05D9\\u05DD \\u05E9\\u05DC\\u05D0 \\u05D9\\u05D9\\u05E9\\u05DE\\u05E8\\u05D5 \\u05D9\\u05D5\\u05E1\\u05E8\\u05D5. \\u05D4\\u05D0\\u05DD \\u05D0\\u05EA\\u05D4 \\u05D1\\u05D8\\u05D5\\u05D7 \\u05E9\\u05D1\\u05E8\\u05E6\\u05D5\\u05E0\\u05DA \\u05DC\\u05D4\\u05DE\\u05E9\\u05D9\\u05DA?\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=\\u05E9\\u05D9\\u05E0\\u05D5\\u05D9\\u05D9\\u05DD \\u05E9\\u05DC\\u05D0 \\u05E0\\u05E9\\u05DE\\u05E8\\u05D5\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=\\u05D4\\u05D1\\u05E7\\u05E9\\u05D4 \\u05D4\\u05D5\\u05D2\\u05E9\\u05D4.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=\\u05D4\\u05D6\\u05DF \\u05E9\\u05DD \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05D1\\u05E9\\u05D3\\u05D4 \\u05D4\\u05E7\\u05DC\\u05D8 \\u05E9\\u05DC \\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05D4\\u05E9\\u05E2\\u05D4.\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=\\u05E6\\u05D5\\u05E8 \\u05D4\\u05D6\\u05E0\\u05D5\\u05EA \\u05DC\\u05D0\\u05D7\\u05E1\\u05D5\\u05DF \\u05DB\\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05E9\\u05DC\\u05DA.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=\\u05D4\\u05D6\\u05DF \\u05DE\\u05E9\\u05DA \\u05D6\\u05DE\\u05DF \\u05D7\\u05D5\\u05E7\\u05D9.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=\\u05D4\\u05D6\\u05DF \\u05D6\\u05DE\\u05DF \\u05D4\\u05EA\\u05D7\\u05DC\\u05D4 \\u05D5\\u05D6\\u05DE\\u05DF \\u05E1\\u05D9\\u05D5\\u05DD \\u05D7\\u05D5\\u05E7\\u05D9\\u05D9\\u05DD.\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=\\u05D4\\u05D8\\u05D9\\u05D5\\u05D8\\u05D4 \\u05E0\\u05E9\\u05DE\\u05E8\\u05D4 \\u05D1\\u05D4\\u05E6\\u05DC\\u05D7\\u05D4.\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=\\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05E0\\u05D5\\u05E6\\u05E8.\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=\\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05E2\\u05D5\\u05D3\\u05DB\\u05DF.\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=\\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05E0\\u05DE\\u05D7\\u05E7.\r\n\r\n#XBUT:\r\nHELP=\\u05E2\\u05D6\\u05E8\\u05D4\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED={0}/{1} \\u05E9\\u05E2\\u05D5\\u05EA \\u05D4\\u05D5\\u05D6\\u05E0\\u05D5 \\u05E2\\u05D1\\u05D5\\u05E8 \\u05E9\\u05D1\\u05D5\\u05E2 \\u05D6\\u05D4\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=\\u05D4\\u05E4\\u05E2\\u05DC \\u05DE\\u05D9\\u05DC\\u05D5\\u05D9 \\u05DE\\u05E8\\u05D0\\u05E9 \\u05DB\\u05D3\\u05D9 \\u05DC\\u05D4\\u05D6\\u05D9\\u05DF \\u05D1\\u05DE\\u05D4\\u05D9\\u05E8\\u05D5\\u05EA \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05E8 \\u05D4\\u05E9\\u05D1\\u05D5\\u05E2 \\u05E2\\u05DC \\u05D1\\u05E1\\u05D9\\u05E1 \\u05D4\\u05D4\\u05D6\\u05E0\\u05D4 \\u05D4\\u05DE\\u05D5\\u05E6\\u05DC\\u05D7\\u05EA \\u05D4\\u05D0\\u05D7\\u05E8\\u05D5\\u05E0\\u05D4 \\u05E9\\u05DC\\u05DA.\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=\\u05D7\\u05DC\\u05E7 \\u05DE\\u05D4\\u05D4\\u05D6\\u05E0\\u05D5\\u05EA \\u05E9\\u05D2\\u05D5\\u05D9\\u05D5\\u05EA. \\u05E1\\u05E7\\u05D5\\u05E8 \\u05D0\\u05EA \\u05E4\\u05E8\\u05D8\\u05D9 \\u05D4\\u05E9\\u05D2\\u05D9\\u05D0\\u05D4 \\u05D5\\u05EA\\u05E7\\u05DF \\u05D0\\u05EA \\u05D4\\u05D4\\u05D6\\u05E0\\u05D5\\u05EA.\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT=\\u05D4\\u05D6\\u05E0\\u05EA \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05E8 {0} \\u05D5-{1} \\u05D9\\u05DE\\u05D9\\u05DD \\u05E0\\u05D5\\u05E1\\u05E4\\u05D9\\u05DD\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u05E2\\u05E8\\u05D5\\u05DA \\u05E8\\u05D9\\u05E9\\u05D5\\u05DD \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE=\\u05E8\\u05D9\\u05E9\\u05D5\\u05DD \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4 \\u05E2\\u05D1\\u05D5\\u05E8 {0}\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} \\u05E9\\u05E2\\u05D5\\u05EA {1} \\u05D3\\u05E7\\u05D5\\u05EA\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} \\u05E9\\u05E2\\u05D5\\u05EA {1} \\u05D3\\u05E7\\u05D5\\u05EA\r\n\r\n#XBUT: Button to reset\r\nRESET=\\u05D0\\u05E4\\u05E1\r\n\r\n#XBUT: Button to update\r\nUPDATE=\\u05E2\\u05D3\\u05DB\\u05DF\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3\r\n\r\n#XBUT: Button to create\r\nCREATE=\\u05E6\\u05D5\\u05E8\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=\\u05E9\\u05DD \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05E0\\u05D5\\u05DB\\u05D7\\u05D9\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=\\u05E9\\u05DD \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05D7\\u05D3\\u05E9\r\n\r\n#XTIT: time\r\nTIME=\\u05E9\\u05E2\\u05D4\r\n',
	"hcm/mytimesheet/i18n/i18n_ja.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=\\u958B\\u59CB\r\n\r\n#XFLD: label for to time\r\nTO=\\u7D42\\u4E86\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=\\u4E2D\\u6B62\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=\\u9589\\u3058\\u308B\r\n\r\n#XBUT: Button to accept\r\nOK=OK\r\n\r\n#XBUT: Button to affirm\r\nYES=\\u306F\\u3044\r\n\r\n#XBUT: Button to decline\r\nNO=\\u3044\\u3044\\u3048\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=\\u30C9\\u30E9\\u30D5\\u30C8\\u4FDD\\u5B58\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=\\u30BF\\u30A4\\u30E0\\u30B7\\u30FC\\u30C8\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=\\u5185\\u90E8\\u30A8\\u30E9\\u30FC\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=\\u30A8\\u30E9\\u30FC\\u51E6\\u7406\\u306B\\u95A2\\u9023\\u3059\\u308B\\u5185\\u90E8\\u30A8\\u30E9\\u30FC\\u304C\\u30A2\\u30D7\\u30EA\\u30B1\\u30FC\\u30B7\\u30E7\\u30F3\\u3067\\u767A\\u751F\\u3057\\u307E\\u3057\\u305F\\u3002\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306E\\u524A\\u9664\r\n\r\n# XTIT: \r\nTIMESHEET=\\u30BF\\u30A4\\u30E0\\u30B7\\u30FC\\u30C8\\u5165\\u529B\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=\\u7C21\\u6613\\u5165\\u529B\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=\\u9069\\u7528\\u5148\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=\\u8A73\\u7D30\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=\\u6642\\u9593\\u5165\\u529B\\u767B\\u9332\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE={0} \\u65E5\\u9593\\u306E\\u5165\\u529B\\u767B\\u9332\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=\\u5165\\u529B\\u8A73\\u7D30\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE={0} \\u306E\\u5165\\u529B\\u8A73\\u7D30\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE={0} \\u306E\\u5165\\u529B\\u767B\\u9332\r\n\r\n# XTIT: Month short header\r\nMONTH_0=1 \\u6708\r\n# XTIT: Month short header\r\nMONTH_1=2 \\u6708\r\n# XTIT: Month short header\r\nMONTH_2=3 \\u6708\r\n# XTIT: Month short header\r\nMONTH_3=4 \\u6708\r\n# XTIT: Month short header\r\nMONTH_4=5 \\u6708\r\n# XTIT: Month short header\r\nMONTH_5=6 \\u6708\r\n# XTIT: Month short header\r\nMONTH_6=7 \\u6708\r\n# XTIT: Month short header\r\nMONTH_7=8 \\u6708\r\n# XTIT: Month short header\r\nMONTH_8=9 \\u6708\r\n# XTIT: Month short header\r\nMONTH_9=10 \\u6708\r\n# XTIT: Month short header\r\nMONTH_10=11 \\u6708\r\n# XTIT: Month short header\r\nMONTH_11=12 \\u6708\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=1 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=2 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=3 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=4 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=5 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=6 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=7 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=8 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=9 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=10 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=11 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=12 \\u6708\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=\\u30A2\\u30AF\\u30B7\\u30E7\\u30F3\\u5FC5\\u9808\r\n# XTIT: Legend filled day\r\nFILLED_DAY=\\u5B8C\\u4E86\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=\\u627F\\u8A8D\\u8005\\u30A2\\u30AF\\u30B7\\u30E7\\u30F3\\u5FC5\\u9808\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=\\u5374\\u4E0B\\u6E08\r\n# XFLD: Legend future working day\r\nWORKING_DAY=\\u52E4\\u52D9\\u65E5\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=\\u4F11\\u65E5\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=\\u9078\\u629E\\u65E5\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=\\u9078\\u629E\\u6E08\\u306E\\u4F11\\u65E5\r\n# XFLD: Legend current day\r\nCURRENT_DAY=\\u73FE\\u5728\\u65E5\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=\\u5408\\u8A08\\u4E0D\\u8DB3\\u6642\\u9593\\u6570\\:  {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1} ({2} \\u6642\\u9593)\r\n\r\n#XBUT: Button\r\nSAVE=\\u4FDD\\u5B58\r\n\r\n#XBUT: Button \r\nSUBMIT=\\u9001\\u4FE1\r\n\r\n# XMSG\r\nFILL_ALL={0} \\u6642\\u9593\\u3092\\u5165\\u529B\\: \r\n\r\n#XFLD\r\nNO_TASK_TYPE=\\u30BF\\u30B9\\u30AF\\u30BF\\u30A4\\u30D7\\u306A\\u3057\r\n\r\n#XFLD\r\nMISSING_DAYS=\\u4E0D\\u8DB3\\u65E5\\u6570\\: {0}\r\n\r\n#XBUT: Button\r\nHOME=\\u30DB\\u30FC\\u30E0\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=\\u78BA\\u8A8D\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=\\u524A\\u9664\\u78BA\\u8A8D\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=\\u9001\\u4FE1\\u78BA\\u8A8D\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=\\u30C9\\u30E9\\u30D5\\u30C8\\u78BA\\u8A8D\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=\\u524A\\u9664\\u5BFE\\u8C61\\u3068\\u3057\\u3066\\u9078\\u629E\\u3055\\u308C\\u305F\\u6642\\u9593\\u5165\\u529B\\u306E\\u30B5\\u30DE\\u30EA\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=\\u9001\\u4FE1\\u5BFE\\u8C61\\u3068\\u3057\\u3066\\u9078\\u629E\\u3055\\u308C\\u305F\\u6642\\u9593\\u5165\\u529B\\u306E\\u30B5\\u30DE\\u30EA\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=\\u9078\\u629E\\u3055\\u308C\\u305F\\u6642\\u9593\\u5165\\u529B\\u306E\\u30B5\\u30DE\\u30EA\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u5165\\u529B\\u6570\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u6642\\u9593\\u6570\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=\\u78BA\\u8A8D\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR={0} \\u6642\\u9593\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} \\u6642\\u9593\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR={0} \\u6642\\u9593/{1} \\u6642\\u9593\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} \\u6642\\u9593/{1} \\u6642\\u9593\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=\\u76EE\\u6A19\\:  {0} \\u6642\\u9593 \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS={0} \\u6642\\u9593\\u5272\\u5F53\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=1 \\u6642\\u9593\\u5272\\u5F53\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=\\u5272\\u5F53\\u306A\\u3057\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=\\u30EC\\u30B3\\u30FC\\u30C9\\u306A\\u3057\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS={0} \\u6642\\u9593\\u304C\\u627F\\u8A8D\\u3055\\u308C\\u307E\\u3057\\u305F\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=\\u4FDD\\u5B58 (\\u6642\\u9593\\u3042\\u308A)\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=\\u4FDD\\u5B58 (\\u6642\\u9593\\u306A\\u3057)\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306E\\u524A\\u9664\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u3068\\u3057\\u3066\\u4FDD\\u5B58\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306E\\u7BA1\\u7406\r\n\r\n#XFLD: Week \r\nWEEK=\\u9031\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=\\u6642\\u9593\\u9069\\u7528\\u5148\\:\r\n\r\n#XBUT\r\nALL_MISSING=\\u5168\\u4E0D\\u8DB3\\u6642\\u9593 ({0} \\u6642\\u9593)\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=\\u524A\\u9664\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=\\u30B3\\u30D4\\u30FC\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=\\u5165\\u529B\\u8FFD\\u52A0\r\n\r\n#XFLD: label for duration\r\nDURATION=\\u671F\\u9593\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=\\u5408\\u8A08\\u671F\\u9593\r\n\r\n#XFLD: label for status\r\nSTATUS=\\u30B9\\u30C6\\u30FC\\u30BF\\u30B9\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=\\u958B\\u59CB\\u6642\\u523B\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306E\\u540D\\u79F0\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=\\u7D42\\u4E86\\u6642\\u523B\r\n\r\n#XFLD: label for note\r\nNOTE=\\u30E1\\u30E2\r\n\r\n#XBUT: Done button\r\nDONE=\\u5B8C\\u4E86\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=\\u30DE\\u30CB\\u30E5\\u30A2\\u30EB\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=\\u5165\\u529B\\u306E\\u7DE8\\u96C6\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=\\u6642\\u9593\\u5272\\u5F53\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u307E\\u305F\\u306F\\u30EF\\u30FC\\u30AF\\u30EA\\u30B9\\u30C8\\u306E\\u9078\\u629E\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=\\u30EF\\u30FC\\u30AF\\u30EA\\u30B9\\u30C8\\u9078\\u629E\r\n\r\n# XTIT: Favorite\r\nFAVORITE=\\u304A\\u6C17\\u306B\\u5165\\u308A\r\n\r\n# XTIT: Worklist\r\nWORKLIST=\\u30EF\\u30FC\\u30AF\\u30EA\\u30B9\\u30C8\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u8FFD\\u52A0\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u7DE8\\u96C6\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=\\u8FFD\\u52A0\\u30ED\\u30FC\\u30C9...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=\\u30ED\\u30FC\\u30C9\\u4E2D...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=\\u30B5\\u30FC\\u30D0\\u3067\\u306E\\u691C\\u7D22\\u3092\\u7D9A\\u884C...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u30ED\\u30FC\\u30C9\\u4E2D...\r\n\r\n#XFLD: BLANK\r\nEMPTY=\\u7A7A\\u767D\r\n\r\n#XFLD: None\r\nNONE=\\u306A\\u3057\r\n\r\n#XFLD\r\nNO_WORKLIST=\\u30EF\\u30FC\\u30AF\\u30EA\\u30B9\\u30C8\\u306A\\u3057\r\n\r\n#XFLD\r\nNO_FAVORITE=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306A\\u3057\r\n\r\n# XTIT: Select\r\nSELECT={0} \\u306E\\u9078\\u629E\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=\\u9078\\u629E\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=\\u691C\\u7D22...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=\\u6642\\u9593\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=\\u5206\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=\\u6642\\u9593\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=\\u5206\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=YYYY/MM/DD\r\n\r\n#XBUT:\r\nDETAIL=\\u8A73\\u7D30\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=\\u8A2D\\u5B9A\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=\\u672A\\u4FDD\\u5B58\\u306E\\u30C7\\u30FC\\u30BF\\u306F\\u3059\\u3079\\u3066\\u7834\\u68C4\\u3055\\u308C\\u307E\\u3059\\u3002\\u7D9A\\u884C\\u3057\\u307E\\u3059\\u304B\\u3002\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=\\u672A\\u4FDD\\u5B58\\u306E\\u5909\\u66F4\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=\\u7533\\u8ACB\\u304C\\u9001\\u4FE1\\u3055\\u308C\\u307E\\u3057\\u305F\\u3002\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=\\u6642\\u9593\\u5272\\u5F53\\u5165\\u529B\\u9805\\u76EE\\u306B\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306E\\u540D\\u79F0\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u3068\\u3057\\u3066\\u4FDD\\u5B58\\u3059\\u308B\\u9805\\u76EE\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=\\u6709\\u52B9\\u306A\\u671F\\u9593\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=\\u6709\\u52B9\\u306A\\u958B\\u59CB\\u6642\\u523B\\u304A\\u3088\\u3073\\u7D42\\u4E86\\u6642\\u523B\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=\\u30C9\\u30E9\\u30D5\\u30C8\\u304C\\u4FDD\\u5B58\\u3055\\u308C\\u307E\\u3057\\u305F\\u3002\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u304C\\u767B\\u9332\\u3055\\u308C\\u307E\\u3057\\u305F\\u3002\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u304C\\u66F4\\u65B0\\u3055\\u308C\\u307E\\u3057\\u305F\\u3002\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u304C\\u524A\\u9664\\u3055\\u308C\\u307E\\u3057\\u305F\\u3002\r\n\r\n#XBUT:\r\nHELP=\\u30D8\\u30EB\\u30D7\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED=\\u4ECA\\u9031\\u306B\\u3064\\u3044\\u3066 {0}/{1} \\u6642\\u9593\\u304C\\u5165\\u529B\\u3055\\u308C\\u307E\\u3057\\u305F\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=\\u4E8B\\u524D\\u5165\\u529B\\u3092\\u6709\\u52B9\\u306B\\u3059\\u308B\\u3068\\u3001\\u524D\\u56DE\\u306E\\u9069\\u5207\\u306A\\u5165\\u529B\\u306B\\u57FA\\u3065\\u3044\\u3066\\u9031\\u306E\\u6642\\u9593\\u3092\\u7C21\\u5358\\u306B\\u5165\\u529B\\u3059\\u308B\\u3053\\u3068\\u304C\\u3067\\u304D\\u307E\\u3059\\u3002\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=\\u5165\\u529B\\u306E\\u4E00\\u90E8\\u304C\\u4E0D\\u9069\\u5207\\u3067\\u3059\\u3002\\u30A8\\u30E9\\u30FC\\u8A73\\u7D30\\u3092\\u78BA\\u8A8D\\u3057\\u3001\\u5165\\u529B\\u3092\\u4FEE\\u6B63\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT={0} \\u65E5\\u9593\\u3068\\u3055\\u3089\\u306B {1} \\u65E5\\u9593\\u306E\\u6642\\u9593\\u5165\\u529B\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u6642\\u9593\\u5165\\u529B\\u7DE8\\u96C6\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE={0} \\u65E5\\u306E\\u6642\\u9593\\u5165\\u529B\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} \\u6642\\u9593 {1} \\u5206\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\r\n\r\n#XBUT: Button to reset\r\nRESET=\\u30EA\\u30BB\\u30C3\\u30C8\r\n\r\n#XBUT: Button to update\r\nUPDATE=\\u66F4\\u65B0\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u8FFD\\u52A0\r\n\r\n#XBUT: Button to create\r\nCREATE=\\u767B\\u9332\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=\\u73FE\\u5728\\u306E\\u304A\\u6C17\\u306B\\u5165\\u308A\\u540D\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=\\u65B0\\u898F\\u304A\\u6C17\\u306B\\u5165\\u308A\\u540D\r\n\r\n#XTIT: time\r\nTIME=\\u6642\\u9593\r\n',
	"hcm/mytimesheet/i18n/i18n_no.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=Fra\r\n\r\n#XFLD: label for to time\r\nTO=Til\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=Avbryt\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=Lukk\r\n\r\n#XBUT: Button to accept\r\nOK=OK\r\n\r\n#XBUT: Button to affirm\r\nYES=Ja\r\n\r\n#XBUT: Button to decline\r\nNO=Nei\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=Lagre utkast\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=Min tidsregistrering\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=Intern feil\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=En intern feil relatert til feilbehandling har oppst\\u00E5tt i applikasjonen\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=Slett Favoritter\r\n\r\n# XTIT: \r\nTIMESHEET=Tidsregistreringsposter\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=Hurtigregistrering\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=Bruk p\\u00E5\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=Detaljer\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=Opprett tidsregistrering\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=Registrer timer for {0} dager\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=Postdetaljer\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE=Registreringsdetaljer for {0}\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=Registrer timer for {0}\r\n\r\n# XTIT: Month short header\r\nMONTH_0=Jan\r\n# XTIT: Month short header\r\nMONTH_1=Feb\r\n# XTIT: Month short header\r\nMONTH_2=Mar\r\n# XTIT: Month short header\r\nMONTH_3=Apr\r\n# XTIT: Month short header\r\nMONTH_4=Mai\r\n# XTIT: Month short header\r\nMONTH_5=Jun\r\n# XTIT: Month short header\r\nMONTH_6=Jul\r\n# XTIT: Month short header\r\nMONTH_7=Aug\r\n# XTIT: Month short header\r\nMONTH_8=Sep\r\n# XTIT: Month short header\r\nMONTH_9=Okt\r\n# XTIT: Month short header\r\nMONTH_10=Nov\r\n# XTIT: Month short header\r\nMONTH_11=Des\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=Januar\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=Februar\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=Mars\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=April\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=Mai\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=Juni\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=Juli\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=August\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=September\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=Oktober\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=November\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=Desember\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=Aktivitet kreves\r\n# XTIT: Legend filled day\r\nFILLED_DAY=Utf\\u00F8rt\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=Venter p\\u00E5 godkjenning\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=Avvist\r\n# XFLD: Legend future working day\r\nWORKING_DAY=Arbeidsdag\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=Fridag\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=Valgt dag\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=Valgt fridag\r\n# XFLD: Legend current day\r\nCURRENT_DAY=Gjeldende dag\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=Totalt antall manglende timer\\: {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1} ({2} timer)\r\n\r\n#XBUT: Button\r\nSAVE=Lagre\r\n\r\n#XBUT: Button \r\nSUBMIT=Send\r\n\r\n# XMSG\r\nFILL_ALL=Registrer {0} timer for\\:\r\n\r\n#XFLD\r\nNO_TASK_TYPE=Ingen oppgavetype\r\n\r\n#XFLD\r\nMISSING_DAYS=Manglende dager\\: {0}\r\n\r\n#XBUT: Button\r\nHOME=Startside\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=Bekreftelse\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=Bekreft sletting\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=Bekreft sending\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=Bekreft utkast\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=Sammenfatning av tidsdataregistreringer valgt for sletting\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=Sammenfatning av tidsdataregistreringer valgt for sending\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=Oversikt over valgte tidsdataregistreringer\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Antall poster\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=Antall timer\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=Bekreft\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR={0} Time\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} timer\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR={0} time / {1} timer\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} timer / {1} timer\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=M\\u00E5l\\: {0} timer \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS={0} tidstilordninger\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=1 tidstilordning\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=Ingen tilordninger\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=Ingen poster\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS={0} godkjente timer\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=Lagre med tidspunkt\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=Lagre uten tidspunkt\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=Slett Favoritter\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=Lagre som favoritt\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=Administrer favoritter\r\n\r\n#XFLD: Week \r\nWEEK=Uke\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=Bruk timer p\\u00E5\\:\r\n\r\n#XBUT\r\nALL_MISSING=All manglende tid ({0} timer)\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=Slett\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=Kopier\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=Tilf\\u00F8y post\r\n\r\n#XFLD: label for duration\r\nDURATION=Varighet\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=Samlet varighet\r\n\r\n#XFLD: label for status\r\nSTATUS=Status\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=Starttidspunkt\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=Navn p\\u00E5 favoritt\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=Sluttidspunkt\r\n\r\n#XFLD: label for note\r\nNOTE=Merknad\r\n\r\n#XBUT: Done button\r\nDONE=Utf\\u00F8rt\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=Manuell\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=Rediger post\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=Tidstilordning\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=Velg favoritt eller arbeidsliste\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=Velg arbeidsliste\r\n\r\n# XTIT: Favorite\r\nFAVORITE=Favoritter\r\n\r\n# XTIT: Worklist\r\nWORKLIST=Arbeidsliste\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=Tilf\\u00F8y favoritt\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=Rediger favoritter\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=Last mer...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=Laster ...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=Fortsett s\\u00F8k p\\u00E5 server...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=Laster ...\r\n\r\n#XFLD: BLANK\r\nEMPTY=Tom\r\n\r\n#XFLD: None\r\nNONE=Ingen\r\n\r\n#XFLD\r\nNO_WORKLIST=Det finnes ingen arbeidsliste\r\n\r\n#XFLD\r\nNO_FAVORITE=Det finnes ingen favoritter\r\n\r\n# XTIT: Select\r\nSELECT=Velg {0}\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=Velg\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=S\\u00F8k...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=t\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=m\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=Timer\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=Minutter\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=DD MMM, YYYY\r\n\r\n#XBUT:\r\nDETAIL=Detaljer\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=Innstillinger\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=Du vil miste data som ikke er lagret. Er du sikker p\\u00E5 at du vil fortsette?\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=Ulagrede endringer\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=Foresp\\u00F8rsel er sendt\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=Oppgi et favorittnavn i inndatafeltet Tidstilordning\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=Utf\\u00F8r registreringer for \\u00E5 lagre som din favoritt\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=Oppgi en gyldig varighet\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=Oppgi en gyldig start- og sluttid\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=Utkast er lagret\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=Favoritt er sendt\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=Favoritt oppdatert\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=Favoritt slettet\r\n\r\n#XBUT:\r\nHELP=Hjelp\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED={0}/{1} timer registrert for denne uken\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=Aktiver "forh\\u00E5ndsdefinisjon" for \\u00E5 fylle ut timer per uke automatisk basert p\\u00E5 din siste registrering\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=Noen poster er feil. Kontroller feildetaljer og korriger poster.\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT=Tidsregistrering for {0} og {1} flere dag(er)\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Rediger tidsregistrering\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE=Tidsregistrering for {0}\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} timer {1} minutter\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} t {1} m\r\n\r\n#XBUT: Button to reset\r\nRESET=Tilbakestill\r\n\r\n#XBUT: Button to update\r\nUPDATE=Oppdater\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=Tilf\\u00F8y favoritt\r\n\r\n#XBUT: Button to create\r\nCREATE=Opprett\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=Aktuelt favorittnavn\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=Nytt favorittnavn\r\n\r\n#XTIT: time\r\nTIME=Tid\r\n',
	"hcm/mytimesheet/i18n/i18n_pl.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=Od\r\n\r\n#XFLD: label for to time\r\nTO=Do\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=Anuluj\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=Zamknij\r\n\r\n#XBUT: Button to accept\r\nOK=OK\r\n\r\n#XBUT: Button to affirm\r\nYES=Tak\r\n\r\n#XBUT: Button to decline\r\nNO=Nie\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=Zapisz wersj\\u0119 robocz\\u0105\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=Rejestracja czasu\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=B\\u0142\\u0105d wewn\\u0119trzny\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=W aplikacji wyst\\u0105pi\\u0142 b\\u0142\\u0105d wewn\\u0119trzny zwi\\u0105zany z obs\\u0142ug\\u0105 b\\u0142\\u0119du.\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=Usu\\u0144 Ulubione\r\n\r\n# XTIT: \r\nTIMESHEET=Wpisy rejestracji czasu\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=Szybki wpis\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=Zastosuj do\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=Szczeg\\u00F3\\u0142y\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=Utw\\u00F3rz wpis daty\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=Utw\\u00F3rz wpis dla {0} dni\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=Szczeg\\u00F3\\u0142y wpisu\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE=Szczeg\\u00F3\\u0142y wpisu dla {0}\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=Utw\\u00F3rz wpis dla {0}\r\n\r\n# XTIT: Month short header\r\nMONTH_0=Sty\r\n# XTIT: Month short header\r\nMONTH_1=Lut\r\n# XTIT: Month short header\r\nMONTH_2=Mar\r\n# XTIT: Month short header\r\nMONTH_3=Kwi\r\n# XTIT: Month short header\r\nMONTH_4=Maj\r\n# XTIT: Month short header\r\nMONTH_5=Cze\r\n# XTIT: Month short header\r\nMONTH_6=Lip\r\n# XTIT: Month short header\r\nMONTH_7=Sie\r\n# XTIT: Month short header\r\nMONTH_8=Wrz\r\n# XTIT: Month short header\r\nMONTH_9=Pa\\u017A\r\n# XTIT: Month short header\r\nMONTH_10=Lis\r\n# XTIT: Month short header\r\nMONTH_11=Gru\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=Stycze\\u0144\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=Luty\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=Marzec\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=Kwiecie\\u0144\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=Maj\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=Czerwiec\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=Lipiec\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=Sierpie\\u0144\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=Wrzesie\\u0144\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=Pa\\u017Adziernik\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=Listopad\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=Grudzie\\u0144\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=Wymagana czynno\\u015B\\u0107\r\n# XTIT: Legend filled day\r\nFILLED_DAY=Gotowe\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=Wymagana czynno\\u015B\\u0107 zatwierdzaj\\u0105cego\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=Odrzucone\r\n# XFLD: Legend future working day\r\nWORKING_DAY=Dzie\\u0144 roboczy\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=Dzie\\u0144 wolny od pracy\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=Wybrany dzie\\u0144\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=Wybrany dzie\\u0144 wolny od pracy\r\n# XFLD: Legend current day\r\nCURRENT_DAY=Bie\\u017C\\u0105cy dzie\\u0144\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=Suma brakuj\\u0105cych godzin\\: {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1} ({2} godz.)\r\n\r\n#XBUT: Button\r\nSAVE=Zapisz\r\n\r\n#XBUT: Button \r\nSUBMIT=Wy\\u015Blij\r\n\r\n# XMSG\r\nFILL_ALL=Wpisz {0} godz. dla\\:\r\n\r\n#XFLD\r\nNO_TASK_TYPE=Bez typu zadania\r\n\r\n#XFLD\r\nMISSING_DAYS=Brakuj\\u0105ce dni\\: {0}\r\n\r\n#XBUT: Button\r\nHOME=Ekran g\\u0142\\u00F3wny\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=Potwierdzenie\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=Potwierdzanie usuwania\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=Potwierdzanie przesy\\u0142ania\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=Potwierdzanie wersji roboczej\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=Podsumowanie wpis\\u00F3w czasu wybranych dla usuwania\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=Podsumowanie wpis\\u00F3w czasu wybranych dla przesy\\u0142ania\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=Podsumowanie wybranych wpis\\u00F3w daty\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Liczba wpis\\u00F3w\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=Liczba godzin\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=Potwierd\\u017A\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR={0} godzina\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} godz.\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR={0} godz./{1} godz.\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} godz. / {1} godz.\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=Cel\\: {0} godz. \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS=Liczba przypisa\\u0144 czasu\\: {0}\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=1 przypisanie czasu\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=Brak przypisa\\u0144\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=Brak rekord\\u00F3w\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS=Zatwierdzono godzin\\: {0}\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=Zapisz z czasem\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=Zapisz bez czasu\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=Usu\\u0144 Ulubione\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=Zapisz jako Ulubione\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=Zarz\\u0105dzaj Ulubionymi\r\n\r\n#XFLD: Week \r\nWEEK=Tydzie\\u0144\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=Zastosuj godziny do\\:\r\n\r\n#XBUT\r\nALL_MISSING=\\u0141\\u0105czny brakuj\\u0105cy czas({0} godz.)\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=Usu\\u0144\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=Kopiuj\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=Dodaj wpis\r\n\r\n#XFLD: label for duration\r\nDURATION=Czas trwania\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=\\u0141\\u0105czny czas trwania\r\n\r\n#XFLD: label for status\r\nSTATUS=Status\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=Czas rozpocz\\u0119cia\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=Nazwa ulubionych\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=Czas zako\\u0144czenia\r\n\r\n#XFLD: label for note\r\nNOTE=Notatka\r\n\r\n#XBUT: Done button\r\nDONE=Gotowe\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=R\\u0119czne\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=Edytuj wpis\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=Przypisanie czasu\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=Wyb\\u00F3r Ulubionych lub listy roboczej\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=Wyb\\u00F3r listy roboczej\r\n\r\n# XTIT: Favorite\r\nFAVORITE=Ulubione\r\n\r\n# XTIT: Worklist\r\nWORKLIST=Lista robocza\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=Dodaj ulubione\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=Edytuj ulubione\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=Wczytaj wi\\u0119cej...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=Wczytywanie...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=Kontynuuj szukanie na serwerze...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=Wczytywanie...\r\n\r\n#XFLD: BLANK\r\nEMPTY=Puste\r\n\r\n#XFLD: None\r\nNONE=Brak\r\n\r\n#XFLD\r\nNO_WORKLIST=Brak dost\\u0119pnej listy roboczej\r\n\r\n#XFLD\r\nNO_FAVORITE=Brak dost\\u0119pnych Ulubionych\r\n\r\n# XTIT: Select\r\nSELECT=Wybierz {0}\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=Wybierz\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=Szukaj...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=godz.\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=min\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=Godziny\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=Minuty\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=DD MMM YYYY\r\n\r\n#XBUT:\r\nDETAIL=Szczeg\\u00F3\\u0142y\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=Ustawienia\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=Wszystkie niezapisane dane zostan\\u0105 odrzucone. Czy na pewno chcesz kontynuowa\\u0107?\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=Niezapami\\u0119tane zmiany\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=Wniosek wys\\u0142any.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=Wprowad\\u017A nazw\\u0119 ulubionych w polu wej\\u015Bciowym Przypisanie czasu.\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=Dokonaj wpis\\u00F3w, aby zapisa\\u0107 jako Ulubione.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=Wprowad\\u017A prawid\\u0142owy czas trwania.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=Wprowad\\u017A prawid\\u0142owy czas rozpocz\\u0119cia i zako\\u0144czenia.\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=Pomy\\u015Blnie zapisano wersj\\u0119 robocz\\u0105.\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=Utworzono ulubione.\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=Zaktualizowano Ulubione.\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=Usuni\\u0119to ulubione.\r\n\r\n#XBUT:\r\nHELP=Pomoc\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED=Wprowadzono {0}/{1} godz. dla tego tygodnia.\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=Aby szybko wype\\u0142ni\\u0107 godziny na podstawie ostatniego pomy\\u015Blnego wpisu, w\\u0142\\u0105cz wst\\u0119pne wype\\u0142nianie.\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=Niekt\\u00F3re wpisy s\\u0105 nieprawid\\u0142owe. Sprawd\\u017A szczeg\\u00F3\\u0142y b\\u0142\\u0119du i popraw wpisy.\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT=Wpis daty dla {0} i {1} dni wi\\u0119cej\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Edycja wpisu daty\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE=Wpis daty dla {0}\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} godz. {1} min\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} godz. {1} min\r\n\r\n#XBUT: Button to reset\r\nRESET=Resetuj\r\n\r\n#XBUT: Button to update\r\nUPDATE=Aktualizuj\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=Dodaj ulubione\r\n\r\n#XBUT: Button to create\r\nCREATE=Utw\\u00F3rz\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=Aktualna nazwa Ulubionego\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=Nowa nazwa Ulubionego\r\n\r\n#XTIT: time\r\nTIME=Czas\r\n',
	"hcm/mytimesheet/i18n/i18n_pt.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=De\r\n\r\n#XFLD: label for to time\r\nTO=A\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=Anular\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=Fechar\r\n\r\n#XBUT: Button to accept\r\nOK=OK\r\n\r\n#XBUT: Button to affirm\r\nYES=Sim\r\n\r\n#XBUT: Button to decline\r\nNO=N\\u00E3o\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=Gravar esbo\\u00E7o\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=Minha folha de horas\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=Erro interno\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=Ocorreu um erro interno relacionado ao tratamento de erros no aplicativo.\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=Excluir favoritos\r\n\r\n# XTIT: \r\nTIMESHEET=Entradas da folha de horas\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=Entrada r\\u00E1pida\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=Aplicar a\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=Detalhes\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=Criar registro de tempos\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=Criar entrada para {0} dias\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=Detalhes da entrada\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE=Detalhes de entrada para {0}\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=Criar entrada para {0}\r\n\r\n# XTIT: Month short header\r\nMONTH_0=Jan\r\n# XTIT: Month short header\r\nMONTH_1=Fev\r\n# XTIT: Month short header\r\nMONTH_2=Mar\r\n# XTIT: Month short header\r\nMONTH_3=Abr\r\n# XTIT: Month short header\r\nMONTH_4=Mai\r\n# XTIT: Month short header\r\nMONTH_5=Jun\r\n# XTIT: Month short header\r\nMONTH_6=Jul\r\n# XTIT: Month short header\r\nMONTH_7=Ago\r\n# XTIT: Month short header\r\nMONTH_8=Set\r\n# XTIT: Month short header\r\nMONTH_9=Out\r\n# XTIT: Month short header\r\nMONTH_10=Nov\r\n# XTIT: Month short header\r\nMONTH_11=Dez\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=Janeiro\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=Fevereiro\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=Mar\\u00E7o\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=Abril\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=Maio\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=Junho\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=Julho\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=Agosto\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=Setembro\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=Outubro\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=Novembro\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=Dezembro\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=A\\u00E7\\u00E3o necess\\u00E1ria\r\n# XTIT: Legend filled day\r\nFILLED_DAY=Conclu\\u00EDdo\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=Aprova\\u00E7\\u00E3o necess\\u00E1ria\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=Rejeitado\r\n# XFLD: Legend future working day\r\nWORKING_DAY=Dia de trabalho\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=Dia livre\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=Dia selecionado\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=Dia livre n\\u00E3o selecionado\r\n# XFLD: Legend current day\r\nCURRENT_DAY=Dia atual\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=Total de horas em falta\\: {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1} ({2} horas)\r\n\r\n#XBUT: Button\r\nSAVE=Gravar\r\n\r\n#XBUT: Button \r\nSUBMIT=Enviar\r\n\r\n# XMSG\r\nFILL_ALL=Inserir {0} horas para\\:\r\n\r\n#XFLD\r\nNO_TASK_TYPE=Nenhum tipo de tarefa\r\n\r\n#XFLD\r\nMISSING_DAYS=Dias em falta\\: {0}\r\n\r\n#XBUT: Button\r\nHOME=In\\u00EDcio\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=Confirma\\u00E7\\u00E3o\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=Confirmar exclus\\u00E3o\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=Confirmar envio\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=Confirmar esbo\\u00E7o\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=Resumo de entradas de tempos selecionado para exclus\\u00E3o\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=Resumo de entradas de tempos selecionado para envio\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=Resumo de entradas de horas selecionadas\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=N\\u00BA de entradas\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=N\\u00FAmero de horas\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=Confirmar\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR={0} hora\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} horas\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR={0} hora / {1} horas\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} horas / {1} horas\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=Te\\u00F3rico\\: {0} horas \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS={0} atribui\\u00E7\\u00F5es de tempo\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=1 atribui\\u00E7\\u00E3o de tempo\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=Nenhuma atribui\\u00E7\\u00E3o\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=Nenhum registro\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS={0} horas aprovadas\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=Gravar com tempo\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=Gravar sem tempo\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=Excluir favoritos\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=Gravar como favorito\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=Gerenciar favoritos\r\n\r\n#XFLD: Week \r\nWEEK=Semana\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=Aplicar horas a\\:\r\n\r\n#XBUT\r\nALL_MISSING=Todas as horas em falta ({0} horas)\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=Excluir\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=Copiar\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=Inserir entr.\r\n\r\n#XFLD: label for duration\r\nDURATION=Dura\\u00E7\\u00E3o\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=Dura\\u00E7\\u00E3o total\r\n\r\n#XFLD: label for status\r\nSTATUS=Status\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=Hora de in\\u00EDcio\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=Nome do favorito\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=Hora de fim\r\n\r\n#XFLD: label for note\r\nNOTE=Nota\r\n\r\n#XBUT: Done button\r\nDONE=Conclu\\u00EDdo\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=Manual\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=Processar entrada\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=Atribui\\u00E7\\u00E3o de tempo\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=Selecionar favorito ou lista de trabalho\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=Selecionar lista de trabalho\r\n\r\n# XTIT: Favorite\r\nFAVORITE=Favoritos\r\n\r\n# XTIT: Worklist\r\nWORKLIST=Lista de trabalho\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=Inserir favorito\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=Processar favoritos\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=Carregar mais...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=Carregando...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=Continuar procura no servidor...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=Carregando...\r\n\r\n#XFLD: BLANK\r\nEMPTY=Vazio\r\n\r\n#XFLD: None\r\nNONE=Nenhum\r\n\r\n#XFLD\r\nNO_WORKLIST=Nenhuma lista de trabalho dispon\\u00EDvel\r\n\r\n#XFLD\r\nNO_FAVORITE=Nenhum favorito dispon\\u00EDvel\r\n\r\n# XTIT: Select\r\nSELECT=Selecionar {0}\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=Selecionar\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=Procurar...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=h\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=m\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=Horas\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=Minutos\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=MMM DD, AAAA\r\n\r\n#XBUT:\r\nDETAIL=Detalhes\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=Configura\\u00E7\\u00F5es\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=Os dados n\\u00E3o gravados ser\\u00E3o rejeitados. Continuar?\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=Modifica\\u00E7\\u00F5es n\\u00E3o gravadas\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=Solicita\\u00E7\\u00E3o enviada.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=Insira um nome de favorito no campo de entrada Atribui\\u00E7\\u00E3o de tempo.\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=Efetue entradas para gravar como favoritos.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=Insira uma dura\\u00E7\\u00E3o v\\u00E1lida.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=Insira hora de in\\u00EDcio e hora final v\\u00E1lidas.\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=Esbo\\u00E7o gravado com \\u00EAxito.\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=Favorito criado.\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=Favorito atualizado.\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=Favorito exclu\\u00EDdo.\r\n\r\n#XBUT:\r\nHELP=Ajuda\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED={0}/{1} horas inseridas para essa semana\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=Ativar Predefinir para inserir automaticamente as horas para semana com base em sua \\u00FAltima entrada.\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=Algumas entradas est\\u00E3o incorretas. Verifique detalhes de erro e corrija as entradas.\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT=Entrada de tempos para {0} e {1} mais dia(s)\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Editar registro de tempos\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE=Entrada de tempo para {0}\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} horas e {1} minutos\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\r\n\r\n#XBUT: Button to reset\r\nRESET=Reinicializar\r\n\r\n#XBUT: Button to update\r\nUPDATE=Atualizar\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=Ins.favorito\r\n\r\n#XBUT: Button to create\r\nCREATE=Criar\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=Nome do favorito atual\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=Nome de novo favorito\r\n\r\n#XTIT: time\r\nTIME=Hora\r\n',
	"hcm/mytimesheet/i18n/i18n_ru.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=\\u0421\r\n\r\n#XFLD: label for to time\r\nTO=\\u041F\\u043E\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=\\u041E\\u0442\\u043C\\u0435\\u043D\\u0438\\u0442\\u044C\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=\\u0417\\u0430\\u043A\\u0440\\u044B\\u0442\\u044C\r\n\r\n#XBUT: Button to accept\r\nOK=\\u041E\\u041A\r\n\r\n#XBUT: Button to affirm\r\nYES=\\u0414\\u0430\r\n\r\n#XBUT: Button to decline\r\nNO=\\u041D\\u0435\\u0442\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u0447\\u0435\\u0440\\u043D\\u043E\\u0432\\u0438\\u043A\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=\\u041C\\u043E\\u0439 \\u0442\\u0430\\u0431\\u0435\\u043B\\u044C\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=\\u0412\\u043D\\u0443\\u0442\\u0440\\u0435\\u043D\\u043D\\u044F\\u044F \\u043E\\u0448\\u0438\\u0431\\u043A\\u0430\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=\\u0412 \\u043F\\u0440\\u0438\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u0438 \\u0432\\u043E\\u0437\\u043D\\u0438\\u043A\\u043B\\u0430 \\u0432\\u043D\\u0443\\u0442\\u0440\\u0435\\u043D\\u043D\\u044F\\u044F \\u043E\\u0448\\u0438\\u0431\\u043A\\u0430 \\u0432 \\u0441\\u0432\\u044F\\u0437\\u0438 \\u0441 \\u043E\\u0431\\u0440\\u0430\\u0431\\u043E\\u0442\\u043A\\u043E\\u0439 \\u043E\\u0448\\u0438\\u0431\\u043E\\u043A\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\r\n\r\n# XTIT: \r\nTIMESHEET=\\u0417\\u0430\\u043F\\u0438\\u0441\\u0438 \\u0432 \\u0442\\u0430\\u0431\\u0435\\u043B\\u0435\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=\\u0411\\u044B\\u0441\\u0442\\u0440\\u044B\\u0439 \\u0432\\u0432\\u043E\\u0434\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=\\u041F\\u0440\\u0438\\u043C\\u0435\\u043D\\u0438\\u0442\\u044C \\u043A\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=\\u0421\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=\\u0421\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C \\u0434\\u043B\\u044F {0} \\u0434\\u043D.\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=\\u0417\\u0430\\u043F\\u0438\\u0441\\u044C \\u043F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\\u0441\\u0442\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438 \\u0434\\u043B\\u044F {0}\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=\\u0421\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C \\u0434\\u043B\\u044F {0}\r\n\r\n# XTIT: Month short header\r\nMONTH_0=\\u042F\\u043D\\u0432\r\n# XTIT: Month short header\r\nMONTH_1=\\u0424\\u0435\\u0432\r\n# XTIT: Month short header\r\nMONTH_2=\\u041C\\u0430\\u0440\r\n# XTIT: Month short header\r\nMONTH_3=\\u0410\\u043F\\u0440\r\n# XTIT: Month short header\r\nMONTH_4=\\u041C\\u0430\\u0439\r\n# XTIT: Month short header\r\nMONTH_5=\\u0418\\u044E\\u043D\r\n# XTIT: Month short header\r\nMONTH_6=\\u0418\\u044E\\u043B\r\n# XTIT: Month short header\r\nMONTH_7=\\u0410\\u0432\\u0433\r\n# XTIT: Month short header\r\nMONTH_8=\\u0421\\u0435\\u043D\r\n# XTIT: Month short header\r\nMONTH_9=\\u041E\\u043A\\u0442\r\n# XTIT: Month short header\r\nMONTH_10=\\u041D\\u043E\\u044F\r\n# XTIT: Month short header\r\nMONTH_11=\\u0414\\u0435\\u043A\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=\\u042F\\u043D\\u0432\\u0430\\u0440\\u044C\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=\\u0424\\u0435\\u0432\\u0440\\u0430\\u043B\\u044C\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=\\u041C\\u0430\\u0440\\u0442\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=\\u0410\\u043F\\u0440\\u0435\\u043B\\u044C\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=\\u041C\\u0430\\u0439\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=\\u0418\\u044E\\u043D\\u044C\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=\\u0418\\u044E\\u043B\\u044C\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=\\u0410\\u0432\\u0433\\u0443\\u0441\\u0442\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=\\u0421\\u0435\\u043D\\u0442\\u044F\\u0431\\u0440\\u044C\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=\\u041E\\u043A\\u0442\\u044F\\u0431\\u0440\\u044C\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=\\u041D\\u043E\\u044F\\u0431\\u0440\\u044C\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=\\u0414\\u0435\\u043A\\u0430\\u0431\\u0440\\u044C\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=\\u0422\\u0440\\u0435\\u0431\\u0443\\u0435\\u0442\\u0441\\u044F \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0435\r\n# XTIT: Legend filled day\r\nFILLED_DAY=\\u0413\\u043E\\u0442\\u043E\\u0432\\u043E\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=\\u0422\\u0440\\u0435\\u0431\\u0443\\u0435\\u0442\\u0441\\u044F \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0435 \\u0443\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0430\\u044E\\u0449\\u0435\\u0433\\u043E\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=\\u041E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u043E\r\n# XFLD: Legend future working day\r\nWORKING_DAY=\\u0420\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0434\\u0435\\u043D\\u044C\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=\\u041D\\u0435\\u0440\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0434\\u0435\\u043D\\u044C\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=\\u0412\\u044B\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u0439 \\u0434\\u0435\\u043D\\u044C\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=\\u0412\\u044B\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u0439 \\u043D\\u0435\\u0440\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0434\\u0435\\u043D\\u044C\r\n# XFLD: Legend current day\r\nCURRENT_DAY=\\u0422\\u0435\\u043A\\u0443\\u0449\\u0438\\u0439 \\u0434\\u0435\\u043D\\u044C\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=\\u041E\\u0431\\u0449\\u0435\\u0435 \\u043A\\u043E\\u043B\\u0438\\u0447\\u0435\\u0441\\u0442\\u0432\\u043E \\u0447\\u0430\\u0441\\u043E\\u0432 \\u043E\\u0442\\u0441\\u0443\\u0442\\u0441\\u0442\\u0432\\u0438\\u044F\\: {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1} ({2} \\u0447)\r\n\r\n#XBUT: Button\r\nSAVE=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C\r\n\r\n#XBUT: Button \r\nSUBMIT=\\u041E\\u0442\\u043F\\u0440\\u0430\\u0432\\u0438\\u0442\\u044C\r\n\r\n# XMSG\r\nFILL_ALL=\\u0412\\u0432\\u0435\\u0441\\u0442\\u0438 {0} \\u0447 \\u0434\\u043B\\u044F\\:\r\n\r\n#XFLD\r\nNO_TASK_TYPE=\\u041D\\u0435\\u0442 \\u0442\\u0438\\u043F\\u0430 \\u0437\\u0430\\u0434\\u0430\\u0447\r\n\r\n#XFLD\r\nMISSING_DAYS=\\u0414\\u043D\\u0438 \\u043E\\u0442\\u0441\\u0443\\u0442\\u0441\\u0442\\u0432\\u0438\\u044F\\: {0}\r\n\r\n#XBUT: Button\r\nHOME=\\u0414\\u043E\\u043C\\u043E\\u0439\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435 \\u0443\\u0434\\u0430\\u043B\\u0435\\u043D\\u0438\\u044F\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0434\\u0438\\u0442\\u044C \\u043E\\u0442\\u043F\\u0440\\u0430\\u0432\\u043A\\u0443\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0434\\u0438\\u0442\\u044C \\u0447\\u0435\\u0440\\u043D\\u043E\\u0432\\u0438\\u043A\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=\\u041E\\u0431\\u0437\\u043E\\u0440 \\u0432\\u044B\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u0445 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438 \\u0434\\u043B\\u044F \\u0443\\u0434\\u0430\\u043B\\u0435\\u043D\\u0438\\u044F\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=\\u041E\\u0431\\u0437\\u043E\\u0440 \\u0432\\u044B\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u0445 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438 \\u0434\\u043B\\u044F \\u043E\\u0442\\u043F\\u0440\\u0430\\u0432\\u043A\\u0438\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=\\u041E\\u0431\\u0437\\u043E\\u0440 \\u0432\\u044B\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u0445 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u041A\\u043E\\u043B\\u0438\\u0447\\u0435\\u0441\\u0442\\u0432\\u043E \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u041A\\u043E\\u043B\\u0438\\u0447\\u0435\\u0441\\u0442\\u0432\\u043E \\u0447\\u0430\\u0441\\u043E\\u0432\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0434\\u0438\\u0442\\u044C\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR={0} \\u0447.\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} \\u0447.\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR={0} \\u0447 / {1} \\u0447\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} \\u0447 / {1} \\u0447\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=\\u0426\\u0435\\u043B\\u044C\\: {0} \\u0447. \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS={0} \\u043F\\u0440\\u0438\\u0441\\u0432. \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=\\u041E\\u0434\\u043D\\u043E \\u043F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0435 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=\\u041D\\u0435\\u0442 \\u043F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0439\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=\\u041D\\u0435\\u0442 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS={0} \\u0447. \\u0443\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0435\\u043D\\u043E\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u0441\\u043E \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0435\\u043C\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u0431\\u0435\\u0437 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u0432 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u043C\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=\\u0423\\u043F\\u0440\\u0430\\u0432\\u043B\\u0435\\u043D\\u0438\\u0435 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u043C\r\n\r\n#XFLD: Week \r\nWEEK=\\u041D\\u0435\\u0434\\u0435\\u043B\\u044F\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=\\u041F\\u0440\\u0438\\u043C\\u0435\\u043D\\u0438\\u0442\\u044C \\u0447\\u0430\\u0441\\u044B \\u043A\\:\r\n\r\n#XBUT\r\nALL_MISSING=\\u0412\\u0441\\u0435 \\u0432\\u0440\\u0435\\u043C\\u044F \\u043E\\u0442\\u0441\\u0443\\u0442\\u0441\\u0442\\u0432\\u0438\\u044F ({0} \\u0447)\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=\\u0421\\u043A\\u043E\\u043F\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C\r\n\r\n#XFLD: label for duration\r\nDURATION=\\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0441\\u0442\\u044C\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=\\u041E\\u0431\\u0449\\u0430\\u044F \\u043F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0441\\u0442\\u044C\r\n\r\n#XFLD: label for status\r\nSTATUS=\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=\\u0412\\u0440\\u0435\\u043C\\u044F \\u043D\\u0430\\u0447\\u0430\\u043B\\u0430\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=\\u0418\\u043C\\u044F \\u044D\\u043B\\u0435\\u043C\\u0435\\u043D\\u0442\\u0430 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=\\u0412\\u0440\\u0435\\u043C\\u044F \\u0437\\u0430\\u0432\\u0435\\u0440\\u0448\\u0435\\u043D\\u0438\\u044F\r\n\r\n#XFLD: label for note\r\nNOTE=\\u041F\\u0440\\u0438\\u043C\\u0435\\u0447\\u0430\\u043D\\u0438\\u0435\r\n\r\n#XBUT: Done button\r\nDONE=\\u0413\\u043E\\u0442\\u043E\\u0432\\u043E\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=\\u0412\\u0440\\u0443\\u0447\\u043D\\u0443\\u044E\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=\\u041E\\u0431\\u0440\\u0430\\u0431\\u043E\\u0442\\u0430\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=\\u041F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0435 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435 \\u0438\\u043B\\u0438 \\u0440\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0441\\u043F\\u0438\\u0441\\u043E\\u043A\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u0440\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0441\\u043F\\u0438\\u0441\\u043E\\u043A\r\n\r\n# XTIT: Favorite\r\nFAVORITE=\\u0418\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\r\n\r\n# XTIT: Worklist\r\nWORKLIST=\\u0420\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0441\\u043F\\u0438\\u0441\\u043E\\u043A\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0442\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=\\u0417\\u0430\\u0433\\u0440\\u0443\\u0437\\u0438\\u0442\\u044C \\u0435\\u0449\\u0435...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=\\u0417\\u0430\\u0433\\u0440\\u0443\\u0437\\u043A\\u0430 ...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=\\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C \\u043F\\u043E\\u0438\\u0441\\u043A \\u043D\\u0430 \\u0441\\u0435\\u0440\\u0432\\u0435\\u0440\\u0435...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u0417\\u0430\\u0433\\u0440\\u0443\\u0437\\u043A\\u0430 ...\r\n\r\n#XFLD: BLANK\r\nEMPTY=\\u041F\\u0443\\u0441\\u0442\\u043E\r\n\r\n#XFLD: None\r\nNONE=\\u041D\\u0435\\u0442\r\n\r\n#XFLD\r\nNO_WORKLIST=\\u0420\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0441\\u043F\\u0438\\u0441\\u043E\\u043A \\u043D\\u0435\\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u0435\\u043D\r\n\r\n#XFLD\r\nNO_FAVORITE=\\u0418\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435 \\u043D\\u0435\\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u043E\r\n\r\n# XTIT: Select\r\nSELECT=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C {0}\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=\\u041F\\u043E\\u0438\\u0441\\u043A...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=\\u0447\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=\\u043C\\u0438\\u043D\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=\\u0427\\u0430\\u0441\\u044B\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=\\u041C\\u0438\\u043D\\u0443\\u0442\\u044B\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=DD MMM YYYY\r\n\r\n#XBUT:\r\nDETAIL=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=\\u041D\\u0430\\u0441\\u0442\\u0440\\u043E\\u0439\\u043A\\u0438\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=\\u0412\\u0441\\u0435 \\u043D\\u0435\\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u043D\\u044B\\u0435 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0435 \\u0431\\u0443\\u0434\\u0443\\u0442 \\u043F\\u043E\\u0442\\u0435\\u0440\\u044F\\u043D\\u044B. \\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C?\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=\\u041D\\u0435\\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u043D\\u044B\\u0435 \\u0438\\u0437\\u043C\\u0435\\u043D\\u0435\\u043D\\u0438\\u044F\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=\\u0417\\u0430\\u044F\\u0432\\u043A\\u0430 \\u043F\\u0435\\u0440\\u0435\\u0434\\u0430\\u043D\\u0430\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0438\\u043C\\u044F \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E \\u0432 \\u043F\\u043E\\u043B\\u0435 \\u0432\\u0432\\u043E\\u0434\\u0430 \\u041F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0435 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=\\u0417\\u0430\\u043F\\u043E\\u043B\\u043D\\u0438\\u0442\\u0435 \\u043F\\u043E\\u043B\\u044F \\u0434\\u043B\\u044F \\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u0438\\u044F \\u0432 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u043C\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u0443\\u044E \\u043F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0441\\u0442\\u044C\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0435 \\u0432\\u0440\\u0435\\u043C\\u044F \\u043D\\u0430\\u0447\\u0430\\u043B\\u0430 \\u0438 \\u043E\\u043A\\u043E\\u043D\\u0447\\u0430\\u043D\\u0438\\u044F\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=\\u0427\\u0435\\u0440\\u043D\\u043E\\u0432\\u0438\\u043A \\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=\\u042D\\u043B\\u0435\\u043C\\u0435\\u043D\\u0442 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E \\u0441\\u043E\\u0437\\u0434\\u0430\\u043D\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=\\u042D\\u043B\\u0435\\u043C\\u0435\\u043D\\u0442 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E \\u043E\\u0431\\u043D\\u043E\\u0432\\u043B\\u0435\\u043D\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=\\u042D\\u043B\\u0435\\u043C\\u0435\\u043D\\u0442 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E \\u0443\\u0434\\u0430\\u043B\\u0435\\u043D\r\n\r\n#XBUT:\r\nHELP=\\u0421\\u043F\\u0440\\u0430\\u0432\\u043A\\u0430\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED={0}/{1} \\u0447 \\u0432\\u0432\\u0435\\u0434\\u0435\\u043D\\u043E \\u0434\\u043B\\u044F \\u044D\\u0442\\u043E\\u0439 \\u043D\\u0435\\u0434\\u0435\\u043B\\u0438.\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=\\u0412\\u043A\\u043B\\u044E\\u0447\\u0438\\u0442\\u044C \\u0430\\u0432\\u0442\\u043E\\u0437\\u0430\\u043F\\u043E\\u043B\\u043D\\u0435\\u043D\\u0438\\u0435 \\u0434\\u043B\\u044F \\u0431\\u044B\\u0441\\u0442\\u0440\\u043E\\u0433\\u043E \\u0437\\u0430\\u043F\\u043E\\u043B\\u043D\\u0435\\u043D\\u0438\\u044F \\u0447\\u0430\\u0441\\u043E\\u0432 \\u0434\\u043B\\u044F \\u043D\\u0435\\u0434\\u0435\\u043B\\u0438 \\u043D\\u0430 \\u043E\\u0441\\u043D\\u043E\\u0432\\u0435 \\u043F\\u043E\\u0441\\u043B\\u0435\\u0434\\u043D\\u0438\\u0445 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=\\u041D\\u0435\\u043A\\u043E\\u0442\\u043E\\u0440\\u044B\\u0435 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438 \\u043D\\u0435\\u043A\\u043E\\u0440\\u0440\\u0435\\u043A\\u0442\\u043D\\u044B. \\u0418\\u0437\\u0443\\u0447\\u0438\\u0442\\u0435 \\u0441\\u0432\\u0435\\u0434\\u0435\\u043D\\u0438\\u044F \\u043E\\u0431 \\u043E\\u0448\\u0438\\u0431\\u043A\\u0435 \\u0438 \\u0438\\u0441\\u043F\\u0440\\u0430\\u0432\\u044C\\u0442\\u0435 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438.\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT=\\u0417\\u0430\\u043F\\u0438\\u0441\\u044C \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438 \\u0434\\u043B\\u044F {0} \\u043F\\u043B\\u044E\\u0441 {1} \\u0434\\u043D.\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u041E\\u0431\\u0440\\u0430\\u0431\\u043E\\u0442\\u0430\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE=\\u0417\\u0430\\u043F\\u0438\\u0441\\u044C \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438 \\u0434\\u043B\\u044F {0}\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} \\u0447 {1} \\u043C\\u0438\\u043D.\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} \\u0447 {1} \\u043C\\u0438\\u043D.\r\n\r\n#XBUT: Button to reset\r\nRESET=\\u0421\\u0431\\u0440\\u043E\\u0441\\u0438\\u0442\\u044C\r\n\r\n#XBUT: Button to update\r\nUPDATE=\\u041E\\u0431\\u043D\\u043E\\u0432\\u0438\\u0442\\u044C\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\r\n\r\n#XBUT: Button to create\r\nCREATE=\\u0421\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=\\u0422\\u0435\\u043A\\u0443\\u0449\\u0435\\u0435 \\u0438\\u043C\\u044F \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=\\u041D\\u043E\\u0432\\u043E\\u0435 \\u0438\\u043C\\u044F \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E\r\n\r\n#XTIT: time\r\nTIME=\\u0412\\u0440\\u0435\\u043C\\u044F\r\n',
	"hcm/mytimesheet/i18n/i18n_tr.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=Ba\\u015Flang\\u0131\\u00E7\r\n\r\n#XFLD: label for to time\r\nTO=Biti\\u015F\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=\\u0130ptal\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=Kapat\r\n\r\n#XBUT: Button to accept\r\nOK=Tamam\r\n\r\n#XBUT: Button to affirm\r\nYES=Evet\r\n\r\n#XBUT: Button to decline\r\nNO=Hay\\u0131r\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=Tasla\\u011F\\u0131 kaydet\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=Zaman \\u00E7izelgem\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=Dahili hata\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=Uygulamada hata i\\u015Flemeye ili\\u015Fkin dahili hata ortaya \\u00E7\\u0131kt\\u0131.\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=Favorileri sil\r\n\r\n# XTIT: \r\nTIMESHEET=Zaman \\u00E7izelgesi giri\\u015Fleri\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=H\\u0131zl\\u0131 giri\\u015F\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=Uygula\\:\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=Ayr\\u0131nt\\u0131lar\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=Zaman giri\\u015Fi olu\\u015Ftur\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE={0} g\\u00FCn i\\u00E7in giri\\u015F olu\\u015Ftur\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=Giri\\u015F ayr\\u0131nt\\u0131lar\\u0131\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE={0} i\\u00E7in giri\\u015F ayr\\u0131nt\\u0131lar\\u0131\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE={0} i\\u00E7in giri\\u015F olu\\u015Ftur\r\n\r\n# XTIT: Month short header\r\nMONTH_0=Oca\r\n# XTIT: Month short header\r\nMONTH_1=\\u015Eub\r\n# XTIT: Month short header\r\nMONTH_2=Mar\r\n# XTIT: Month short header\r\nMONTH_3=Nis\r\n# XTIT: Month short header\r\nMONTH_4=May\r\n# XTIT: Month short header\r\nMONTH_5=Haz\r\n# XTIT: Month short header\r\nMONTH_6=Tem\r\n# XTIT: Month short header\r\nMONTH_7=A\\u011Fu\r\n# XTIT: Month short header\r\nMONTH_8=Eyl\r\n# XTIT: Month short header\r\nMONTH_9=Eki\r\n# XTIT: Month short header\r\nMONTH_10=Kas\r\n# XTIT: Month short header\r\nMONTH_11=Ara\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=Ocak\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=\\u015Eubat\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=Mart\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=Nisan\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=May\\u0131s\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=Haziran\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=Temmuz\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=A\\u011Fustos\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=Eyl\\u00FCl\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=Ekim\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=Kas\\u0131m\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=Aral\\u0131k\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=\\u0130\\u015Flem gerekli\r\n# XTIT: Legend filled day\r\nFILLED_DAY=Bitti\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=Onaylayan i\\u015Flemi gerekli\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=Reddedildi\r\n# XFLD: Legend future working day\r\nWORKING_DAY=\\u0130\\u015Fg\\u00FCn\\u00FC\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=\\u00C7al\\u0131\\u015F\\u0131lmayan g\\u00FCn\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=Se\\u00E7ilen g\\u00FCn\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=Se\\u00E7ilen \\u00E7al\\u0131\\u015F\\u0131lmayan g\\u00FCn\r\n# XFLD: Legend current day\r\nCURRENT_DAY=Ge\\u00E7erli g\\u00FCn\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=Toplam eksik saat\\: {0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1} ({2} saat)\r\n\r\n#XBUT: Button\r\nSAVE=Kaydet\r\n\r\n#XBUT: Button \r\nSUBMIT=G\\u00F6nder\r\n\r\n# XMSG\r\nFILL_ALL=\\u015Eunun i\\u00E7in {0} saat gir\\:\r\n\r\n#XFLD\r\nNO_TASK_TYPE=G\\u00F6rev t\\u00FCr\\u00FC yok\r\n\r\n#XFLD\r\nMISSING_DAYS=Eksik g\\u00FCnler\\:  {0}\r\n\r\n#XBUT: Button\r\nHOME=Ana sayfa\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=Teyit\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=Silmeyi teyit et\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=G\\u00F6ndermeyi teyit et\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=Tasla\\u011F\\u0131 teyit et\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=Silme i\\u00E7in se\\u00E7ilen zaman giri\\u015Flerinin \\u00F6zeti\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=G\\u00F6nderme i\\u00E7in se\\u00E7ilen zaman giri\\u015Flerinin \\u00F6zeti\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=Se\\u00E7ilen zaman giri\\u015Flerinin \\u00F6zeti\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Giri\\u015F say\\u0131s\\u0131\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=Saat say\\u0131s\\u0131\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=Teyit et\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR={0} saat\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} saat\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR={0} saat / {1} saat\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} saat / {1} saat\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=Hedef\\: {0} saat \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS={0} zaman tayinleri\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=1 zaman tayini\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=Tayin yok\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=Kay\\u0131t yok\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS={0} saat onayland\\u0131\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=Zamanla kaydet\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=Zaman olmadan kaydet\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=Favorileri sil\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=Favori olarak kaydet\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=Favorileri y\\u00F6net\r\n\r\n#XFLD: Week \r\nWEEK=Hafta\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=Saatleri uygula\\:\r\n\r\n#XBUT\r\nALL_MISSING=T\\u00FCm eksik zamanlar ({0} saat)\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=Sil\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=Kopyala\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=Giri\\u015F ekle\r\n\r\n#XFLD: label for duration\r\nDURATION=S\\u00FCre\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=Toplam s\\u00FCre\r\n\r\n#XFLD: label for status\r\nSTATUS=Durum\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=Ba\\u015Flang\\u0131\\u00E7 saati\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=Favori ad\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=Biti\\u015F saati\r\n\r\n#XFLD: label for note\r\nNOTE=Not\r\n\r\n#XBUT: Done button\r\nDONE=Bitti\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=Man\\u00FCel\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=Giri\\u015Fi d\\u00FCzenle\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=Zaman tayini\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=Favori veya i\\u015F listesi se\\u00E7\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=\\u0130\\u015F listesi se\\u00E7\r\n\r\n# XTIT: Favorite\r\nFAVORITE=Favoriler\r\n\r\n# XTIT: Worklist\r\nWORKLIST=\\u0130\\u015F listesi\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=Favori ekle\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=Favorileri d\\u00FCzenle\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=Daha fazla y\\u00FCkle...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=Y\\u00FCkleniyor ...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=Sunucuda aramaya devam et...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=Y\\u00FCkleniyor ...\r\n\r\n#XFLD: BLANK\r\nEMPTY=Bo\\u015F\r\n\r\n#XFLD: None\r\nNONE=Hi\\u00E7biri\r\n\r\n#XFLD\r\nNO_WORKLIST=\\u0130\\u015F listesi mevcut de\\u011Fil\r\n\r\n#XFLD\r\nNO_FAVORITE=Favori mevcut de\\u011Fil\r\n\r\n# XTIT: Select\r\nSELECT={0} se\\u00E7\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=Se\\u00E7\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=Ara...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=s\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=d\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=Saat\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=Dakika\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=AAA GG, YYYY\r\n\r\n#XBUT:\r\nDETAIL=Ayr\\u0131nt\\u0131lar\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=Ayarlar\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=Kaydedilmeyen veriler at\\u0131lacak. Devam etmek istedi\\u011Finizden emin misiniz?\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=Kaydedilmeyen de\\u011Fi\\u015Fiklikler\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=Talep g\\u00F6nderildi.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=Zaman tayini giri\\u015F alan\\u0131nda favori ad girin.\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=Favoriniz olarak saklamak i\\u00E7in giri\\u015F yap\\u0131n.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=Ge\\u00E7erli s\\u00FCre girin.\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=Ge\\u00E7erli ba\\u015Flang\\u0131\\u00E7 ve biti\\u015F saati girin.\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=Taslak ba\\u015Far\\u0131yla kaydedildi.\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=Favori olu\\u015Fturuldu.\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=Favori g\\u00FCncellendi.\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=Favori silindi.\r\n\r\n#XBUT:\r\nHELP=Yard\\u0131m\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED=Bu hafta i\\u00E7in {0}/{1} saat girildi\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=Son ba\\u015Far\\u0131l\\u0131 giri\\u015Finizi temel alan haftaya ili\\u015Fkin saatleri toplamak i\\u00E7in \\u00D6n de\\u011Ferleri y\\u00FCkle\'yi a\\u00E7\\u0131n.\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=Baz\\u0131 giri\\u015Fler do\\u011Fru de\\u011Fil. Hata ayr\\u0131nt\\u0131lar\\u0131n\\u0131 g\\u00F6zden ge\\u00E7irin ve giri\\u015Fleri d\\u00FCzeltin.\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT={0} ve fazladan {1} g\\u00FCn i\\u00E7in zaman giri\\u015Fi\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Zaman giri\\u015Fini d\\u00FCzenle\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE={0} i\\u00E7in zaman giri\\u015Fi\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} saat {1} dakika\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} s {1} d\r\n\r\n#XBUT: Button to reset\r\nRESET=S\\u0131f\\u0131rla\r\n\r\n#XBUT: Button to update\r\nUPDATE=G\\u00FCncelle\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=Favori ekle\r\n\r\n#XBUT: Button to create\r\nCREATE=Olu\\u015Ftur\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=Ge\\u00E7erli favori ad\\u0131\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=Yeni favori ad\\u0131\r\n\r\n#XTIT: time\r\nTIME=Zaman\r\n',
	"hcm/mytimesheet/i18n/i18n_zh_CN.properties":'\r\n\r\n#XFLD: Select Personnel Assignment Label\r\n\r\n#XTIT: Select Personnel Assignment Title\r\n\r\n#XFLD: label for from time\r\nFROM=\\u81EA\r\n\r\n#XFLD: label for to time\r\nTO=\\u81F3\r\n\r\n#XBUT: Button to cancel\r\nCANCEL=\\u53D6\\u6D88\r\n\r\n#XBUT: Button to close popover\r\nCLOSE=\\u5173\\u95ED\r\n\r\n#XBUT: Button to accept\r\nOK=\\u786E\\u5B9A\r\n\r\n#XBUT: Button to affirm\r\nYES=\\u662F\r\n\r\n#XBUT: Button to decline\r\nNO=\\u5426\r\n\r\n#XBUT: Button to Save Draft\r\nSAVE_DRAFT=\\u4FDD\\u5B58\\u8349\\u7A3F\r\n\r\n# XTIT: \r\nTIMESHEET_TITLE=\\u6211\\u7684\\u5DE5\\u65F6\\u8868\r\n\r\n#XTIT:\r\nINTERNAL_ERROR=\\u5185\\u90E8\\u9519\\u8BEF\r\n\r\n#XFLD:\r\nINTERNAL_ERROR_BODY=\\u5E94\\u7528\\u4E2D\\u53D1\\u751F\\u4E0E\\u9519\\u8BEF\\u5904\\u7406\\u76F8\\u5173\\u7684\\u5185\\u90E8\\u9519\\u8BEF\\u3002\r\n\r\n# XTIT:\r\nFAV_DIALOG_BOX=\\u5220\\u9664\\u6536\\u85CF\\u5939\r\n\r\n# XTIT: \r\nTIMESHEET=\\u5DE5\\u65F6\\u8868\\u6761\\u76EE\r\n\r\n#XBUT: Button for quick entry\r\nQUICK_FILL=\\u5FEB\\u6377\\u8F93\\u5165\r\n\r\n# XFLD: Apply to\r\nENTRY_VIEW_APPLY_TO=\\u5E94\\u7528\\u4E8E\r\n\r\n# XTIT: \r\nTIMESHEET_DETAILS_TITLE=\\u8BE6\\u7EC6\\u4FE1\\u606F\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_CREATE_ENTRY_TITLE=\\u521B\\u5EFA\\u65F6\\u95F4\\u6761\\u76EE\r\n\r\n# XTIT: Title for create entry view with multiple days selected\r\nTIMESHEET_CREATE_ENTRIES_TITLE=\\u9488\\u5BF9 {0} \\u5929\\u521B\\u5EFA\\u6761\\u76EE\r\n\r\n# XTIT: Title for Entry Details\r\nENTRY_DETAILS=\\u6761\\u76EE\\u8BE6\\u7EC6\\u4FE1\\u606F\r\n\r\n# XTIT: Title for edit entry view for a particular date ({0} = date)\r\nTIMESHEET_EDIT_ENTRY_TITLE={0} \\u7684\\u6761\\u76EE\\u8BE6\\u7EC6\\u4FE1\\u606F\r\n\r\n# XTIT: Title for create entry view for a particular date ({0} = date)\r\nTIMESHEET_NEW_ENTRY_TITLE=\\u9488\\u5BF9 {0} \\u521B\\u5EFA\\u6761\\u76EE\r\n\r\n# XTIT: Month short header\r\nMONTH_0=01\r\n# XTIT: Month short header\r\nMONTH_1=02\r\n# XTIT: Month short header\r\nMONTH_2=03\r\n# XTIT: Month short header\r\nMONTH_3=04\r\n# XTIT: Month short header\r\nMONTH_4=05\r\n# XTIT: Month short header\r\nMONTH_5=06\r\n# XTIT: Month short header\r\nMONTH_6=07\r\n# XTIT: Month short header\r\nMONTH_7=08\r\n# XTIT: Month short header\r\nMONTH_8=09\r\n# XTIT: Month short header\r\nMONTH_9=10\r\n# XTIT: Month short header\r\nMONTH_10=11\r\n# XTIT: Month short header\r\nMONTH_11=12\r\n\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_0=1 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_1=2 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_2=3 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_3=4 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_4=5 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_5=6 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_6=7 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_7=8 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_8=9 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_9=10 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_10=11 \\u6708\r\n# XTIT: Month title for calendar\r\nMONTH_FULL_11=12 \\u6708\r\n\r\n# XTIT: Legend missing day\r\nMISSING_DAY=\\u9700\\u8981\\u91C7\\u53D6\\u63AA\\u65BD\r\n# XTIT: Legend filled day\r\nFILLED_DAY=\\u5B8C\\u6210\r\n# XTIT: Legend filled in process, manager action needed\r\nFILLED_MANAGER=\\u9700\\u8981\\u5BA1\\u6279\\u4EBA\\u64CD\\u4F5C\r\n# XFLD: Rejected by manager - this appears on the legend\r\nREJECTED=\\u5DF2\\u62D2\\u7EDD\r\n# XFLD: Legend future working day\r\nWORKING_DAY=\\u5DE5\\u4F5C\\u65E5\r\n# XFLD: Legend non-working day\r\nNON_WORKING_DAY=\\u975E\\u5DE5\\u4F5C\\u65E5\r\n# XFLD: Legend selected working day\r\nSELECTED_DAY=\\u6240\\u9009\\u65E5\\u671F\r\n# XFLD: Legend selected non-working day\r\nSELECTED_NW_DAY=\\u6240\\u9009\\u975E\\u5DE5\\u4F5C\\u65E5\r\n# XFLD: Legend current day\r\nCURRENT_DAY=\\u5F53\\u65E5\r\n\r\n# XMSG: Footer information about missing hours\r\nTOTAL_MISSING=\\u7F3A\\u5C11\\u65F6\\u6570\\u603B\\u8BA1\\uFF1A{0}\r\n\r\n#XFLD:\r\nMONTH_YEAR={0} {1}\\uFF08{2} \\u5C0F\\u65F6\\uFF09\r\n\r\n#XBUT: Button\r\nSAVE=\\u4FDD\\u5B58\r\n\r\n#XBUT: Button \r\nSUBMIT=\\u63D0\\u4EA4\r\n\r\n# XMSG\r\nFILL_ALL=\\u4E3A\\u4EE5\\u4E0B\\u9879\\u8F93\\u5165 {0} \\u5C0F\\u65F6\\uFF1A\r\n\r\n#XFLD\r\nNO_TASK_TYPE=\\u65E0\\u4EFB\\u52A1\\u7C7B\\u578B\r\n\r\n#XFLD\r\nMISSING_DAYS=\\u7F3A\\u5C11\\u5929\\u6570\\uFF1A{0}\r\n\r\n#XBUT: Button\r\nHOME=\\u4E3B\\u5C4F\\u5E55\r\n\r\n#XTIT: confirmation header\r\nCONFIRMATION=\\u786E\\u8BA4\r\n\r\n#XTIT: deletion confirmation header\r\nDELETE_CONFIRMATION=\\u786E\\u8BA4\\u5220\\u9664\r\n\r\n#XTIT: submission confirmation header\r\nSUBMISSION_CONFIRMATION=\\u786E\\u8BA4\\u63D0\\u4EA4\r\n\r\n#XTIT: Draft submission confirmation header\r\nDRAFT_CONFIRMATION=\\u786E\\u8BA4\\u8349\\u7A3F\r\n\r\n#XFLD: label for Deletion summary in Dialog\r\nDELETE_CONFIRMATION_SUMMARY=\\u5F85\\u5220\\u9664\\u7684\\u9009\\u4E2D\\u65F6\\u95F4\\u6761\\u76EE\\u6C47\\u603B\r\n\r\n#XFLD: label for Submission summary in Dialog\r\nSUBMISSION_CONFIRMATION_SUMMARY=\\u5F85\\u63D0\\u4EA4\\u7684\\u9009\\u4E2D\\u65F6\\u95F4\\u6761\\u76EE\\u6C47\\u603B\r\n\r\n#XFLD: label for Draft Submission summary in Dialog\r\nDRAFT_CONFIRMATION_SUMMARY=\\u6240\\u9009\\u65F6\\u95F4\\u6761\\u76EE\\u6C47\\u603B\r\n\r\n#XFLD: label for Number of entries in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u6761\\u76EE\\u6570\r\n\r\n#XFLD: label for Number of hours in Dialog\r\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u5C0F\\u65F6\\u6570\r\n\r\n#XBUT: Confirm Button\r\nCONFIRM=\\u786E\\u8BA4\r\n\r\n#XMSG: Summary for confirmation - these are two dates\r\nSUMMARY={0} - {1}\r\n\r\n#XMSG: Date Range for a particular week\r\nWEEK_DATE_RANGE={0} - {1}\r\n\r\n#XMSG: Recorded hour equals to one\r\nTOTAL_RECORDED_HOUR={0} \\u5C0F\\u65F6\r\n\r\n#XMSG: Total recorded hours for a particular week\r\nTOTAL_RECORDED_HOURS={0} \\u5C0F\\u65F6\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\r\nWEEKLY_RECORDED_HOUR={0} \\u5C0F\\u65F6 / {1} \\u5C0F\\u65F6\r\n\r\n#XMSG: Total recorded hours for a particular week per target hours\r\nWEEKLY_RECORDED_HOURS={0} \\u5C0F\\u65F6 / {1} \\u5C0F\\u65F6\r\n\r\n#XMSG: Total target hours for a particular week\r\nTOTAL_TARGET_HOURS=\\u76EE\\u6807\\uFF1A{0} \\u5C0F\\u65F6 \r\n\r\n#XMSG: Total assignments for multiple entries\r\nTOTAL_ASSIGNMENTS={0} \\u65F6\\u95F4\\u5206\\u914D\r\n\r\n#XMSG: Total assignments for one entry\r\nTOTAL_ASSIGNMENT=1 \\u9879\\u65F6\\u95F4\\u5206\\u914D\r\n\r\n#XMSG: No Assignments\r\nNO_ASSIGNMENT=\\u65E0\\u5206\\u914D\r\n\r\n#XMSG: No Recordings\r\nNO_RECORDING=\\u65E0\\u8BB0\\u5F55\r\n\r\n#XMSG: Total approved hours for a particular week\r\nTOTAL_APPROVED_HOURS={0} \\u5C0F\\u65F6\\u5DF2\\u83B7\\u6279\\u51C6\r\n\r\n#XMSG: Save Favorite with time \r\nSAVE_FAVORITE_WITH_TIME=\\u4FDD\\u5B58\\uFF08\\u6709\\u65F6\\u95F4\\uFF09\r\n\r\n#XMSG: Save Favorite without time \r\nSAVE_FAVORITE_WITHOUT_TIME=\\u4FDD\\u5B58\\uFF08\\u65E0\\u65F6\\u95F4\\uFF09\r\n\r\n#XMSG: Delete Favorites\r\nDELETE_FAVORITES=\\u5220\\u9664\\u6536\\u85CF\\u5939\r\n\r\n#XBUT: Save as favorite\r\nSAVE_AS_FAV=\\u53E6\\u5B58\\u4E3A\\u6536\\u85CF\\u9879\r\n\r\n#XBUT: Manage favorites\r\nMANAGE_FAVORITES=\\u7BA1\\u7406\\u6536\\u85CF\\u5939\r\n\r\n#XFLD: Week \r\nWEEK=\\u5468\r\n\r\n#XFLD:\r\nMEET_TARGET_HOURS=\\u5C06\\u5C0F\\u65F6\\u6570\\u5E94\\u7528\\u4E8E\\uFF1A\r\n\r\n#XBUT\r\nALL_MISSING=\\u7F3A\\u5C11\\u65F6\\u95F4\\u603B\\u8BA1\\uFF08{0} \\u5C0F\\u65F6\\uFF09\r\n\r\n#XBUT: Delete Button Text\r\nDELETE=\\u5220\\u9664\r\n\r\n#XBUT: Copy Button Text\r\nCOPY=\\u590D\\u5236\r\n\r\n#XBUT: Add Button Text for Weekly Entry nav button\r\nNAV_ADD=\\u6DFB\\u52A0\\u6761\\u76EE\r\n\r\n#XFLD: label for duration\r\nDURATION=\\u6301\\u7EED\\u65F6\\u95F4\r\n\r\n#XFLD: label for total duration\r\nTOTAL_DURATION=\\u603B\\u6301\\u7EED\\u65F6\\u95F4\r\n\r\n#XFLD: label for status\r\nSTATUS=\\u72B6\\u6001\r\n\r\n#XFLD: label for start time\r\nSTART_TIME=\\u5F00\\u59CB\\u65F6\\u95F4\r\n\r\n#XFLD: label for Favorite Name\r\nFAVORITE_NAME=\\u6536\\u85CF\\u9879\\u540D\\u79F0\r\n\r\n#XFLD: label for end Time\r\nEND_TIME=\\u7ED3\\u675F\\u65F6\\u95F4\r\n\r\n#XFLD: label for note\r\nNOTE=\\u6CE8\\u91CA\r\n\r\n#XBUT: Done button\r\nDONE=\\u5B8C\\u6210\r\n\r\n# XTIT: Manual Input Add\r\nMANUAL_INPUT_ADD=\\u624B\\u52A8\r\n\r\n# XTIT: Manual Input Edit\r\nMANUAL_INPUT_EDIT=\\u7F16\\u8F91\\u6761\\u76EE\r\n\r\n# XTIT: Cost Assignment\r\nCOST_ASSIGNMENT=\\u65F6\\u95F4\\u5206\\u914D\r\n\r\n# XTIT: select favorite or worklist\r\nSELECT_FAVORITE=\\u9009\\u62E9\\u6536\\u85CF\\u9879\\u6216\\u5DE5\\u4F5C\\u6E05\\u5355\r\n\r\n# XTIT: select worklist\r\nSELECT_WORKLIST=\\u9009\\u62E9\\u5DE5\\u4F5C\\u6E05\\u5355\r\n\r\n# XTIT: Favorite\r\nFAVORITE=\\u6536\\u85CF\\u5939\r\n\r\n# XTIT: Worklist\r\nWORKLIST=\\u5DE5\\u4F5C\\u6E05\\u5355\r\n\r\n# XTIT: Add Favorite\r\nADD_FAVORITE=\\u6DFB\\u52A0\\u6536\\u85CF\\u9879\r\n\r\n# XTIT: Edit Favorite\r\nEDIT_FAVORITE=\\u7F16\\u8F91\\u6536\\u85CF\\u5939\r\n\r\n#XFLD: Tap to Load More\r\nTAP_TO_LOAD_MORE=\\u52A0\\u8F7D\\u66F4\\u591A...\r\n\r\n#XFLD: Tap to Load More Loading\r\nTAP_TO_LOAD_MORE_LOADING=\\u52A0\\u8F7D\\u4E2D...\r\n\r\n#XFLD: Continue Search on Server\r\nCONTINUE_SEARCH_ON_SERVER=\\u7EE7\\u7EED\\u5728\\u670D\\u52A1\\u5668\\u4E0A\\u641C\\u7D22...\r\n\r\n#XFLD: Continue Search on Server Loading\r\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u52A0\\u8F7D\\u4E2D...\r\n\r\n#XFLD: BLANK\r\nEMPTY=\\u7A7A\r\n\r\n#XFLD: None\r\nNONE=\\u65E0\r\n\r\n#XFLD\r\nNO_WORKLIST=\\u65E0\\u53EF\\u7528\\u5DE5\\u4F5C\\u6E05\\u5355\r\n\r\n#XFLD\r\nNO_FAVORITE=\\u65E0\\u53EF\\u7528\\u6536\\u85CF\\u9879\r\n\r\n# XTIT: Select\r\nSELECT=\\u9009\\u62E9 {0}\r\n\r\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\r\nSELECT_PLACEHOLDER=\\u9009\\u62E9\r\n\r\n#XFLD: Placeholder for cost assignment type search\r\nSEARCH=\\u641C\\u7D22...\r\n\r\n#XFLD: short label for hours\r\nHOURS_LABEL=\\u5C0F\\u65F6\r\n\r\n#XFLD: short label for minutes\r\nMINUTES_LABEL=\\u5206\r\n\r\n#XFLD: full label for hours \r\nHOURS_LABEL_FULL=\\u5C0F\\u65F6\r\n\r\n#XFLD: full label for minutes\r\nMINUTES_LABEL_FULL=\\u5206\\u949F\r\n\r\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\r\nDATE_LOCALE=YYYY, MMM DD\r\n\r\n#XBUT:\r\nDETAIL=\\u8BE6\\u7EC6\\u4FE1\\u606F\r\n\r\n#XFLD: label for Settings title\r\nSETTINGS_TITLE=\\u8BBE\\u7F6E\r\n\r\n# XMSG: \r\nCONFIRM_LEAVE_PAGE=\\u6240\\u6709\\u672A\\u4FDD\\u5B58\\u7684\\u6570\\u636E\\u90FD\\u5C06\\u653E\\u5F03\\u3002\\u662F\\u5426\\u786E\\u5B9A\\u7EE7\\u7EED\\uFF1F\r\n\r\n# XTIT: \r\nUNSAVED_CHANGES=\\u672A\\u4FDD\\u5B58\\u7684\\u66F4\\u6539\r\n\r\n#XMSG: toast message for successful submit\r\nSUBMIT_SUCCESS=\\u5DF2\\u63D0\\u4EA4\\u7533\\u8BF7\\u3002\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_NAME_ERROR=\\u8BF7\\u5728\\u201C\\u65F6\\u95F4\\u5206\\u914D\\u201D\\u8F93\\u5165\\u5B57\\u6BB5\\u4E2D\\u8F93\\u5165\\u6536\\u85CF\\u9879\\u540D\\u79F0\\u3002\r\n\r\n#XMSG: toast message if favorite data is not recorded\r\nFAV_DATA_ERROR=\\u8F93\\u5165\\u5185\\u5BB9\\u4EE5\\u5C06\\u5176\\u53E6\\u5B58\\u4E3A\\u6536\\u85CF\\u9879\\u3002\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_TIME_ERROR=\\u8BF7\\u8F93\\u5165\\u6709\\u6548\\u6301\\u7EED\\u65F6\\u95F4\\u3002\r\n\r\n#XMSG: toast message if favorite time is not recorded\r\nFAV_CLOCK_TIME_ERROR=\\u8F93\\u5165\\u6709\\u6548\\u5F00\\u59CB\\u65F6\\u95F4\\u548C\\u7ED3\\u675F\\u65F6\\u95F4\\u3002\r\n\r\n#XMSG: toast message for successful draft submit\r\nDRAFT_SUCCESS=\\u5DF2\\u6210\\u529F\\u4FDD\\u5B58\\u8349\\u7A3F\\u3002\r\n\r\n#XMSG: toast message for successful submit favorites\r\nFAVORITE_SUBMIT_SUCCESS=\\u6536\\u85CF\\u9879\\u5DF2\\u521B\\u5EFA\\u3002\r\n\r\n#XMSG: toast message for successful updating of favorites\r\nFAVORITE_UPDATE_SUCCESS=\\u6536\\u85CF\\u9879\\u5DF2\\u66F4\\u65B0\\u3002\r\n\r\n#XMSG: toast message for successful delete of a favorite\r\nFAVORITE_DELETE_SUCCESS=\\u6536\\u85CF\\u9879\\u5DF2\\u5220\\u9664\\u3002\r\n\r\n#XBUT:\r\nHELP=\\u5E2E\\u52A9\r\n\r\n#XMSG: confirmation message for week entry\r\nTOTAL_BOOKED=\\u5DF2\\u4E3A\\u6B64\\u661F\\u671F\\u8F93\\u5165 {0}/{1} \\u5C0F\\u65F6\r\n\r\n#XMSG: help text for pre-fill option\r\nHELP_PREFILL=\\u6253\\u5F00\\u9884\\u586B\\u5145\\uFF0C\\u57FA\\u4E8E\\u60A8\\u6700\\u540E\\u6210\\u529F\\u8F93\\u5165\\u7684\\u5185\\u5BB9\\u5FEB\\u901F\\u586B\\u5145\\u8BE5\\u5468\\u7684\\u5C0F\\u65F6\\u6570\\u3002\r\n\r\n#XMSG: error pop-up message text\r\nERROR_SUBMIT=\\u67D0\\u4E9B\\u6761\\u76EE\\u4E0D\\u6B63\\u786E\\u3002\\u8BF7\\u68C0\\u67E5\\u9519\\u8BEF\\u8BE6\\u7EC6\\u4FE1\\u606F\\u5E76\\u66F4\\u6B63\\u6761\\u76EE\\u3002\r\n\r\n#XMSG: error pop-up message text\r\nSUBMIT_HEADER_TEXT={0} \\u548C {1} \\u5929\\u7684\\u65F6\\u95F4\\u6761\\u76EE\r\n\r\n# XTIT: Title for create entry view\r\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u7F16\\u8F91\\u65F6\\u95F4\\u6761\\u76EE\r\n\r\n#XMSG: Header in edit screen for single date\r\nSUBMIT_HEADER_TEXT_SINGLE={0} \\u7684\\u65F6\\u95F4\\u6761\\u76EE\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nFULL_CONCATENATE_HOURSMIN={0} \\u5C0F\\u65F6 {1} \\u5206\r\n\r\n# XFLD: Concatenate hours and minutes full\r\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\r\n\r\n#XBUT: Button to reset\r\nRESET=\\u91CD\\u7F6E\r\n\r\n#XBUT: Button to update\r\nUPDATE=\\u66F4\\u65B0\r\n\r\n#XBUT: Button to add favorite\r\nFAVORITE_BTN=\\u6DFB\\u52A0\\u6536\\u85CF\\u9879\r\n\r\n#XBUT: Button to create\r\nCREATE=\\u521B\\u5EFA\r\n\r\n#XTIT: Existing favorite name\r\nEXISTING_FAV_NAME=\\u5F53\\u524D\\u6536\\u85CF\\u5939\\u540D\\u79F0\r\n\r\n#XTIT: new favorite name\r\nNEW_FAVORITE_NAME=\\u65B0\\u6536\\u85CF\\u5939\\u540D\\u79F0\r\n\r\n#XTIT: time\r\nTIME=\\u65F6\\u95F4\r\n',
	"hcm/mytimesheet/model/TimeEntry.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.model.TimeEntry");

hcm.mytimesheet.model.TimeEntry = function(time, childName, suggestion, bExisting) {
	this.time = time;
	this.hours = Math.floor(time);
	this.minutes = Math.round((time - Math.floor(time)) * 60);
	this.suggestion = suggestion===undefined ? false : suggestion;
	this.newEntry = !bExisting;
	this.mainItem = null;
	this.subItems = childName;
	this.notes = null;
	this.startTime = "";
	this.endTime = "";
	this.counter = "";
	this.hasNotes = false;
	this.showTime = bExisting;
	this.showError = false;
	this.error = "";
	this.status = "";
	this.timeUnit = "";
	this.statusId = "";
};

hcm.mytimesheet.model.TimeEntry.prototype.setStartEndTimes = function(
		date, entries, missingTime, workingDay) {
	var lastUndeletedIndex = entries.length-1;
	while(lastUndeletedIndex>=0 && entries[entries.length-1].deleted) {
		lastUndeletedIndex--;
	}
	var startTime = this.createTime(date, lastUndeletedIndex>=0 ?
			entries[lastUndeletedIndex].endTime :
			workingDay.startTime);
	var lunchStart = this.createTime(date, workingDay ? workingDay.lunchStart : "000000");
	var lunchEnd = this.createTime(date, workingDay ? workingDay.lunchEnd : "000000");
	if(startTime.getTime()===lunchStart.getTime()) {
		// the lunch break is before the start time
		startTime.setTime(startTime.getTime() + lunchEnd.getTime()-lunchStart.getTime());
	}
	var endTime = new Date(startTime.getTime() + missingTime*3600000);
	if(startTime.getTime() < lunchStart.getTime()) {
		endTime.setTime(endTime.getTime() + lunchEnd.getTime()-lunchStart.getTime());
	}
	this.startTime = (startTime.getHours()+100).toString().substring(1, 3) + (startTime.getMinutes()+100).toString().substring(1, 3) + "00";
	this.endTime = (endTime.getHours()+100).toString().substring(1, 3) + (endTime.getMinutes()+100).toString().substring(1, 3) + "00";
};

hcm.mytimesheet.model.TimeEntry.prototype.createTime = function(
		date, timeStr) {
	var time = new Date(date.getTime());
	time.setHours(parseInt(timeStr.substring(0, 2), 10), parseInt(timeStr.substring(2, 4), 10));
	return time;
};

hcm.mytimesheet.model.TimeEntry.prototype.setData = function(
		data) {
	if (data.FieldName === "TIME") {
		this.recordNumber = data.RecordNumber;
		this.time = parseFloat(data.FieldValue.trim());
		this.hours = Math.floor(this.time);
		this.minutes = Math
				.round((this.time - this.hours) * 60);
		this.startTime = data.StartTime;
		this.endTime = data.EndTime;
	} else if (data.FieldName === "NOTES") {
		this.notes = data.FieldValueText;
		if (this.notes && this.notes.length > 0) {
			this.hasNotes = true;
		}
	} else if (data.FieldName === "MEINH") {
		this.timeUnit = data.FieldValue;
	} else if (data.FieldName === "STARTTIME") {
		this.startTime = data.FieldValueText;
	} else if (data.FieldName === "ENDTIME") {
		this.endTime = data.FieldValueText;
	} else if (data.FieldName === "COUNTER") {
		this.counter = data.FieldValueText;
	} else if (data.FieldName === "REASON") {
		this.rejectionReason = data.FieldValueText;
	} else if (data.FieldName === "STATUS") {
		this.status = data.FieldValueText;
		this.statusId = data.FieldValue;
	} else if (data.Level === "0") {// this is the Bold item
		this.mainItem = data.FieldValueText;
		this.mainCode = data.FieldValue;
		this.mainName = data.FieldName;
	} else {
		if (this.subItems) {
			if(data.FieldName !== "LTXA1"){
				this.subItems += ", " + data.FieldValueText;
			}
			this.childItems.push(data.FieldValueText);
			this.childCodes.push(data.FieldValue);
			this.childNames.push(data.FieldName);
		} else {
			if(data.FieldName !== "LTXA1"){
				this.subItems = data.FieldValueText;
			}
			this.childItems = [ data.FieldValueText ];
			this.childCodes = [ data.FieldValue ];
			this.childNames = [ data.FieldName ];
		}
	}
};
},
	"hcm/mytimesheet/utils/ConcurrentEmployment.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.utils.ConcurrentEmployment");
/*global hcm:true */
hcm.mytimesheet.utils.ConcurrentEmployment = {

	getCEEnablement: function(self, successHandler) {
		this.initialize(self, successHandler);
		var oModel = new sap.ui.model.json.JSONModel();
		self.oService.getPersonellAssignments(self, function(data) {
			if (data.length > 1) {
				oModel.setData(data);
				self.oCEForm.setModel(oModel);
				self.oCEDialog.open();
			}
			else{
			    self.oApplication.pernr = data[0].Pernr;
			    successHandler();
			}

		});

	},
	initialize: function(self, successHandler) {
	    this.setControllerInstance(self);
		var itemTemplate = new sap.m.RadioButton({
			text: "{AssignmentText}",
			customData: new sap.ui.core.CustomData({
				"key": "Pernr",
				"value": "{Pernr}"
			})
		});
		self.oCESelect = new sap.m.RadioButtonGroup().bindAggregation("buttons", "/", itemTemplate);
		self.oCEForm = new sap.ui.layout.form.Form({
			maxContainerCols: 2,
			class: "sapUiLargeMarginTopBottom",
			layout: new sap.ui.layout.form.ResponsiveGridLayout({
				labelSpanL: 12,
				// emptySpanL: 3,
				labelSpanM: 12,
				// emptySpanM: 2,
				labelSpanS: 12,
				columnsL: 2,
				columnsM: 2
			}),
			formContainers: new sap.ui.layout.form.FormContainer({
				formElements: [
                                       new sap.ui.layout.form.FormElement({
                    						label: new sap.m.Label({
                    							text: self.oBundle.getText("PERSONAL_ASSIGN")
                    						}),
                    						fields: self.oCESelect
                    					})
                               ]
			})
		});
		
		self.oCEDialog = new sap.m.Dialog({
			title:self.oBundle.getText("PERSONAL_ASSIGN_TITLE"),
			class: "sapUiContentPadding sapUiLargeMarginTopBottom",
			content: self.oCEForm,
			buttons: [
			    new sap.m.Button({
					text: self.oBundle.getText("OK"),
					press: function() {
						self.oCEDialog.close();
						self.oApplication.pernr = self.oCESelect.getSelectedButton().data().Pernr;
						successHandler();
					}
				}),
			    new sap.m.Button({
					text: self.oBundle.getText("CANCEL"),
					press: function() {
						self.oCEDialog.close();
						self.oCEDialog.Cancelled = true;  
                        /* eslint-disable sap-browser-api-warning */          
                                window.history.go(-1);    
                        /* eslint-enable sap-browser-api-warning */        
					    //}
					}
				})
			]
		});
		self.oCEDialog.attachAfterClose(function(){
		    if(!self.oApplication.pernr && self.oCEDialog.Cancelled !== true){
		        self.oCEDialog.open();
		    }
		});
	},
	
	setControllerInstance: function(me){
	    this.me = me;    
	},
	
	getControllerInstance: function(){
	    return this.me;  
	}

};
},
	"hcm/mytimesheet/utils/DataManager.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.utils.DataManager");
jQuery.sap.require("sap.ui.model.odata.datajs");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ca.ui.message.message");
jQuery.sap.require("sap.ui.base.EventProvider");
jQuery.sap.require("hcm.mytimesheet.utils.InitialConfigHelper");
jQuery.sap.require("sap.m.MessageBox");

sap.ui.base.EventProvider
	.extend(
		"hcm.mytimesheet.Service", {
			metadata: {
				publicMethods: ["getModel", "getGeneralParameters",
								"getSpendingDataByHierarhyNodesAndPeriod",
								"getGenericLineItemsByHierNodesAndPeriod",
								"getTrendDataByHierarchyNodes", "setBundle"]
			},
			constructor: function() {
				this._nCounter = 0;
				this._busyDialog = new sap.m.BusyDialog();
			},

			_initialize: function(appController) {
				if (!this.oApplication) {
					this.oApplication = appController.oApplicationFacade.oApplicationImplementation;
					this.oConfiguration = appController.oConfiguration;
					this.oConnectionManager = appController.oApplication
						.getConnectionManager();
				}

				if (!this.oBundle) {
					this.oBundle = appController.oApplicationFacade.oApplicationImplementation.getResourceBundle();
				}
				this.oConfiguration.setResourceBundle(this.oBundle);
				this.oDataModel = this.oConnectionManager.getModel();
				this.oDataModel
					.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			},

			processError: function(oError) {
				var message = "";
				var messageDetails = "";
				if (oError.response) {
					var body = oError.response.body;
					try {
						body = JSON.parse(body);
						if (body.error.innererror && body.error.innererror.errordetails) {

							var errors = body.error.innererror.errordetails;
							for (var i = 0; i < errors.length; i++) {
								if (errors[i].code.match("/IWBEP")) {
									continue;
								}
								messageDetails += errors[i].code + " : " + errors[i].message + "\n";
							}

						}
						if (messageDetails === "") {
							messageDetails = body.error.code + " : " + body.error.message.value;
						}
						message = body.error.message.value;
					} catch (e) {
						jQuery.sap.log.warning("Could parse the response", ["parseError"], ["hcm.mytimesheet"]);
					}
				}
				if (message === "") {
					message = this.oBundle.getText("INTERNAL_ERROR");
				}
				if (messageDetails === "") {
					messageDetails = this.oBundle.getText("INTERNAL_ERROR_BODY");
				}
				var oMessage = {
					message: message,
					details: messageDetails,
					type: sap.m.MessageBox.Icon.ERROR
					// 	type: sap.ca.ui.message.Type.ERROR
				};

				try {
					sap.m.MessageBox.show(
						oMessage.message, {
							icon: oMessage.type,
							title: this.oBundle.getText("ERROR"),
							actions: [sap.m.MessageBox.Action.OK],
							details: oMessage.details,
							onClose: function(oAction) {}
						}
					);
				} catch (o) {
					oMessage.type = sap.ca.ui.message.Type.ERROR;
					sap.ca.ui.message.showMessageBox({
						type: sap.ca.ui.message.Type.ERROR,
						message: oMessage.message,
						details: oMessage.details
					});
				}

			},

			getPersonellAssignments: function(appController, fSuccess) {

				var self = this;
				this._initialize(appController);
				this.oDataModel
					.read(
						"/ConcurrentEmploymentSet",
						null, [],
						true,
						function(oData) {
							fSuccess(oData.results);
						},
						function(oError) {
							self.processError(oError);
						});

			},

			getWorkDays: function(appController, pernr, begda, endda, fSuccess) {
				// 		this.showBusy();
				var self = this;
				this._initialize(appController);
				this.oDataModel
					.read(
						"/WorkCalendars",
						null, ["$filter=Pernr eq '" + pernr
								  + "' and StartDate eq '" + begda
								  + "' and EndDate eq '"
								  + endda + "'"],
						true,
						function(oData) {
							fSuccess(oData.results);
							// 	self.hideBusy();
						},
						function(oError) {
							// 	self.hideBusy(true);
							self.processError(oError);
						});

			},

			getFavorites: function(appController, pernr, /*begda, endda,*/ fSuccess) {
				this.showBusy();
				var self = this;
				this._initialize(appController);
				this.oDataModel
					.read(
						"/Favorites",
						null, ["$filter=Pernr eq '" + pernr
								  + "'"],
						true,
						function(oData) {
							self.hideBusy();
							fSuccess(oData.results);

						},
						function(oError) {
							self.hideBusy(true);
							self.processError(oError);
						});

			},

			createFavorite: function(appController, favObj, fSuccess) {
				this.showBusy();
				var self = this;
				this._initialize(appController);
				this.oDataModel.create("/Favorites", favObj, null, function(oData) {
						self.hideBusy();
						var toastMsg = self.oBundle.getText("FAVORITE_SUBMIT_SUCCESS");
						sap.m.MessageToast.show(toastMsg, {
							duration: 3000
						});
						fSuccess(oData);
					},
					function(oError) {
						self.processError(oError);
						self.hideBusy();
					});
			},

			updateFavorite: function(appController, favObj, fSuccess) {
				this.showBusy();
				var self = this;
				this._initialize(appController);
				var path = "/Favorites(ID='" + favObj.ID.trim() + "',Pernr='" + favObj.Pernr + "')";
				this.oDataModel.update(path, favObj, null, function(oData) {
						self.hideBusy();
						var toastMsg = self.oBundle.getText("FAVORITE_UPDATE_SUCCESS");
						sap.m.MessageToast.show(toastMsg, {
							duration: 3000
						});
						fSuccess(oData);
					},
					function(oError) {
						self.processError(oError);
						self.hideBusy();
					});
			},

			deleteFavorite: function(appController, favObj, fSuccess) {
				// this.showBusy();
				var self = this;
				this._initialize(appController);
				var path = "/Favorites(ID='" + favObj.ID.trim() + "',Pernr='" + favObj.Pernr + "')";
				this.oDataModel.remove(path, null, function(oData) {
						self.hideBusy();
						var toastMsg = self.oBundle.getText("FAVORITE_DELETE_SUCCESS");
						sap.m.MessageToast.show(toastMsg, {
							duration: 3000
						});
						fSuccess(oData);
					},
					function(oError) {
						self.processError(oError);
						self.hideBusy();
					});
			},

			getTimeDataList: function(appController, pernr, begda, endda, fSuccess) {
				this.showBusy();
				var self = this;

				this._initialize(appController);
				this.oDataModel
					.read(
						"/TimeDataList",
						null, ["$filter=Pernr eq '" + pernr
								  + "' and StartDate eq '" + begda
								  + "' and EndDate eq '"
								  + endda + "'"],
						true,
						function(oData) {
							for (var i = 0; i < oData.results.length; i++) {
								oData.results[i].Level = oData.results[i].Level.toString().trim();
							}
							self.hideBusy();
							fSuccess(oData.results);

						},
						function(oError) {
							self.hideBusy(true);
							self.processError(oError);
						});

			},

			getWorkListCollection: function(appController, pernr, begDa, endDa, fSuccess) {
				this.showBusy();
				var self = this;

				this._initialize(appController);

				this.oDataModel
					.read(
						"/WorkListCollection",
						null, ["$filter=Pernr eq '" + pernr
								                + "' and StartDate eq '" + begDa + "' and EndDate eq '"
												+ endDa + "'"],
						true,
						function(oData) {
							self.hideBusy();
							fSuccess(oData.results);

						},
						function(oError) {
							self.hideBusy(true);
							self.processError(oError);
						});

			},

			getProfileFields: function(appController, pernr, fSuccess) {
				this.showBusy();
				var self = this;

				this._initialize(appController);
				this.oDataModel
					.read(
						"/ProfileFields",
						null, ["$filter=Pernr eq '" + pernr
								                        + "'"],
						true,
						function(oData) {
							self.hideBusy();
							fSuccess(oData.results);

						},
						function(oError) {
							self.hideBusy(true);
							self.processError(oError);
						});

			},

			getValueHelpList: function(pernr, fieldName,
				top, skip, searchString, fieldRelated, begDa, endDa, fSuccess) {
				this.showBusy();
				var self = this;
				var queryString = ["$filter=Pernr eq '" + pernr
								    + "' and FieldName eq '"
									+ fieldName + "'"];
				queryString[0] += " and StartDate eq '" + encodeURIComponent(begDa) + "'" + " and EndDate eq '" + encodeURIComponent(endDa) + "' "; //adding begin and end dates to the filter

				if (searchString) {
					queryString[0] += "and substringof('" + encodeURIComponent(searchString) + "',FieldValue)";
				}
				if (fieldRelated) {
					queryString[0] += "and FieldRelated eq '" + encodeURIComponent(fieldRelated) + "'";
				}
				queryString[0] += "&$top=" + top + "&$skip=" + skip;
				this._initialize();

				this.oDataModel
					.read(
						"/ValueHelpList",
						null,
						queryString,
						true,
						function(oData) {
							self.hideBusy();
							fSuccess(oData.results);

						},
						function(oError) {
							self.hideBusy(true);
							self.processError(oError);
						});

			},

			getInitialInfos: function(appController, pernr, begda, endda) {

				this._initialize(appController);
				var self = this;
				this.oDataModel
					.read(
						"/InitialInfos",
						null, ["$filter=Pernr eq '" + pernr
								                    + "' and StartDate eq '" + begda
													+ "' and EndDate eq '"
													+ endda + "'"],
						false,
						function(oData) {
							//   oData.results[0].ClockEntry = "T";
							self.oConfiguration.setInitialInfoModel(oData.results[0]);
						},
						function(oError) {
							self.processError(oError);
						});

			},

			submitTimeEntry: function(appController, timeEntryCreated,
				timeEntryUpdated, timeEntryDeleted, fnSuccess,
				fnFailure) {
				this.showBusy();

				this._initialize(appController);
				var self = this;

				var arrEntry1 = timeEntryCreated
					.concat(timeEntryUpdated);
				var finalEntry = arrEntry1.concat(timeEntryDeleted);

				var mainModel = this.oDataModel;
				// keep posts with errors
				this.errors = [];
				this.responseData = [];

				mainModel
					.refreshSecurityToken(
						function() {
							for (var i = 0; i < finalEntry.length; i++) {
								self.data = finalEntry[i];
								var batch = mainModel
									.createBatchOperation(
										"/TimeEntries",
										"POST",
										self.data);
								var batchchanges = [];
								batchchanges.push(batch);
								mainModel
									.addBatchChangeOperations(batchchanges);
							}

							mainModel
								.submitBatch(
									function(oData /*,oResponse,aErrorResponses*/ ) {
										var hasError = [],
											messageHdr = "",
											message = "",
											errFlag = false;
										self.errors = [];
										for (i = 0; i < oData.__batchResponses.length; i++) {
											message = "";

											if (oData.__batchResponses[i].response) {
												var body = oData.__batchResponses[i].response.body;
												try {
													body = JSON.parse(body);
													if (messageHdr === "") {
														messageHdr = body.error.message.value;
													}
													var errordetails = body.error.innererror.errordetails;
													for (var j = 0; j < errordetails.length; j++) {
														if (errordetails[j].code.match("/IWBEP")) {
															continue;
														}
														message += errordetails[j].code + ":" + errordetails[j].message + "\n";
														if (errordetails[i].severity === "error") {
															errFlag = true;
														}
													}
												} catch (e) {
													jQuery.sap.log.warning("Could parse the response", ["submitTimeEntry"], ["hcm.mytimesheet"]);
												}
												self.errors
													.push({
														counter: finalEntry[i].Counter,
														workdate: finalEntry[i].TimeEntryDataFields.WORKDATE,
														time: finalEntry[i].TimeEntryDataFields.CATSHOURS,
														message: message,
														messageHdr: messageHdr,
														errorFlag: errFlag,
														body: body
													});

											} else if (oData.__batchResponses[i].__changeResponses) {
												hasError[i] = false;
												self.responseData
													.push(oData.__batchResponses[i].__changeResponses[0].data);
											}

										}

										// after submit release busy icon and call success/fail functions
										self.hideBusy(true);
										self._initialize();
										var errorDates = [];
										if (self.errors.length > 0) {
											var messageList = "";
											for (i = 0; i < self.errors.length; i++) {
												var dateStr = self.errors[i].workdate;
												var y = parseInt(dateStr.substr(0, 4), 10);
												var m = parseInt(dateStr.substr(5, 2), 10) - 1;
												var d = parseInt(dateStr.substr(8, 2), 10);

												var dateError = self.formatDateMMMDD(new Date(y, m, d, 0, 0, 0, 0));
												errorDates.push((new Date(y, m, d, 0, 0, 0, 0)).toDateString());

												messageList += dateError + ":- \n" + self.errors[i].message + "\r\n";
											}
											var type;
											if (errFlag) {
												// type = sap.ca.ui.message.Type.ERROR;
												type = sap.m.MessageBox.Icon.ERROR;
											} else {
												// type = sap.ca.ui.message.Type.WARNING;
												type = sap.m.MessageBox.Icon.WARNING;
											}
											if (messageHdr === "") {
												messageHdr = self.oBundle.getText("INTERNAL_ERROR");
											}
											if (self.errors.length === 1 && self.errors[0].message === "") {
												messageList = self.oBundle.getText("INTERNAL_ERROR_BODY");
											}
											var oMessage = {
												message: messageHdr,
												details: messageList,
												type: type
											};

											try {
												sap.m.MessageBox.show(
													oMessage.message, {
														icon: oMessage.type,
														title: self.oBundle.getText("ERROR"),
														actions: [sap.m.MessageBox.Action.OK],
														details: oMessage.details
														/*onClose: function(oAction) {
															fnFailure(hasError, errorDates);
														}*/
													}
												);
												fnFailure(hasError, errorDates);
											} catch (o) {
												if (type === sap.m.MessageBox.Icon.ERROR) {
													oMessage.type = sap.ca.ui.message.Type.ERROR;
												} else {
													oMessage.type = sap.ca.ui.message.Type.WARNING;
												}
												sap.ca.ui.message.showMessageBox({
													type: oMessage.type,
													message: oMessage.message,
													details: oMessage.details
												}, fnFailure(hasError, errorDates));
											}

										} else {
											fnSuccess();
										}
									},
									function(oError) {
										//error function for mainModel.submitBatch
										self.hideBusy(true);
										self.processError(oError);

									});

						}, function(oError) {
							//error function for mainModel.refreshSecurityToken
							self.hideBusy(true);
							self.processError(oError);
						}, true);

			},
			formatDateMMMDD: function(oDate) {
				var month = oDate.getMonth();
				var day = oDate.getDate();

				var dateString = this.oBundle.getText("MONTH_" + month) + " " + day;

				return dateString;
			},

			showBusy: function() {
				this._nCounter++;
				if (this._nCounter === 1) {
					this._busyDialog.open();

				}
			},

			hideBusy: function(forceHide) {
				if (this._nCounter === 0) {
					return;
				}
				this._nCounter = forceHide ? 0 : Math.max(0,
					this._nCounter - 1);
				if (this._nCounter > 0) {
					return;
				}
				this._busyDialog.close();
			}

		});
},
	"hcm/mytimesheet/utils/InitialConfigHelper.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.utils.InitialConfigHelper");
jQuery.sap.require("hcm.mytimesheet.utils.DataManager");
/*global hcm:true */
hcm.mytimesheet.Configuration.extend("hcm.mytimesheet.utils.InitialConfigHelper", {
			
		getText : function(sKey, aParams) {
			return this.oBundle.getText(sKey, aParams);
		},
		getInitialInfoModel: function(){
			return this.initialInfoModel;
		},
		setInitialInfoModel: function(initialInfoModel){
			this.initialInfoModel = initialInfoModel;
		},
		setResourceBundle: function(resourceBundle){
			this.oBundle = resourceBundle;
		}
	
});
},
	"hcm/mytimesheet/view/S3.controller.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("hcm.mytimesheet.utils.DataManager");
jQuery.sap.require("hcm.mytimesheet.utils.ConcurrentEmployment");
jQuery.sap.require("hcm.mytimesheet.model.TimeEntry");
jQuery.sap.require("sap.ca.ui.dialog.factory");
jQuery.sap.require("sap.ca.ui.dialog.Dialog");
jQuery.sap.require("sap.ca.ui.message.message");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("hcm.mytimesheet.utils.InitialConfigHelper");
jQuery.sap.require("sap.ca.ui.model.type.Number");
/*global hcm:true */
sap.ca.scfld.md.controller.BaseFullscreenController
	.extend(
		"hcm.mytimesheet.view.S3", {
			extHookChangeHeaderFooterOptions: null,
			extHookAlterColumns: null,
			extHookChangeObjectBeforePost: null,

			onInit: function() {

				sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);
				this.oApplication = this.oApplicationFacade.oApplicationImplementation;
				this.oBundle = this.oApplicationFacade.oApplicationImplementation.getResourceBundle();
				this.oConfiguration = new hcm.mytimesheet.utils.InitialConfigHelper();
				this.oConfiguration.setResourceBundle(this.oBundle);
				if (!this.oService) {
					this.oService = new hcm.mytimesheet.Service();
				}
				var self = this;
				sap.ui.Device.orientation.attachHandler(function(oEvent) {
					if (oEvent.landscape) {
						if (sap.ui.Device.system.phone) {
							self.byId("MTS3_SUMMARY_GRID").setDefaultSpan("L6 M12 S12");
							self.byId("MTS3_SUMMARY_GRID").rerender();
						}
					}
				});
				this.oRouter.attachRouteMatched(function(oEvent) {

					if (oEvent.getParameter("name") === "S3") {
						//only invoke if a pernr has been selected
						if (self.oApplication.pernr) {
							self.initializeView();
							self.updateData();
						}
					}
				});

			},

			onAfterRendering: function() {
				var self = this;
				if (!this.oApplication.pernr) {
					try {
						var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
						var oStartUpParameters = sap.ui.component(sComponentId).getComponentData().startupParameters; //Get pernr from the cross app nav
						this.oApplication.pernr = oStartUpParameters.pernr[0];
						this.initializeView();
						this.initializeTable();
						this.updateData();
					} catch (o) {
						hcm.mytimesheet.utils.ConcurrentEmployment.getCEEnablement(this, function() {
							self.initializeView();
							self.initializeTable();
							self.updateData();
						});
					}

				}
			},

			initializeView: function() {
				var curDate = new Date();
				var oModel;
				var s3exchgModel = this.oApplication.getModel("S3exchangeModel");
				if (s3exchgModel) {
					oModel = this.setInitialInfoModelData(s3exchgModel.getProperty("/currentDate"));
					this.oApplication.setModel(null, "S3exchangeModel");
				} else {
					oModel = this.setInitialInfoModelData(curDate);
				}

				// this.updateData();
				this.getView().setModel(oModel);

				//setting the calendar model
				this.byId("WEEKLY_CALENDAR").setModel(oModel);
				this.calendarModel = oModel;
				//Reseting and disabling the Delete Button text 
				this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
				this.setBtnEnabled("deleteBtn", false);

				this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
				this.setBtnEnabled("SUBMIT_BTN", false);

				this.setBtnText("copyBtn", this.oApplicationFacade.getResourceBundle().getText("COPY"));
				this.setBtnEnabled("copyBtn", false);

				this.checkboxList = [];
				// new model for data excahnge with s31
				var S31modelexch = new sap.ui.model.json.JSONModel();
				this.oApplication.setModel(S31modelexch, "S31modelexch");

			},

			setInitialInfoModelData: function(curDate) {
				var oModel = new sap.ui.model.json.JSONModel({
					phone: sap.ui.Device.system.phone
				});
				var noOfWeeks = 13; //by default 2 weeks are shown
				if (sap.ui.Device.system.phone) {
					noOfWeeks = 6;
					this.byId("WEEKLY_CALENDAR").setWeeksPerRow(1); //in case of mobile devices 1 week is shown
					this.byId("MTS3_SECOND_INFO").setVisible(false);
					this.byId("MTS3_SUMMARY_GRID").rerender();

				}
				var firstday = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR")
					.getFirstDayOffset(), curDate.getDay()));

				var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + noOfWeeks);
				this.oApplication.setModel(oModel, "TSM_WEEKLY");

				this.oService.getInitialInfos(this, this.oApplication.pernr, this.getDateStr(curDate), this.getDateStr(curDate));

				oModel.setProperty("/showSubmit", false);
				oModel.setProperty("/selected", this.getDateStr(curDate));
				oModel.setProperty("/selectedDate", curDate);
				oModel.setProperty("/year", curDate.getFullYear());
				oModel.setProperty("/start", this.getDateStr(curDate));
				oModel.setProperty("/weekStart", this.getDateStr(firstday));
				oModel.setProperty("/weekEnd", this.getDateStr(lastday));

				var InitalInfoModel = this.oConfiguration.getInitialInfoModel();

				this.releaseAllowed = InitalInfoModel.ReleaseDirectly === "TRUE";
				oModel.setProperty("/releaseAllowed", this.releaseAllowed);

				this.releaseFuture = (InitalInfoModel.ReleaseFuture === "TRUE");
				oModel.setProperty("/releaseFuture", this.releaseFuture);
				oModel.setProperty("/favoriteAvailable", InitalInfoModel.FavoriteAvailable);
				this.FavoriteAvailable = InitalInfoModel.FavoriteAvailable;
				this.setBtnEnabled("SUBMIT_BTN", false);
				this.clockEntry = (InitalInfoModel.ClockEntry === "TRUE");
				oModel.setProperty("/clockEntry", this.clockEntry);
				this.withTargetHours = InitalInfoModel.WithTargetHours;
				return oModel;
			},
			setWeekOverviews: function(noOfWeeks) {

				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var weekData = oModel.getProperty("/days");

				var curDate = new Date(this.byId("WEEKLY_CALENDAR").getCurrentDate());
				var firstday = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR")
					.getFirstDayOffset(), curDate.getDay()));
				var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + (7 * noOfWeeks - 1));

				oModel.setProperty("/weekStart", this.getDateStr(firstday));
				oModel.setProperty("/weekEnd", this.getDateStr(lastday));
				var first = firstday.getTime();
				// 		var firstday = new Date(first);
				// 		var lastday = new Date(last);
				var firstWeekLastDay, secondWeekFirstDay, i, totalAssignments, recordedHrsTxt, assignments;
				var targetHrsTxt, weekText, weekRange, totalTargetHrs, totalRecordedHrs, totalApprovedHours, approvedHrsTxt, entryArray1, entryArray2;

				//first week only
				//Set the title
				weekRange = [];
				// splitString = firstday.toDateString().split(" ");
				// weekRange[0] = splitString[1] + " " + splitString[2] + " - ";
				weekRange[0] = this.formatDateMMMDD(firstday);

				if (noOfWeeks === 1) {

					// 	splitString = lastday.toDateString().split(" ");formatDateMMMDD
					// 	weekRange[0] += splitString[1] + " " + splitString[2];
					weekRange[1] = this.formatDateMMMDD(lastday);
					weekText = this.oBundle.getText("WEEK_DATE_RANGE", [weekRange[0], weekRange[1]]);
					this.byId("MTS3_CURRENT_WEEK_INFO_1").setTitle(weekText);
					totalTargetHrs = 0;
					totalRecordedHrs = 0;
					totalApprovedHours = 0;
					totalAssignments = 0;
					entryArray1 = [];
					//find the statuses
					for (i = 0; i < weekData.length; i++) {
						totalTargetHrs += weekData[i].targetHours;
						totalRecordedHrs += weekData[i].recordedHours;
						totalApprovedHours += weekData[i].approvedHours;
						if (weekData[i].entries.length) {
							// 			totalAssignments++;
							entryArray1 = this.pushUniqueElements(weekData[i].entries, entryArray1);
						}
					}
					totalAssignments = entryArray1.length;
					//setting the sum to a max of 2 decimal points
					if (totalTargetHrs !== 0) {
						totalTargetHrs = this.formatTime(totalTargetHrs.toFixed(2));
					}
					if (totalRecordedHrs !== 0) {
						totalRecordedHrs = this.formatTime(totalRecordedHrs.toFixed(2));
					}
					if (totalApprovedHours !== 0) {
						totalApprovedHours = this.formatTime(totalApprovedHours.toFixed(2));
					}

					//setting the data
					if (totalRecordedHrs !== 0) {
						recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOURS", [totalRecordedHrs]);
					} else {
						recordedHrsTxt = this.oBundle.getText("NO_RECORDING");
					}
					if (totalAssignments === 1) {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENT");
					} else if (totalAssignments === 0) {
						assignments = this.oBundle.getText("NO_ASSIGNMENT");
					} else {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENTS", [totalAssignments]);
					}

					if (totalApprovedHours === 0) {
						approvedHrsTxt = " ";
					} else {
						approvedHrsTxt = this.oBundle.getText("TOTAL_APPROVED_HOURS", [totalApprovedHours]);
					}
					if (totalTargetHrs !== 0 && this.withTargetHours) {
						targetHrsTxt = this.oBundle.getText("TOTAL_TARGET_HOURS", [totalTargetHrs]);
					} else {
						targetHrsTxt = "  ";
					}
					this.byId("MTS3_CURRENT_WEEK_INFO_1").setNumber(recordedHrsTxt);
					this.byId("MTS3_TARGET_TIME_1").setText(targetHrsTxt);

					this.byId("MTS3_TXT_ASSIGNMENTS_1").setText(assignments);
					this.byId("MTS3_TXT_APPROVED_HOURS_1").setText(approvedHrsTxt);
				} else {
					firstWeekLastDay = first + ((7 * 1 - 1) * 24 * 60 * 60 * 1000);
					firstWeekLastDay = new Date(firstWeekLastDay);
					secondWeekFirstDay = first + 7 * 24 * 60 * 60 * 1000;
					secondWeekFirstDay = new Date(secondWeekFirstDay);
					//set all the hours of each to 0
					firstday.setHours(0, 0, 0, 0);
					firstWeekLastDay.setHours(0, 0, 0, 0);
					secondWeekFirstDay.setHours(0, 0, 0, 0);
					lastday.setHours(0, 0, 0, 0);
					//find and set the 2nd week data

					//set the number
					// 	splitString = firstWeekLastDay.toDateString().split(" ");
					// 	weekRange[0] += splitString[1] + " " + splitString[2];
					weekRange[1] = this.formatDateMMMDD(firstWeekLastDay);
					weekText = this.oBundle.getText("WEEK_DATE_RANGE", [weekRange[0], weekRange[1]]);
					this.byId("MTS3_CURRENT_WEEK_INFO_1").setTitle(weekText);
					//2nd week
					/*splitString = secondWeekFirstDay.toDateString().split(" ");
					weekRange[1] = splitString[1] + " " + splitString[2] + " - ";
					splitString = lastday.toDateString().split(" ");
					weekRange[1] += splitString[1] + " " + splitString[2];*/

					weekRange[2] = this.formatDateMMMDD(secondWeekFirstDay);
					weekRange[3] = this.formatDateMMMDD(lastday);
					weekText = this.oBundle.getText("WEEK_DATE_RANGE", [weekRange[2], weekRange[3]]);
					this.byId("MTS3_CURRENT_WEEK_INFO_2").setTitle(weekText);

					//1st week
					totalTargetHrs = [0, 0];
					totalRecordedHrs = [0, 0];
					totalApprovedHours = [0, 0];
					totalAssignments = [0, 0];
					entryArray1 = [];
					entryArray2 = [];

					for (i = 0; i < weekData.length; i++) {
						if (weekData[i].date.getTime() < secondWeekFirstDay.getTime()) {
							totalTargetHrs[0] += weekData[i].targetHours;
							totalRecordedHrs[0] += weekData[i].recordedHours;
							totalApprovedHours[0] += weekData[i].approvedHours;
							if (weekData[i].entries.length) {
								// totalAssignments[0]++; 
								entryArray1 = this.pushUniqueElements(weekData[i].entries, entryArray1);
							}
						} else {
							totalTargetHrs[1] += weekData[i].targetHours;
							totalRecordedHrs[1] += weekData[i].recordedHours;
							totalApprovedHours[1] += weekData[i].approvedHours;
							if (weekData[i].entries.length) {
								// totalAssignments[1]++;
								entryArray2 = this.pushUniqueElements(weekData[i].entries, entryArray2);
							}
						}
					}
					totalAssignments[0] = entryArray1.length;
					totalAssignments[1] = entryArray2.length;
					//setting the sum to a max of 2 decimal points
					for (i = 0; i < 2; i++) {
						if (totalTargetHrs[i] !== 0) {
							totalTargetHrs[i] = this.formatTime(totalTargetHrs[i].toFixed(2));
						}
						if (totalRecordedHrs[i] !== 0) {
							totalRecordedHrs[i] = this.formatTime(totalRecordedHrs[i].toFixed(2));
						}
						if (totalApprovedHours[i] !== 0) {
							totalApprovedHours[i] = this.formatTime(totalApprovedHours[i].toFixed(2));
						}
					}
					//setting data for the first week
					if (totalRecordedHrs[0] !== 0) {
						if (totalRecordedHrs[0] === "01:00") { //Note 2115732
							recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOUR", [totalRecordedHrs[0]]);
						} else {
							recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOURS", [totalRecordedHrs[0]]);
						}
					} //End Note 2115732
					else {
						recordedHrsTxt = this.oBundle.getText("NO_RECORDING");
					}
					// 	recordedHrsTxt = totalRecordedHrs[0] + " h";
					if (totalAssignments[0] === 1) {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENT");
					} else if (totalAssignments[0] === 0) {
						assignments = this.oBundle.getText("NO_ASSIGNMENT");
					} else {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENTS", [totalAssignments[0]]);
					}

					if (totalApprovedHours[0] === 0) {
						approvedHrsTxt = " ";
					} else {
						approvedHrsTxt = this.oBundle.getText("TOTAL_APPROVED_HOURS", [totalApprovedHours[0]]);
					}

					if (totalTargetHrs[0] !== 0 && this.withTargetHours) {
						targetHrsTxt = this.oBundle.getText("TOTAL_TARGET_HOURS", [totalTargetHrs[0]]);
					} else {
						targetHrsTxt = "  ";
					}
					this.byId("MTS3_CURRENT_WEEK_INFO_1").setNumber(recordedHrsTxt);
					this.byId("MTS3_TARGET_TIME_1").setText(targetHrsTxt);
					this.byId("MTS3_TXT_ASSIGNMENTS_1").setText(assignments);
					this.byId("MTS3_TXT_APPROVED_HOURS_1").setText(approvedHrsTxt);

					//setting data for the second week
					if (totalRecordedHrs[1] !== 0) {
						if (totalRecordedHrs[1] === "01:00") { //Note 2115732
							recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOUR", [totalRecordedHrs[1]]);
						} else {
							recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOURS", [totalRecordedHrs[1]]);
						}
					} //End Note 2115732
					else {
						recordedHrsTxt = this.oBundle.getText("NO_RECORDING");
					}

					if (totalAssignments[1] === 1) {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENT");
					} else if (totalAssignments[1] === 0) {
						assignments = this.oBundle.getText("NO_ASSIGNMENT");
					} else {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENTS", [totalAssignments[1]]);
					}

					if (totalApprovedHours[1] === 0) {
						approvedHrsTxt = " ";
					} else {
						approvedHrsTxt = this.oBundle.getText("TOTAL_APPROVED_HOURS", [totalApprovedHours[1]]);
					}
					if (totalTargetHrs[1] !== 0 && this.withTargetHours) {
						targetHrsTxt = this.oBundle.getText("TOTAL_TARGET_HOURS", [totalTargetHrs[1]]);
					} else {
						targetHrsTxt = "  ";
					}
					this.byId("MTS3_CURRENT_WEEK_INFO_2").setNumber(recordedHrsTxt);
					this.byId("MTS3_TARGET_TIME_2").setText(targetHrsTxt);
					this.byId("MTS3_TXT_ASSIGNMENTS_2").setText(assignments);
					this.byId("MTS3_TXT_APPROVED_HOURS_2").setText(approvedHrsTxt);
				}

			},
			getActualOffset: function(firstDayOffset, currentDay) {
				var constantOffset = 7;
				if (firstDayOffset > currentDay) {
					return currentDay + constantOffset - firstDayOffset;
				} else {
					return currentDay - firstDayOffset;
				}
			},

			pushUniqueElements: function(entries, entryData) {
				if (!entries) {
					return null;
				}
				for (var j = 0; j < entries.length; j++) {
					var str = entries[j].mainName + ":" + entries[j].mainCode + ",";
					for (var i = 0; typeof(entries[j].childNames) !== "undefined" && i < entries[j].childNames.length; i++) {
						str += entries[j].childNames[i] + ":" + entries[j].childCodes[i] + ",";
					}

					if (entryData.length) {
						for (i = 0; i < entryData.length; i++) {
							if (str === entryData[i]) {
								break;
							}
						}
						if (i === entryData.length) {
							entryData.push(str);
						}
					} else {
						entryData.push(str);
					}
				}
				return entryData;
			},
			formatDateMMMDD: function(oDate) {
				var month = oDate.getMonth();
				var day = oDate.getDate();

				var dateString = this.oBundle.getText("MONTH_" + month) + " " + day;

				return dateString;
			},

			formatTime: function(oTime) {
				var mins = oTime * 60;
				var h = Math.floor(mins / 60).toString();
				if (h.length === 1) {
					h = "0" + h;
				}
				var m = (mins % 60).toFixed(0);
				if (m.length === 1) {
					m = "0" + m;
				}
				var timeString = h + ":" + m;

				return timeString;

			},

			parseDateYYYYMMdd: function(dateString) {
				var dateParse = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "YYYYMMdd"
				});
				return dateParse.parse(dateString);
			},
			formatDateYYYYMMdd: function(oDate) {
				if (typeof oDate === "string") {
					oDate = new Date(oDate);
				}

				var dateParse = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "YYYYMMdd"
				});
				return dateParse.format(oDate);
			},

			getPostData: function(day, entry) {
				var post = {};

				post.day = day;
				post.entry = entry;

				return post;

			},

			openConfirmationPopup: function(oSettings, isSubmit) {
				var self = this;
				var oElements = [];
				for (var i = 0; i < oSettings.additionalInformation.length; i++) {
					oElements.push(new sap.m.Label({
						text: oSettings.additionalInformation[i].label,
						design: "Bold"
					}));
					oElements.push(new sap.m.Text({
						text: oSettings.additionalInformation[i].text
					}));
				}
				var oForm = new sap.ui.layout.form.SimpleForm({
					minWidth: 1024,
					editable: false,
					maxContainerCols: 2,
					layout: "ResponsiveGridLayout",
					labelSpanL: 7,
					labelSpanM: 7,
					labelSpanS: 7,
					emptySpanL: 1,
					emptySpanM: 1,
					emptySpanS: 1,
					columnsL: 1,
					columnsM: 1,
					columnsS: 1,
					content: oElements
				});
				var oConfirmDialog = new sap.m.Dialog({
					title: oSettings.title,
					content: [oForm],
					beginButton: new sap.m.Button({
						text: oSettings.confirmButtonLabel,
						press: function() {
							self.submitTime(isSubmit);
							oConfirmDialog.close();
						}
					}),
					endButton: new sap.m.Button({
						text: this.oBundle.getText("CANCEL"),
						press: function() {
							oConfirmDialog.close();
						}
					})
				});
				oConfirmDialog.addStyleClass("sapUiContentPadding sapUiMediumMarginTopBottom");
				oConfirmDialog.open();
			},

			//Calculation for Release Entries
			releaseEntriesSummary: function(bUpdatePageData) {

				var oTableRef = this.byId("ENTRY_LIST_CONTENTS");
				var selectedItems = oTableRef.getSelectedItems();

				// Deleted Hours Summary
				var deletedHours = 0,
					deletedMinutes = 0,
					deletedTime = 0,
					numberOfItemsSelectedForSubmittion = 0;
				var dayIndex, entryIndex, entry, selectedDate, curDate = new Date();
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var oPageData = oModel.getData();
				//						var releaseFutureDates = oModel.getProperty("/releaseFuture");
				for (var i = 0; i < selectedItems.length; i++) {
					if (!selectedItems[i].data().header) {
						dayIndex = selectedItems[i].data().day;
						entryIndex = selectedItems[i].data().entry;
						entry = oPageData.days[dayIndex].entries[entryIndex];
						selectedDate = selectedItems[i].data().dateSelected;

						// when new entry line has been selected
						if (!entry) {
							continue;
						}

						if (entry.statusId === "MSAVE" && !(!this.releaseFuture && this.checkDate(selectedDate, curDate))) { // || entry.statusId === "REJECTED") {
							if (bUpdatePageData) {
								//updating the pagedata with Boolean Release Allowed as true
								this.updatePageData(false, dayIndex, entry, true);
							}
							deletedHours += entry.hours;
							deletedMinutes += entry.minutes;
							deletedTime += entry.time;
							deletedTime = parseFloat(deletedTime.toFixed(2));
							numberOfItemsSelectedForSubmittion++; //count for submitted entries
						}

						if (deletedMinutes > 59) {
							deletedMinutes -= 60;
							deletedHours++;
						}
					}
				}
				var releaseData = [];
				if (this.clockEntry) {
					deletedTime = deletedHours;
					deletedTime += (deletedMinutes / 60);
					deletedTime = parseFloat(deletedTime.toFixed(2));
				}

				releaseData.push(numberOfItemsSelectedForSubmittion);
				releaseData.push(deletedHours);
				releaseData.push(deletedMinutes);
				releaseData.push(deletedTime); // display total decimal time

				return releaseData;
			},

			onSubmit: function() {

				var releaseData = [];
				var oSettings = null,
					totalDurationText;
				releaseData = this.releaseEntriesSummary(false);
				totalDurationText = this.formatTime(releaseData[3].toString());
				/*sap.ca.ui.model.format.NumberFormat.getInstance({
					style: "standard"
				}).format(releaseData[3].toString());*/

				if (!this.clockEntry) {
					var totalDuration = this.oBundle.getText("TOTAL_DURATION");
					oSettings = {
						question: this.oBundle.getText("SUBMISSION_CONFIRMATION_SUMMARY"),
						//additionalInformation : [],
						additionalInformation: [{
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
							text: releaseData[0].toString()
						}, {
							label: totalDuration,
							text: totalDurationText
						}],
						showNote: false,
						title: this.oConfiguration.getText("SUBMISSION_CONFIRMATION"),
						confirmButtonLabel: this.oBundle.getText("OK")
					};
				} else {
					oSettings = {
						question: this.oBundle.getText("SUBMISSION_CONFIRMATION_SUMMARY"),
						additionalInformation: [{
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
							text: this.formatTime(releaseData[0].toString())
						}, {
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_HOURS"),
							text: this.oBundle.getText("FULL_CONCATENATE_HOURSMIN", [releaseData[1], releaseData[2]])
						}],
						showNote: false,
						title: this.oConfiguration.getText("SUBMISSION_CONFIRMATION"),
						confirmButtonLabel: this.oBundle.getText("OK")
					};
				}
				// var _this = this;

				// open confirmation popup
				this.openConfirmationPopup(oSettings, true);
				/*sap.ca.ui.dialog.confirmation.open(oSettings, function(response) {
					if (response.isConfirmed === true) {
						_this.submitTime(true);
					}
				});*/

			},

			submitTime: function(submitFlag) {
				var self = this;
				if (submitFlag) {
					this.releaseEntriesSummary(true);
				}

				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var newDays = oModel.getData().days;
				this.errors = null;

				var updatedDays = [];
				var deletedDays = [];

				for (var i = 0; i < newDays.length; i++) {

					for (var j = 0; j < newDays[i].entries.length; j++) {

						if (newDays[i].entries[j].deleted && (newDays[i].entries[j].counter !== "" || newDays[i].entries[j].counter === null)) {
							deletedDays.push(this.getPostData(this.getDateTimeStr(newDays[i].date), newDays[i].entries[j]));
						} else {
							if (this.oldDays[i]) {
								for (var k = 0; k < this.oldDays[i].entries.length; k++) {
									if (newDays[i].entries[j].counter === this.oldDays[i].entries[k].counter && newDays[i].entries[j].counter !== "") {

										var item1 = newDays[i].entries[j];
										var item2 = this.oldDays[i].entries[k];

										if (item1.time !== item2.time || item1.notes !== item2.notes || item1.mainItem !== item2.mainItem || item1.subItems !== item2.subItems ||
											item1.hours !== item2.hours || item1.minutes !== item2.minutes || item1.startTime !== item2.startTime || item1.endTime !== item2
											.endTime) {

											if (!newDays[i].entries[j].deleted) {

												updatedDays.push(this.getPostData(this.getDateTimeStr(newDays[i].date), newDays[i].entries[j]));

											}
										}
									}
								}
							}
						}
						if (newDays[i].entries[j].statusId === "MSAVE" && newDays[i].entries[j].bToBeReleased) {

							updatedDays.push(this.getPostData(this.getDateTimeStr(newDays[i].date),

								newDays[i].entries[j]));

						}

					}
				}
				// lock UI until submit is done to prevent double click
				// sap.ui.getCore().lock();

				var batchUpdate = [];
				var batchDelete = [];

				if (updatedDays.length !== 0) {

					for (i = 0; i < updatedDays.length; i++) {
						updatedDays[i].entry = this.replaceSpecialChar(updatedDays[i].entry);

						batchUpdate.push(self.setPostObject(
							updatedDays[i].entry.counter,
							"U",
							updatedDays[i].day,
							updatedDays[i].entry.time,
							updatedDays[i].entry.mainName,
							updatedDays[i].entry.mainCode,
							updatedDays[i].entry.notes,
							updatedDays[i].entry.startTime,
							updatedDays[i].entry.endTime,
							updatedDays[i].entry.subItems,
							updatedDays[i].entry.childCodes,
							updatedDays[i].entry.childNames));
					}
				}

				if (deletedDays.length !== 0) {

					for (i = 0; i < deletedDays.length; i++) {
						deletedDays[i].entry = this.replaceSpecialChar(deletedDays[i].entry); //Note 1994402: Replacing Special Character

						batchDelete.push(self.setPostObject(
							deletedDays[i].entry.counter,
							"D",
							deletedDays[i].day,
							deletedDays[i].entry.time,
							deletedDays[i].entry.mainName,
							deletedDays[i].entry.mainCode,
							deletedDays[i].entry.notes,
							deletedDays[i].entry.startTime,
							deletedDays[i].entry.endTime,
							deletedDays[i].entry.subItems,
							deletedDays[i].entry.childCodes,
							deletedDays[i].entry.childNames));

					}
				}

				if (batchUpdate.length === 0 && batchDelete.length === 0) {
					// if there is nothing to submit, just act like a cancel
					sap.m.MessageToast.show(self.oConfiguration.getText("SUBMIT_SUCCESS"));

				} else {
					//     var combinedBatch = [];
					// 	combinedBatch = batchUpdate.concat(batchDelete);
					self.oService.submitTimeEntry(self, [], batchUpdate, batchDelete, function() {

						sap.m.MessageToast.show(self.oConfiguration.getText("SUBMIT_SUCCESS"));
						if (!self.errors) {
							self.updateData();
						}
					}, function(hasError, errorDates) {
						self.updateData();
					});
				}

			},

			setPostObject: function(Counter, TimeEntryOperation, WORKDATE, CATSAMOUNT, Name, Code, notes, startTime,
				endTime, subItems, childCodes, childNames) {
				var timeEntryUpdated = {
					Counter: Counter,
					TimeEntryOperation: TimeEntryOperation,
					TimeEntryDataFields: {
						WORKDATE: WORKDATE,
						CATSAMOUNT: "" + CATSAMOUNT,
						BEGUZ: startTime,
						ENDUZ: endTime
					}
				};

				// always setting to X for second screen
				if (TimeEntryOperation !== "D") {
					timeEntryUpdated.TimeEntryRelease = "X";
				}
				if (this.checkFieldName(Name) === true) { //Note 1959135: Added additional check
					timeEntryUpdated.TimeEntryDataFields[Name] = Code;
				}

				if (subItems && subItems !== "") {
					for (var i = 0; i < childNames.length; i++) {
						if (this.checkFieldName(childNames[i]) === true) { //Note 1959135: Added additional check
							timeEntryUpdated.TimeEntryDataFields[childNames[i]] = childCodes[i];
						}
					}
				}
				if (notes && notes !== "") {
					timeEntryUpdated.TimeEntryDataFields.LONGTEXT_DATA = notes;
					timeEntryUpdated.TimeEntryDataFields.LONGTEXT = "X";
				}

				/**
				 * @ControllerHook Modify the post object
				 * This hook method can be used to modify the object before the post call
				 * It is called when the decision options for the detail item are fetched successfully
				 * @callback hcm.mytimesheet.view.S3~extHookChangeObjectBeforePost
				 * @param {object} Post Object
				 * @return {object} Final Post Object
				 */

				if (this.extHookChangeObjectBeforePost) {
					timeEntryUpdated = this.extHookChangeObjectBeforePost(timeEntryUpdated);
				}

				return timeEntryUpdated;
			},

			checkDate: function(date, curDate) {
				if (date.getFullYear() >= curDate.getFullYear() && date.getMonth() >= curDate.getMonth() && date.getDate() > curDate.getDate()) {
					return true;
				}
				return false;
			},

			checkFieldName: function(fieldName) {
				var checkString = fieldName;
				if (checkString.match("DISPTEXT")) {
					return false;
				}
				if (checkString.match("CPR_OBJTEXT")) {
					return false;
				}
				if (checkString.match("CPR_TEXT")) {
					return false;
				}
				return true;
			},

			replaceAllOccurances: function(iString) {
				if (typeof iString === "undefined") {
					return null;
				}
				var vSearch = "/";
				var vReplace = "-";
				while (iString.indexOf(vSearch) > -1) {
					iString = iString.replace(vSearch, vReplace);
				}
				return iString;
			},
			replaceSpecialChar: function(entry) {
				if (typeof entry.mainName !== "undefined") {
					entry.mainName = this.replaceAllOccurances(entry.mainName);
				}
				if (typeof entry.subItems !== "undefined") {
					entry.subItems = this.replaceAllOccurances(entry.subItems);
				}
				if (typeof entry.childNames !== "undefined") {
					for (var i = 0; i < entry.childNames.length; i++) {
						entry.childNames[i] = this.replaceAllOccurances(entry.childNames[i]);
					}
				}

				return entry;
			},

			onCopy: function() {
				var oModel, oPageData, oViewData;
				var dayIndex;
				var entryIndex;
				var oTableRef = this.byId("ENTRY_LIST_CONTENTS");
				var selectedItem = [];
				selectedItem = oTableRef.getSelectedItems();

				dayIndex = selectedItem[0].data().day;
				entryIndex = selectedItem[0].data().entry;

				oModel = this.oApplication.getModel("TSM_WEEKLY");

				oPageData = oModel.getData();
				oPageData.days[dayIndex].entries[entryIndex].counter = "";

				oViewData = {
					entry: oPageData.days[dayIndex].entries[entryIndex],
					pageData: oPageData,
					dayIndex: dayIndex,
					entryIndex: entryIndex
				};

				this.oApplication.getModel("S31modelexch").setProperty("/editeddata", oViewData);
				this.oApplication.getModel("S31modelexch").setProperty("/copySelected", true);

				this.oApplication.getModel("S31modelexch").setProperty("/selectedDates", []);

				this.oRouter.navTo("S31", {
					context: oModel.getProperty("/selectedDate").toDateString() + "offset" + this.byId("WEEKLY_CALENDAR").getFirstDayOffset()
				}, true);

			},

			onItemSelectGotoEdit: function(oEvent) {
				var item = oEvent.getSource();
				var itemData = item.data();
				var oModel, oPageData, oViewData;
				var dayIndex = itemData.day;
				var entryIndex = itemData.entry;

				oModel = this.oApplication.getModel("TSM_WEEKLY");

				oPageData = oModel.getData();

				oViewData = {
					entry: oPageData.days[dayIndex].entries[entryIndex],
					pageData: oPageData,
					dayIndex: dayIndex,
					entryIndex: entryIndex
				};

				this.oApplication.getModel("S31modelexch").setProperty("/editeddata", oViewData);
				this.oApplication.getModel("S31modelexch").setProperty("/editentryview", true);

				this.oApplication.getModel("S31modelexch").setProperty("/selectedDates", [itemData.dateSelected]);

				this.oRouter.navTo("S31", {
					context: oModel.getProperty("/selectedDate").toDateString() + "offset" + this.byId("WEEKLY_CALENDAR").getFirstDayOffset()
				}, true);

			},

			onItemSelect: function(oEvent) {
				this.selectDateOnAllCheckBoxSelection(oEvent.getSource());

				if (oEvent.getSource().getSelectedItems().length === 0) {
					this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
					this.setBtnEnabled("deleteBtn", false);

					this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
					this.setBtnEnabled("SUBMIT_BTN", false);

					this.setBtnEnabled("copyBtn", false);

				} else {
					var selList = oEvent.getSource().getSelectedItems();
					var isHeader;
					for (var i = 0; i < selList.length; i++) {
						isHeader = selList[i].data().header;
						if (!isHeader) {
							this.findCount(oEvent);
						}

					}

				}

			},

			findCount: function(oEvent) {
				var selList = oEvent.getSource().getSelectedItems();
				var isHeader, selectedDate, curDate = new Date(),
					dayIndex, entryIndex, entry;
				var deleteCount = 0,
					submitCount = 0;
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var oPageData = oModel.getData();
				for (var i = 0; i < selList.length; i++) {
					isHeader = selList[i].data().header;
					selectedDate = selList[i].data().dateSelected;

					if (!isHeader) {
						deleteCount++;
						dayIndex = selList[i].data().day;
						entryIndex = selList[i].data().entry;
						entry = oPageData.days[dayIndex].entries[entryIndex];
						if (entry.statusId === "MSAVE" && !(!this.releaseFuture && this.checkDate(selectedDate, curDate))) {
							submitCount++;
						}
					}
				}

				if (submitCount === 0) {
					this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
					this.setBtnEnabled("SUBMIT_BTN", false);
				} else {
					this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT") + "(" + submitCount + ")");
					this.setBtnEnabled("SUBMIT_BTN", true);
				}

				if (deleteCount === 0) {
					this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
					this.setBtnEnabled("deleteBtn", false);
				} else {
					this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE") + "(" + deleteCount + ")");
					this.setBtnEnabled("deleteBtn", true);
				}

				//copy function
				if (deleteCount === 1 && oEvent.getSource().getSelectedItems().length === 1) {
					this.setBtnEnabled("copyBtn", true);
				} else {
					this.setBtnEnabled("copyBtn", false);
				}

			},

			onSelect: function(oEvent) {
				var selectedDate = new Date(oEvent.getParameter("date"));
				var didSelect = oEvent.getParameter("didSelect");
				this.selectDate(selectedDate, didSelect);
				// this.scrollTo(oEvent);
			},
			scrollTo: function(index) {
				var list = this.byId("ENTRY_LIST_CONTENTS");
				var item = list.getItems()[index];
				var scroll_to_y = item.$().get(0).offsetTop;
				this.byId("scroller").scrollTo(0, scroll_to_y, 500);
			},
			compareDays: function(a, b) {
				if (parseInt(a.dateStr, 10) > parseInt(b.dateStr, 10)) {
					return 1;
				} else {
					return -1;
				}
			},
			selectDate: function(selectedDate, selectedOrUnselected) {
				var dateStr = selectedDate.toDateString();
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var itemSelected = 0;
				oModel.setProperty("/selected", dateStr);
				//						var valuesPresent = false;
				if (this.entryListContents) {
					var items = this.entryListContents.getItems();
					var itemData;
					for (var i = 0; i < items.length; i++) {
						itemData = items[i].data();
						if (itemData.dateSelected.toDateString() === dateStr && !itemData.header) {
							items[i].setSelected(selectedOrUnselected);
							itemSelected = i;
						}
					}

					var selList = this.byId("ENTRY_LIST_CONTENTS").getSelectedItems();

					if (selList.length === 0) {
						this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
						this.setBtnEnabled("deleteBtn", false);
					} else {
						this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE") + "(" + selList.length + ")");
						this.setBtnEnabled("deleteBtn", true);
					}

					//Submit Button update

					var releaseSummaryInfo = this.releaseEntriesSummary(false);
					if (releaseSummaryInfo[0] === 0) {
						this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
						this.setBtnEnabled("SUBMIT_BTN", false);
					} else {
						this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT") + "(" + releaseSummaryInfo[0] + ")");
						this.setBtnEnabled("SUBMIT_BTN", true);
					}
					//copy button validation
					if (selList.length === 1) {
						this.setBtnEnabled("copyBtn", true);
					} else {
						this.setBtnEnabled("copyBtn", false);
					}
					if (selectedOrUnselected && itemSelected !== 0) {
						this.scrollTo(itemSelected);
					}

				}
			},

			// update calendar Data
			updateData: function() {
				// clean calendar
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				oModel.setProperty("/red", "");
				oModel.setProperty("/green", "");
				oModel.setProperty("/grey", "");
				oModel.setProperty("/yellow", "");
				oModel.setProperty("/rejected", "");

				var weeklyCalendar = this.byId("WEEKLY_CALENDAR");
				weeklyCalendar.removeTypesOfAllDates();
				weeklyCalendar.unselectAllDates();
				oModel.setProperty("/activities", null);
				oModel.setProperty("/workingDayList", null);

				var self = this;

				// update calendar
				this.oService.getWorkDays(this, this.oApplication.pernr, oModel.getData().weekStart, oModel.getData().weekEnd, function(data) {
					self.getTimeSheetCalendar(data);
					if (oModel.getData().activities) {
						self.setWeeklyData(oModel.getData().activities);
					}
				});

				// update list
				this.oService.getTimeDataList(this, this.oApplication.pernr, oModel.getData().weekStart, oModel.getData().weekEnd, function(data) {
					oModel.setProperty("/activities", data);
					if (oModel.getData().workingDayList) {
						self.setWeeklyData(data);
					}
				});
				//Reseting Delete button on Submit and delete
				this.setBtnText("deleteBtn", self.oApplicationFacade.getResourceBundle().getText("DELETE"));
				this.setBtnEnabled("deleteBtn", false);
				this.setBtnText("SUBMIT_BTN", self.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
				this.setBtnEnabled("SUBMIT_BTN", false);
				this.setBtnEnabled("copyBtn", false);
			},
			getTimeSheetCalendar: function(data) {

				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var now = new Date(),
					grey = [],
					yaction = [],
					done = [],
					maction = [],
					rejected = [];
				var currentSelectedDay = oModel.getData().selected,
					firstWorkingDay = null,
					futureWorkDays = [],
					missingdays = [];
				var hasSelectedDay = false;

				var workingDayList = [];

				// get first day of the week
				var firstDayOff = -1;
				if (data.length > 0) {
					var firstDay = data[0].FirstDayOfWeek;
					if (firstDay === null) {
						firstDayOff = -1;
					} else if (firstDay === "MONDAY") {
						firstDayOff = 1;
					} else if (firstDay === "TUESDAY") {
						firstDayOff = 2;
					} else if (firstDay === "WEDNESDAY") {
						firstDayOff = 3;
					} else if (firstDay === "THURSDAY") {
						firstDayOff = 4;
					} else if (firstDay === "FRIDAY") {
						firstDayOff = 5;
					} else if (firstDay === "SATURDAY") {
						firstDayOff = 6;
					} else if (firstDay === "SUNDAY") {
						firstDayOff = 0;
					}
				}

				for (var i = 0; i < data.length; i++) {
					var dateToWork = data[i].Date;
					var workingDay = data[i].WorkingDay === "TRUE";
					var date = new Date(parseInt(dateToWork.substring(0, 4), 10),
						parseInt(dateToWork.substring(4, 6), 10) - 1, parseInt(dateToWork.substring(6, 8), 10));
					workingDayList.push({
						date: dateToWork,
						workingDay: workingDay,
						targetHours: parseFloat(data[i].TargetHours.trim()),
						startTime: data[i].StartTime,
						endTime: data[i].EndTime
					});

					var status = data[i].Status;

					if (!workingDay) {
						// add to holidays to grey out
						grey.push(date);
					} else {

						if (!firstWorkingDay) {
							firstWorkingDay = dateToWork;
						}
						if (!hasSelectedDay && currentSelectedDay === dateToWork) {
							hasSelectedDay = true;
						}
						if (status === "YACTION") {
							// add missing days as yaction
							missingdays.push(data[i].Date);
							// fill yaction only if earlier then today
							if (now.getTime() > date.getTime()) {
								yaction.push(date);
							} else {
								futureWorkDays.push(date);
							}
						} else if (status === "MACTION") {
							maction.push(date);
						} else if (status === "REJECTED") {
							rejected.push(date);
						} else if (status === "DONE") {
							done.push(date);
						}
					}

				}

				oModel.setProperty("/workingDayList", workingDayList);
				var weeklyCal = this.byId("WEEKLY_CALENDAR");
				// set in calendar only if get meaningful value from service
				if (firstDayOff > 0) {
					weeklyCal.setFirstDayOffset(firstDayOff);
				}

				weeklyCal.toggleDatesType(maction, sap.me.CalendarEventType.Type04, true);
				weeklyCal.toggleDatesType(done, sap.me.CalendarEventType.Type01, true);
				weeklyCal.toggleDatesType(grey, sap.me.CalendarEventType.Type00, true);
				weeklyCal.toggleDatesType(yaction, sap.me.CalendarEventType.Type07, true);
				weeklyCal.toggleDatesType(rejected, sap.me.CalendarEventType.Type06, true);

				// set array of legend to global model
				var aLegend = {
					'yellow': maction,
					'green': done,
					'grey': grey,
					'red': yaction,
					'rejected': rejected,
					'FutureWorkingDays': futureWorkDays
				};

				var oLegendControl = this.byId("LEGEND");
				if (done.length > 0) {
					oLegendControl.setLegendForType01(this.oBundle.getText("FILLED_DAY"));
				} else if (oLegendControl.getLegendForType01()) { //Note 2115732
					oLegendControl.setLegendForType01(null);
				}
				if (maction.length > 0) {
					oLegendControl.setLegendForType04(this.oBundle.getText("FILLED_MANAGER"));
				} else if (oLegendControl.getLegendForType04()) {
					oLegendControl.setLegendForType04(null);
				}
				if (yaction.length > 0) {
					oLegendControl.setLegendForType07(this.oBundle.getText("MISSING_DAY"));
				} else if (oLegendControl.getLegendForType07()) {
					oLegendControl.setLegendForType07(null);
				}
				if (rejected.length > 0) {
					oLegendControl.setLegendForType06(this.oBundle.getText("REJECTED"));
				} else if (oLegendControl.getLegendForType06()) {
					oLegendControl.setLegendForType06(null);
				}
				if (futureWorkDays.length > 0) {
					oLegendControl.setLegendForNormal(this.oBundle.getText("WORKING_DAY"));
				} else if (oLegendControl.getLegendForNormal()) {
					oLegendControl.setLegendForNormal(null);
				}
				if (grey.length > 0) {
					oLegendControl.setLegendForType00(this.oBundle.getText("NON_WORKING_DAY"));
				} else if (oLegendControl.getLegendForType00()) {
					oLegendControl.setLegendForType00(null); //End Note 2115732
				}
				oLegendControl.setLegendForToday(this.oBundle.getText("CURRENT_DAY"));
				oLegendControl.setLegendForSelected(this.oBundle.getText("SELECTED_DAY"));
				oLegendControl.setLegendForSelected00(this.oBundle.getText("SELECTED_NW_DAY"));

				oModel = this.oApplication.getModel("TSM_WEEKLY");
				oModel.setProperty("/legendforS31", aLegend);

			},

			onAddNewEntry: function() {

				var selectedDatesFromCalendar = this.byId("WEEKLY_CALENDAR").getSelectedDates();
				var dateStr;
				for (var i = 0; i < selectedDatesFromCalendar.length; i++) {
					selectedDatesFromCalendar[i] = new Date(selectedDatesFromCalendar[i]);
				}
				/*if(selectedDatesFromCalendar.length !== 0){
				    dateStr = selectedDatesFromCalendar[0].toDateString();
				}
				else{
				    dateStr = this.oApplication.getModel("TSM_WEEKLY").getProperty("/selectedDate").toDateString();
				}*/
				dateStr = this.byId("WEEKLY_CALENDAR").getCurrentDate();
				this.oApplication.getModel("S31modelexch").setProperty("/selectedDates", selectedDatesFromCalendar);
				this.oApplication.getModel("S31modelexch").setProperty("/editentryview", false);

				this.oRouter.navTo("S31", {
					context: dateStr + "offset" + this.byId("WEEKLY_CALENDAR").getFirstDayOffset()
				}, true);

			},

			onCalendarWeekChange: function(oEv) {

				var curDate = new Date(oEv.getParameter("currentDate"));
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var selectedDates = oEv.getSource().getSelectedDates();
				var noOfWeeks = 13; //by default 2 weeks are shown
				if (sap.ui.Device.system.phone) {
					noOfWeeks = 6;
				}
				var firstday = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR")
					.getFirstDayOffset(), curDate.getDay()));

				var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + noOfWeeks);

				oModel.setProperty("/showSubmit", false);
				oModel.setProperty("/selected", this.getDateStr(curDate));
				oModel.setProperty("/selectedDate", curDate);
				oModel.setProperty("/year", curDate.getFullYear());
				oModel.setProperty("/weekStart", this.getDateStr(firstday));
				// oModel.setProperty("/start", this.getDateStr(curDate));
				oModel.setProperty("/weekEnd", this.getDateStr(lastday));

				this.setBtnEnabled("SUBMIT_BTN", false);
				this.lastSelected = oModel.getData().selected;

				this.updateData();
				this.calendarModel = oModel;
				var d, arrayOfDates = [];
				for (var i = 0; i < selectedDates.length; i++) {
					d = new Date(selectedDates[i]);
					if (d.getTime() >= firstday && d.getTime() <= lastday.getTime()) {
						arrayOfDates.push(d);
					}
				}
				if (arrayOfDates.length > 0) {
					oEv.getSource().toggleDatesSelection(arrayOfDates, true);
				}
				//Reseting and disabling the Delete Button text 
				this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
				this.setBtnEnabled("deleteBtn", false);

				this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
				this.setBtnEnabled("SUBMIT_BTN", false);

				this.setBtnEnabled("copyBtn", false);
			},

			getDateStr: function(date) {
				return "" + date.getFullYear() + ("" + (date.getMonth() + 101)).substring(1) + ("" + (date.getDate() + 100)).substring(1);
			},

			getDateTimeStr: function(date) {
				return "" + date.getFullYear() + "-" + ("" + (date.getMonth() + 101)).substring(1) + "-" + ("" + (date.getDate() + 100)).substring(1) +
					"T00:00:00";
			},

			setWeeklyData: function(data) {
				//get the main model for this view
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var oPageData = {
					days: []
				};
				var lastRecordNumber = null,
					oDayData = null,
					date;
				var recordedHrs, approvedHrs, i, j, bHasEntries, insertPosition, lastDate = null;
				var oEntryData = {};
				var workingDayList = oModel.getData().workingDayList;
				for (i = 0; i < data.length; i++) {

					if (data[i].FieldName === "WORKDATE") {
						if (lastDate === null || data[i].FieldValue !== lastDate) {
							lastDate = data[i].FieldValue;
							date = new Date(parseInt(data[i].FieldValue.substring(0, 4), 10), parseInt(data[i].FieldValue
								.substring(4, 6), 10) - 1, parseInt(data[i].FieldValue.substring(6, 8), 10));
							oDayData = {
								date: date,
								dateStr: data[i].FieldValue,
								dateFormatted: this.convertDateFormat(date),
								targetHours: this.getTargetHours(data[i].FieldValue, workingDayList),
								entries: [],
								workingDay: this.getWorkingDay(data[i].FieldValue, workingDayList)
							};
							oPageData.days.push(oDayData);
							lastRecordNumber = null;
						}
					}
					if (lastRecordNumber === null || data[i].RecordNumber !== lastRecordNumber) {
						lastRecordNumber = data[i].RecordNumber;
						oEntryData = new hcm.mytimesheet.model.TimeEntry(0, "", data[i].Suggested === "TRUE", true);

						oDayData.entries.push(oEntryData);
					}
					oEntryData.setData(data[i]);
				}

				oPageData.days.sort(this.compareDays);

				for (i = 0; i < workingDayList.length; i++) {
					if (workingDayList[i].workingDay) {
						bHasEntries = false;
						insertPosition = oPageData.days.length;
						for (j = 0; j < oPageData.days.length; j++) {
							if (workingDayList[i].date === oPageData.days[j].dateStr) {
								bHasEntries = true;
								break;
							}
							if (workingDayList[i].date < oPageData.days[j].dateStr) {
								insertPosition = j;
								break;
							}
						}
						if (!bHasEntries) {
							// this is a working day which is not in the list, so we
							// need to add a blank entry
							date = new Date(parseInt(workingDayList[i].date.substring(0, 4), 10), parseInt(
								workingDayList[i].date.substring(4, 6), 10) - 1, parseInt(workingDayList[i].date.substring(6, 8),
								10));
							oDayData = {
								date: date,
								dateStr: workingDayList[i].date,
								dateFormatted: this.convertDateFormat(date),
								targetHours: this.getTargetHours(workingDayList[i].date, workingDayList),
								workingDay: workingDayList[i],
								entries: []
							};
							oPageData.days.splice(insertPosition, 0, oDayData);
						}

					}
				}
				for (i = 0; i < oPageData.days.length; i++) {
					//find the recorded hours
					recordedHrs = 0;
					approvedHrs = 0;
					for (j = 0; j < oPageData.days[i].entries.length; j++) {
						if (oPageData.days[i].entries[j].timeUnit === "H") {
							recordedHrs += oPageData.days[i].entries[j].time;
						}
						// recordedHrs += oPageData.days[i].entries[j].time;
						if (oPageData.days[i].entries[j].statusId === "DONE") {
							approvedHrs += oPageData.days[i].entries[j].time;
						}
					}
					oPageData.days[i].recordedHours = recordedHrs;
					oPageData.days[i].approvedHours = approvedHrs;
				}
				this.oldDays = jQuery.extend(true, {}, oPageData.days);
				oModel.setProperty("/days", oPageData.days);

				this.loadListWithoPageData(oPageData);

			},
			TimeEntry: function(time, childName, bExisting) {
				var x = {};
				x.time = time;
				x.hours = Math.floor(time);
				x.minutes = Math.round((time - Math.floor(time)) * 60);
				x.newEntry = !bExisting;
				x.mainItem = null;
				x.subItems = childName;
				x.notes = null;
				x.startTime = "";
				x.endTime = "";
				x.counter = "";
				x.hasNotes = false;
				x.showTime = bExisting;
				x.showError = false;
				x.error = "";
				x.status = "";
				//statusId for Status color in WeekEntry View
				x.statusId = "";
				return x;
			},
			getWorkingDay: function(date, workingDayList) {
				if (workingDayList) {
					for (var i = 0; i < workingDayList.length; i++) {
						if (workingDayList[i].date === date) {
							return workingDayList[i];
						}
					}
				}
				return null;
			},

			getTargetHours: function(date, workingDayList) {
				var workingDay = this.getWorkingDay(date, workingDayList);
				if (workingDay) {
					return workingDay.targetHours;
				}
				return 0;
			},
			convertDateFormat: function(date) {
				return sap.ui.core.format.DateFormat.getDateInstance({
					style: "medium"
				}).format(date);
			},

			YYYYMMDDtoDate: function(date_str) {
				var y = parseInt(date_str.substr(0, 4), 10);
				var m = parseInt(date_str.substr(4, 2), 10) - 1;
				var d = parseInt(date_str.substr(6, 2), 10);

				return new Date(y, m, d, 0, 0, 0, 0);
			},

			loadListWithoModel: function() {
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				this.loadListWithoPageData(oModel.getData());
			},

			loadListWithoPageData: function(oPageData) {
				if (oPageData.days === null) {
					return;
				}

				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var selectedDate = this.convertDateFormat(this.YYYYMMDDtoDate(oModel.getData().selected));
				for (var i = 0; i < oPageData.days.length; i++) {
					var oDay = oPageData.days[i];
					oDay.selected = (selectedDate === oDay.dateFormatted);
				}
				this.loadList(oPageData.days);
			},
			initializeTable: function() {
				this.entryListContents = this.byId("ENTRY_LIST_CONTENTS");
				var headerCol = new sap.m.Column({
					hAlign: "Left",
					/*demandPopin: true,
					minScreenWidth: "Tablet",
					popinDisplay: "Inline",*/
					header: new sap.m.Label({
						design: "Bold",
						text: "{i18n>COST_ASSIGNMENT}"
					})
				});
				this.entryListContents.addColumn(headerCol);
				if (this.clockEntry) {

					headerCol = new sap.m.Column({
						hAlign: "Center",
						demandPopin: true,
						minScreenWidth: "Tablet",
						popinDisplay: "Inline",
						header: new sap.m.Label({
							design: "Bold",
							text: "{i18n>START_TIME}"
						})
					});

					this.entryListContents.addColumn(headerCol);

					headerCol = new sap.m.Column({
						hAlign: "Center",
						demandPopin: true,
						minScreenWidth: "Tablet",
						popinDisplay: "Inline",
						header: new sap.m.Label({
							design: "Bold",
							text: "{i18n>END_TIME}"
						})
					});

					this.entryListContents.addColumn(headerCol);

				}

				headerCol = new sap.m.Column({
					hAlign: "Center",
					demandPopin: true,
					minScreenWidth: "Tablet",
					popinDisplay: "Inline",
					header: new sap.m.Label({
						design: "Bold",
						text: "{i18n>DURATION}"
					})
				});

				this.entryListContents.addColumn(headerCol);

				headerCol = new sap.m.Column({
					hAlign: "Right",
					demandPopin: true,
					minScreenWidth: "Tablet",
					popinDisplay: "Inline",
					header: new sap.m.Label({
						design: "Bold",
						text: "{i18n>STATUS}"
					})
				});
				/**
				 * @ControllerHook Modify the clumns in the table
				 * This hook method can be used to add and remove columns for the table used to display the entries
				 * It is called after the standard columns are added to the table
				 * @callback hcm.mytimesheet.view.S3~extHookAlterColumns
				 * @param {object} Table Header Object
				 * @return {object} Table Footer Object
				 */

				if (this.extHookAlterColumns) {
					headerCol = this.extHookAlterColumns(headerCol);
				}
				this.entryListContents.addColumn(headerCol);
			},
			loadList: function() {
				// load the main model for the view
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var days = oModel.getData().days;
				var self = this,
					recordedHrsTxt, date, target, recordedHrs;

				this.entryListContents.removeAllItems(); //removes all items from the table
				//Add columns
				for (var i = 0; i < days.length; i++) {
					if (days[i].entries.length) {
						date = days[i].date;
						// 	date = (date.toDateString()).substring(4);
						date = this.formatDateMMMDD(date);

						//new approach
						var oWeekEntryDayHeader = new sap.m.GroupHeaderListItem({
							// 		type: "Inactive"
							title: date,
							upperCase: false
						});
						oWeekEntryDayHeader.addCustomData(new sap.ui.core.CustomData({
							key: "dateSelected",
							value: days[i].date
						}));
						oWeekEntryDayHeader.addCustomData(new sap.ui.core.CustomData({
							key: "header",
							value: true
						}));
						var oObject = new sap.m.ObjectIdentifier({
							title: date
						});
						// 	oWeekEntryDayHeader.addCell(oObject);

						/*if (this.clockEntry) {
						oWeekEntryDayHeader.addCell(new sap.m.Label({
							text: " "
						}));
						oWeekEntryDayHeader.addCell(new sap.m.Label({
							text: " "
						}));
					}*/
						// 	recordedHrsTxt = days[i].recordedHours + " h out of " + days[i].targetHours + " h";
						// target = days[i].targetHours.toFixed(2);
						/*target = sap.ca.ui.model.format.NumberFormat.getInstance({
									style: 'standard'
								}).format(days[i].targetHours.toFixed(2));
					recordedHrs = sap.ca.ui.model.format.NumberFormat.getInstance({
									style: 'standard'
								}).format(days[i].recordedHours.toFixed(2));*/
						target = this.formatTime(days[i].targetHours.toFixed(2));
						recordedHrs = this.formatTime(days[i].recordedHours.toFixed(2));
						if (parseFloat(target, 10) !== 0 && this.withTargetHours) {
							if (parseFloat(recordedHrs, 10) === 1) { //Note 2115732
								recordedHrsTxt = this.oBundle.getText("WEEKLY_RECORDED_HOUR", [recordedHrs, target]);
							} else {

								recordedHrsTxt = this.oBundle.getText("WEEKLY_RECORDED_HOURS", [recordedHrs, target]);
							}
						} //End Note 2115732
						else {
							recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOURS", [recordedHrs]);
						}
						oWeekEntryDayHeader.setCount(recordedHrsTxt);
						/*oWeekEntryDayHeader.addCell(new sap.m.Label({
						text: recordedHrsTxt
					}));
					oWeekEntryDayHeader.addCell(new sap.m.Label({
						text: " "
					}));*/
						this.entryListContents.addItem(oWeekEntryDayHeader);

						// set whether this day is selected or not
						// 	oWeekEntryDayHeader.setSelected(days[i].selected);

						// load the items for this day entry
						for (var j = 0; j < days[i].entries.length; j++) {
							var list_item_entry = days[i].entries[j];

							var oSingleListEntry = new sap.m.ColumnListItem({
								type: "Navigation",
								tap: function(oEvent) {
									self.onItemSelectGotoEdit(oEvent);
								}
							});
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "day",
								value: i
							}));
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "entry",
								value: j
							}));
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "dateformated",
								value: days[i].dateFormatted
							}));
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "dateSelected",
								value: days[i].date
							}));
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "selectedDate",
								value: days[i].dateStr
							}));
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "header",
								value: false
							}));

							oObject = new sap.m.ObjectIdentifier({
								title: list_item_entry.mainItem,
								text: list_item_entry.subItems,
								badgeNotes: list_item_entry.hasNotes
							});
							if (list_item_entry.showError || list_item_entry.rejectionReason) {
								var cell = new sap.ui.layout.VerticalLayout();
								cell.addContent(oObject);

								if (list_item_entry.showError) {
									cell.addContent(new sap.m.ObjectStatus({
										text: list_item_entry.error,
										state: sap.ui.core.ValueState.Error
									}));
								} else {
									cell.addContent(new sap.m.ObjectStatus({
										text: list_item_entry.rejectionReason,
										state: sap.ui.core.ValueState.Error
									}));
								}
								oSingleListEntry.addCell(cell);
							} else {
								oSingleListEntry.addCell(oObject);
							}
							// 		var hrsMinText = list_item_entry.hours + this.oBundle.getText("HOURS_LABEL") + " " + list_item_entry.minutes + this.oBundle.getText("MINUTES_LABEL");
							//Datetime
							var timeParser = sap.ca.ui.model.format.DateFormat.getTimeInstance({
								pattern: "HHmmss"
							});
							var timeFormatter = sap.ca.ui.model.format.DateFormat.getTimeInstance({
								style: "medium"
							});
							var startTimeFormatted;
							var endTimeFormatted;
							var formattedDecimal = this.formatTime(list_item_entry.time.toFixed(2));
							if (this.clockEntry) {
								if (list_item_entry.startTime !== list_item_entry.endTime) { //Note: 2141131 clock time duration field
									startTimeFormatted = timeParser.parse(list_item_entry.startTime);
									oSingleListEntry.addCell(new sap.m.Label({
										text: timeFormatter.format(startTimeFormatted),
										design: "Bold"
									}));
									endTimeFormatted = timeParser.parse(list_item_entry.endTime);
									oSingleListEntry.addCell(new sap.m.Label({
										text: timeFormatter.format(endTimeFormatted),
										design: "Bold"
									}));
									oSingleListEntry.addCell(new sap.m.Label({
										//Checks and adds a dot or comma as required
										text: formattedDecimal,
										design: "Bold"
										/*sap.ca.ui.model.format.NumberFormat.getInstance({
									style: 'standard'
								}).format(list_item_entry.time.toFixed(2))*/
									}));
								} else { //Note: 2141131 clock time duration field
									oSingleListEntry.addCell(new sap.m.Label({
										text: "-",
										design: "Bold"
									}));
									oSingleListEntry.addCell(new sap.m.Label({
										text: "-",
										design: "Bold"
									}));
									oSingleListEntry.addCell(new sap.m.Label({
										text: formattedDecimal,
										design: "Bold"
									}));
								} //Note: 2141131 clock time duration field	

							} else {

								oSingleListEntry.addCell(new sap.m.Label({
									//Checks and adds a dot or comma as required
									text: formattedDecimal,
									design: "Bold"
									/*sap.ca.ui.model.format.NumberFormat.getInstance({
									style: 'standard'
								}).format(list_item_entry.time.toFixed(2))*/
								}));
							}

							// Adding the status in the table
							var stateOfStatus;
							if (list_item_entry.statusId === "REJECTED") { //Note:Save should also be in red color         
								stateOfStatus = sap.ui.core.ValueState.Error;
							} else if (list_item_entry.statusId === "MSAVE") {
								stateOfStatus = sap.ui.core.ValueState.NONE;
							} else {
								stateOfStatus = sap.ui.core.ValueState.Success;
							}
							oSingleListEntry.setType("Navigation");
							oSingleListEntry.addCell(new sap.m.ObjectStatus({
								text: list_item_entry.status,
								state: stateOfStatus
							}));

							this.entryListContents.addItem(oSingleListEntry);

						}
					}
					/*if (jQuery.device.is.phone) {
					this.byId("WEEKLY_PAGE").setTitle(
						this.oBundle.getText("SUMMARY", [
									                                 this.convertDateFormat(this.parseDateYYYYMMdd(oModel.getData().start)),
									                                 this.convertDateFormat(this.parseDateYYYYMMdd(oModel.getData().end))
									                                 ]));
				}*/
					/*if (jQuery.device.is.phone || jQuery.device.is.tablet) {
					var oSwipeContent = new sap.m.Button({
						text: this.oBundle.getText("DELETE"),
						type: "Reject"
					});
					self = this;
					oSwipeContent.attachPress(function() {
						var oData = oModel.getData();
						oData.days[self.dayIndex].entries[self.entryIndex].deleted = true;
						self.loadListWithoModel();
					});
					this.byId("ENTRY_LIST_CONTENTS").setSwipeContent(oSwipeContent);
				}*/

					//Filling the object headers with data

				}
				if (sap.ui.Device.system.phone) {
					this.setWeekOverviews(1);
				} else {
					this.setWeekOverviews(2);
				}

			},

			// code added for delete functionailty
			onDelete: function() {
				var oTableRef = this.byId("ENTRY_LIST_CONTENTS");
				var selectedItems = [];
				selectedItems = oTableRef.getSelectedItems();
				// Deleted Hours Summary
				var deletedHours = 0;
				var deletedMinutes = 0;
				var deletedTime = 0;
				var numberOfItemsGettingDeleted;
				var dayIndex;
				var entryIndex;
				var entry;
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var oPageData = oModel.getData();
				var oSettings = null;
				numberOfItemsGettingDeleted = selectedItems.length;
				for (var i = 0; i < selectedItems.length; i++) {
					dayIndex = selectedItems[i].data().day;
					entryIndex = selectedItems[i].data().entry;
					entry = oPageData.days[dayIndex].entries[entryIndex];
					this.updatePageData(true, dayIndex, entry, false);
					if (entry.subItems !== this.oApplicationFacade.getResourceBundle().getText("ADD_NEW")) {
						deletedHours += entry.hours;
						deletedMinutes += entry.minutes;
						deletedTime += entry.time;
						deletedTime = parseFloat(deletedTime.toFixed(2));
					} else {
						numberOfItemsGettingDeleted--;
					}
					if (deletedMinutes > 59) {
						deletedMinutes -= 60;
						deletedHours++;
					}
				}
				if (this.clockEntry) {

					oSettings = {
						question: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY"),
						additionalInformation: [{
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
							text: numberOfItemsGettingDeleted.toString()
						}, {
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_HOURS"),
							text: this.oBundle.getText("FULL_CONCATENATE_HOURSMIN", [deletedHours, deletedMinutes])
						}],
						showNote: false,
						title: this.oConfiguration.getText("DELETE_CONFIRMATION"),
						confirmButtonLabel: this.oBundle.getText("OK")
					};
				} else {
					var totalDuration = this.oBundle.getText("TOTAL_DURATION");
					oSettings = {
						question: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY"),
						additionalInformation: [{
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
							text: numberOfItemsGettingDeleted.toString()
						}, {
							label: totalDuration,
							text: this.formatTime(deletedTime.toString())
							/*sap.ca.ui.model.format.NumberFormat.getInstance({
									style: "standard"
								}).format(deletedTime.toString())*/
						}],
						showNote: false,
						title: this.oConfiguration.getText("DELETE_CONFIRMATION"),
						confirmButtonLabel: this.oBundle.getText("OK")
					};
				}

				this.openConfirmationPopup(oSettings, false);

				/*var _this = this;
				sap.ca.ui.dialog.confirmation.open(oSettings, function(response) {
					if (response.isConfirmed === true) {
						_this.submitTime(false);
					}
				});*/
			},
			updatePageData: function(bDeleted, dayIndex, entry, bToBeReleased) {
				if (!entry) {
					return;
				}

				this.entry = entry;
				this.dayIndex = dayIndex;
				if (bDeleted) {
					this.entry.deleted = true;
				}
				if (bToBeReleased) {
					this.entry.bToBeReleased = true;
				}

				// Prepare entry
				this.entry.newEntry = false;
				this.entry.showTime = true;
				if (!this.clockEntry) {
					this.entry.hours = parseInt(this.entry.hours, 10);
					this.entry.minutes = parseInt(this.entry.minutes, 10);
				} else {
					this.entry.startTime = entry.startTime;
					this.entry.endTime = entry.endTime;
					this.entry.hours = entry.hours;
					this.entry.minutes = entry.minutes;
					this.entry.time = entry.time;
				}

				this.entry.hasNotes = (this.entry.notes && this.entry.notes.length > 0) ? true : false;

				/*if (this.dayIndex < 0) {
					// this is a multi-day entry
					var calendar = this.byId("weeklyCalendar");
					var selectedDates = calendar.getSelectedDates();
					for (var i = 0; i < selectedDates.length; i++) {
						var entries = this.getDateEntries(selectedDates[i]);
						entries.push(jQuery.extend(true, {}, this.entry));

					}
				}*/
			},

			selectDateOnAllCheckBoxSelection: function(tblCntrl) {

				var listItems = tblCntrl.getItems();
				var selItems = tblCntrl.getSelectedItems();
				var selectedDates = [];
				var unSelectedDates = [];
				var j = 0;
				for (var i = 0; i < listItems.length; i++) {

					if (selItems[j] && (listItems[i].data().dateSelected === selItems[j].data().dateSelected)) {
						selectedDates.push(selItems[j].data().dateSelected);
						if (j < selItems.length) {
							j++;
						}
					} else {
						unSelectedDates.push(listItems[i].data().dateSelected);
					}

				}

				this.byId("WEEKLY_CALENDAR").toggleDatesSelection(unSelectedDates, false);
				this.byId("WEEKLY_CALENDAR").toggleDatesSelection(selectedDates, true);

				selectedDates = [];
				unSelectedDates = [];
			},

			getHeaderFooterOptions: function() {

				var that = this;
				var objHdrFtr = {
					sI18NFullscreenTitle: "TIMESHEET_TITLE",

					oEditBtn: {
						id: "QUICK_FILL_BTN",
						sI18nBtnTxt: "CREATE",
						onBtnPressed: function(evt) {
							that.onAddNewEntry(evt);
						}
					},

					buttonList: [{
						sId: "copyBtn",
						sI18nBtnTxt: "Copy",
						onBtnPressed: function(evt) {
							that.onCopy(evt);
						}
					}, {
						sId: "deleteBtn",
						sI18nBtnTxt: "DELETE",
						onBtnPressed: function(evt) {
							that.onDelete(evt);
						}
					}, {
						sId: "SUBMIT_BTN",
						sI18nBtnTxt: "SUBMIT",
						onBtnPressed: function(evt) {
							that.onSubmit(evt);
						}
					}]

				};
				var m = new sap.ui.core.routing.HashChanger();
				var oUrl = m.getHash();
				if (oUrl.indexOf("Shell-runStandaloneApp") >= 0) {
					objHdrFtr.bSuppressBookmarkButton = true;
				}
				/**
				 * @ControllerHook Modify the footer buttons
				 * This hook method can be used to add and change buttons for the detail view footer
				 * It is called when the decision options for the detail item are fetched successfully
				 * @callback hcm.mytimesheet.view.S3~extHookChangeHeaderFooterOptions
				 * @param {object} Header Footer Object
				 * @return {object} Header Footer Object
				 */

				if (this.extHookChangeHeaderFooterOptions) {
					objHdrFtr = this.extHookChangeHeaderFooterOptions(objHdrFtr);
				}

				return objHdrFtr;
			}

		});
},
	"hcm/mytimesheet/view/S3.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<sap.ui.core:View controllerName="hcm.mytimesheet.view.S3"\n\txmlns="sap.m" xmlns:sap.ui.layout.form="sap.ui.layout.form"\n\txmlns:sap.ui.layout="sap.ui.layout" xmlns:sap.me="sap.me"\n\txmlns:sap.ui.core="sap.ui.core">\n\t<Page id="WEEKLY_PAGE" title="{i18n>WEEKENTRY_TITLE}"\n\t\tenableScrolling="false">\n\t\t<content>\n\t\t<sap.ui.layout:FixFlex>\n\t\t\t<sap.ui.layout:fixContent>\n\t\t\t<sap.me:Calendar id="WEEKLY_CALENDAR"\n\t\t\t\tswipeToNavigate="true" design="Approval" singleRow="true"\n\t\t\t\tweeksPerRow="2" hideNavControls="false"\n\t\t\t\tcurrentDate="{ path: \'/start\', formatter:\'.parseDateYYYYMMdd\' }"\n\t\t\t\ttapOnDate="onSelect" enableMultiselection=\'true\' changeCurrentDate="onCalendarWeekChange">\n\t\t\t</sap.me:Calendar>\n\t\t\t</sap.ui.layout:fixContent>\n\t\t\t\n\t\t\t<sap.ui.layout:flexContent>\n\t\t\t<ScrollContainer id="scroller"\n                vertical="true"\n                height="100%"\n                focusable="true"\n                >\n                <content>\n                \n\n\t\t\t\t\t<sap.ui.layout:Grid id="MTS3_SUMMARY_GRID" defaultSpan="L6 M6 S12">\n\t\t\t\t\t\t<sap.ui.layout:content>\n\t\t\t\t\t\t\n\t\t\t\t\t\t\t<sap.ui.layout:VerticalLayout id="MTS3_FIRST_INFO"\n\t\t\t\t\t\t\t\twidth="100%">\n\n\t\t\t\t\t\t\t\t<ObjectListItem id="MTS3_CURRENT_WEEK_INFO_1"\n\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<firstStatus>\n\t\t\t\t\t\t\t\t\t\t<ObjectStatus id="MTS3_TXT_ASSIGNMENTS_1"  state="Error">\n\t\t\t\t\t\t\t\t\t\t</ObjectStatus>\n\t\t\t\t\t\t\t\t\t</firstStatus>\n\t\t\t\t\t\t\t\t\t<secondStatus>\n\t\t\t\t\t\t\t\t\t\t<ObjectStatus id="MTS3_TXT_APPROVED_HOURS_1" state="Success">\n\t\t\t\t\t\t\t\t\t\t</ObjectStatus>\n\t\t\t\t\t\t\t\t\t</secondStatus>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<attributes>\n    \t\t\t\t\t\t\t\t\t<ObjectAttribute />\n    \t\t\t\t\t\t\t\t\t<ObjectAttribute id="MTS3_TARGET_TIME_1"/>\n\t\t\t\t\t\t\t\t\t</attributes>\n\t\t\t\t\t\t\t\t</ObjectListItem>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</sap.ui.layout:VerticalLayout>\n\t\t\t\t\t\t\t<sap.ui.layout:VerticalLayout id="MTS3_SECOND_INFO" \n\t\t\t\t\t\t\t\twidth="100%">\n\n\t\t\t\t\t\t\t\t<ObjectListItem id="MTS3_CURRENT_WEEK_INFO_2">\n\t\t\t\t\t\t\t\t\t\t<firstStatus>\n\t\t\t\t\t\t\t\t\t\t\t<ObjectStatus id="MTS3_TXT_ASSIGNMENTS_2" \n\t\t\t\t\t\t\t\t\t\t\t\tstate="Error">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t</ObjectStatus>\n\t\t\t\t\t\t\t\t\t\t</firstStatus>\n\t\t\t\t\t\t\t\t\t\t\t<secondStatus>\n\t\t\t\t\t\t\t\t\t\t\t\t<ObjectStatus id="MTS3_TXT_APPROVED_HOURS_2" \n\t\t\t\t\t\t\t\t\t\t\t\t\tstate="Success">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t</ObjectStatus>\n\t\t\t\t\t\t\t\t\t\t\t</secondStatus>\n\t\t\t\t\t\t\t\t\t<attributes>\n\t\t\t\t\t\t\t\t\t\t<ObjectAttribute />\n\t\t\t\t\t\t\t\t\t\t<ObjectAttribute id="MTS3_TARGET_TIME_2" />\n\t\t\t\t\t\t\t\t\t</attributes>\n\t\t\t\t\t\t\t\t</ObjectListItem>\n\t\t\t\t\t\t\t</sap.ui.layout:VerticalLayout>\n\t\t\t\t\t\t</sap.ui.layout:content>\n\t\t\t\t\t</sap.ui.layout:Grid>\n\t\t\t\t\n\t\t\t<Table id="ENTRY_LIST_CONTENTS" mode="MultiSelect" select="onItemSelect">\n\t\t\t\n\t\t\t</Table>\n\t\t\t\n\n        <sap.me:CalendarLegend id="LEGEND" design="Approval">\n\t\t\t</sap.me:CalendarLegend>\n\t\t\t</content>\n\t\t\t</ScrollContainer>\n\t\t\t</sap.ui.layout:flexContent>\n\t\t\t</sap.ui.layout:FixFlex>\n        </content>\n\t</Page>\n</sap.ui.core:View>\n',
	"hcm/mytimesheet/view/S31.controller.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("sap.ui.model.odata.datajs");
jQuery.sap.require("hcm.mytimesheet.model.TimeEntry");
jQuery.sap.require("hcm.mytimesheet.utils.DataManager");
jQuery.sap.require("hcm.mytimesheet.utils.ConcurrentEmployment");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("sap.ca.ui.model.type.Number");
/*global hcm:true */
sap.ca.scfld.md.controller.BaseFullscreenController
	.extend(
		"hcm.mytimesheet.view.S31", {
			//controller hooks
			extHookChangeHeaderFooterOptions: null,
			extHookChangeObjectBeforePost: null,
			onInit: function() {
				sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);
				this.RESULTS_TOP = 30;
				this.top = this.RESULTS_TOP;
				this.localSkip = 0;
				this.remoteSkip = 0;
				this.MODEL_SIZE_LIMIT = 1000;
				this.gv_fieldRelated = "";
				this.searchField_begDa = "";
				this.searchField_endDa = "";
				this.pagingEnabled = false;
				this.localTypeList = [];
				this.favoriteDeletedIds = [];
				this.remoteTypeList = [];
				this.resultsTotalCount = 0;
				this.remoteSearchPhrase = "";
				this.favoriteSelected = false;
				this.worklistSelectedObj = {};
				this.worklistItemSelected = false;
				this.continueSearchOnServerActive = false;
				this.initialize();
				this.entry = new hcm.mytimesheet.model.TimeEntry(0, "", false, true);
				var self = this;
				this.oRouter.attachRouteMatched(function(oEvent) {

					if (oEvent.getParameter("name") === "S31") {
						//only invoke if a pernr has been selected
						if (self.oApplication.pernr) {
							self.initializeView(oEvent.getParameter("arguments").context);
						} else {
							self.context = oEvent.getParameter("arguments").context;
						}
					}

				}, this);
			},

			onAfterRendering: function() {
				var self = this;
				if (!this.oApplication.pernr) {
					hcm.mytimesheet.utils.ConcurrentEmployment.getCEEnablement(this, function() {
						if (self.context) {
							self.initializeView(self.context);
						}
					});

				}
			},

			initializeView: function(context) {
				this.noneText = "(" + this.oBundle.getText("None") + ")";
				if (!this.oApplication.getModel("TSM_WEEKLY")) {
					var curDate = new Date();
					this.setInitialInfoModelData(curDate);
				}
				this.getHderFooterOptions();
				var createScreenModel = new sap.ui.model.json.JSONModel();
				this.oApplication.setModel(createScreenModel, "createScreenModel");

				this.worklistItemSelected = false;
				this.worklistSelectedObj = {};
				this.entry = new hcm.mytimesheet.model.TimeEntry(0, "", false, true);
				var firstDayOffSet = parseInt(context[context.indexOf("offset") + 6], 10);
				this.byId("weeklyCalendar").setFirstDayOffset(firstDayOffSet);
				var dateStr = decodeURIComponent(context),
					noOfWeeks;
				dateStr = dateStr.replace("offset", "");
				dateStr = dateStr.slice(0, -1);
				var weeklyModel = this.oApplication.getModel("TSM_WEEKLY");
				var date = new Date(dateStr);
				if (sap.ui.Device.system.phone) {
					this.byId("weeklyCalendar").setWeeksPerRow(1); //in case of mobile devices 1 week is shown
					noOfWeeks = 6;
				} else {
					noOfWeeks = 13;

				}
				var firstday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - this.getActualOffset(firstDayOffSet, date.getDay()));
				var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + noOfWeeks);
				//Getting the weekly model
				if (weeklyModel.getData().createdFromS31) {

					this.clockEntry = weeklyModel.getProperty("/clockEntry");
					createScreenModel.setProperty("/start", this.getDateStr(firstday));
					createScreenModel.setProperty("/weekStart", this.getDateStr(firstday));
					createScreenModel.setProperty("/weekEnd", this.getDateStr(lastday));
					weeklyModel.setProperty("/weekStart", this.getDateStr(firstday));
					weeklyModel.setProperty("/weekEnd", this.getDateStr(lastday));
				} else {
					createScreenModel.setProperty("/start", this.getDateStr(firstday));
					createScreenModel.setProperty("/weekStart", this.getDateStr(firstday));
					createScreenModel.setProperty("/weekEnd", this.getDateStr(lastday));
					this.clockEntry = weeklyModel.getProperty("/clockEntry");
					this.releaseFuture = weeklyModel.getProperty("/releaseFuture");
					//Note 2115732 Correction for pop-up header starts here
					this.releaseAllowed = weeklyModel.getProperty("/releaseAllowed");
					//Note 2115732 Correction for pop-up header starts here
					this.FavoriteAvailable = weeklyModel.getProperty("/favoriteAvailable");
				}
				createScreenModel.setProperty("/clockEntry", this.clockEntry);
				createScreenModel.setProperty("/decimalTimeEntryVisible", !this.clockEntry);
				createScreenModel.setProperty("/editButtonEnabled", false);
				createScreenModel.setProperty("/updateButtonEnabled", false);
				//Initializing the view
				this.initView();
				//call Profile Fields
				this.getProfileFields();
				//call Worklist
				this.getWorkListCollection();
				//call favorites
				this.getFavoritesCollection();

				this.getView().setModel(createScreenModel);

			},

			initialize: function() {
				if (!this.oApplication) {

					this.oApplication = this.oApplicationFacade.oApplicationImplementation;

					this.oConfiguration = new hcm.mytimesheet.utils.InitialConfigHelper();
					this.oService = new hcm.mytimesheet.Service();
					this.oConnectionManager = this.oApplication.oConnectionManager;
					this.oBundle = this.oApplicationFacade.oApplicationImplementation
						.getResourceBundle();
					this.oConfiguration.setResourceBundle(this.oBundle);

				}

			},

			setInitialInfoModelData: function(curDate) {
				var oModel = new sap.ui.model.json.JSONModel();
				var noOfWeeks = 13; //by default 2 weeks are shown
				if (sap.ui.Device.system.phone) {
					noOfWeeks = 6;
					this.byId("weeklyCalendar").setWeeksPerRow(1); //in case of mobile devices 1 week is shown

				}

				var first = curDate.getTime() - (curDate.getDay() * 24 * 60 * 60 * 1000); // First day is the day of the month - the day of the week
				var last = first + (noOfWeeks * 24 * 60 * 60 * 1000); // last day is the first day + 6

				var firstday = new Date(first);
				var lastday = new Date(last);
				this.oApplication.setModel(oModel, "TSM_WEEKLY");

				this.oService.getInitialInfos(this, this.oApplication.pernr, this.getDateStr(curDate), this.getDateStr(curDate));
				oModel.setProperty("/showSubmit", false);
				oModel.setProperty("/selected", this.getDateStr(curDate));
				oModel.setProperty("/selectedDate", curDate);
				oModel.setProperty("/year", curDate.getFullYear());
				oModel.setProperty("/start", this.getDateStr(firstday));
				oModel.setProperty("/weekStart", this.getDateStr(firstday));
				oModel.setProperty("/weekEnd", this.getDateStr(lastday));
				oModel.setProperty("/createdFromS31", true);

				var InitalInfoModel = this.oConfiguration.getInitialInfoModel();

				this.releaseAllowed = InitalInfoModel.ReleaseDirectly === "TRUE";
				oModel.setProperty("/releaseAllowed", this.releaseAllowed);

				oModel.setProperty("/releaseFuture", InitalInfoModel.ReleaseFuture);
				this.releaseFuture = InitalInfoModel.ReleaseFuture;
				oModel.setProperty("/favoriteAvailable", InitalInfoModel.FavoriteAvailable);
				this.FavoriteAvailable = InitalInfoModel.FavoriteAvailable;
				this.clockEntry = (InitalInfoModel.ClockEntry === "TRUE");
				oModel.setProperty("/clockEntry", this.clockEntry);
				oModel.setProperty("/decimalTimeEntryVisible", !this.clockEntry);
				return oModel;
			},

			initView: function() {
				var s3Model = this.oApplication.getModel("S31modelexch");
				var weeklyModel = this.oApplication.getModel("TSM_WEEKLY");
				this.byId("timeAssignment").setValue("");
				// this.byId("favName").setValue("");
				var createScreenModel = this.oApplication.getModel("createScreenModel");
				var days = ["Sun", "Mon", "Tue", "Wed", "Thu",
                            "Fri", "Sat"];
				if (!s3Model) {
					s3Model = new sap.ui.model.json.JSONModel();
					s3Model.setProperty("/selectedDates", weeklyModel.getProperty("/selectedDate"));
					s3Model.setProperty("/editentryview", false);
					this.oApplication.setModel(s3Model, "S31modelexch");
				}
				if (!this.FavoriteAvailable) {
					this.byId("timeAssignmentLbl").setText(this.oBundle.getText("SELECT_WORKLIST"));
				}
				var weeklyCal = this.byId("weeklyCalendar");
				weeklyCal.setEnableMultiselection(true);

				// set selected dates from previous screen
				weeklyCal.unselectAllDates();
				/*weeklyCal.toggleDatesSelection(s3Model
          .getData().selectedDates, true);*/
				if (!s3Model.getProperty("/editentryview")) {
					weeklyCal.setEnableMultiselection(true);
					weeklyCal.toggleDatesSelection(s3Model
						.getData().selectedDates, true);
					if (s3Model.getProperty("/copySelected")) {
						this.edit_entry = false;
						this.edit_entry_data = this.clone(s3Model.getData().editeddata);
						this.byId("accountingInfoPanel").setExpanded(true);
						this.editdatafroms3 = s3Model.getData().editeddata;
						this.entry = this.editdatafroms3.entry;
						this.entry.time = sap.ca.ui.model.format.NumberFormat.getInstance({
							style: "standard"
						}).format(this.entry.time);
						createScreenModel.setProperty("/entry", this.entry);
						if (this.isClockEntry()) {
							this.byId("startTime").setValue(this.entry.startTime);
							this.byId("endTime").setValue(this.entry.endTime);
						} else {
							this.byId("decimalTimeEntryValue").setValue(this.entry.time);
						}

						//setting notes
						if (this.entry.hasNotes) {
							this.byId("S31TextArea").setValue(this.entry.notes);
						}
					} else {
						this.edit_entry = false;
						this.byId("decimalTimeEntryValue").setValue("");
						this.byId("startTime").setValue("");
						this.byId("endTime").setValue("");
						//    weeklyCal.setDisabledWeekDays([]);
						this.byId("timeAssignment").setValue("");
					}

				} else {
					weeklyCal.toggleDatesSelection(s3Model
						.getData().selectedDates, true);
					this.edit_entry = true;
					this.edit_entry_data = this.clone(s3Model.getData().editeddata);
					this.byId("accountingInfoPanel").setExpanded(true);
					//    HFoption.sI18NFullscreenTitle = this.oBundle.getText("TIMESHEET_EDIT_ENTRY_TITLE_SCREEN");
					weeklyCal.setEnableMultiselection(true);
					this.editdatafroms3 = s3Model.getData().editeddata;
					this.entry = this.editdatafroms3.entry;
					this.entry.time = sap.ca.ui.model.format.NumberFormat.getInstance({
						style: "standard"
					}).format(this.entry.time);
					createScreenModel.setProperty("/entry", this.entry);
					if (this.isClockEntry()) {
						if (this.entry.startTime !== this.entry.endTime) { //Note: 2141131 clock time duration field
							this.byId("startTime").setValue(this.entry.startTime);
							this.byId("endTime").setValue(this.entry.endTime);
						} else { //Note: Begin 2141131 clock time duration field
							this.byId("ClkTimeDecimalTimeEntryValue").setValue(this.entry.time);
						} //Note:End 2141131 clock time duration field			

					} else {
						this.byId("decimalTimeEntryValue").setValue(this.entry.time);
					}
					// disable calendar in edit mode

					/*var selectedDay = weeklyCal.getSelectedDates()
						.toString().substr(0, 3);
					var disableDates = [];
					for (var key in days) {
						if (!(selectedDay === days[key])) {
							disableDates.push(key);
						}
					}
					var disable = selectedDay ? disableDates : null;
					weeklyCal.setDisabledWeekDays(disable);*/

					if (this.entry.hasNotes) {
						this.byId("S31TextArea").setValue(this.entry.notes);
					}
				}

				if (weeklyCal.getSelectedDates().length > 1) {
					this.byId("createPanel").setHeaderText(
						this.oBundle.getText(
							"SUBMIT_HEADER_TEXT", [this.formatDateMMMDD(new Date(weeklyCal.getSelectedDates()[0])),
                 weeklyCal.getSelectedDates().length - 1]));

				} else if (weeklyCal.getSelectedDates().length === 1) {
					this.byId("createPanel").setHeaderText(
						this.oBundle
						.getText(
							"SUBMIT_HEADER_TEXT_SINGLE", [this.formatDateMMMDD(new Date(weeklyCal.getSelectedDates()[0]))]));

				} else {
					this.byId("createPanel").setHeaderText(this.oBundle.getText("ENTRY_DETAILS"));
					this.setBtnEnabled("SUBMIT_BTN", false);
				}

				if (s3Model.getData().pageData) {
					var legendArray = s3Model.getData().pageData.legendforS31;
					weeklyCal.toggleDatesType(legendArray.yellow, sap.me.CalendarEventType.Type04, true);
					weeklyCal.toggleDatesType(legendArray.green, sap.me.CalendarEventType.Type01, true);
					weeklyCal.toggleDatesType(legendArray.grey, sap.me.CalendarEventType.Type00, true);
					weeklyCal.toggleDatesType(legendArray.red, sap.me.CalendarEventType.Type07, true);
					weeklyCal.toggleDatesType(legendArray.rejected, sap.me.CalendarEventType.Type06, true);
				}

			},
			//deep copy of objects
			clone: function(obj) {
				// Handle the 3 simple types, and null or undefined
				if (obj === null || typeof obj !== "object") {
					return obj;
				}

				// Handle Object
				if (obj instanceof Object) {
					var copy = {};
					var attr = null;
					for (attr in obj) {
						if (obj.hasOwnProperty(attr)) {
							copy[attr] = this.clone(obj[attr]);
						}
					}
					return copy;
				}

				throw new Error("Unable to copy obj! Its type isn't supported.");
			},

			formatDateMMMDD: function(oDate) {
				var month = oDate.getMonth();
				var day = oDate.getDate();

				var dateString = this.oBundle.getText("MONTH_" + month) + " " + day;

				return dateString;
			},
			getActualOffset: function(firstDayOffset, currentDay) {
				var constantOffset = 7;
				if (firstDayOffset > currentDay) {
					return currentDay + constantOffset - firstDayOffset;
				} else {
					return currentDay - firstDayOffset;
				}
			},
			validate: function() {
				if (this.favoriteSelected) {
					this.byId("timeAssignment").setValue("");
				}
				this.byId("ClkTimeDecimalTimeEntryValue").setValue(""); //Note: 2141131 clock time duration field
				this.byId("ClkTimeDecimalTimeEntryValue").setEnabled(false); //Note: 2141131 clock time duration field
				this.dateTimeModified = true;
				this.validateSaveBtnVisibility();
			},
			check_for_changed_data: function() {
				var calendar = this.byId("weeklyCalendar");
				var selectedDates = calendar.getSelectedDates();
				var duration = null;
				if (this.isClockEntry()) {
					var startTime = this.byId('startTime').getValue();
					var endTime = this.byId('endTime').getValue();

				} else {
					duration = this.byId('decimalTimeEntryValue').getValue();
				}
				var note_text = this.byId('S31TextArea').getValue();
				var suggested_cost_assignment_data = this.byId('COST_ASSIGNMENT_RECENTLY_USED_LIST').getValue();

				if (this.edit_entry) {
					//for edit entry check for any changed data
					var edit_entry_data = this.edit_entry_data; //has the original data
					var new_selectedDates = this.getDateStr(new Date(selectedDates[0]));
					var original_date = edit_entry_data.pageData.days[edit_entry_data.dayIndex].dateStr;
					var original_notes = edit_entry_data.entry.notes;
					var original_main_name = edit_entry_data.entry.mainName;
					var original_main_code = edit_entry_data.entry.mainCode;
					var accounting_infos = this.getView().getModel('fordynamictypes').getData().types; //current values
					var itemName;
					var itemCode;
					var selected_accounting_info;
					var startString, endString;
					var index, index2;
					//checking for any change in the time entered
					if (this.isClockEntry()) {
						var original_start_time = edit_entry_data.entry.startTime;
						var original_end_time = edit_entry_data.entry.endTime;
						if (original_start_time !== startTime || original_end_time !== endTime)
							return true;
					} else {
						var original_duration = edit_entry_data.entry.time;
						if (original_duration !== duration)
							return true;
					}

					//checking if there is any change in the accounting infos
					for (index = 0; index < accounting_infos.length; index++) {

						itemName = accounting_infos[index].fieldName;
						//comparing the main item to check for any change
						if (itemName === original_main_name) {
							selected_accounting_info = accounting_infos[index].value;
							startString = accounting_infos[index].value.indexOf('(');
							endString = accounting_infos[index].value.indexOf(')');
							itemCode = accounting_infos[index].value.substring(startString + 1, endString);
							if (itemCode !== original_main_code) {
								return true;
							}
						}
						//checking the child items for any change
						for (index2 = 0; edit_entry_data.entry.childItems && edit_entry_data.entry.childItems[index2]; index2++) {
							if (edit_entry_data.entry.childNames[index2] === itemName) {
								selected_accounting_info = accounting_infos[index].value;
								startString = accounting_infos[index].value.indexOf('(');
								endString = accounting_infos[index].value.indexOf(')');
								itemCode = accounting_infos[index].value.substring(startString + 1, endString);
								if (edit_entry_data.entry.childCodes[index2] !== itemCode) {
									return true;
								}
							}
						}
					}

					if (selectedDates.length > 1 || original_date !== new_selectedDates || original_notes !== note_text) {
						return true;
					}
					//Incase no items have changed
					return false;
				} else {
					//for new entries check for any data entered
					var manual_cost_assignment_data = false;

					var typesArray = this.getView().getModel('fordynamictypes').getData().types;
					if (typesArray) {
						for (var i = 0; i < typesArray.length; i++) {
							if (typesArray[i].value.trim()) {
								manual_cost_assignment_data = true;
							}
						}
					}
					//checking if any of the fields have some value or not
					if (this.isClockEntry()) {
						if (selectedDates.length !== 0 || startTime !== "" || endTime !== "" || suggested_cost_assignment_data !== "" ||
							manual_cost_assignment_data)
							return true;
					} else {
						if (selectedDates.length !== 0 || (duration !== "0" && duration !== "") || suggested_cost_assignment_data !== "" ||
							manual_cost_assignment_data)
							return true;
					}
					return false;
				}
			},

			onTapOnDate: function(oEvent) {
				var dateSelected = oEvent.getSource()
					.getSelectedDates();
				var numberOfDatesSelected = dateSelected.length;
				if (this.edit_entry) {
					var dateParse = sap.ui.core.format.DateFormat.getDateInstance({
						pattern: "YYYYMMdd"
					});

					var editDate = dateParse.parse(this.edit_entry_data.pageData.days[this.edit_entry_data.dayIndex].dateStr);
					for (var i = 0; i < numberOfDatesSelected; i++) {
						var newDate = new Date(dateSelected[i]);
						if (!(newDate.getFullYear() === editDate.getFullYear() && newDate.getMonth() === editDate.getMonth() && newDate.getDate() ===
							editDate.getDate())) {
							oEvent.getSource().toggleDatesSelection([newDate.toDateString()], false);
						}
					}
					this.validateSaveBtnVisibility(oEvent);
					return;
				}
				this.validateSaveBtnVisibility(oEvent);
				if (numberOfDatesSelected > 1) {

					this.byId("createPanel").setHeaderText(
						this.oBundle.getText("SUBMIT_HEADER_TEXT", [
                 this.formatDateMMMDD(new Date(dateSelected[0])),
                 numberOfDatesSelected - 1]));
				} else if (numberOfDatesSelected === 1) {
					this.byId("createPanel").setHeaderText(
						this.oBundle.getText(
							"SUBMIT_HEADER_TEXT_SINGLE", [this.formatDateMMMDD(new Date(dateSelected[0]))]));

				} else if (numberOfDatesSelected === 0) {
					this.byId("createPanel").setHeaderText(this.oBundle.getText("ENTRY_DETAILS"));
				}

			},
			validateSaveBtnVisibility: function() {
				var timeFlag = false;
				//checking the type of time entry and setting the flag true only for valid times
				if (this.isClockEntry()) {
					var startTime = this.byId("startTime").getValue();
					var endTime = this.byId("endTime").getValue();
					var clkTimeDuration = this.byId("ClkTimeDecimalTimeEntryValue").getValue(); //Note: Begin 2141131 clock time duration field
					if ((clkTimeDuration !== "0") && clkTimeDuration !== "") {
						this.clkTimeDurationFilled = true;
					} else {
						this.clkTimeDurationFilled = false;
					}
					if (((startTime && endTime) && startTime !== endTime) || this.clkTimeDurationFilled) { //Note: End 2141131 clock time duration field
						timeFlag = true;
					} else {
						timeFlag = false;
					}

				} else {
					//condition for decimal inputs
					var decimalTimeEntryValue = this.byId("decimalTimeEntryValue").getValue();
					if ((decimalTimeEntryValue !== "0") && decimalTimeEntryValue !== "") {
						//if condition checks if any value has been entered for the decimal input control
						if (this._isValidDecimalNumber(decimalTimeEntryValue)) {
							timeFlag = true;
						} else {
							timeFlag = false;
						}

					} else {
						timeFlag = false;
					}
				}
				var selectedDate = this.byId("weeklyCalendar")
					.getSelectedDates().length;
				//var dateTimeValue = this.byId('DateTimeInputValue')
				//  .getValue();

				var flag = false;
				var typesArray = this.getView().getModel().getData().types;
				if (this.worklistItemSelected) {
					flag = true;
				} else if (typesArray) {
					for (var i = 0; i < typesArray.length; i++) {
						if (typesArray[i].value.trim() || typesArray[i].valueStateText.trim()) {
							flag = true;
							break;
						}
					}
				}

				if (flag && selectedDate && timeFlag) {
					this.setBtnEnabled("SUBMIT_BTN", true);
				} else {
					this.setBtnEnabled("SUBMIT_BTN", false);
				}
			},
			suggestionHelpChange: function(oEvent) {
				oEvent.getSource().setValue("");
				this.validateSaveBtnVisibility(oEvent);
			},

			onFavoriteItemSelection: function(oEvent) {
				this.validateSaveBtnVisibility(oEvent);
			},

			onFavValueChange: function() {
				//this.byId("updateBtn").setEnabled(true);
				this.byId("timeAssignment").setValue("");
			},

			onManualItemSelection: function(oEvent) {
				this.validateSaveBtnVisibility(oEvent);

			},

			timeAssignmentLiveChange: function() {
				this.byId("timeAssignment").setValue("");
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
			},

			onDurationValueChange: function(oEvent) {
				this.validateSaveBtnVisibility(oEvent);
			},

			onDecimalTimeValueChange: function(oEvent) {
				if (this.favoriteSelected) {
					this.byId("timeAssignment").setValue("");
				}
				this.dateTimeModified = true;
				var decimalTimeEntryValue; //Note: Begin 2141131 clock time duration field
				if (!this.isClockEntry()) {
					decimalTimeEntryValue = this.byId("decimalTimeEntryValue").getValue();
				} else {
					decimalTimeEntryValue = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
				} //Note: End 2141131 clock time duration field
				if (this._isValidDecimalNumber(decimalTimeEntryValue)) {
					this.validateSaveBtnVisibility(oEvent);
				} else {
					this.setBtnEnabled("SUBMIT_BTN", false);
				}
			},

			_isValidDecimalNumber: function(number) {
				var numberString = number.toString();
				var decimalIndex = numberString.indexOf(".");
				var commaIndex = numberString.indexOf(",");
				if (decimalIndex > 0 && commaIndex > 0) {
					return false; //to make sure that user has entered either dot/comma but not both
				}
				var seperatorIndex = decimalIndex;
				if (seperatorIndex < 0) {
					seperatorIndex = numberString.indexOf(",");
				}
				var strCheck = "0123456789";
				var integerPart;
				var fractionalPart;
				var index = 0;
				var hasValue = false;
				if (seperatorIndex === -1) {
					integerPart = numberString;
					fractionalPart = "";
				} else {
					integerPart = numberString.slice(0, seperatorIndex);
					fractionalPart = numberString.slice(
						seperatorIndex + 1, numberString.length);
				}
				if (integerPart.length > 5) {
					return false;
				}
				for (index = 0; index < integerPart.length; index++) {
					if (strCheck.indexOf(integerPart[index]) === -1) {
						return false;
					} else {
						hasValue = true;
					}
				}

				if (fractionalPart.length > 2) {
					return false;
				}
				for (index = 0; index < fractionalPart.length; index++) {
					if (strCheck.indexOf(fractionalPart[index]) === -1) {
						return false;
					} else {
						hasValue = true;
					}
				}
				if (hasValue === false) {
					return false;
				}

				return true;
			},

			onNavButton: function() {

				var calendar = this.byId("weeklyCalendar");
				var selectedDate = calendar.getCurrentDate();
				var dateStr = selectedDate;
				selectedDate = dateStr + "offset" + calendar.getFirstDayOffset();
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setProperty("/currentDate", new Date(dateStr));
				this.oApplication.setModel(oModel, "S3exchangeModel");
				this.cleanUpOnBack();
				delete this.entry;
				//navigate to S3
				this.oRouter.navTo("S3", {
					context: selectedDate
				}, true);

			},
			cleanUpOnBack: function() {
				this.byId("timeAssignment").setValue("");
				this.byId("decimalTimeEntryValue").setValue("");
				this.byId("startTime").setValue("");
				this.byId("endTime").setValue("");
				delete this.worklistSelectedObj;
				this.worklistItemSelected = false;
				// this.byId("favName").setValue("");
				this.byId("weeklyCalendar").setDisabledWeekDays([]);
				this.byId("weeklyCalendar").unselectAllDates();
				this.byId("S31TextArea").setValue("");
				this.byId("ClkTimeDecimalTimeEntryValue").setValue(""); //Note: 2141131 clock time duration field
				var types = this.oApplication.getModel("accountingInfoModel").getData().types;
				for (var i = 0; i < types.length; i++) {
					if (types[i].value !== "" || types[i].valueStateText !== "") {
						types[i].value = "";
						types[i].valueStateText = "";
					}
				}

				this.byId("accountingInfoPanel").setExpanded(false);
				this.getView().getModel().setProperty("/types", types);
				this.oApplication.getModel("accountingInfoModel").setProperty("/types", types);
			},

			getDateStr: function(date) {
				return "" + date.getFullYear() + ("" + (date.getMonth() + 101)).substring(1) + ("" + (date.getDate() + 100)).substring(1);
			},

			getDateTimeStr: function(date) {
				return "" + date.getFullYear() + "-" + ("" + (date.getMonth() + 101)).substring(1) + "-" + ("" + (date.getDate() + 100)).substring(1) +
					"T00:00:00";
			},

			getValueHelpCollection: function(oselectedItem) {

				var self = this;
				var skip = 0;
				var selectedFieldName = (oselectedItem && oselectedItem.fieldName);
				if (this.remoteSearchPhrase) {
					skip = this.remoteSkip;
				} else {
					skip = this.localSkip;
				}
				//NOTE related input help
				var lc_separator = ";;";
				var lv_search_str = "";
				var length = this.getView().getModel('accountingInfoModel').getData().types.length;
				for (var i = 0; i < length; i++) {
					var fieldValue = this.getView().getModel('accountingInfoModel').getData().types[i].valueStateText;
					var fieldName = this.getView().getModel('accountingInfoModel').getData().types[i].fieldName;
					if (fieldValue.length !== 0 && fieldName !== selectedFieldName) {

						var lv_search_str_temp = fieldName + "=" + fieldValue;
						if (lv_search_str) {
							lv_search_str += lc_separator + lv_search_str_temp;
						} else {
							lv_search_str += lv_search_str_temp;
						}
					}
				}
				this.gv_fieldRelated = lv_search_str;

				var calendarRef = this.byId("weeklyCalendar");
				var selectedDates = calendarRef.getSelectedDates();
				if (selectedDates[0]) {
					var len = selectedDates.length;
					this.searchField_begDa = this.getDateStr(new Date(selectedDates[0]));
					this.searchField_endDa = this.getDateStr(new Date(selectedDates[len - 1]));
				} else {
					var oModel = this.oApplication.getModel("TSM_WEEKLY");
					this.searchField_begDa = (oModel.getProperty("/weekStart"));
					this.searchField_endDa = (oModel.getProperty("/weekEnd"));
				}
				this.oService
					.getValueHelpList(this.oApplication.pernr, (selectedFieldName || this.fieldName),

						this.top,
						skip,
						this.remoteSearchPhrase,
						this.gv_fieldRelated,
						this.searchField_begDa,
						this.searchField_endDa,
						function(data) {
							self.remoteSearchActive = false;
							var typeList = [];
							if (self.remoteSearch()) {

								typeList = self.localTypeList;
								self.remoteSearchActive = true;
								self.lastRemoteSearchPhrase = self.remoteSearchPhrase;
							} else {
								typeList = self.localTypeList;
							}

							// Add a "None" item to the list for
							// user to unselect
							// any type
							if (data.length > 0 && typeList.length === 0) {

								typeList.push({
									fieldValueId: self.noneText,
									fieldValue: self.noneText,
									fieldId: ""
								});

							}

							var flag;
							for (var i = 0; i < data.length; i++) {
								//Checking for duplicate values
								flag = 1;
								for (var j = 0; j < typeList.length; j++) {
									var vCheckFieldId = "(" + data[i].FieldId + ")";
									if (typeList[j].fieldValue === data[i].FieldValue && typeList[j].fieldId === vCheckFieldId) {
										flag = 0;
										break;
									}
								}
								if (flag === 1) {
									typeList
										.push({
											fieldValue: data[i].FieldValue,
											fieldId: "(" +
												data[i].FieldId +
												")",
											fieldValueId: data[i].FieldValue +
												" (" +
												data[i].FieldId +
												")"
										});
								}
							}

							function dynamicSort(property) {
								var sortOrder = 1;
								if (property[0] === "-") {
									sortOrder = -1;
									property = property.substr(1);
								}
								return function(a, b) {
									var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
									return result * sortOrder;
								};
							}
							typeList.sort(dynamicSort("fieldId"));
							// Check
							// self.oModel.setProperty("/typeList",
							self.oApplication.getModel("createScreenModel")
								.setProperty("/" + (oselectedItem && oselectedItem.fieldName),
									typeList);
							self.oApplication.getModel("createScreenModel").updateBindings();
							if (self.remoteSearch()) {
								self.remoteResultsLength = data.length;
								self
									.checkRemotePaging(self.remoteResultsLength);
							} else {
								self.localResultsLength = data.length;
								self
									.checkLocalPaging(
										self.localResultsLength,
										oselectedItem && oselectedItem.fieldName);
							}
						});
			},

			remoteSearch: function() {
				if ("remoteSearchPhrase" in this) {
					if (this.remoteSearchPhrase) {
						return this.remoteSearchPhrase;
					}
				}
				return false;
			},

			checkLocalPaging: function(recordCount) {
				//this.typeListControl = this.listOfManualItems[selectedFieldName];
				var typeListArray = this.typeListControl //this.listOfManualItems[selectedFieldName]
					.getItems();
				var typeListArrayLength = typeListArray.length;

				if (typeListArrayLength === 0 || typeListArrayLength >= this.MODEL_SIZE_LIMIT) {
					return;
				}

				if (typeListArray) {
					if (typeListArray[typeListArrayLength - 1]
						.getTitle() === this.oBundle
						.getText("TAP_TO_LOAD_MORE_LOADING")) {
						this.typeListControl
							.removeItem(typeListArray[typeListArrayLength - 1]);
					}
				}
				if (recordCount < this.top) {

					if (typeListArray[typeListArrayLength - 1].getTitle() === this.oBundle.getText("TAP_TO_LOAD_MORE") ||
						typeListArray[typeListArrayLength - 1].getTitle() === this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER")) {
						this.typeListControl
							.removeItem(typeListArray[typeListArrayLength -
								1]);
					}
				} else if (recordCount >= this.top) {
					// If tap to load more item is found in the list, do
					// nothing.
					if (typeListArray[typeListArrayLength - 1]
						.getTitle() === this.oBundle
						.getText("TAP_TO_LOAD_MORE")) {
						return;
					} else {
						// If continue search on server item is found in
						// the list, replace
						// with tap to load more item, else, add the tap
						// to load more item
						// to the list.
						if (typeListArray[typeListArrayLength - 1]
							.getTitle() === this.oBundle
							.getText("CONTINUE_SEARCH_ON_SERVER")) {
							typeListArray[typeListArrayLength - 1]
								.setTitle(this.oBundle
									.getText("TAP_TO_LOAD_MORE"));
						} else {

							this.loadMoreItem = new sap.m.StandardListItem({
								title: this.oBundle
									.getText("TAP_TO_LOAD_MORE"),
								active: true
							});

							this.typeListControl
								.addItem(this.loadMoreItem);
						}
					}
				}
			},

			checkRemotePaging: function(recordCount) {
				if (recordCount >= this.top ||
					!this.remoteSearchActive ||
					this.lastRemoteSearchPhrase !== this.remoteSearchPhrase) {
					var typeListArray = this.typeListControl.getItems();
					var typeListArrayLength = typeListArray.length;

					// Add continue search on server item if there is
					// nothing in the list.
					if (typeListArrayLength === 0 ||
						typeListArrayLength >= this.MODEL_SIZE_LIMIT) {
						this.noneTextItem = new sap.m.StandardListItem({
							title: this.noneText,
							active: true
						});

						this.typeListControl.insertItem(this.noneTextItem, 0);
						this.addContinueSearchItem(this.oBundle
							.getText("CONTINUE_SEARCH_ON_SERVER"));

						return;
					}

					// If continue search on server item is found in the
					// list, do nothing.
					if (typeListArray[typeListArrayLength - 1]
						.getTitle() === this.oBundle
						.getText("CONTINUE_SEARCH_ON_SERVER")) {
						return;
					} else {
						// If tap to load more item is found in the
						// list, replace with
						// continue search on server item, else add the
						// continue search on
						// server item.
						if (typeListArray[typeListArrayLength - 1]
							.getTitle() === this.oBundle
							.getText("TAP_TO_LOAD_MORE")) {
							typeListArray[typeListArrayLength - 1]
								.setTitle(this.oBundle
									.getText("CONTINUE_SEARCH_ON_SERVER"));
						} else {
							this
								.addContinueSearchItem(this.oBundle
									.getText("CONTINUE_SEARCH_ON_SERVER"));
						}
					}
				} else {
					typeListArray = this.typeListControl.getItems();
					typeListArrayLength = typeListArray.length;
					if (typeListArray[typeListArrayLength - 1].getTitle() === this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER") && recordCount < this.top) {
						this.typeListControl.removeItem(typeListArray[typeListArrayLength - 1]);
					}
				}
			},

			addContinueSearchItem: function() {

				this.continueSearchItem = new sap.m.StandardListItem({
					title: this.oBundle
						.getText("CONTINUE_SEARCH_ON_SERVER"),
					active: true
				});

				this.typeListControl.addItem(this.continueSearchItem);

				// Merge the 2 columns in the column list item directly
				// in the HTML so
				// that the continue search on server words don't wrap
				// in a single column.
				this.continueSearchItem
					.addEventDelegate({
						onAfterRendering: function() {
							$(
								this.continueSearchItem
								.$().context.firstChild)
								.attr("colspan", "2");
						}
					}, this);
			},

			tapToLoadMore: function(selectedItem) {
				/*this.loadMoreItem.setTitle(this.oBundle
        .getText("TAP_TO_LOAD_MORE_LOADING"));*/
				this.localSkip += this.top;
				this.getValueHelpCollection(selectedItem);
			},

			continueSearchOnServer: function(selectedItem) {
				/*this.continueSearchItem
        && this.continueSearchItem
          .setTitle(this.oBundle
            .getText("CONTINUE_SEARCH_ON_SERVER_LOADING"));*/
				this.remoteSearchPhrase = this.searchPhrase;

				if (this.firstRemoteSearch) {
					this.firstRemoteSearch = false;
					this.continueSearchOnServerActive = true;
				} else {
					this.remoteSkip += this.top;
				}

				this.getValueHelpCollection(selectedItem);
				return this.remoteSearchPhrase; //NOTE Search Help Disappearing Issue
			},

			refineSearchResult: function() {
				this.typeBinding = this.typeListControl
					.getBinding("items");
				var filters = [];
				if (this.searchPhrase) {
					filters.push(new sap.ui.model.Filter(
						"fieldValueId", sap.ui.model.FilterOperator.Contains, this.searchPhrase));
					filters.push(new sap.ui.model.Filter(
						"fieldValueId", sap.ui.model.FilterOperator.Contains, this.noneText));
				}
				this.typeBinding.filter(filters);
			},
			onLiveFavChange: function(evt) {
				//removing the titles
				//   var oEvent = evt;
				//             var source = oEvent.getSource();
				//             for (var i = 0; i < source.getItems().length; i++) {
				//             	if (source.getItems()[i].getTitle() === this.oBundle.getText("FAVORITE") ||
				//             		source.getItems()[i].getTitle() === this.oBundle.getText("WORKLIST") ||
				//             		source.getItems()[i].getTitle() === this.oBundle.getText("NO_WORKLIST") ||
				//             		source.getItems()[i].getTitle() === this.oBundle.getText("NO_FAVORITE")
				//             	) {
				//             		this.favDialogHeaders.push(source.removeItem(i));
				//             	}
				//             }
				//             var sValue = oEvent.getParameter("value");
				//             var oFilters = [];
				//             oFilters.push(new sap.ui.model.Filter("name",
				//             		sap.ui.model.FilterOperator.Contains, sValue));
				//             /*if (sValue) {
				//             	oFilters.push(new sap.ui.model.Filter("name",
				//             		sap.ui.model.FilterOperator.Contains, sValue));
				//             } else {
				//             	this.bindFavDialog(this.favoriteDialog);
				//             }*/
				//             if(!sValue){
				//                 try{
				//                     this.favoriteDialog.insertItem(this.favDialogHeaders[0], 0);
				//                     this.favoriteDialog.insertItem(this.favDialogHeaders[1], (this.favDialogHeaders[0].getCount() + 1));
				//                 }
				//                 catch(o){
				//                     jQuery.sap.log.warning("Could not add title", ["onLiveFavChange"], ["hcm.mytimesheet"]);
				//                 }
				//             }
				//             source.getBinding("items").filter(oFilters);

				var sFilterPattern = evt.getParameter("value");
				sFilterPattern = sFilterPattern.toLowerCase();
				var aListItems = evt.getSource().getItems();
				var bVisibility;
				var oGroupItem = null;
				var iCountInGroup = 0;
				// var somethingExist = false;
				for (var i = 0; i < aListItems.length; i++) {
					if (aListItems[i] instanceof sap.m.GroupHeaderListItem) {
						if (oGroupItem) {
							// if (iCountInGroup == 0) {
							//     oGroupItem.setVisible(false);
							// } else {
							// oGroupItem.setVisible(true);
							oGroupItem.setCount(iCountInGroup);
							//}
						}
						oGroupItem = aListItems[i];
						iCountInGroup = 0;
					} else {
						bVisibility = this.applySearchPatternToListItem(aListItems[i], sFilterPattern);
						aListItems[i].setVisible(bVisibility);
						if (bVisibility) {
							iCountInGroup++;
							// somethingExist = true;
						}
					}
				}
				if (oGroupItem) {
					// if (iCountInGroup == 0) {
					//     oGroupItem.setVisible(false);
					// } else {
					// oGroupItem.setVisible(true);
					if (oGroupItem.getTitle() !== this.oBundle.getText("NO_WORKLIST") || oGroupItem.getTitle() !== this.oBundle.getText("NO_WORKLIST")) {
						oGroupItem.setCount(iCountInGroup);
					}

					//}
				}

			},

			applySearchPatternToListItem: function(oItem, sFilterPattern) {
				if (sFilterPattern === "") {
					return true;
				}

				// if nothing found in unformatted data, check UI elements
				if ((oItem.getTitle() && oItem.getTitle().toLowerCase().indexOf(sFilterPattern) !== -1) ||
					(oItem.getDescription() && oItem.getDescription().toLowerCase().indexOf(sFilterPattern) !== -1) ||
					(oItem.getInfo() && oItem.getInfo().toLowerCase().indexOf(sFilterPattern) !== -1)) {
					return true;
				}
				return false;
			},

			onLiveChange: function(oEvent) {

				var sValue = oEvent.getParameter("value");
				var oFilters = [];
				oFilters.push(new sap.ui.model.Filter("fieldValueId",
					sap.ui.model.FilterOperator.Contains, sValue));
				/*oEvent.getSource().getBinding("items").filter(oFilters);
      if (oEvent.getSource().getBinding("items").filter(
        oFilters).getLength() < 1) {
       oEvent.getSource().setNoDataText();
      }*/

				this.searchPhrase = oEvent.getParameter("value");
				this.searchField = oEvent.getSource();
				if (this.searchPhrase) {
					//if (!this.continueSearchOnServerActive) {
					this.refineSearchResult(); //refreshes the filter->adds NONE text and the current search string
					//}
					if (this.searchPhrase !== this.remoteSearchPhrase) {
						this.resetRemoteSearch();
					}
					this.remoteSearchPhrase = this.searchPhrase;
					this.checkRemotePaging(this.remoteResultsLength);
				} else {
					// User has deleted all search phrase, revert to
					// local model
					this.refineSearchResult();
					this.remoteSearchPhrase = "";
					if (this.oApplication.getModel("createScrenModel")) {
						this.oApplication.getModel("createScrenModel").setProperty("typeList",
							this.localTypeList);
					}
					this.remoteSearchActive = false;
					this.checkLocalPaging(this.localResultsLength);
					this.resetRemoteSearch();
				}
			},

			resetRemoteSearch: function() {
				this.firstRemoteSearch = true;
				this.remoteSkip = 0;
				this.remoteTypeList = [];
				this.continueSearchOnServerActive = false;
				this.remoteSearchPhrase = "";
				this.remoteSearchActive = false;
			},

			clearSearchField: function() {
				if ("searchField" in this) {
					this.searchField.setValue("");
					this.typeBinding.filter([]);
				}
			},

			bindFavDialog: function(oSelectDialog1) {
				var combinedList, self = this;
				var oModel = self.oApplication.getModel("createScreenModel");

				var worklistHeader = new sap.m.GroupHeaderListItem({
					title: self.oBundle.getText("WORKLIST"),
					upperCase: false,
					count: oModel.getProperty("/projects").length
				});
				var noWorklistHeader = new sap.m.GroupHeaderListItem({
					title: self.oBundle.getText("NO_WORKLIST"),
					upperCase: false
				});

				if (this.FavoriteAvailable) {
					var favHeader = new sap.m.GroupHeaderListItem({
						title: self.oBundle.getText("FAVORITE"),
						upperCase: false,
						count: oModel.getProperty("/favorites").length
					});
					var noFavHeader = new sap.m.GroupHeaderListItem({
						title: self.oBundle.getText("NO_FAVORITE"),
						upperCase: false
					});
					combinedList = oModel.getProperty("/favorites").concat(oModel.getProperty("/projects"));

				} else {
					combinedList = oModel.getProperty("/projects");

				}
				oModel.setProperty("/combinedFavList", combinedList);

				var itemTemplate = new sap.m.StandardListItem({
					title: "{name}",
					description: "{subText}",
					info: "{info}",
					customData: [{
						key: "items",
						value: "{childs}"
     }, {
						key: "type",
						value: "{type}"
     }, {
						key: "id",
						value: "{id}"
     }, {
						key: "fieldId",
						value: "{fieldName}"
     }, {
						key: "fieldValue",
						value: "{fieldValue}"
     }]
				});

				// set model & bind Aggregation
				oSelectDialog1.setModel(self.oApplication.getModel("createScreenModel"));
				oSelectDialog1.bindAggregation("items", "/combinedFavList", itemTemplate);
				this.favoriteDialog = oSelectDialog1;
				if (this.FavoriteAvailable) {
					if (oModel.getProperty("/favorites").length === 0) {
						oSelectDialog1.insertItem(noFavHeader, 0);
					} else {
						oSelectDialog1.insertItem(favHeader, 0);
					}
					if (oModel.getProperty("/projects").length === 0) {
						oSelectDialog1.insertItem(noWorklistHeader, oModel.getProperty("/favorites").length + 1);
					} else {
						oSelectDialog1.insertItem(worklistHeader, oModel.getProperty("/favorites").length + 1);
					}

				} else {
					if (oModel.getProperty("/projects").length === 0) {
						oSelectDialog1.insertItem(noWorklistHeader, 0);
					} else {
						oSelectDialog1.insertItem(worklistHeader, 0);
					}

				}
			},

			onFavoriteInputHelp: function(oEvent) {
				var self = this,
					DialogHeader;
				this.favDialogHeaders = [];
				if (this.FavoriteAvailable) {
					DialogHeader = this.oBundle.getText("SELECT_FAVORITE");
				} else {
					DialogHeader = this.oBundle.getText("SELECT_WORKLIST");
				}
				var oSelectDialog1 = new sap.m.SelectDialog({
					title: DialogHeader,
					liveChange: [this.onLiveFavChange, this]

				});

				this.bindFavDialog(oSelectDialog1);
				oSelectDialog1.open();

				var input = arguments[0].getSource(),
					type, items, id;
				self = this;
				//Handling on item click event
				oSelectDialog1
					.attachConfirm(function(evt) {

						var selectedItem = evt.getParameter("selectedItem");
						if (selectedItem.data().type) {
							self.favoriteSelected = true;
							self.worklistItemSelected = false;
							type = selectedItem.data().type;
							items = selectedItem.data().items;
							id = selectedItem.data().id;
							var startTime = 0,
								time = 0,
								endTime = 0,
								i, j, typesArray;

							//Set Time Assignment
							//if (selectedItem.getDescription()) {
							if (selectedItem) {
								input.setValue(selectedItem.getTitle());
							}
							//setting the Time if applicable
							if (type === "F") {
								//getting the time if applicable
								for (var index = 0; index < self.favorites.length; index++) {
									if (self.favorites[index].id === id) {
										if (!self.isClockEntry()) {
											time = self.favorites[index].FavoriteDataFields.CATSHOURS;
											time = parseFloat(time, 10).toFixed(2);
											self.byId("decimalTimeEntryValue").setValue(time);
										} else {
											startTime = self.favorites[index].FavoriteDataFields.BEGUZ;
											endTime = self.favorites[index].FavoriteDataFields.ENDUZ;
											if (startTime !== endTime) { //Note: 2141131 clock time duration field
												var timeParser = sap.ca.ui.model.format.DateFormat.getTimeInstance({
													pattern: "HHmm"
												});
												var timeFormatter = sap.ca.ui.model.format.DateFormat.getTimeInstance({
													style: "short"
												});
												startTime = timeParser.parse(startTime);
												startTime = timeFormatter.format(startTime);
												endTime = timeParser.parse(endTime);
												endTime = timeFormatter.format(endTime);
												self.byId("startTime").setValue(self.favorites[index].FavoriteDataFields.BEGUZ);
												self.byId("endTime").setValue(self.favorites[index].FavoriteDataFields.ENDUZ);
												self.byId("ClkTimeDecimalTimeEntryValue").setEnabled(false); //Note: Begin 2141131 clock time duration field
											} else {
												time = self.favorites[index].FavoriteDataFields.CATSHOURS;
												time = parseFloat(time, 10).toFixed(2);
												self.byId("ClkTimeDecimalTimeEntryValue").setValue(time);
											} //Note: End 2141131 clock time duration field
										}
									}
								}
							} else {
								self.byId("decimalTimeEntryValue").setValue("");
								self.byId("startTime").setValue(""); //Note: Begin 2141131 clock time duration field
								self.byId("endTime").setValue("");
								self.byId("ClkTimeDecimalTimeEntryValue").setValue(""); //Note: End 2141131 clock time duration field
							}
							//setting the accounting infos
							typesArray = self.oApplication.getModel("accountingInfoModel").getData().types;
							//setting the accounting infos as initial 
							for (i = 0; i < typesArray.length; i++) {
								typesArray[i].value = "";
							}
							//Set the name
							// typesArray[0].value = selectedItem.getTitle();
							for (j = 0; j < items.length; j++) {
								for (i = 0; i < typesArray.length; i++) {

									if (typesArray[i].fieldName === items[j].name) {
										typesArray[i].value = items[j].value;
										typesArray[i].valueStateText = items[j].value;
										break;
									}
								}
							}

							self.byId("accountingInfoPanel").setExpanded(true);
							self.getView().getModel().setProperty("/types", typesArray);
							self.oApplication.getModel("accountingInfoModel").setProperty("/types", typesArray);
							self.validateSaveBtnVisibility(evt);
						} else {
							self.worklistItemSelected = true;
							self.favoriteSelected = false;
							input.setValue(selectedItem.getTitle());
							items = selectedItem.data().items;
							var fieldId = selectedItem.data().fieldId,
								fieldValue = selectedItem.data().fieldValue;
							typesArray = self.oApplication.getModel("accountingInfoModel").getData().types;
							//setting the accounting infos as initial 
							for (i = 0; i < typesArray.length; i++) {
								typesArray[i].value = "";
							}
							if (!self.worklistSelectedObj) {
								self.worklistSelectedObj = {};
							}
							if (self.checkFieldName(fieldId)) {
								self.worklistSelectedObj[fieldId] = fieldValue;
							}
							for (j = 0; j < items.length; j++) {
								if (self.checkFieldName(items[j].fieldName)) {
									self.worklistSelectedObj[items[j].fieldName] = items[j].fieldValue;
								}
								for (i = 0; i < typesArray.length; i++) {
									/*if (items[j].fieldName === "LTXA1") {
										self.byId("S31TextArea").setValue(items[j].name);
									}*/
									var txt = selectedItem.getTitle() + " " + "(" + fieldValue + ")";
									if (typesArray[i].fieldName === fieldId && typesArray[i].value !== txt) {
										typesArray[i].value = txt;
										typesArray[i].valueStateText = fieldValue;
									}
									if (typesArray[i].fieldName === items[j].fieldName) {
										typesArray[i].value = items[j].fieldValue;
										typesArray[i].valueStateText = items[j].name;
										break;
									}
								}
							}

							self.byId("accountingInfoPanel").setExpanded(true);
							self.getView().getModel().setProperty("/types", typesArray);
							self.oApplication.getModel("accountingInfoModel").setProperty("/types", typesArray);
							self.validateSaveBtnVisibility(evt);
						}

						oSelectDialog1.destroy();
						oSelectDialog1 = null;
					});

			},
			//listOfManualItems : {},
			onInputHelp: function() {
				var self = this;
				var selectedLItem = {};

				selectedLItem.name = arguments[0].getSource()
					.getValueStateText();
				selectedLItem.fieldName = arguments[0].getSource()
					.getName();

				var SelectTile = arguments[0].getSource().getParent()
					.getLabel().getText();

				var oSelectDialog1 = new sap.m.SelectDialog({
					title: SelectTile,
					/*noDataText : this.oBundle
         .getText('TAP_TO_LOAD_MORE_LOADING'),*/
					search: [this.onLiveChange, this],
					liveChange: [this.onLiveChange, this]
				});

				var itemTemplate = new sap.m.StandardListItem({
					title: "{fieldValue}",
					description: "{fieldId}",
					active: true
				});

				//self.listOfManualItems[selectedLItem.fieldName] = oSelectDialog1;
				self.typeListControl = oSelectDialog1;
				self.getValueHelpCollection(selectedLItem);

				// set model & bind Aggregation
				oSelectDialog1.setModel(self.oApplication.getModel("createScreenModel"));
				if (selectedLItem.fieldName.indexOf("/") >= 0) {
					selectedLItem.fieldName = selectedLItem.fieldName.split("/").join("-");
				}
				oSelectDialog1.bindAggregation("items", "/" +
					selectedLItem.fieldName, itemTemplate);

				oSelectDialog1.open();

				var input = arguments[0].getSource();

				// attach close listener
				oSelectDialog1
					.attachConfirm(function(evt) {
						var selectedItemEvent = evt
							.getParameter("selectedItem");
						if (selectedItemEvent) {
							self.selectedIndex = evt
								.getParameter("selectedItem")
								.getParent()
								.indexOfItem(evt.getParameter("selectedItem"));

							// when clciked on load more

							if (selectedItemEvent.getTitle() === self.oBundle
								.getText("TAP_TO_LOAD_MORE")) {
								self.tapToLoadMore(selectedLItem);
								oSelectDialog1.open();
								return;
							} else if (selectedItemEvent.getTitle() === self.oBundle
								.getText("CONTINUE_SEARCH_ON_SERVER")) {
								var searchtxt = self.continueSearchOnServer(selectedLItem);
								oSelectDialog1.open(searchtxt);
								return;
							} else if (selectedItemEvent.getTitle() === "(None)") {
								input.setValue("");
								input.setValueStateText("");
							} else {
								input.setValue(selectedItemEvent
									.getTitle() +
									" " +
									selectedItemEvent
									.getDescription());
								input
									.setValueStateText(selectedItemEvent
										.getDescription()
										.replace('(', "")
										.replace(")", ""));
							}
							self.validateSaveBtnVisibility(evt);

						}
						oSelectDialog1.destroy();

						oSelectDialog1 = null;
						self.localTypeList = [];
						self.remoteTypeList = [];
						self.resetRemoteSearch();
						self.top = self.RESULTS_TOP;
						self.remoteSkip = 0;
						self.localSkip = 0;
					});

				oSelectDialog1.attachCancel(function() {
					oSelectDialog1 = null;
					self.localTypeList = [];
					self.remoteTypeList = [];
					self.resetRemoteSearch();
					self.top = self.RESULTS_TOP;
					self.remoteSkip = 0;
					self.localSkip = 0;

				});

			},
			getFavoritesCollection: function() {
				var self = this;
				var FavDataFields, infos;
				if (this.FavoriteAvailable) {
					this.oService
						.getFavorites(
							this,
							this.oApplication.pernr,
							function(data) {

								var favCounter = 0;
								self.favorites = [];

								for (var i = 0; i < data.length; i++) {
									if (data[i].ObjType === "FW") {
										self.favorites[favCounter] = {
											name: data[i].Name,
											type: data[i].ObjType,
											id: data[i].ID,
											FavoriteDataFields: data[i].FavoriteDataFields,
											childs: [],
											info: "",
											active: true,
											subText: data[i].Field_Text
										};
									} else {
										if (parseFloat(data[i].FavoriteDataFields.CATSHOURS)) {
											infos = self.oBundle.getText("TOTAL_RECORDED_HOURS", [data[i].FavoriteDataFields.CATSHOURS]);
											if (infos.indexOf("Target:") >= 0) {
												infos = data[i].FavoriteDataFields.CATSHOURS + " h";
											}
										} else {
											var begda = data[i].FavoriteDataFields.BEGUZ,
												endda = data[i].FavoriteDataFields.ENDUZ;
											var timeParser = sap.ca.ui.model.format.DateFormat.getTimeInstance({
												pattern: "HHmm"
											});
											var timeFormatter = sap.ca.ui.model.format.DateFormat.getTimeInstance({
												style: "short"
											});
											begda = timeParser.parse(begda);
											begda = timeFormatter.format(begda);
											endda = timeParser.parse(endda);
											endda = timeFormatter.format(endda);
											infos = self.oBundle.getText("WEEK_DATE_RANGE", [begda, endda]);
											//   this.byId("startTime").setValue(begda);
											//   this.byId("endTime").setValue(endda);
										}
										self.favorites[favCounter] = {
											name: data[i].Name,
											type: data[i].ObjType,
											id: data[i].ID,
											FavoriteDataFields: data[i].FavoriteDataFields,
											childs: [],
											info: infos,
											active: true,
											subText: data[i].Field_Text
										};
									}
									favCounter++;

								}
								for (i = 0; i < favCounter; i++) {
									FavDataFields = self.favorites[i].FavoriteDataFields;
									for (var prop in FavDataFields) {
										if (prop !== "CATSHOURS" && prop !== "PERNR" && prop !== "BEGUZ" && prop !== "ENDUZ") {
											if (FavDataFields[prop] !== "" && typeof(FavDataFields[prop]) !== "undefined" && parseInt(FavDataFields[prop], 10) !== 0) {
												self.favorites[i].childs
													.push({
														name: prop,
														value: FavDataFields[prop]
													});
											}
										}
									}
								}
								self.oApplication.getModel("createScreenModel").setProperty(
									"/favorites", self.favorites);

								if (self.oApplication.getModel("createScreenModel").getProperty("/projects")) {
									if (self.oApplication.getModel("createScreenModel").getProperty("/favorites").length === 0 &&
										self.oApplication.getModel("createScreenModel").getProperty("/projects").length === 0) {
										self.byId("accountingInfoPanel").setExpanded(true);
										self.byId("timeAssignmentLbl").setVisible(false);
										self.byId("timeAssignment").setVisible(false);
									}
								}

							});
				}

			},

			// method added for f4 help
			getWorkListCollection: function() {

				this.workList = [];
				this.workListType = [];
				var self = this;

				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				this.searchField_begDa = (oModel.getProperty("/weekStart"));
				this.searchField_endDa = (oModel.getProperty("/weekEnd"));

				this.oService
					.getWorkListCollection(
						this,
						this.oApplication.pernr,
						this.searchField_begDa,
						this.searchField_endDa,
						function(data) {
							// Create new worklist items for
							// every item
							// with
							// Level 0
							var workListCounter = 0;
							for (var i = 0; i < data.length; i++) {
								if (data[i].Level === 0) {
									self.workList[workListCounter] = {
										name: data[i].FieldValueText,
										childs: [],
										fieldName: data[i].FieldName,
										fieldValue: data[i].FieldValue,
										recordNumber: data[i].RecordNumber
									};
									workListCounter++;
								}
							}

							// Add other items with non Level 0
							// FieldText
							// into the
							// previously created Level 0 item.
							for (i = 0; i < data.length; i++) {
								if (data[i].Level !== 0) {
									for (var j = 0; j < self.workList.length; j++) {
										if (self.workList[j].recordNumber === data[i].RecordNumber) {
											self.workList[j].childs
												.push({
													name: data[i].FieldValueText,
													fieldName: data[i].FieldName,
													fieldValue: data[i].FieldValue
												});
										}
									}
								}
							}

							// Populate the HTML view model with
							// the
							// data
							var projects = [];
							for (i = 0; i < self.workList.length; i++) {
								var currentChildItems = [];
								var currentChildNames = [];
								var currentChildCodes = [];
								for (j = 0; j < self.workList[i].childs.length; j++) {
									currentChildItems
										.push(self.workList[i].childs[j].name);
									currentChildNames
										.push(self.workList[i].childs[j].fieldName);
									currentChildCodes
										.push(self.workList[i].childs[j].fieldValue);
								}
								projects
									.push({
										name: self.workList[i].name,
										subText: currentChildItems
											.join(", "),
										type: false,
										childs: self.workList[i].childs,
										fieldName: self.workList[i].fieldName,
										fieldValue: self.workList[i].fieldValue,
										fieldValueId: self.workList[i].name +
											currentChildItems
											.join(", ")
									});

							}
							self.workList = projects;

							self.oApplication.getModel("createScreenModel").setProperty(
								"/projects", self.workList);
							if (self.FavoriteAvailable) {
								if (self.oApplication.getModel("createScreenModel").getProperty("/favorites")) {
									if (self.oApplication.getModel("createScreenModel").getProperty("/favorites").length === 0 &&
										self.oApplication.getModel("createScreenModel").getProperty("/projects").length === 0) {
										self.byId("accountingInfoPanel").setExpanded(true);
										self.byId("timeAssignmentLbl").setVisible(false);
										self.byId("timeAssignment").setVisible(false);
									} else {
										self.byId("timeAssignmentLbl").setVisible(true);
										self.byId("timeAssignment").setVisible(true);
									}
								}
							} else {
								if (self.oApplication.getModel("createScreenModel").getProperty("/projects").length === 0) {
									self.byId("accountingInfoPanel").setExpanded(true);
									self.byId("timeAssignmentLbl").setVisible(false);
									self.byId("timeAssignment").setVisible(false);

								} else {
									self.byId("timeAssignmentLbl").setVisible(true);
									self.byId("timeAssignment").setVisible(true);
								}
							}
						});
			},

			valueHelpDataForamtter: function(fieldName, fieldValue) {
				if (fieldName) {
					return fieldName + " (" + fieldValue + ")";

				}
			},

			durationDateForamtter: function(h, m) {
				return h + ":" + m;
			},

			getProfileFields: function() {
				this.profileFields = [];
				var self = this;
				var accountingInfoModel = new sap.ui.model.json.JSONModel();
				this.oApplication.setModel(accountingInfoModel, "accountingInfoModel");

				this.oService
					.getProfileFields(
						this,
						this.oApplication.pernr,
						function(data) {

							var editdatafroms3 = {},
								i;

							var editentrySelected = self.oApplication
								.getModel("S31modelexch")
								.getData().editentryview;
							var copyEntrySelected = self.oApplication
								.getModel("S31modelexch")
								.getData().copySelected;
							if (editentrySelected || copyEntrySelected) {
								editdatafroms3 = self.oApplication.getModel("S31modelexch")
									.getData().editeddata;
								self.validateSaveBtnVisibility();
							}
							/*if(self.FavoriteAvailable){
           self.profileFields[0] = {
               name : self.oBundle.getText("FAVORITE_NAME"),
               selectedName : self.oBundle.getText("FAVORITE_NAME"),
               fieldName : self.oBundle.getText("FAVORITE_NAME"),
               listType : "Active",
               labelVisible : true,
               typeVisible : true,
               fieldValue : "",
               value : "",
               valueStateText : "",
               ReadOnly : true,
               valueHelp: false,
               editButton: true
              };
           }*/

							for (i = 0; i < data.length; i++) {
								var name = data[i].FieldText;
								var fieldName = data[i].FieldName;
								var selectedName = self.NON_BREAKING_SPACE;
								var fieldValue = "";
								var readOnly = data[i].ReadOnly;
								if (self.editCostAssignment) {
									if (self.selectedMainName === fieldName) {
										fieldValue = self.selectedMainCode;
										selectedName = self.selectedMainItem;
									} else {
										if ("selectedChildItems" in self) {
											for (var j = 0; j < self.selectedChildNames.length; j++) {
												if (self.selectedChildNames[j] === fieldName) {
													fieldValue = self.selectedChildCodes[j];
													selectedName = self.selectedChildItems[j];
												}
											}
										}
									}
								}

								var valurforEntry = "";
								var valurforStateText = "";
								if (editdatafroms3 &&
									editdatafroms3.entry) {
									if (editdatafroms3.entry.childItems) {
										var code = editdatafroms3.entry.childCodes[editdatafroms3.entry.childNames
											.indexOf(fieldName)];
										var item = editdatafroms3.entry.childItems[editdatafroms3.entry.childNames
											.indexOf(fieldName)];
										if (code && fieldName !== "LTXA1") {
											valurforEntry = item +
												" (" +
												code +
												")";
										}
										else{
											valurforEntry = item;
										}
										if (item) {
											valurforStateText = code;
										}

										if (!valurforEntry) {
											if (fieldName === editdatafroms3.entry.mainName) {
												valurforEntry = editdatafroms3.entry.mainItem +
													" (" +
													editdatafroms3.entry.mainCode +
													")";
												valurforStateText = editdatafroms3.entry.mainCode;
											}
										}

									} else {

										if (fieldName === editdatafroms3.entry.mainName) {
											valurforEntry = editdatafroms3.entry.mainItem +
												" (" +
												editdatafroms3.entry.mainCode +
												")";
											valurforStateText = editdatafroms3.entry.mainCode;
										}
									}
								}

								var showValueHelp = true;
								if(fieldName === "LTXA1"){
									showValueHelp = false;
								}
								if(typeof valurforEntry === "undefined"){
									valurforEntry = "";
								}
								if(typeof valurforStateText === "undefined"){
									valurforStateText = "";
								}
								self.profileFields
									.push({
										name: name,
										selectedName: selectedName,
										fieldName: fieldName,
										listType: "Active",
										labelVisible: true,
										typeVisible: true,
										fieldValue: fieldValue,
										value: valurforEntry,
										valueStateText: valurforStateText,
										ReadOnly: readOnly.toLowerCase() === "true" ? false : true,
										valueHelp: showValueHelp
									});

								//marking CPR fields as display only
								if (!self.checkDisplayFieldNames(fieldName)) {
									self.profileFields[i].ReadOnly = false;
								}

							}
							accountingInfoModel.setProperty("/types", self.profileFields);
							self.oApplication.setModel(accountingInfoModel, "accountingInfoModel");
							self.oApplication.getModel("createScreenModel").setProperty("/types", self.profileFields);
							self.getView().setModel(accountingInfoModel, "accountingInfoModel");
							self.validateSaveBtnVisibility();

						});

			},

			checkDisplayFieldNames: function(fieldName) {
				var arr = ["DISPTEXT", "CPR_"]; //, "LTXA1"];
				/* The possible fields
    "CPR_OBJTEXT", "CPR_OBJGEXTID", "CPR_TEXT", "CPR_EXTID"];*/
				for (var i = 0; i < arr.length; i++) {
					if (fieldName.match(arr[i])) {
						return false;
					}
				}
				return true;
			},

			onDone: function() {
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

			onSubmit: function() {
				// clean in-line error message for the entry
				this.entry.showError = false;
				this.entry.error = "";
				this.entry.rejectionReason = "";

				// return original data with the new/edited entry
				this.updatePageData();

			},

			updatePageData: function() {
				// Prepare entry
				var calendarRef = this.byId("weeklyCalendar");
				var selectedDates = calendarRef.getSelectedDates();
				//   var oModel = this.oApplication.getModel("TSM_WEEKLY");
				this.entry.selectedDate = selectedDates;
				if (!this.isClockEntry() || this.clkTimeDurationFilled) { //Note:Begin 2141131 clock time duration field
					var lvDuration;
					if (!this.clkTimeDurationFilled) {
						lvDuration = this.byId("decimalTimeEntryValue").getValue();
					} else {
						lvDuration = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
					} //Note:End 2141131 clock time duration field
					if (lvDuration.indexOf(",") > 0) {
						lvDuration = lvDuration.replace(",", ".");
					}
					this.entry.time = lvDuration;
				} else {

					var startTime = this.byId("startTime").getDateValue(),
						endTime = this.byId("endTime").getDateValue();

					this.entry.startTime = this
						.convertTime(startTime);
					this.entry.endTime = this.convertTime(endTime);

					var durationInMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);

					this.entry.hours = parseInt(
						(durationInMinutes / 60), 10);
					this.entry.minutes = durationInMinutes % 60;

					this.entry.time = "0.0";
				}

				this.entry.hasNotes = (this.entry.notes && this.entry.notes.length > 0) ? true : false;

				this.submitToOdata();

			},
			convertTime: function(date) {
				var timeFormat = sap.ui.core.format.DateFormat
					.getTimeInstance({
						pattern: "HHmmss"
					});
				return timeFormat.format(date);
			},

			formatAMPM: function(date) {
				var hours = date.getHours();
				var minutes = date.getMinutes();
				var ampm = hours >= 12 ? 'PM' : 'AM';
				hours = hours % 12;
				hours = hours ? hours : 12; // the hour '0' should be '12'
				minutes = minutes < 10 ? '0' + minutes : minutes;
				var strTime = hours + ':' + minutes + ' ' + ampm;
				return strTime;
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

			openConfirmationPopup: function(oSettings, successHandler) {
				var self = this;
				var oElements = [];
				for (var i = 0; i < oSettings.additionalInformation.length; i++) {
					oElements.push(new sap.m.Label({
						text: oSettings.additionalInformation[i].label,
						design: "Bold"
					}));
					oElements.push(new sap.m.Text({
						text: oSettings.additionalInformation[i].text
					}));
				}
				var oForm = new sap.ui.layout.form.SimpleForm({
					minWidth: 1024,
					editable: false,
					maxContainerCols: 2,
					layout: "ResponsiveGridLayout",
					labelSpanL: 7,
					labelSpanM: 7,
					labelSpanS: 7,
					emptySpanL: 1,
					emptySpanM: 1,
					emptySpanS: 1,
					columnsL: 1,
					columnsM: 1,
					columnsS: 1,
					content: oElements
				});
				var oConfirmDialog = new sap.m.Dialog({
					title: oSettings.title,
					content: [oForm],
					beginButton: new sap.m.Button({
						text: oSettings.confirmButtonLabel,
						press: function() {
							successHandler();
							oConfirmDialog.close();
						}
					}),
					endButton: new sap.m.Button({
						text: this.oBundle.getText("CANCEL"),
						press: function() {
							oConfirmDialog.close();
						}
					})
				});
				oConfirmDialog.addStyleClass("sapUiContentPadding sapUiMediumMarginTopBottom");
				oConfirmDialog.open();
			},

			replaceAllOccurances: function(iString) {
				if (typeof iString === "undefined") {
					return;
				}
				var vSearch = '/';
				var vReplace = '-';
				while (iString.indexOf(vSearch) > -1) {
					iString = iString.replace(vSearch, vReplace);
				}
				return iString;
			},
			replaceSpecialChar: function(entry) {
				if (typeof entry.mainName !== "undefined") {
					entry.mainName = this.replaceAllOccurances(entry.mainName);
				}
				if (typeof entry.subItems !== "undefined") {
					entry.subItems = this.replaceAllOccurances(entry.subItems);
				}
				if (typeof entry.childNames !== "undefined") {
					for (var i = 0; i < entry.childNames.length; i++) {
						entry.childNames[i] = this.replaceAllOccurances(entry.childNames[i]);
					}
				}

				return entry;
			},

			getPostData: function(day, entry) {
				var post = {};
				post.day = day;
				post.entry = entry;
				return post;
			},

			setPostObject: function(Counter, TimeEntryOperation,
				WORKDATE, CATSAMOUNT, Name, Code, notes, startTime,
				endTime, subItems, childCodes, childNames) {
				var timeEntryUpdated = {
					Pernr: this.oApplication.pernr,
					Counter: Counter,
					TimeEntryOperation: TimeEntryOperation,
					TimeEntryDataFields: {
						WORKDATE: WORKDATE,
						CATSAMOUNT: "" + CATSAMOUNT
					}

				};
				if (this.isClockEntry()) {
					timeEntryUpdated.TimeEntryDataFields.BEGUZ = startTime;
					timeEntryUpdated.TimeEntryDataFields.ENDUZ = endTime;
				}

				// always send as blank
				timeEntryUpdated.TimeEntryRelease = " ";

				/*
				 * if(this.releaseAllowed){
				 * timeEntryUpdated.TimeEntryRelease = " "; }else{
				 * timeEntryUpdated.TimeEntryRelease = "X"; }
				 */
				if (Name) {
					if (Name.indexOf("-") >= 0) {
						Name = Name.split("-").join("/");
					}

					if (this.checkFieldName(Name) === true) {
						timeEntryUpdated.TimeEntryDataFields[Name] = Code;
					}
				}
				if (subItems && subItems !== "") {
					for (var i = 0; i < childNames.length; i++) {
						if (childNames[i].indexOf("-") >= 0) {
							childNames[i] = childNames[i].split("-").join("/");
						}
						if (this.checkFieldName(childNames[i]) === true) {
							timeEntryUpdated.TimeEntryDataFields[childNames[i]] = childCodes[i];
						}
					}
				}
				if (this.worklistItemSelected) {
					timeEntryUpdated.TimeEntryDataFields = this.addWorklistFields(timeEntryUpdated.TimeEntryDataFields);
				}
				if (notes && notes !== "") {
					timeEntryUpdated.TimeEntryDataFields.LONGTEXT_DATA = notes;
					timeEntryUpdated.TimeEntryDataFields.LONGTEXT = "X";

				}
				if(timeEntryUpdated.TimeEntryDataFields.hasOwnProperty("SPLIT")){
					timeEntryUpdated.TimeEntryDataFields.SPLIT = parseInt(timeEntryUpdated.TimeEntryDataFields.SPLIT,10);
				}
				/**
				 * @ControllerHook Modify the post object
				 * This hook method can be used to modify the object before the post call
				 * It is called when the decision options for the detail item are fetched successfully
				 * @callback hcm.mytimesheet.view.S31~extHookChangeObjectBeforePost
				 * @param {object} Post Object
				 * @return {object} Final Post Object
				 */

				if (this.extHookChangeObjectBeforePost) {
					timeEntryUpdated = this.extHookChangeObjectBeforePost(timeEntryUpdated);
				}

				return timeEntryUpdated;
			},

			checkFieldName: function(fieldName) {
				var checkString = fieldName;
				if (checkString.match("DISPTEXT")) {
					return false;
				}
				if (checkString.match("CPR_OBJTEXT")) {
					return false;
				}
				if (checkString.match("CPR_TEXT")) {
					return false;
				}
				return true;
			},

			addWorklistFields: function(obj) {
				for (var worklistField in this.worklistSelectedObj) {
					if (obj.hasOwnProperty(worklistField)) { // || obj[worklistField] === "LTXA1" ) {
						continue;
					} else {
						obj[worklistField] = this.worklistSelectedObj[worklistField];
					}
				}
				return obj;
			},

			parseDateYYYYMMdd: function(dateString) {
				var dateParse = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "YYYYMMdd"
				});
				return dateParse.parse(dateString);
			},

			onCancel: function() {
				var calendar = this.byId("weeklyCalendar");
				var selectedDate = calendar.getCurrentDate();
				var dateStr = selectedDate;
				selectedDate = dateStr + "offset" + calendar.getFirstDayOffset();
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setProperty("/currentDate", new Date(dateStr));
				this.oApplication.setModel(oModel, "S3exchangeModel");
				this.cleanUpOnBack();
				delete this.entry;
				//navigate to S3
				this.oRouter.navTo("S3", {
					context: selectedDate
				}, true);

			},

			onReset: function() {
				this.byId("timeAssignment").setValue("");
				this.byId("createPanel").setHeaderText(this.oBundle.getText("ENTRY_DETAILS"));
				this.byId("decimalTimeEntryValue").setValue("");
				this.byId("startTime").setValue("");
				this.byId("endTime").setValue("");
				this.byId("weeklyCalendar").setDisabledWeekDays([]);
				this.byId("weeklyCalendar").unselectAllDates();
				this.byId("S31TextArea").setValue("");
				this.byId("ClkTimeDecimalTimeEntryValue").setValue(""); //Note: Begin 2141131 clock time duration field
				this.byId("ClkTimeDecimalTimeEntryValue").setEnabled(true);
				this.setBtnEnabled("SUBMIT_BTN", false); //Note: End 2141131 clock time duration field
				delete this.worklistSelectedObj;
				this.worklistSelectedObj = {};
				this.worklistItemSelected = false;
				var types = this.oApplication.getModel("accountingInfoModel").getData().types;
				for (var i = 0; i < types.length; i++) {
					if (types[i].value !== "" || types[i].valueStateText !== "") {
						types[i].value = "";
						types[i].valueStateText = "";
					}
				}
				//Note: Begin 2141131 clock time duration field
				if (this.isClockEntry() && this.byId("ClkTimeDecimalTimeEntryValue").getVisible()) {
					this.entry.startTime = "000000";
					this.entry.endTime = "000000";
					this.entry.time = "";
				}
				//Note: End 2141131 clock time duration field
				// this.byId("accountingInfoPanel").setExpanded(false);
				this.getView().getModel().setProperty("/types", types);
				this.oApplication.getModel("accountingInfoModel").setProperty("/types", types);

			},

			openEditfavDialog: function() {
				if (!this.oApplication.getModel("createScreenModel").getProperty("/favorites")) {
					this.getFavoritesCollection();
				}
				var itemTemplate = new sap.ui.core.Item({
					text: "{name}",
					key: "{id}"
				});
				this.editFavForm = new sap.ui.layout.form.Form({
					maxContainerCols: 2,
					layout: new sap.ui.layout.form.ResponsiveGridLayout({
						labelSpanL: 4,
						emptySpanL: 3,
						labelSpanM: 4,
						emptySpanM: 2,
						columnsL: 1,
						columnsM: 1
					}),
					formContainers: new sap.ui.layout.form.FormContainer({
						formElements: [
                       new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									text: this.oBundle.getText("EXISTING_FAV_NAME")
								}),
								fields: new sap.m.Select().bindAggregation("items", "/favorites", itemTemplate)
							}),
                   new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									text: this.oBundle.getText("NEW_FAVORITE_NAME")
								}),
								fields: new sap.m.Input({
									liveChange: [this.validateEditFavSaveBtn, this],
									maxLength: 30
								})
							})
               ]
					})
				}).setModel(this.oApplication.getModel("createScreenModel"));

				this.editFavDialog = new sap.m.Dialog({
					title: this.oBundle.getText("EDIT_FAVORITE"),
					content: [
                            this.editFavForm
               ],
					beginButton: new sap.m.Button({
						text: this.oBundle.getText("SAVE"),
						enabled: false,
						press: [this.updateFavorites, this]
					}),
					endButton: new sap.m.Button({
						text: this.oBundle.getText("CANCEL"),
						press: jQuery.proxy(function() {
							this.editFavDialog.close();
						}, this)
					}),
					afterClose: jQuery.proxy(function() {
						this.editFavDialog.destroy();
					}, this)
				});
				this.editFavDialog.addStyleClass("sapUiContentPadding");
				this.editFavDialog.open();

			},
			validateEditFavSaveBtn: function(event) {
				var newFavName = event.getParameters("value");
				var oldFavName = this.editFavForm.getFormContainers()[0].getFormElements()[0].getFields()[0].getSelectedKey();
				if (!newFavName.value || oldFavName === "") {
					this.editFavDialog.getBeginButton().setEnabled(false);
				} else {
					this.editFavDialog.getBeginButton().setEnabled(true);
				}

			},
			openFavDialog: function() {

				var form = new sap.ui.layout.form.Form({
					maxContainerCols: 2,
					layout: new sap.ui.layout.form.ResponsiveGridLayout({
						labelSpanL: 4,
						emptySpanL: 3,
						labelSpanM: 4,
						emptySpanM: 2,
						columnsL: 1,
						columnsM: 1
					}),
					formContainers: new sap.ui.layout.form.FormContainer({
						formElements: [
                       new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									text: this.oBundle.getText("FAVORITE_NAME")
								}),
								fields: new sap.m.Input({
									liveChange: [this.validateSaveFavSaveBtn, this],
									maxLength: 30
								})
							}),
                   new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									// 	text: this.oBundle.getText("NEW_FAVORITE_NAME")
								}),
								fields: new sap.m.CheckBox({
									text: this.oBundle.getText("SAVE_FAVORITE_WITH_TIME")
								})
							})
               ]
					})
				});
				this.favDialog = new sap.m.Dialog({
					title: this.oBundle.getText("ADD_FAVORITE"),
					type: "Message",
					content: [form],
					beginButton: new sap.m.Button({
						text: this.oBundle.getText("SAVE"),
						enabled: false,
						press: jQuery.proxy(this.addFavorite, this)
					}),
					endButton: new sap.m.Button({
						text: this.oBundle.getText("CANCEL"),
						press: jQuery.proxy(function() {
							this.favDialog.close();
						}, this)
					}),
					afterClose: jQuery.proxy(function() {
						this.favDialog.destroy();
					}, this)
				});
				this.favDialog.addStyleClass("sapUiContentPadding");
				this.favDialog.open();
			},

			validateSaveFavSaveBtn: function(oEvent) {
				var favName = oEvent.getParameter("value");
				if (favName.trim() !== "") {
					this.favDialog.getBeginButton().setEnabled(true);
				} else {
					this.favDialog.getBeginButton().setEnabled(false);
				}
			},

			addFavorite: function() {
				var favObj, self = this;

				//validate entries
				// var name = this.byId("favName").getValue();
				var name = this.favDialog.getContent()[0].getFormContainers()[0].getFormElements()[0].getFields()[0].getValue();
				var withTime = this.favDialog.getContent()[0].getFormContainers()[0].getFormElements()[1].getFields()[0].getSelected();

				favObj = this.setFavoritePostObject(name);
				var toastMsg;
				if (name === "") {
					toastMsg = this.oBundle.getText("FAV_NAME_ERROR");
					sap.m.MessageToast.show(toastMsg);
				} else if (favObj === null) {
					toastMsg = this.oBundle.getText("FAV_DATA_ERROR");
					sap.m.MessageToast.show(toastMsg);
				} else {
					if (withTime) {
						var time = this.byId("decimalTimeEntryValue").getValue();
						var begda = this.byId("startTime").getValue(),
							endda = this.byId("endTime").getValue(); //Note: Begin 2141131 clock time duration field
						if (!this.isClockEntry() || this.clkTimeDurationFilled) {
							if (this.clkTimeDurationFilled) {
								time = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
							} //Note: End 2141131 clock time duration field
							if (time === "" || !this._isValidDecimalNumber(time)) {
								toastMsg = this.oBundle.getText("FAV_TIME_ERROR");
								sap.m.MessageToast.show(toastMsg);
								return;
							} else {
								favObj.FavoriteDataFields.CATSHOURS = time;
							}
						} else {
							if (begda === "" || endda === "" || begda === endda) {
								toastMsg = this.oBundle.getText("FAV_CLOCK_TIME_ERROR");
								sap.m.MessageToast.show(toastMsg);
								return;
							} else {
								favObj.FavoriteDataFields.BEGUZ = begda;
								favObj.FavoriteDataFields.ENDUZ = endda;
							}
						}
					}
					if (!this.oService) {
						this.oService = new hcm.mytimesheet.Service();
					}
					this.oService.createFavorite(this, favObj, function(oData) {
						var newFav = {
							name: oData.Name,
							type: oData.ObjType,
							id: oData.ID,
							FavoriteDataFields: oData.FavoriteDataFields,
							childs: [],
							info: "",
							subText: oData.Field_Text,
							active: true
						};
						var FavDataFields = newFav.FavoriteDataFields;
						var favorites = self.oApplication.getModel("createScreenModel").getProperty("/favorites");
						for (var prop in favObj.FavoriteDataFields) {
							if (prop !== "CATSHOURS" && prop !== "BEGUZ" && prop !== "ENDUZ") {
								FavDataFields[prop] = favObj.FavoriteDataFields[prop];
								newFav.childs
									.push({
										name: prop,
										value: FavDataFields[prop]
									});
							} else {
								if (self.isClockEntry() && !self.clkTimeDurationFilled) { //Note: 2141131 clock time duration field
									var timeParser = sap.ca.ui.model.format.DateFormat.getTimeInstance({
										pattern: "HHmm"
									});
									var timeFormatter = sap.ca.ui.model.format.DateFormat.getTimeInstance({
										style: "short"
									});
									begda = timeParser.parse(begda);
									begda = timeFormatter.format(begda);
									endda = timeParser.parse(endda);
									endda = timeFormatter.format(endda);
								}
								FavDataFields[prop] = favObj.FavoriteDataFields[prop];
								switch (prop) {
									case "CATSHOURS":
										newFav.info = self.oBundle.getText("TOTAL_RECORDED_HOURS", [favObj.FavoriteDataFields.CATSHOURS]);
										break;
									case "BEGUZ":
									case "ENDUZ":
										newFav.info = self.oBundle.getText("WEEK_DATE_RANGE", [begda, endda]);
								}
							}
						}
						if (!oData.Field_Text) {
							var childs = newFav.childs,
								subText = "";
							for (var j = 0; j < childs.length; j++) {
								subText += childs[j].name + ":" + childs[j].value + ",";
							}
							subText = subText.substring(0, subText.length - 1);
							newFav.subText = subText;
						}
						favorites.push(newFav);
						self.byId("timeAssignmentLbl").setVisible(true);
						self.byId("timeAssignment").setVisible(true);
						self.favDialog.close();
						self.oApplication.getModel("createScreenModel").refresh();
					});

				}
			},

			updateFavorites: function() {
				var favObj = {};
				var i;
				// var types = this.getView().getModel().getData().types;
				favObj.Name = this.editFavDialog.getContent()[0].getFormContainers()[0].getFormElements()[1].getFields()[0].getValue();
				var oldFavName = this.editFavDialog.getContent()[0].getFormContainers()[0].getFormElements()[0].getFields()[0].getSelectedItem().getText();
				var favorites = this.oApplication.getModel("createScreenModel").getProperty("/favorites");
				favObj.Pernr = this.oApplication.pernr;
				for (i = 0; i < favorites.length; i++) {
					if (oldFavName === favorites[i].name) {
						favObj.ID = favorites[i].id;
						favorites[i].name = favObj.Name; //Update the favorite name
						if (oldFavName === this.byId("timeAssignment").getValue()) {
							//update the fav name in the main view , if the fav name being changed in the edit fav dialog is the same as the one selected in the main view
							this.byId("timeAssignment").setValue(favObj.Name);
						}
						break;
					}
				}

				if (!this.oService) {
					this.oService = new hcm.mytimesheet.Service();
				}
				this.oService.updateFavorite(this, favObj, jQuery.proxy(function() {
					this.oApplication.getModel("createScreenModel").setProperty("/favorites", favorites);
					this.oApplication.getModel("createScreenModel").refresh();
					this.editFavDialog.close();
				}, this));
			},

			setFavoritePostObject: function(name) {
				var favObj, favName, favoriteDataFields, value;

				favObj = {};
				favoriteDataFields = {};

				//set the FavoriteDataFields
				var types = this.oApplication.getModel("accountingInfoModel").getData().types;
				//set the name
				// favName = this.byId("favName").getValue();
				favName = name;
				var flag = false;
				for (var i = 0; i < types.length; i++) {
					value = "";
					if (types[i].value !== "" && types[i].valueStateText !== "") {
						if (types[i].value !== "") {
							value = types[i].valueStateText;
							flag = true;
						}
						favoriteDataFields[types[i].fieldName] = value;
					}
				}
				if (flag) {
					//set the object
					favObj = {
						Pernr: this.oApplication.pernr,
						Name: favName,
						FavoriteDataFields: favoriteDataFields
					};
				} else {
					favObj = null;
				}
				return favObj;

			},
			handleDelete: function(evt) {
				var self = this;
				var selectedItem = evt.getParameter("listItem");
				var selectedId = selectedItem.getCustomData()[2].getValue();
				if (!this.oService) {
					this.oService = new hcm.mytimesheet.Service();
				}
				var favObj = {
					Name: evt.getParameter("listItem").getTitle(),
					ID: selectedId,
					Pernr: this.oApplication.pernr
				};

				this.oService.deleteFavorite(this, favObj, function() {
					evt.getSource().removeItem(selectedItem);
					self.favoriteDeletedIds.push(selectedId);

				});

			},

			editFavorites: function(oEvent) {
				var self = this;
				var manageBtn = new sap.m.Button({
					text: self.oBundle.getText("DELETE_FAVORITES"),
					press: function(oEvent) {
						self.manageFavorites(oEvent);
						self.oApplication.getModel("createScreenModel").refresh();
						self.actionSheet.close();
					}
				});
				var EditFavBtn = new sap.m.Button({
					text: self.oBundle.getText("EDIT_FAVORITE"),
					press: function(oEvent) {
						self.openEditfavDialog(oEvent);
						self.actionSheet.close();
					}
				});
				var saveAsFavBtn = new sap.m.Button({
					text: self.oBundle.getText("SAVE_AS_FAV"),
					press: function(oEvent) {
						self.openFavDialog();
						self.actionSheet.close();
					}
				});

				var oActionSheet = new sap.m.ActionSheet({

					placement: sap.m.PlacementType.Top,

					showCancelButton: true,

					buttons: [EditFavBtn, manageBtn, saveAsFavBtn]

				});
				oActionSheet.openBy(oEvent.getSource());
				this.actionSheet = oActionSheet;
			},

			//delete favorites
			manageFavorites: function() {

				var self = this;
				var beginBtn = new sap.m.Button({
					text: this.oBundle.getText("OK")
				});
				if (!this.oApplication.getModel("createScreenModel").getProperty("/favorites")) {
					this.getFavoritesCollection();
				}
				var itemTemplate = new sap.m.StandardListItem({
					title: "{name}",
					description: "{subText}",
					active: "true",
					info: "{info}",
					customData: [
           new sap.ui.core.CustomData({
							key: "items",
							value: "{childs}"
						}),
           new sap.ui.core.CustomData({
							key: "type",
							value: "{type}"
						}),
           new sap.ui.core.CustomData({
							key: "id",
							value: "{id}"
						})
           ]
				});
				this.favList = new sap.m.List({
					mode: "Delete"
				}).bindAggregation("items", "/favorites", itemTemplate);
				this.favList.attachDelete(function(evt) {
					self.handleDelete(evt);
				});

				var confirmDialog = new sap.m.Dialog({
					title: this.oBundle.getText("FAV_DIALOG_BOX"),
					content: [
                this.favList
                     ],
					beginButton: beginBtn,
					afterClose: jQuery.proxy(function() {
						confirmDialog.destroy();
					}, this)
				});
				confirmDialog.setModel(this.oApplication.getModel("createScreenModel"));
				beginBtn.attachPress(function() {
					if (self.favoriteDeletedIds.length) {
						var ids = [],
							idCounter = 0;
						var favorites = self.oApplication.getModel("createScreenModel").getProperty("/favorites");
						for (idCounter = 0; idCounter < self.favoriteDeletedIds.length; idCounter++) {
							for (var i = 0; i < favorites.length; i++) {
								if (self.favoriteDeletedIds[idCounter] === favorites[i].id) {
									ids.push(i);
									break;
								}
							}
						}
						ids.sort(function(a, b) {
							return b - a;
						});

						for (i = 0; i < ids.length; i++) {
							favorites.splice(ids[i], 1);
						}
						// self.oApplication.getModel("createScreenModel").setProperty("/favorites", favorites);
						self.favoriteDeletedIds = [];
					}
					confirmDialog.close();
				});
				confirmDialog.open();

			},

			isClockEntry: function() {
				return this.clockEntry;
			},

			resetMainAndChildItems: function() {
				if ("mainItem" in this.entry) {
					this.deleteMainItem();
				}
				if ("subItems" in this.entry) {
					this.deleteSubItems();
				}
			},

			deleteMainItem: function() {
				delete this.entry.mainItem;
				delete this.entry.mainName;
				delete this.entry.mainCode;
			},

			deleteSubItems: function() {
				delete this.entry.subItems;
				delete this.entry.childItems;
				delete this.entry.childNames;
				delete this.entry.childCodes;
			},

			initializeChildItems: function() {
				this.entry.childItems = [];
				this.entry.childNames = [];
				this.entry.childCodes = [];
			},
			getHderFooterOptions: function() {
				if (this.oApplication.pernr) {
					var cancelBtnText = this.oApplicationFacade.getResourceBundle().getText("CANCEL");
					var resetBtnText = this.oApplicationFacade.getResourceBundle().getText("RESET");
					var editFavoriteBtnTxt = this.oApplicationFacade.getResourceBundle().getText("FAVORITE");
					var s3Model = this.oApplication.getModel("S31modelexch");
					var submitButtonText;
					if (!this.oApplication.getModel("TSM_WEEKLY").getData().releaseAllowed) {
						submitButtonText = this.oApplicationFacade
							.getResourceBundle().getText("SAVE_DRAFT");
					} else {
						submitButtonText = this.oApplicationFacade
							.getResourceBundle().getText("SUBMIT");
					}
					var screenTitleText;
					if (!s3Model) {

						screenTitleText = this.oApplicationFacade
							.getResourceBundle().getText(
								"TIMESHEET_CREATE_ENTRY_TITLE");
					} else {
						if (s3Model.getProperty("/editentryview")) {
							screenTitleText = this.oApplicationFacade
								.getResourceBundle()
								.getText(
									"TIMESHEET_EDIT_ENTRY_TITLE_SCREEN");
						} else {
							screenTitleText = this.oApplicationFacade
								.getResourceBundle().getText(
									"TIMESHEET_CREATE_ENTRY_TITLE");
						}
					}
					var that = this;
					var valueforbutton = {
						sId: "SUBMIT_BTN",
						sI18nBtnTxt: submitButtonText,
						onBtnPressed: function(evt) {
							that.onDone(evt);
						}
					};

					var objHdrFtr = {
						sI18NFullscreenTitle: screenTitleText,

						oEditBtn: valueforbutton,

						buttonList: [

							{
								sId: "cancelBtn",
								sI18nBtnTxt: cancelBtnText,
								onBtnPressed: function(evt) {
									that.onCancel(evt);
								}
       },
							{
								sId: "resetBtn",
								sI18nBtnTxt: resetBtnText,
								onBtnPressed: function() {
									that.onReset();
								}
       }

       ],
						onBack: jQuery.proxy(function() {
							this.onNavButton();
						}, this)
					};
					if (this.oApplication.getModel("TSM_WEEKLY").getData().favoriteAvailable) {
						objHdrFtr.buttonList[2] = {
							sId: "EditFavoriteBtn",
							sI18nBtnTxt: editFavoriteBtnTxt,
							onBtnPressed: function(evt) {
								that.editFavorites(evt);
							}
						};
					}
					var m = new sap.ui.core.routing.HashChanger();
					var oUrl = m.getHash();
					if (oUrl.indexOf("Shell-runStandaloneApp") >= 0) {
						objHdrFtr.bSuppressBookmarkButton = true;
					}

					/**
					 * @ControllerHook Modify the footer buttons
					 * This hook method can be used to add and change buttons for the detail view footer
					 * It is called when the decision options for the detail item are fetched successfully
					 * @callback hcm.mytimesheet.view.S31~extHookChangeHeaderFooterOptions
					 * @param {object} Header Footer Object
					 * @return {object} Header Footer Object
					 */

					if (this.extHookChangeHeaderFooterOptions) {
						objHdrFtr = this.extHookChangeHeaderFooterOptions(objHdrFtr);
					}
					// 	return objHdrFtr;
					this.setHeaderFooterOptions(objHdrFtr);
				}
			}
		});
},
	"hcm/mytimesheet/view/S31.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<sap.ui.core:View controllerName="hcm.mytimesheet.view.S31"\n\txmlns="sap.m" xmlns:sap.ui.layout.form="sap.ui.layout.form"\n\txmlns:sap.ui.layout="sap.ui.layout" xmlns:sap.me="sap.me"\n\txmlns:sap.ui.core="sap.ui.core">\n\t<Page id="page" title="{i18n>MANUAL_INPUT_EDIT}" showNavButton="true"\n\t\t enableScrolling="true" navButtonPress="onNavButton">\n\t\t<content>\n\t\t\t<sap.me:Calendar id="weeklyCalendar" singleRow="true" \n\t\t\t\tweeksPerRow="2" design="Approval" enableMultiselection="true"\n\t\t\t\tcurrentDate="{ path: \'/start\', formatter:\'.parseDateYYYYMMdd\' }"\n\t\t\t\ttapOnDate="onTapOnDate" changeRange="onChangeRange" hideNavControls="false">\n\t\t\t</sap.me:Calendar>\n\n\n\t\t\t<sap.ui.layout:Grid defaultSpan="L8 M8 S12"\n\t\t\t\tdefaultIndent="L2 M2 S0" width="auto">\n\t\t\t\t<sap.ui.layout:content>\n\t\t\t\t<Panel id = "createPanel" headerText="{i18n>ENTRY_DETAILS}">\n\t\t\t\t<content>\n\t\t\t\t\t<sap.ui.layout.form:Form id="createFormTitle"\n\t\t\t\t\t\tmaxContainerCols="2">\n\t\t\t\t\t\t<sap.ui.layout.form:layout>\n\t\t\t\t\t\t\t<sap.ui.layout.form:ResponsiveGridLayout\n\t\t\t\t\t\t\t\tlabelSpanL="4" emptySpanL="3" \n\t\t\t\t\t\t\t\tlabelSpanM="4" emptySpanM="2" \n\t\t\t\t\t\t\t\tcolumnsL="2" columnsM="2"/>\n\t\t\t\t\t\t</sap.ui.layout.form:layout>\n\t\t\t\t\t\t<sap.ui.layout.form:formContainers>\n\t\t\t\t\t\t\t<sap.ui.layout.form:FormContainer\n\t\t\t\t\t\t\t\tid="firstContainer" visible="true">\n\t\t\t\t\t\t\t\t<sap.ui.layout.form:formElements>\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label id="timeAssignmentLbl" class="sapUiSmallMarginTop"\n\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>SELECT_FAVORITE}">\n\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<Input id="timeAssignment" \n\t\t\t\t\t\t\t\t\t\t\t\tshowValueHelp="true" valueHelpRequest="onFavoriteInputHelp" valueHelpOnly="true"\n\t\t\t\t\t\t\t\t\t\t\t\tsuggestionItemSelected=\'onFavoriteItemSelection\'\n\t\t\t\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement\n\t\t\t\t\t\t\t\t\t\tvisible="{/decimalTimeEntryVisible}">\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label id="decimalInputLbl" class="sapUiSmallMarginTop" text="{i18n>DURATION}">\n\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<Input id="decimalTimeEntryValue" value="{entry>/time}" type="Text"\n\t\t\t\t\t\t\t\t\t\t\t\tchange="onDecimalTimeValueChange">\n\n\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement\n\t\t\t\t\t\t\t\t\t\tvisible="{/clockEntry}">\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label id="startTimeLbl" class="sapUiSmallMarginTop" text="{i18n>TIME}">\n\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<DateTimeInput id="startTime" type="Time" placeholder="{i18n>FROM}"\n\t\t\t\t\t\t\t\t\t\t\t\tvalueFormat="HHmmss" value="{entry>/startTime}" change="validate">\n\t\t\t\t\t\t\t\t\t\t\t</DateTimeInput>\n\t\t\t\t\t\t\t\t\t\t\t<DateTimeInput id="endTime" type="Time" placeholder="{i18n>TO}"\n\t\t\t\t\t\t\t\t\t\t\t\tvalueFormat="HHmmss" value="{entry>/endTime}" change="validate">\n\t\t\t\t\t\t\t\t\t\t\t</DateTimeInput>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement id="ClkTimeDurationEle"\n\t\t\t\t\t\t\t\t\t\tvisible="false">\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label id="ClkTimeDecimalInputLbl" class="sapUiSmallMarginTop" text="{i18n>DURATION}">\n\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<Input id="ClkTimeDecimalTimeEntryValue" type="Text"\n\t\t\t\t\t\t\t\t\t\t\t\tchange="onDecimalTimeValueChange">\n\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<!-- extension point for adding Form Elements in the inputs section in the first form -->\t\n        \t\t                    <sap.ui.core:ExtensionPoint name="extS31FormElementForInputs"></sap.ui.core:ExtensionPoint>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label text="{i18n>NOTE}" class="sapUiSmallMarginTop" />\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<TextArea id=\'S31TextArea\' value="{entry>/notes}">\n\n\t\t\t\t\t\t\t\t\t\t\t</TextArea>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t</sap.ui.layout.form:formElements>\n\t\t\t\t\t\t\t</sap.ui.layout.form:FormContainer>\n\t\t\t\t\t\t</sap.ui.layout.form:formContainers>\n\t\t\t\t\t</sap.ui.layout.form:Form>\n\t\t\t\t\t</content>\n\t\t\t\t\t</Panel>\n\t\t\t\t    <Panel id="accountingInfoPanel" expandable="true" expanded="false" headerText="{i18n>COST_ASSIGNMENT}">\n\t\t\t\t\t\t\t\t\t<content>\n\t\t\t\t\t<sap.ui.layout.form:Form id="accountingInfos" \n\t\t\t\t\t\tmaxContainerCols="1">\n\t\t\t\t\t\t<sap.ui.layout.form:layout>\n\t\t\t\t\t\t\t<sap.ui.layout.form:ResponsiveGridLayout \n\t\t\t\t\t\t\t\tlabelSpanL="4" emptySpanL="3" \n\t\t\t\t\t\t\t\tlabelSpanM="4" emptySpanM="2" \n\t\t\t\t\t\t\t\tcolumnsL="1" columnsM="1" />\n\t\t\t\t\t\t</sap.ui.layout.form:layout>\n\t\t\t\t\t\t<sap.ui.layout.form:formContainers>\n\t\t\t\t\t\t\t<sap.ui.layout.form:FormContainer\n\t\t\t\t\t\t\t\tid="manualAccountingInfos" formElements="{accountingInfoModel>/types}">\n\t\t\t\t\t\t\t\t<sap.ui.layout.form:layoutData>\n\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\tweight="8" linebreak="true"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t</sap.ui.layout.form:layoutData>\n\t\t\t\t\t\t\t\t<!-- extension point for additional Form Element for accounting Infos -->\t\n        \t\t                    <sap.ui.core:ExtensionPoint name="extS31FormElementAccountingInfos"></sap.ui.core:ExtensionPoint>\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\t\t\tweight="8" linebreak="true">\n\t\t\t\t\t\t\t\t\t\t\t</sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:layoutData>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label class="sapUiSmallMarginTop"\n\t\t\t\t\t\t\t\t\t\t\t\ttext="{accountingInfoModel>name}">\n\t\t\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tweight="1"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<Input showValueHelp="{accountingInfoModel>valueHelp}"\n\t\t\t\t\t\t\t\t\tname="{accountingInfoModel>fieldName}"\n\t\t\t\t\t\t\t\t\tvalueStateText="{accountingInfoModel>valueStateText}"\n\t\t\t\t\t\t\t\t\tvalueHelpRequest="onInputHelp"\n\t\t\t\t\t\t\t\t\tliveChange=\'manualHelpChange\'\n\t\t\t\t\t\t\t\t\tsuggestionItemSelected=\'onManualItemSelection\'\n\t\t\t\t\t\t\t\t\tvalue="{accountingInfoModel>value}"\n\t\t\t\t\t\t\t\t\tenabled="{accountingInfoModel>ReadOnly}">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormContainer>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:formContainers>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:Form>\n\t\t\t\t\t\t\t\t\t</content>\n\t\t\t\t\t\t\t\t\t\t</Panel>\n\t\t\t\t</sap.ui.layout:content>\n\t\t\t</sap.ui.layout:Grid>\n\t\t\t\n\t\t</content>\n\t</Page>\n</sap.ui.core:View>'
}});
