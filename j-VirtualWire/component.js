COMPONENT('virtualwire', 'selector:.virtualwire', function(self, config) {

	var old, waiter;

	self.restore = function() {
		if (old) {
			for (var i = 0; i < self.dom.children.length; i++) {
				var child = self.dom.children[i];
				old[0].appendChild(child);
			}
			var exec = old.attrd('out');
			exec && EXEC(exec);
			old = null;
		}
	};

	self.backup = function(el) {

		if (!el || !el.length) {
			self.restore();
			return;
		}

		if (old && old[0] === el[0])
			return;

		self.restore();

		var children = el[0].children;
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			self.dom.appendChild(child);
		}

		old = el;
		var exec = el.attrd('in');
		exec && EXEC(exec);
	};

	self.load = function(value) {
		waiter && clearTimeout(waiter);
		waiter = null;
		var el = $(config.selector + '[data-if="' + value + '"]');
		if (el.length)
			self.backup(el);
		else
			waiter = setTimeout(self.load, 100, value);
	};

	self.setter = function(value) {

		self.restore();

		if (!value)
			return;

		waiter &&clearTimeout(waiter);
		self.load(value);
	};

});