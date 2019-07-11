
agGrid.initialiseAgGridWithAngular1(angular);

var module = angular.module("example", ["agGrid"]);

module.controller("exampleCtrl", function($scope, $http) {

    var columnDefs = [
        {headerName: "Athlete", field: "athlete", width: 150, cellRenderer: athleteCellRendererFunc},
        {headerName: "Age", field: "age", width: 90, cellRenderer: ageCellRendererFunc},
        {headerName: "Country", field: "country", width: 160, cellRenderer: countryCellRendererFunc},
        {headerName: "Selected", width: 120, cellRenderer: selectedCellRendererFunc},
        {headerName: "Year", field: "year", width: 90},
        {headerName: "Date", field: "date", width: 110},
        {headerName: "Sport", field: "sport", width: 110},
        {headerName: "Gold", field: "gold", width: 100},
        {headerName: "Silver", field: "silver", width: 100},
        {headerName: "Bronze", field: "bronze", width: 100},
        {headerName: "Total", field: "total", width: 100}
    ];

    $scope.gridOptions = {
        columnDefs: columnDefs,
        rowData: null,
        angularCompileRows: true,
        rowSelection: 'multiple',
        onFirstDataRendered(params) {
            params.api.sizeColumnsToFit();
        }
    };

    $scope.selectUnitedStatesNodes = function () {
        $scope.gridOptions.api.forEachNode(function (node) {
            if (node.data.country === "United States") {
                node.setSelected(true);
            }
        });
    };

    function ageClicked(age) {
        window.alert("Age clicked: " + age);
    }

    function athleteCellRendererFunc() {
        return '<span ng-bind="data.athlete"></span>';
    }

    function ageCellRendererFunc(params) {
        params.$scope.ageClicked = ageClicked;
        return '<button ng-click="ageClicked(data.age)" ng-bind="data.age"></button>';
    }

    function countryCellRendererFunc(params) {
        return '<country name="'+params.value+'"></country>';
    }

    function selectedCellRendererFunc() {
        return '<span ng-if="rowNode.selected">Selected</span><span ng-if="!rowNode.selected">Not Selected</span>';
    }

    $http.get("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json")
        .then(function(res){
            $scope.gridOptions.api.setRowData(res.data);
        });
});

module.directive('country', function () {

    var FLAG_CODES = {
        'Great Britain': 'gb',
        'Ireland': 'ie',
        'United States': 'us',
        'Russia': 'ru',
        'Australia': 'au',
        'Canada': 'ca',
        'Norway': 'no',
        'China': 'cn',
        'Zimbabwe': 'zw',
        'Netherlands': 'nl',
        'South Korea': 'kr',
        'Croatia': 'hr',
        'France': 'fr'
    };

    var flagHtml = '<img ng-show="flagCode" class="flag" border="0" width="20" height="15" src="https://flags.fmcdn.net/data/flags/mini/{{flagCode}}.png" />';
    var nameHtml = '<span ng-bind="countryName" />';

    return {
        scope: true,
        template: flagHtml + ' ' + nameHtml,
        link: function(scope, element, attrs) {
            var countryName = attrs.name;
            scope.countryName = countryName;
            scope.flagCode = FLAG_CODES[countryName];
        }
    };
});
