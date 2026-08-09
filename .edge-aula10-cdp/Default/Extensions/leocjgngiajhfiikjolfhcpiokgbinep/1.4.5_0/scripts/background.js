/* CHANGELOG
 1.4.5:
	- set openIncognito to 'false' by default
 1.4.4:
	- added warning message when running without incognito access
	- added option to force bookmarks to always load in incognito mode
	- added 'Save Secure Bookmark' context menu item
	- added option to show/hide aforementioned contect menu item
	- solved bug with logout-login cycle in popup causing duplicate events
	- improved messaging between extension pages
	- all pages now respond to externally induced changes
	- importEncryptedTree now returns the imported tree instead of error code 0 (upon success)
	- _tree is now sorted when changed, rather than when decrypted tree is requested
	- encrypted tree is now saved after external requests for change, rather than after internal function calls
	- centralized click handlers in popup window for better scalability
	- moved some common variables and functions into shared.js
	- improved link loading function (handles ctrl+clicks better)
	- will now save a backup before each update
 1.4.3:
	- added auto-signoff option
	- created 'Settings' item in Options page
	- moved password change field to Settings page
	- Added some settings:
		- popup width and height
		- ctrl-key behavior
		- auto-signoff time
	- added mechanism for sending notifications to options window and popup
	- added notification when update is installed
	- added cleanup mechanism which executes after update (removes duplicate tree ids)
	- reload tree in options#importexport if a change is triggered by a popup window
	- fixed minor bug with empty list placeholder not (dis)appearing in popup
	- added HTML5 doctype to popup to improve layout stability
	- minor bug fixes in nestable plugin
	- fixed bugs where duplicate ids were generated when importing many items
	- removed item delete animation
 1.4.2:
	- hid sync button
 1.4.1:
	- minor interface changes
	- removed gradient images
	- added backup fallback mechanism to work around leveldb corruption after System Restore (see Chromium Issue 261623)
	
*/

// POSTPONED
// TODO: change 'error' variable name to 'node' where appropriate
// TODO: write sync / merging code
// TODO: implement merging code in import function


// local variables
_tabId = "background";
var _authenticated = false;
var _passhash;
var _dataVersion = 3;
var _sessionTimeout = 0;
var _contextMenuItemId;
var _tree = {
	id				: "0",
	lastModified	: 0,
	index			: 0,
	parentId		: null,
	title			: "",
	url				: null,
	children		: []
};

