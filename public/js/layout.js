/**
 * Created by fritz on 1/3/14.
 */

$(function () {
	// show message
	var message = $.cookie('message');
	$.removeCookie('message');
	if (message) alertify.log(message);
});
