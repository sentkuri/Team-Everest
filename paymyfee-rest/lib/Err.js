function Err(code, message, err) {
    this.code = code;
    this.message = message;
    this.err = err;
}
module.exports = function(code, msg, err) {
    return new Err(code, msg, err);
};
