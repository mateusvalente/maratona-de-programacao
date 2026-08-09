var currentPage;
var errorCode = 0;

// listen for messages from background page
function handleMessages(request, sender, cb) {
	switch (request.type) {
		case "notify":
			switch (request.message) {
				case "login":
					getExtensionStatus();
				break;
				case "logout":
					window.location = '';
				break;
			}
		break;
		case "warning":
		case "success":
		case "error":
		case "notice":
			showMessage(request.type,request.message);
		break;
		case "treeChanged":
			// do not respond to treeChanged events triggered by this page itself
			if (_tabId !== request.senderId) {
				if (typeof(request.message)==="object") {
					if (currentPage==="importexport") {
						$('#importexport-right').html(treeToHTML(request.message,'secbm'));
					}
				}
				else {
					showErrorPage(request.message);
				}
			}
		break;
		case "optionsChanged":
			_options = request.message;
			if (currentPage==="settings") {
				updatePageSettings();
			}
		break;
	}
}

// respond to URL changes
$(window).bind('hashchange',function(e) {
	setPage(window.location.hash.substring(1));
});

// start running after dom loaded
$(document).ready(function() {

	// hide all content, default to 'non-authorized' status in case of timeout
	$('.content').hide();
	setMenu({firstTimeUse: false, authorized: false});
	
	// attach menu click handlers
	$("#nav").find("a.internal").each(function() {
		$(this).click(function() {
			// clicking on the current menu items will not cause a change
			// in location.hash, but should reload the page nonetheless
			if ($(this).hasClass("selected")) {
				setPage($(this).attr("href").substring(1));
			}
		});
	});
	
	// listen for instructions from background page
	chrome.extension.onMessage.addListener(handleMessages);
	
	// get authorization status from background (init on callback)
	getExtensionStatus();
	
	// display error page if this pageload was triggered by a popup error
	var hash = window.location.hash.substring(1);
	if (hash.length >= 5 && hash.substring(0,5) === "error") {
		var code = parseInt(hash.substring(6));
		showErrorPage(code);
	}
	
	chrome.tabs.getCurrent(function(tab) {
		if (tab && tab.id) {
			_tabId = 'tab-' + tab.id;
		}
	});
});

// request login status (first time, authorized) from background
function getExtensionStatus() {
	messageBackground({type:'init'},init);
}
	
// create page depending on extension status
function init(status) {
	
	if (typeof(status)==="object") {
	
		// successful status request -> set menu and page accordingly
		setMenu(status);
		
		// store a copy of the options
		_options = status.options;
		
		// do not update page location if displaying an error page, regardless of auth status
		var hash = window.location.hash.substring(1);
		if (hash.length >= 5 && hash.substring(0,5) === "error") {
			// do nothing
		}
		else {
			if(status.firstTimeUse) {
				setPage('welcome');
			}
			else {
				if(status.authenticated) {
					if (hash === "login") {
						window.location.hash = "#gettingstarted";
					}
					else {
						setPage(hash);
					}
				}
				else {
					setPage('login');
				}
			}
		}
	}
	else {
		// error thrown by background page
		setMenu({firstTimeUse: false, authenticated: false});
		showErrorPage(status);
	}
}

function setMenu(status) {
	if(status.firstTimeUse) {
		$("#nav li").hide();
		$("#nav-item-welcome").show();
	}
	else {
		if(status.authenticated) {
			$("#nav li").show();
			$("#nav-item-login").hide();
			$("#nav-item-welcome").hide();
			$("#nav-item-recover").hide();
		}
		else {
			$("#nav li").hide();
			$("#nav-item-login").show();
			$("#nav-item-reset").show();
			$("#nav-item-recover").show();
		}
	}
}

// set visible page
function setPage(page) {
	if (page === "logout") {
		messageBackground({type	: 'logout'});
	}
	else {
		// redirect 'whatsnew' page request to the changelog on the getting started page
		if (page === "whatsnew") {
			page = "gettingstarted";
			window.setTimeout(function() {
				$(document.body).scrollTop($('#changelog').offset().top);
			},10);
		}
		var pages = ['gettingstarted','welcome','settings','importexport','backup','reset','login','recover','error'];
		var securedPages = ['importexport','backup','settings'];
		if (pages.indexOf(page)==-1) {
			page = pages[0];
		}
		if (securedPages.indexOf(page)==-1) {
			showPage(page);
		}
		else {
			messageBackground({type:'getAuthStatus'},function(authenticated) {
				if (authenticated) {
					showPage(page);
				}
				else {
					formerror('Please log in before using this feature',"nav-item-"+page);
				}
			});
		}
	}
}