// listen for requests by extension pages
chrome.extension.onMessage.addListener(function(request, sender, cb) {
	var senderId = typeof(sender.tab) === "undefined" ? 'popup' : 'tab-'+sender.tab.id;
	switch(request.type) {
		case "init":
			init(cb);
			break;
		case "getAuthStatus":
			cb(_authenticated);
			break;
		case "getOptions":
			cb(_options);
			break;
		case "setOption":
			_options[request.option] = request.value;
			chrome.storage.local.set({'options':_options});
			if (request.option == 'autoLogOutTime') {
				resetAutoLogOutTimer();
			}
			if (request.option == 'addContextMenuItem') {
				if (_options.addContextMenuItem) {
					addContextMenuItem();
				}
				else {
					removeContextMenuItem();
				}
			}
			broadcast("optionsChanged",_options,senderId);
			break;
		case "login":
			login(request.pass,cb);
			break;
		case "logout":
			logout(cb);
			break;
		case "setPass":
			setPassword(request.pass,cb);
			break;
		case "changePass":
			changePassword(request.oldPass,request.newPass,cb);
			break;
		case "reset":
			fullReset(cb);
			break;
		case "getEncryptedTree":
			getEncryptedTree(cb);
			break;
		case "getDecryptedTree":
			cb(_tree);
			break;
		case "getSubTree":
			getSubTree(request.id,cb);
			break;
		case "create":
			create(request.bookmark,function(error) {
				if (typeof(error) === "object") {
					sortTree();
					saveEncryptedTree(function(saveError) {
						if (saveError === 0) {
							broadcast("treeChanged",_tree,senderId);
							cb(error);
						}
						else {
							cb(saveError);
						}
					});
				}
				else {
					cb(error);
				}
			});
			break;
		case "remove":
			remove(request.id,function(error) {
				if (typeof(error) === "object") {
					sortTree();
					saveEncryptedTree(function(saveError) {
						if (saveError === 0) {
							broadcast("treeChanged",_tree,senderId);
							cb(error);
						}
						else {
							cb(saveError);
						}
					});
				}
				else {
					cb(error);
				}
			});
			break;
		case "move":
			move(request.id,request.destination,function(error) {
				if (typeof(error) === "object") {
					sortTree();
					saveEncryptedTree(function(saveError) {
						if (saveError === 0) {
							broadcast("treeChanged",_tree,senderId);
							cb(error);
						}
						else {
							cb(saveError);
						}
					});
				}
				else {
					cb(error);
				}
			});
			break;
		case "update":
			update(request.id,request.changes,function(error) {
				if (typeof(error) === "object") {
					//sortTree(); // no need to sort after update event
					saveEncryptedTree(function(saveError) {
						if (saveError === 0) {
							broadcast("treeChanged",_tree,senderId);
							cb(error);
						}
						else {
							cb(saveError);
						}
					});
				}
				else {
					cb(error);
				}
			});
			break;
		case "toggleCollapse":
			toggleCollapse(request.id,function(error) {
				if (typeof(error) === "object") {
					//sortTree(); // no need to sort after collapse event
					saveEncryptedTree(function(saveError) {
						if (saveError === 0) {
							broadcast("treeChanged",_tree,senderId);
							cb(error);
						}
						else {
							cb(saveError);
						}
					});
				}
				else {
					cb(error);
				}
			});
			break;
		case "importEncryptedTree":
			importEncrypted(request.data,request.pass,function(error) {
				if (typeof(error) === "object") {
					sortTree();
					saveEncryptedTree(function(saveError) {
						if (saveError === 0) {
							broadcast("treeChanged",_tree,senderId);
							cb(error);
						}
						else {
							cb(saveError);
						}
					});
				}
				else {
					cb(error);
				}
			});
			break;
		default:
			cb(ERROR.ILLEGAL_REQUEST);
			break;
	}
	return true;
});

// called when user opens popup or options screen
function init(callback) {
	
	// this function must have a callback
	if (typeof(callback) !== "function") {
		callback(ERROR.ILLEGAL_CALLBACK);
		return false;
	}
	
	resetAutoLogOutTimer();
				
	if (_authenticated) {
		
		// already logged in
		callback({
			firstTimeUse: false,
			authenticated: true,
			options: _options
		});
	}
	else {
		try {
			chrome.storage.local.get(['data','options'], function(result) {
				
				// detect problems with storage.local (see Chrome issue 261623)
				if (chrome.extension&&chrome.extension.lastError) {
					console.log("Chrome error: "+chrome.extension.lastError.message)
					callback(ERROR.LEVELDB_CORRUPT);
					return;
				}
				
				// overwrite default options with stored values (if present)
				if (result.options) {
					for (var i in _options) {
						if (result.options[i]) {
							_options[i] = result.options[i];
						}
					}
				}
				
				if (result.data && result.data.length) {
					// data found
					callback({
						firstTimeUse: false,
						authenticated: false,
						options: _options
					});
				}
				else {
					// no data -> first time use
					callback({
						firstTimeUse: true,
						authenticated: false,
						options: _options
					});
				}
			});
		}
		catch(e) {
			if (callback) {
				callback(ERROR.STORAGE_READ_FAIL);
			}
		}
	}
}

function resetAutoLogOutTimer() {
	// (re)set session timeout
	if (_sessionTimeout) {
		window.clearTimeout(_sessionTimeout);
	}
	if (_options.autoLogOutTime) {
		_sessionTimeout = window.setTimeout(warnAutoLogOut,(_options.autoLogOutTime-1)*60000);
	}
}

