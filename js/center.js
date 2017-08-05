jQuery.fn.center = function() {
	this.offset({
		top: this.parent().position().top + this.parent().height() / 2 - this.outerHeight() / 2,
		left: this.parent().width() / 2 - this.outerWidth() / 2
	})

    return this;
}

var autoScrollTimeout;
var autoScrollDown;

$(function() {
	setTimeout(function() {
		$(window).scrollTop(0);
	}, 0);

	centerElements();

	$(window).resize(function() {
		centerElements();
		autoScroll();
	});

	$(window).mousewheel(function(event) {
		$("body").scrollTop($(window).scrollTop() - event.deltaY * event.deltaFactor);
		$("body").stop()

		clearTimeout(autoScrollTimeout);
		autoScrollTimeout = setTimeout(autoScroll, 300);
		autoScrollDown = event.deltaY < 0;
	});
});

const autoScrollThreshold = 0.35;

function autoScroll() {
	var scrollRatio = $(window).scrollTop() / $(window).height() % 1;

	console.log(scrollRatio);

	if (autoScrollDown && scrollRatio >= autoScrollThreshold) {
		$("body").stop().animate({ scrollTop: Math.ceil($(window).scrollTop() / $(window).height()) * $(window).height() }, 1000, "easeOutBounce");
	}
	else if (!autoScrollDown && scrollRatio <= 1 - autoScrollThreshold) {
		$("body").stop().animate({ scrollTop: Math.floor($(window).scrollTop() / $(window).height()) * $(window).height() }, 1000, "easeOutBounce");
	} 
	else {
		$("body").stop().animate({ scrollTop: Math.round($(window).scrollTop() / $(window).height()) * $(window).height() }, 1000, "easeOutBounce");
	}
}

function centerElements() {
	$face = $("#face");
	$face.height(Math.floor($("#face-text-container").height() / 2) * 2);
	$face.width($face.height());

	$(".content").each(function() {
		$(this).center();
	});
}