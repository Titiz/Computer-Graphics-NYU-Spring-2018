

function matrix_vec4_mult(m, v) {
    vp = [0,0,0,1];
    for (i = 0; i < 4; i++) {
           vp[i] = dot_product(m[4*i], m[4*i+1], m[4*i+2], m[4*i+3],
                                 v[0], v[1], v[2], v[3]);
        }
    return vp;
}

function vec4_matrix_mult(v, m) {
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

function mapToInterval(a, b, A, B, val) {
    return (val-A)*(b-a)/(B-A) + a
}

function readPatch(Px, Py, Pz, input){
    for (let i = 0; i < input.length/3; i++) {
        Px[i] = input[i*3];
        Py[i] = input[i*3+1];
        Pz[i] = input[i*3+2];
    }
}

var M_bezier =
        [-1, 3, -3, 1,
         3, -6, 3, 0, 
         -3, 3 , 0, 0, 
         1, 0, 0, 0];


var Px = Array(16);
var Py = Array(16);
var Pz = Array(16);

function CalcXYZ(u, v) {
    V = [v*v*v, v*v, v, 1];
    U = [u*u*u, u*u, u, 1];

    X = matrix_mult(matrix_mult(M_bezier, Px), M_bezier);   
    Y = matrix_mult(matrix_mult(M_bezier, Py), M_bezier);
    Z = matrix_mult(matrix_mult(M_bezier, Pz), M_bezier);

    // console.log([X, Y, Z])

    vx = vec4_matrix_mult(V, X)
    vy = vec4_matrix_mult(V, Y)
    vz = vec4_matrix_mult(V, Z)

    // console.log([vx, vy, vz])

    let x = dot_product(vx[0], vx[1], vx[2], vx[3], U[0], U[1], U[2], U[3]);
    let y = dot_product(vy[0], vy[1], vy[2], vy[3], U[0], U[1], U[2], U[3]);
    let z = dot_product(vz[0], vz[1], vz[2], vz[3], U[0], U[1], U[2], U[3]);

    return [x, y, z]
}

function splineVertex(u, v) {

    let epsilon = 0.001;

    xyz = CalcXYZ(u, v);
    x = xyz[0];
    y = xyz[1];
    z = xyz[2];

    let ue = CalcXYZ(u+epsilon, v); // surface normal calculation. Two small tangent vector.
    let ve = CalcXYZ(u, v+epsilon);

    ue[0] -= x;
    ue[1] -= y;
    ue[2] -= z;

    ve[0] -= x;
    ve[1] -= y;
    ve[2] -= z;

    let nx = ue[1] * ve[2] - ve[1] * ue[2];
    let ny = ue[2] * ve[0] - ve[2] * ue[0];
    let nz = ue[0] * ve[1] - ve[0] * ue[1];

    return [x, y, z, nx, ny, nz, u, v]
}   

