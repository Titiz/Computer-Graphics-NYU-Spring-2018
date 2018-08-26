
function matrix_vec4_mult(m, v) {
    vp = [0,0,0,1];
    for (i = 0; i < 4; i++) {
           vp[i] = dot_product(m[4*i], m[4*i+1], m[4*i+2], m[4*i+3],
                                 v[0], v[1], v[2], v[3]);
        }
    return vp;
}


function Hermite(P0, P1, R0, R1) { // returns the coefficients for one of X, Y or Z components.
    H = [2, -2, 1, 1,
         -3, 3, -2, -1, 
         0, 0 , 1, 0, 
         1, 0, 0, 0];
    return matrix_vec4_mult(H, [P0, P1, R0, R1]);
}

function evaluatePolynomial(coeffs, t) {
    return ((coeffs[0] * t + coeffs[1]) * t + coeffs[2]) * t + coeffs[3];
}

var vec3 = function(x, y, z) {
   this.x = x;
   this.y = y;
   this.z = z;
   return this;
};

vec3.create = function(x, y, z) {
  return new vec3(x, y, z);
};

function subtract(v1, v2) {
  v = vec3.create(0, 0, 0);
  v.x = v1.x - v2.x;
  v.y = v1.y - v2.y;
  v.z = v1.z - v2.z;
  return v;
};