// actually show the selected page and adjust the menu
function showPage(page) {
	$('.content').hide();
	$('#'+page).show();
	if (page!=="error") {
		$('a','#nav').removeClass('selected');
		$('a','li#nav-item-'+page).first().addClass('selected');
	}
	buildPage(page);
	currentPage = page;
	if (page === 'login') {
		$('#loginpass').focus();
	}
	else if (page === 'settings') {
		updatePageSettings();
	}
}

// add events and stuff if page is loaded for the first time
function buildPage(page) {
	if (!$('a','li#nav-item-'+page).first().data('isBuilt')) {
		switch (page) {
			case 'gettingstarted':
				break;
			case 'welcome':
				buildPageWelcome();
				break;
			case 'settings':
				buildPageSettings();
				break;
			case 'importexport':
				$('div.bookmarkcontainer').empty();
				buildPageImportExport();
				break;
			case 'backup':
				buildPageBackup();
				break;
			case 'reset':
				buildPageReset();
				break;
			case 'login':
				buildPageLogin();
				break;
			case 'recover':
				buildPageRecover();
				break;
			case 'error':
				buildPageError();
				break;
		}
		var doNotCache = ['importexport','error'];
		if (doNotCache.indexOf(page) === -1) {
			$('a','li#nav-item-'+page).first().data('isBuilt',true);
		}
	}
}

function buildPageError() {
	var ERROR_DESC = {
		UNKNOWN_ERROR		: 'An unknown error occured.',
		TIMEOUT				: 'The extension back-end is not responding.',
		ILLEGAL_REQUEST		: 'An invalid request was detected.',
		ILLEGAL_RESPONSE	: 'An invalid response was detected.',
		ILLEGAL_CALLBACK	: 'Callback is not a proper function.',
		AUTH_FAILED			: 'Authorization failed.',
		NOT_AUTHORIZED		: 'You do not have permission to perform this action. Make sure you are logged in.',
		NOT_FOUND			: 'Item could not be found.',
		NO_DATA				: 'No data found.',
		TREE_CORRUPT		: 'The bookmarks tree is corrupt.',
		STORAGE_QUOTA		: 'Insufficient storage space. Make sure your storage quota for extensions is at least 1 MB.',
		STORAGE_WRITE_FAIL	: 'Could not write to local storage.',
		STORAGE_READ_FAIL	: 'Could not read from local storage.',
		STORAGE_CORRUPT		: 'Local storage is corrupt.',
		UNSUPPORTED_FORMAT	: 'Could not read data; format could not be recognized.',
		CHROME_CREATE_FAIL	: 'Could not move bookmark to Chrome. Most likely, the URL is invalid',
		MIGRATE_FAIL		: 'A mysterious error occured while migration your data to a newer format. Please export your data, reset, and re-import your data.',
		MIGRATE_UNSUPPORTED	: 'Secure Bookmarks has been updated to a newer version, but your data is too old to be migrated automatically. Please export your data, reset, and re-import your data.' ,
		LEVELDB_CORRUPT		: 'Your Chrome user profile data is corrupt. This is most likely caused by an unexpected system crash, or by a bug in Chrome related to Windows System Restore. Please back-up your data and either create a new Chrome User Profile (via Chrome Settings) or re-install Chrome to fix the issue.',
		CHROME_PERMISSION	: 'Secure Bookmarks does not have proper permissions. Try re-starting or re-install Secure Bookmarks if the problem persists.'
	};
	$('span#errorcode').text(_errorCode);
	var errorName = "UNKNOWN_ERROR";
	for(var name in ERROR) {
		if (ERROR[name] === _errorCode) {
			errorName = name;
			break;
		}
	}
	$('span#errorname').text(errorName);
	$('p#errordesc').text(ERROR_DESC[errorName]);
}

