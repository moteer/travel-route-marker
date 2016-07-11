mapApp
    .directive('routePart', function () {
        return {
            restrict:'A',
            scope: {
                images: "=images"
            },
            templateUrl: "/app/partials/templates/route-part-table-row.html"
        };
    });