function login(pass,callback) {
	try {
		chrome.storage.local.get(['ch1','ch2','data','version','options'], function(result) {
			if (result.ch1 && result.ch2) {
				_passhash = Tea.encrypt(pass,'gmkn546=klgm2=36'+pass);
				var ch1d = decrypt(result.ch1);
				var ch2d = decrypt(result.ch2);
				if (ch2d == ch1d + "shouldequal" + ch1d) {
					_authenticated = true;
					
					// prepare update (if going to update)
					if (chrome && chrome.app && chrome.app.getDetails().version !== _options.extVersion) {
						beforeUpdate();
					}
					
					// check data version, update if necessary, and broadcast success (or error) to extension pages
					var version = result.version || 0;
					if (version < _dataVersion) {
						migrateFromOldVersion(result.data,version,function(error) {
							if (error === 0) {
								createLocalBackup('backup');
								broadcast('notify','login','background');
							}
							else {
								// cancel login in case of failure
								_passhash = null;
								_authenticated = false;
								_tree.children = [];
							}
							if (callback) {
								callback(error);
							}
						});
					}
					else {
						var tree = decryptTree(result.data);
						if (typeof(tree)==="object") {
							_tree = tree;
							createLocalBackup('backup');
							broadcast('notify','login','background');
							if (callback) {
								callback(0);
							}
						}
						else {
							if (callback) {
								callback(tree);
							}
						}
					}
					
					// process update (if updated)
					if (chrome && chrome.app && chrome.app.getDetails().version !== _options.extVersion) {
						afterUpdate();
					}
					
					// do things that are necessary after login but also after creating a new account
					afterLogin();
				}
				else {
					if (callback) {
						callback(ERROR.AUTH_FAILED);
					}
				}
			}
			else {
				if (callback) {
					callback(ERROR.STORAGE_CORRUPT);
				}
			}
		});
	}
	catch(e) {
		if (callback) {
			callback(ERROR.STORAGE_READ_FAIL);
		}
	}
}

// do things that are necessary after login but also after creating a new account
function afterLogin() {
	
	if (_options.addContextMenuItem) {
		addContextMenuItem();
	}
	
	// show a warning if extension is not allowed in incognito
	chrome.extension.isAllowedIncognitoAccess(function(allowed) {
		if (!allowed) {
			broadcast('warning','Secure Bookmarks is not allowed in Incognito mode! <a target="_blank" href="chrome://extensions" title="Go to Extensions options">Change</a>','background');
		}
	});
}

// add the contextMenu item
function addContextMenuItem() {
	_contextMenuItemId = chrome.contextMenus.create({
	  'title' : 'Save Secure Bookmark',
	  'contexts' : ['all'],
	  'onclick' : function(info, tab) {
		var url = info.linkUrl || info.srcUrl || info.selectionText || info.pageUrl || info.frameUrl;
		if (!url) {
			alert('Sorry, could not create bookmark for selected item');
		}
		else {
			var title = info.linkUrl || info.srcUrl || info.selectionText || tab.title;
			create({title: title,url: url},function(item) {
				if (typeof(item)==="object") {
					sortTree();
					saveEncryptedTree(function(saveError) {
						if (saveError === 0) {
							broadcast("treeChanged",_tree,'background');
						}
						else {
							alert('Error updating saved bookmarks');
						}
					});
				}
				else  {
					alert('Error creating bookmark');
				}
			});
		}
	  }
	});
}

// remove the context menu item
function removeContextMenuItem() {
	if (_contextMenuItemId) {
		chrome.contextMenus.remove(_contextMenuItemId);
	}
}

function logout(callback) {
	if (_authenticated) {
		_passhash = null;
		_authenticated = false;
		_tree.children = [];
		broadcast('notify','logout','background');
		removeContextMenuItem();
	}
	if (callback) {
		callback(0);
	}
}

// prepare update installation
function beforeUpdate() {

	// get new version
	var extVersion = chrome.app.getDetails().version;
	createLocalBackup('backup-before-'+extVersion);
}

// handle update installation
function afterUpdate() {
	
	// get new version
	var extVersion = chrome.app.getDetails().version;
	
	// updated stored version information
	_options['extVersion'] = extVersion;
	chrome.storage.local.set({'options':_options});
	
	// note that the code below is only executed once after every update, regardless of whether it was executed successfully
	
	// perform thorough tree cleaning after each update
	if (cleanUpTree(_tree)===0) {
		sortTree();
		saveEncryptedTree(function(error) {
			if (error !== 0) {
				logout();
				broadcast('error','Could not save tree after cleaning, error ' + error,'background');
				return;
			}
		});
	}
	else {
		logout();
		broadcast('error','Problem occurred while cleaning tree. No changes were saved.','background');
		return;
	}
	
	// broadcast update message
	broadcast('success',"Secure Bookmarks updated to version " + extVersion + "! <a href='options.html#whatsnew' title='View changelog'>See what's new.</a>",'background');
}	