// build 'recovery' page
function buildPageRecover() {	
	$('input#btn_extract').click(function(e) {
	
		// first show the most rigid backup... the localStorage backup item
		var str = window.localStorage.getItem('backup');
		$('#extractfield').val(str);
		$('#extractdiv').slideToggle();
		
		// now try a more recent backup from chrome.storage, but do not go through background page... it might be broken
		try {
			chrome.storage.local.get(['data','version'],function(results) {
				if (results && results.data) {
					var str = results.data;
					var version = results.version || 0;
					if (version > 1) {
						str = '[v='+version+']'+str;
					}
					$('#extractfield').val(str);
				}
				else {
					//showErrorPage(ERROR.NO_DATA);
				}
			});
		}
		catch(e) {}
	});
}

// build 'welcome' page
function buildPageWelcome() {
	$('#setpass').focus();
	$('#form-setpass').submit(function(e) {
		e.preventDefault();
		var pass = $('#setpass').val();
		var passc = $('#setpassc').val();
		if (pass && pass.length>5) {
			if (passc && pass===passc) {
				messageBackground({
					type : 'setPass',
					pass : pass
				},function(error) {
					if (error === 0) {
						// login event will be broadcasted
					}
					else {
						showErrorPage(error);
					}
				});
			}
			else {
				formerror('Password and confirmation do not match.','setpassc');
			}
		}
		else {
			formerror('Password must be at least 6 characters long.','setpass');
		}
	});
}

// build 'login' page
function buildPageLogin() {
	$('#form-login').submit(function(e) {
		e.preventDefault();
		chrome.extension.sendMessage({
			type	: 'login',
			pass	: $('#loginpass').val()
		},function(error){
			$('#loginpass').val('');
			if (error !== 0) {
				if (error === ERROR.AUTH_FAILED) {
					formerror('Password is incorrect.','loginsubmit');
				}
				else {
					if (typeof(error) === "undefined") {
						error = ERROR.ILLEGAL_RESPONSE;
					}
					showErrorPage(error);
				}
			}
		});
	});
}

// set values of input elements on 'settings' page
function updatePageSettings() {
	for (var i in _options) {
		switch(i) {
			// handle numeric options
			case 'popupWidth':
			case 'popupHeight':
			case 'autoLogOutTime':
				document.getElementById(i).value = _options[i];
				break;
			// handle boolean options
			case 'openIncognito':
			case 'openInNewTab':
			case 'addContextMenuItem':
				document.getElementById(i).checked = _options[i];
				break;
			// handle radio options
			default:
				setRadio(i,_options[i]);
				break;
		}
	}
}

// build 'settings' page
function buildPageSettings() {

	$('#popupWidth').data({min: 300, max: 750});
	$('#popupHeight').data({min: 100, max: 500});
	$('#autoLogOutTime').data({min: 0, max: 60});
	
	// set values and add event handlers
	chrome.extension.sendMessage({type	: "getOptions"},function(response) {
		_options = response;
		for (var i in _options) {
			switch(i) {
				// handle numeric options
				case 'popupWidth':
				case 'popupHeight':
				case 'autoLogOutTime':
					document.getElementById(i).value = _options[i];
					addNumericChangeEvent(i);
					break;
				// handle boolean options
				case 'openIncognito':
				case 'openInNewTab':
				case 'addContextMenuItem':
					document.getElementById(i).checked = _options[i];
					addCheckboxChangeEvent(i);
					break;
				// handle radio options
				default:
					setRadio(i,_options[i]);
					addRadioChangeEvent(i);
					break;
			}
		}
	});
	
	$('form#changepass').submit(function(e) {
		e.preventDefault();
		var oldpass = $('#oldpass').val();
		var pass = $('#newpass').val();
		var passc = $('#newpassc').val();
		if (pass && pass.length>5) {
			if (passc && pass===passc) {
				messageBackground({
					type	: 'changePass',
					oldPass	: oldpass,
					newPass	: pass
				},function(error){
					if (error === 0) {
						$('#oldpass,#newpass,#newpassc').val('');
						formsuccess('Password successfully changed.','newpassc');
					}
					else {
						if (error === ERROR.AUTH_FAILED) {
							$('#oldpass').val('').focus();
							formerror('Incorrect password.','oldpass');
						}
						else {
							showErrorPage(error);
						}
					}
				});
			}
			else {
				formerror('Password and confirmation do not match.','newpassc');
			}
		}
		else {
			formerror('Password must be at least 6 characters long.','newpass');
		}
	});
}

