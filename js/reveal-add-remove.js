/* jshint browser:true */
/* global Reveal */
( function() {

	"use strict";

	if ( Reveal ) {

		Reveal.addEventListener( "ready", function ( /* event */ ) {

			if ( !Reveal.add ) {

				Reveal.add = function ( content, index, id ) {
					var newSlide = document.createElement( "section" );

					this.dom = {};

					if ( id ) {
						newSlide.setAttribute( "id", id );
					}

					content = content || "";
					index = ( index !== undefined && index !== null ) ? index : -1;

					this.dom.slides = document.querySelector( ".reveal .slides" );

					if ( index === -1 ) {
						//	Adding slide to end
						newSlide.classList.add( "future" );
						this.dom.slides.appendChild( newSlide );

						//	Just enable it, even if it already is
						document.querySelector( ".navigate-right" ).classList.add( "enabled" );
					}
					else {
						if ( index > Reveal.getIndices().h ) {
							newSlide.classList.add( "future" );
							this.dom.slides.insertBefore( newSlide, this.dom.slides.querySelectorAll( "section:nth-child(" + ( index + 1 ) + ")" )[ 0 ] );
						}
						else {
							if ( index <= Reveal.getIndices().h ) {
								newSlide.classList.add( "past" );
								this.dom.slides.insertBefore( newSlide, this.dom.slides.querySelectorAll( "section:nth-child(" + ( index + 1 ) + ")" )[ 0 ] );
								Reveal.next();
							}
						}
					}
					if ( typeof content === "object" && content instanceof HTMLElement ) {
						newSlide.appendChild( content );
					}
					else {
						newSlide.innerHTML = content;
					}

					this.sync();
				};

			}

			if ( !Reveal.remove ) {

				Reveal.remove = function ( index, id ) {
					var targetSelector, targetElement, target;

					this.dom = {};

					this.dom.wrapper = document.querySelector( ".reveal" );
					this.dom.slides = document.querySelector( ".reveal > .slides" );

					index = ( index !== undefined && index !== null ) ? index : -1;

					if ( id !== null && id !== undefined ) {
						targetSelector = ".slides > #" + id;
					}
					else {
						targetSelector = ".slides > section:nth-child(" + ( index + 1 ) + ")";
					}

					targetElement = this.dom.wrapper.querySelectorAll( targetSelector )[ 0 ];
					target = targetElement ? targetElement : false;

					if ( index === -1 ) {
						if ( Reveal.isLastSlide() ) {
							Reveal.prev();
						}
						this.dom.slides.removeChild( this.dom.wrapper.querySelectorAll( ".slides > section" )[ this.dom.wrapper.querySelectorAll( ".slides > section" ).length - 1 ] );
						if ( Reveal.isLastSlide() ) {
							document.querySelector( ".navigate-right" ).classList.remove( "enabled" );
						}
					}
					else {
						if ( index > Reveal.getIndices().h && target ) {
							this.dom.slides.removeChild( target );
							if ( Reveal.getIndices().h === this.dom.wrapper.querySelectorAll( ".slides > section" ).length - 1 ) {
								document.querySelector( ".navigate-right" ).classList.remove( "enabled" );
							}
						}
						else {
							if ( index < Reveal.getIndices().h && target ) {
								this.dom.slides.removeChild( target );
								Reveal.slide( Reveal.getIndices().h - 1 );
							}
							else {
								if ( index === Reveal.getIndices().h && target ) {
									if ( index === 0 ) {
										Reveal.next();
										document.querySelector( ".navigate-left" ).classList.remove( "enabled" );
									}
									else {
										Reveal.prev();
									}
									this.dom.slides.removeChild( target );
									if ( this.dom.wrapper.querySelectorAll( ".slides > section" ).length === index ) {
										document.querySelector( ".navigate-right" ).classList.remove( "enabled" );
									}
								}
							}
						}
					}

					this.sync();
				};

			}

		} );

	}

} )();