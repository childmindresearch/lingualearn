// See https://github.com/tabahi/formantanalyzer.js
!function(e, n) {
    "object" == typeof exports && "object" == typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define([], n) : "object" == typeof exports ? exports.FormantAnalyzer = n() : e.FormantAnalyzer = n()
}(this, (function() {
    return function(e) {
        var n = {};
        function r(t) {
            if (n[t])
                return n[t].exports;
            var i = n[t] = {
                i: t,
                l: !1,
                exports: {}
            };
            return e[t].call(i.exports, i, i.exports, r),
            i.l = !0,
            i.exports
        }
        return r.m = e,
        r.c = n,
        r.d = function(e, n, t) {
            r.o(e, n) || Object.defineProperty(e, n, {
                enumerable: !0,
                get: t
            })
        }
        ,
        r.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        r.t = function(e, n) {
            if (1 & n && (e = r(e)),
            8 & n)
                return e;
            if (4 & n && "object" == typeof e && e && e.__esModule)
                return e;
            var t = Object.create(null);
            if (r.r(t),
            Object.defineProperty(t, "default", {
                enumerable: !0,
                value: e
            }),
            2 & n && "string" != typeof e)
                for (var i in e)
                    r.d(t, i, function(n) {
                        return e[n]
                    }
                    .bind(null, i));
            return t
        }
        ,
        r.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return r.d(n, "a", n),
            n
        }
        ,
        r.o = function(e, n) {
            return Object.prototype.hasOwnProperty.call(e, n)
        }
        ,
        r.p = "",
        r(r.s = 1)
    }([function(e, n, r) {
        "use strict";
        r.r(n),
        r.d(n, "solve_poly", (function() {
            return t
        }
        )),
        r.d(n, "mean_std", (function() {
            return i
        }
        )),
        r.d(n, "only_std", (function() {
            return o
        }
        )),
        r.d(n, "only_std_NZ", (function() {
            return c
        }
        )),
        r.d(n, "mean_std_NZ", (function() {
            return u
        }
        )),
        r.d(n, "array_mean_NZ", (function() {
            return a
        }
        )),
        r.d(n, "arraySum", (function() {
            return s
        }
        )),
        r.d(n, "arrayMax", (function() {
            return l
        }
        )),
        r.d(n, "only_mean", (function() {
            return f
        }
        )),
        r.d(n, "covariance", (function() {
            return m
        }
        )),
        r.d(n, "variance", (function() {
            return p
        }
        ));
        var t = function(e, n) {
            let r = 0;
            for (let t = 0; t < e.length; t++)
                r += e[t] * Math.pow(n, t);
            return r
        };
        const i = (e,n=!1)=>{
            const r = e.reduce((e,n)=>e + n, 0) / e.length;
            return [r, Math.sqrt(e.reduce((e,n)=>e.concat((n - r) ** 2), []).reduce((e,n)=>e + n, 0) / (e.length - (n ? 0 : 1)))]
        }
          , o = (e,n=!1)=>{
            const r = e.reduce((e,n)=>e + n, 0) / e.length;
            return Math.sqrt(e.reduce((e,n)=>e.concat((n - r) ** 2), []).reduce((e,n)=>e + n, 0) / (e.length - (n ? 0 : 1)))
        }
          , c = e=>{
            const n = a(e);
            return Math.sqrt(e.reduce((e,r)=>e.concat((r - n) ** 2), []).reduce((e,n)=>e + n, 0) / e.length)
        }
          , u = e=>{
            const n = a(e);
            return [n, Math.sqrt(e.reduce((e,r)=>e.concat((r - n) ** 2), []).reduce((e,n)=>e + n, 0) / e.length)]
        }
        ;
        function a(e) {
            let n = 0
              , r = 0;
            for (let t in e)
                e[t] > 0 && (n += e[t],
                r++);
            return n / r
        }
        function s(e) {
            let n = 0;
            for (let r in e)
                n += e[r];
            return n
        }
        function l(e) {
            let n = e.length
              , r = -1 / 0;
            for (; n--; )
                e[n] > r && (r = e[n]);
            return r
        }
        const f = e=>e.reduce((e,n)=>e + n, 0) / e.length;
        function m(e, n) {
            const r = e.length;
            e.length != r && console.error("Unequal samples");
            const t = f(e)
              , i = f(n);
            let o = 0;
            for (let c = 0; c < r; c++)
                o += (e[c] - t) * (n[c] - i);
            return o /= r,
            o
        }
        function p(e) {
            const n = e.length
              , r = f(e);
            let t = 0;
            for (let i = 0; i < n; i++)
                t += Math.pow(e[i] - r, 2);
            return t /= n,
            t
        }
    }
    , function(e, n, r) {
        "use strict";
        r.r(n),
        r.d(n, "configure", (function() {
            return o
        }
        )),
        r.d(n, "LaunchAudioNodes", (function() {
            return c
        }
        )),
        r.d(n, "StopAudioNodes", (function() {
            return u
        }
        )),
        r.d(n, "set_predicted_label_for_segment", (function() {
            return a
        }
        ));
        const t = r(2);
        let i = {
            plot_enable: !1,
            spec_type: 1,
            output_level: 4,
            plot_len: 200,
            f_min: 50,
            f_max: 4e3,
            N_fft_bins: 256,
            N_mel_bins: 128,
            window_width: 25,
            window_step: 25,
            pause_length: 200,
            min_seg_length: 50,
            auto_noise_gate: !0,
            voiced_max_dB: 100,
            voiced_min_dB: 10,
            plot_lag: 1,
            pre_norm_gain: 1e3,
            high_f_emph: 0,
            plot_canvas: null,
            canvas_width: 200,
            canvas_height: 100
        };
        function o(e) {
            if (null !== e.spec_type && (i.spec_type = e.spec_type),
            e.output_level && (i.output_level = e.output_level),
            null !== e.f_min && (i.f_min = e.f_min),
            e.f_max && (i.f_max = e.f_max),
            e.N_fft_bins && (i.N_fft_bins = e.N_fft_bins),
            e.N_mel_bins && (i.N_mel_bins = e.N_mel_bins),
            e.window_width && (i.window_width = e.window_width),
            e.window_step && (i.window_step = e.window_step),
            e.pre_norm_gain && (i.pre_norm_gain = e.pre_norm_gain),
            null !== e.high_f_emph && (i.high_f_emph = e.high_f_emph),
            e.pause_length && (i.pause_length = e.pause_length),
            e.min_seg_length && (i.min_seg_length = e.min_seg_length),
            null !== e.auto_noise_gate && (i.auto_noise_gate = e.auto_noise_gate),
            e.voiced_max_dB && (i.voiced_max_dB = e.voiced_max_dB),
            null !== e.voiced_min_dB && (i.voiced_min_dB = e.voiced_min_dB),
            e.plot_enable && e.plot_canvas) {
                i.plot_enable = e.plot_enable,
                i.plot_canvas = e.plot_canvas,
                e.plot_len && (i.plot_len = e.plot_len),
                e.plot_lag && (i.plot_lag = e.plot_lag),
                e.canvas_width && (i.canvas_width = e.canvas_width),
                e.canvas_height && (i.canvas_height = e.canvas_height);
                let n = 1 == i.spec_type ? i.N_mel_bins : i.N_fft_bins;
                t.reset_plot(i.plot_enable, i.plot_canvas, i.canvas_width, i.canvas_height, i.spec_type, i.output_level, i.plot_len, n, i.plot_lag)
            } else
                i.plot_enable = !1
        }
        function c(e, n=null, r=null, o=[], c=!1, u=!0, a=null, s=null) {
            return new Promise((l,f)=>{
                t.isNodePlaying() ? f("Error: Already playing") : t.reset_nodes(i.spec_type, i.f_min, i.f_max, i.N_fft_bins, i.N_mel_bins, i.window_width, i.window_step, i.pre_norm_gain, i.high_f_emph).then((function() {
                    let m = 1 == i.spec_type ? i.N_mel_bins : i.N_fft_bins;
                    t.reset_segmentor(i.output_level, m, i.plot_len, i.window_step, i.pause_length, i.min_seg_length, i.auto_noise_gate, i.voiced_max_dB, i.voiced_min_dB, r, u, o).then((function() {
                        let r = 1 == i.spec_type ? i.N_mel_bins : i.N_fft_bins;
                        t.reset_plot(i.plot_enable, i.plot_canvas, i.canvas_width, i.canvas_height, i.spec_type, i.output_level, i.plot_len, r, i.plot_lag).then((function() {
                            1 == e && n ? c ? (t.Garbage_Collect(),
                            t.offline_play_the_file(n, a, s).then((function() {
                                l(!0)
                            }
                            )).catch(e=>{
                                console.error(e),
                                f(e)
                            }
                            )) : t.online_play_the_file(n, a, s).then((function() {
                                l(!0)
                            }
                            )).catch(e=>{
                                console.error(e),
                                f(e)
                            }
                            ) : 2 == e && n ? t.online_play_the_sop(n, a, s).then((function() {
                                l(!0)
                            }
                            )).catch(e=>{
                                console.error(e),
                                f(e)
                            }
                            ) : 3 == e ? t.online_play_the_mic().then((function() {
                                l(!0)
                            }
                            )).catch(e=>{
                                console.error(e),
                                f(e)
                            }
                            ) : f("Invalid audio source")
                        }
                        )).catch(e=>{
                            console.error(e),
                            f(e)
                        }
                        )
                    }
                    )).catch(e=>{
                        console.error(e),
                        f(e)
                    }
                    )
                }
                )).catch(e=>{
                    console.error(e),
                    f(e)
                }
                )
            }
            )
        }
        function u(e="no reason") {
            t.disconnect_nodes(e)
        }
        function a(e, n, r) {
            t.set_predicted_label_for_segment(e, n, r)
        }
    }
    , function(e, n, r) {
        "use strict";
        r.r(n),
        r.d(n, "reset_nodes", (function() {
            return s
        }
        )),
        r.d(n, "reset_segmentor", (function() {
            return l
        }
        )),
        r.d(n, "reset_plot", (function() {
            return f
        }
        )),
        r.d(n, "online_play_the_mic", (function() {
            return m
        }
        )),
        r.d(n, "online_play_the_sop", (function() {
            return p
        }
        )),
        r.d(n, "online_play_the_file_TryFFT", (function() {
            return d
        }
        )),
        r.d(n, "online_play_the_file", (function() {
            return h
        }
        )),
        r.d(n, "Garbage_Collect", (function() {
            return _
        }
        )),
        r.d(n, "offline_play_the_file", (function() {
            return g
        }
        )),
        r.d(n, "disconnect_nodes", (function() {
            return y
        }
        )),
        r.d(n, "isNodePlaying", (function() {
            return v
        }
        )),
        r.d(n, "set_predicted_label_for_segment", (function() {
            return k
        }
        ));
        const t = r(3)
          , i = r(8)
          , o = "https://unpkg.com/formantanalyzer@1.1.8/analyzernode.min.js";
        window.AudioContext = window.webkitAudioContext || window.AudioContext || window.mozAudioContext;
        var c = {
            audioPlaying: 0,
            PlayMode: 0,
            last_node_ms: 0,
            frames_ack: 0,
            frames_analyzed: 0,
            spec_bands: -1
        }
          , u = {
            spec_type: 1,
            f_min: 50,
            f_max: 4e3,
            N_fft_bins: 256,
            N_mel_bins: 128,
            window_width: 25,
            window_step: 25,
            pre_norm_gain: 1e3,
            high_f_emph: .05
        }
          , a = {
            plot_enable: !1,
            spec_type: 1,
            process_level: 4,
            plot_len: 500,
            bins_count: 128,
            bins_y_labels: [],
            axis_labels_sep: 3,
            last_seg_len: 0,
            plot_lag: 3
        };
        function s(e, n, r, t, i, o, a, s, l) {
            return new Promise((f,m)=>{
                i | t ? (c.spec_bands = 1 == e ? i : t,
                c.frames_ack = 0,
                c.frames_analyzed = 0,
                c.PlayMode = 0,
                u.spec_type = e,
                u.f_min = n,
                u.f_max = r,
                u.N_fft_bins = t,
                u.N_mel_bins = i,
                u.window_width = o,
                u.window_step = a,
                u.pre_norm_gain = s,
                u.high_f_emph = l,
                f("ready")) : m("Invalid reset_nodes config")
            }
            )
        }
        function l(e, n, r=200, i=15, o=200, c=50, u=!0, a=150, s=50, l=null, f=!0, m=[]) {
            return new Promise((p,d)=>{
                t.reset_segmentation(e, n, r, i, o, c, u, a, s, l, f, m).then((function() {
                    p("ready")
                }
                )).catch((function(e) {
                    d("reset_segmentor failed: " + e)
                }
                ))
            }
            )
        }
        function f(e=!1, n=null, r=800, t=400, o=1, c=0, u=100, s=64, l=0) {
            return new Promise((f,m)=>{
                c ? (e && n ? (a.plot_enable = !0,
                a.spec_type = o,
                a.process_level = c,
                a.plot_len = u,
                a.plot_lag = l,
                a.last_seg_len = 0,
                a.bins_y_labels = [],
                a.bins_count = s,
                a.bins_count > 32 ? a.axis_labels_sep = Math.round(a.bins_count / 32) : a.axis_labels_sep = 0,
                i.init_canvas(n, r, t, u, s),
                i.clear_plot()) : a.plot_enable = !1,
                f("ready")) : m("Invalid reset_plot config")
            }
            )
        }
        function m() {
            return new Promise((e,n)=>{
                var r, i, s;
                try {
                    r = new AudioContext,
                    i = null;
                    let l = {
                        audio: !0,
                        video: !1
                    };
                    navigator.mediaDevices.getUserMedia(l).then(l=>{
                        i = r.createMediaStreamSource(l),
                        c.audioPlaying = 1,
                        r.audioWorklet.addModule(o).then((function() {
                            (s = new AudioWorkletNode(r,"spectrum-processor")).port.onmessage = o=>{
                                if (Number.isInteger(o.data) ? 1 == o.data && (c.frames_ack += o.data,
                                c.frames_ack > c.frames_analyzed && s && s.port.postMessage(1)) : o.data.bins_Hz ? (a.bins_y_labels = o.data.bins_Hz,
                                (c.spec_bands <= 0 || c.spec_bands != a.bins_y_labels.length) && n("Bins Init mismatch: " + String(c.spec_bands) + ", " + String(a.bins_y_labels.length))) : Uint32Array.prototype.isPrototypeOf(o.data) && o.data.length > 0 && (c.spec_bands <= 0 || c.spec_bands != o.data.length ? n("Bins count mismatch: " + String(c.spec_bands) + ", " + String(o.data.length)) : (t.spectrum_push(o.data, c.frames_analyzed),
                                a.plot_enable && requestAnimFrame(M),
                                c.frames_analyzed++)),
                                2 == c.audioPlaying && c.frames_analyzed >= c.frames_ack || -1 == c.audioPlaying) {
                                    -1 == c.audioPlaying ? console.log("Mic stream end by disconnect") : console.log("Mic stream end normal (b)"),
                                    c.audioPlaying = 0,
                                    s && s.port.postMessage(22);
                                    try {
                                        i.stop(0)
                                    } catch (o) {}
                                    try {
                                        i.disconnect(s)
                                    } catch (o) {}
                                    try {
                                        s.disconnect(r.destination)
                                    } catch (o) {}
                                    r && "closed" != r.state && r.close(),
                                    i = null,
                                    s = null,
                                    r = null,
                                    t.segment_truncate(),
                                    a.plot_enable && requestAnimFrame(M),
                                    e("complete_d")
                                }
                            }
                            ,
                            s.port.postMessage(u),
                            s.port.postMessage(0),
                            i.onended = function() {
                                console.log("Mic stream ended"),
                                c.audioPlaying = 2,
                                s && s.port.postMessage(22);
                                try {
                                    i.stop(0)
                                } catch (e) {}
                                try {
                                    i.disconnect(s)
                                } catch (e) {}
                                if (i = null,
                                c.frames_analyzed >= c.frames_ack && 0 != c.audioPlaying) {
                                    console.log("Mic stream end normal"),
                                    c.audioPlaying = 0;
                                    try {
                                        s.disconnect(r.destination)
                                    } catch (e) {}
                                    r && "closed" != r.state && r.close(),
                                    s = null,
                                    r = null,
                                    t.segment_truncate(),
                                    a.plot_enable && requestAnimFrame(M),
                                    e("complete")
                                }
                            }
                            ;
                            try {
                                i.connect(s),
                                s.connect(r.destination),
                                c.PlayMode = 3
                            } catch (e) {
                                console.log("File loading failed: " + e);
                                try {
                                    i.stop(0)
                                } catch (e) {}
                                try {
                                    i.disconnect(s)
                                } catch (e) {}
                                try {
                                    s.disconnect(r.destination)
                                } catch (e) {}
                                i = null,
                                s = null,
                                r = null,
                                c.audioPlaying = 0,
                                n("Context connection failed: " + e)
                            }
                        }
                        )).catch((function(e) {
                            c.audioPlaying = 0,
                            i = null,
                            r = null,
                            console.log("workletNode loading failed: " + e),
                            n("workletNode loading failed: " + e)
                        }
                        ))
                    }
                    ).catch(e=>{
                        n(e)
                    }
                    )
                } catch (e) {
                    alert("Web Audio API is not supported in this browser"),
                    n("Not supported")
                }
            }
            )
        }
        function p(e, n=null, r=null) {
            return new Promise((i,s)=>{
                var l, f, m;
                try {
                    l = new (window.AudioContext || window.webkitAudioContext),
                    f = null,
                    f = l.createMediaElementSource(e),
                    c.audioPlaying = 1,
                    l.audioWorklet.addModule(o).then((function() {
                        (m = new AudioWorkletNode(l,"spectrum-processor")).port.onmessage = e=>{
                            if (Number.isInteger(e.data) ? 1 == e.data && (c.frames_ack += e.data,
                            c.frames_ack > c.frames_analyzed && m && m.port.postMessage(1)) : e.data.bins_Hz ? (a.bins_y_labels = e.data.bins_Hz,
                            (c.spec_bands <= 0 || c.spec_bands != a.bins_y_labels.length) && s("Bins Init mismatch: " + String(c.spec_bands) + ", " + String(a.bins_y_labels.length))) : Uint32Array.prototype.isPrototypeOf(e.data) && e.data.length > 0 && (c.spec_bands <= 0 || c.spec_bands != e.data.length ? s("Bins count mismatch: " + String(c.spec_bands) + ", " + String(e.data.length)) : (t.spectrum_push(e.data, c.frames_analyzed),
                            a.plot_enable && requestAnimFrame(M),
                            c.frames_analyzed++)),
                            2 == c.audioPlaying && c.frames_analyzed >= c.frames_ack || -1 == c.audioPlaying) {
                                -1 == c.audioPlaying ? console.log("Demo stream end by disconnect") : console.log("Demo stream end normal (b)"),
                                c.audioPlaying = 0,
                                m && m.port.postMessage(22);
                                try {
                                    f.stop(0)
                                } catch (e) {}
                                try {
                                    f.disconnect(m)
                                } catch (e) {}
                                try {
                                    f.disconnect(l.destination)
                                } catch (e) {}
                                try {
                                    m.disconnect(l.destination)
                                } catch (e) {}
                                l && "closed" != l.state && l.close(),
                                f = null,
                                m = null,
                                l = null,
                                t.segment_truncate(),
                                a.plot_enable && requestAnimFrame(M),
                                i("complete_d")
                            }
                            c.last_node_ms = Date.now()
                        }
                        ,
                        m.port.postMessage(u),
                        m.port.postMessage(0),
                        f.onended = function() {
                            console.log("Demo stream ended"),
                            c.audioPlaying = 2,
                            m && m.port.postMessage(22);
                            try {
                                f.stop(0)
                            } catch (e) {}
                            try {
                                f.disconnect(m)
                            } catch (e) {}
                            try {
                                f.disconnect(l.destination)
                            } catch (e) {}
                            if (f = null,
                            c.frames_analyzed >= c.frames_ack && 0 != c.audioPlaying) {
                                console.log("Demo stream end normal"),
                                c.audioPlaying = 0;
                                try {
                                    m.disconnect(l.destination)
                                } catch (e) {}
                                l && "closed" != l.state && l.close(),
                                m = null,
                                l = null,
                                t.segment_truncate(),
                                a.plot_enable && requestAnimFrame(M),
                                i("complete")
                            }
                        }
                        ,
                        window.setTimeout((function e() {
                            if (0 != c.audioPlaying && 1 != c.audioPlaying && Date.now() - c.last_node_ms < 2e3) {
                                setTimeout(e, 250);
                                try {
                                    m.port.postMessage(22)
                                } catch (e) {}
                            } else if (2 == c.audioPlaying && m) {
                                try {
                                    m.port.postMessage(22)
                                } catch (e) {}
                                c.audioPlaying = 0,
                                c.last_node_ms = 0,
                                console.warn("Worklet is stuck. Terminating."),
                                f = null,
                                m = null,
                                l = null,
                                i(2)
                            } else
                                -1 == c.audioPlaying && (f = null,
                                m = null,
                                l = null,
                                i(3))
                        }
                        ), 100);
                        try {
                            f.connect(l.destination),
                            f.connect(m),
                            m.connect(l.destination),
                            f.loop = !1,
                            c.PlayMode = 1,
                            n ? r ? e.play(0, n, r) : e.play(0, n) : e.play(0)
                        } catch (e) {
                            console.log("Demo stream failed: " + e);
                            try {
                                f.stop(0)
                            } catch (e) {}
                            try {
                                f.disconnect(m)
                            } catch (e) {}
                            try {
                                f.disconnect(l.destination)
                            } catch (e) {}
                            try {
                                m.disconnect(l.destination)
                            } catch (e) {}
                            f = null,
                            m = null,
                            l = null,
                            c.audioPlaying = 0,
                            s("Demo stream loading failed: " + e)
                        }
                    }
                    )).catch((function(e) {
                        c.audioPlaying = 0,
                        f = null,
                        l = null,
                        console.log("workletNode loading failed: " + e),
                        s("workletNode loading failed: " + e)
                    }
                    ))
                } catch (e) {
                    alert("Web Audio API is not supported in this browser"),
                    s("Not supported")
                }
            }
            )
        }
        function d(e, n=null, r=null) {
            return new Promise((i,o)=>{
                var s, l, f;
                try {
                    s = new AudioContext,
                    l = null,
                    l = s.createBufferSource(),
                    (f = s.createAnalyser()).fftSize = 256,
                    f.smoothingTimeConstant = .8;
                    const m = f.frequencyBinCount;
                    new Uint8Array(m);
                    a.bins_y_labels = f.frequencyBinCount,
                    c.spec_bands = f.frequencyBinCount,
                    c.audioPlaying = 1,
                    workletNode = new AudioWorkletNode(s,"spectrum-processor"),
                    workletNode.port.onmessage = e=>{
                        if (Number.isInteger(e.data) ? 1 == e.data && (c.frames_ack += e.data,
                        c.frames_ack > c.frames_analyzed && workletNode && workletNode.port.postMessage(1)) : e.data.bins_Hz ? (a.bins_y_labels = e.data.bins_Hz,
                        (c.spec_bands <= 0 || c.spec_bands != a.bins_y_labels.length) && o("Bins Init mismatch: " + String(c.spec_bands) + ", " + String(a.bins_y_labels.length))) : Uint32Array.prototype.isPrototypeOf(e.data) && e.data.length > 0 && (c.spec_bands <= 0 || c.spec_bands != e.data.length ? o("Bins count mismatch: " + String(c.spec_bands) + ", " + String(e.data.length)) : (t.spectrum_push(e.data, c.frames_analyzed),
                        a.plot_enable && requestAnimFrame(M),
                        c.frames_analyzed++)),
                        2 == c.audioPlaying && c.frames_analyzed >= c.frames_ack || -1 == c.audioPlaying) {
                            -1 == c.audioPlaying ? console.log("Online file end by disconnect") : console.log("Online file end normal (b)"),
                            c.audioPlaying = 0,
                            workletNode && workletNode.port.postMessage(22);
                            try {
                                l.stop(0)
                            } catch (e) {}
                            try {
                                l.disconnect(workletNode)
                            } catch (e) {}
                            try {
                                l.disconnect(s.destination)
                            } catch (e) {}
                            try {
                                workletNode.disconnect(s.destination)
                            } catch (e) {}
                            s && "closed" != s.state && s.close(),
                            l = null,
                            workletNode = null,
                            s = null,
                            t.segment_truncate(),
                            a.plot_enable && (requestAnimFrame(M),
                            setTimeout(M, 100)),
                            i("complete_d")
                        }
                    }
                    ,
                    workletNode.port.postMessage(u),
                    workletNode.port.postMessage(0),
                    l.onended = function() {
                        c.audioPlaying = 2,
                        workletNode && workletNode.port.postMessage(22);
                        try {
                            l.stop(0)
                        } catch (e) {}
                        try {
                            l.disconnect(workletNode)
                        } catch (e) {}
                        try {
                            l.disconnect(s.destination)
                        } catch (e) {}
                        if (l = null,
                        c.frames_analyzed >= c.frames_ack && 0 != c.audioPlaying) {
                            console.log("Online file end normal"),
                            c.audioPlaying = 0;
                            try {
                                workletNode.disconnect(s.destination)
                            } catch (e) {}
                            s && "closed" != s.state && s.close(),
                            workletNode = null,
                            s = null,
                            t.segment_truncate(),
                            a.plot_enable && requestAnimFrame(M),
                            i("complete")
                        }
                    }
                    ;
                    try {
                        s.decodeAudioData(e, (function(e) {
                            l.buffer = e,
                            l.connect(s.destination),
                            l.connect(workletNode),
                            workletNode.connect(s.destination),
                            l.loop = !1,
                            c.PlayMode = 1,
                            n || r ? ((n -= .5) < 0 && (n = 0),
                            r ? l.start(0, n, r) : l.start(0, n)) : l.start(0)
                        }
                        ), (function(e) {
                            A(e),
                            o("Audio decode error: " + e)
                        }
                        ))
                    } catch (e) {
                        console.log("File loading failed: " + e);
                        try {
                            l.stop(0)
                        } catch (e) {}
                        try {
                            l.disconnect(workletNode)
                        } catch (e) {}
                        try {
                            l.disconnect(s.destination)
                        } catch (e) {}
                        try {
                            workletNode.disconnect(s.destination)
                        } catch (e) {}
                        l = null,
                        workletNode = null,
                        s = null,
                        c.audioPlaying = 0,
                        o("File loading failed: " + e)
                    }
                } catch (e) {
                    alert("Web Audio API is not supported in this browser"),
                    o("Not supported")
                }
            }
            )
        }
        function h(e, n=null, r=null) {
            return new Promise((i,s)=>{
                var l, f, m;
                try {
                    l = new AudioContext,
                    f = null,
                    f = l.createBufferSource(),
                    c.audioPlaying = 1,
                    l.audioWorklet.addModule(o).then((function() {
                        (m = new AudioWorkletNode(l,"spectrum-processor")).port.onmessage = e=>{
                            if (Number.isInteger(e.data) ? 1 == e.data && (c.frames_ack += e.data,
                            c.frames_ack > c.frames_analyzed && m && m.port.postMessage(1)) : e.data.bins_Hz ? (a.bins_y_labels = e.data.bins_Hz,
                            (c.spec_bands <= 0 || c.spec_bands != a.bins_y_labels.length) && s("Bins Init mismatch: " + String(c.spec_bands) + ", " + String(a.bins_y_labels.length))) : Uint32Array.prototype.isPrototypeOf(e.data) && e.data.length > 0 && (c.spec_bands <= 0 || c.spec_bands != e.data.length ? s("Bins count mismatch: " + String(c.spec_bands) + ", " + String(e.data.length)) : (t.spectrum_push(e.data, c.frames_analyzed),
                            a.plot_enable && requestAnimFrame(M),
                            c.frames_analyzed++)),
                            2 == c.audioPlaying && c.frames_analyzed >= c.frames_ack || -1 == c.audioPlaying) {
                                -1 == c.audioPlaying ? console.log("Online file end by disconnect") : console.log("Online file end normal (b)"),
                                c.audioPlaying = 0,
                                m && m.port.postMessage(22);
                                try {
                                    f.stop(0)
                                } catch (e) {}
                                try {
                                    f.disconnect(m)
                                } catch (e) {}
                                try {
                                    f.disconnect(l.destination)
                                } catch (e) {}
                                try {
                                    m.disconnect(l.destination)
                                } catch (e) {}
                                l && "closed" != l.state && l.close(),
                                f = null,
                                m = null,
                                l = null,
                                t.segment_truncate(),
                                a.plot_enable && (requestAnimFrame(M),
                                setTimeout(M, 100)),
                                i("complete_d")
                            }
                        }
                        ,
                        m.port.postMessage(u),
                        m.port.postMessage(0),
                        f.onended = function() {
                            c.audioPlaying = 2,
                            m && m.port.postMessage(22);
                            try {
                                f.stop(0)
                            } catch (e) {}
                            try {
                                f.disconnect(m)
                            } catch (e) {}
                            try {
                                f.disconnect(l.destination)
                            } catch (e) {}
                            if (f = null,
                            c.frames_analyzed >= c.frames_ack && 0 != c.audioPlaying) {
                                console.log("Online file end normal"),
                                c.audioPlaying = 0;
                                try {
                                    m.disconnect(l.destination)
                                } catch (e) {}
                                l && "closed" != l.state && l.close(),
                                m = null,
                                l = null,
                                t.segment_truncate(),
                                a.plot_enable && requestAnimFrame(M),
                                i("complete")
                            }
                        }
                        ;
                        try {
                            l.decodeAudioData(e, (function(e) {
                                f.buffer = e,
                                f.connect(l.destination),
                                f.connect(m),
                                m.connect(l.destination),
                                f.loop = !1,
                                c.PlayMode = 1,
                                n || r ? ((n -= .5) < 0 && (n = 0),
                                r ? f.start(0, n, r) : f.start(0, n)) : f.start(0)
                            }
                            ), (function(e) {
                                A(e),
                                s("Audio decode error: " + e)
                            }
                            ))
                        } catch (e) {
                            console.log("File loading failed: " + e);
                            try {
                                f.stop(0)
                            } catch (e) {}
                            try {
                                f.disconnect(m)
                            } catch (e) {}
                            try {
                                f.disconnect(l.destination)
                            } catch (e) {}
                            try {
                                m.disconnect(l.destination)
                            } catch (e) {}
                            f = null,
                            m = null,
                            l = null,
                            c.audioPlaying = 0,
                            s("File loading failed: " + e)
                        }
                    }
                    )).catch((function(e) {
                        c.audioPlaying = 0,
                        f = null,
                        l = null,
                        console.log("workletNode loading failed: " + e),
                        s("workletNode loading failed: " + e)
                    }
                    ))
                } catch (e) {
                    alert("Web Audio API is not supported in this browser"),
                    s("Not supported")
                }
            }
            )
        }
        function _() {
            try {
                FileAudioContext = null,
                FileAudioContext = void 0
            } catch (e) {}
            try {
                sourceNode = null,
                sourceNode = void 0
            } catch (e) {}
            try {
                workletNode = null,
                workletNode = void 0
            } catch (e) {}
        }
        function g(e, n=null, r=null) {
            return new Promise((i,s)=>{
                var l, f, m;
                try {
                    l = new OfflineAudioContext(1,48e6,48e3),
                    f = null,
                    f = l.createBufferSource(),
                    c.audioPlaying = 1,
                    l.audioWorklet.addModule(o).then((function() {
                        (m = new AudioWorkletNode(l,"spectrum-processor")).port.onmessage = e=>{
                            if (Number.isInteger(e.data) ? 1 == e.data && (c.frames_ack++,
                            c.frames_ack > c.frames_analyzed && m && m.port.postMessage(1)) : e.data.bins_Hz ? (a.bins_y_labels = e.data.bins_Hz,
                            (c.spec_bands <= 0 || c.spec_bands != a.bins_y_labels.length) && s("Bins Init mismatch: " + String(c.spec_bands) + ", " + String(a.bins_y_labels.length))) : Uint32Array.prototype.isPrototypeOf(e.data) && e.data.length > 0 && (c.spec_bands <= 0 || c.spec_bands != e.data.length ? s("Bins count mismatch: " + String(c.spec_bands) + ", " + String(e.data.length)) : (t.spectrum_push(e.data, c.frames_analyzed),
                            a.plot_enable && requestAnimFrame(M),
                            c.frames_analyzed++)),
                            2 == c.audioPlaying && c.frames_analyzed >= c.frames_ack || -1 == c.audioPlaying) {
                                c.frames_ack = 0,
                                m && m.port.postMessage(22);
                                try {
                                    f.stop(0)
                                } catch (e) {}
                                try {
                                    f.disconnect(m)
                                } catch (e) {}
                                try {
                                    m.disconnect(l.destination)
                                } catch (e) {}
                                f = null,
                                m = null,
                                l = null,
                                -1 == c.audioPlaying && console.log("Offline file end by disconnect"),
                                c.audioPlaying = 0,
                                t.segment_truncate(),
                                a.plot_enable && requestAnimFrame(M),
                                i("complete_u")
                            }
                            c.last_node_ms = Date.now()
                        }
                        ,
                        m.port.postMessage(u),
                        m.port.postMessage(0);
                        try {
                            l.decodeAudioData(e, (function(e) {
                                f.buffer = e,
                                f.connect(m),
                                m.connect(l.destination),
                                f.loop = !1,
                                c.PlayMode = 2,
                                n ? r ? f.start(0, n, r) : f.start(0, n) : f.start(0),
                                l.startRendering().then((function(e) {
                                    let n = Date.now();
                                    function r() {
                                        if (2 == c.audioPlaying && Date.now() - n < 1e4) {
                                            console.log("Rendering finished."),
                                            setTimeout(r, 100);
                                            try {
                                                m.port.postMessage(22)
                                            } catch (e) {}
                                        } else if (2 == c.audioPlaying && m) {
                                            console.error("Worklet is stuck. Terminating."),
                                            c.audioPlaying = -1,
                                            c.last_node_ms = 0;
                                            try {
                                                m.port.postMessage(22)
                                            } catch (e) {}
                                            i(3)
                                        } else if (-1 == c.audioPlaying) {
                                            setTimeout(r, 250);
                                            try {
                                                m.port.postMessage(22)
                                            } catch (e) {}
                                        } else if (1 == c.audioPlaying)
                                            ;
                                        else if (0 == c.audioPlaying || Date.now() - c.last_node_ms > 1e4)
                                            m = null,
                                            c.audioPlaying = 0,
                                            i(3);
                                        else {
                                            setTimeout(r, 250);
                                            try {
                                                m.port.postMessage(22)
                                            } catch (e) {}
                                        }
                                    }
                                    m.port.postMessage(22),
                                    window.setTimeout((function() {
                                        c.audioPlaying = 2,
                                        m && m.port.postMessage(22),
                                        window.setTimeout(r, 100)
                                    }
                                    ), 100),
                                    f = null
                                }
                                )).catch((function(e) {
                                    c.audioPlaying = 0,
                                    console.log("Rendering failed: " + e),
                                    s("Rendering failed: " + e)
                                }
                                ))
                            }
                            ), (function(e) {
                                A(e),
                                s("Audio decode error: " + e)
                            }
                            ))
                        } catch (e) {
                            console.log("File loading failed: " + e);
                            try {
                                f.stop(0)
                            } catch (e) {}
                            try {
                                m.disconnect(l.destination)
                            } catch (e) {}
                            try {
                                f.disconnect(m)
                            } catch (e) {}
                            try {
                                m.disconnect(l.destination)
                            } catch (e) {}
                            f = null,
                            m = null,
                            l = null,
                            c.audioPlaying = 0,
                            s("File loading failed: " + e)
                        }
                    }
                    )).catch((function(e) {
                        c.audioPlaying = 0,
                        f = null,
                        l = null,
                        console.log("workletNode loading failed: " + e),
                        s("workletNode loading failed: " + e)
                    }
                    ))
                } catch (e) {
                    alert("Web Audio API is not supported in this browser. Error: " + e),
                    s("Web Audio API error: " + e)
                }
            }
            )
        }
        function y(e) {
            0 != c.audioPlaying && (c.audioPlaying = -1,
            console.log("Disconnect Nodes because: " + e))
        }
        function v() {
            return c.audioPlaying > 0
        }
        let b = 0
          , w = !1
          , x = !1;
        function k(e, n, r) {
            t.set_segments_label(e, n, r),
            x = !0,
            setTimeout(M, 100)
        }
        async function M() {
            w = !0;
            let e = t.get_context_maximum();
            if (1 == a.process_level || 2 == a.process_level) {
                if (b++,
                b < a.plot_lag)
                    return w = !1,
                    !0;
                b = 0;
                let n = t.get_spectrum();
                n.length > 0 && (2 == a.process_level ? (i.clear_plot(!1),
                i.plot_spectrum(n, e, a.bins_y_labels),
                i.plot_axis_majors(a.bins_y_labels, a.axis_labels_sep)) : (i.clear_plot(!0),
                i.plotBands(n[n.length - 1], e, a.bins_y_labels, a.axis_labels_sep))),
                n = null
            } else if (3 == a.process_level || a.process_level >= 4) {
                let n = 0
                  , r = t.get_segments_count(a.process_level);
                if (r > 0 && (a.last_seg_len != r || x)) {
                    x = !1,
                    a.last_seg_len = r,
                    i.clear_plot();
                    for (let o = r - 1; o >= 0; o--) {
                        let r = t.get_segments_ci(o)[1];
                        if (r > 0) {
                            let c = t.get_segment(o, a.process_level)
                              , u = t.get_seg_timestamps(o);
                            n = n + r + 2;
                            let s = a.plot_len - n;
                            a.process_level >= 4 ? (i.plot_formants(c, r, u, s, e),
                            10 == a.process_level || 11 == a.process_level || 13 == a.process_level ? i.plot_syllable_anchors(o, t.get_syllables_ci(o), s) : 12 == a.process_level && i.plot_syllable_anchors(o, t.get_syllables_ci(o), s, t.get_syllables_curves(o))) : 3 == a.process_level && i.plot_raw_segment(c, r, u, s, e),
                            c = null;
                            let l = t.get_segments_label(o);
                            if (i.plot_segment_labels(r, s, l),
                            n > a.plot_len)
                                break
                        } else
                            console.warn("Segment size error, si:" + o + ", size:" + r)
                    }
                    i.plot_axis_majors(a.bins_y_labels, a.axis_labels_sep)
                }
            } else
                console.log("Error: Invalid process_level");
            return w = !1,
            !0
        }
        function A(e) {
            console.log(e),
            c.audioPlaying = 0,
            document.getElementById("msg").textContent = "Error",
            _()
        }
        window.requestAnimFrame_2 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e, n) {
            window.setTimeout(e, 100)
        }
        ,
        window.requestAnimFrame = function(e) {
            w || (window.setTimeout(e, 10),
            w = !0)
        }
    }
    , function(e, n, r) {
        "use strict";
        r.r(n),
        r.d(n, "reset_segmentation", (function() {
            return P
        }
        )),
        r.d(n, "spectrum_push", (function() {
            return I
        }
        )),
        r.d(n, "segment_truncate", (function() {
            return B
        }
        )),
        r.d(n, "get_context_maximum", (function() {
            return V
        }
        )),
        r.d(n, "get_spectrum", (function() {
            return z
        }
        )),
        r.d(n, "get_segment", (function() {
            return O
        }
        )),
        r.d(n, "get_syllables_ci", (function() {
            return R
        }
        )),
        r.d(n, "get_syllables_curves", (function() {
            return D
        }
        )),
        r.d(n, "get_syls_timestamps", (function() {
            return L
        }
        )),
        r.d(n, "get_segments_ci", (function() {
            return U
        }
        )),
        r.d(n, "get_clip_timestamps", (function() {
            return C
        }
        )),
        r.d(n, "get_seg_timestamps", (function() {
            return E
        }
        )),
        r.d(n, "get_segments_count", (function() {
            return X
        }
        )),
        r.d(n, "get_segments_label", (function() {
            return H
        }
        )),
        r.d(n, "set_segments_label", (function() {
            return Y
        }
        ));
        const t = r(4)
          , i = r(7)
          , o = r(0);
        var c = {
            spec_bands: -1,
            plot_len: 200,
            max_voiced_bin: 80,
            window_step: .025,
            current_frame: 0,
            play_end: !1,
            no_fm_segs: 0,
            c_ci: 0,
            c_started: -1,
            current_label: [],
            callbacks_processed: 0,
            seg_limit_1: 200,
            seg_limit_2: 250,
            seg_min_frames: 20,
            seg_breaker: 12,
            process_level: 5,
            auto_noise_gate: !0,
            voiced_max_dB: 100,
            voiced_min_dB: 10,
            call_at_end: !1
        }
          , u = []
          , a = []
          , s = []
          , l = []
          , f = []
          , m = []
          , p = []
          , d = []
          , h = []
          , _ = !1
          , g = 50
          , y = 2;
        let v = g
          , b = y;
        var w = 0
          , x = 0
          , k = 0
          , M = null;
        let A = !0;
        async function P(e, n, r=200, i=15, o=200, P=50, S=!0, j=150, N=50, q=null, F=!0, I=[]) {
            return u = null,
            a = null,
            s = null,
            m = null,
            f = null,
            p = null,
            d = null,
            A = F,
            0 == A && (M = q),
            new Promise((M,A)=>{
                n ? function e() {
                    return new Promise(n=>{
                        T > 20 ? (T = 0,
                        n(1),
                        console.error("await_busy_last_process timeout")) : c.callbacks_processed < l.length ? (T++,
                        setTimeout(()=>{
                            e().then(e=>{
                                n(1)
                            }
                            )
                        }
                        , 500)) : c.callbacks_processed >= l.length && (T = 0,
                        n(l.length))
                    }
                    )
                }().then(A=>{
                    c.process_level = e,
                    c.spec_bands = n,
                    c.plot_len = r,
                    c.seg_limit_1 = r - 10,
                    c.seg_limit_2 = r - 4,
                    c.max_voiced_bin = parseInt(.7 * n),
                    c.window_step = i / 1e3,
                    c.seg_breaker = o > 2 * i ? o / i : 250 / i,
                    c.seg_min_frames = parseInt(P / i),
                    c.current_label = I,
                    c.play_end = !1,
                    c.no_fm_segs = 0,
                    c.c_ci = 0,
                    c.c_started = -1,
                    u = [],
                    c.current_frame = 0,
                    c.callbacks_processed = 0,
                    t.clear_fm(),
                    a = [],
                    s = [],
                    f = [],
                    l = [],
                    m = [],
                    p = [],
                    d = [],
                    c.auto_noise_gate = S,
                    c.voiced_max_dB = j,
                    c.voiced_min_dB = N,
                    c.auto_noise_gate ? (g = 50,
                    y = 2) : (g = Math.pow(10, c.voiced_max_dB / 20),
                    y = Math.pow(10, c.voiced_min_dB / 20)),
                    w = 0,
                    x = 0,
                    k = 0,
                    v = g,
                    b = y,
                    h = [],
                    _ = !1,
                    M("ready")
                }
                ) : A("Invalid spec_bands")
            }
            )
        }
        var T = 0;
        function S(e=-1) {
            c.c_ci = 0,
            c.c_started = e,
            c.no_fm_segs = 0,
            t.clear_fm()
        }
        async function j() {
            for (_ = !0; h.length > 0; ) {
                let e = h.splice(0, 1)[0]
                  , n = c.c_ci
                  , r = 0
                  , i = 1
                  , o = 0
                  , u = 0
                  , a = 0
                  , s = 0
                  , l = 0
                  , f = []
                  , m = 0
                  , p = 2 * y
                  , d = 0
                  , _ = 0;
                for (; i < c.spec_bands; ) {
                    if (_ += e[i],
                    e[i] > e[i - 1] && (i < 2 || e[i] > e[i - 2]) && (i < 3 || e[i] > e[i - 3])) {
                        if (-1 == l || 0 == l) {
                            if (-1 == l && e[u] > y && o <= u && u < a) {
                                e[u] > p && (p = e[u],
                                d = u);
                                let n = e[u] / 10;
                                for (; o < u && e[o] < n; )
                                    o++;
                                for (; a > u && e[a] < n; )
                                    a--;
                                f[r] = [o, a, u],
                                r++,
                                m += e[u]
                            }
                            o = i - 1,
                            u = i
                        } else
                            1 == l && (u = i);
                        l = 1
                    } else if (e[i] < e[i - 1] && (i < 2 || e[i] < e[i - 2]) && (i < 3 || e[i] < e[i - 3]))
                        1 != l && -1 != l || (a = i,
                        l = -1);
                    else if (-1 == l) {
                        if (s++,
                        s > 2) {
                            if (s = 0,
                            e[u] > y && o <= u && u < a) {
                                e[u] > p && (p = e[u],
                                d = u);
                                let n = e[u] / 10;
                                for (; o < u && e[o] < n; )
                                    o++;
                                for (; a > u && e[a] < n; )
                                    a--;
                                f[r] = [o, a, u],
                                r++,
                                m += e[u]
                            }
                            l = 0
                        }
                    } else
                        1 == l && e[i] > e[i - 1] && (u = i);
                    if (i == c.spec_bands - 1 && 1 == l && (a = i,
                    u = i,
                    e[u] > y && o < u && u <= a)) {
                        let n = e[u] / 10;
                        for (; o < u && e[o] < n; )
                            o++;
                        for (; a > u && e[a] < n; )
                            a--;
                        f[r] = [o, a, u],
                        r++,
                        m += e[u]
                    }
                    i++
                }
                if (c.c_started < 0) {
                    let e = m > p ? p * (r - 1) / (m - p) : 0;
                    r > 0 && d > 7 && d < c.max_voiced_bin && r > 4 && e > 4 ? (S(0),
                    c.c_started = 0) : c.no_fm_segs++
                }
                c.c_started >= 0 && (0 == r || d < 7 || d >= c.max_voiced_bin || r > 3 && m / (_ - m) < .1 ? (c.no_fm_segs++,
                c.c_started < 2 ? c.c_started-- : c.no_fm_segs >= c.seg_breaker ? N(c.c_ci + 1).then((function() {
                    S(-1),
                    0 == c.call_at_end && F()
                }
                )).catch(e=>{
                    S(-1)
                }
                ) : c.auto_noise_gate && q(p)) : (c.auto_noise_gate && q(p),
                t.accumulate_fm(e, f, n, _, y),
                c.c_started < 2 ? c.c_started++ : c.no_fm_segs = 0)),
                c.c_ci++,
                f = null
            }
            c.play_end && N(c.c_ci).then((function() {
                S(1),
                c.play_end && F()
            }
            )).catch(e=>{
                S(1)
            }
            ),
            _ = !1
        }
        function N(e) {
            return new Promise((n,r)=>{
                let i = e - c.no_fm_segs;
                if (i > c.seg_min_frames && c.c_started >= 2) {
                    let e = c.current_frame - i
                      , o = t.get_ranked_formants();
                    if (13 == c.process_level) {
                        l.push([e, i]);
                        let r = t.straighten_formants(o, i, y)
                          , u = t.sep_syllables(r, y)
                          , h = t.make_syl_features(u, g, y);
                        f.push(c.current_label.slice()),
                        a.push(o),
                        s.push(r[0]),
                        m.push(null),
                        p.push(u),
                        d.push(h),
                        n(1),
                        r = null,
                        u = null,
                        h = null
                    } else if (12 == c.process_level) {
                        l.push([e, i]);
                        let r = t.straighten_formants(o, i, y)
                          , u = t.sep_syllables(r, y)
                          , h = t.make_coeffs(u);
                        f.push(c.current_label.slice()),
                        a.push(o),
                        s.push(r[0]),
                        m.push(null),
                        p.push(u),
                        d.push(h),
                        n(1),
                        r = null,
                        u = null,
                        h = null
                    } else if (10 == c.process_level || 11 == c.process_level) {
                        l.push([e, i]);
                        let r = t.straighten_formants(o, i, y)
                          , u = t.sep_syllables(r, y);
                        f.push(c.current_label.slice()),
                        a.push(o),
                        s.push(r[0]),
                        m.push(null),
                        p.push(u),
                        n(1),
                        r = null,
                        u = null
                    } else if (5 == c.process_level) {
                        l.push([e, i]);
                        let r = t.straighten_formants(o, i, y)
                          , u = t.formant_features(r[0], g, y);
                        f.push(c.current_label.slice()),
                        a.push(o),
                        s.push(r[0]),
                        m.push(u),
                        n(1),
                        r = null,
                        u = null
                    } else if (4 == c.process_level) {
                        l.push([e, i]);
                        let r = t.straighten_formants(o, i, y);
                        f.push(c.current_label.slice()),
                        a.push(o),
                        s.push(r[0]),
                        n(1),
                        r = null
                    } else
                        3 == c.process_level ? (l.push([e, i]),
                        f.push(c.current_label.slice()),
                        a.push(o),
                        n(1)) : (console.error("Invalid process_level"),
                        r(0))
                } else
                    i > 1 ? (console.log(l.length + ": seg_size:" + i + ", ignored, too small < " + c.seg_min_frames),
                    n(0)) : n(0)
            }
            )
        }
        function q(e) {
            if (w++,
            e > g || w > 40 && e > 2 * y) {
                e >= g ? (w = 0,
                v = g = e) : e > v / 100 && (g -= parseInt(g / 8),
                w = 35);
                let n = Math.log10(g);
                y = n > 7 ? parseInt(Math.pow(10, n - 3) / 20) : n > 6 ? parseInt(Math.pow(10, n - 3) / 2) : n > 4 ? parseInt(Math.pow(10, n - 2) / 2) : n > 2 ? parseInt(Math.pow(10, n / 3)) : n > 1 ? parseInt(g / 10) : 1,
                b = y,
                k > 0 && x / k < 30 * y && (S(0),
                k = 0,
                x = 0),
                x += g,
                k += 1
            } else
                y > 10 && y > b / 10 && w > 20 && (y -= parseInt(b / 20)) < 10 && (y = 10)
        }
        function F() {
            if (A || null == M)
                return !0;
            if (c.spec_bands > 0) {
                if (11 == c.process_level)
                    if (p.length > l.length)
                        console.error("Array len mismatch");
                    else if (c.callbacks_processed < p.length) {
                        c.callbacks_processed = p.length;
                        const e = C()
                          , n = i.get_utterance_features(l, p);
                        M(0, c.current_label, e, n)
                    }
                if (12 == c.process_level || 13 == c.process_level)
                    if (d.length > l.length)
                        console.error("Array len mismatch");
                    else
                        for (; c.callbacks_processed < d.length; ) {
                            c.callbacks_processed++;
                            let e = c.callbacks_processed - 1;
                            d[e].length > 0 && M(e, c.current_label, L(e), d[e])
                        }
                else if (10 == c.process_level)
                    if (p.length > l.length)
                        console.error("Array len mismatch");
                    else
                        for (; c.callbacks_processed < p.length; ) {
                            c.callbacks_processed++;
                            let e = c.callbacks_processed - 1;
                            p[e][1].length > 0 && M(e, c.current_label, L(e), p[e][1])
                        }
                else if (5 == c.process_level)
                    if (m.length > l.length)
                        console.error("Array len mismatch");
                    else
                        for (; c.callbacks_processed < m.length; ) {
                            c.callbacks_processed++;
                            let e = c.callbacks_processed - 1;
                            m[e].length > 0 && M(e, c.current_label, E(e), m[e])
                        }
                else if (4 == c.process_level)
                    if (s.length > l.length)
                        console.error("Array len mismatch");
                    else
                        for (; c.callbacks_processed < s.length; ) {
                            c.callbacks_processed++;
                            let e = c.callbacks_processed - 1;
                            s[e].length > 0 && M(e, c.current_label, E(e), s[e])
                        }
                else if (3 == c.process_level)
                    for (; c.callbacks_processed < a.length; ) {
                        c.callbacks_processed++;
                        let e = c.callbacks_processed - 1;
                        a[e].length > 0 && M(e, c.current_label, E(e), a[e])
                    }
                else
                    2 == c.process_level ? c.current_frame - c.callbacks_processed > c.seg_min_frames && (M(c.current_frame, c.current_label, [c.current_frame * c.window_step, c.plot_len * c.window_step], u),
                    c.callbacks_processed = c.current_frame) : c.current_frame > c.callbacks_processed && (c.callbacks_processed = c.current_frame,
                    M(c.current_frame, c.current_label, [c.current_frame * c.window_step, c.window_step], u))
            } else
                console.warn("s_set.spec_bands is not set yet.");
            return !0
        }
        function I(e, n) {
            if (c.spec_bands == e.length)
                if (c.current_frame++,
                c.process_level <= 2) {
                    u.push(e);
                    let n = o.arrayMax(e);
                    c.process_level <= 1 ? (u.splice(0, u.length - 1),
                    n > y && F()) : u.length > c.plot_len && (u.splice(0, 1),
                    n > y && F()),
                    c.auto_noise_gate && (n > g ? (g = n,
                    w = 0,
                    v = n) : w > c.seg_limit_1 && g > v / 4 ? g *= .99 : w++)
                } else
                    h.push(e),
                    0 == _ && j();
            else
                console.error("Error: bins num mismatch " + c.spec_bands + ", " + e.length)
        }
        function B() {
            window.setTimeout((function() {
                c.play_end = !0,
                0 == _ && j()
            }
            ), 10)
        }
        function V() {
            return g / 7
        }
        function z() {
            return u
        }
        function O(e, n) {
            return n >= 4 && c.process_level >= 4 ? s[e] : c.process_level >= 3 ? a[e] : []
        }
        function R(e) {
            return p[e][0]
        }
        function D(e) {
            return 12 == c.process_level ? d[e] : (console.error("Invalid process level for syllable curves " + c.process_level),
            null)
        }
        function L(e) {
            const n = p[e][0].length;
            let r = [];
            try {
                for (let t = 0; t < n; t++)
                    r[t] = [],
                    r[t][0] = ((l[e][0] + p[e][0][t][0]) * c.window_step).toFixed(3),
                    r[t][1] = ((p[e][0][t][1] + 1) * c.window_step).toFixed(3)
            } catch (e) {
                console.error(e)
            }
            return r
        }
        function U(e) {
            return l[e]
        }
        function C() {
            const e = l.length;
            if (e > 0) {
                let n = 0;
                for (let r = 0; r < e; r++)
                    n += l[r][1];
                return [l[0][0] * c.window_step, (n + 1) * c.window_step]
            }
            return [0, 0]
        }
        function E(e) {
            return [l[e][0] * c.window_step, (l[e][1] + 1) * c.window_step]
        }
        function X(e) {
            return e >= 6 && c.process_level >= 6 || e >= 4 && c.process_level >= 4 ? s.length : 3 == c.process_level ? a.length : 0
        }
        function H(e) {
            return f[e]
        }
        function Y(e, n, r) {
            for (; f[e].length < n; )
                f[e][f[e].length] = -1;
            f[e][n] = r
        }
    }
    , function(e, n, r) {
        "use strict";
        r.r(n),
        r.d(n, "formant_features", (function() {
            return l
        }
        )),
        r.d(n, "make_syl_features", (function() {
            return m
        }
        )),
        r.d(n, "make_coeffs", (function() {
            return p
        }
        )),
        r.d(n, "sep_syllables", (function() {
            return d
        }
        )),
        r.d(n, "straighten_formants", (function() {
            return h
        }
        )),
        r.d(n, "rescale_formants", (function() {
            return _
        }
        )),
        r.d(n, "get_ranked_formants", (function() {
            return g
        }
        )),
        r.d(n, "clear_fm", (function() {
            return y
        }
        )),
        r.d(n, "accumulate_fm", (function() {
            return v
        }
        )),
        r.d(n, "straighten_formants_feb28", (function() {
            return w
        }
        ));
        const t = r(0)
          , i = r(5)
          , o = [3, 4, 6, 9]
          , c = o.length;
        var u = [];
        let a = 0
          , s = 0;
        function l(e, n, r) {
            try {
                const i = e.length;
                let o = new Array(3).fill(0)
                  , c = new Array(3).fill(0)
                  , u = new Array(3).fill(0)
                  , l = new Array(3).fill(0)
                  , f = new Array(3).fill(0)
                  , m = new Array(3).fill(0)
                  , p = new Array(3).fill(0)
                  , d = new Array(3).fill(0)
                  , h = new Array(3).fill(0)
                  , _ = new Array(3).fill(0)
                  , g = new Array(3).fill(0)
                  , y = new Array(3).fill(0)
                  , v = new Array(3).fill(0)
                  , b = new Array(3).fill(0)
                  , w = new Array(3).fill(0);
                for (let r = 0; r < 3; r++) {
                    let a = !1
                      , s = []
                      , x = []
                      , k = []
                      , M = []
                      , A = []
                      , P = []
                      , T = 0
                      , S = 0;
                    for (let n = 0; n < i; n++) {
                        let t = e[n][3 * r]
                          , i = e[n][3 * r + 1];
                        if (t > 0 && i > 0) {
                            let f = e[n][3 * r + 2]
                              , m = 20 * Math.log10(i);
                            if (s.push(t * m),
                            x.push(t),
                            A.push(f * m),
                            k.push(i),
                            M.push(m),
                            a) {
                                let o = t - e[n - 1][3 * r];
                                o > 1 ? u[r] += o : o < -1 && (l[r] += -1 * o),
                                i > S ? (S = i,
                                T = 1) : 1 == T && i < S / 2 && (S > 10 && P.push(m),
                                S = 0,
                                T = -1)
                            }
                            a || (c[r] += 1),
                            a = !0,
                            o[r] += 1
                        } else
                            a = !1,
                            T = 0,
                            S = 0
                    }
                    if (c[r] > 0) {
                        let e = t.arraySum(k);
                        h[r] = e / i * 100 / n,
                        _[r] = e / o[r] * 100 / n;
                        let c = t.arraySum(M);
                        f[r] = t.arraySum(s) / c,
                        m[r] = t.only_std_NZ(x),
                        g[r] = t.arraySum(A) / c;
                        let u = t.mean_std_NZ(M);
                        if (p[r] = u[0],
                        d[r] = u[1],
                        y[r] = P.length,
                        y[r] > 0) {
                            let e = t.mean_std_NZ(P);
                            v[r] = e[0],
                            w[r] = e[1],
                            b[r] = 100 * (v[r] / (c / M.length) - 1)
                        }
                    }
                }
                let x = [];
                x.push(i),
                x.push(Math.sqrt(i)),
                x.push(s / a),
                x.push(Math.log10(n)),
                x.push(r);
                for (let e = 0; e < 3; e++)
                    x.push(f[e]),
                    x.push(m[e]),
                    x.push(p[e]),
                    x.push(d[e]),
                    x.push(h[e]),
                    x.push(_[e]),
                    x.push(g[e]),
                    x.push(o[e]),
                    x.push(c[e]),
                    x.push(u[e]),
                    x.push(l[e]),
                    x.push(y[e]),
                    x.push(v[e]),
                    x.push(w[e]),
                    x.push(b[e]),
                    x.push(100 * o[e] / i);
                return x
            } catch (e) {
                return console.error(e),
                null
            }
        }
        function f(e, n, r=3, o=!1) {
            let c = []
              , u = []
              , a = []
              , s = []
              , l = -1;
            for (let t = 0; t < e.length; t++)
                if (e[t][n] > 0) {
                    -1 == l && (l = t),
                    s = [],
                    c.push(t - l),
                    o ? u.push(10 * Math.log10(e[t][n])) : u.push(e[t][n]);
                    for (let e = 0; e <= r; e++)
                        s.push(1 * Math.pow(t, e));
                    a.push(s)
                }
            if (c.length > 2) {
                let e = i.transpose([u])
                  , n = i.transpose(a)
                  , r = i.dot(n, a)
                  , o = i.inv(r)
                  , s = i.dot(n, e);
                var f = new Float32Array(i.dot(o, s))
                  , m = function(e) {
                    let n = 0;
                    for (let r = 0; r < c.length; ++r) {
                        let i = t.solve_poly(e, c[r]) - u[r];
                        n += i * i
                    }
                    return n
                };
                f = i.uncmin(m, f).solution;
                let l = Math.sqrt(m(f)) / c.length;
                return f.push(l),
                f.push(c.length),
                f
            }
            {
                let e = new Array(r + 1).fill(0);
                return e.push(0),
                e.push(c.length),
                e
            }
        }
        function m(e, n, r) {
            let t = e[1]
              , i = [];
            try {
                for (let e = 0; e < t.length; e++)
                    i.push(l(t[e], n, r))
            } catch (e) {
                console.error(e)
            }
            return i
        }
        function p(e, n, r) {
            let t = [];
            try {
                for (let n = 0; n < e[1].length; n++) {
                    let r = f(e[2][n], 1, 4, !0)
                      , i = f(e[1][n], 0, 3)
                      , o = f(e[1][n], 3, 3)
                      , c = f(e[1][n], 6, 1);
                    if (e[1][n].length > 1) {
                        let e = [].concat(r, i, o, c);
                        t.push(e)
                    }
                }
            } catch (e) {
                console.error(e)
            }
            return t
        }
        function d(e, n) {
            let r = e[0]
              , t = e[1];
            const i = t.length;
            let o = -1
              , c = []
              , u = []
              , a = []
              , s = 0
              , l = 0;
            try {
                for (let e = 0; e < i; e++)
                    if (t[e][1] > n ? (s = 0,
                    l++,
                    o < 0 && (o = e)) : s++,
                    l > 20 && s > 0 || l > 10 && s > 1 || l > 0 && s > 4 || e >= i - 1 && l > 4) {
                        let n = e - s;
                        n - o > 1 && (u.push(r.slice(o, n)),
                        a.push(t.slice(o, n)),
                        c.push([o, n - o]),
                        o = -1,
                        l = 0)
                    }
            } catch (e) {
                console.error(e)
            }
            return [c, u, a]
        }
        function h(e, n, r) {
            let t = []
              , i = [];
            for (let e = 0; e < n; e++)
                t.push(new Float32Array(9).fill(0)),
                i.push(new Float32Array(3).fill(0));
            let o = 0
              , c = 0;
            for (let n = 0; n < e.length; n++) {
                const u = e[n][15] / e[n][13];
                if ((Math.abs(u - o) > 20 || c < 0) && (o = u,
                c++,
                c >= 3))
                    break;
                let a = 3 * c
                  , s = 3 * c + 1
                  , l = 3 * c + 2;
                for (let o = 0; o < e[n][14]; o++) {
                    let u = c;
                    a = 3 * u,
                    s = 3 * u + 1,
                    l = 3 * u + 2;
                    const f = e[n][10][o];
                    if (f > 0) {
                        const c = e[n][12][o]
                          , m = e[n][7][o]
                          , p = e[n][9][o] - e[n][8][o] + 1;
                        t[m][a] > r && t[m][a] < f && u < 2 && (u < 3 && u++,
                        a = 3 * u,
                        s = 3 * u + 1,
                        l = 3 * u + 2),
                        t[m][a] = f,
                        t[m][s] = c,
                        t[m][l] = p,
                        i[m][0] += f * c,
                        i[m][1] += c,
                        i[m][2] += p * c
                    }
                }
            }
            return [t, i]
        }
        function _(e) {
            e.length;
            for (let e = 0; e < 3; e++)
                ;
        }
        function g() {
            let e = [];
            for (let n = 0; n < u.length; n++)
                if (u[n][14] >= 2) {
                    const r = u[n][15] / u[n][13];
                    if (r >= 7) {
                        let t = 0;
                        if (0 == e.length)
                            e.push(u[n]);
                        else {
                            for (; t < e.length; ) {
                                if (e[t][15] / e[t][13] > r) {
                                    e.splice(t, 0, u[n]);
                                    break
                                }
                                t++
                            }
                            t == e.length && e.push(u[n])
                        }
                    }
                }
            return e
        }
        function y() {
            u = null,
            u = [],
            a = 0,
            s = 0
        }
        function v(e, n, r, t, i) {
            let l = n.length;
            if (l < 1)
                return;
            let f = new Array(l).fill(-1)
              , m = new Array(l).fill(0);
            a += t;
            for (let t = 0; t < u.length; t++) {
                let i = r - u[t][3];
                if (i >= 0 && i < c) {
                    let r = u[t][7].length;
                    for (let c = 0; c < l; c++) {
                        let a = Math.abs(u[t][5] - n[c][2]);
                        if (a < o[i]) {
                            let o = b(i, a, r, u[t][5], n[c][2], u[t][6], e[n[c][2]], u[t][4]);
                            o > 1 && o > m[c] && (m[c] = o,
                            f[c] = t)
                        }
                    }
                }
            }
            for (let t = 0; t < u.length; t++) {
                let o = [];
                for (let e = 0; e < l; e++)
                    f[e] == t && o.push(e);
                if (o.length > 0) {
                    let c = n[o[0]][2]
                      , l = e[c];
                    if (l > i) {
                        let i = n[o[0]][0]
                          , f = n[o[0]][1];
                        for (let r = 0; r < o.length; r++)
                            n[o[r]][1] > f && (f = n[o[r]][1]),
                            n[o[r]][0] < i && (i = n[o[r]][0]),
                            e[n[o[r]][2]] > e[c] && (c = n[o[r]][2]);
                        let m = 0;
                        for (let n = i; n <= f; n++)
                            m += e[n];
                        m = m;
                        let p = u[t][10].length;
                        p >= 3 ? u[t][4] = (c - u[t][10][p - 1] + (u[t][10][p - 2] - u[t][10][p - 1]) + (u[t][10][p - 3] - u[t][10][p - 2])) / 3 : 2 == p ? u[t][4] = (c - u[t][10][p - 1] + (u[t][10][p - 2] - u[t][10][p - 1])) / 2 : 1 == p && (u[t][4] = c - u[t][10][p - 1]),
                        u[t][0] = i,
                        u[t][1] = f,
                        u[t][2] = r,
                        u[t][3] = r,
                        u[t][5] = c,
                        u[t][6] = l,
                        u[t][7].push(r),
                        u[t][8].push(i),
                        u[t][9].push(f),
                        u[t][10].push(c),
                        u[t][11].push(l),
                        u[t][12].push(m),
                        u[t][13] += m,
                        u[t][14] += 1,
                        u[t][15] += m * c,
                        u[t][16] = 0,
                        u[t][17] += f - i + 1,
                        a -= m,
                        s += m
                    }
                }
            }
            for (let t = 0; t < l; t++)
                if (-1 == f[t]) {
                    let o = n[t][2]
                      , c = e[o];
                    if (c > i) {
                        let i = n[t][0]
                          , a = n[t][1]
                          , s = 0;
                        for (let n = i; n <= a; n++)
                            s += e[n];
                        s = s;
                        let l = [];
                        l[0] = i,
                        l[1] = a,
                        l[2] = r,
                        l[3] = r,
                        l[4] = 0,
                        l[5] = o,
                        l[6] = c,
                        l[7] = [r],
                        l[8] = [i],
                        l[9] = [a],
                        l[10] = [o],
                        l[11] = [c],
                        l[12] = [s],
                        l[13] = s,
                        l[14] = 1,
                        l[15] = s * o,
                        l[16] = 0,
                        l[17] = a - i + 1,
                        u.push(l)
                    }
                }
        }
        function b(e, n, r, t, i, o, c, u) {
            let a = 0;
            if (o >= c)
                a = c / o;
            else {
                if (!(c > 0))
                    return 0;
                a = o / c
            }
            if (0 == e)
                return a > .1 ? 300 * a / n : 0;
            {
                if (a < .001)
                    return 0;
                a >= 1 ? a = 10 : a < .1 ? a = 1 : a *= 10;
                let n = 10 - Math.abs(i - t - u);
                if (n < 0)
                    return 0;
                n < 1 && (n = 1);
                let o = r;
                return o > 10 && (o = 10),
                10 / e * (n * n + o * a)
            }
        }
        function w(e, n, r) {
            let t = []
              , i = []
              , o = []
              , c = [];
            for (let e = 0; e < n; e++)
                t.push(new Array(18).fill(0)),
                i.push(new Array(3).fill(0)),
                o.push(new Int32Array(6).fill(0)),
                c.push(new Int32Array(6).fill(0));
            for (let n = 0; n < e.length; n++)
                for (let u = 0; u < e[n][14]; u++) {
                    const a = e[n][7][u]
                      , s = e[n][10][u]
                      , l = e[n][12][u];
                    let f = !1;
                    for (let m = 0; m < 6; m++) {
                        const p = 3 * m
                          , d = 3 * m + 1
                          , h = 3 * m + 2;
                        if (c[a][m] < r || Math.abs(s - o[a][m] / c[a][m]) < 10) {
                            if (0 == t[a][d])
                                f = !0;
                            else if (t[a][d] < l) {
                                for (let e = 5; e > m; e--)
                                    t[a][3 * e] = t[a][3 * (e - 1)],
                                    t[a][3 * e + 1] = t[a][3 * (e - 1) + 1],
                                    t[a][3 * e + 2] = t[a][3 * (e - 1) + 2];
                                f = !0
                            }
                            if (f) {
                                const r = e[n][9][u] - e[n][8][u] + 1;
                                t[a][p] = s,
                                t[a][d] = l,
                                t[a][h] = r,
                                o[a][m] += s * l,
                                c[a][m] += l,
                                i[a][0] += s * l,
                                i[a][1] += l,
                                i[a][2] += r * l;
                                break
                            }
                        }
                    }
                }
            return [t, i]
        }
    }
    , function(module, exports, __webpack_require__) {
        "use strict";
        (function(global) {
            var numeric = exports;
            void 0 !== global && (global.numeric = numeric),
            numeric.version = "1.2.6",
            numeric.bench = function(e, n) {
                var r, t, i;
                for (void 0 === n && (n = 15),
                t = .5,
                r = new Date; ; ) {
                    for (i = t *= 2; i > 3; i -= 4)
                        e(),
                        e(),
                        e(),
                        e();
                    for (; i > 0; )
                        e(),
                        i--;
                    if (new Date - r > n)
                        break
                }
                for (i = t; i > 3; i -= 4)
                    e(),
                    e(),
                    e(),
                    e();
                for (; i > 0; )
                    e(),
                    i--;
                return 1e3 * (3 * t - 1) / (new Date - r)
            }
            ,
            numeric._myIndexOf = function(e) {
                var n, r = this.length;
                for (n = 0; n < r; ++n)
                    if (this[n] === e)
                        return n;
                return -1
            }
            ,
            numeric.myIndexOf = Array.prototype.indexOf ? Array.prototype.indexOf : numeric._myIndexOf,
            numeric.Function = Function,
            numeric.precision = 4,
            numeric.largeArray = 50,
            numeric.prettyPrint = function(e) {
                var n = [];
                return function e(r) {
                    var t;
                    if (void 0 === r)
                        return n.push(Array(numeric.precision + 8).join(" ")),
                        !1;
                    if ("string" == typeof r)
                        return n.push('"' + r + '"'),
                        !1;
                    if ("boolean" == typeof r)
                        return n.push(r.toString()),
                        !1;
                    if ("number" == typeof r) {
                        var i = function e(n) {
                            if (0 === n)
                                return "0";
                            if (isNaN(n))
                                return "NaN";
                            if (n < 0)
                                return "-" + e(-n);
                            if (isFinite(n)) {
                                var r = Math.floor(Math.log(n) / Math.log(10))
                                  , t = n / Math.pow(10, r)
                                  , i = t.toPrecision(numeric.precision);
                                return 10 === parseFloat(i) && (r++,
                                i = (t = 1).toPrecision(numeric.precision)),
                                parseFloat(i).toString() + "e" + r.toString()
                            }
                            return "Infinity"
                        }(r)
                          , o = r.toPrecision(numeric.precision)
                          , c = parseFloat(r.toString()).toString()
                          , u = [i, o, c, parseFloat(o).toString(), parseFloat(c).toString()];
                        for (t = 1; t < u.length; t++)
                            u[t].length < i.length && (i = u[t]);
                        return n.push(Array(numeric.precision + 8 - i.length).join(" ") + i),
                        !1
                    }
                    if (null === r)
                        return n.push("null"),
                        !1;
                    if ("function" == typeof r) {
                        n.push(r.toString());
                        var a = !1;
                        for (t in r)
                            r.hasOwnProperty(t) && (a ? n.push(",\n") : n.push("\n{"),
                            a = !0,
                            n.push(t),
                            n.push(": \n"),
                            e(r[t]));
                        return a && n.push("}\n"),
                        !0
                    }
                    if (r instanceof Array) {
                        if (r.length > numeric.largeArray)
                            return n.push("...Large Array..."),
                            !0;
                        a = !1;
                        for (n.push("["),
                        t = 0; t < r.length; t++)
                            t > 0 && (n.push(","),
                            a && n.push("\n ")),
                            a = e(r[t]);
                        return n.push("]"),
                        !0
                    }
                    for (t in n.push("{"),
                    a = !1,
                    r)
                        r.hasOwnProperty(t) && (a && n.push(",\n"),
                        a = !0,
                        n.push(t),
                        n.push(": \n"),
                        e(r[t]));
                    return n.push("}"),
                    !0
                }(e),
                n.join("")
            }
            ,
            numeric.parseDate = function(e) {
                return function e(n) {
                    if ("string" == typeof n)
                        return Date.parse(n.replace(/-/g, "/"));
                    if (!(n instanceof Array))
                        throw new Error("parseDate: parameter must be arrays of strings");
                    var r, t = [];
                    for (r = 0; r < n.length; r++)
                        t[r] = e(n[r]);
                    return t
                }(e)
            }
            ,
            numeric.parseFloat = function(e) {
                return function e(n) {
                    if ("string" == typeof n)
                        return parseFloat(n);
                    if (!(n instanceof Array))
                        throw new Error("parseFloat: parameter must be arrays of strings");
                    var r, t = [];
                    for (r = 0; r < n.length; r++)
                        t[r] = e(n[r]);
                    return t
                }(e)
            }
            ,
            numeric.parseCSV = function(e) {
                var n, r, t, i = e.split("\n"), o = [], c = /(([^'",]*)|('[^']*')|("[^"]*")),/g, u = /^\s*(([+-]?[0-9]+(\.[0-9]*)?(e[+-]?[0-9]+)?)|([+-]?[0-9]*(\.[0-9]+)?(e[+-]?[0-9]+)?))\s*$/, a = 0;
                for (r = 0; r < i.length; r++) {
                    var s, l = (i[r] + ",").match(c);
                    if (l.length > 0) {
                        for (o[a] = [],
                        n = 0; n < l.length; n++)
                            s = (t = l[n]).substr(0, t.length - 1),
                            u.test(s) ? o[a][n] = parseFloat(s) : o[a][n] = s;
                        a++
                    }
                }
                return o
            }
            ,
            numeric.toCSV = function(e) {
                var n, r, t, i, o, c = numeric.dim(e);
                for (t = c[0],
                c[1],
                o = [],
                n = 0; n < t; n++) {
                    for (i = [],
                    r = 0; r < t; r++)
                        i[r] = e[n][r].toString();
                    o[n] = i.join(", ")
                }
                return o.join("\n") + "\n"
            }
            ,
            numeric.getURL = function(e) {
                var n = new XMLHttpRequest;
                return n.open("GET", e, !1),
                n.send(),
                n
            }
            ,
            numeric.imageURL = function(e) {
                function n(e, n, r) {
                    void 0 === n && (n = 0),
                    void 0 === r && (r = e.length);
                    var t, i = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117], o = -1;
                    e.length;
                    for (t = n; t < r; t++)
                        o = o >>> 8 ^ i[255 & (o ^ e[t])];
                    return -1 ^ o
                }
                var r, t, i, o, c, u, a, s, l, f, m = e[0].length, p = e[0][0].length, d = [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, p >> 24 & 255, p >> 16 & 255, p >> 8 & 255, 255 & p, m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, 255 & m, 8, 2, 0, 0, 0, -1, -2, -3, -4, -5, -6, -7, -8, 73, 68, 65, 84, 8, 29];
                for (f = n(d, 12, 29),
                d[29] = f >> 24 & 255,
                d[30] = f >> 16 & 255,
                d[31] = f >> 8 & 255,
                d[32] = 255 & f,
                r = 1,
                t = 0,
                a = 0; a < m; a++) {
                    for (a < m - 1 ? d.push(0) : d.push(1),
                    c = 3 * p + 1 + (0 === a) & 255,
                    u = 3 * p + 1 + (0 === a) >> 8 & 255,
                    d.push(c),
                    d.push(u),
                    d.push(255 & ~c),
                    d.push(255 & ~u),
                    0 === a && d.push(0),
                    s = 0; s < p; s++)
                        for (i = 0; i < 3; i++)
                            t = (t + (r = (r + (c = (c = e[i][a][s]) > 255 ? 255 : c < 0 ? 0 : Math.round(c))) % 65521)) % 65521,
                            d.push(c);
                    d.push(0)
                }
                return l = (t << 16) + r,
                d.push(l >> 24 & 255),
                d.push(l >> 16 & 255),
                d.push(l >> 8 & 255),
                d.push(255 & l),
                o = d.length - 41,
                d[33] = o >> 24 & 255,
                d[34] = o >> 16 & 255,
                d[35] = o >> 8 & 255,
                d[36] = 255 & o,
                f = n(d, 37),
                d.push(f >> 24 & 255),
                d.push(f >> 16 & 255),
                d.push(f >> 8 & 255),
                d.push(255 & f),
                d.push(0),
                d.push(0),
                d.push(0),
                d.push(0),
                d.push(73),
                d.push(69),
                d.push(78),
                d.push(68),
                d.push(174),
                d.push(66),
                d.push(96),
                d.push(130),
                "data:image/png;base64," + function(e) {
                    var n, r, t, i, o, c, u, a = e.length, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", l = "";
                    for (n = 0; n < a; n += 3)
                        o = ((3 & (r = e[n])) << 4) + ((t = e[n + 1]) >> 4),
                        c = ((15 & t) << 2) + ((i = e[n + 2]) >> 6),
                        u = 63 & i,
                        n + 1 >= a ? c = u = 64 : n + 2 >= a && (u = 64),
                        l += s.charAt(r >> 2) + s.charAt(o) + s.charAt(c) + s.charAt(u);
                    return l
                }(d)
            }
            ,
            numeric._dim = function(e) {
                for (var n = []; "object" == typeof e; )
                    n.push(e.length),
                    e = e[0];
                return n
            }
            ,
            numeric.dim = function(e) {
                var n;
                return "object" == typeof e ? "object" == typeof (n = e[0]) ? "object" == typeof n[0] ? numeric._dim(e) : [e.length, n.length] : [e.length] : []
            }
            ,
            numeric.mapreduce = function(e, n) {
                return Function("x", "accum", "_s", "_k", 'if(typeof accum === "undefined") accum = ' + n + ';\nif(typeof x === "number") { var xi = x; ' + e + '; return accum; }\nif(typeof _s === "undefined") _s = numeric.dim(x);\nif(typeof _k === "undefined") _k = 0;\nvar _n = _s[_k];\nvar i,xi;\nif(_k < _s.length-1) {\n    for(i=_n-1;i>=0;i--) {\n        accum = arguments.callee(x[i],accum,_s,_k+1);\n    }    return accum;\n}\nfor(i=_n-1;i>=1;i-=2) { \n    xi = x[i];\n    ' + e + ";\n    xi = x[i-1];\n    " + e + ";\n}\nif(i === 0) {\n    xi = x[i];\n    " + e + "\n}\nreturn accum;")
            }
            ,
            numeric.mapreduce2 = function(e, n) {
                return Function("x", "var n = x.length;\nvar i,xi;\n" + n + ";\nfor(i=n-1;i!==-1;--i) { \n    xi = x[i];\n    " + e + ";\n}\nreturn accum;")
            }
            ,
            numeric.same = function e(n, r) {
                var t, i;
                if (!(n instanceof Array && r instanceof Array))
                    return !1;
                if ((i = n.length) !== r.length)
                    return !1;
                for (t = 0; t < i; t++)
                    if (n[t] !== r[t]) {
                        if ("object" != typeof n[t])
                            return !1;
                        if (!e(n[t], r[t]))
                            return !1
                    }
                return !0
            }
            ,
            numeric.rep = function(e, n, r) {
                void 0 === r && (r = 0);
                var t, i = e[r], o = Array(i);
                if (r === e.length - 1) {
                    for (t = i - 2; t >= 0; t -= 2)
                        o[t + 1] = n,
                        o[t] = n;
                    return -1 === t && (o[0] = n),
                    o
                }
                for (t = i - 1; t >= 0; t--)
                    o[t] = numeric.rep(e, n, r + 1);
                return o
            }
            ,
            numeric.dotMMsmall = function(e, n) {
                var r, t, i, o, c, u, a, s, l, f, m;
                for (o = e.length,
                c = n.length,
                u = n[0].length,
                a = Array(o),
                r = o - 1; r >= 0; r--) {
                    for (s = Array(u),
                    l = e[r],
                    i = u - 1; i >= 0; i--) {
                        for (f = l[c - 1] * n[c - 1][i],
                        t = c - 2; t >= 1; t -= 2)
                            m = t - 1,
                            f += l[t] * n[t][i] + l[m] * n[m][i];
                        0 === t && (f += l[0] * n[0][i]),
                        s[i] = f
                    }
                    a[r] = s
                }
                return a
            }
            ,
            numeric._getCol = function(e, n, r) {
                var t;
                for (t = e.length - 1; t > 0; --t)
                    r[t] = e[t][n],
                    r[--t] = e[t][n];
                0 === t && (r[0] = e[0][n])
            }
            ,
            numeric.dotMMbig = function(e, n) {
                var r, t, i, o = numeric._getCol, c = n.length, u = Array(c), a = e.length, s = n[0].length, l = new Array(a), f = numeric.dotVV;
                for (--c,
                t = --a; -1 !== t; --t)
                    l[t] = Array(s);
                for (t = --s; -1 !== t; --t)
                    for (o(n, t, u),
                    i = a; -1 !== i; --i)
                        0,
                        r = e[i],
                        l[i][t] = f(r, u);
                return l
            }
            ,
            numeric.dotMV = function(e, n) {
                var r, t = e.length, i = (n.length,
                Array(t)), o = numeric.dotVV;
                for (r = t - 1; r >= 0; r--)
                    i[r] = o(e[r], n);
                return i
            }
            ,
            numeric.dotVM = function(e, n) {
                var r, t, i, o, c, u, a;
                for (i = e.length,
                o = n[0].length,
                c = Array(o),
                t = o - 1; t >= 0; t--) {
                    for (u = e[i - 1] * n[i - 1][t],
                    r = i - 2; r >= 1; r -= 2)
                        a = r - 1,
                        u += e[r] * n[r][t] + e[a] * n[a][t];
                    0 === r && (u += e[0] * n[0][t]),
                    c[t] = u
                }
                return c
            }
            ,
            numeric.dotVV = function(e, n) {
                var r, t, i = e.length, o = e[i - 1] * n[i - 1];
                for (r = i - 2; r >= 1; r -= 2)
                    t = r - 1,
                    o += e[r] * n[r] + e[t] * n[t];
                return 0 === r && (o += e[0] * n[0]),
                o
            }
            ,
            numeric.dot = function(e, n) {
                var r = numeric.dim;
                switch (1e3 * r(e).length + r(n).length) {
                case 2002:
                    return n.length < 10 ? numeric.dotMMsmall(e, n) : numeric.dotMMbig(e, n);
                case 2001:
                    return numeric.dotMV(e, n);
                case 1002:
                    return numeric.dotVM(e, n);
                case 1001:
                    return numeric.dotVV(e, n);
                case 1e3:
                    return numeric.mulVS(e, n);
                case 1:
                    return numeric.mulSV(e, n);
                case 0:
                    return e * n;
                default:
                    throw new Error("numeric.dot only works on vectors and matrices")
                }
            }
            ,
            numeric.diag = function(e) {
                var n, r, t, i, o = e.length, c = Array(o);
                for (n = o - 1; n >= 0; n--) {
                    for (i = Array(o),
                    r = n + 2,
                    t = o - 1; t >= r; t -= 2)
                        i[t] = 0,
                        i[t - 1] = 0;
                    for (t > n && (i[t] = 0),
                    i[n] = e[n],
                    t = n - 1; t >= 1; t -= 2)
                        i[t] = 0,
                        i[t - 1] = 0;
                    0 === t && (i[0] = 0),
                    c[n] = i
                }
                return c
            }
            ,
            numeric.getDiag = function(e) {
                var n, r = Math.min(e.length, e[0].length), t = Array(r);
                for (n = r - 1; n >= 1; --n)
                    t[n] = e[n][n],
                    t[--n] = e[n][n];
                return 0 === n && (t[0] = e[0][0]),
                t
            }
            ,
            numeric.identity = function(e) {
                return numeric.diag(numeric.rep([e], 1))
            }
            ,
            numeric.pointwise = function(e, n, r) {
                void 0 === r && (r = "");
                var t, i, o = [], c = /\[i\]$/, u = "", a = !1;
                for (t = 0; t < e.length; t++)
                    c.test(e[t]) ? u = i = e[t].substring(0, e[t].length - 3) : i = e[t],
                    "ret" === i && (a = !0),
                    o.push(i);
                return o[e.length] = "_s",
                o[e.length + 1] = "_k",
                o[e.length + 2] = 'if(typeof _s === "undefined") _s = numeric.dim(' + u + ');\nif(typeof _k === "undefined") _k = 0;\nvar _n = _s[_k];\nvar i' + (a ? "" : ", ret = Array(_n)") + ";\nif(_k < _s.length-1) {\n    for(i=_n-1;i>=0;i--) ret[i] = arguments.callee(" + e.join(",") + ",_s,_k+1);\n    return ret;\n}\n" + r + "\nfor(i=_n-1;i!==-1;--i) {\n    " + n + "\n}\nreturn ret;",
                Function.apply(null, o)
            }
            ,
            numeric.pointwise2 = function(e, n, r) {
                void 0 === r && (r = "");
                var t, i, o = [], c = /\[i\]$/, u = "", a = !1;
                for (t = 0; t < e.length; t++)
                    c.test(e[t]) ? u = i = e[t].substring(0, e[t].length - 3) : i = e[t],
                    "ret" === i && (a = !0),
                    o.push(i);
                return o[e.length] = "var _n = " + u + ".length;\nvar i" + (a ? "" : ", ret = Array(_n)") + ";\n" + r + "\nfor(i=_n-1;i!==-1;--i) {\n" + n + "\n}\nreturn ret;",
                Function.apply(null, o)
            }
            ,
            numeric._biforeach = function e(n, r, t, i, o) {
                var c;
                if (i !== t.length - 1)
                    for (c = t[i] - 1; c >= 0; c--)
                        e("object" == typeof n ? n[c] : n, "object" == typeof r ? r[c] : r, t, i + 1, o);
                else
                    o(n, r)
            }
            ,
            numeric._biforeach2 = function e(n, r, t, i, o) {
                if (i === t.length - 1)
                    return o(n, r);
                var c, u = t[i], a = Array(u);
                for (c = u - 1; c >= 0; --c)
                    a[c] = e("object" == typeof n ? n[c] : n, "object" == typeof r ? r[c] : r, t, i + 1, o);
                return a
            }
            ,
            numeric._foreach = function e(n, r, t, i) {
                var o;
                if (t !== r.length - 1)
                    for (o = r[t] - 1; o >= 0; o--)
                        e(n[o], r, t + 1, i);
                else
                    i(n)
            }
            ,
            numeric._foreach2 = function e(n, r, t, i) {
                if (t === r.length - 1)
                    return i(n);
                var o, c = r[t], u = Array(c);
                for (o = c - 1; o >= 0; o--)
                    u[o] = e(n[o], r, t + 1, i);
                return u
            }
            ,
            numeric.ops2 = {
                add: "+",
                sub: "-",
                mul: "*",
                div: "/",
                mod: "%",
                and: "&&",
                or: "||",
                eq: "===",
                neq: "!==",
                lt: "<",
                gt: ">",
                leq: "<=",
                geq: ">=",
                band: "&",
                bor: "|",
                bxor: "^",
                lshift: "<<",
                rshift: ">>",
                rrshift: ">>>"
            },
            numeric.opseq = {
                addeq: "+=",
                subeq: "-=",
                muleq: "*=",
                diveq: "/=",
                modeq: "%=",
                lshifteq: "<<=",
                rshifteq: ">>=",
                rrshifteq: ">>>=",
                bandeq: "&=",
                boreq: "|=",
                bxoreq: "^="
            },
            numeric.mathfuns = ["abs", "acos", "asin", "atan", "ceil", "cos", "exp", "floor", "log", "round", "sin", "sqrt", "tan", "isNaN", "isFinite"],
            numeric.mathfuns2 = ["atan2", "pow", "max", "min"],
            numeric.ops1 = {
                neg: "-",
                not: "!",
                bnot: "~",
                clone: ""
            },
            numeric.mapreducers = {
                any: ["if(xi) return true;", "var accum = false;"],
                all: ["if(!xi) return false;", "var accum = true;"],
                sum: ["accum += xi;", "var accum = 0;"],
                prod: ["accum *= xi;", "var accum = 1;"],
                norm2Squared: ["accum += xi*xi;", "var accum = 0;"],
                norminf: ["accum = max(accum,abs(xi));", "var accum = 0, max = Math.max, abs = Math.abs;"],
                norm1: ["accum += abs(xi)", "var accum = 0, abs = Math.abs;"],
                sup: ["accum = max(accum,xi);", "var accum = -Infinity, max = Math.max;"],
                inf: ["accum = min(accum,xi);", "var accum = Infinity, min = Math.min;"]
            },
            function() {
                var e, n;
                for (e = 0; e < numeric.mathfuns2.length; ++e)
                    n = numeric.mathfuns2[e],
                    numeric.ops2[n] = n;
                for (e in numeric.ops2)
                    if (numeric.ops2.hasOwnProperty(e)) {
                        n = numeric.ops2[e];
                        var r, t, i = "";
                        -1 !== numeric.myIndexOf.call(numeric.mathfuns2, e) ? (i = "var " + n + " = Math." + n + ";\n",
                        r = function(e, r, t) {
                            return e + " = " + n + "(" + r + "," + t + ")"
                        }
                        ,
                        t = function(e, r) {
                            return e + " = " + n + "(" + e + "," + r + ")"
                        }
                        ) : (r = function(e, r, t) {
                            return e + " = " + r + " " + n + " " + t
                        }
                        ,
                        t = numeric.opseq.hasOwnProperty(e + "eq") ? function(e, r) {
                            return e + " " + n + "= " + r
                        }
                        : function(e, r) {
                            return e + " = " + e + " " + n + " " + r
                        }
                        ),
                        numeric[e + "VV"] = numeric.pointwise2(["x[i]", "y[i]"], r("ret[i]", "x[i]", "y[i]"), i),
                        numeric[e + "SV"] = numeric.pointwise2(["x", "y[i]"], r("ret[i]", "x", "y[i]"), i),
                        numeric[e + "VS"] = numeric.pointwise2(["x[i]", "y"], r("ret[i]", "x[i]", "y"), i),
                        numeric[e] = Function("var n = arguments.length, i, x = arguments[0], y;\nvar VV = numeric." + e + "VV, VS = numeric." + e + "VS, SV = numeric." + e + 'SV;\nvar dim = numeric.dim;\nfor(i=1;i!==n;++i) { \n  y = arguments[i];\n  if(typeof x === "object") {\n      if(typeof y === "object") x = numeric._biforeach2(x,y,dim(x),0,VV);\n      else x = numeric._biforeach2(x,y,dim(x),0,VS);\n  } else if(typeof y === "object") x = numeric._biforeach2(x,y,dim(y),0,SV);\n  else ' + t("x", "y") + "\n}\nreturn x;\n"),
                        numeric[n] = numeric[e],
                        numeric[e + "eqV"] = numeric.pointwise2(["ret[i]", "x[i]"], t("ret[i]", "x[i]"), i),
                        numeric[e + "eqS"] = numeric.pointwise2(["ret[i]", "x"], t("ret[i]", "x"), i),
                        numeric[e + "eq"] = Function("var n = arguments.length, i, x = arguments[0], y;\nvar V = numeric." + e + "eqV, S = numeric." + e + 'eqS\nvar s = numeric.dim(x);\nfor(i=1;i!==n;++i) { \n  y = arguments[i];\n  if(typeof y === "object") numeric._biforeach(x,y,s,0,V);\n  else numeric._biforeach(x,y,s,0,S);\n}\nreturn x;\n')
                    }
                for (e = 0; e < numeric.mathfuns2.length; ++e)
                    n = numeric.mathfuns2[e],
                    delete numeric.ops2[n];
                for (e = 0; e < numeric.mathfuns.length; ++e)
                    n = numeric.mathfuns[e],
                    numeric.ops1[n] = n;
                for (e in numeric.ops1)
                    numeric.ops1.hasOwnProperty(e) && (i = "",
                    n = numeric.ops1[e],
                    -1 !== numeric.myIndexOf.call(numeric.mathfuns, e) && Math.hasOwnProperty(n) && (i = "var " + n + " = Math." + n + ";\n"),
                    numeric[e + "eqV"] = numeric.pointwise2(["ret[i]"], "ret[i] = " + n + "(ret[i]);", i),
                    numeric[e + "eq"] = Function("x", 'if(typeof x !== "object") return ' + n + "x\nvar i;\nvar V = numeric." + e + "eqV;\nvar s = numeric.dim(x);\nnumeric._foreach(x,s,0,V);\nreturn x;\n"),
                    numeric[e + "V"] = numeric.pointwise2(["x[i]"], "ret[i] = " + n + "(x[i]);", i),
                    numeric[e] = Function("x", 'if(typeof x !== "object") return ' + n + "(x)\nvar i;\nvar V = numeric." + e + "V;\nvar s = numeric.dim(x);\nreturn numeric._foreach2(x,s,0,V);\n"));
                for (e = 0; e < numeric.mathfuns.length; ++e)
                    n = numeric.mathfuns[e],
                    delete numeric.ops1[n];
                for (e in numeric.mapreducers)
                    numeric.mapreducers.hasOwnProperty(e) && (n = numeric.mapreducers[e],
                    numeric[e + "V"] = numeric.mapreduce2(n[0], n[1]),
                    numeric[e] = Function("x", "s", "k", n[1] + 'if(typeof x !== "object") {    xi = x;\n' + n[0] + ';\n    return accum;\n}if(typeof s === "undefined") s = numeric.dim(x);\nif(typeof k === "undefined") k = 0;\nif(k === s.length-1) return numeric.' + e + "V(x);\nvar xi;\nvar n = x.length, i;\nfor(i=n-1;i!==-1;--i) {\n   xi = arguments.callee(x[i]);\n" + n[0] + ";\n}\nreturn accum;\n"))
            }(),
            numeric.truncVV = numeric.pointwise(["x[i]", "y[i]"], "ret[i] = round(x[i]/y[i])*y[i];", "var round = Math.round;"),
            numeric.truncVS = numeric.pointwise(["x[i]", "y"], "ret[i] = round(x[i]/y)*y;", "var round = Math.round;"),
            numeric.truncSV = numeric.pointwise(["x", "y[i]"], "ret[i] = round(x/y[i])*y[i];", "var round = Math.round;"),
            numeric.trunc = function(e, n) {
                return "object" == typeof e ? "object" == typeof n ? numeric.truncVV(e, n) : numeric.truncVS(e, n) : "object" == typeof n ? numeric.truncSV(e, n) : Math.round(e / n) * n
            }
            ,
            numeric.inv = function(e) {
                var n, r, t, i, o, c, u, a = numeric.dim(e), s = Math.abs, l = a[0], f = a[1], m = numeric.clone(e), p = numeric.identity(l);
                for (c = 0; c < f; ++c) {
                    var d = -1
                      , h = -1;
                    for (o = c; o !== l; ++o)
                        (u = s(m[o][c])) > h && (d = o,
                        h = u);
                    for (r = m[d],
                    m[d] = m[c],
                    m[c] = r,
                    i = p[d],
                    p[d] = p[c],
                    p[c] = i,
                    e = r[c],
                    u = c; u !== f; ++u)
                        r[u] /= e;
                    for (u = f - 1; -1 !== u; --u)
                        i[u] /= e;
                    for (o = l - 1; -1 !== o; --o)
                        if (o !== c) {
                            for (n = m[o],
                            t = p[o],
                            e = n[c],
                            u = c + 1; u !== f; ++u)
                                n[u] -= r[u] * e;
                            for (u = f - 1; u > 0; --u)
                                t[u] -= i[u] * e,
                                t[--u] -= i[u] * e;
                            0 === u && (t[0] -= i[0] * e)
                        }
                }
                return p
            }
            ,
            numeric.det = function(e) {
                var n = numeric.dim(e);
                if (2 !== n.length || n[0] !== n[1])
                    throw new Error("numeric: det() only works on square matrices");
                var r, t, i, o, c, u, a, s, l = n[0], f = 1, m = numeric.clone(e);
                for (t = 0; t < l - 1; t++) {
                    for (i = t,
                    r = t + 1; r < l; r++)
                        Math.abs(m[r][t]) > Math.abs(m[i][t]) && (i = r);
                    for (i !== t && (a = m[i],
                    m[i] = m[t],
                    m[t] = a,
                    f *= -1),
                    o = m[t],
                    r = t + 1; r < l; r++) {
                        for (u = (c = m[r])[t] / o[t],
                        i = t + 1; i < l - 1; i += 2)
                            s = i + 1,
                            c[i] -= o[i] * u,
                            c[s] -= o[s] * u;
                        i !== l && (c[i] -= o[i] * u)
                    }
                    if (0 === o[t])
                        return 0;
                    f *= o[t]
                }
                return f * m[t][t]
            }
            ,
            numeric.transpose = function(e) {
                var n, r, t, i, o, c = e.length, u = e[0].length, a = Array(u);
                for (r = 0; r < u; r++)
                    a[r] = Array(c);
                for (n = c - 1; n >= 1; n -= 2) {
                    for (i = e[n],
                    t = e[n - 1],
                    r = u - 1; r >= 1; --r)
                        (o = a[r])[n] = i[r],
                        o[n - 1] = t[r],
                        (o = a[--r])[n] = i[r],
                        o[n - 1] = t[r];
                    0 === r && ((o = a[0])[n] = i[0],
                    o[n - 1] = t[0])
                }
                if (0 === n) {
                    for (t = e[0],
                    r = u - 1; r >= 1; --r)
                        a[r][0] = t[r],
                        a[--r][0] = t[r];
                    0 === r && (a[0][0] = t[0])
                }
                return a
            }
            ,
            numeric.negtranspose = function(e) {
                var n, r, t, i, o, c = e.length, u = e[0].length, a = Array(u);
                for (r = 0; r < u; r++)
                    a[r] = Array(c);
                for (n = c - 1; n >= 1; n -= 2) {
                    for (i = e[n],
                    t = e[n - 1],
                    r = u - 1; r >= 1; --r)
                        (o = a[r])[n] = -i[r],
                        o[n - 1] = -t[r],
                        (o = a[--r])[n] = -i[r],
                        o[n - 1] = -t[r];
                    0 === r && ((o = a[0])[n] = -i[0],
                    o[n - 1] = -t[0])
                }
                if (0 === n) {
                    for (t = e[0],
                    r = u - 1; r >= 1; --r)
                        a[r][0] = -t[r],
                        a[--r][0] = -t[r];
                    0 === r && (a[0][0] = -t[0])
                }
                return a
            }
            ,
            numeric._random = function e(n, r) {
                var t, i, o = n[r], c = Array(o);
                if (r === n.length - 1) {
                    for (i = Math.random,
                    t = o - 1; t >= 1; t -= 2)
                        c[t] = i(),
                        c[t - 1] = i();
                    return 0 === t && (c[0] = i()),
                    c
                }
                for (t = o - 1; t >= 0; t--)
                    c[t] = e(n, r + 1);
                return c
            }
            ,
            numeric.random = function(e) {
                return numeric._random(e, 0)
            }
            ,
            numeric.norm2 = function(e) {
                return Math.sqrt(numeric.norm2Squared(e))
            }
            ,
            numeric.linspace = function(e, n, r) {
                if (void 0 === r && (r = Math.max(Math.round(n - e) + 1, 1)),
                r < 2)
                    return 1 === r ? [e] : [];
                var t, i = Array(r);
                for (t = --r; t >= 0; t--)
                    i[t] = (t * n + (r - t) * e) / r;
                return i
            }
            ,
            numeric.getBlock = function(e, n, r) {
                var t = numeric.dim(e);
                return function e(i, o) {
                    var c, u = n[o], a = r[o] - u, s = Array(a);
                    if (o === t.length - 1) {
                        for (c = a; c >= 0; c--)
                            s[c] = i[c + u];
                        return s
                    }
                    for (c = a; c >= 0; c--)
                        s[c] = e(i[c + u], o + 1);
                    return s
                }(e, 0)
            }
            ,
            numeric.setBlock = function(e, n, r, t) {
                var i = numeric.dim(e);
                return function e(t, o, c) {
                    var u, a = n[c], s = r[c] - a;
                    if (c === i.length - 1)
                        for (u = s; u >= 0; u--)
                            t[u + a] = o[u];
                    for (u = s; u >= 0; u--)
                        e(t[u + a], o[u], c + 1)
                }(e, t, 0),
                e
            }
            ,
            numeric.getRange = function(e, n, r) {
                var t, i, o, c, u = n.length, a = r.length, s = Array(u);
                for (t = u - 1; -1 !== t; --t)
                    for (s[t] = Array(a),
                    o = s[t],
                    c = e[n[t]],
                    i = a - 1; -1 !== i; --i)
                        o[i] = c[r[i]];
                return s
            }
            ,
            numeric.blockMatrix = function(e) {
                var n = numeric.dim(e);
                if (n.length < 4)
                    return numeric.blockMatrix([e]);
                var r, t, i, o, c, u = n[0], a = n[1];
                for (r = 0,
                t = 0,
                i = 0; i < u; ++i)
                    r += e[i][0].length;
                for (o = 0; o < a; ++o)
                    t += e[0][o][0].length;
                var s = Array(r);
                for (i = 0; i < r; ++i)
                    s[i] = Array(t);
                var l, f, m, p, d, h = 0;
                for (i = 0; i < u; ++i) {
                    for (l = t,
                    o = a - 1; -1 !== o; --o)
                        for (l -= (c = e[i][o])[0].length,
                        m = c.length - 1; -1 !== m; --m)
                            for (d = c[m],
                            f = s[h + m],
                            p = d.length - 1; -1 !== p; --p)
                                f[l + p] = d[p];
                    h += e[i][0].length
                }
                return s
            }
            ,
            numeric.tensor = function(e, n) {
                if ("number" == typeof e || "number" == typeof n)
                    return numeric.mul(e, n);
                var r = numeric.dim(e)
                  , t = numeric.dim(n);
                if (1 !== r.length || 1 !== t.length)
                    throw new Error("numeric: tensor product is only defined for vectors");
                var i, o, c, u, a = r[0], s = t[0], l = Array(a);
                for (o = a - 1; o >= 0; o--) {
                    for (i = Array(s),
                    u = e[o],
                    c = s - 1; c >= 3; --c)
                        i[c] = u * n[c],
                        i[--c] = u * n[c],
                        i[--c] = u * n[c],
                        i[--c] = u * n[c];
                    for (; c >= 0; )
                        i[c] = u * n[c],
                        --c;
                    l[o] = i
                }
                return l
            }
            ,
            numeric.T = function(e, n) {
                this.x = e,
                this.y = n
            }
            ,
            numeric.t = function(e, n) {
                return new numeric.T(e,n)
            }
            ,
            numeric.Tbinop = function(e, n, r, t, i) {
                var o;
                numeric.indexOf;
                if ("string" != typeof i)
                    for (o in i = "",
                    numeric)
                        numeric.hasOwnProperty(o) && (e.indexOf(o) >= 0 || n.indexOf(o) >= 0 || r.indexOf(o) >= 0 || t.indexOf(o) >= 0) && o.length > 1 && (i += "var " + o + " = numeric." + o + ";\n");
                return Function(["y"], "var x = this;\nif(!(y instanceof numeric.T)) { y = new numeric.T(y); }\n" + i + "\nif(x.y) {  if(y.y) {    return new numeric.T(" + t + ");\n  }\n  return new numeric.T(" + r + ");\n}\nif(y.y) {\n  return new numeric.T(" + n + ");\n}\nreturn new numeric.T(" + e + ");\n")
            }
            ,
            numeric.T.prototype.add = numeric.Tbinop("add(x.x,y.x)", "add(x.x,y.x),y.y", "add(x.x,y.x),x.y", "add(x.x,y.x),add(x.y,y.y)"),
            numeric.T.prototype.sub = numeric.Tbinop("sub(x.x,y.x)", "sub(x.x,y.x),neg(y.y)", "sub(x.x,y.x),x.y", "sub(x.x,y.x),sub(x.y,y.y)"),
            numeric.T.prototype.mul = numeric.Tbinop("mul(x.x,y.x)", "mul(x.x,y.x),mul(x.x,y.y)", "mul(x.x,y.x),mul(x.y,y.x)", "sub(mul(x.x,y.x),mul(x.y,y.y)),add(mul(x.x,y.y),mul(x.y,y.x))"),
            numeric.T.prototype.reciprocal = function() {
                var e = numeric.mul
                  , n = numeric.div;
                if (this.y) {
                    var r = numeric.add(e(this.x, this.x), e(this.y, this.y));
                    return new numeric.T(n(this.x, r),n(numeric.neg(this.y), r))
                }
                return new T(n(1, this.x))
            }
            ,
            numeric.T.prototype.div = function(e) {
                if (e instanceof numeric.T || (e = new numeric.T(e)),
                e.y)
                    return this.mul(e.reciprocal());
                var n = numeric.div;
                return this.y ? new numeric.T(n(this.x, e.x),n(this.y, e.x)) : new numeric.T(n(this.x, e.x))
            }
            ,
            numeric.T.prototype.dot = numeric.Tbinop("dot(x.x,y.x)", "dot(x.x,y.x),dot(x.x,y.y)", "dot(x.x,y.x),dot(x.y,y.x)", "sub(dot(x.x,y.x),dot(x.y,y.y)),add(dot(x.x,y.y),dot(x.y,y.x))"),
            numeric.T.prototype.transpose = function() {
                var e = numeric.transpose
                  , n = this.x
                  , r = this.y;
                return r ? new numeric.T(e(n),e(r)) : new numeric.T(e(n))
            }
            ,
            numeric.T.prototype.transjugate = function() {
                var e = numeric.transpose
                  , n = this.x
                  , r = this.y;
                return r ? new numeric.T(e(n),numeric.negtranspose(r)) : new numeric.T(e(n))
            }
            ,
            numeric.Tunop = function(e, n, r) {
                return "string" != typeof r && (r = ""),
                Function("var x = this;\n" + r + "\nif(x.y) {  " + n + ";\n}\n" + e + ";\n")
            }
            ,
            numeric.T.prototype.exp = numeric.Tunop("return new numeric.T(ex)", "return new numeric.T(mul(cos(x.y),ex),mul(sin(x.y),ex))", "var ex = numeric.exp(x.x), cos = numeric.cos, sin = numeric.sin, mul = numeric.mul;"),
            numeric.T.prototype.conj = numeric.Tunop("return new numeric.T(x.x);", "return new numeric.T(x.x,numeric.neg(x.y));"),
            numeric.T.prototype.neg = numeric.Tunop("return new numeric.T(neg(x.x));", "return new numeric.T(neg(x.x),neg(x.y));", "var neg = numeric.neg;"),
            numeric.T.prototype.sin = numeric.Tunop("return new numeric.T(numeric.sin(x.x))", "return x.exp().sub(x.neg().exp()).div(new numeric.T(0,2));"),
            numeric.T.prototype.cos = numeric.Tunop("return new numeric.T(numeric.cos(x.x))", "return x.exp().add(x.neg().exp()).div(2);"),
            numeric.T.prototype.abs = numeric.Tunop("return new numeric.T(numeric.abs(x.x));", "return new numeric.T(numeric.sqrt(numeric.add(mul(x.x,x.x),mul(x.y,x.y))));", "var mul = numeric.mul;"),
            numeric.T.prototype.log = numeric.Tunop("return new numeric.T(numeric.log(x.x));", "var theta = new numeric.T(numeric.atan2(x.y,x.x)), r = x.abs();\nreturn new numeric.T(numeric.log(r.x),theta.x);"),
            numeric.T.prototype.norm2 = numeric.Tunop("return numeric.norm2(x.x);", "var f = numeric.norm2Squared;\nreturn Math.sqrt(f(x.x)+f(x.y));"),
            numeric.T.prototype.inv = function() {
                var e = this;
                if (void 0 === e.y)
                    return new numeric.T(numeric.inv(e.x));
                var n, r, t, i, o, c, u, a, s, l, f, m, p, d, h, _, g, y, v = e.x.length, b = numeric.identity(v), w = numeric.rep([v, v], 0), x = numeric.clone(e.x), k = numeric.clone(e.y);
                for (s = 0; s < v; s++) {
                    for (m = (d = x[s][s]) * d + (h = k[s][s]) * h,
                    f = s,
                    l = s + 1; l < v; l++)
                        (p = (d = x[l][s]) * d + (h = k[l][s]) * h) > m && (f = l,
                        m = p);
                    for (f !== s && (y = x[s],
                    x[s] = x[f],
                    x[f] = y,
                    y = k[s],
                    k[s] = k[f],
                    k[f] = y,
                    y = b[s],
                    b[s] = b[f],
                    b[f] = y,
                    y = w[s],
                    w[s] = w[f],
                    w[f] = y),
                    n = x[s],
                    r = k[s],
                    o = b[s],
                    c = w[s],
                    d = n[s],
                    h = r[s],
                    l = s + 1; l < v; l++)
                        _ = n[l],
                        g = r[l],
                        n[l] = (_ * d + g * h) / m,
                        r[l] = (g * d - _ * h) / m;
                    for (l = 0; l < v; l++)
                        _ = o[l],
                        g = c[l],
                        o[l] = (_ * d + g * h) / m,
                        c[l] = (g * d - _ * h) / m;
                    for (l = s + 1; l < v; l++) {
                        for (t = x[l],
                        i = k[l],
                        u = b[l],
                        a = w[l],
                        d = t[s],
                        h = i[s],
                        f = s + 1; f < v; f++)
                            _ = n[f],
                            g = r[f],
                            t[f] -= _ * d - g * h,
                            i[f] -= g * d + _ * h;
                        for (f = 0; f < v; f++)
                            _ = o[f],
                            g = c[f],
                            u[f] -= _ * d - g * h,
                            a[f] -= g * d + _ * h
                    }
                }
                for (s = v - 1; s > 0; s--)
                    for (o = b[s],
                    c = w[s],
                    l = s - 1; l >= 0; l--)
                        for (u = b[l],
                        a = w[l],
                        d = x[l][s],
                        h = k[l][s],
                        f = v - 1; f >= 0; f--)
                            _ = o[f],
                            g = c[f],
                            u[f] -= d * _ - h * g,
                            a[f] -= d * g + h * _;
                return new numeric.T(b,w)
            }
            ,
            numeric.T.prototype.get = function(e) {
                var n, r = this.x, t = this.y, i = 0, o = e.length;
                if (t) {
                    for (; i < o; )
                        r = r[n = e[i]],
                        t = t[n],
                        i++;
                    return new numeric.T(r,t)
                }
                for (; i < o; )
                    r = r[n = e[i]],
                    i++;
                return new numeric.T(r)
            }
            ,
            numeric.T.prototype.set = function(e, n) {
                var r, t = this.x, i = this.y, o = 0, c = e.length, u = n.x, a = n.y;
                if (0 === c)
                    return a ? this.y = a : i && (this.y = void 0),
                    this.x = t,
                    this;
                if (a) {
                    for (i || (i = numeric.rep(numeric.dim(t), 0),
                    this.y = i); o < c - 1; )
                        t = t[r = e[o]],
                        i = i[r],
                        o++;
                    return t[r = e[o]] = u,
                    i[r] = a,
                    this
                }
                if (i) {
                    for (; o < c - 1; )
                        t = t[r = e[o]],
                        i = i[r],
                        o++;
                    return t[r = e[o]] = u,
                    i[r] = u instanceof Array ? numeric.rep(numeric.dim(u), 0) : 0,
                    this
                }
                for (; o < c - 1; )
                    t = t[r = e[o]],
                    o++;
                return t[r = e[o]] = u,
                this
            }
            ,
            numeric.T.prototype.getRows = function(e, n) {
                var r, t, i = n - e + 1, o = Array(i), c = this.x, u = this.y;
                for (r = e; r <= n; r++)
                    o[r - e] = c[r];
                if (u) {
                    for (t = Array(i),
                    r = e; r <= n; r++)
                        t[r - e] = u[r];
                    return new numeric.T(o,t)
                }
                return new numeric.T(o)
            }
            ,
            numeric.T.prototype.setRows = function(e, n, r) {
                var t, i = this.x, o = this.y, c = r.x, u = r.y;
                for (t = e; t <= n; t++)
                    i[t] = c[t - e];
                if (u)
                    for (o || (o = numeric.rep(numeric.dim(i), 0),
                    this.y = o),
                    t = e; t <= n; t++)
                        o[t] = u[t - e];
                else if (o)
                    for (t = e; t <= n; t++)
                        o[t] = numeric.rep([c[t - e].length], 0);
                return this
            }
            ,
            numeric.T.prototype.getRow = function(e) {
                var n = this.x
                  , r = this.y;
                return r ? new numeric.T(n[e],r[e]) : new numeric.T(n[e])
            }
            ,
            numeric.T.prototype.setRow = function(e, n) {
                var r = this.x
                  , t = this.y
                  , i = n.x
                  , o = n.y;
                return r[e] = i,
                o ? (t || (t = numeric.rep(numeric.dim(r), 0),
                this.y = t),
                t[e] = o) : t && (t = numeric.rep([i.length], 0)),
                this
            }
            ,
            numeric.T.prototype.getBlock = function(e, n) {
                var r = this.x
                  , t = this.y
                  , i = numeric.getBlock;
                return t ? new numeric.T(i(r, e, n),i(t, e, n)) : new numeric.T(i(r, e, n))
            }
            ,
            numeric.T.prototype.setBlock = function(e, n, r) {
                r instanceof numeric.T || (r = new numeric.T(r));
                var t = this.x
                  , i = this.y
                  , o = numeric.setBlock
                  , c = r.x
                  , u = r.y;
                if (u)
                    return i || (this.y = numeric.rep(numeric.dim(this), 0),
                    i = this.y),
                    o(t, e, n, c),
                    o(i, e, n, u),
                    this;
                o(t, e, n, c),
                i && o(i, e, n, numeric.rep(numeric.dim(c), 0))
            }
            ,
            numeric.T.rep = function(e, n) {
                var r = numeric.T;
                n instanceof r || (n = new r(n));
                var t = n.x
                  , i = n.y
                  , o = numeric.rep;
                return i ? new r(o(e, t),o(e, i)) : new r(o(e, t))
            }
            ,
            numeric.T.diag = function(e) {
                e instanceof numeric.T || (e = new numeric.T(e));
                var n = e.x
                  , r = e.y
                  , t = numeric.diag;
                return r ? new numeric.T(t(n),t(r)) : new numeric.T(t(n))
            }
            ,
            numeric.T.eig = function() {
                if (this.y)
                    throw new Error("eig: not implemented for complex matrices.");
                return numeric.eig(this.x)
            }
            ,
            numeric.T.identity = function(e) {
                return new numeric.T(numeric.identity(e))
            }
            ,
            numeric.T.prototype.getDiag = function() {
                var e = numeric
                  , n = this.x
                  , r = this.y;
                return r ? new e.T(e.getDiag(n),e.getDiag(r)) : new e.T(e.getDiag(n))
            }
            ,
            numeric.house = function(e) {
                var n = numeric.clone(e)
                  , r = (e[0] >= 0 ? 1 : -1) * numeric.norm2(e);
                n[0] += r;
                var t = numeric.norm2(n);
                if (0 === t)
                    throw new Error("eig: internal error");
                return numeric.div(n, t)
            }
            ,
            numeric.toUpperHessenberg = function(e) {
                var n = numeric.dim(e);
                if (2 !== n.length || n[0] !== n[1])
                    throw new Error("numeric: toUpperHessenberg() only works on square matrices");
                var r, t, i, o, c, u, a, s, l, f, m = n[0], p = numeric.clone(e), d = numeric.identity(m);
                for (t = 0; t < m - 2; t++) {
                    for (o = Array(m - t - 1),
                    r = t + 1; r < m; r++)
                        o[r - t - 1] = p[r][t];
                    if (numeric.norm2(o) > 0) {
                        for (c = numeric.house(o),
                        u = numeric.getBlock(p, [t + 1, t], [m - 1, m - 1]),
                        a = numeric.tensor(c, numeric.dot(c, u)),
                        r = t + 1; r < m; r++)
                            for (s = p[r],
                            l = a[r - t - 1],
                            i = t; i < m; i++)
                                s[i] -= 2 * l[i - t];
                        for (u = numeric.getBlock(p, [0, t + 1], [m - 1, m - 1]),
                        a = numeric.tensor(numeric.dot(u, c), c),
                        r = 0; r < m; r++)
                            for (s = p[r],
                            l = a[r],
                            i = t + 1; i < m; i++)
                                s[i] -= 2 * l[i - t - 1];
                        for (u = Array(m - t - 1),
                        r = t + 1; r < m; r++)
                            u[r - t - 1] = d[r];
                        for (a = numeric.tensor(c, numeric.dot(c, u)),
                        r = t + 1; r < m; r++)
                            for (f = d[r],
                            l = a[r - t - 1],
                            i = 0; i < m; i++)
                                f[i] -= 2 * l[i]
                    }
                }
                return {
                    H: p,
                    Q: d
                }
            }
            ,
            numeric.epsilon = 2220446049250313e-31,
            numeric.QRFrancis = function(e, n) {
                void 0 === n && (n = 1e4),
                e = numeric.clone(e);
                numeric.clone(e);
                var r, t, i, o, c, u, a, s, l, f, m, p, d, h, _, g, y, v, b = numeric.dim(e)[0], w = numeric.identity(b);
                if (b < 3)
                    return {
                        Q: w,
                        B: [[0, b - 1]]
                    };
                var x = numeric.epsilon;
                for (v = 0; v < n; v++) {
                    for (g = 0; g < b - 1; g++)
                        if (Math.abs(e[g + 1][g]) < x * (Math.abs(e[g][g]) + Math.abs(e[g + 1][g + 1]))) {
                            var k = numeric.QRFrancis(numeric.getBlock(e, [0, 0], [g, g]), n)
                              , M = numeric.QRFrancis(numeric.getBlock(e, [g + 1, g + 1], [b - 1, b - 1]), n);
                            for (p = Array(g + 1),
                            _ = 0; _ <= g; _++)
                                p[_] = w[_];
                            for (d = numeric.dot(k.Q, p),
                            _ = 0; _ <= g; _++)
                                w[_] = d[_];
                            for (p = Array(b - g - 1),
                            _ = g + 1; _ < b; _++)
                                p[_ - g - 1] = w[_];
                            for (d = numeric.dot(M.Q, p),
                            _ = g + 1; _ < b; _++)
                                w[_] = d[_ - g - 1];
                            return {
                                Q: w,
                                B: k.B.concat(numeric.add(M.B, g + 1))
                            }
                        }
                    var A, P, T;
                    if (i = e[b - 2][b - 2],
                    o = e[b - 2][b - 1],
                    c = e[b - 1][b - 2],
                    s = i + (u = e[b - 1][b - 1]),
                    a = i * u - o * c,
                    l = numeric.getBlock(e, [0, 0], [2, 2]),
                    s * s >= 4 * a)
                        A = .5 * (s + Math.sqrt(s * s - 4 * a)),
                        P = .5 * (s - Math.sqrt(s * s - 4 * a)),
                        l = numeric.add(numeric.sub(numeric.dot(l, l), numeric.mul(l, A + P)), numeric.diag(numeric.rep([3], A * P)));
                    else
                        l = numeric.add(numeric.sub(numeric.dot(l, l), numeric.mul(l, s)), numeric.diag(numeric.rep([3], a)));
                    for (r = [l[0][0], l[1][0], l[2][0]],
                    t = numeric.house(r),
                    p = [e[0], e[1], e[2]],
                    d = numeric.tensor(t, numeric.dot(t, p)),
                    _ = 0; _ < 3; _++)
                        for (m = e[_],
                        h = d[_],
                        y = 0; y < b; y++)
                            m[y] -= 2 * h[y];
                    for (p = numeric.getBlock(e, [0, 0], [b - 1, 2]),
                    d = numeric.tensor(numeric.dot(p, t), t),
                    _ = 0; _ < b; _++)
                        for (m = e[_],
                        h = d[_],
                        y = 0; y < 3; y++)
                            m[y] -= 2 * h[y];
                    for (p = [w[0], w[1], w[2]],
                    d = numeric.tensor(t, numeric.dot(t, p)),
                    _ = 0; _ < 3; _++)
                        for (f = w[_],
                        h = d[_],
                        y = 0; y < b; y++)
                            f[y] -= 2 * h[y];
                    for (g = 0; g < b - 2; g++) {
                        for (y = g; y <= g + 1; y++)
                            if (Math.abs(e[y + 1][y]) < x * (Math.abs(e[y][y]) + Math.abs(e[y + 1][y + 1]))) {
                                k = numeric.QRFrancis(numeric.getBlock(e, [0, 0], [y, y]), n),
                                M = numeric.QRFrancis(numeric.getBlock(e, [y + 1, y + 1], [b - 1, b - 1]), n);
                                for (p = Array(y + 1),
                                _ = 0; _ <= y; _++)
                                    p[_] = w[_];
                                for (d = numeric.dot(k.Q, p),
                                _ = 0; _ <= y; _++)
                                    w[_] = d[_];
                                for (p = Array(b - y - 1),
                                _ = y + 1; _ < b; _++)
                                    p[_ - y - 1] = w[_];
                                for (d = numeric.dot(M.Q, p),
                                _ = y + 1; _ < b; _++)
                                    w[_] = d[_ - y - 1];
                                return {
                                    Q: w,
                                    B: k.B.concat(numeric.add(M.B, y + 1))
                                }
                            }
                        for (T = Math.min(b - 1, g + 3),
                        r = Array(T - g),
                        _ = g + 1; _ <= T; _++)
                            r[_ - g - 1] = e[_][g];
                        for (t = numeric.house(r),
                        p = numeric.getBlock(e, [g + 1, g], [T, b - 1]),
                        d = numeric.tensor(t, numeric.dot(t, p)),
                        _ = g + 1; _ <= T; _++)
                            for (m = e[_],
                            h = d[_ - g - 1],
                            y = g; y < b; y++)
                                m[y] -= 2 * h[y - g];
                        for (p = numeric.getBlock(e, [0, g + 1], [b - 1, T]),
                        d = numeric.tensor(numeric.dot(p, t), t),
                        _ = 0; _ < b; _++)
                            for (m = e[_],
                            h = d[_],
                            y = g + 1; y <= T; y++)
                                m[y] -= 2 * h[y - g - 1];
                        for (p = Array(T - g),
                        _ = g + 1; _ <= T; _++)
                            p[_ - g - 1] = w[_];
                        for (d = numeric.tensor(t, numeric.dot(t, p)),
                        _ = g + 1; _ <= T; _++)
                            for (f = w[_],
                            h = d[_ - g - 1],
                            y = 0; y < b; y++)
                                f[y] -= 2 * h[y]
                    }
                }
                throw new Error("numeric: eigenvalue iteration does not converge -- increase maxiter?")
            }
            ,
            numeric.eig = function(e, n) {
                var r, t, i, o, c, u, a, s, l, f, m, p, d, h, _, g, y = numeric.toUpperHessenberg(e), v = numeric.QRFrancis(y.H, n), b = numeric.T, w = e.length, x = v.B, k = numeric.dot(v.Q, numeric.dot(y.H, numeric.transpose(v.Q))), M = new b(numeric.dot(v.Q, y.Q)), A = x.length, P = Math.sqrt;
                for (t = 0; t < A; t++)
                    if ((r = x[t][0]) === x[t][1])
                        ;
                    else {
                        if (o = r + 1,
                        c = k[r][r],
                        u = k[r][o],
                        a = k[o][r],
                        s = k[o][o],
                        0 === u && 0 === a)
                            continue;
                        (f = (l = -c - s) * l - 4 * (c * s - u * a)) >= 0 ? ((_ = (c - (m = l < 0 ? -.5 * (l - P(f)) : -.5 * (l + P(f)))) * (c - m) + u * u) > (g = a * a + (s - m) * (s - m)) ? (d = (c - m) / (_ = P(_)),
                        h = u / _) : (d = a / (g = P(g)),
                        h = (s - m) / g),
                        i = new b([[h, -d], [d, h]]),
                        M.setRows(r, o, i.dot(M.getRows(r, o)))) : (m = -.5 * l,
                        p = .5 * P(-f),
                        (_ = (c - m) * (c - m) + u * u) > (g = a * a + (s - m) * (s - m)) ? (d = (c - m) / (_ = P(_ + p * p)),
                        h = u / _,
                        m = 0,
                        p /= _) : (d = a / (g = P(g + p * p)),
                        h = (s - m) / g,
                        m = p / g,
                        p = 0),
                        i = new b([[h, -d], [d, h]],[[m, p], [p, -m]]),
                        M.setRows(r, o, i.dot(M.getRows(r, o))))
                    }
                var T = M.dot(e).dot(M.transjugate())
                  , S = (w = e.length,
                numeric.T.identity(w));
                for (o = 0; o < w; o++)
                    if (o > 0)
                        for (t = o - 1; t >= 0; t--) {
                            var j = T.get([t, t])
                              , N = T.get([o, o]);
                            numeric.neq(j.x, N.x) || numeric.neq(j.y, N.y) ? (m = T.getRow(t).getBlock([t], [o - 1]),
                            p = S.getRow(o).getBlock([t], [o - 1]),
                            S.set([o, t], T.get([t, o]).neg().sub(m.dot(p)).div(j.sub(N)))) : S.setRow(o, S.getRow(t))
                        }
                for (o = 0; o < w; o++)
                    m = S.getRow(o),
                    S.setRow(o, m.div(m.norm2()));
                return S = S.transpose(),
                S = M.transjugate().dot(S),
                {
                    lambda: T.getDiag(),
                    E: S
                }
            }
            ,
            numeric.ccsSparse = function(e) {
                var n, r, t, i = e.length, o = [];
                for (r = i - 1; -1 !== r; --r)
                    for (t in n = e[r]) {
                        for (t = parseInt(t); t >= o.length; )
                            o[o.length] = 0;
                        0 !== n[t] && o[t]++
                    }
                var c = o.length
                  , u = Array(c + 1);
                for (u[0] = 0,
                r = 0; r < c; ++r)
                    u[r + 1] = u[r] + o[r];
                var a = Array(u[c])
                  , s = Array(u[c]);
                for (r = i - 1; -1 !== r; --r)
                    for (t in n = e[r])
                        0 !== n[t] && (o[t]--,
                        a[u[t] + o[t]] = r,
                        s[u[t] + o[t]] = n[t]);
                return [u, a, s]
            }
            ,
            numeric.ccsFull = function(e) {
                var n, r, t, i, o = e[0], c = e[1], u = e[2], a = numeric.ccsDim(e), s = a[0], l = a[1], f = numeric.rep([s, l], 0);
                for (n = 0; n < l; n++)
                    for (t = o[n],
                    i = o[n + 1],
                    r = t; r < i; ++r)
                        f[c[r]][n] = u[r];
                return f
            }
            ,
            numeric.ccsTSolve = function(e, n, r, t, i) {
                var o, c, u, a, s, l, f, m = e[0], p = e[1], d = e[2], h = m.length - 1, _ = Math.max, g = 0;
                function y(e) {
                    var n;
                    if (0 === r[e]) {
                        for (r[e] = 1,
                        n = m[e]; n < m[e + 1]; ++n)
                            y(p[n]);
                        i[g] = e,
                        ++g
                    }
                }
                for (void 0 === t && (r = numeric.rep([h], 0)),
                void 0 === t && (t = numeric.linspace(0, r.length - 1)),
                void 0 === i && (i = []),
                o = t.length - 1; -1 !== o; --o)
                    y(t[o]);
                for (i.length = g,
                o = i.length - 1; -1 !== o; --o)
                    r[i[o]] = 0;
                for (o = t.length - 1; -1 !== o; --o)
                    c = t[o],
                    r[c] = n[c];
                for (o = i.length - 1; -1 !== o; --o) {
                    for (c = i[o],
                    u = m[c],
                    a = _(m[c + 1], u),
                    s = u; s !== a; ++s)
                        if (p[s] === c) {
                            r[c] /= d[s];
                            break
                        }
                    for (f = r[c],
                    s = u; s !== a; ++s)
                        (l = p[s]) !== c && (r[l] -= f * d[s])
                }
                return r
            }
            ,
            numeric.ccsDFS = function(e) {
                this.k = Array(e),
                this.k1 = Array(e),
                this.j = Array(e)
            }
            ,
            numeric.ccsDFS.prototype.dfs = function(e, n, r, t, i, o) {
                var c, u, a, s = 0, l = i.length, f = this.k, m = this.k1, p = this.j;
                if (0 === t[e])
                    for (t[e] = 1,
                    p[0] = e,
                    f[0] = u = n[e],
                    m[0] = a = n[e + 1]; ; )
                        if (u >= a) {
                            if (i[l] = p[s],
                            0 === s)
                                return;
                            ++l,
                            u = f[--s],
                            a = m[s]
                        } else
                            0 === t[c = o[r[u]]] ? (t[c] = 1,
                            f[s] = u,
                            p[++s] = c,
                            u = n[c],
                            m[s] = a = n[c + 1]) : ++u
            }
            ,
            numeric.ccsLPSolve = function(e, n, r, t, i, o, c) {
                var u, a, s, l, f, m, p, d, h, _ = e[0], g = e[1], y = e[2], v = (_.length,
                n[0]), b = n[1], w = n[2];
                for (a = v[i],
                s = v[i + 1],
                t.length = 0,
                u = a; u < s; ++u)
                    c.dfs(o[b[u]], _, g, r, t, o);
                for (u = t.length - 1; -1 !== u; --u)
                    r[t[u]] = 0;
                for (u = a; u !== s; ++u)
                    r[l = o[b[u]]] = w[u];
                for (u = t.length - 1; -1 !== u; --u) {
                    for (f = _[l = t[u]],
                    m = _[l + 1],
                    p = f; p < m; ++p)
                        if (o[g[p]] === l) {
                            r[l] /= y[p];
                            break
                        }
                    for (h = r[l],
                    p = f; p < m; ++p)
                        (d = o[g[p]]) !== l && (r[d] -= h * y[p])
                }
                return r
            }
            ,
            numeric.ccsLUP1 = function(e, n) {
                var r, t, i, o, c, u, a, s = e[0].length - 1, l = [numeric.rep([s + 1], 0), [], []], f = [numeric.rep([s + 1], 0), [], []], m = l[0], p = l[1], d = l[2], h = f[0], _ = f[1], g = f[2], y = numeric.rep([s], 0), v = numeric.rep([s], 0), b = numeric.ccsLPSolve, w = (Math.max,
                Math.abs), x = numeric.linspace(0, s - 1), k = numeric.linspace(0, s - 1), M = new numeric.ccsDFS(s);
                for (void 0 === n && (n = 1),
                r = 0; r < s; ++r) {
                    for (b(l, e, y, v, r, k, M),
                    o = -1,
                    c = -1,
                    t = v.length - 1; -1 !== t; --t)
                        (i = v[t]) <= r || (u = w(y[i])) > o && (c = i,
                        o = u);
                    for (w(y[r]) < n * o && (t = x[r],
                    o = x[c],
                    x[r] = o,
                    k[o] = r,
                    x[c] = t,
                    k[t] = c,
                    o = y[r],
                    y[r] = y[c],
                    y[c] = o),
                    o = m[r],
                    c = h[r],
                    a = y[r],
                    p[o] = x[r],
                    d[o] = 1,
                    ++o,
                    t = v.length - 1; -1 !== t; --t)
                        u = y[i = v[t]],
                        v[t] = 0,
                        y[i] = 0,
                        i <= r ? (_[c] = i,
                        g[c] = u,
                        ++c) : (p[o] = x[i],
                        d[o] = u / a,
                        ++o);
                    m[r + 1] = o,
                    h[r + 1] = c
                }
                for (t = p.length - 1; -1 !== t; --t)
                    p[t] = k[p[t]];
                return {
                    L: l,
                    U: f,
                    P: x,
                    Pinv: k
                }
            }
            ,
            numeric.ccsDFS0 = function(e) {
                this.k = Array(e),
                this.k1 = Array(e),
                this.j = Array(e)
            }
            ,
            numeric.ccsDFS0.prototype.dfs = function(e, n, r, t, i, o, c) {
                var u, a, s, l = 0, f = i.length, m = this.k, p = this.k1, d = this.j;
                if (0 === t[e])
                    for (t[e] = 1,
                    d[0] = e,
                    m[0] = a = n[o[e]],
                    p[0] = s = n[o[e] + 1]; ; ) {
                        if (isNaN(a))
                            throw new Error("Ow!");
                        if (a >= s) {
                            if (i[f] = o[d[l]],
                            0 === l)
                                return;
                            ++f,
                            a = m[--l],
                            s = p[l]
                        } else
                            0 === t[u = r[a]] ? (t[u] = 1,
                            m[l] = a,
                            d[++l] = u,
                            a = n[u = o[u]],
                            p[l] = s = n[u + 1]) : ++a
                    }
            }
            ,
            numeric.ccsLPSolve0 = function(e, n, r, t, i, o, c, u) {
                var a, s, l, f, m, p, d, h, _, g = e[0], y = e[1], v = e[2], b = (g.length,
                n[0]), w = n[1], x = n[2];
                for (s = b[i],
                l = b[i + 1],
                t.length = 0,
                a = s; a < l; ++a)
                    u.dfs(w[a], g, y, r, t, o, c);
                for (a = t.length - 1; -1 !== a; --a)
                    r[c[f = t[a]]] = 0;
                for (a = s; a !== l; ++a)
                    r[f = w[a]] = x[a];
                for (a = t.length - 1; -1 !== a; --a) {
                    for (h = c[f = t[a]],
                    m = g[f],
                    p = g[f + 1],
                    d = m; d < p; ++d)
                        if (y[d] === h) {
                            r[h] /= v[d];
                            break
                        }
                    for (_ = r[h],
                    d = m; d < p; ++d)
                        r[y[d]] -= _ * v[d];
                    r[h] = _
                }
            }
            ,
            numeric.ccsLUP0 = function(e, n) {
                var r, t, i, o, c, u, a, s = e[0].length - 1, l = [numeric.rep([s + 1], 0), [], []], f = [numeric.rep([s + 1], 0), [], []], m = l[0], p = l[1], d = l[2], h = f[0], _ = f[1], g = f[2], y = numeric.rep([s], 0), v = numeric.rep([s], 0), b = numeric.ccsLPSolve0, w = (Math.max,
                Math.abs), x = numeric.linspace(0, s - 1), k = numeric.linspace(0, s - 1), M = new numeric.ccsDFS0(s);
                for (void 0 === n && (n = 1),
                r = 0; r < s; ++r) {
                    for (b(l, e, y, v, r, k, x, M),
                    o = -1,
                    c = -1,
                    t = v.length - 1; -1 !== t; --t)
                        (i = v[t]) <= r || (u = w(y[x[i]])) > o && (c = i,
                        o = u);
                    for (w(y[x[r]]) < n * o && (t = x[r],
                    o = x[c],
                    x[r] = o,
                    k[o] = r,
                    x[c] = t,
                    k[t] = c),
                    o = m[r],
                    c = h[r],
                    a = y[x[r]],
                    p[o] = x[r],
                    d[o] = 1,
                    ++o,
                    t = v.length - 1; -1 !== t; --t)
                        u = y[x[i = v[t]]],
                        v[t] = 0,
                        y[x[i]] = 0,
                        i <= r ? (_[c] = i,
                        g[c] = u,
                        ++c) : (p[o] = x[i],
                        d[o] = u / a,
                        ++o);
                    m[r + 1] = o,
                    h[r + 1] = c
                }
                for (t = p.length - 1; -1 !== t; --t)
                    p[t] = k[p[t]];
                return {
                    L: l,
                    U: f,
                    P: x,
                    Pinv: k
                }
            }
            ,
            numeric.ccsLUP = numeric.ccsLUP0,
            numeric.ccsDim = function(e) {
                return [numeric.sup(e[1]) + 1, e[0].length - 1]
            }
            ,
            numeric.ccsGetBlock = function(e, n, r) {
                var t = numeric.ccsDim(e)
                  , i = t[0]
                  , o = t[1];
                void 0 === n ? n = numeric.linspace(0, i - 1) : "number" == typeof n && (n = [n]),
                void 0 === r ? r = numeric.linspace(0, o - 1) : "number" == typeof r && (r = [r]);
                var c, u, a, s, l = n.length, f = r.length, m = numeric.rep([o], 0), p = [], d = [], h = [m, p, d], _ = e[0], g = e[1], y = e[2], v = numeric.rep([i], 0), b = 0, w = numeric.rep([i], 0);
                for (u = 0; u < f; ++u) {
                    var x = _[s = r[u]]
                      , k = _[s + 1];
                    for (c = x; c < k; ++c)
                        w[a = g[c]] = 1,
                        v[a] = y[c];
                    for (c = 0; c < l; ++c)
                        w[n[c]] && (p[b] = c,
                        d[b] = v[n[c]],
                        ++b);
                    for (c = x; c < k; ++c)
                        w[a = g[c]] = 0;
                    m[u + 1] = b
                }
                return h
            }
            ,
            numeric.ccsDot = function(e, n) {
                var r, t, i, o, c, u, a, s, l, f, m, p = e[0], d = e[1], h = e[2], _ = n[0], g = n[1], y = n[2], v = numeric.ccsDim(e), b = numeric.ccsDim(n), w = v[0], x = (v[1],
                b[1]), k = numeric.rep([w], 0), M = numeric.rep([w], 0), A = Array(w), P = numeric.rep([x], 0), T = [], S = [], j = [P, T, S];
                for (i = 0; i !== x; ++i) {
                    for (o = _[i],
                    c = _[i + 1],
                    l = 0,
                    t = o; t < c; ++t)
                        for (f = g[t],
                        m = y[t],
                        u = p[f],
                        a = p[f + 1],
                        r = u; r < a; ++r)
                            0 === M[s = d[r]] && (A[l] = s,
                            M[s] = 1,
                            l += 1),
                            k[s] = k[s] + h[r] * m;
                    for (c = (o = P[i]) + l,
                    P[i + 1] = c,
                    t = l - 1; -1 !== t; --t)
                        m = o + t,
                        r = A[t],
                        T[m] = r,
                        S[m] = k[r],
                        M[r] = 0,
                        k[r] = 0;
                    P[i + 1] = P[i] + l
                }
                return j
            }
            ,
            numeric.ccsLUPSolve = function(e, n) {
                var r = e.L
                  , t = e.U
                  , i = (e.P,
                n[0])
                  , o = !1;
                "object" != typeof i && (i = (n = [[0, n.length], numeric.linspace(0, n.length - 1), n])[0],
                o = !0);
                var c, u, a, s, l, f, m = n[1], p = n[2], d = r[0].length - 1, h = i.length - 1, _ = numeric.rep([d], 0), g = Array(d), y = numeric.rep([d], 0), v = Array(d), b = numeric.rep([h + 1], 0), w = [], x = [], k = numeric.ccsTSolve, M = 0;
                for (c = 0; c < h; ++c) {
                    for (l = 0,
                    a = i[c],
                    s = i[c + 1],
                    u = a; u < s; ++u)
                        f = e.Pinv[m[u]],
                        v[l] = f,
                        y[f] = p[u],
                        ++l;
                    for (v.length = l,
                    k(r, y, _, v, g),
                    u = v.length - 1; -1 !== u; --u)
                        y[v[u]] = 0;
                    if (k(t, _, y, g, v),
                    o)
                        return y;
                    for (u = g.length - 1; -1 !== u; --u)
                        _[g[u]] = 0;
                    for (u = v.length - 1; -1 !== u; --u)
                        f = v[u],
                        w[M] = f,
                        x[M] = y[f],
                        y[f] = 0,
                        ++M;
                    b[c + 1] = M
                }
                return [b, w, x]
            }
            ,
            numeric.ccsbinop = function(e, n) {
                return void 0 === n && (n = ""),
                Function("X", "Y", "var Xi = X[0], Xj = X[1], Xv = X[2];\nvar Yi = Y[0], Yj = Y[1], Yv = Y[2];\nvar n = Xi.length-1,m = Math.max(numeric.sup(Xj),numeric.sup(Yj))+1;\nvar Zi = numeric.rep([n+1],0), Zj = [], Zv = [];\nvar x = numeric.rep([m],0),y = numeric.rep([m],0);\nvar xk,yk,zk;\nvar i,j,j0,j1,k,p=0;\n" + n + "for(i=0;i<n;++i) {\n  j0 = Xi[i]; j1 = Xi[i+1];\n  for(j=j0;j!==j1;++j) {\n    k = Xj[j];\n    x[k] = 1;\n    Zj[p] = k;\n    ++p;\n  }\n  j0 = Yi[i]; j1 = Yi[i+1];\n  for(j=j0;j!==j1;++j) {\n    k = Yj[j];\n    y[k] = Yv[j];\n    if(x[k] === 0) {\n      Zj[p] = k;\n      ++p;\n    }\n  }\n  Zi[i+1] = p;\n  j0 = Xi[i]; j1 = Xi[i+1];\n  for(j=j0;j!==j1;++j) x[Xj[j]] = Xv[j];\n  j0 = Zi[i]; j1 = Zi[i+1];\n  for(j=j0;j!==j1;++j) {\n    k = Zj[j];\n    xk = x[k];\n    yk = y[k];\n" + e + "\n    Zv[j] = zk;\n  }\n  j0 = Xi[i]; j1 = Xi[i+1];\n  for(j=j0;j!==j1;++j) x[Xj[j]] = 0;\n  j0 = Yi[i]; j1 = Yi[i+1];\n  for(j=j0;j!==j1;++j) y[Yj[j]] = 0;\n}\nreturn [Zi,Zj,Zv];")
            }
            ,
            function() {
                var k, A, B, C;
                for (k in numeric.ops2)
                    A = isFinite(eval("1" + numeric.ops2[k] + "0")) ? "[Y[0],Y[1],numeric." + k + "(X,Y[2])]" : "NaN",
                    B = isFinite(eval("0" + numeric.ops2[k] + "1")) ? "[X[0],X[1],numeric." + k + "(X[2],Y)]" : "NaN",
                    C = isFinite(eval("1" + numeric.ops2[k] + "0")) && isFinite(eval("0" + numeric.ops2[k] + "1")) ? "numeric.ccs" + k + "MM(X,Y)" : "NaN",
                    numeric["ccs" + k + "MM"] = numeric.ccsbinop("zk = xk " + numeric.ops2[k] + "yk;"),
                    numeric["ccs" + k] = Function("X", "Y", 'if(typeof X === "number") return ' + A + ';\nif(typeof Y === "number") return ' + B + ";\nreturn " + C + ";\n")
            }(),
            numeric.ccsScatter = function(e) {
                var n, r = e[0], t = e[1], i = e[2], o = numeric.sup(t) + 1, c = r.length, u = numeric.rep([o], 0), a = Array(c), s = Array(c), l = numeric.rep([o], 0);
                for (n = 0; n < c; ++n)
                    l[t[n]]++;
                for (n = 0; n < o; ++n)
                    u[n + 1] = u[n] + l[n];
                var f, m, p = u.slice(0);
                for (n = 0; n < c; ++n)
                    a[f = p[m = t[n]]] = r[n],
                    s[f] = i[n],
                    p[m] = p[m] + 1;
                return [u, a, s]
            }
            ,
            numeric.ccsGather = function(e) {
                var n, r, t, i, o, c = e[0], u = e[1], a = e[2], s = c.length - 1, l = u.length, f = Array(l), m = Array(l), p = Array(l);
                for (o = 0,
                n = 0; n < s; ++n)
                    for (t = c[n],
                    i = c[n + 1],
                    r = t; r !== i; ++r)
                        m[o] = n,
                        f[o] = u[r],
                        p[o] = a[r],
                        ++o;
                return [f, m, p]
            }
            ,
            numeric.sdim = function e(n, r, t) {
                if (void 0 === r && (r = []),
                "object" != typeof n)
                    return r;
                var i;
                for (i in void 0 === t && (t = 0),
                t in r || (r[t] = 0),
                n.length > r[t] && (r[t] = n.length),
                n)
                    n.hasOwnProperty(i) && e(n[i], r, t + 1);
                return r
            }
            ,
            numeric.sclone = function e(n, r, t) {
                void 0 === r && (r = 0),
                void 0 === t && (t = numeric.sdim(n).length);
                var i, o = Array(n.length);
                if (r === t - 1) {
                    for (i in n)
                        n.hasOwnProperty(i) && (o[i] = n[i]);
                    return o
                }
                for (i in n)
                    n.hasOwnProperty(i) && (o[i] = e(n[i], r + 1, t));
                return o
            }
            ,
            numeric.sdiag = function(e) {
                var n, r, t = e.length, i = Array(t);
                for (n = t - 1; n >= 1; n -= 2)
                    r = n - 1,
                    i[n] = [],
                    i[n][n] = e[n],
                    i[r] = [],
                    i[r][r] = e[r];
                return 0 === n && (i[0] = [],
                i[0][0] = e[n]),
                i
            }
            ,
            numeric.sidentity = function(e) {
                return numeric.sdiag(numeric.rep([e], 1))
            }
            ,
            numeric.stranspose = function(e) {
                var n, r, t, i = [];
                e.length;
                for (n in e)
                    if (e.hasOwnProperty(n))
                        for (r in t = e[n])
                            t.hasOwnProperty(r) && ("object" != typeof i[r] && (i[r] = []),
                            i[r][n] = t[r]);
                return i
            }
            ,
            numeric.sLUP = function(e, n) {
                throw new Error("The function numeric.sLUP had a bug in it and has been removed. Please use the new numeric.ccsLUP function instead.")
            }
            ,
            numeric.sdotMM = function(e, n) {
                var r, t, i, o, c, u, a, s = e.length, l = (n.length,
                numeric.stranspose(n)), f = l.length, m = Array(s);
                for (i = s - 1; i >= 0; i--) {
                    for (a = [],
                    r = e[i],
                    c = f - 1; c >= 0; c--) {
                        for (o in u = 0,
                        t = l[c],
                        r)
                            r.hasOwnProperty(o) && o in t && (u += r[o] * t[o]);
                        u && (a[c] = u)
                    }
                    m[i] = a
                }
                return m
            }
            ,
            numeric.sdotMV = function(e, n) {
                var r, t, i, o, c = e.length, u = Array(c);
                for (t = c - 1; t >= 0; t--) {
                    for (i in o = 0,
                    r = e[t])
                        r.hasOwnProperty(i) && n[i] && (o += r[i] * n[i]);
                    o && (u[t] = o)
                }
                return u
            }
            ,
            numeric.sdotVM = function(e, n) {
                var r, t, i, o, c = [];
                for (r in e)
                    if (e.hasOwnProperty(r))
                        for (t in i = n[r],
                        o = e[r],
                        i)
                            i.hasOwnProperty(t) && (c[t] || (c[t] = 0),
                            c[t] += o * i[t]);
                return c
            }
            ,
            numeric.sdotVV = function(e, n) {
                var r, t = 0;
                for (r in e)
                    e[r] && n[r] && (t += e[r] * n[r]);
                return t
            }
            ,
            numeric.sdot = function(e, n) {
                var r = numeric.sdim(e).length
                  , t = numeric.sdim(n).length;
                switch (1e3 * r + t) {
                case 0:
                    return e * n;
                case 1001:
                    return numeric.sdotVV(e, n);
                case 2001:
                    return numeric.sdotMV(e, n);
                case 1002:
                    return numeric.sdotVM(e, n);
                case 2002:
                    return numeric.sdotMM(e, n);
                default:
                    throw new Error("numeric.sdot not implemented for tensors of order " + r + " and " + t)
                }
            }
            ,
            numeric.sscatter = function(e) {
                var n, r, t, i, o = e[0].length, c = e.length, u = [];
                for (r = o - 1; r >= 0; --r)
                    if (e[c - 1][r]) {
                        for (i = u,
                        t = 0; t < c - 2; t++)
                            i[n = e[t][r]] || (i[n] = []),
                            i = i[n];
                        i[e[t][r]] = e[t + 1][r]
                    }
                return u
            }
            ,
            numeric.sgather = function e(n, r, t) {
                var i, o, c;
                for (o in void 0 === r && (r = []),
                void 0 === t && (t = []),
                i = t.length,
                n)
                    if (n.hasOwnProperty(o))
                        if (t[i] = parseInt(o),
                        "number" == typeof (c = n[o])) {
                            if (c) {
                                if (0 === r.length)
                                    for (o = i + 1; o >= 0; --o)
                                        r[o] = [];
                                for (o = i; o >= 0; --o)
                                    r[o].push(t[o]);
                                r[i + 1].push(c)
                            }
                        } else
                            e(c, r, t);
                return t.length > i && t.pop(),
                r
            }
            ,
            numeric.cLU = function(e) {
                var n, r, t, i, o, c, u = e[0], a = e[1], s = e[2], l = u.length, f = 0;
                for (n = 0; n < l; n++)
                    u[n] > f && (f = u[n]);
                f++;
                var m, p = Array(f), d = Array(f), h = numeric.rep([f], 1 / 0), _ = numeric.rep([f], -1 / 0);
                for (t = 0; t < l; t++)
                    n = u[t],
                    (r = a[t]) < h[n] && (h[n] = r),
                    r > _[n] && (_[n] = r);
                for (n = 0; n < f - 1; n++)
                    _[n] > _[n + 1] && (_[n + 1] = _[n]);
                for (n = f - 1; n >= 1; n--)
                    h[n] < h[n - 1] && (h[n - 1] = h[n]);
                for (n = 0; n < f; n++)
                    d[n] = numeric.rep([_[n] - h[n] + 1], 0),
                    p[n] = numeric.rep([n - h[n]], 0),
                    n - h[n] + 1,
                    _[n] - n + 1;
                for (t = 0; t < l; t++)
                    d[n = u[t]][a[t] - h[n]] = s[t];
                for (n = 0; n < f - 1; n++)
                    for (i = n - h[n],
                    v = d[n],
                    r = n + 1; h[r] <= n && r < f; r++)
                        if (o = n - h[r],
                        c = _[n] - n,
                        m = (b = d[r])[o] / v[i]) {
                            for (t = 1; t <= c; t++)
                                b[t + o] -= m * v[t + i];
                            p[r][n - h[r]] = m
                        }
                var g, y, v = [], b = [], w = [], x = [], k = [], M = [];
                for (l = 0,
                g = 0,
                n = 0; n < f; n++) {
                    for (i = h[n],
                    o = _[n],
                    y = d[n],
                    r = n; r <= o; r++)
                        y[r - i] && (v[l] = n,
                        b[l] = r,
                        w[l] = y[r - i],
                        l++);
                    for (y = p[n],
                    r = i; r < n; r++)
                        y[r - i] && (x[g] = n,
                        k[g] = r,
                        M[g] = y[r - i],
                        g++);
                    x[g] = n,
                    k[g] = n,
                    M[g] = 1,
                    g++
                }
                return {
                    U: [v, b, w],
                    L: [x, k, M]
                }
            }
            ,
            numeric.cLUsolve = function(e, n) {
                var r, t, i = e.L, o = e.U, c = numeric.clone(n), u = i[0], a = i[1], s = i[2], l = o[0], f = o[1], m = o[2], p = l.length, d = (u.length,
                c.length);
                for (t = 0,
                r = 0; r < d; r++) {
                    for (; a[t] < r; )
                        c[r] -= s[t] * c[a[t]],
                        t++;
                    t++
                }
                for (t = p - 1,
                r = d - 1; r >= 0; r--) {
                    for (; f[t] > r; )
                        c[r] -= m[t] * c[f[t]],
                        t--;
                    c[r] /= m[t],
                    t--
                }
                return c
            }
            ,
            numeric.cgrid = function(e, n) {
                "number" == typeof e && (e = [e, e]);
                var r, t, i, o = numeric.rep(e, -1);
                if ("function" != typeof n)
                    switch (n) {
                    case "L":
                        n = function(n, r) {
                            return n >= e[0] / 2 || r < e[1] / 2
                        }
                        ;
                        break;
                    default:
                        n = function(e, n) {
                            return !0
                        }
                    }
                for (i = 0,
                r = 1; r < e[0] - 1; r++)
                    for (t = 1; t < e[1] - 1; t++)
                        n(r, t) && (o[r][t] = i,
                        i++);
                return o
            }
            ,
            numeric.cdelsq = function(e) {
                var n, r, t, i, o, c = [[-1, 0], [0, -1], [0, 1], [1, 0]], u = numeric.dim(e), a = u[0], s = u[1], l = [], f = [], m = [];
                for (n = 1; n < a - 1; n++)
                    for (r = 1; r < s - 1; r++)
                        if (!(e[n][r] < 0)) {
                            for (t = 0; t < 4; t++)
                                i = n + c[t][0],
                                o = r + c[t][1],
                                e[i][o] < 0 || (l.push(e[n][r]),
                                f.push(e[i][o]),
                                m.push(-1));
                            l.push(e[n][r]),
                            f.push(e[n][r]),
                            m.push(4)
                        }
                return [l, f, m]
            }
            ,
            numeric.cdotMV = function(e, n) {
                var r, t, i, o = e[0], c = e[1], u = e[2], a = o.length;
                for (i = 0,
                t = 0; t < a; t++)
                    o[t] > i && (i = o[t]);
                for (i++,
                r = numeric.rep([i], 0),
                t = 0; t < a; t++)
                    r[o[t]] += u[t] * n[c[t]];
                return r
            }
            ,
            numeric.Spline = function(e, n, r, t, i) {
                this.x = e,
                this.yl = n,
                this.yr = r,
                this.kl = t,
                this.kr = i
            }
            ,
            numeric.Spline.prototype._at = function(e, n) {
                var r, t, i, o = this.x, c = this.yl, u = this.yr, a = this.kl, s = this.kr, l = numeric.add, f = numeric.sub, m = numeric.mul;
                r = f(m(a[n], o[n + 1] - o[n]), f(u[n + 1], c[n])),
                t = l(m(s[n + 1], o[n] - o[n + 1]), f(u[n + 1], c[n]));
                var p = (i = (e - o[n]) / (o[n + 1] - o[n])) * (1 - i);
                return l(l(l(m(1 - i, c[n]), m(i, u[n + 1])), m(r, p * (1 - i))), m(t, p * i))
            }
            ,
            numeric.Spline.prototype.at = function(e) {
                if ("number" == typeof e) {
                    var n, r, t, i = this.x, o = i.length, c = Math.floor;
                    for (n = 0,
                    r = o - 1; r - n > 1; )
                        i[t = c((n + r) / 2)] <= e ? n = t : r = t;
                    return this._at(e, n)
                }
                o = e.length;
                var u, a = Array(o);
                for (u = o - 1; -1 !== u; --u)
                    a[u] = this.at(e[u]);
                return a
            }
            ,
            numeric.Spline.prototype.diff = function() {
                var e, n, r, t = this.x, i = this.yl, o = this.yr, c = this.kl, u = this.kr, a = i.length, s = c, l = u, f = Array(a), m = Array(a), p = numeric.add, d = numeric.mul, h = numeric.div, _ = numeric.sub;
                for (e = a - 1; -1 !== e; --e)
                    n = t[e + 1] - t[e],
                    r = _(o[e + 1], i[e]),
                    f[e] = h(p(d(r, 6), d(c[e], -4 * n), d(u[e + 1], -2 * n)), n * n),
                    m[e + 1] = h(p(d(r, -6), d(c[e], 2 * n), d(u[e + 1], 4 * n)), n * n);
                return new numeric.Spline(t,s,l,f,m)
            }
            ,
            numeric.Spline.prototype.roots = function() {
                function e(e) {
                    return e * e
                }
                var n = []
                  , r = this.x
                  , t = this.yl
                  , i = this.yr
                  , o = this.kl
                  , c = this.kr;
                "number" == typeof t[0] && (t = [t],
                i = [i],
                o = [o],
                c = [c]);
                var u, a, s, l, f, m, p, d, h, _, g, y, v, b, w, x, k, M, A, P, T, S, j, N = t.length, q = r.length - 1, F = (n = Array(N),
                Math.sqrt);
                for (u = 0; u !== N; ++u) {
                    for (l = t[u],
                    f = i[u],
                    m = o[u],
                    p = c[u],
                    d = [],
                    a = 0; a !== q; a++) {
                        for (a > 0 && f[a] * l[a] < 0 && d.push(r[a]),
                        x = r[a + 1] - r[a],
                        r[a],
                        g = l[a],
                        y = f[a + 1],
                        h = m[a] / x,
                        v = (_ = p[a + 1] / x) + 3 * g + 2 * h - 3 * y,
                        b = 3 * (_ + h + 2 * (g - y)),
                        (w = e(h - _ + 3 * (g - y)) + 12 * _ * g) <= 0 ? k = (M = v / b) > r[a] && M < r[a + 1] ? [r[a], M, r[a + 1]] : [r[a], r[a + 1]] : (M = (v - F(w)) / b,
                        A = (v + F(w)) / b,
                        k = [r[a]],
                        M > r[a] && M < r[a + 1] && k.push(M),
                        A > r[a] && A < r[a + 1] && k.push(A),
                        k.push(r[a + 1])),
                        T = k[0],
                        M = this._at(T, a),
                        s = 0; s < k.length - 1; s++)
                            if (S = k[s + 1],
                            A = this._at(S, a),
                            0 !== M)
                                if (0 === A || M * A > 0)
                                    T = S,
                                    M = A;
                                else {
                                    for (var I = 0; !((j = (M * S - A * T) / (M - A)) <= T || j >= S); )
                                        if ((P = this._at(j, a)) * A > 0)
                                            S = j,
                                            A = P,
                                            -1 === I && (M *= .5),
                                            I = -1;
                                        else {
                                            if (!(P * M > 0))
                                                break;
                                            T = j,
                                            M = P,
                                            1 === I && (A *= .5),
                                            I = 1
                                        }
                                    d.push(j),
                                    T = k[s + 1],
                                    M = this._at(T, a)
                                }
                            else
                                d.push(T),
                                T = S,
                                M = A;
                        0 === A && d.push(S)
                    }
                    n[u] = d
                }
                return "number" == typeof this.yl[0] ? n[0] : n
            }
            ,
            numeric.spline = function(e, n, r, t) {
                var i, o = e.length, c = [], u = [], a = [], s = numeric.sub, l = numeric.mul, f = numeric.add;
                for (i = o - 2; i >= 0; i--)
                    u[i] = e[i + 1] - e[i],
                    a[i] = s(n[i + 1], n[i]);
                "string" != typeof r && "string" != typeof t || (r = t = "periodic");
                var m = [[], [], []];
                switch (typeof r) {
                case "undefined":
                    c[0] = l(3 / (u[0] * u[0]), a[0]),
                    m[0].push(0, 0),
                    m[1].push(0, 1),
                    m[2].push(2 / u[0], 1 / u[0]);
                    break;
                case "string":
                    c[0] = f(l(3 / (u[o - 2] * u[o - 2]), a[o - 2]), l(3 / (u[0] * u[0]), a[0])),
                    m[0].push(0, 0, 0),
                    m[1].push(o - 2, 0, 1),
                    m[2].push(1 / u[o - 2], 2 / u[o - 2] + 2 / u[0], 1 / u[0]);
                    break;
                default:
                    c[0] = r,
                    m[0].push(0),
                    m[1].push(0),
                    m[2].push(1)
                }
                for (i = 1; i < o - 1; i++)
                    c[i] = f(l(3 / (u[i - 1] * u[i - 1]), a[i - 1]), l(3 / (u[i] * u[i]), a[i])),
                    m[0].push(i, i, i),
                    m[1].push(i - 1, i, i + 1),
                    m[2].push(1 / u[i - 1], 2 / u[i - 1] + 2 / u[i], 1 / u[i]);
                switch (typeof t) {
                case "undefined":
                    c[o - 1] = l(3 / (u[o - 2] * u[o - 2]), a[o - 2]),
                    m[0].push(o - 1, o - 1),
                    m[1].push(o - 2, o - 1),
                    m[2].push(1 / u[o - 2], 2 / u[o - 2]);
                    break;
                case "string":
                    m[1][m[1].length - 1] = 0;
                    break;
                default:
                    c[o - 1] = t,
                    m[0].push(o - 1),
                    m[1].push(o - 1),
                    m[2].push(1)
                }
                c = "number" != typeof c[0] ? numeric.transpose(c) : [c];
                var p = Array(c.length);
                if ("string" == typeof r)
                    for (i = p.length - 1; -1 !== i; --i)
                        p[i] = numeric.ccsLUPSolve(numeric.ccsLUP(numeric.ccsScatter(m)), c[i]),
                        p[i][o - 1] = p[i][0];
                else
                    for (i = p.length - 1; -1 !== i; --i)
                        p[i] = numeric.cLUsolve(numeric.cLU(m), c[i]);
                return p = "number" == typeof n[0] ? p[0] : numeric.transpose(p),
                new numeric.Spline(e,n,n,p,p)
            }
            ,
            numeric.fftpow2 = function e(n, r) {
                var t = n.length;
                if (1 !== t) {
                    var i, o, c = Math.cos, u = Math.sin, a = Array(t / 2), s = Array(t / 2), l = Array(t / 2), f = Array(t / 2);
                    for (o = t / 2,
                    i = t - 1; -1 !== i; --i)
                        l[--o] = n[i],
                        f[o] = r[i],
                        --i,
                        a[o] = n[i],
                        s[o] = r[i];
                    e(a, s),
                    e(l, f),
                    o = t / 2;
                    var m, p, d, h = -6.283185307179586 / t;
                    for (i = t - 1; -1 !== i; --i)
                        -1 === --o && (o = t / 2 - 1),
                        p = c(m = h * i),
                        d = u(m),
                        n[i] = a[o] + p * l[o] - d * f[o],
                        r[i] = s[o] + p * f[o] + d * l[o]
                }
            }
            ,
            numeric._ifftpow2 = function e(n, r) {
                var t = n.length;
                if (1 !== t) {
                    var i, o, c = Math.cos, u = Math.sin, a = Array(t / 2), s = Array(t / 2), l = Array(t / 2), f = Array(t / 2);
                    for (o = t / 2,
                    i = t - 1; -1 !== i; --i)
                        l[--o] = n[i],
                        f[o] = r[i],
                        --i,
                        a[o] = n[i],
                        s[o] = r[i];
                    e(a, s),
                    e(l, f),
                    o = t / 2;
                    var m, p, d, h = 6.283185307179586 / t;
                    for (i = t - 1; -1 !== i; --i)
                        -1 === --o && (o = t / 2 - 1),
                        p = c(m = h * i),
                        d = u(m),
                        n[i] = a[o] + p * l[o] - d * f[o],
                        r[i] = s[o] + p * f[o] + d * l[o]
                }
            }
            ,
            numeric.ifftpow2 = function(e, n) {
                numeric._ifftpow2(e, n),
                numeric.diveq(e, e.length),
                numeric.diveq(n, n.length)
            }
            ,
            numeric.convpow2 = function(e, n, r, t) {
                var i, o, c, u, a;
                for (numeric.fftpow2(e, n),
                numeric.fftpow2(r, t),
                i = e.length - 1; -1 !== i; --i)
                    o = e[i],
                    u = n[i],
                    c = r[i],
                    a = t[i],
                    e[i] = o * c - u * a,
                    n[i] = o * a + u * c;
                numeric.ifftpow2(e, n)
            }
            ,
            numeric.T.prototype.fft = function() {
                var e, n, r = this.x, t = this.y, i = r.length, o = Math.log, c = o(2), u = Math.ceil(o(2 * i - 1) / c), a = Math.pow(2, u), s = numeric.rep([a], 0), l = numeric.rep([a], 0), f = Math.cos, m = Math.sin, p = -3.141592653589793 / i, d = numeric.rep([a], 0), h = numeric.rep([a], 0);
                Math.floor(i / 2);
                for (e = 0; e < i; e++)
                    d[e] = r[e];
                if (void 0 !== t)
                    for (e = 0; e < i; e++)
                        h[e] = t[e];
                for (s[0] = 1,
                e = 1; e <= a / 2; e++)
                    n = p * e * e,
                    s[e] = f(n),
                    l[e] = m(n),
                    s[a - e] = f(n),
                    l[a - e] = m(n);
                var _ = new numeric.T(d,h)
                  , g = new numeric.T(s,l);
                return _ = _.mul(g),
                numeric.convpow2(_.x, _.y, numeric.clone(g.x), numeric.neg(g.y)),
                (_ = _.mul(g)).x.length = i,
                _.y.length = i,
                _
            }
            ,
            numeric.T.prototype.ifft = function() {
                var e, n, r = this.x, t = this.y, i = r.length, o = Math.log, c = o(2), u = Math.ceil(o(2 * i - 1) / c), a = Math.pow(2, u), s = numeric.rep([a], 0), l = numeric.rep([a], 0), f = Math.cos, m = Math.sin, p = 3.141592653589793 / i, d = numeric.rep([a], 0), h = numeric.rep([a], 0);
                Math.floor(i / 2);
                for (e = 0; e < i; e++)
                    d[e] = r[e];
                if (void 0 !== t)
                    for (e = 0; e < i; e++)
                        h[e] = t[e];
                for (s[0] = 1,
                e = 1; e <= a / 2; e++)
                    n = p * e * e,
                    s[e] = f(n),
                    l[e] = m(n),
                    s[a - e] = f(n),
                    l[a - e] = m(n);
                var _ = new numeric.T(d,h)
                  , g = new numeric.T(s,l);
                return _ = _.mul(g),
                numeric.convpow2(_.x, _.y, numeric.clone(g.x), numeric.neg(g.y)),
                (_ = _.mul(g)).x.length = i,
                _.y.length = i,
                _.div(i)
            }
            ,
            numeric.gradient = function(e, n) {
                var r = n.length
                  , t = e(n);
                if (isNaN(t))
                    throw new Error("gradient: f(x) is a NaN!");
                var i, o, c, u, a, s, l, f, m, p = Math.max, d = numeric.clone(n), h = Array(r), _ = (numeric.div,
                numeric.sub,
                p = Math.max,
                Math.abs), g = Math.min, y = 0;
                for (i = 0; i < r; i++)
                    for (var v = p(1e-6 * t, 1e-8); ; ) {
                        if (++y > 20)
                            throw new Error("Numerical gradient fails");
                        if (d[i] = n[i] + v,
                        o = e(d),
                        d[i] = n[i] - v,
                        c = e(d),
                        d[i] = n[i],
                        isNaN(o) || isNaN(c))
                            v /= 16;
                        else {
                            if (h[i] = (o - c) / (2 * v),
                            u = n[i] - v,
                            a = n[i],
                            s = n[i] + v,
                            l = (o - t) / v,
                            f = (t - c) / v,
                            m = p(_(h[i]), _(t), _(o), _(c), _(u), _(a), _(s), 1e-8),
                            !(g(p(_(l - h[i]), _(f - h[i]), _(l - f)) / m, v / m) > .001))
                                break;
                            v /= 16
                        }
                    }
                return h
            }
            ,
            numeric.uncmin = function(e, n, r, t, i, o, c) {
                var u = numeric.gradient;
                void 0 === c && (c = {}),
                void 0 === r && (r = 1e-8),
                void 0 === t && (t = function(n) {
                    return u(e, n)
                }
                ),
                void 0 === i && (i = 1e3);
                var a, s, l = (n = numeric.clone(n)).length, f = e(n);
                if (isNaN(f))
                    throw new Error("uncmin: f(x0) is a NaN!");
                var m = Math.max
                  , p = numeric.norm2;
                r = m(r, numeric.epsilon);
                var d, h, _, g, y, v, b, w, x, k, M = c.Hinv || numeric.identity(l), A = numeric.dot, P = (numeric.inv,
                numeric.sub), T = numeric.add, S = numeric.tensor, j = numeric.div, N = numeric.mul, q = numeric.all, F = numeric.isFinite, I = numeric.neg, B = 0, V = "";
                for (h = t(n); B < i; ) {
                    if ("function" == typeof o && o(B, n, f, h, M)) {
                        V = "Callback returned true";
                        break
                    }
                    if (!q(F(h))) {
                        V = "Gradient has Infinity or NaN";
                        break
                    }
                    if (!q(F(d = I(A(M, h))))) {
                        V = "Search direction has Infinity or NaN";
                        break
                    }
                    if ((k = p(d)) < r) {
                        V = "Newton step smaller than tol";
                        break
                    }
                    for (x = 1,
                    s = A(h, d),
                    y = n; B < i && !(x * k < r) && (y = T(n, g = N(d, x)),
                    (a = e(y)) - f >= .1 * x * s || isNaN(a)); )
                        x *= .5,
                        ++B;
                    if (x * k < r) {
                        V = "Line search step size smaller than tol";
                        break
                    }
                    if (B === i) {
                        V = "maxit reached during line search";
                        break
                    }
                    w = A(v = P(_ = t(y), h), g),
                    b = A(M, v),
                    M = P(T(M, N((w + A(v, b)) / (w * w), S(g, g))), j(T(S(b, g), S(g, b)), w)),
                    n = y,
                    f = a,
                    h = _,
                    ++B
                }
                return {
                    solution: n,
                    f: f,
                    gradient: h,
                    invHessian: M,
                    iterations: B,
                    message: V
                }
            }
            ,
            numeric.Dopri = function(e, n, r, t, i, o, c) {
                this.x = e,
                this.y = n,
                this.f = r,
                this.ymid = t,
                this.iterations = i,
                this.events = c,
                this.message = o
            }
            ,
            numeric.Dopri.prototype._at = function(e, n) {
                function r(e) {
                    return e * e
                }
                var t, i, o, c, u, a, s, l, f, m = this.x, p = this.y, d = this.f, h = this.ymid, _ = (m.length,
                Math.floor,
                numeric.add), g = numeric.mul, y = numeric.sub;
                return t = m[n],
                i = m[n + 1],
                c = p[n],
                u = p[n + 1],
                o = t + .5 * (i - t),
                a = h[n],
                s = y(d[n], g(c, 1 / (t - o) + 2 / (t - i))),
                l = y(d[n + 1], g(u, 1 / (i - o) + 2 / (i - t))),
                _(_(_(_(g(c, (f = [r(e - i) * (e - o) / r(t - i) / (t - o), r(e - t) * r(e - i) / r(t - o) / r(i - o), r(e - t) * (e - o) / r(i - t) / (i - o), (e - t) * r(e - i) * (e - o) / r(t - i) / (t - o), (e - i) * r(e - t) * (e - o) / r(t - i) / (i - o)])[0]), g(a, f[1])), g(u, f[2])), g(s, f[3])), g(l, f[4]))
            }
            ,
            numeric.Dopri.prototype.at = function(e) {
                var n, r, t, i = Math.floor;
                if ("number" != typeof e) {
                    var o = e.length
                      , c = Array(o);
                    for (n = o - 1; -1 !== n; --n)
                        c[n] = this.at(e[n]);
                    return c
                }
                var u = this.x;
                for (n = 0,
                r = u.length - 1; r - n > 1; )
                    u[t = i(.5 * (n + r))] <= e ? n = t : r = t;
                return this._at(e, n)
            }
            ,
            numeric.dopri = function(e, n, r, t, i, o, c) {
                void 0 === i && (i = 1e-6),
                void 0 === o && (o = 1e3);
                var u, a, s, l, f, m, p, d, h, _, g, y, v, b = [e], w = [r], x = [t(e, r)], k = [], M = [3 / 40, 9 / 40], A = [44 / 45, -56 / 15, 32 / 9], P = [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729], T = [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656], S = [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84], j = [.10013431883002395, 0, .3918321794184259, -.02982460176594817, .05893268337240795, -.04497888809104361, 5618549.5 / 235043384], N = [.2, .3, .8, 8 / 9, 1, 1], q = [-71 / 57600, 0, 71 / 16695, -71 / 1920, 17253 / 339200, -22 / 525, 1 / 40], F = 0, I = (n - e) / 10, B = 0, V = numeric.add, z = numeric.mul, O = (Math.max,
                Math.min), R = Math.abs, D = numeric.norminf, L = Math.pow, U = numeric.any, C = numeric.lt, E = numeric.and, X = (numeric.sub,
                new numeric.Dopri(b,w,x,k,-1,""));
                for ("function" == typeof c && (g = c(e, r)); e < n && B < o; )
                    if (++B,
                    e + I > n && (I = n - e),
                    u = t(e + N[0] * I, V(r, z(.2 * I, x[F]))),
                    a = t(e + N[1] * I, V(V(r, z(M[0] * I, x[F])), z(M[1] * I, u))),
                    s = t(e + N[2] * I, V(V(V(r, z(A[0] * I, x[F])), z(A[1] * I, u)), z(A[2] * I, a))),
                    l = t(e + N[3] * I, V(V(V(V(r, z(P[0] * I, x[F])), z(P[1] * I, u)), z(P[2] * I, a)), z(P[3] * I, s))),
                    f = t(e + N[4] * I, V(V(V(V(V(r, z(T[0] * I, x[F])), z(T[1] * I, u)), z(T[2] * I, a)), z(T[3] * I, s)), z(T[4] * I, l))),
                    m = t(e + I, h = V(V(V(V(V(r, z(x[F], I * S[0])), z(a, I * S[2])), z(s, I * S[3])), z(l, I * S[4])), z(f, I * S[5]))),
                    (_ = "number" == typeof (p = V(V(V(V(V(z(x[F], I * q[0]), z(a, I * q[2])), z(s, I * q[3])), z(l, I * q[4])), z(f, I * q[5])), z(m, I * q[6]))) ? R(p) : D(p)) > i) {
                        if (e + (I = .2 * I * L(i / _, .25)) === e) {
                            X.msg = "Step size became too small";
                            break
                        }
                    } else {
                        if (k[F] = V(V(V(V(V(V(r, z(x[F], I * j[0])), z(a, I * j[2])), z(s, I * j[3])), z(l, I * j[4])), z(f, I * j[5])), z(m, I * j[6])),
                        b[++F] = e + I,
                        w[F] = h,
                        x[F] = m,
                        "function" == typeof c) {
                            var H, Y, Q = e, Z = e + .5 * I;
                            if (y = c(Z, k[F - 1]),
                            U(v = E(C(g, 0), C(0, y))) || (Q = Z,
                            g = y,
                            y = c(Z = e + I, h),
                            v = E(C(g, 0), C(0, y))),
                            U(v)) {
                                for (var W, G, $ = 0, J = 1, K = 1; ; ) {
                                    if ("number" == typeof g)
                                        Y = (K * y * Q - J * g * Z) / (K * y - J * g);
                                    else
                                        for (Y = Z,
                                        d = g.length - 1; -1 !== d; --d)
                                            g[d] < 0 && y[d] > 0 && (Y = O(Y, (K * y[d] * Q - J * g[d] * Z) / (K * y[d] - J * g[d])));
                                    if (Y <= Q || Y >= Z)
                                        break;
                                    G = c(Y, H = X._at(Y, F - 1)),
                                    U(W = E(C(g, 0), C(0, G))) ? (Z = Y,
                                    y = G,
                                    v = W,
                                    K = 1,
                                    -1 === $ ? J *= .5 : J = 1,
                                    $ = -1) : (Q = Y,
                                    g = G,
                                    J = 1,
                                    1 === $ ? K *= .5 : K = 1,
                                    $ = 1)
                                }
                                return h = X._at(.5 * (e + Y), F - 1),
                                X.f[F] = t(Y, H),
                                X.x[F] = Y,
                                X.y[F] = H,
                                X.ymid[F - 1] = h,
                                X.events = v,
                                X.iterations = B,
                                X
                            }
                        }
                        e += I,
                        r = h,
                        g = y,
                        I = O(.8 * I * L(i / _, .25), 4 * I)
                    }
                return X.iterations = B,
                X
            }
            ,
            numeric.LU = function(e, n) {
                n = n || !1;
                var r, t, i, o, c, u, a, s, l, f = Math.abs, m = e.length, p = m - 1, d = new Array(m);
                for (n || (e = numeric.clone(e)),
                i = 0; i < m; ++i) {
                    for (a = i,
                    l = f((u = e[i])[i]),
                    t = i + 1; t < m; ++t)
                        l < (o = f(e[t][i])) && (l = o,
                        a = t);
                    for (d[i] = a,
                    a != i && (e[i] = e[a],
                    e[a] = u,
                    u = e[i]),
                    c = u[i],
                    r = i + 1; r < m; ++r)
                        e[r][i] /= c;
                    for (r = i + 1; r < m; ++r) {
                        for (s = e[r],
                        t = i + 1; t < p; ++t)
                            s[t] -= s[i] * u[t],
                            s[++t] -= s[i] * u[t];
                        t === p && (s[t] -= s[i] * u[t])
                    }
                }
                return {
                    LU: e,
                    P: d
                }
            }
            ,
            numeric.LUsolve = function(e, n) {
                var r, t, i, o, c, u = e.LU, a = u.length, s = numeric.clone(n), l = e.P;
                for (r = a - 1; -1 !== r; --r)
                    s[r] = n[r];
                for (r = 0; r < a; ++r)
                    for (i = l[r],
                    l[r] !== r && (c = s[r],
                    s[r] = s[i],
                    s[i] = c),
                    o = u[r],
                    t = 0; t < r; ++t)
                        s[r] -= s[t] * o[t];
                for (r = a - 1; r >= 0; --r) {
                    for (o = u[r],
                    t = r + 1; t < a; ++t)
                        s[r] -= s[t] * o[t];
                    s[r] /= o[r]
                }
                return s
            }
            ,
            numeric.solve = function(e, n, r) {
                return numeric.LUsolve(numeric.LU(e, r), n)
            }
            ,
            numeric.echelonize = function(e) {
                var n, r, t, i, o, c, u, a, s = numeric.dim(e), l = s[0], f = s[1], m = numeric.identity(l), p = Array(l), d = Math.abs, h = numeric.diveq;
                for (e = numeric.clone(e),
                n = 0; n < l; ++n) {
                    for (t = 0,
                    o = e[n],
                    c = m[n],
                    r = 1; r < f; ++r)
                        d(o[t]) < d(o[r]) && (t = r);
                    for (p[n] = t,
                    h(c, o[t]),
                    h(o, o[t]),
                    r = 0; r < l; ++r)
                        if (r !== n) {
                            for (a = (u = e[r])[t],
                            i = f - 1; -1 !== i; --i)
                                u[i] -= o[i] * a;
                            for (u = m[r],
                            i = l - 1; -1 !== i; --i)
                                u[i] -= c[i] * a
                        }
                }
                return {
                    I: m,
                    A: e,
                    P: p
                }
            }
            ,
            numeric.__solveLP = function(e, n, r, t, i, o, c) {
                var u, a, s, l, f = numeric.sum, m = (numeric.log,
                numeric.mul), p = numeric.sub, d = numeric.dot, h = numeric.div, _ = numeric.add, g = e.length, y = r.length, v = !1, b = 1, w = (numeric.transpose(n),
                numeric.svd,
                numeric.transpose), x = (numeric.leq,
                Math.sqrt), k = Math.abs, M = (numeric.muleq,
                numeric.norminf,
                numeric.any,
                Math.min), A = numeric.all, P = numeric.gt, T = Array(g), S = Array(y), j = (numeric.rep([y], 1),
                numeric.solve), N = p(r, d(n, o)), q = d(e, e);
                for (s = 0; s < i; ++s) {
                    var F, I;
                    for (F = y - 1; -1 !== F; --F)
                        S[F] = h(n[F], N[F]);
                    var B = w(S);
                    for (F = g - 1; -1 !== F; --F)
                        T[F] = f(B[F]);
                    b = .25 * k(q / d(e, T));
                    var V = 100 * x(q / d(T, T));
                    for ((!isFinite(b) || b > V) && (b = V),
                    l = _(e, m(b, T)),
                    a = d(B, S),
                    F = g - 1; -1 !== F; --F)
                        a[F][F] += 1;
                    I = j(a, h(l, b), !0);
                    var z = h(N, d(n, I))
                      , O = 1;
                    for (F = y - 1; -1 !== F; --F)
                        z[F] < 0 && (O = M(O, -.999 * z[F]));
                    if (u = p(o, m(I, O)),
                    !A(P(N = p(r, d(n, u)), 0)))
                        return {
                            solution: o,
                            message: "",
                            iterations: s
                        };
                    if (o = u,
                    b < t)
                        return {
                            solution: u,
                            message: "",
                            iterations: s
                        };
                    if (c) {
                        var R = d(e, l)
                          , D = d(n, l);
                        for (v = !0,
                        F = y - 1; -1 !== F; --F)
                            if (R * D[F] < 0) {
                                v = !1;
                                break
                            }
                    } else
                        v = !(o[g - 1] >= 0);
                    if (v)
                        return {
                            solution: u,
                            message: "Unbounded",
                            iterations: s
                        }
                }
                return {
                    solution: o,
                    message: "maximum iteration count exceeded",
                    iterations: s
                }
            }
            ,
            numeric._solveLP = function(e, n, r, t, i) {
                var o = e.length
                  , c = r.length
                  , u = (numeric.sum,
                numeric.log,
                numeric.mul,
                numeric.sub)
                  , a = numeric.dot
                  , s = (numeric.div,
                numeric.add,
                numeric.rep([o], 0).concat([1]))
                  , l = numeric.rep([c, 1], -1)
                  , f = numeric.blockMatrix([[n, l]])
                  , m = r
                  , p = numeric.rep([o], 0).concat(Math.max(0, numeric.sup(numeric.neg(r))) + 1)
                  , d = numeric.__solveLP(s, f, m, t, i, p, !1)
                  , h = numeric.clone(d.solution);
                if (h.length = o,
                numeric.inf(u(r, a(n, h))) < 0)
                    return {
                        solution: NaN,
                        message: "Infeasible",
                        iterations: d.iterations
                    };
                var _ = numeric.__solveLP(e, n, r, t, i - d.iterations, h, !0);
                return _.iterations += d.iterations,
                _
            }
            ,
            numeric.solveLP = function(e, n, r, t, i, o, c) {
                if (void 0 === c && (c = 1e3),
                void 0 === o && (o = numeric.epsilon),
                void 0 === t)
                    return numeric._solveLP(e, n, r, o, c);
                var u, a = t.length, s = t[0].length, l = n.length, f = numeric.echelonize(t), m = numeric.rep([s], 0), p = f.P, d = [];
                for (u = p.length - 1; -1 !== u; --u)
                    m[p[u]] = 1;
                for (u = s - 1; -1 !== u; --u)
                    0 === m[u] && d.push(u);
                var h = numeric.getRange
                  , _ = numeric.linspace(0, a - 1)
                  , g = numeric.linspace(0, l - 1)
                  , y = h(t, _, d)
                  , v = h(n, g, p)
                  , b = h(n, g, d)
                  , w = numeric.dot
                  , x = numeric.sub
                  , k = w(v, f.I)
                  , M = x(b, w(k, y))
                  , A = x(r, w(k, i))
                  , P = Array(p.length)
                  , T = Array(d.length);
                for (u = p.length - 1; -1 !== u; --u)
                    P[u] = e[p[u]];
                for (u = d.length - 1; -1 !== u; --u)
                    T[u] = e[d[u]];
                var S = x(T, w(P, w(f.I, y)))
                  , j = numeric._solveLP(S, M, A, o, c)
                  , N = j.solution;
                if (N != N)
                    return j;
                var q = w(f.I, x(i, w(y, N)))
                  , F = Array(e.length);
                for (u = p.length - 1; -1 !== u; --u)
                    F[p[u]] = q[u];
                for (u = d.length - 1; -1 !== u; --u)
                    F[d[u]] = N[u];
                return {
                    solution: F,
                    message: j.message,
                    iterations: j.iterations
                }
            }
            ,
            numeric.MPStoLP = function(e) {
                e instanceof String && e.split("\n");
                var n, r, t, i, o = 0, c = ["Initial state", "NAME", "ROWS", "COLUMNS", "RHS", "BOUNDS", "ENDATA"], u = e.length, a = 0, s = {}, l = [], f = 0, m = {}, p = 0, d = [], h = [], _ = [];
                function g(r) {
                    throw new Error("MPStoLP: " + r + "\nLine " + n + ": " + e[n] + "\nCurrent state: " + c[o] + "\n")
                }
                for (n = 0; n < u; ++n) {
                    var y = (t = e[n]).match(/\S*/g)
                      , v = [];
                    for (r = 0; r < y.length; ++r)
                        "" !== y[r] && v.push(y[r]);
                    if (0 !== v.length) {
                        for (r = 0; r < c.length && t.substr(0, c[r].length) !== c[r]; ++r)
                            ;
                        if (r < c.length) {
                            if (o = r,
                            1 === r && (i = v[1]),
                            6 === r)
                                return {
                                    name: i,
                                    c: d,
                                    A: numeric.transpose(h),
                                    b: _,
                                    rows: s,
                                    vars: m
                                }
                        } else
                            switch (o) {
                            case 0:
                            case 1:
                                g("Unexpected line");
                            case 2:
                                switch (v[0]) {
                                case "N":
                                    0 === a ? a = v[1] : g("Two or more N rows");
                                    break;
                                case "L":
                                    s[v[1]] = f,
                                    l[f] = 1,
                                    _[f] = 0,
                                    ++f;
                                    break;
                                case "G":
                                    s[v[1]] = f,
                                    l[f] = -1,
                                    _[f] = 0,
                                    ++f;
                                    break;
                                case "E":
                                    s[v[1]] = f,
                                    l[f] = 0,
                                    _[f] = 0,
                                    ++f;
                                    break;
                                default:
                                    g("Parse error " + numeric.prettyPrint(v))
                                }
                                break;
                            case 3:
                                m.hasOwnProperty(v[0]) || (m[v[0]] = p,
                                d[p] = 0,
                                h[p] = numeric.rep([f], 0),
                                ++p);
                                var b = m[v[0]];
                                for (r = 1; r < v.length; r += 2)
                                    if (v[r] !== a) {
                                        var w = s[v[r]];
                                        h[b][w] = (l[w] < 0 ? -1 : 1) * parseFloat(v[r + 1])
                                    } else
                                        d[b] = parseFloat(v[r + 1]);
                                break;
                            case 4:
                                for (r = 1; r < v.length; r += 2)
                                    _[s[v[r]]] = (l[s[v[r]]] < 0 ? -1 : 1) * parseFloat(v[r + 1]);
                                break;
                            case 5:
                                break;
                            case 6:
                                g("Internal error")
                            }
                    }
                }
                g("Reached end of file without ENDATA")
            }
            ,
            numeric.seedrandom = {
                pow: Math.pow,
                random: Math.random
            },
            function(e, n, r, t, i, o, c) {
                function u(e) {
                    var n, r, t = this, i = e.length, o = 0, c = t.i = t.j = t.m = 0;
                    for (t.S = [],
                    t.c = [],
                    i || (e = [i++]); o < 256; )
                        t.S[o] = o++;
                    for (o = 0; o < 256; o++)
                        c = l(c + (n = t.S[o]) + e[o % i]),
                        r = t.S[c],
                        t.S[o] = r,
                        t.S[c] = n;
                    t.g = function(e) {
                        var n = t.S
                          , r = l(t.i + 1)
                          , i = n[r]
                          , o = l(t.j + i)
                          , c = n[o];
                        n[r] = c,
                        n[o] = i;
                        for (var u = n[l(i + c)]; --e; )
                            r = l(r + 1),
                            c = n[o = l(o + (i = n[r]))],
                            n[r] = c,
                            n[o] = i,
                            u = 256 * u + n[l(i + c)];
                        return t.i = r,
                        t.j = o,
                        u
                    }
                    ,
                    t.g(256)
                }
                function a(e, n, r, t, i) {
                    if (r = [],
                    i = typeof e,
                    n && "object" == i)
                        for (t in e)
                            if (t.indexOf("S") < 5)
                                try {
                                    r.push(a(e[t], n - 1))
                                } catch (e) {}
                    return r.length ? r : e + ("string" != i ? "\0" : "")
                }
                function s(e, n, r, t) {
                    for (e += "",
                    r = 0,
                    t = 0; t < e.length; t++)
                        n[l(t)] = l((r ^= 19 * n[l(t)]) + e.charCodeAt(t));
                    for (t in e = "",
                    n)
                        e += String.fromCharCode(n[t]);
                    return e
                }
                function l(e) {
                    return 255 & e
                }
                n.seedrandom = function(r, t) {
                    var l, f = [];
                    return r = s(a(t ? [r, e] : arguments.length ? r : [(new Date).getTime(), e, window], 3), f),
                    s((l = new u(f)).S, e),
                    n.random = function() {
                        for (var e = l.g(6), n = c, r = 0; e < i; )
                            e = 256 * (e + r),
                            n *= 256,
                            r = l.g(1);
                        for (; e >= o; )
                            e /= 2,
                            n /= 2,
                            r >>>= 1;
                        return (e + r) / n
                    }
                    ,
                    r
                }
                ,
                c = n.pow(256, 6),
                i = n.pow(2, i),
                o = 2 * i,
                s(n.random(), e)
            }([], numeric.seedrandom, 0, 0, 52),
            function(e) {
                function n(e) {
                    if ("object" != typeof e)
                        return e;
                    var r, t = [], i = e.length;
                    for (r = 0; r < i; r++)
                        t[r + 1] = n(e[r]);
                    return t
                }
                function r(e) {
                    if ("object" != typeof e)
                        return e;
                    var n, t = [], i = e.length;
                    for (n = 1; n < i; n++)
                        t[n - 1] = r(e[n]);
                    return t
                }
                function t(e, n, r, t, i, o, c, u, a, s, l, f, m, p, d, h) {
                    var _, g, y, v, b, w, x, k, M, A, P, T, S, j, N, q, F, I, B, V, z, O, R, D, L, U, C;
                    S = Math.min(t, s),
                    y = 2 * t + S * (S + 5) / 2 + 2 * s + 1,
                    D = 1e-60;
                    do {
                        L = 1 + .1 * (D += D),
                        U = 1 + .2 * D
                    } while (L <= 1 || U <= 1);
                    for (_ = 1; _ <= t; _ += 1)
                        d[_] = n[_];
                    for (_ = t + 1; _ <= y; _ += 1)
                        d[_] = 0;
                    for (_ = 1; _ <= s; _ += 1)
                        f[_] = 0;
                    if (b = [],
                    0 === h[1]) {
                        if (function(e, n, r, t) {
                            var i, o, c, u, a, s;
                            for (o = 1; o <= r; o += 1) {
                                if (t[1] = o,
                                s = 0,
                                (c = o - 1) < 1) {
                                    if ((s = e[o][o] - s) <= 0)
                                        break;
                                    e[o][o] = Math.sqrt(s)
                                } else {
                                    for (u = 1; u <= c; u += 1) {
                                        for (a = e[u][o],
                                        i = 1; i < u; i += 1)
                                            a -= e[i][o] * e[i][u];
                                        a /= e[u][u],
                                        e[u][o] = a,
                                        s += a * a
                                    }
                                    if ((s = e[o][o] - s) <= 0)
                                        break;
                                    e[o][o] = Math.sqrt(s)
                                }
                                t[1] = 0
                            }
                        }(e, 0, t, b),
                        0 !== b[1])
                            return void (h[1] = 2);
                        !function(e, n, r, t) {
                            var i, o, c, u;
                            for (o = 1; o <= r; o += 1) {
                                for (u = 0,
                                i = 1; i < o; i += 1)
                                    u += e[i][o] * t[i];
                                t[o] = (t[o] - u) / e[o][o]
                            }
                            for (c = 1; c <= r; c += 1)
                                for (t[o = r + 1 - c] = t[o] / e[o][o],
                                u = -t[o],
                                i = 1; i < o; i += 1)
                                    t[i] = t[i] + u * e[i][o]
                        }(e, 0, t, n),
                        function(e, n, r) {
                            var t, i, o, c, u;
                            for (o = 1; o <= r; o += 1) {
                                for (e[o][o] = 1 / e[o][o],
                                u = -e[o][o],
                                t = 1; t < o; t += 1)
                                    e[t][o] = u * e[t][o];
                                if (r < (c = o + 1))
                                    break;
                                for (i = c; i <= r; i += 1)
                                    for (u = e[o][i],
                                    e[o][i] = 0,
                                    t = 1; t <= o; t += 1)
                                        e[t][i] = e[t][i] + u * e[t][o]
                            }
                        }(e, 0, t)
                    } else {
                        for (g = 1; g <= t; g += 1)
                            for (i[g] = 0,
                            _ = 1; _ <= g; _ += 1)
                                i[g] = i[g] + e[_][g] * n[_];
                        for (g = 1; g <= t; g += 1)
                            for (n[g] = 0,
                            _ = g; _ <= t; _ += 1)
                                n[g] = n[g] + e[g][_] * i[_]
                    }
                    for (o[1] = 0,
                    g = 1; g <= t; g += 1)
                        for (i[g] = n[g],
                        o[1] = o[1] + d[g] * i[g],
                        d[g] = 0,
                        _ = g + 1; _ <= t; _ += 1)
                            e[_][g] = 0;
                    for (o[1] = -o[1] / 2,
                    h[1] = 0,
                    j = (A = (M = (P = (k = (x = t) + t) + S) + S + 1) + S * (S + 1) / 2) + s,
                    _ = 1; _ <= s; _ += 1) {
                        for (q = 0,
                        g = 1; g <= t; g += 1)
                            q += c[g][_] * c[g][_];
                        d[j + _] = Math.sqrt(q)
                    }
                    function E() {
                        for (p[1] = p[1] + 1,
                        y = A,
                        _ = 1; _ <= s; _ += 1) {
                            for (y += 1,
                            q = -u[_],
                            g = 1; g <= t; g += 1)
                                q += c[g][_] * i[g];
                            if (Math.abs(q) < D && (q = 0),
                            _ > l)
                                d[y] = q;
                            else if (d[y] = -Math.abs(q),
                            q > 0) {
                                for (g = 1; g <= t; g += 1)
                                    c[g][_] = -c[g][_];
                                u[_] = -u[_]
                            }
                        }
                        for (_ = 1; _ <= m; _ += 1)
                            d[A + f[_]] = 0;
                        for (T = 0,
                        N = 0,
                        _ = 1; _ <= s; _ += 1)
                            d[A + _] < N * d[j + _] && (T = _,
                            N = d[A + _] / d[j + _]);
                        return 0 === T ? 999 : 0
                    }
                    function X() {
                        for (_ = 1; _ <= t; _ += 1) {
                            for (q = 0,
                            g = 1; g <= t; g += 1)
                                q += e[g][_] * c[g][T];
                            d[_] = q
                        }
                        for (v = x,
                        _ = 1; _ <= t; _ += 1)
                            d[v + _] = 0;
                        for (g = m + 1; g <= t; g += 1)
                            for (_ = 1; _ <= t; _ += 1)
                                d[v + _] = d[v + _] + e[_][g] * d[g];
                        for (O = !0,
                        _ = m; _ >= 1; _ -= 1) {
                            for (q = d[_],
                            v = (y = M + _ * (_ + 3) / 2) - _,
                            g = _ + 1; g <= m; g += 1)
                                q -= d[y] * d[k + g],
                                y += g;
                            if (q /= d[v],
                            d[k + _] = q,
                            f[_] < l)
                                break;
                            if (q < 0)
                                break;
                            O = !1,
                            w = _
                        }
                        if (!O)
                            for (F = d[P + w] / d[k + w],
                            _ = 1; _ <= m && !(f[_] < l) && !(d[k + _] < 0); _ += 1)
                                (N = d[P + _] / d[k + _]) < F && (F = N,
                                w = _);
                        for (q = 0,
                        _ = x + 1; _ <= x + t; _ += 1)
                            q += d[_] * d[_];
                        if (Math.abs(q) <= D) {
                            if (O)
                                return h[1] = 1,
                                999;
                            for (_ = 1; _ <= m; _ += 1)
                                d[P + _] = d[P + _] - F * d[k + _];
                            return d[P + m + 1] = d[P + m + 1] + F,
                            700
                        }
                        for (q = 0,
                        _ = 1; _ <= t; _ += 1)
                            q += d[x + _] * c[_][T];
                        for (I = -d[A + T] / q,
                        R = !0,
                        O || F < I && (I = F,
                        R = !1),
                        _ = 1; _ <= t; _ += 1)
                            i[_] = i[_] + I * d[x + _],
                            Math.abs(i[_]) < D && (i[_] = 0);
                        for (o[1] = o[1] + I * q * (I / 2 + d[P + m + 1]),
                        _ = 1; _ <= m; _ += 1)
                            d[P + _] = d[P + _] - I * d[k + _];
                        if (d[P + m + 1] = d[P + m + 1] + I,
                        !R) {
                            for (q = -u[T],
                            g = 1; g <= t; g += 1)
                                q += i[g] * c[g][T];
                            if (T > l)
                                d[A + T] = q;
                            else if (d[A + T] = -Math.abs(q),
                            q > 0) {
                                for (g = 1; g <= t; g += 1)
                                    c[g][T] = -c[g][T];
                                u[T] = -u[T]
                            }
                            return 700
                        }
                        for (f[m += 1] = T,
                        y = M + (m - 1) * m / 2 + 1,
                        _ = 1; _ <= m - 1; _ += 1)
                            d[y] = d[_],
                            y += 1;
                        if (m === t)
                            d[y] = d[t];
                        else {
                            for (_ = t; _ >= m + 1 && 0 !== d[_] && (B = Math.max(Math.abs(d[_ - 1]), Math.abs(d[_])),
                            V = Math.min(Math.abs(d[_ - 1]), Math.abs(d[_])),
                            N = d[_ - 1] >= 0 ? Math.abs(B * Math.sqrt(1 + V * V / (B * B))) : -Math.abs(B * Math.sqrt(1 + V * V / (B * B))),
                            B = d[_ - 1] / N,
                            V = d[_] / N,
                            1 !== B); _ -= 1)
                                if (0 === B)
                                    for (d[_ - 1] = V * N,
                                    g = 1; g <= t; g += 1)
                                        N = e[g][_ - 1],
                                        e[g][_ - 1] = e[g][_],
                                        e[g][_] = N;
                                else
                                    for (d[_ - 1] = N,
                                    z = V / (1 + B),
                                    g = 1; g <= t; g += 1)
                                        N = B * e[g][_ - 1] + V * e[g][_],
                                        e[g][_] = z * (e[g][_ - 1] + N) - e[g][_],
                                        e[g][_ - 1] = N;
                            d[y] = d[m]
                        }
                        return 0
                    }
                    function H() {
                        if (0 === d[v = (y = M + w * (w + 1) / 2 + 1) + w])
                            return 798;
                        if (B = Math.max(Math.abs(d[v - 1]), Math.abs(d[v])),
                        V = Math.min(Math.abs(d[v - 1]), Math.abs(d[v])),
                        N = d[v - 1] >= 0 ? Math.abs(B * Math.sqrt(1 + V * V / (B * B))) : -Math.abs(B * Math.sqrt(1 + V * V / (B * B))),
                        B = d[v - 1] / N,
                        V = d[v] / N,
                        1 === B)
                            return 798;
                        if (0 === B) {
                            for (_ = w + 1; _ <= m; _ += 1)
                                N = d[v - 1],
                                d[v - 1] = d[v],
                                d[v] = N,
                                v += _;
                            for (_ = 1; _ <= t; _ += 1)
                                N = e[_][w],
                                e[_][w] = e[_][w + 1],
                                e[_][w + 1] = N
                        } else {
                            for (z = V / (1 + B),
                            _ = w + 1; _ <= m; _ += 1)
                                N = B * d[v - 1] + V * d[v],
                                d[v] = z * (d[v - 1] + N) - d[v],
                                d[v - 1] = N,
                                v += _;
                            for (_ = 1; _ <= t; _ += 1)
                                N = B * e[_][w] + V * e[_][w + 1],
                                e[_][w + 1] = z * (e[_][w] + N) - e[_][w + 1],
                                e[_][w] = N
                        }
                        return 0
                    }
                    function Y() {
                        for (v = y - w,
                        _ = 1; _ <= w; _ += 1)
                            d[v] = d[y],
                            y += 1,
                            v += 1;
                        return d[P + w] = d[P + w + 1],
                        f[w] = f[w + 1],
                        (w += 1) < m ? 797 : 0
                    }
                    function Q() {
                        return d[P + m] = d[P + m + 1],
                        d[P + m + 1] = 0,
                        f[m] = 0,
                        m -= 1,
                        p[2] = p[2] + 1,
                        0
                    }
                    for (m = 0,
                    p[1] = 0,
                    p[2] = 0,
                    C = 0; ; ) {
                        if (999 === (C = E()))
                            return;
                        for (; 0 !== (C = X()); ) {
                            if (999 === C)
                                return;
                            if (700 === C)
                                if (w === m)
                                    Q();
                                else {
                                    for (; H(),
                                    797 === (C = Y()); )
                                        ;
                                    Q()
                                }
                        }
                    }
                }
                e.solveQP = function(e, i, o, c, u, a) {
                    e = n(e),
                    i = n(i),
                    o = n(o);
                    var s, l, f, m, p, d = [], h = [], _ = [], g = [], y = [];
                    if (u = u || 0,
                    a = a ? n(a) : [void 0, 0],
                    c = c ? n(c) : [],
                    l = e.length - 1,
                    f = o[1].length - 1,
                    !c)
                        for (s = 1; s <= f; s += 1)
                            c[s] = 0;
                    for (s = 1; s <= f; s += 1)
                        h[s] = 0;
                    for (0,
                    m = Math.min(l, f),
                    s = 1; s <= l; s += 1)
                        _[s] = 0;
                    for (d[1] = 0,
                    s = 1; s <= 2 * l + m * (m + 5) / 2 + 2 * f + 1; s += 1)
                        g[s] = 0;
                    for (s = 1; s <= 2; s += 1)
                        y[s] = 0;
                    return t(e, i, 0, l, _, d, o, c, 0, f, u, h, 0, y, g, a),
                    p = "",
                    1 === a[1] && (p = "constraints are inconsistent, no solution!"),
                    2 === a[1] && (p = "matrix D in quadratic function is not positive definite!"),
                    {
                        solution: r(_),
                        value: r(d),
                        unconstrained_solution: r(i),
                        iterations: r(y),
                        iact: r(h),
                        message: p
                    }
                }
            }(numeric),
            numeric.svd = function(e) {
                var n, r = numeric.epsilon, t = 1e-64 / r, i = 0, o = 0, c = 0, u = 0, a = 0, s = numeric.clone(e), l = s.length, f = s[0].length;
                if (l < f)
                    throw "Need more rows than columns";
                var m = new Array(f)
                  , p = new Array(f);
                for (o = 0; o < f; o++)
                    m[o] = p[o] = 0;
                var d = numeric.rep([f, f], 0);
                function h(e, n) {
                    return (e = Math.abs(e)) > (n = Math.abs(n)) ? e * Math.sqrt(1 + n * n / e / e) : 0 == n ? e : n * Math.sqrt(1 + e * e / n / n)
                }
                var _ = 0
                  , g = 0
                  , y = 0
                  , v = 0
                  , b = 0
                  , w = 0
                  , x = 0;
                for (o = 0; o < f; o++) {
                    for (m[o] = g,
                    x = 0,
                    a = o + 1,
                    c = o; c < l; c++)
                        x += s[c][o] * s[c][o];
                    if (x <= t)
                        g = 0;
                    else
                        for (_ = s[o][o],
                        g = Math.sqrt(x),
                        _ >= 0 && (g = -g),
                        y = _ * g - x,
                        s[o][o] = _ - g,
                        c = a; c < f; c++) {
                            for (x = 0,
                            u = o; u < l; u++)
                                x += s[u][o] * s[u][c];
                            for (_ = x / y,
                            u = o; u < l; u++)
                                s[u][c] += _ * s[u][o]
                        }
                    for (p[o] = g,
                    x = 0,
                    c = a; c < f; c++)
                        x += s[o][c] * s[o][c];
                    if (x <= t)
                        g = 0;
                    else {
                        for (_ = s[o][o + 1],
                        g = Math.sqrt(x),
                        _ >= 0 && (g = -g),
                        y = _ * g - x,
                        s[o][o + 1] = _ - g,
                        c = a; c < f; c++)
                            m[c] = s[o][c] / y;
                        for (c = a; c < l; c++) {
                            for (x = 0,
                            u = a; u < f; u++)
                                x += s[c][u] * s[o][u];
                            for (u = a; u < f; u++)
                                s[c][u] += x * m[u]
                        }
                    }
                    (b = Math.abs(p[o]) + Math.abs(m[o])) > v && (v = b)
                }
                for (o = f - 1; -1 != o; o += -1) {
                    if (0 != g) {
                        for (y = g * s[o][o + 1],
                        c = a; c < f; c++)
                            d[c][o] = s[o][c] / y;
                        for (c = a; c < f; c++) {
                            for (x = 0,
                            u = a; u < f; u++)
                                x += s[o][u] * d[u][c];
                            for (u = a; u < f; u++)
                                d[u][c] += x * d[u][o]
                        }
                    }
                    for (c = a; c < f; c++)
                        d[o][c] = 0,
                        d[c][o] = 0;
                    d[o][o] = 1,
                    g = m[o],
                    a = o
                }
                for (o = f - 1; -1 != o; o += -1) {
                    for (a = o + 1,
                    g = p[o],
                    c = a; c < f; c++)
                        s[o][c] = 0;
                    if (0 != g) {
                        for (y = s[o][o] * g,
                        c = a; c < f; c++) {
                            for (x = 0,
                            u = a; u < l; u++)
                                x += s[u][o] * s[u][c];
                            for (_ = x / y,
                            u = o; u < l; u++)
                                s[u][c] += _ * s[u][o]
                        }
                        for (c = o; c < l; c++)
                            s[c][o] = s[c][o] / g
                    } else
                        for (c = o; c < l; c++)
                            s[c][o] = 0;
                    s[o][o] += 1
                }
                for (r *= v,
                u = f - 1; -1 != u; u += -1)
                    for (var k = 0; k < 50; k++) {
                        var M = !1;
                        for (a = u; -1 != a; a += -1) {
                            if (Math.abs(m[a]) <= r) {
                                M = !0;
                                break
                            }
                            if (Math.abs(p[a - 1]) <= r)
                                break
                        }
                        if (!M) {
                            i = 0,
                            x = 1;
                            var A = a - 1;
                            for (o = a; o < u + 1 && (_ = x * m[o],
                            m[o] = i * m[o],
                            !(Math.abs(_) <= r)); o++)
                                for (y = h(_, g = p[o]),
                                p[o] = y,
                                i = g / y,
                                x = -_ / y,
                                c = 0; c < l; c++)
                                    b = s[c][A],
                                    w = s[c][o],
                                    s[c][A] = b * i + w * x,
                                    s[c][o] = -b * x + w * i
                        }
                        if (w = p[u],
                        a == u) {
                            if (w < 0)
                                for (p[u] = -w,
                                c = 0; c < f; c++)
                                    d[c][u] = -d[c][u];
                            break
                        }
                        if (k >= 49)
                            throw "Error: no convergence.";
                        for (v = p[a],
                        g = h(_ = (((b = p[u - 1]) - w) * (b + w) + ((g = m[u - 1]) - (y = m[u])) * (g + y)) / (2 * y * b), 1),
                        _ = _ < 0 ? ((v - w) * (v + w) + y * (b / (_ - g) - y)) / v : ((v - w) * (v + w) + y * (b / (_ + g) - y)) / v,
                        i = 1,
                        x = 1,
                        o = a + 1; o < u + 1; o++) {
                            for (g = m[o],
                            b = p[o],
                            y = x * g,
                            g *= i,
                            w = h(_, y),
                            m[o - 1] = w,
                            _ = v * (i = _ / w) + g * (x = y / w),
                            g = -v * x + g * i,
                            y = b * x,
                            b *= i,
                            c = 0; c < f; c++)
                                v = d[c][o - 1],
                                w = d[c][o],
                                d[c][o - 1] = v * i + w * x,
                                d[c][o] = -v * x + w * i;
                            for (w = h(_, y),
                            p[o - 1] = w,
                            _ = (i = _ / w) * g + (x = y / w) * b,
                            v = -x * g + i * b,
                            c = 0; c < l; c++)
                                b = s[c][o - 1],
                                w = s[c][o],
                                s[c][o - 1] = b * i + w * x,
                                s[c][o] = -b * x + w * i
                        }
                        m[a] = 0,
                        m[u] = _,
                        p[u] = v
                    }
                for (o = 0; o < p.length; o++)
                    p[o] < r && (p[o] = 0);
                for (o = 0; o < f; o++)
                    for (c = o - 1; c >= 0; c--)
                        if (p[c] < p[o]) {
                            for (i = p[c],
                            p[c] = p[o],
                            p[o] = i,
                            u = 0; u < s.length; u++)
                                n = s[u][o],
                                s[u][o] = s[u][c],
                                s[u][c] = n;
                            for (u = 0; u < d.length; u++)
                                n = d[u][o],
                                d[u][o] = d[u][c],
                                d[u][c] = n;
                            o = c
                        }
                return {
                    U: s,
                    S: p,
                    V: d
                }
            }
        }
        ).call(this, __webpack_require__(6))
    }
    , function(e, n) {
        var r;
        r = function() {
            return this
        }();
        try {
            r = r || new Function("return this")()
        } catch (e) {
            "object" == typeof window && (r = window)
        }
        e.exports = r
    }
    , function(e, n, r) {
        "use strict";
        r.r(n),
        r.d(n, "get_utterance_features", (function() {
            return i
        }
        ));
        r(0);
        const t = parseInt(40);
        function i(e, n) {
            try {
                const r = n.length;
                if (e.length != r && console.error("Array sizes mismatch"),
                r > 0) {
                    l = new Array(20).fill(0),
                    f = new Array(t).fill(0),
                    m = new Array(t).fill(0),
                    p = new Array(24).fill(0),
                    d = new Array(24).fill(0),
                    h = new Array(8).fill(0),
                    _ = new Array(8).fill(0),
                    g = new Array(10).fill(0),
                    y = new Array(10).fill(0),
                    v = new Array(20).fill(0),
                    b = new Array(20).fill(0),
                    o = new Array(10).fill(0),
                    c = new Array(10).fill(0),
                    u = new Array(10).fill(0),
                    a = new Array(10).fill(0);
                    let i = e[0][0];
                    for (let t = 0; t < r; t++) {
                        const r = e[t][1]
                          , o = n[t][0].length;
                        let c = 0;
                        for (let e = 0; e < o; e++) {
                            const r = n[t][0][e][1];
                            let i = 0
                              , o = 0
                              , u = 0
                              , a = 0
                              , s = 0
                              , l = 0
                              , f = 0
                              , m = 0
                              , p = 0
                              , d = 0;
                            for (let c = 0; c < r; c++)
                                n[t][1][e][c][0] > 0 && (s++,
                                i += n[t][1][e][c][0],
                                o += n[t][1][e][c][1],
                                u += n[t][1][e][c][2],
                                c > 0 && (a += n[t][1][e][c][0] - n[t][1][e][c - 1][0])),
                                n[t][1][e][c][3] > 0 && (d++,
                                l += n[t][1][e][c][3],
                                f += n[t][1][e][c][4],
                                m += n[t][1][e][c][5],
                                c > 0 && (p += n[t][1][e][c][3] - n[t][1][e][c - 1][3]));
                            i /= s,
                            o /= s,
                            u /= s,
                            l /= d,
                            f /= d,
                            m /= d,
                            w(r, i, o, u, a, s, l, f, m, p, d),
                            c += r
                        }
                        s(r, o, e[t][0] - i, c / r),
                        i = e[t][0] + e[t][1]
                    }
                    return function() {
                        let e = [];
                        function n(n) {
                            for (let r in n)
                                e.push(n[r])
                        }
                        return n(x(o)),
                        n(x(c)),
                        n(x(u)),
                        n(x(a)),
                        n(x(l)),
                        n(x(f)),
                        n(x(m)),
                        n(x(p)),
                        n(x(d)),
                        n(x(h)),
                        n(x(_)),
                        n(x(g)),
                        n(x(y)),
                        n(x(v)),
                        n(x(b)),
                        e
                    }()
                }
            } catch (e) {
                console.error(e)
            }
            return null
        }
        var o, c, u, a;
        function s(e, n, r, t) {
            let i = parseInt(10 * e / 150);
            i >= 10 && (i = 9),
            o[i]++;
            let s = n;
            s >= 10 && (s = 9),
            c[s]++;
            let l = parseInt(10 * r / 150);
            l >= 10 && (l = 9),
            u[l]++;
            let f = parseInt(2 * (t - .3) * 10);
            f >= 10 && (f = 9),
            f < 0 && (f = 0),
            a[f]++
        }
        var l, f, m, p, d, h, _, g, y, v, b;
        function w(e, n, r, i, o, c, u, a, s, w, x) {
            let k = parseInt(e / 2);
            k >= 20 && (k = 19),
            l[k]++;
            let M = parseInt(n / 2);
            M >= t && (M = t - 1),
            f[M]++;
            let A = parseInt(u / 2);
            A >= t && (A = t - 1),
            m[A]++;
            let P = parseInt(3 * Math.log10(r));
            P >= 24 && (P = 23),
            p[P]++;
            let T = parseInt(4 * Math.log10(a));
            T >= 24 && (T = 23),
            d[T]++;
            let S = parseInt(i / 2);
            S >= 8 && (S = 7),
            h[S]++;
            let j = parseInt(s / 2);
            j >= 8 && (j = 7),
            _[j]++;
            let N = parseInt(10 * (e - c) / e);
            N >= 10 && (N = 9),
            g[N]++;
            let q = parseInt(10 * (e - x) / e);
            q >= 10 && (q = 9),
            y[q]++;
            let F = parseInt(20 * (o + 50) / 100);
            F >= 20 && (F = 19),
            F < 0 && (F = 0),
            v[F]++;
            let I = parseInt(20 * (w + 50) / 100);
            I >= 20 && (I = 19),
            I < 0 && (I = 0),
            b[I]++
        }
        function x(e) {
            let n = 0;
            for (let r in e)
                n += e[r];
            let r = e.slice();
            if (n > 0)
                for (let e = 0; e < r.length; e++)
                    r[e] /= n;
            return r
        }
    }
    , function(e, n, r) {
        "use strict";
        r.r(n),
        r.d(n, "init_canvas", (function() {
            return m
        }
        )),
        r.d(n, "clear_plot", (function() {
            return p
        }
        )),
        r.d(n, "plot_raw_segment", (function() {
            return d
        }
        )),
        r.d(n, "plot_axis_majors", (function() {
            return h
        }
        )),
        r.d(n, "plot_syllable_anchors", (function() {
            return _
        }
        )),
        r.d(n, "plot_formants", (function() {
            return g
        }
        )),
        r.d(n, "plot_segment_labels", (function() {
            return y
        }
        )),
        r.d(n, "plot_spectrum", (function() {
            return v
        }
        )),
        r.d(n, "plotBands", (function() {
            return w
        }
        ));
        const t = r(0);
        let i = null
          , o = 800
          , c = 400
          , u = 256
          , a = 64
          , s = o / u
          , l = c / a
          , f = 0;
        function m(e, n=800, r=400, t=256, m=64) {
            return !!e && (o = n,
            c = r,
            u = t,
            a = m,
            s = (o - 35) / t,
            l = c / m,
            i = e,
            i.fillStyle = "rgb(10, 10, 20)",
            i.fillRect(0, 0, o, c),
            i.font = "30px Trebuchet MS",
            i.fillStyle = "gray",
            i.textAlign = "center",
            i.fillText("^_^", o / 2 - 15, 100),
            f = 0,
            !0)
        }
        function p(e=!0) {
            return !!i && (f++,
            e && i.clearRect(0, 0, o, c),
            !0)
        }
        async function d(e, n, r, t, o) {
            if (!i)
                return !1;
            let u = f;
            for (let n = 0; n < e.length; n++) {
                if (u != f)
                    return !0;
                for (let r = 0; r < e[n][14]; r++) {
                    let c = e[n][7][r]
                      , u = e[n][8][r]
                      , f = e[n][9][r]
                      , m = e[n][10][r]
                      , p = 510 * e[n][11][r] / o
                      , d = 40 * e[n][12][r] / o
                      , h = (t + c) * s;
                    i.fillStyle = "rgb(" + d + "," + d / 2 + "," + d / 4 + ")";
                    for (let e = u; e < m; e++)
                        i.fillRect(h, (a - e - 1) * l, s, l);
                    for (let e = m + 1; e <= f; e++)
                        i.fillRect(h, (a - e - 1) * l, s, l);
                    i.fillStyle = "rgb(" + p / 6 + "," + p / 1.5 + "," + p + ")",
                    i.fillRect(h, (a - m - 1) * l, s, l)
                }
            }
            if (u != f)
                return !0;
            let m = (t + n) * s;
            return i.font = "10px verdana",
            i.textAlign = "left",
            i.fillStyle = "#00ff00",
            i.fillText(r[0].toFixed(2), (1 + t) * s, 20),
            i.fillRect(t * s, 0, 2, c),
            i.textAlign = "right",
            i.fillStyle = "#ff0000",
            i.fillText((r[0] + r[1]).toFixed(2), m - s, 40),
            i.fillRect(m, 0, 2, c),
            !0
        }
        async function h(e, n) {
            if (!i)
                return !1;
            i.font = "10px verdana",
            i.textAlign = "left",
            i.fillStyle = "#ffffff",
            i.fillText("Hz", o - 45, 15);
            for (let r = 0; r < a; r++)
                r % n == 0 && i.fillText(e[r], o - 30, (a - r - 1) * l + 5);
            return !0
        }
        async function _(e, n, r, o=null) {
            if (!i)
                return !1;
            i.font = "10px verdana",
            i.textAlign = "left";
            for (let u = 0; u < n.length; u++) {
                let f = n[u][0]
                  , m = n[u][1] + 1;
                if (i.fillStyle = "#ffffff",
                i.fillText(e + "," + u, s * (r + f), c - 6),
                i.fillRect(s * (r + f), c - 3, s * m, 3),
                o) {
                    const e = o[u].slice(0, 5)
                      , n = o[u].slice(7, 11);
                    i.fillStyle = "rgb(100, 100, 100)";
                    for (let o = f; o < f + m; o++) {
                        let c = t.solve_poly(e, o - f)
                          , u = t.solve_poly(n, o - f)
                          , m = (r + o) * s;
                        i.fillRect(m, (a - c - 1) * l, s, l),
                        i.fillRect(m, (a - u - 1) * l, s, l)
                    }
                }
            }
            return !0
        }
        async function g(e, n, r, t, o) {
            if (!i)
                return !1;
            let u = f;
            const m = parseInt(e[0].length / 3);
            for (let r = 0; r < n; r++) {
                if (u != f)
                    return !0;
                for (let n = 0; n < m; n++) {
                    let c = e[r][3 * n];
                    if (c > 0) {
                        let u = 20 * e[r][3 * n + 1] / o
                          , f = parseInt(e[r][3 * n + 2] / 2)
                          , m = (t + r) * s;
                        i.fillStyle = "rgb(" + u + "," + u / 2 + "," + u / 4 + ")";
                        for (let e = c - f; e < c; e++)
                            i.fillRect(m, (a - e - 1) * l, s, l);
                        for (let e = c + 1; e <= c + f; e++)
                            i.fillRect(m, (a - e - 1) * l, s, l);
                        i.fillStyle = 0 == n ? "rgb(0, 255, 50)" : 1 == n ? "rgb(255, 1, 255)" : 2 == n ? "rgb(10, 150, 255)" : 3 == n ? "rgb(248, 81, 67)" : 4 == n ? "rgb(177, 28, 67)" : "rgb(92, 14, 249)",
                        i.fillRect(m, (a - c - 1) * l, s, l)
                    }
                }
            }
            if (u != f)
                return !0;
            let p = (t + n) * s;
            return i.font = "10px verdana",
            i.textAlign = "left",
            i.fillStyle = "#ffffff",
            i.fillText(r[0].toFixed(2), (1 + t) * s, 20),
            i.fillRect(t * s, 0, 2, c),
            i.textAlign = "right",
            i.fillStyle = "#ff3d3d",
            i.fillText((r[0] + r[1]).toFixed(2), p - s, 40),
            i.fillRect(p, 0, 2, c),
            !0
        }
        async function y(e, n, r) {
            if (r && r[1] && r[1][0]) {
                let t = (n + e) * s
                  , o = r[1][1] * c;
                i.font = "16px verdana",
                i.fillStyle = "#1fff1f",
                i.textAlign = "right",
                i.fillText(r[1][0], t - s, 100),
                i.fillRect(t, c - o, 2, o)
            }
        }
        async function v(e, n) {
            if (!i)
                return !1;
            let r = f;
            for (let t = e.length - 1; t >= 0; t--)
                if (window.setTimeout((function() {
                    b(t, e[t], n)
                }
                ), e.length - t),
                r != f)
                    return !0;
            return !0
        }
        function b(e, n, r) {
            i.clearRect(e * s, 0, s, c);
            for (let t = 0; t < a; t++) {
                let o = n[t] / r
                  , c = o
                  , u = o
                  , f = o;
                o > .01 && (o < .1 ? (c = 2550 * o,
                u = 100 * o,
                f = 0) : o < .2 ? (c = 2550 * o,
                u = 1e3 * o,
                f = 100 * o) : o < .5 ? (c = 2550 * o,
                u = 1250 * o,
                f = 500 * o) : (c = 50 * o,
                u = 255 * o,
                f = 255),
                i.fillStyle = "rgb(" + c + "," + u + "," + f + ")",
                i.fillRect(e * s, (a - t - 1) * l, s, l))
            }
        }
        async function w(e, n, r, t) {
            if (!i)
                return !1;
            let u, s = f, l = o / a;
            for (var m = 0, p = 0; p < a; p++) {
                if (s != f)
                    return !0;
                let r = 255 * (e[p] / n)
                  , t = 50
                  , o = 50;
                u = c * e[p] / (10 * n),
                i.fillStyle = "rgb(" + r + "," + t + "," + o + ")",
                i.fillRect(m, c - u, l, u),
                m += l
            }
            if (r.length > 0) {
                m = 0,
                i.font = "10px verdana",
                i.fillStyle = "white",
                i.textAlign = "right",
                i.fillText("Hz", o / 2, 40);
                let e = 1;
                for (let n = 0; n < a; n++)
                    n % t == 0 && (i.fillText(r[n], m, 10 + e % 3 * 10),
                    e++),
                    m += l
            }
            return !0
        }
    }
    ])
}
));
