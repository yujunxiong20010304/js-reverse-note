hexMd5 = function() {
            var t = 0;
            function e(t, e, n, o, r, i) {
                return s((a = s(s(e, t), s(o, i))) << (l = r) | a >>> 32 - l, n);
                var a, l
            }
            function n(t, n, o, r, i, s, a) {
                return e(n & o | ~n & r, t, n, i, s, a)
            }
            function o(t, n, o, r, i, s, a) {
                return e(n & r | o & ~r, t, n, i, s, a)
            }
            function r(t, n, o, r, i, s, a) {
                return e(n ^ o ^ r, t, n, i, s, a)
            }
            function i(t, n, o, r, i, s, a) {
                return e(o ^ (n | ~r), t, n, i, s, a)
            }
            function s(t, e) {
                var n = (65535 & t) + (65535 & e);
                return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n
            }
            return function(e) {
                return function(e) {
                    for (var n, o = t ? "0123456789ABCDEF" : "0123456789abcdef", r = "", i = 0; i < e.length; i++)
                        n = e.charCodeAt(i),
                        r += o.charAt(n >>> 4 & 15) + o.charAt(15 & n);
                    return r
                }(function(t) {
                    return function(t) {
                        for (var e = "", n = 0; n < 32 * t.length; n += 8)
                            e += String.fromCharCode(t[n >> 5] >>> n % 32 & 255);
                        return e
                    }(function(t, e) {
                        t[e >> 5] |= 128 << e % 32,
                        t[14 + (e + 64 >>> 9 << 4)] = e;
                        for (var a = 1732584193, l = -271733879, u = -1732584194, c = 271733878, p = 0; p < t.length; p += 16) {
                            var f = a
                              , d = l
                              , h = u
                              , m = c;
                            a = n(a, l, u, c, t[p + 0], 7, -680876936),
                            c = n(c, a, l, u, t[p + 1], 12, -389564586),
                            u = n(u, c, a, l, t[p + 2], 17, 606105819),
                            l = n(l, u, c, a, t[p + 3], 22, -1044525330),
                            a = n(a, l, u, c, t[p + 4], 7, -176418897),
                            c = n(c, a, l, u, t[p + 5], 12, 1200080426),
                            u = n(u, c, a, l, t[p + 6], 17, -1473231341),
                            l = n(l, u, c, a, t[p + 7], 22, -45705983),
                            a = n(a, l, u, c, t[p + 8], 7, 1770035416),
                            c = n(c, a, l, u, t[p + 9], 12, -1958414417),
                            u = n(u, c, a, l, t[p + 10], 17, -42063),
                            l = n(l, u, c, a, t[p + 11], 22, -1990404162),
                            a = n(a, l, u, c, t[p + 12], 7, 1804603682),
                            c = n(c, a, l, u, t[p + 13], 12, -40341101),
                            u = n(u, c, a, l, t[p + 14], 17, -1502002290),
                            l = n(l, u, c, a, t[p + 15], 22, 1236535329),
                            a = o(a, l, u, c, t[p + 1], 5, -165796510),
                            c = o(c, a, l, u, t[p + 6], 9, -1069501632),
                            u = o(u, c, a, l, t[p + 11], 14, 643717713),
                            l = o(l, u, c, a, t[p + 0], 20, -373897302),
                            a = o(a, l, u, c, t[p + 5], 5, -701558691),
                            c = o(c, a, l, u, t[p + 10], 9, 38016083),
                            u = o(u, c, a, l, t[p + 15], 14, -660478335),
                            l = o(l, u, c, a, t[p + 4], 20, -405537848),
                            a = o(a, l, u, c, t[p + 9], 5, 568446438),
                            c = o(c, a, l, u, t[p + 14], 9, -1019803690),
                            u = o(u, c, a, l, t[p + 3], 14, -187363961),
                            l = o(l, u, c, a, t[p + 8], 20, 1163531501),
                            a = o(a, l, u, c, t[p + 13], 5, -1444681467),
                            c = o(c, a, l, u, t[p + 2], 9, -51403784),
                            u = o(u, c, a, l, t[p + 7], 14, 1735328473),
                            l = o(l, u, c, a, t[p + 12], 20, -1926607734),
                            a = r(a, l, u, c, t[p + 5], 4, -378558),
                            c = r(c, a, l, u, t[p + 8], 11, -2022574463),
                            u = r(u, c, a, l, t[p + 11], 16, 1839030562),
                            l = r(l, u, c, a, t[p + 14], 23, -35309556),
                            a = r(a, l, u, c, t[p + 1], 4, -1530992060),
                            c = r(c, a, l, u, t[p + 4], 11, 1272893353),
                            u = r(u, c, a, l, t[p + 7], 16, -155497632),
                            l = r(l, u, c, a, t[p + 10], 23, -1094730640),
                            a = r(a, l, u, c, t[p + 13], 4, 681279174),
                            c = r(c, a, l, u, t[p + 0], 11, -358537222),
                            u = r(u, c, a, l, t[p + 3], 16, -722521979),
                            l = r(l, u, c, a, t[p + 6], 23, 76029189),
                            a = r(a, l, u, c, t[p + 9], 4, -640364487),
                            c = r(c, a, l, u, t[p + 12], 11, -421815835),
                            u = r(u, c, a, l, t[p + 15], 16, 530742520),
                            l = r(l, u, c, a, t[p + 2], 23, -995338651),
                            a = i(a, l, u, c, t[p + 0], 6, -198630844),
                            c = i(c, a, l, u, t[p + 7], 10, 1126891415),
                            u = i(u, c, a, l, t[p + 14], 15, -1416354905),
                            l = i(l, u, c, a, t[p + 5], 21, -57434055),
                            a = i(a, l, u, c, t[p + 12], 6, 1700485571),
                            c = i(c, a, l, u, t[p + 3], 10, -1894986606),
                            u = i(u, c, a, l, t[p + 10], 15, -1051523),
                            l = i(l, u, c, a, t[p + 1], 21, -2054922799),
                            a = i(a, l, u, c, t[p + 8], 6, 1873313359),
                            c = i(c, a, l, u, t[p + 15], 10, -30611744),
                            u = i(u, c, a, l, t[p + 6], 15, -1560198380),
                            l = i(l, u, c, a, t[p + 13], 21, 1309151649),
                            a = i(a, l, u, c, t[p + 4], 6, -145523070),
                            c = i(c, a, l, u, t[p + 11], 10, -1120210379),
                            u = i(u, c, a, l, t[p + 2], 15, 718787259),
                            l = i(l, u, c, a, t[p + 9], 21, -343485551),
                            a = s(a, f),
                            l = s(l, d),
                            u = s(u, h),
                            c = s(c, m)
                        }
                        return Array(a, l, u, c)
                    }(function(t) {
                        for (var e = Array(t.length >> 2), n = 0; n < e.length; n++)
                            e[n] = 0;
                        for (n = 0; n < 8 * t.length; n += 8)
                            e[n >> 5] |= (255 & t.charCodeAt(n / 8)) << n % 32;
                        return e
                    }(t), 8 * t.length))
                }(function(t) {
                    var e, n, o = "", r = -1;
                    for (; ++r < t.length; )
                        e = t.charCodeAt(r),
                        n = r + 1 < t.length ? t.charCodeAt(r + 1) : 0,
                        55296 <= e && e <= 56319 && 56320 <= n && n <= 57343 && (e = 65536 + ((1023 & e) << 10) + (1023 & n),
                        r++),
                        e <= 127 ? o += String.fromCharCode(e) : e <= 2047 ? o += String.fromCharCode(192 | e >>> 6 & 31, 128 | 63 & e) : e <= 65535 ? o += String.fromCharCode(224 | e >>> 12 & 15, 128 | e >>> 6 & 63, 128 | 63 & e) : e <= 2097151 && (o += String.fromCharCode(240 | e >>> 18 & 7, 128 | e >>> 12 & 63, 128 | e >>> 6 & 63, 128 | 63 & e));
                    return o
                }(e)))
            }
        }()

function getPwd(){
    return hexMd5("123456")
}
console.log(getPwd())
