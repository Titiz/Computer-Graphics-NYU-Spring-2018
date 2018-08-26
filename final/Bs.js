
function matrix_vec4_mult(m, v) {
    vp = [0,0,0,1];
    for (i = 0; i < 4; i++) {
           vp[i] = dot_product(m[4*i], m[4*i+1], m[4*i+2], m[4*i+3],
                                 v[0], v[1], v[2], v[3]);
        }
    return vp;
}


function bsSpline(A, B, C, D) {
    Bs = [-1/6, 3/6, -3/6, 1/6,
         3/6, -6/6, 3/6, 0, 
         -3/6, 0 , 3/6, 0, 
         1/6, 4/6, 1/6, 0];
    return matrix_vec4_mult(Bs, [A, B, C, D]);
}
