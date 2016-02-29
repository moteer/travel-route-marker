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
        routeParts.getMap().forEach(function (value, key, map) {
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

    this.selectOn = function (multiPolyLine) {

        var routePartRow = document.getElementById(multiPolyLine.getLatLngs().toString());
        routePartRow.deleteCell(1);
        routePartRow.deleteCell(1);
        routePartRow.deleteCell(1);

        var content = routeParts.getRoutePartElementFor(multiPolyLine.getLatLngs().toString());
        routePartRow.insertCell(1).innerHTML = '<input type="text" id="description" value="' + content.getDescription() + '"/>';

        routePartRow.insertCell(2).innerHTML = '<input type="text" id="image" value="' + content.getImage() + '"/>';
        routePartRow.insertCell(3).innerHTML = '<button id="save">save</button>';
    };

    this.addEmptyRoutePart = function (multiPolyLine) {
        this.addRoutePart(multiPolyLine, new Content(undefined, undefined));
        updateTable();
        //setSelectionOn(multiPolyLine);
    };

    this.addRoutePart = function (multiPolyLine, content) {
        routeParts.saveRoutePartElement(multiPolyLine.getLatLngs().toString(), content);
        insertRowWithContentIntoTable(multiPolyLine.getLatLngs().toString(), content);
    };
}

var controller = new Controller();
