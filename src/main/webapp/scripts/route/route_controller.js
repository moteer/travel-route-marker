function Controller() {

    function insertContentIntoRow(row, multiPolyLine, content) {
        row.insertCell(0).innerHTML = multiPolyLine.getLatLngs().toString();
        row.insertCell(1).innerHTML = content.getDescription();
        row.insertCell(2).innerHTML = content.getImage();
        row.insertCell(3).innerHTML = '<button id="edit">edit</button><button id="delete">delete</button>';
    }

    function insertRowIntoTable(multiPolyLine) {
        var routePartList = document.getElementById("routePartTable");
        var row = routePartList.insertRow(routePartList.rows.length);
        row.id = multiPolyLine.getLatLngs().toString();
        return row;
    }

    function insertRowWithContentIntoTable(multiPolyLine, content) {
        var row = insertRowIntoTable(multiPolyLine);
        insertContentIntoRow(row, multiPolyLine, content);
    }

    this.showEditRowForNewSelection = function (multiPolyLine) {
        var row = insertRowIntoTable(multiPolyLine);
        row.insertCell(0).innerHTML = multiPolyLine.getLatLngs().toString();
        row.insertCell(1).innerHTML = '<input type="text" id="description"/>';
        row.insertCell(2).innerHTML = '<input type="text" id="image"/>';
        row.insertCell(3).innerHTML = '<button id="save">save</button>';
    };

    this.addRoutePart = function (multiPolyLine, content) {
        routeParts.add(multiPolyLine, content);
        insertRowWithContentIntoTable(multiPolyLine, content);
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

    function updateTable() {
        var routePartTable = document.getElementById("routePartTable");
        for (var i = routePartTable.rows.length - 1; i > 0; i--) {
            routePartTable.deleteRow(i);
        }
    }

    this.clear = function () {
        routeParts.clear();
        updateTable();
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
