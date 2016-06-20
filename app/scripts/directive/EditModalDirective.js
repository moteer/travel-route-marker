mapApp.directive('editModal', function () {
        return {
            template: '<div><script type="text/ng-template" id="myModalContent.html"><h3>I m a modal ODER WAS !</h3>' +
            '<input type="text" ng-model="selected.city"/>' +
            '<input type="text" ng-model="selected.titel"/>' +
            '<input type="text" ng-model="selected.description"/>' +
            '<p>Selected: <b>{{ selected.item }}</b></p>' +
            '<button class="button" ng-click="ok()">OK</button>' +
            '<a class="close-reveal-modal" ng-click="cancel()">&#215;</a>' +
            '</script>' +
            '<button class="button" ng-click="open()">Open me!</button>' +
            '<div ng-show="selected">Selection from a modal: {{ selected }}</div>' +
            '</div>',
            restrict: 'E',
            transclude: true,
            replace: true,
            //scope: {
            //    visible: '=', onSown: '&', onHide: '&'
            //}
        }
    }
);
