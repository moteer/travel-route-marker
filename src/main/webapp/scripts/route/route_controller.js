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
        routeParts.getMap().forEach(function(value, key, map) {
            insertRowWithContentIntoTable(key, value);
        });
    }

    this.showEditRowForNewSelection = function (multiPolyLine) {
        updateTable();
        var row = insertRowIntoTable(multiPolyLine.getLatLngs().toString());
        row.insertCell(0).innerHTML = multiPolyLine.getLatLngs().toString();
        row.insertCell(1).innerHTML = '<input type="text" id="description"/>';
        row.insertCell(2).innerHTML = '<input type="text" id="image"/>';
        row.insertCell(3).innerHTML = '<button id="save">save</button>';
    };

    this.addRoutePart = function (multiPolyLine, content) {
        routeParts.add(multiPolyLine, content);
        insertRowWithContentIntoTable(multiPolyLine.getLatLngs().toString(), content);
    };

    //TODO: implement remove method
    this.remove = undefined;

    this.select = function (multiPolyLine) {
        var descriptionTextBox = document.getElementById("descriptionTextBox");
        descriptionTextBox.style.visibility = "visible";
        descriptionTextBox.value = routeParts.getContentFor(multiPolyLine).getDescription();

        var image = document.getElementById("image");
        image.style.visibility = "visible";

        var latLng = document.getElementById("latLng");
        latLng.innerHTML = multiPolyLine.getLatLngs().toString();
        updateRoutePartList();
    };

    function deleteAllEntriesFromTable() {
        var routePartTable = document.getElementById("routePartTable");
        for (var i = routePartTable.rows.length - 1; i > 0; i--) {
            routePartTable.deleteRow(i);
        }
    }

    this.clear = function () {
        routeParts.clear();
        deleteAllEntriesFromTable();
    };
}

var controller = new Controller();


//
//function updateRoutePartList() {
//    clearRoutePartList();
//    routeParts.getMap().forEach(function (value, key, map) {
//        addNewListEntrie(key, value);
//    });
//}