function addNumericChangeEvent(id) {
	var input = document.getElementById(id);
	input.addEventListener("change",function(e) {
		var newValue = parseInt(e.target.value);
		if (!isNaN(newValue) && newValue !== 0) {
			if (newValue < $(input).data('min')) {
				newValue = $(input).data('min');
				formerror('Minimum value is ' + newValue,id);
				input.value = newValue;
			}
			else if (newValue > $(input).data('max')) {
				newValue = $(input).data('max');
				formerror('Maximum value is ' + newValue,id);
				input.value = newValue;
			}
		}
		else {
			formsuccess('Set to default value',id);
			newValue = 0;
			input.value = 0;
		}
		_options[id] = newValue;
		chrome.extension.sendMessage({type	: "setOption", option: id, value: newValue});
	});
}

function addCheckboxChangeEvent(id) {
	var checkbox = document.getElementById(id);
	checkbox.addEventListener("change",function(e) {
		_options[id] = e.target.checked;
		chrome.extension.sendMessage({type	: "setOption", option: id, value: e.target.checked});
	});
}

function addRadioChangeEvent(name) {
	var radios = document.getElementsByName(name); 
	for (var i = 0; i < radios.length; i++) {
		radios[i].addEventListener("click",function(e){
			_options[name] = e.target.value;
			chrome.extension.sendMessage({type	: "setOption", option: name, value: e.target.value});
		});
	}
}

function getRadio(name) {
	var radios = document.getElementsByName(name); 
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			return radios[i].value;
		}
	}
	return null;
}

function setRadio(name, val) {
	var radios = document.getElementsByName(name);
	for (var i = 0; i < radios.length; i++) {
		radios[i].checked = (radios[i].value == val);
	}
}

// build 'reset' page
function buildPageReset() {	
	$('form#fullreset').submit(function(e) {
		e.preventDefault();
		var sure = confirm("Are you sure?\nThis will destroy all existing Secure Bookmarks!");
		if (sure) {
			try {
				chrome.storage.local.remove(['ch1','ch2','data','version']);
				// note that script execution will stop at the above line if leveldb is corrupt, so that the backup is not removed
				window.localStorage.clear();
				messageBackground({type	: 'logout'}, function(error) {
					window.location = '';
				});
			}
			catch(e) {
				showMessage('error','Could not clear chrome.storage.local because leveldb is corrupt. <br/> Use the Recovery page to extract a backup and re-install Chrome.');
			}
		}
	});
}

// build 'backup' page (more functions defined further down)
function buildPageBackup() {
	
	$('#export').click(function(e) {
		messageBackground({type:'getEncryptedTree'},function(str){
			if (typeof(str) === "string") {
				$('#exportfield').val(str);
				$('#exportdiv').slideToggle();
			}
			else {
				showErrorPage(str);
			}
		});
	});
	
	$('#import').click(function(e) {
		$('#importdiv').slideToggle();
	});
	
	$('form#backupform').submit(function(e) {
		e.preventDefault();
		messageBackground({
			'type'	: 'importEncryptedTree',
			'data'	: $('#importfield').val().trim(),
			'pass'	: $('#import-pass').val()
		},function(error) {
			if (typeof(error) === "object") {
				showMessage('success','Successfully imported ' + countChildren(error) + ' items');
				$('#importfield').val('');
				$('#import-pass').val('');
			}
			else {
				if (error === ERROR.NO_DATA) {
					formerror('Password does not match data','import-submit');
				}
				else {
					showErrorPage(error);
				}
			}
		});
	});
	
	$('#viewdata').click(function(e) {
		var div = $('#viewdatadiv');
		if (div.is(':visible')) {
			div.slideUp();
		}
		else {
			messageBackground({'type':'getDecryptedTree'},function(tree) {
				if (typeof(tree)==="object") {
					showTreeFormatted(tree);
					div.slideDown();
				}
				else {
					showErrorPage(tree);
				}
			});
		}
	});
	
	$('input[name=viewformat]').change(function(e) {
		messageBackground({'type':'getDecryptedTree'},function(tree) {
			if (typeof(tree)==="object") {
				showTreeFormatted(tree);
				div.slideDown();
			}
			else {
				showErrorPage(tree);
			}
		});
	});
}

