mapApp
    .directive('routePart', function () {
        return {
            restrict:'A',
            scope: {
                currentlySelected: "=currentlySelected",
                description: "=description"
            },
            templateUrl: "/app/partials/templates/route-part-table-row.html"
        };
    });
