/**
 * Created by fritz on 1/5/14.
 */
$(function () {
	// toggle input type
	$('.fields').delegate('.field .type', 'change', function () {
		var $select = $(this), type = $select.val();
		$select.children('option').removeAttr('selected')
			.filter('[value="' + type + '"]').attr('selected', true);
		$select.parent('.field').find('.choice').removeClass('active')
			.filter('.' + type).addClass('active');
	});

	// append field
	$('.add').on('click', function () {
		var $lastField = $(this).siblings('.fields').find('.field').last(),
			$clone = $lastField.clone();
		$clone.find('input, textarea').each(function (i, el) {
			$(el).val($(el).attr('value'));
		});
		$lastField.after($clone);
	});

	$('#request').on('submit', function () {
		var $form = $(this);
		// set form action
		$form.attr('action', $form.find('.url').val());
		// set field name
		$form.find('.field').each(function (i, el) {
			var $el = $(el), key = $el.find('.key').val();
			$el.find('.choice:visible').attr('name', key);
		});
	});
});
