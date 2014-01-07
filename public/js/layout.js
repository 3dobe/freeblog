/**
 * Created by fritz on 1/3/14.
 */

$(function () {
	// show message
	var message = $.cookie('message');
	if (message) alertify.log(message, '', 0);
	$.removeCookie('message', { path: '/' });

	// moment date
	$('.moment').each(function(i, el){
		var $el = $(el), date = $el.attr('data-date'),
			//myMoment = moment(date).format('YYYY-MM-DD HH:mm:ss');
			myMoment = moment(date).fromNow();
		$el.text(myMoment);
	});
});
