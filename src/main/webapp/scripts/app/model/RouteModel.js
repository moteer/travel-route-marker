function Route(titel) {
	var routeParts = [];
	this.titel=titel;

	this.getRouteParts = function() {
		return routeParts;
	}

	this.addRoutePart = function (routePart) {
		routeParts.push(routePart);
	}
}

function Content(description, image) {
	
	this.description=description;
	this.image=image;

	this.toString = function() {
		return this.description + " | " + this.image
	}	
}

function TimePeriod() {

}

function GeoCoordinates() {
	this.geoCoordinates = [];

	for (var i=0; i<arguments[0].length; i++) {
		this.geoCoordinates.push(new GeoCoordinate(arguments[0][i]));
	}
}

function GeoCoordinate(latLng) {
	this.lat = latLng.lat;
	this.lng = latLng.lng;
}

function RoutePart(content, geoCoordinates) {
	this.content = content;
	this.geoCoordinates = geoCoordinates;


	this.toString = function() {
		return this.content.toString();
	}
}
