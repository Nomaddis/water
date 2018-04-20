"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(document).ready(function () {
    var _$$slick;

    /* ------ search form ----- */
    var search_form_wrap = $(".search_form_wrap");

    $('.button_wrap').on("click", function () {
        search_form_wrap.toggleClass('active');
        //console.log('button search click');
    });

    $('.search_close').on("click", function () {
        search_form_wrap.removeClass("active");
    });

    /* ---------------- main slider -----------------(using slick slider) ------- */

    $('.main-slider').slick({
        arrows: true,
        prevArrow: $('.main-slider-nav .arrow-left'),
        nextArrow: $('.main-slider-nav .arrow-right'),
        adaptiveHeight: true,
        autoplay: true
        //setting-name: setting-value
    });

    $('.feedback-slider').slick((_$$slick = {
        arrows: true,
        adaptiveHeight: true
    }, _defineProperty(_$$slick, "arrows", false), _defineProperty(_$$slick, "autoplay", true), _$$slick));

    $('.main-slider').on('afterChange', function (slick, currentSlide) {
        $(".current-slide").text($('.main-slider').slick('slickCurrentSlide') + 1);
    });
    $(".qty-of-slides").text($('.main-slider').slick('getDotCount') + 1);

    /* --------------- main slider end -------------------------*/

    /*----------  objecf fit  ----------*/
    !function (e, n, t) {
        function r(e, n) {
            return (typeof e === "undefined" ? "undefined" : _typeof(e)) === n;
        }function o() {
            var e, n, t, o, i, s, a;for (var f in g) {
                if (g.hasOwnProperty(f)) {
                    if (e = [], n = g[f], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) {
                        e.push(n.options.aliases[t].toLowerCase());
                    }for (o = r(n.fn, "function") ? n.fn() : n.fn, i = 0; i < e.length; i++) {
                        s = e[i], a = s.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), y.push((o ? "" : "no-") + a.join("-"));
                    }
                }
            }
        }function i(e) {
            var n = _.className,
                t = Modernizr._config.classPrefix || "";if (w && (n = n.baseVal), Modernizr._config.enableJSClass) {
                var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");n = n.replace(r, "$1" + t + "js$2");
            }Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), w ? _.className.baseVal = n : _.className = n);
        }function s(e) {
            return e.replace(/([a-z])-([a-z])/g, function (e, n, t) {
                return n + t.toUpperCase();
            }).replace(/^-/, "");
        }function a(e, n) {
            return !!~("" + e).indexOf(n);
        }function f() {
            return "function" != typeof n.createElement ? n.createElement(arguments[0]) : w ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments);
        }function l(e, n) {
            return function () {
                return e.apply(n, arguments);
            };
        }function u(e, n, t) {
            var o;for (var i in e) {
                if (e[i] in n) return t === !1 ? e[i] : (o = n[e[i]], r(o, "function") ? l(o, t || n) : o);
            }return !1;
        }function p(e) {
            return e.replace(/([A-Z])/g, function (e, n) {
                return "-" + n.toLowerCase();
            }).replace(/^ms-/, "-ms-");
        }function d() {
            var e = n.body;return e || (e = f(w ? "svg" : "body"), e.fake = !0), e;
        }function c(e, t, r, o) {
            var i,
                s,
                a,
                l,
                u = "modernizr",
                p = f("div"),
                c = d();if (parseInt(r, 10)) for (; r--;) {
                a = f("div"), a.id = o ? o[r] : u + (r + 1), p.appendChild(a);
            }return i = f("style"), i.type = "text/css", i.id = "s" + u, (c.fake ? c : p).appendChild(i), c.appendChild(p), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(n.createTextNode(e)), p.id = u, c.fake && (c.style.background = "", c.style.overflow = "hidden", l = _.style.overflow, _.style.overflow = "hidden", _.appendChild(c)), s = t(p, e), c.fake ? (c.parentNode.removeChild(c), _.style.overflow = l, _.offsetHeight) : p.parentNode.removeChild(p), !!s;
        }function m(n, r) {
            var o = n.length;if ("CSS" in e && "supports" in e.CSS) {
                for (; o--;) {
                    if (e.CSS.supports(p(n[o]), r)) return !0;
                }return !1;
            }if ("CSSSupportsRule" in e) {
                for (var i = []; o--;) {
                    i.push("(" + p(n[o]) + ":" + r + ")");
                }return i = i.join(" or "), c("@supports (" + i + ") { #modernizr { position: absolute; } }", function (e) {
                    return "absolute" == getComputedStyle(e, null).position;
                });
            }return t;
        }function v(e, n, o, i) {
            function l() {
                p && (delete z.style, delete z.modElem);
            }if (i = r(i, "undefined") ? !1 : i, !r(o, "undefined")) {
                var u = m(e, o);if (!r(u, "undefined")) return u;
            }for (var p, d, c, v, h, y = ["modernizr", "tspan", "samp"]; !z.style && y.length;) {
                p = !0, z.modElem = f(y.shift()), z.style = z.modElem.style;
            }for (c = e.length, d = 0; c > d; d++) {
                if (v = e[d], h = z.style[v], a(v, "-") && (v = s(v)), z.style[v] !== t) {
                    if (i || r(o, "undefined")) return l(), "pfx" == n ? v : !0;try {
                        z.style[v] = o;
                    } catch (g) {}if (z.style[v] != h) return l(), "pfx" == n ? v : !0;
                }
            }return l(), !1;
        }function h(e, n, t, o, i) {
            var s = e.charAt(0).toUpperCase() + e.slice(1),
                a = (e + " " + S.join(s + " ") + s).split(" ");return r(n, "string") || r(n, "undefined") ? v(a, n, o, i) : (a = (e + " " + E.join(s + " ") + s).split(" "), u(a, n, t));
        }var y = [],
            g = [],
            C = { _version: "3.3.1", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(e, n) {
                var t = this;setTimeout(function () {
                    n(t[e]);
                }, 0);
            }, addTest: function addTest(e, n, t) {
                g.push({ name: e, fn: n, options: t });
            }, addAsyncTest: function addAsyncTest(e) {
                g.push({ name: null, fn: e });
            } },
            Modernizr = function Modernizr() {};Modernizr.prototype = C, Modernizr = new Modernizr();var _ = n.documentElement,
            w = "svg" === _.nodeName.toLowerCase(),
            x = "Moz O ms Webkit",
            S = C._config.usePrefixes ? x.split(" ") : [];C._cssomPrefixes = S;var b = function b(n) {
            var r,
                o = prefixes.length,
                i = e.CSSRule;if ("undefined" == typeof i) return t;if (!n) return !1;if (n = n.replace(/^@/, ""), r = n.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + n;for (var s = 0; o > s; s++) {
                var a = prefixes[s],
                    f = a.toUpperCase() + "_" + r;if (f in i) return "@-" + a.toLowerCase() + "-" + n;
            }return !1;
        };C.atRule = b;var E = C._config.usePrefixes ? x.toLowerCase().split(" ") : [];C._domPrefixes = E;var j = { elem: f("modernizr") };Modernizr._q.push(function () {
            delete j.elem;
        });var z = { style: j.elem.style };Modernizr._q.unshift(function () {
            delete z.style;
        }), C.testAllProps = h;var N = C.prefixed = function (e, n, t) {
            return 0 === e.indexOf("@") ? b(e) : (-1 != e.indexOf("-") && (e = s(e)), n ? h(e, n, t) : h(e, "pfx"));
        };Modernizr.addTest("objectfit", !!N("objectFit"), { aliases: ["object-fit"] }), o(), i(y), delete C.addTest, delete C.addAsyncTest;for (var P = 0; P < Modernizr._q.length; P++) {
            Modernizr._q[P]();
        }e.Modernizr = Modernizr;
    }(window, document);

    if (!$("html").hasClass("object-fit")) {

        $('.img-cont').each(function () {
            var $container = $(this),
                imgUrl = $container.find('img').prop('src');
            if (imgUrl) {
                $container.css('backgroundImage', 'url(' + imgUrl + ')').addClass('compat-object-fit');
            }
        });
    }
    /*----------  end of objecf fit  ----------*/

    /* ============== animate mouse scroll btn =================== */

    $(".main-slider-scroll").on("click", "a", function (event) {

        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 1300);
    });
    $('.show-mobile-menu__btn').on("click", function () {
        $('.navbar').toggleClass('active');
        $(this).toggleClass('active');
    });

    /* ============== animate scroll to blocks =================== */

    $('.go_to_section').click(function () {
        // ловим клик по ссылке с классом go_to
        var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if ($(scroll_el).length != 0) {
            // проверим существование элемента чтобы избежать ошибки
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); // анимируем скроолинг к элементу scroll_el
        }
        return false; // выключаем стандартное действие
    });
});