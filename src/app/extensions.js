Object.merge = (!!Object.merge ? Object.merge : function() {
    var mergeInto = arguments[0];
    var mergeFromCollection = Array.prototype.slice.call(arguments, 1);
    for (var f in mergeFromCollection) {
        var mergeFrom = mergeFromCollection[f];
        for (var attrname in mergeFrom) {
            mergeInto[attrname] = mergeFrom[attrname];
        }
    }
});

Object.each = (!!Object.each ? Object.each : function(object, callback) {
    if (callback) {
        var obj = object || {};
        var keys = Object.keys(obj);
        for (var k in keys) {
            callback(obj[keys[k]], keys[k]);
        }
    }
})
