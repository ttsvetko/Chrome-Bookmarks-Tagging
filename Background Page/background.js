/**
 * TagTree Background Script
 *
 * @author Tsvetan Tsvetkov
 * June 2012
 */
(function (win) {
	"use strict";

	var doc = win.document,
		tagsTree = "TagTree",
		extensionID = chrome.extension.getURL('background/background.js')
							.split('//')[1].split('/')[0],
		localStorage = win.localStorage = {};

	/**
	 *
	 */
	chrome.tabs.onActivated.addListener(function (/* Object */ activeInfo) {
		/*
		 * Fires when the active tab in a window changes. 
		 * Note that the tab's URL may not be set at the time this event fired, 
		 * but you can listen to onUpdated events to be notified when a URL is set.
		 *
		 * activeInfo ( object )
		 *
		 *		tabId ( integer )
		 *			The ID of the tab that has become active.
		 *
		 *		windowId ( integer )
		 *			The ID of the window the active tab changed inside of.
		 */
		setPageAction(activeInfo.tabId);
	});

	/**
	 *
	 */
	chrome.tabs.onUpdated.addListener(function (/* Int */ tabId, /* Object */ changeInfo, /* Tab */ tab) {
		/*
		 * Fired when a tab is updated.
		 *
		 * tabId ( integer )
		 *
		 * changeInfo ( object )
		 * 		Lists the changes to the state of the tab that was updated.
		 * 		
		 *		status ( optional string )
		 *			The status of the tab. Can be either loading or complete.
		 *
		 *		url ( optional string )
		 * 			The tab's URL if it has changed.
		 *
		 *		pinned ( optional boolean )
		 *			The tab's new pinned state.
		 *		
		 *	tab ( Tab )
		 *		Gives the state of the tab that was updated.
		 */
		if (changeInfo.status === "complete") {
			setPageAction(tabId);
		}
	});

	/**
	 *
	 */
	chrome.tabs.onRemoved.addListener(function (/* Int */ tabId, /* Object */ removeInfo) {
		/*
		 * Fired when a tab is closed. 
		 *
		 * Note: A listener can be registered for this event without requesting 
		 * the 'tabs' permission in the manifest.
		 *
		 * tabId ( integer )
		 *
		 * removeInfo ( object )
		 *		isWindowClosing ( boolean )
		 *			True when the tab is being closed because its window is being closed.
		 */
		delete localStorage[tabId];
	});

	/**
	 * TODO: Handle bookmarks creating/removing actions
	 */


	/**
	 *
	 */
	function isPageBookmarked() {
	
	}

	/**
	 *
	 */
	function setPageAction(/* Int */ tabId, /* Boolean */ force) {
		if (localStorage[tabId] === undefined) {
			
			chrome.tabs.get(tabId, function (tab) {
				var url = tab.url;
				chrome.bookmarks.search(tab.url, function (results) {
					var i = 0, len = results.length;

					for (i; i < len; i++) {
						if (results[i].url === url) {
							chrome.pageAction.show(tabId);
						}
					}
				})

				localStorage[tabId] = true;
			})
		}
	}

}(window));