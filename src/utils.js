const decode = data => decodeURIComponent(data.replace(/\+/g, " "));

module.exports = decode;
