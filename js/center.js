jQuery.fn.center = function () {
	this.offset({
		top: this.parent().position().top + this.parent().height() / 2 - this.outerHeight() / 2,
		left: this.parent().width() / 2 - this.outerWidth() / 2
	})

    return this;
}

$(function() {
	$(".content").each(function() {
		$(this).center();
	});

	$(window).resize(function() {
		$(".content").each(function() {
			$(this).center();
		});
	});
});