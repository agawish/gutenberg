/**
 * WordPress dependencies
 */
import {
	Fragment,
} from '@wordpress/element';
import {
	InnerBlocks,
	InspectorControls,
	BlockControls,
} from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import {
	CheckboxControl,
	PanelBody,
	Toolbar,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useBlockNavigator from './use-block-navigator';

function NavigationMenu( {
	attributes,
	setAttributes,
	clientId,
	pages,
} ) {
	const { navigatorToolbarButton, navigatorModal } = useBlockNavigator( clientId );
	let defaultMenuItems = false;
	if ( pages ) {
		defaultMenuItems = pages.map( ( page ) => {
			return [ 'core/navigation-menu-item',
				{ label: page.title.rendered, destination: page.permalink_template },
			];
		} );
	}

	return (
		<Fragment>
			<BlockControls>
				<Toolbar>
					{ navigatorToolbarButton }
				</Toolbar>
			</BlockControls>
			{ navigatorModal }
			<InspectorControls>
				<PanelBody
					title={ __( 'Menu Settings' ) }
				>
					<CheckboxControl
						value={ attributes.automaticallyAdd }
						onChange={ ( automaticallyAdd ) => {
							setAttributes( { automaticallyAdd } );
						} }
						label={ __( 'Automatically add new pages' ) }
						help={ __( 'Automatically add new top level pages to this menu.' ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className="wp-block-navigation-menu">
				<InnerBlocks
					template={ defaultMenuItems ? defaultMenuItems : null }
					allowedBlocks={ [ 'core/navigation-menu-item' ] }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</div>
		</Fragment>
	);
}

export default withSelect( ( select ) => {
	const { getEntityRecords } = select( 'core' );
	const filterDefaultPages = {
		parent: 0,
	};
	return {
		pages: getEntityRecords( 'postType', 'page', filterDefaultPages ),
	};
} )( NavigationMenu );

