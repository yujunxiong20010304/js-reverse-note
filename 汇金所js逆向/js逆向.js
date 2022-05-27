/* https://www.hfax.com/login.html#/?rsrc=https%3A%2F%2Fwww.hfax.com%2Faccount.html%23%2F*/
    var r = r || function(t, e) {
        var n = {}
          , r = n.lib = {}
          , o = function() {}
          , i = r.Base = {
            extend: function(t) {
                o.prototype = this;
                var e = new o;
                return t && e.mixIn(t),
                e.hasOwnProperty("init") || (e.init = function() {
                    e.$super.init.apply(this, arguments)
                }
                ),
                e.init.prototype = e,
                e.$super = this,
                e
            },
            create: function() {
                var t = this.extend();
                return t.init.apply(t, arguments),
                t
            },
            init: function() {},
            mixIn: function(t) {
                for (var e in t)
                    t.hasOwnProperty(e) && (this[e] = t[e]);
                t.hasOwnProperty("toString") && (this.toString = t.toString)
            },
            clone: function() {
                return this.init.prototype.extend(this)
            }
        }
          , a = r.WordArray = i.extend({
            init: function(t, e) {
                t = this.words = t || [],
                this.sigBytes = void 0 != e ? e : 4 * t.length
            },
            toString: function(t) {
                return (t || c).stringify(this)
            },
            concat: function(t) {
                var e = this.words
                  , n = t.words
                  , r = this.sigBytes;
                if (t = t.sigBytes,
                this.clamp(),
                r % 4)
                    for (var o = 0; o < t; o++)
                        e[r + o >>> 2] |= (n[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 24 - (r + o) % 4 * 8;
                else if (65535 < n.length)
                    for (o = 0; o < t; o += 4)
                        e[r + o >>> 2] = n[o >>> 2];
                else
                    e.push.apply(e, n);
                return this.sigBytes += t,
                this
            },
            clamp: function() {
                var e = this.words
                  , n = this.sigBytes;
                e[n >>> 2] &= 4294967295 << 32 - n % 4 * 8,
                e.length = t.ceil(n / 4)
            },
            clone: function() {
                var t = i.clone.call(this);
                return t.words = this.words.slice(0),
                t
            },
            random: function(e) {
                for (var n = [], r = 0; r < e; r += 4)
                    n.push(4294967296 * t.random() | 0);
                return new a.init(n,e)
            }
        })
          , s = n.enc = {}
          , c = s.Hex = {
            stringify: function(t) {
                var e = t.words;
                t = t.sigBytes;
                for (var n = [], r = 0; r < t; r++) {
                    var o = e[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                    n.push((o >>> 4).toString(16)),
                    n.push((15 & o).toString(16))
                }
                return n.join("")
            },
            parse: function(t) {
                for (var e = t.length, n = [], r = 0; r < e; r += 2)
                    n[r >>> 3] |= parseInt(t.substr(r, 2), 16) << 24 - r % 8 * 4;
                return new a.init(n,e / 2)
            }
        }
          , u = s.Latin1 = {
            stringify: function(t) {
                var e = t.words;
                t = t.sigBytes;
                for (var n = [], r = 0; r < t; r++)
                    n.push(String.fromCharCode(e[r >>> 2] >>> 24 - r % 4 * 8 & 255));
                return n.join("")
            },
            parse: function(t) {
                for (var e = t.length, n = [], r = 0; r < e; r++)
                    n[r >>> 2] |= (255 & t.charCodeAt(r)) << 24 - r % 4 * 8;
                return new a.init(n,e)
            }
        }
          , f = s.Utf8 = {
            stringify: function(t) {
                try {
                    return decodeURIComponent(escape(u.stringify(t)))
                } catch (t) {
                    throw Error("Malformed UTF-8 data")
                }
            },
            parse: function(t) {
                return u.parse(unescape(encodeURIComponent(t)))
            }
        }
          , l = r.BufferedBlockAlgorithm = i.extend({
            reset: function() {
                this._data = new a.init,
                this._nDataBytes = 0
            },
            _append: function(t) {
                "string" == typeof t && (t = f.parse(t)),
                this._data.concat(t),
                this._nDataBytes += t.sigBytes
            },
            _process: function(e) {
                var n = this._data
                  , r = n.words
                  , o = n.sigBytes
                  , i = this.blockSize
                  , s = o / (4 * i)
                  , s = e ? t.ceil(s) : t.max((0 | s) - this._minBufferSize, 0);
                if (e = s * i,
                o = t.min(4 * e, o),
                e) {
                    for (var c = 0; c < e; c += i)
                        this._doProcessBlock(r, c);
                    c = r.splice(0, e),
                    n.sigBytes -= o
                }
                return new a.init(c,o)
            },
            clone: function() {
                var t = i.clone.call(this);
                return t._data = this._data.clone(),
                t
            },
            _minBufferSize: 0
        });
        r.Hasher = l.extend({
            cfg: i.extend(),
            init: function(t) {
                this.cfg = this.cfg.extend(t),
                this.reset()
            },
            reset: function() {
                l.reset.call(this),
                this._doReset()
            },
            update: function(t) {
                return this._append(t),
                this._process(),
                this
            },
            finalize: function(t) {
                return t && this._append(t),
                this._doFinalize()
            },
            blockSize: 16,
            _createHelper: function(t) {
                return function(e, n) {
                    return new t.init(n).finalize(e)
                }
            },
            _createHmacHelper: function(t) {
                return function(e, n) {
                    return new p.HMAC.init(t,n).finalize(e)
                }
            }
        });
        var p = n.algo = {};
        return n
    }(Math);
    !function() {
        var t = r
          , e = t.lib.WordArray;
        t.enc.Base64 = {
            stringify: function(t) {
                var e = t.words
                  , n = t.sigBytes
                  , r = this._map;
                t.clamp(),
                t = [];
                for (var o = 0; o < n; o += 3)
                    for (var i = (e[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (e[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | e[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, a = 0; 4 > a && o + .75 * a < n; a++)
                        t.push(r.charAt(i >>> 6 * (3 - a) & 63));
                if (e = r.charAt(64))
                    for (; t.length % 4; )
                        t.push(e);
                return t.join("")
            },
            parse: function(t) {
                var n = t.length
                  , r = this._map
                  , o = r.charAt(64);
                o && -1 != (o = t.indexOf(o)) && (n = o);
                for (var o = [], i = 0, a = 0; a < n; a++)
                    if (a % 4) {
                        var s = r.indexOf(t.charAt(a - 1)) << a % 4 * 2
                          , c = r.indexOf(t.charAt(a)) >>> 6 - a % 4 * 2;
                        o[i >>> 2] |= (s | c) << 24 - i % 4 * 8,
                        i++
                    }
                return e.create(o, i)
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        }
    }(),
    function(t) {
        function e(t, e, n, r, o, i, a) {
            return ((t = t + (e & n | ~e & r) + o + a) << i | t >>> 32 - i) + e
        }
        function n(t, e, n, r, o, i, a) {
            return ((t = t + (e & r | n & ~r) + o + a) << i | t >>> 32 - i) + e
        }
        function o(t, e, n, r, o, i, a) {
            return ((t = t + (e ^ n ^ r) + o + a) << i | t >>> 32 - i) + e
        }
        function i(t, e, n, r, o, i, a) {
            return ((t = t + (n ^ (e | ~r)) + o + a) << i | t >>> 32 - i) + e
        }
        for (var a = r, s = a.lib, c = s.WordArray, u = s.Hasher, s = a.algo, f = [], l = 0; 64 > l; l++)
            f[l] = 4294967296 * t.abs(t.sin(l + 1)) | 0;
        s = s.MD5 = u.extend({
            _doReset: function() {
                this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878])
            },
            _doProcessBlock: function(t, r) {
                for (var a = 0; 16 > a; a++) {
                    var s = r + a
                      , c = t[s];
                    t[s] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
                }
                var a = this._hash.words
                  , s = t[r + 0]
                  , c = t[r + 1]
                  , u = t[r + 2]
                  , l = t[r + 3]
                  , p = t[r + 4]
                  , d = t[r + 5]
                  , h = t[r + 6]
                  , v = t[r + 7]
                  , y = t[r + 8]
                  , m = t[r + 9]
                  , g = t[r + 10]
                  , b = t[r + 11]
                  , _ = t[r + 12]
                  , x = t[r + 13]
                  , w = t[r + 14]
                  , k = t[r + 15]
                  , O = a[0]
                  , j = a[1]
                  , C = a[2]
                  , A = a[3]
                  , O = e(O, j, C, A, s, 7, f[0])
                  , A = e(A, O, j, C, c, 12, f[1])
                  , C = e(C, A, O, j, u, 17, f[2])
                  , j = e(j, C, A, O, l, 22, f[3])
                  , O = e(O, j, C, A, p, 7, f[4])
                  , A = e(A, O, j, C, d, 12, f[5])
                  , C = e(C, A, O, j, h, 17, f[6])
                  , j = e(j, C, A, O, v, 22, f[7])
                  , O = e(O, j, C, A, y, 7, f[8])
                  , A = e(A, O, j, C, m, 12, f[9])
                  , C = e(C, A, O, j, g, 17, f[10])
                  , j = e(j, C, A, O, b, 22, f[11])
                  , O = e(O, j, C, A, _, 7, f[12])
                  , A = e(A, O, j, C, x, 12, f[13])
                  , C = e(C, A, O, j, w, 17, f[14])
                  , j = e(j, C, A, O, k, 22, f[15])
                  , O = n(O, j, C, A, c, 5, f[16])
                  , A = n(A, O, j, C, h, 9, f[17])
                  , C = n(C, A, O, j, b, 14, f[18])
                  , j = n(j, C, A, O, s, 20, f[19])
                  , O = n(O, j, C, A, d, 5, f[20])
                  , A = n(A, O, j, C, g, 9, f[21])
                  , C = n(C, A, O, j, k, 14, f[22])
                  , j = n(j, C, A, O, p, 20, f[23])
                  , O = n(O, j, C, A, m, 5, f[24])
                  , A = n(A, O, j, C, w, 9, f[25])
                  , C = n(C, A, O, j, l, 14, f[26])
                  , j = n(j, C, A, O, y, 20, f[27])
                  , O = n(O, j, C, A, x, 5, f[28])
                  , A = n(A, O, j, C, u, 9, f[29])
                  , C = n(C, A, O, j, v, 14, f[30])
                  , j = n(j, C, A, O, _, 20, f[31])
                  , O = o(O, j, C, A, d, 4, f[32])
                  , A = o(A, O, j, C, y, 11, f[33])
                  , C = o(C, A, O, j, b, 16, f[34])
                  , j = o(j, C, A, O, w, 23, f[35])
                  , O = o(O, j, C, A, c, 4, f[36])
                  , A = o(A, O, j, C, p, 11, f[37])
                  , C = o(C, A, O, j, v, 16, f[38])
                  , j = o(j, C, A, O, g, 23, f[39])
                  , O = o(O, j, C, A, x, 4, f[40])
                  , A = o(A, O, j, C, s, 11, f[41])
                  , C = o(C, A, O, j, l, 16, f[42])
                  , j = o(j, C, A, O, h, 23, f[43])
                  , O = o(O, j, C, A, m, 4, f[44])
                  , A = o(A, O, j, C, _, 11, f[45])
                  , C = o(C, A, O, j, k, 16, f[46])
                  , j = o(j, C, A, O, u, 23, f[47])
                  , O = i(O, j, C, A, s, 6, f[48])
                  , A = i(A, O, j, C, v, 10, f[49])
                  , C = i(C, A, O, j, w, 15, f[50])
                  , j = i(j, C, A, O, d, 21, f[51])
                  , O = i(O, j, C, A, _, 6, f[52])
                  , A = i(A, O, j, C, l, 10, f[53])
                  , C = i(C, A, O, j, g, 15, f[54])
                  , j = i(j, C, A, O, c, 21, f[55])
                  , O = i(O, j, C, A, y, 6, f[56])
                  , A = i(A, O, j, C, k, 10, f[57])
                  , C = i(C, A, O, j, h, 15, f[58])
                  , j = i(j, C, A, O, x, 21, f[59])
                  , O = i(O, j, C, A, p, 6, f[60])
                  , A = i(A, O, j, C, b, 10, f[61])
                  , C = i(C, A, O, j, u, 15, f[62])
                  , j = i(j, C, A, O, m, 21, f[63]);
                a[0] = a[0] + O | 0,
                a[1] = a[1] + j | 0,
                a[2] = a[2] + C | 0,
                a[3] = a[3] + A | 0
            },
            _doFinalize: function() {
                var e = this._data
                  , n = e.words
                  , r = 8 * this._nDataBytes
                  , o = 8 * e.sigBytes;
                n[o >>> 5] |= 128 << 24 - o % 32;
                var i = t.floor(r / 4294967296);
                for (n[15 + (o + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8),
                n[14 + (o + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8),
                e.sigBytes = 4 * (n.length + 1),
                this._process(),
                e = this._hash,
                n = e.words,
                r = 0; 4 > r; r++)
                    o = n[r],
                    n[r] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8);
                return e
            },
            clone: function() {
                var t = u.clone.call(this);
                return t._hash = this._hash.clone(),
                t
            }
        }),
        a.MD5 = u._createHelper(s),
        a.HmacMD5 = u._createHmacHelper(s)
    }(Math)



function getPwd(t){
    return r.MD5(t + "TuD00Iqz4ge7gzIe2rmjSAFFKtaIBmnr8S").toString()
}
console.log(getPwd("111111"))
console.log(r)