// build 'importexport' page
function buildPageImportExport() {
	
	$('#importexport-container')
		.empty()
		.append($('<div id=importexport-left></div>').addClass('dd'))
		.append($('<div id=importexport-right></div>').addClass('dd'))
	;
	
	// build Chrome bookmarks tree
	chrome.bookmarks.getTree(function(tree) {
		if (tree && tree[0] && tree[0].id === "0") {
			$('#importexport-left')
			.html(treeToHTML(tree[0],'chrome'))
			.nestable({
				group: '1',
				maxDepth: 99,
				fixedType: true,
				hideButtons: true,
				protectRoot: true,
				expandTime: 300,
				collapseTime: 300
			})
			.on('change',handleBookmarkMove);
		}
		else {
			showErrorPage(ERROR.UNKNOWN_ERROR);
			return;
		}
	});
	
	// build Secure Bookmarks tree
	messageBackground({'type':'getDecryptedTree'},function(tree){
		if (typeof(tree) === "object") {
			$('#importexport-right')
			.html(treeToHTML(tree,'secbm'))
			.nestable({
				group: '1',
				maxDepth: 99,
				fixedType: true,
				hideButtons: true,
				expandTime: 300,
				collapseTime: 300
			})
			.on('change',handleBookmarkMove);
		}
		else {
			showErrorPage(tree);
		}
	});
}

/*
 * importexport specific functions
 */

function treeToHTML(tree,prefix) {
	var html = '';
	if (tree.children) {
		html += tree.title ? '<li id="'+prefix+'-'+tree.id+'" class="dd-item dd-parent" data-id="'+tree.id+'"><div class="dd-handle dd-toggle">' + tree.title + '</div>\n<ol class="dd-list">\n' : '<ol class="dd-list">\n';
		for (var i in tree.children) {
			html += treeToHTML(tree.children[i],prefix);
		}
		html += tree.title ? '</ol>\n</li>\n' : '</ol>\n';
	}
	else {
		html = '<li id="'+prefix+'-'+tree.id+'" data-id="'+tree.id+'" class="dd-item bookmark-item nonest"><div class="dd-handle">' + tree.title + '</div></li>\n';
	}
	return html;
}

// handle bookmark drag and drop changes
function handleBookmarkMove(e,changes) {
	
	var itemId = ''+$(changes.item).data('id');
	
	var fromRoot = changes.from.root.id === 'importexport-left' ? 'Chrome' : 'SB';
	var fromParentId = ($(changes.from.parent).data('id') || '0') + '';
	var fromIndex = changes.from.index;
	
	var toRoot = changes.to.root.id === 'importexport-left' ? 'Chrome' : 'SB';
	var toParentId = ($(changes.to.parent).data('id') || '0') + '';
	var toIndex = changes.to.index;
	
	// for moves between roots, ignore one change event (both lists change)
	if (fromRoot !== toRoot && e.currentTarget.id === changes.from.root.id) {
		return;
	}
	
	// this should never happen!
	if ((fromRoot === 'Chrome' && fromParentId === '0') || (toRoot === 'Chrome' && toParentId === '0')) {
		showErrorPage(ERROR.ILLEGAL_REQUEST);
		return;
	}
	
	// execute movement
	if (fromRoot !== toRoot) {
		// move between lists
		if (fromRoot === "Chrome") {
			// Chrome -> SB
			chrome.bookmarks.getSubTree(itemId,function(tree) {
				if (tree) {
					// swallow the next X remove events
					Chrome2SB(tree[0],{parentId:toParentId,index:toIndex},function(error) {
						if (error !== 0) {
							showErrorPage(error);
						}
					});
				}
				else {
					showErrorPage(ERROR.NOT_FOUND);
				}
			});
		}
		else {
			// SB -> Chrome
			messageBackground({
				type : 'getSubTree',
				id	 : itemId
			},function(tree) {
				if (tree) {
					// swallow the next X created events
					SB2Chrome(tree,{parentId:toParentId,index:toIndex},function(error) {
						if (error !== 0) {
							showErrorPage(error);
						}
					});
				}
				else {
					showErrorPage(ERROR.NOT_FOUND);
				}
			});
		}
	}
	else {
		// move within list
		if (fromRoot === "Chrome") {
			// moving within Chrome
			// swallow the next X moved events
			chrome.bookmarks.move(itemId, {
				parentId	: toParentId,
				index		: toIndex + (toParentId===fromParentId && toIndex > fromIndex ? 1 : 0)
			},function(movedNode) {});
		}
		else {
			// moving within SB
			messageBackground({
				type			: 'move',
				id				: itemId,
				destination	: {
					parentId	: toParentId,
					index		: toIndex
				}
			},function(node) {
				if (typeof(node)!=="object") {
					showErrorPage(node);
				}
			});
		}
	}
}

