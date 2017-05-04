(function () {
    "use strict";
    'use strict';


    var app = angular.module('viewCustom', ['angularLoad']);
	
// Add Clickable Logo
app.controller('prmLogoAfterController', [function () {
var vm = this;
vm.getIconLink = getIconLink;
function getIconLink() {
              return vm.parentCtrl.iconLink;
             }
}]);
 
app.component('prmLogoAfter',{
bindings: {parentCtrl: '<'},
controller: 'prmLogoAfterController',
template: '<div class="product-logo product-logo-local" layout="row" layout-align="start center" layout-fill id="banner" tabindex="0" role="banner">' +
'<a href="http://library.centralia.edu/">' +
'<img class="logo-image" alt="{{::(&apos;nui.header.LogoAlt&apos; | translate)}}" ng-src="{{$ctrl.getIconLink()}}"/></a></div>'
});

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/

	function addProxy() {
  // This function does not handle the on-campus/off-campus check box in the Institution wizard (i.e. it adds the proxy even if the user is on-campus)
  app.controller('prmServiceLinksAfterController', [function() {
      var vm = this;
      var parentCtrl = vm.parentCtrl;
      var baseURLsTable = window.appConfig['mapping-tables']['Institution Base URLs'];
      var instCode = window.appConfig['primo-view'].institution['institution-code'];
      var baseURL = 'proxy_prefix';
      vm.$onInit = function() {
        var pnxRecord = vm.parentCtrl.item.pnx;
        var proxyAll = 'N';
        var proxy = '';
        // find the proxy URL
        angular.forEach(baseURLsTable, function(value, key) {
            if (value.source1 == instCode && value.source2 == baseURL) {
              proxy = value.target;
              if (typeof value.source4 =='undefined' && value.source4 == 'Y') {
                proxyAll = 'Y';
  }
              }
            });
          if (parentCtrl.item.context == "PC") {
            //Primo Central record; proxy candidate
            if (proxyAll == 'Y' || typeof pnxRecord.addata.oa == 'undefined' || pnxRecord.addata.oa[0] != 'free_for_read') {
              // No addata/oa or addata/oa does not contain "free_for_read"; proxy
              angular.forEach(parentCtrl.recordLinks, function(value, key) {
                value.linkURL = proxy + value.linkURL;
              });
            }
          }
        };
      }]);
    app.component('prmServiceLinksAfter', {
      bindings: {
        parentCtrl: '<'
      },
      controller: 'prmServiceLinksAfterController',
    });
  }
  addProxy();

})();



