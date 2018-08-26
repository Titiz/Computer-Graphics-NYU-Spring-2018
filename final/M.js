function matrix_vec4_mult(m, v) {
    vp = [0,0,0,1];
    for (i = 0; i < 4; i++) {
           vp[i] = dot_product(m[4*i], m[4*i+1], m[4*i+2], m[4*i+3],
                                 v[0], v[1], v[2], v[3]);
        }
    return vp;
}


function vec4_matrix_mult(m, v) {
    vp = [0,0,0,1];
    for (i = 0; i < 4; i++) {
           vp[i] = dot_product(v[0], v[1], v[2], v[3],
           m[i], m[i+4], m[i+8], m[i+12]);
        }
    return vp;
}

function matrix_mult(m1, m2) {
    m = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            let pos = i*4+j;
            m[pos] = dot_product(m1[i*4], m1[i*4+1], m1[i*4+2], m1[i*4+3],
                                 m2[j], m2[j+4], m2[j+8], m2[j+12]);
        }
    }
    return m;
}