// create a copy of a SB tree item in Chrome
function Chrome2SB(tree,destination,onMoveComplete) {

	// extra safety mechanism: double-check that this item is not in the root folder
	if (tree.parentId === "0") {
		onMoveComplete(ERROR.ILLEGAL_REQUEST);
	}
	
	// request SB to create a duplicate of the Chrome bookmark
	messageBackground({
		type		: 'create',
		bookmark	: {
			title		: tree.title,
			url			: tree.url,
			parentId	: destination.parentId,
			index		: destination.index
		}
	},function(node) {
		if (typeof(node)!=="object") {
			// error during node creation -> return error value
			onMoveComplete(node);
		}
		else {
			// Adjust id of copied item to reflect new parent
			$('#chrome-'+tree.id)
				.attr('id','secbm-'+node.id)
				.data('id',node.id);
			
			// move all children, or signal that move was completed successfully
			if (tree.children && tree.children.length > 0) {
				$('#secbm-'+node.id).data({
					'callbackQueueLength'	: tree.children.length,
					'callbackError'			: 0
				});
				for (var i=tree.children.length-1; i>=0; i--) {					
					Chrome2SB(tree.children[i],{parentId: node.id, index: 0},function(error) {
						var listItem = $('#secbm-'+node.id);
						if (error!==0) {
							listItem.data('callbackError',error);
						}
						var queueLength = listItem.data('callbackQueueLength');
						listItem.data('callbackQueueLength',queueLength-1);
						if (queueLength-1==0) {
							error = listItem.data('callbackError');
							if (error===0) {
								chrome.bookmarks.removeTree(tree.id);
							}
							onMoveComplete(error);
						}
					});
				}
			}
			else {
				chrome.bookmarks.remove(tree.id);
				onMoveComplete(0);
			}
		}
	});
}

// create a copy of a SB tree item in Chrome
function SB2Chrome(tree,destination,onMoveComplete) {

	// extra safety mechanism: double-check that this item is not moved to root folder
	if (destination.parentId === "0") {
		onMoveComplete(ERROR.ILLEGAL_REQUEST);
	}
	
	chrome.bookmarks.create({
		title		: tree.title,
		url			: tree.url,
		parentId	: destination.parentId,
		index		: destination.index
	},function(node) {
		if (node) {
			// adjust id of copied item to reflect new parent
			$('#secbm-'+tree.id)
				.attr('id','chrome-'+node.id)
				.data('id',node.id);
				
			// move all children, or signal that move was completed successfully
			if (tree.children && tree.children.length > 0) {
				$('#chrome-'+node.id).data({
					'callbackQueueLength'	: tree.children.length,
					'callbackError'			: 0
				});
				for (var i=tree.children.length-1; i>=0; i--) {
					SB2Chrome(tree.children[i],{parentId: node.id, index: 0},function(error) {
						var listItem = $('#chrome-'+node.id);
						if (error!==0) {
							listItem.data('callbackError',error);
						}
						var queueLength = listItem.data('callbackQueueLength');
						listItem.data('callbackQueueLength',queueLength-1);
						if (queueLength-1==0) {
							// all children copied
							error = listItem.data('callbackError');
							if (error===0) {
								// all children copied successfully... time to remove the parent
								messageBackground({
									type : 'remove',
									id	 : tree.id
								},function(removed){
									if (typeof(removed) === "object") {
										// successful removal
										onMoveComplete(0);
									}
									else {
										// something went wrong when removing the original node
										onMoveComplete(removed);
									}
								});
							}
							onMoveComplete(error);
						}
					});
				}
			}
			else {
				messageBackground({
					type : 'remove',
					id	 : tree.id
				},function(removed){
					if (typeof(removed) === "object") {
						// do nothing
						onMoveComplete(0);
					}
					else {
						// something went wrong when removing the original node
						onMoveComplete(removed);
					}
				});
			}
		}
		else {
			onMoveComplete(ERROR.CHROME_CREATE_FAIL);
		}
	});
}

