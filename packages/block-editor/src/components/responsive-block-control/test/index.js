/**
 * External dependencies
 */
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { uniqueId } from 'lodash';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ResponsiveBlockControl from '../index';

let container = null;
beforeEach( () => {
	// setup a DOM element as a render target
	container = document.createElement( 'div' );
	document.body.appendChild( container );
} );

afterEach( () => {
	// cleanup on exiting
	unmountComponentAtNode( container );
	container.remove();
	container = null;
} );

const inputId = uniqueId();

describe( 'Basic rendering', () => {
	it( 'should render with required props', () => {
		act( () => {
			render(
				<ResponsiveBlockControl
					legend="Padding"
					property="padding"
					renderDefaultControl={ ( label ) => (
						<Fragment>
							<label htmlFor={ inputId }>{ label }</label>
							<input
								id={ inputId }
								defaultValue={ label }
							/>
						</Fragment>
					) }
				/>, container
			);
		} );

		const activePropertyLabel = Array.from( container.querySelectorAll( 'legend' ) ).filter( ( legend ) => legend.innerHTML === 'Padding' );

		const activeDeviceLabel = Array.from( container.querySelectorAll( 'label' ) ).filter( ( label ) => label.innerText === 'Padding for desktop devices' );

		const defaultControl = container.querySelector( 'input[value="All"]' );

		const toggleLabel = Array.from( container.querySelectorAll( 'label' ) ).filter( ( label ) => label.innerHTML.includes( 'Use the same padding on all screensizes' ) );

		const toggleState = container.querySelector( 'input[type="checkbox"]' ).checked;

		expect( container.innerHTML ).not.toBe( '' );

		expect( activeDeviceLabel ).toHaveLength( 1 );
		expect( activePropertyLabel ).toHaveLength( 1 );
		expect( defaultControl ).not.toBeNull();
		expect( toggleLabel ).not.toBeNull();
		expect( toggleState ).toBe( true );
		expect( container.innerHTML ).toMatchSnapshot();
	} );

	it( 'should not render without valid legend', () => {
		act( () => {
			render(
				<ResponsiveBlockControl
					property="padding"
					renderDefaultControl={ ( label ) => (
						<Fragment>
							<label htmlFor={ inputId }>{ label }</label>
							<input
								id={ inputId }
								defaultValue={ label }
							/>
						</Fragment>
					) }
				/>, container
			);
		} );

		expect( container.innerHTML ).toBe( '' );
	} );

	it( 'should not render without valid property', () => {
		act( () => {
			render(
				<ResponsiveBlockControl
					legend="Padding"
					renderDefaultControl={ ( label ) => (

						<Fragment>
							<label htmlFor={ inputId }>{ label }</label>
							<input
								id={ inputId }
								defaultValue={ label }
							/>
						</Fragment>
					) }
				/>, container
			);
		} );

		expect( container.innerHTML ).toBe( '' );
	} );

	it( 'should not render without valid default control render prop', () => {
		act( () => {
			render(
				<ResponsiveBlockControl
					legend="Padding"
					property="padding"
				/>, container
			);
		} );

		expect( container.innerHTML ).toBe( '' );
	} );
} );

