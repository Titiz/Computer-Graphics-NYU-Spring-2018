
function matrix_vec4_mult(m, v) {
    vp = [0,0,0,1];
    for (i = 0; i < 4; i++) {
           vp[i] = dot_product(m[4*i], m[4*i+1], m[4*i+2], m[4*i+3],
                                 v[0], v[1], v[2], v[3]);
        }
    return vp;
}

var M_bezier =
        [-1, 3, -3, 1,
         3, -6, 3, 0, 
         -3, 3 , 0, 0, 
         1, 0, 0, 0];

function bezier(A, B, C, D) { // returns the coefficients for one of X, Y or Z components.
    return matrix_vec4_mult(M_bezier, [A, B, C, D]);
}
