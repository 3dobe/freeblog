/**
 * Created by fritz on 1/5/14.
 */
$(function(){
	$('.fields').delegate('.field .type', 'change', function(){
		var $select = $(this);
		$select.parent('.field').attr('data-type', $select.val());
	});
});
