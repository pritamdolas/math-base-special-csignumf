/**
* @license Apache-2.0
*
* Copyright (c) 2025 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var PINF = require( '@stdlib/constants-float32-pinf' );
var NINF = require( '@stdlib/constants-float32-ninf' );
var isnanf = require( '@stdlib/math-base-assert-is-nanf' );
var EPS = require( '@stdlib/constants-float32-eps' );
var absf = require( '@stdlib/math-base-special-absf' );
var isNegativeZerof = require( '@stdlib/math-base-assert-is-negative-zerof' );
var isPositiveZerof = require( '@stdlib/math-base-assert-is-positive-zerof' );
var Complex64 = require( '@stdlib/complex-float32-ctor' );
var real = require( '@stdlib/complex-float32-real' );
var imag = require( '@stdlib/complex-float32-imag' );
var csignumf = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof csignumf, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function evaluates the signum function', function test( t ) {
	var delta;
	var ere;
	var eim;
	var tol;
	var re;
	var im;
	var y;
	var i;

	re = data.re;
	im = data.im;
	ere = data.expected_re;
	eim = data.expected_im;

	for ( i = 0; i < re.length; i++ ) {
		y = csignumf( new Complex64( re[ i ], im[ i ] ) );
		if ( real( y ) === ere[ i ] && imag( y ) === eim[ i ] ) {
			t.equal( real( y ), ere[ i ], 're: '+re[ i ]+'. Expected: '+ere[ i ] );
			t.equal( imag( y ), eim[ i ], 'im: '+im[ i ]+'. Expected: '+eim[ i ] );
		} else {
			delta = absf( real( y ) - ere[ i ] );
			tol = EPS * absf( ere[ i ] );
			t.ok( delta <= tol, 'within tolerance. re: '+re[ i ]+'. im: '+im[ i ]+'. Actual re: '+real( y )+'. Expected re: '+ere[ i ]+'. delta: '+delta+'. tol: '+tol+'.' );

			delta = absf( imag( y ) - eim[ i ] );
			tol = EPS * absf( eim[ i ] );
			t.ok( delta <= tol, 'within tolerance. re: '+re[ i ]+'. im: '+im[ i ]+'. Actual im: '+imag( y )+'. Expected im: '+eim[ i ]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function returns a `NaN` if provided a `NaN`', function test( t ) {
	var val = csignumf( new Complex64( NaN, NaN ) );
	t.strictEqual( isnanf( real( val ) ), true, 'returns expected value' );
	t.strictEqual( isnanf( imag( val ) ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns `+0` if provided `+0`', function test( t ) {
	var val = csignumf( new Complex64( +0.0, +0.0 ) );
	t.strictEqual( isPositiveZerof( real( val ) ), true, 'returns expected value' );
	t.strictEqual( isPositiveZerof( imag( val ) ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-0` if provided `-0`', function test( t ) {
	var val = csignumf( new Complex64( -0.0, -0.0 ) );
	t.strictEqual( isNegativeZerof( real( val ) ), true, 'returns expected value' );
	t.strictEqual( isNegativeZerof( imag( val ) ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns a `NaN` if provided `infinity`', function test( t ) {
	var val = csignumf( new Complex64( PINF, PINF ) );
	t.strictEqual( isnanf( real( val ) ), true, 'returns expected value' );
	t.strictEqual( isnanf( imag( val ) ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns a `NaN` if provided `-infinity`', function test( t ) {
	var val = csignumf( new Complex64( NINF, NINF ) );
	t.strictEqual( isnanf( real( val ) ), true, 'returns expected value' );
	t.strictEqual( isnanf( imag( val ) ), true, 'returns expected value' );
	t.end();
});
