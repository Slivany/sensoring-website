(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['sensors'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <tr><td>"
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "</td><td>"
    + alias4(((helper = (helper = helpers.humidity || (depth0 != null ? depth0.humidity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"humidity","hash":{},"data":data}) : helper)))
    + "%</td><td>"
    + alias4(((helper = (helper = helpers.temperature || (depth0 != null ? depth0.temperature : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"temperature","hash":{},"data":data}) : helper)))
    + "°C</td></tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table>\r\n  <thead><tr><th>Time</th><th>Humidity</th><th>Temperature</th></tr></thead>\r\n<tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.sensors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</tbody>\r\n</table>";
},"useData":true});
})();