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
    if (object && callback) {
        var keys = Object.keys(object);
        for (var k in keys) {
            callback(object[keys[k]], keys[k]);
        }
    }
})
