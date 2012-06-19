'use strict';

var module = angular.module('BookmarksManager', []);

/* Controllers */
module.controller('BookmarksManagerController', function ($scope, $timeout) {
	//Localization
	$scope.JSbookmarksManagerTitle = chrome.i18n.getMessage('JSbookmarksManagerTitle');
	$scope.JSsearch = chrome.i18n.getMessage("JSsearch");

	$scope.selectedItem = false;

	//Listeners
	$scope.click = function() {
		var command = this.child.command;
		if (!$scope.selectedItem && command !== "import" && command !== "export") {
			return
		}

		switch (command) {
			case "import": chrome.bookmarks.import();
							break;
			case "export": chrome.bookmarks.export();
							break; 
		}
	}

	$scope.setDisabledMenuItem = function() {
		var disabled = true;

		if (this.child.enable || $scope.selectedItem) {
			disabled = false;
		}

		return disabled;
	}

	//Menu
	$scope.menuItems = [
		{
			value: chrome.i18n.getMessage("JSadd"),
			children: [
				{
					value: chrome.i18n.getMessage("JSaddPage"),
					command: "addPage"
				},
				{
					value: chrome.i18n.getMessage("JSaddFolder"),
					command: "addFolder"
				}
			]
		},
		{
			value: chrome.i18n.getMessage("JSedit"),
			children: [
				{
					value: chrome.i18n.getMessage("JScut"),
					command: "cut"
				},
				{
					value: chrome.i18n.getMessage("JScopy"),
					command: "copy"
				},
				{
					value: chrome.i18n.getMessage("JSpaste"),
					command: "paste"
				},
				{
					value: chrome.i18n.getMessage("JSrename"),
					command: "rename"
				},
				{
					value: chrome.i18n.getMessage("JSdelete"),
					command: "delete"
				}
			]
		},
		{
			value: chrome.i18n.getMessage("JSimport_export"),
			children: [
				{
					value: chrome.i18n.getMessage("JSimport"),
					command: "import",
					enable: true
				},
				{
					value: chrome.i18n.getMessage("JSexport"),
					command: "export",
					enable: true
				}
			]
		}
	];
});