/*
 *  backup page specific functions
 */
 
function showTreeFormatted(tree) {
	var html;
	var mode = parseInt($('input[name=viewformat]:checked').val());
	switch(mode) {
		case 0: // plain
			html = treeToPlainText(tree);
			break;
		case 1: // links
			html = treeToHTMLLinks(tree);
			break;
		case 2: // html
			html = treeToHTMLCode(tree);
			break;
		case 3: // ubb:
			html = treeToUBBCode(tree);
			break;
	}
	$('#viewdatacontent').html(html);
}

function treeToPlainText(tree) {
	var html = '';
	if (tree.children) {
		html += '<span class="foldertitle">'+tree.title+'</span><ul class="viewtree-plaintext">';
		for (var i in tree.children) {
			html += '<li>' + treeToPlainText(tree.children[i]) + '</li>';
		}
		html+='</ul>';
	}
	else {
		html += '<span class="title">' + tree.title + '</span><span class="spacer"> - </span><span class="url">' + tree.url + '</span>';
	}
	return html;
}

function treeToHTMLLinks(tree) {
	var html = '';
	if (tree.children) {
		html += '<span class="foldertitle">'+tree.title+'</span><ul class="viewtree-links">';
		for (var i in tree.children) {
			html += '<li>' + treeToHTMLLinks(tree.children[i]) + '</li>';
		}
		html+='</ul>';
	}
	else {
		html += '<a href="'+tree.url+'" >' + tree.title + '</a>';
	}
	return html;
}

function treeToHTMLCode(tree) {
	var html = '';
	if (tree.children) {
		html += '<ul class="viewtree-html"><li><span class="foldertitle">' + tree.title + '</li><li>&lt;ul&gt;</li></span>';
		for (var i in tree.children) {
			html += '<li>&lt;li&gt;' + treeToHTMLCode(tree.children[i]) + '&lt;/li&gt;</li>';
		}
		html+='&lt;/ul&gt;</ul>';
	}
	else {
		html += '<div>&lt;a href="'+tree.url+'"&gt;' + tree.title + '&lt;/a&gt;</div>';
	}
	return html;
}

function treeToUBBCode(tree) {
	var html = '';
	if (tree.children) {
		html += '<br/><span class="foldertitle">' + tree.title + '</span><br/>[ul]<ul class="viewtree-ubb">';
		for (var i in tree.children) {
			html += '<li>[li]' + treeToUBBCode(tree.children[i]) + '[/li]</li>';
		}
		html+='[/ul]</ul>';
	}
	else {
		html += '<div>[url='+tree.url+']' + tree.title + '[/url]</div>';
	}
	return html;
}

/*
 *  General minor functions
 */
 function showErrorPage(code) {
	if (typeof(code) === "undefined") {
		code = ERROR.UNKNOWN_ERROR;
	}
	_errorCode = code;
	setPage('error');
}

function formerror(msg,src) {
	createBox('formerror',msg,src);
}

function formsuccess(msg,src) {
	createBox('formsuccess',msg,src);
}

function createBox(cls,msg,src) {
	var srcEl = $('#'+src);
	var offset = srcEl.offset();
	offset.left += srcEl.width() + 20;
	var errEl = $('<p>').addClass("messagebox "+cls).html(msg).offset(offset);
	$(document.body).append(errEl);
	errEl.fadeOut(3000,function() {
		$(this).remove();
	});
}