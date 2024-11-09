import nslookup from "nslookup";
import debug$0 from "debug";
("use strict");
var debug = debug$0("is-porn");
var OPENDNS_IPS = [/67\.215\.65.\d{3}/gi, /146\.112\.61\.\d{3}/gi];
var isOpenDNS = function (ip) {
  return OPENDNS_IPS.some(function (regexp) {
    debug("trying", regexp);
    return regexp.test(ip);
  });
};
var isPorn = function (domain, callback) {
  nslookup(domain)
    .server("208.67.222.123")
    .type("a")
    .timeout(10 * 1000)
    .end(function (error, address) {
      if (error) return callback(error, null);
      debug("got ip", address[0], "for", domain);
      return callback(null, isOpenDNS(address[0]));
    });
};
export default isPorn;
