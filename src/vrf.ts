// @ts-nocheck

let C8 = "char";
let C2 = "length";
let g3 = "Code";
let k8 = "At";
let zi = "";
let z6 = "concat";
let bi = "=";
let W7 = "from";
let P1 = "Char";
let h = "c/aUAorINHBLxWTy3uRiPt8J+vjsOheFG1E0q2X9CYwDZlnmd4Kb5M6gSVzfk7pQ";
let wr = "undefined";
let l7 = encodeURIComponent;
let R3 = "0000000";
let z7 = "substr";
let M2 = "split";
let $7 = "reverse";
let jt = "join";
let H5 = "replace";
let Xn = /=+$/;
let tr = String;

let a = {
    YGgsL: function (t, n) {
        var i = _0x1c17;
        return k[i(974) + "bZ"](t, n);
    }, nagZC: function (t, n) {
        return t % n;
    }, PpoZZ: function (t, n) {
        return t + n;
    }, VjXwp: function (t, n) {
        return t >> n;
    }
};

let Ue = function (t) {
    for (t = zi[z6](t), u = 0; u < t[C2]; u++) if (255 < t[a.PpoZZ(C8, g3) + k8](u)) return null;
    for (var r = zi, u = 0; u < t[C2]; u += 3) {
        var e = [void 0, void 0, void 0, void 0];
        e[0] = a.VjXwp(t[C8 + g3 + k8](u), 2), e[1] = (3 & t[C8 + g3 + k8](u)) << 4, t[C2] > u + 1 && (e[1] |= t[C8 + g3 + k8](u + 1) >> 4, e[2] = (15 & t[a.PpoZZ(C8 + g3, k8)](u + 1)) << 2), t[C2] > u + 2 && (e[2] |= a.VjXwp(t[a.PpoZZ(C8 + g3, k8)](u + 2), 6), e[3] = 63 & t[C8 + g3 + k8](u + 2));
        for (var o = 0; o < e[C2]; o++) wr == typeof e[o] ? r += bi : r += function (t) {
            if (0 <= t && t < 64) return h[t];
        }(e[o]);
    }
    return r;
};

function Je(t, n) {
    for (var i, r = [], u = 0, e = zi, o = 256, c = 0; c < o; c += 1) r[c] = c;
    for (c = 0; c < o; c += 1) u = (u + r[c] + t[C8 + g3 + k8](c % t[C2])) % o, i = r[c], r[c] = r[u], r[u] = i;
    for (var u = c = 0, f = 0; f < n[C2]; f += 1) u = (u + r[c = (c + f) % o]) % o, i = r[c], r[c] = r[u], r[u] = i, e += tr[W7 + P1 + g3](n[C8 + g3 + k8](f) ^ r[(r[c] + r[u]) % o]);
    return e;
}
function xt(t) {
    var n = (0, Ue)(l7(t) + R3)[z7](0, 6)[M2](zi)[$7]()[jt](zi);
    return n + (0, Ue)(Je(n, l7(zi[z6](t))))[H5](Xn, zi);
}

export function getVrfCode(searchString: string) {
    return xt(searchString) as string
}