function setPassword(pass, callback) {
	if (chrome.storage && chrome.storage.local && chrome.storage.local.QUOTA_BYTES >= 1 * 1024 * 1024) {
		_passhash = Tea.encrypt(pass,'gmkn546=klgm2=36'+pass);	
		var chunk = btoa("PassTheSalt"+_passhash+"Please"+Math.random()*45143698436319);
		var ch1 = encrypt(chunk);
		var ch2 = encrypt(chunk+"shouldequal"+chunk);
		chrome.storage.local.set({
			'version' 	: _dataVersion,
			'ch1'		: ch1,
			'ch2'		: ch2
		},function() {
			// verify that data was stored and can be retrieved
			chrome.storage.local.get('version',function(result) {
				if (result && result.version === _dataVersion) {
					_authenticated = true;
					saveEncryptedTree(function(error) {
						if (error === 0) {
							if (callback) {
								callback(0);
							}
							broadcast('notify','login','background');
							
							// do things that are necessary after login but also after creating a new account
							afterLogin();
						}
						else {
							_authenticated = false;
							callback(error);
						}
					});
				}
				else {
					if (callback) {
						callback(ERROR.STORAGE_READ_FAIL);
					}
				}
			});			
		});
	}
	else {
		if (callback) {
			callback(ERROR.STORAGE_QUOTA);
		}
	}
}

function changePassword(oldpass, pass, callback) {
	if (_authenticated) {
		try {
			chrome.storage.local.get(['ch1','ch2','data','version'], function(result) {
				if (result.ch1 && result.ch2) {
					var oldpasshash = Tea.encrypt(oldpass,'gmkn546=klgm2=36'+oldpass);
					var ch1d = Tea.decrypt(result.ch1,oldpasshash);
					var ch2d = Tea.decrypt(result.ch2,oldpasshash);
					if (ch2d == ch1d + "shouldequal" + ch1d) {
						// make a backup of all data and attempt to encrypt and store information using new password
						var backup = result;
						setPassword(pass,function(error) {
							if (error !==0) {
								// restore old data in case of problems
								chrome.storage.local.set(backup);
								_authenticated = true;
							}
							callback(error);
						});
					}
					else {
						if (callback) {
							callback(ERROR.AUTH_FAILED);
						}
					}
				}
				else {
					if (callback) {
						callback(ERROR.STORAGE_CORRUPT);
					}
				}
			});
		}
		catch(e) {
			if (callback) {
				callback(ERROR.STORAGE_READ_FAIL);
			}
		}
	}
	else {
		if (callback) {
			callback(ERROR.NOT_AUTHORIZED);
		}
	}
}

function fullReset(callback) {
	chrome.storage.local.remove(['ch1','ch2','data','version'],function() {
		logout();
		if (callback) {
			callback(0);
		}
	});
	window.localStorage.clear();
}

/*
*		Bookmark item manipulation
*/
function findParent(parentId) {
	if (!parentId || parentId === "0") {
		return _tree;
	}
	return findById(_tree,parentId);
}

function findById(tree,id) {
	if (typeof(id)!=="string") {
		return false;
	}
	if (tree.id === id) {
		return tree;
	}
	else {
		for (var i in tree.children) {
			var item = findById(tree.children[i],id);
			if (item) {
				return item;
				break;
			}
		}
		return false;
	}
}

function sortTree() {
	sortSubTree(_tree);
}

function treeSort(child1,child2) {
	return child1.index-child2.index;
}

function sortSubTree(tree) {
	if (tree.children) {
		tree.children.sort(treeSort);
		for (var i in tree.children) {
			sortSubTree(tree.children[i]);
		}
	}	
}

function getTree(callback) {
	getSubTree("0",callback);
}

