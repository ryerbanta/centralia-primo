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

// Google Analytics with Adjust virtual location (simulation of GET search request) 
var src = "";
var qry = "";
var s = "" + window.location.search;
var sr0 = s.split("vl(freeText0)=");
if (sr0.length > 1) qry = qry + ((qry.length == 0)? "&query=" : "+") + sr0[1].split("&")[0];
var sr1 = s.split("vl(freeText1)=");
if (sr1.length > 1) qry = qry + ((qry.length == 0)? "&query=" : "+") + sr1[1].split("&")[0];
var sr2 = s.split("vl(freeText2)=");
if (sr2.length > 1) qry = qry + ((qry.length == 0)? "&query=" : "+") + sr2[1].split("&")[0];
if (qry.length > 0) src = window.location.pathname + window.location.search + qry;
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-98618003-1']); 
if (src == "") _gaq.push(['_trackPageview']);
else _gaq.push(['_trackPageview',src])        
_gaq.push(['_setDomainName', 'none']);
_gaq.push(['_setAllowLinker', true]);
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript';
ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s); 
})();



