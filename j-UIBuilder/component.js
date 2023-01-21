COMPONENT('uibuilder', function(self, config, cls) {

	self.make = function() {
		self.aclass(cls);
		config.url && AJAX('GET ' + config.url, self.load);
	};

	self.load = function(data) {

		if (!data || data instanceof Array || typeof(data) !== 'object')
			return;

		data.id = self.ID;
		UIBuilder.build(self.element, data, function(response) {

			response.component = self;

			if (config.id)
				response.id = config.id;

			self.app = response;
			config.app && self.SEEX(config.app, response);
		});
	};

	self.setter = function(value) {
		if (value) {
			if (typeof(value) === 'string')
				AJAX('GET ' + value, self.load);
			else
				self.load(value);
		} else if (self.app) {
			self.app.remove();
			self.app = null;
			config.app && self.SEEX(config.app, null);
		}
	};

}, ['https://cdn.componentator.com/uibuilder.min@1.js']);