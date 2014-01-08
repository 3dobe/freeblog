/**
 * Created by fritz on 1/5/14.
 */
$(function () {
	var $fields = $('.fields');

	// toggle input type
	$fields.delegate('.field .type', 'change', function () {
		var $select = $(this), type = $select.val();
		$select.children('option').removeAttr('selected')
			.filter('[value="' + type + '"]').attr('selected', true);
		$select.parents('.field').find('.choice').removeClass('active')
			.filter('.' + type).addClass('active');
	});

	// append field
	$('.add').on('click', function () {
		var $lastField = $fields.find('.field').last(),
			$clone = $lastField.clone();
		$clone.find('.choice').each(function (i, el) {
			$(el).val($(el).attr('value'));
		});
		$lastField.after($clone);
	});

	$('#request').on('submit', function () {
		var $form = $(this);
		// set form action
		$form.attr('action', $form.find('.url').val());
		// set field names
		$form.find('.field').each(function (i, el) {
			var $el = $(el), key = $el.find('.key').val();
			if (key) {
				$el.find('.choice.active').attr('name', key);
			}
		});
	});
});
