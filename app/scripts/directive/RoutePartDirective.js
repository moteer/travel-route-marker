mapApp
    .directive('routePart', function () {
        return {
            restrict:'E',
            scope: {
                images: "=images"
            },
            templateUrl: "/app/partials/templates/route-part-table-row.html"
        };
    });