function getSubTree(id, callback) {
	var subTree = findById(_tree,id);
	if (subTree) {
		callback(subTree);
	}
	else {
		callback(false);
	}
}

function create(bookmark,callback) {
	if (_authenticated) {
		// store destination
		var destination = {
			parentId : bookmark.parentId || '0',
			index : bookmark.index || 0
		}
		
		// generate id and make sure it's unique
		var uniqueId = Date.now() - Math.round(Math.random() * 10000);
		while (findById(_tree,uniqueId.toString())) {
			uniqueId++;
		}
		
		bookmark.id = uniqueId.toString();
		
		// set timestamp
		bookmark.lastModified = Date.now();
		
		// add empty children array if folder
		if (!bookmark.url) {
			bookmark.children = [];
			bookmark.collapsed = false;
		}
		
		// move to correct place
		place(bookmark,destination,callback);
	}
	else {
		if (callback) {
			callback(ERROR.NOT_AUTHORIZED);
		}
	}
}

function place(item, destination, callback) {
	if (_authenticated) {
	
		// find new parent
		var parent = findParent(destination.parentId);
		
		// check if item and parent exist
		if (!parent || !item) {
			if (callback) {
				callback(ERROR.NOT_FOUND);
			}
			return false;
		}
		
		// make sure index is not out of bounds
		if (destination.index > parent.children.length) {
			destination.index = parent.children.length;
		}
		
		// set new parentId and update timestamp
		item.parentId = destination.parentId;
		item.index = destination.index;
		item.lastModified = Date.now();
		
		// adjust index of all subsequent siblings
		if (destination.index < parent.children.length) {
			for (var i in parent.children) {
				if (parent.children[i].index >= destination.index) {
					parent.children[i].index += 1;
				}
			}
		}

		// insert node
		parent.children.push(item);
		
		// save tree and execute callback
		if (callback) {
			callback(item);
		}
	}
	else {
		if (callback) {
			callback(ERROR.NOT_AUTHORIZED);
		}
	}
}

function move(id, destination, callback) {
	if (_authenticated) {
		// remove from old position and insert at new position
		remove(id,function(item) {
			// note that item now contains either the removed item or an error value
			if (typeof(item) === 'object') {
				place(item,destination,callback);
			}
			else {
				if (callback) {
					callback(item);
				}
			}
		});
	}
	else {
		if (callback) {
			callback(ERROR.NOT_AUTHORIZED);
		}
	}
}

function update(id,changes,callback) {
	if (_authenticated) {
		var item = findById(_tree,id);
		if (item) {
			if (changes.url) {
				item.url = changes.url;
			}
			if (changes.title) {
				item.title = changes.title;
			}
			item.lastModified = Date.now();
			if (callback) {
				callback(item);
			}
		}
		else {
			if (callback) {
				callback(ERROR.NOT_FOUND);
			}
		}
	}
	else {
		if (callback) {
			callback(ERROR.NOT_AUTHORIZED);
		}
	}
}

function remove(id,callback) {
	if (_authenticated) {
		var item = findById(_tree,id);
		if (item) {
			var index = item.index;
			var parent = findParent(item.parentId);
			if (parent) {
				var removed = [];
				for (var i=parent.children.length; i--;) {
					if (parent.children[i].id === id) {
						removed = parent.children.splice(i,1);
					}
					else if (parent.children[i].index > index) {
						parent.children[i].index--;
					}
				}
				if (callback) {
					if (removed.length) {
						callback(removed[0]);
					}
					else {
						callback(ERROR.TREE_CORRUPT);
					}
				}
			}
			else {
				if (callback) {
					callback(ERROR.TREE_CORRUPT);
				}
			}
		}
		else {
			if (callback) {
				callback(ERROR.NOT_FOUND);
			}
		}
	}
	else {
		if (callback) {
			callback(ERROR.NOT_AUTHORIZED);
		}
	}
}

function toggleCollapse(id,callback) {
	if (_authenticated) {
		var item = findById(_tree,id);
		if (item) {
			item.collapsed = !item.collapsed;
			if(callback) {
				callback(item);
			}
		}
		else {
			if (callback) {
				callback(ERROR.NOT_FOUND);
			}
		}
	}
	else {
		if (callback) {
			callback(ERROR.NOT_AUTHORIZED);
		}
	}
}

