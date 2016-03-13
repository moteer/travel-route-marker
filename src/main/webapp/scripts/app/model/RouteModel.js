function Route(titel) {
	var routeParts = [];
	var titel;

	(function init(titel, obj) {
		obj.titel = titel;
	})(titel, this);

	this.getRouteParts = function() {
		return routeParts;
	}

	this.addRoutePart = function (routePart) {
		routeParts.push(routePart);
	}
}

function Content(description, image) {
	
	var description, image;

	(function init(description, image, obj) {
		obj.description = description;
		obj.image = image;
	})(description, image, this);


	this.toString = function() {
		return this.description + " | " + this.image
	}	
}

function TimePeriod() {

}

function GeoCoordinates() {

}

function GeoCoordinate() {

}

function RoutePart(content) {

	var content;

	(function init(content, obj) {
		obj.content = content;
	})(content, this);


	this.toString = function() {
		return this.content.toString();
	}
}