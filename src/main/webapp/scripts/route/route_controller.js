function Controller() {

    function insertContentIntoRow(row, multiPolyLineString, content) {
        row.insertCell(0).innerHTML = multiPolyLineString;
        row.insertCell(1).innerHTML = content.getDescription();
        row.insertCell(2).innerHTML = content.getImage();
        row.insertCell(3).innerHTML = '<button id="edit">edit</button><button id="delete">delete</button>';
    }

    function insertRowIntoTable(multiPolyLineString) {
        var routePartList = document.getElementById("routePartTable");
        var row = routePartList.insertRow(routePartList.rows.length);
        row.id = multiPolyLineString;
        return row;
    }

    function insertRowWithContentIntoTable(multiPolyLineString, content) {
        var row = insertRowIntoTable(multiPolyLineString);
        insertContentIntoRow(row, multiPolyLineString, content);
    }

    function updateTable() {
        deleteAllEntriesFromTable();
        //TODO: define callback without getting the map
        routeParts.getMap().forEach(function(value, key, map) {
            insertRowWithContentIntoTable(key, value);
        });
    }


    //TODO: implement remove method
    this.remove = undefined;

    function deleteAllEntriesFromTable() {
        var routePartTable = document.getElementById("routePartTable");
        for (var i = routePartTable.rows.length - 1; i > 0; i--) {
            routePartTable.deleteRow(i);
        }
    }

    this.clearAllRoutePartElements = function () {
        routeParts.clearAllRoutePartElements();
        deleteAllEntriesFromTable();
    };

    this.showEditRowForNewSelection = function (multiPolyLine) {
        updateTable();
        var row = insertRowIntoTable(multiPolyLine.getLatLngs().toString());
        row.insertCell(0).innerHTML = multiPolyLine.getLatLngs().toString();
        row.insertCell(1).innerHTML = '<input type="text" id="description"/>';
        row.insertCell(2).innerHTML = '<input type="text" id="image"/>';
        row.insertCell(3).innerHTML = '<button id="save">save</button>';
    };

    this.addRoutePart = function (multiPolyLine, content) {
        routeParts.saveRoutePartElement(multiPolyLine.getLatLngs().toString(), content);
        insertRowWithContentIntoTable(multiPolyLine.getLatLngs().toString(), content);
    };

    this.addEmptyRoutePart = function (multiPolyLine) {
        this.addRoutePart(multiPolyLine, new Content(undefined, undefined));
    };

}

var controller = new Controller();