// export tree data in an encrypted string
function getEncryptedTree(callback) {
	try {
		chrome.storage.local.get('data',function(results) {
			if (results.data) {
				callback('[v='+_dataVersion+']'+results.data);
			}
			else {
				callback(ERROR.NO_DATA);
			}
		});
	}
	catch(e) {
		if (callback) {
			callback(ERROR.STORAGE_READ_FAIL);
		}
	}
}

/*
* internal functions
*/
function encrypt(str) {
	return Tea.encrypt(str,_passhash);
}

function decrypt(str) {
	return Tea.decrypt(str,_passhash);
}

function saveEncryptedTree(callback) {
	if (_authenticated) {
		_tree.lastModified = Date.now();
		try {
			chrome.storage.local.set({
				'data' 		: encrypt(JSON.stringify(_tree)),
				'version'	: _dataVersion
			},function() {
				if (callback) {
					callback(0);
				}
			});
		}
		catch(e) {
			if (callback) {
				callback(ERROR.STORAGE_WRITE_FAIL);
			}
		}
	}
	else {
		if (callback) {
			callback(ERROR.NOT_AUTHORIZED);
		}
	}
}

function decryptTree(encr_tree) {
	try {
		var attemptTree = JSON.parse(decrypt(encr_tree));
		if (attemptTree && attemptTree.id && attemptTree.id === "0") {
			return attemptTree;
		}
		else {
			return ERROR.STORAGE_CORRUPT;
		}
	}
	catch(e) {
		return ERROR.STORAGE_CORRUPT;
	}
}


function warnAutoLogOut() {
	_sessionTimeout = window.setTimeout(logout,1*60000);
	broadcast('warning','Auto-logout in 1 minute! Re-open Secure Bookmarks to abort.','background');
}

// send a message to all extension pages (popup and options pages)
function broadcast(type, message, senderId) {
	chrome.extension.sendMessage({type: type, message: message, senderId: senderId}, function(error){});
}

/*
		Backup and import/export stuff
*/
function importEncrypted(data,pass,callback) {
	if (_authenticated) {
		var attemptTree = {
			title:		"",
			children:	[]
		}
		
		var version = 0;
		if (data.substring(0,5)==='[v=2]') {
			version = 2;
			data = data.substring(5);
		}
		else if (data.substring(0,5)==='[v=3]') {
			version = 3;
			data = data.substring(5);
		}
		
		switch(version) {
			case 0:
				var str = '';
				var hash = Tea.encrypt(pass,'gmkn546=klgm2=36'+pass);
				var lines = data.split('>.<');
				for (var i=0; i<lines.length; i++) {
					var fields = lines[i].split('>:<');
					if (fields.length==2) {
						attemptTree.children.push({
							index	: i,
							title	: Tea.decrypt(fields[0],hash),
							url		: Tea.decrypt(fields[1],hash)
						});
					}
				}
				break;
				
			case 2:
			case 3:
				var hash = Tea.encrypt(pass,'gmkn546=klgm2=36'+pass);
				try {
					var jsonstr = Tea.decrypt(data,hash);
					if (jsonstr.length > 11 && jsonstr.substring(0,1)==='{' && jsonstr.substr(-1)==='}') {
						attemptTree = JSON.parse(jsonstr);
					}
				}
				catch(e) {
					// attemptree remains empty, triggering an error callback below
				}
				break;
		}
		
		if (attemptTree.children && attemptTree.children.length > 0) {
			if (version < 3) {
				attemptTree = updateSubTreeFromVersion2(attemptTree,Date.now());
			}
			
			// TODO: merge into existing bookmarks instead of creating a subfolder
			// careful with conflicting IDs!
			// ...
			
			// create subfolder with imported items
			attemptTree.title = "Recently Imported";
			createSubTree(attemptTree,{parentId: '0', index: 0},function(created) {
				if (callback) {
					callback(created);
				}
			});
		}
		else {
			callback(ERROR.NO_DATA);
		}
	}
	else {
		callback(ERROR.NOT_AUTHORIZED);
	}
}

