/* eslint strict: 0 */
"use strict";

/*
 * This is a separate file for two reasons:
 * 1. CSP policy does not allow inline javascript
 * 2. It has to be a small javascript executed before all other scripts,
 *    so that the timeout can be triggered while slow JS is loading
 */

function displayReload() {
	var loadingReload = document.getElementById("loading-reload");
	if (loadingReload) {
		loadingReload.style.display = "block";
	}
}

var loadingSlowTimeout = setTimeout(function() {
	var loadingSlow = document.getElementById("loading-slow");

	if (loadingSlow) {
		loadingSlow.style.display = "block";
	}

	displayReload();
}, 5000);

document.getElementById("loading-reload").addEventListener("click", function() {
	location.reload();
});

window.g_LoungeErrorHandler = function LoungeErrorHandler(e) {
	var title = document.getElementById("loading-title");
	title.textContent = "An error has occured";

	var message = document.getElementById("loading-page-message");
	message.textContent = "An error has occured that prevented the client from loading correctly.";

	var summary = document.createElement("summary");
	summary.textContent = "More details";

	var data = document.createElement("pre");
	if (e instanceof ErrorEvent) {
		data.textContent = e.error && e.error.stack ? e.error.stack : e.message;
	}

	var info = document.createElement("p");
	info.textContent = "Open your browser developer tools for more information.";

	var details = document.createElement("details");
	details.appendChild(summary);
	details.appendChild(data);
	details.appendChild(info);
	message.parentNode.insertBefore(details, message.nextSibling);

	window.clearTimeout(loadingSlowTimeout);
	displayReload();
};

window.addEventListener("error", window.g_LoungeErrorHandler);