function createSubTree(sub_tree,destination,callback) {
	if (_authenticated) {
		var bookmark = {
			title: sub_tree.title,
			url: sub_tree.url,
			parentId: destination.parentId,
			index: destination.index
		}
		create(bookmark,function(node) {
			if (typeof(node)==="object") {
				for (var i in sub_tree.children) {
					createSubTree(sub_tree.children[i],{parentId: node.id, index: sub_tree.children[i].index},null);
				}
			}
			if (callback) {
				// note that 'node' at this point is either the inserted (root) node or an error code
				callback(node);
			}
		});
	}
	else {
		if (callback) {
			callback(ERROR.NOT_AUTHORIZED);
		}
	}
}

// copy data to localStorage to allow for data extraction in the case of leveldb corruption
function createLocalBackup(name) {
	if(typeof(window.localStorage)!=="undefined") {
		getEncryptedTree(function(dataString) {
			if(typeof(dataString)==="string") {
				window.localStorage.setItem(name,dataString);
			}
		});
	}
}

// migrate to new version
// note: support for version 1 (using deprecated html5 database) dropped as of October 1st, 2013
function migrateFromOldVersion(encr_tree,version,callback) {
	switch (version) {
		case 2:
			// decryption algorithm is identical between v2 and v3
			var tree = decryptTree(encr_tree);
			if (typeof(tree)==="object") {
				var error = updateTreeFromVersion2(tree);
				if (error===0) {
					_tree = tree;
					sortTree();
					saveEncryptedTree(callback);
				}
				else {
					callback(ERROR.MIGRATE_FAIL);
				}
			}
			else {
				if (callback) {
					callback(tree);
				}
			}
			break;
		default:
			if (callback) {
				callback(ERROR.MIGRATE_UNSUPPORTED);
			}
			break;
	}
}

// update a v2 tree to the current format (changes ids to unique ids and sets lastModified to current time)
function updateTreeFromVersion2(tree) {

	// very basic error checking... store number of children
	var nChildren = countChildren(tree);
	
	try {
		updateSubTreeFromVersion2(tree,Date.now());
		// root id must remain 0
		tree.id = "0";
		for (var i in tree.children) {
			tree.children[i].parentId = "0";
		}
	}
	catch(e) {
		return 2;
	}
	
	// very basic error checking... check if number of children is unchanged
	if (countChildren(tree) !== nChildren) {
		return 1;
	}
	else {
		return cleanUpTree(tree);
	}
}

// recursive subroutine of updateTreeFromVersion2
function updateSubTreeFromVersion2(tree,startId) {
	tree.id = startId.toString();
	tree.lastModified = Date.now();
	var nextId = startId - 1;
	for (var i in tree.children) {
		tree.children[i].parentId = tree.id;
		var subtree = updateSubTreeFromVersion2(tree.children[i],nextId);
		while (subtree.children && subtree.children.length > 0) {
			subtree = subtree.children[subtree.children.length - 1];
		}
		nextId = parseInt(subtree.id) - 1;
	}
	return tree;
}

// clean up the bookmarks tree
function cleanUpTree(tree) {
	var nChildren = countChildren(tree);
	cleanUpSubTree(tree,tree);
	if (tree.id === "0" && countChildren(tree) === nChildren) {
		return 0;
	}
	else {
		return 1;
	}
}

// solve conflicting ids
function cleanUpSubTree(item,tree) {
	
	// store node id
	var id = item.id;
	
	// change node id to something unique
	item.id = "#temp#";
	
	// check for more items with the same id and fix those
	while (dupe = findById(tree,id)) {
		// generate new id and make sure it's unique
		var uniqueId = Date.now() - Math.round(Math.random() * 10000);
		while (findById(tree,uniqueId.toString())) {
			uniqueId++;
		}
		dupe.id = uniqueId.toString();
		// update children's parent id
		for (var i in dupe.children) {
			dupe.children[i].parentId = dupe.id;
		}
	}
	
	// restore node id
	item.id = id;
	
	// repeat for all children
	for (var i in item.children) {
		cleanUpSubTree(item.children[i],tree);
	}
}