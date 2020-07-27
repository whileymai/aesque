/* ALL THE SCRIPTS IN THIS FILE ARE MADE BY KROWNTHEMES.COM --- REDISTRIBUTION IS NOT ALLOWED! */

$(window).bind("pageshow", function(event) {
if (event.originalEvent.persisted) {
    window.location.reload() 
  }
});

$.ajaxSetup({ cache: false });

// CONTINUE WITH EVERYTHING ELSE

window.blockStickyHeader = false;

(function($) {

	$('#site-filters select:not(.styled)').each(function(){

		$(this).styledSelect({
			coverClass: 'regular-select-cover',
			innerClass: 'regular-select-inner'
		}).addClass('styled');

		$(this).parent().append($.themeAssets.arrowDown);

		if ( $(this).data('label') != '' ) {

			if ( $(this).find('option:selected').hasClass('default') ) {
				$(this).parent().find('.regular-select-inner').html($(this).data('label'));
			}

			$(this).on('change', function(e){
				if ( $(this).find('option:selected').hasClass('default') ) {
					$(this).parent().find('.regular-select-inner').html($(this).data('label'));
				} 
			});

		}

	});

	$('.site-header').append('<span id="js-helpers"><span id="fix-me-header"></span><span id="fix-me-collection"></span></span>');

	// tab navigation

	$('a:not(.ach), button, span, input').on('focus', function(e){
   	$(this).addClass('hover');
	}).on('blur', function(e){
		$(this).removeClass('hover');
	});

	$(document).keyup(function(e) {
	  if (e.keyCode === 27) {
	  	$('.site-close-handle').trigger('click');
	  }
	});

	// We start with the newsletter code (it needs to be wrapped inside a $(window).load() event function in order to get the perfect timeout after the site has completely loaded

	window.CUBER = {

		// MAIN

		Nav: {

			$siteHeader: null,
			$siteNav: null,
			$siteOverlay: null,

			mount: function() {
				
				this.$siteHeader = $('#site-header');
				this.$siteNav = $('#site-nav--mobile');
				this.$siteOverlay = $('#site-overlay');

				$('#site-menu-handle').on('click focusin', (function(){

					if ( ! this.$siteNav.hasClass('active') ) {

						this.$siteNav.addClass('active');
						this.$siteNav.removeClass('show-filters').removeClass('show-cart').removeClass('show-search');

						this.$siteOverlay.addClass('active');

						$('.fixing-scroll-now .site-box-background').addClass('sidebar-move');
						$('body').addClass('sidebar-move');

					} 

				}).bind(this));

				if ( $('#site-filter-handle').length > 0 ) {

					$('#site-filter-handle').on('click', (function(){

						if ( ! this.$siteNav.hasClass('active') ) {

							this.$siteNav.addClass('active');
							this.$siteNav.removeClass('show-cart').removeClass('show-search').addClass('show-filters');

							this.$siteOverlay.addClass('active');

							$('.fixing-scroll-now .site-box-background').addClass('sidebar-move');
							$('body').addClass('sidebar-move');

						}

					}).bind(this));

				}

				if ( $('#site-cart-handle').length > 0 ) {

					if ( $.themeCartSettings == 'overlay' ) {

						$('#site-cart-handle a').addClass('block-fade');

						$('#site-cart-handle a').on('click', (function(e){

							e.preventDefault();

							if ( ! this.$siteNav.hasClass('active') ) {

								this.$siteNav.addClass('active');
								this.$siteNav.removeClass('show-filters').removeClass('show-search').addClass('show-cart');

								this.$siteOverlay.addClass('active');

								$('.fixing-scroll-now .site-box-background').addClass('sidebar-move');
								$('body').addClass('sidebar-move');

							}

						}).bind(this));

					}

					$('#site-cart-handle').on('mouseenter focusis', function(){
						$(this).addClass('hover-in').removeClass('hover-out');
					}).on('mouseleave focusout', function(){
						$(this).addClass('hover-out').removeClass('hover-in');
					});

				}

				if ( $('#site-search-handle').length > 0 ) {

					$('#site-search form.search-bar input[type="search"]').val('');

					$('#site-search-handle a').addClass('block-fade');

					$('#site-search-handle a').on('click', (function(e){

						e.preventDefault();

						if ( ! this.$siteNav.hasClass('active') ) {

							this.$siteNav.addClass('active');
							this.$siteNav.removeClass('show-filters').removeClass('show-cart').addClass('show-search');

							this.$siteOverlay.addClass('active');

							$('.fixing-scroll-now .site-box-background').addClass('sidebar-move');
							$('body').addClass('sidebar-move');

							$('#site-search form.search-bar input[type="search"]').focus();

						}

					}).bind(this));

					$('#site-search-handle').on('mouseenter', function(){
						$(this).addClass('hover-in').removeClass('hover-out');
					}).on('mouseleave focusout', function(){
						$(this).addClass('hover-out').removeClass('hover-in');
					});

					$('a[href="#search"]').on('click', function(e){
						e.preventDefault();
						$('#site-search-handle a').trigger('click');
					})

				}

				$('.site-close-handle, #site-overlay').on('click', (function(){

					if ( this.$siteNav.hasClass('active') ) {

						this.$siteNav.removeClass('active');
						this.$siteOverlay.removeClass('active');
						
						$('.fixing-scroll-now .site-box-background').removeClass('sidebar-move');
						$('body').removeClass('sidebar-move');

					}

				}).bind(this));

				///

				$('.site-nav.style--classic .has-submenu').each(function(){
					$(this).on('mouseenter focusin', function(){
						$(this).find('.submenu').stop().slideDown(200);	
						$('body').addClass('opened-submenu');
						$('body').addClass('opened-submenu-flag');
						$('.site-overlay').addClass('active');
						$(this).find('.submenu').attr('aria-expanded', 'true');
					}).on('mouseleave focusout', function(){
						$(this).find('.submenu').attr('aria-expanded', 'false');
						$(this).find('.submenu').stop().slideUp(200, function(){
							if ( ! $('body').hasClass('opened-submenu-flag') ) {
								$('body').removeClass('opened-submenu');
							}
						});
						$('.site-overlay').removeClass('active');
						$('body').removeClass('opened-submenu-flag');
					})
				})

				$('.site-nav.style--sidebar .has-submenu:not(.collections-menu)').each(function(){

					$(this).children('a').addClass('block-fade');
					$(this).children('a').on('click touchstart', function(e) {
						e.preventDefault();
					})

					$(this).children('a').on('click touchstart', function(e){

						e.preventDefault();
						var $parent = $(this).parent();

						if ( $parent.hasClass('active') ) {

							var tempBoNo = false;
							var tempBoHref = $(this).attr('href');

							if ( tempBoHref != '' ) {

								if ( tempBoHref.indexOf('#') >= 0 ) {

									tempBoNo = true;

									if ( tempBoHref.indexOf('#') == ( tempBoHref.length-1 ) ) {
										// nothing
									} else {
		  							$('.site-close-handle').trigger('click');
				    				document.location.href = tempBoHref;
									}

								} else if ( $(this).attr('target') == '_blank' ) {

									window.open(tempBoHref, '_blank');

								} else {

				    			$('body').fadeOut(200);
				    			setTimeout((function(){
				    				document.location.href = tempBoHref;
				    			}).bind(this), 200);
				    			e.preventDefault();

								}

							} else {
								tempBoNo = true;
							}

							if ( tempBoNo ) { 
								$parent.find('.submenu').stop().slideUp(200);
								$parent.removeClass('active');
								$parent.find('.submenu').attr('aria-expanded', 'false');
							}

						} else {
							$parent.addClass('active');
							$parent.find('.submenu').stop().slideDown(200);
							$parent.find('.submenu').attr('aria-expanded', 'true');
						}

						$(this).removeClass('hover');

					})

				})

				$('.site-nav.style--sidebar .has-babymenu:not(.collections-menu)').each(function(){

					$(this).children('a').addClass('block-fade');
					$(this).children('a').on('click touchstart', function(e) {
						e.preventDefault();
					})

					$(this).children('a').on('click touchstart', function(e){

						e.preventDefault();
						var $parent = $(this).parent();

						if ( $parent.hasClass('active') ) {

							var tempBoNo = false;
							var tempBoHref = $(this).attr('href');

							if ( tempBoHref != '' ) {

								if ( tempBoHref.indexOf('#') >= 0 ) {

									tempBoNo = true;

									if ( tempBoHref.indexOf('#') == ( tempBoHref.length-1 ) ) {
										// nothing
									} else {
		  							$('.site-close-handle').trigger('click');
				    				document.location.href = tempBoHref;
									}

								} else if ( $(this).attr('target') == '_blank' ) {

									window.open(tempBoHref, '_blank');

								} else {

				    			$('body').fadeOut(200);
				    			setTimeout((function(){
				    				document.location.href =tempBoHref
				    			}).bind(this), 200);
				    			e.preventDefault();

								}

							} else {
								TempBoNo = true;
							}

							if ( tempBoNo) { 
								$parent.removeClass('active');
								$parent.find('.babymenu').stop().slideUp(200);
								$parent.find('.babymenu').attr('aria-expanded', 'false');
							}

						} else {
							$parent.addClass('active');
							$parent.find('.babymenu').stop().slideDown(200);
							$parent.find('.babymenu').attr('aria-expanded', 'true');
						}

					})

				})

				$('.style--classic .babymenu').each(function(){

					var bestWidth = 0;
					$(this).parent().parent().css('display', 'block');

					$(this).find('a').each(function(){
						$(this).css('position', 'fixed');
						$(this).attr('data-width', $(this).outerWidth(true))
						if ( $(this).outerWidth() > bestWidth ) {
							bestWidth = $(this).outerWidth(true);
						}
						$(this).css({'position': 'static', 'width': '100%'});
					});

					bestWidth += 30;
					$(this).css('width', bestWidth);
					$(this).css('transform', 'translateX(-45%)');
					$(this).parent().parent().css('display', 'none');
					$(this).css('display', 'none');

				});

				$('.style--classic .has-babymenu').each(function(){
					$(this).on('mouseenter focusin', function(){
						$(this).find('.babymenu').stop().slideDown(200);
						$(this).find('.babymenu ul').attr('aria-expanded', 'true');
						$(this).css('zIndex', 9);
					}).on('mouseleave focusout', function(){
						$(this).find('.babymenu').stop().slideUp(200);
						$(this).find('.babymenu ul').attr('aria-expanded', 'false');
						$(this).css('zIndex', 1);
					});
				});

				///

				$('body').addClass('desktop--add-some-padding');

				$('.style--classic li.has-submenu[data-size]').each(function(){
					var menuSize = parseInt( $(this).data('size') )
					if ( menuSize > 15 ) {
						$(this).addClass('text-smallest');
					} else if ( menuSize > 10 ) {
						$(this).addClass('text-smaller');
					} else if ( menuSize > 5 ) {
						$(this).addClass('text-small');
					}
				});

				// end -- */

				if ( $('#site-header').hasClass('header-scroll') ) {

					if ( $('body').hasClass('template-index') ) {
						$('body').addClass('index-margin-fix');
					}

					window.lst = $(window).scrollTop();

					$('.site-nav.style--classic .submenu').css('top', $('.site-header').outerHeight())

					$(window).on('scroll.sticky-header', (function(){

						if ( ! window.blockStickyHeader ) {

			        var st = $(window).scrollTop();

			        if ( st < 0 || Math.abs(lst - st) <= 5 ) 
			          return;	

			       	if ( st == 0) {

								this.$siteHeader.removeClass('animate');
								this.$siteHeader.removeClass('fix');
								this.$siteHeader.removeClass('ready');
								//$('body').css('paddingTop', 0);

			       	} else if ( st <= lst && ! this.$siteHeader.hasClass('fix') ) {

								this.$siteHeader.addClass('fix');
								//$('body').css('paddingTop', this.$siteHeader.outerHeight());
								setTimeout((function(){
									this.$siteHeader.addClass('ready');
								}).bind(this), 5);
								setTimeout((function(){
									this.$siteHeader.addClass('animate');
								}).bind(this), 25);

							} else if ( st > lst && this.$siteHeader.hasClass('animate') ) {

								this.$siteHeader.removeClass('animate');
								setTimeout((function(){
									this.$siteHeader.removeClass('fix');
									this.$siteHeader.removeClass('ready');
									//$('body').css('paddingTop', 0);
								}).bind(this), 105);

							}

							window.lst = st;

						}

					}).bind(this));

				}

				// Ajax cart functions (in the sidebar)

				window.sidebarCartAjaxFunctions();

			},

			unmount: function() {

				$('#site-menu-handle').off('click');
				$('#site-cart-handle a').off('click');
				$('#site-filter-handle').off('click');

				this.$siteNav.removeClass('active');
				this.$siteOverlay.removeClass('active');

				$('.fixing-scroll-now .site-box-background').removeClass('sidebar-move');
				$('body').removeClass('sidebar-move');

				$(window).off('scroll.sticky-header');

			}

		},

		// COLLECTION

		Collection: {

			$collectionGrid: null,
			$collectionNext: null,
			$collectionNextLink: null,

			mount: function() {

				if ( $('.box__paginate').length > 0 ) {

					this.$collectionGrid = $('#section-collection');
					this.$collectionNext = $('.box__paginate');
					this.$collectionNextLink = $('.box__paginate a');

					this.$collectionNextLink.append('<div class="preloader"><span>.</span><span>.</span><span>.</span></div>')

					this.$collectionNextLink.on('click', (function(e){ 

						this.$collectionNextLink.addClass('loading');
						var nextPageURL = this.$collectionNextLink.attr('href');

						$.ajax({
							url: nextPageURL
						}).done((function(data){

							this.$collectionNextLink.removeClass('loading');
							this.$collectionNext.before($(data).find('.site-box.box__collection'));
							//window.CUBER.Images.mount();

							var i = 0;
							this.$collectionGrid.find('.box__collection:not(.active)').each(function(){
								setTimeout((function(){
									$(this).addClass('active');
								}).bind(this), 100*i++);
							});

							if ( $(data).find('.site-box.box__paginate').length > 0 ) {
								this.$collectionNextLink.attr('href', $(data).find('.site-box.box__paginate a').attr('href'));
							} else {
								this.$collectionNext.remove();
							}

						}).bind(this));

						e.preventDefault();

					}).bind(this));

				}

				$(window).on('resize.collection-grid', window.debounce((function(){
					this._resizeCollection();
				}).bind(this), 300)).trigger('resize.collection-grid');
				this._resizeCollection();
				setTimeout((function(){
					this._resizeCollection();
				}).bind(this), 1001);

				// empty grid fix

				var collectionSize =  parseInt($('.box__heading').data('size'));

				if ( collectionSize > 0 && collectionSize < 4 ) {
					for ( var i = 0; i < 4 - collectionSize; i++ ) {
						$('#section-collection').append('<div class="site-box box--small box--typo-small lap--hide box--no-padding box__collection active" />');
					}
				}

			},

			_resizeCollection: function() {

				if ( $('#fix-me-header').css('display') == 'block' && $('#fix-me-collection').css('display') == 'block' ) {

					var wh = $(window).height();
					var h = wh - $('.site-header').outerHeight();

					if ( h > 720 ) {

						$('.mount-products .site-box.box__collection_image').attr('style', 'height:' + h + 'px !important; min-height: 0 !important;');

					} else {

						h = 720;

						if ( $('.mount-products .site-box.box__collection_image').length > 0 ) {
							$('.mount-products .site-box.box__heading').attr('style', 'height:' + ( wh - $('.site-header').outerHeight() ) + 'px !important; min-height: 0 !important;');
							$('.mount-products .site-box.box__collection_image').attr('style', 'height:' + ( wh - $('.site-header').outerHeight() ) + 'px !important; min-height: 0 !important;');
						} 


					}

				} else {

					$('.mount-products .site-box.box__collection, .mount-products .site-box.box__heading').attr('style', '');

				}
				
			},

			unmount: function() {
				$(window).off('resize.collection-grid');
			}

		},

		// PRODUCT

		Product: {

			$productGallery: null,
			$productGalleryItem: null,
			$productGalleryIndex: null,

			$productCarousel: null,
			$productCarouselImgs: null,
			productFlkty: null,

			$productStuff: null,
			productStuffMove: false,

			mount: function($product) {	

				var productIsDisabled = false;

				if ( $product.find('.product--section').data('hide-variants') && $product.find('.product--section').data('product-available') ) {
					this._advancedOptionsSelector($product, JSON.parse($product.find('.product-json')[0].innerHTML));
				} else if ( $product.find('.product--section').data('hide-variants') && ! $product.find('.product--section').data('product-available') ) {
					productIsDisabled = true;
				} 				

				// Product gallery

				var _this = {};
				$product.data('po', _this);

				_this.$productGallery = $product.find('.box__product-gallery');
				_this.$productGalleryItem = $product.find('.box__product-gallery .gallery-item');

				_this.$productGallery.append('<div class="gallery-index out-with-you"><span class="current" data-total="' + _this.$productGalleryItem.length + '"></span></div>');
				_this.$productGalleryIndex = _this.$productGallery.find('.gallery-index .current');

				_this.$productCarousel = _this.$productGallery.children('.site-box-content');

				window.CUBER.Main._mountScrollMovers({
					'parent': _this.$productGallery,
					'items': $('.gallery-index')
				});

				if ( _this.$productGallery.hasClass('scroll') ) {

					// init scrollable gallery

					$(window).on('scroll.product-gallery', (function(_this) {

						if ( ! _this.$productCarousel.hasClass('flickity-enabled') ) {

							_this.$productGalleryIndex.css('width', Math.min(($(window).scrollTop() + $(window).height() ) * 100 / _this.$productCarousel.height(), 100) + '%');

							_this.$productGalleryItem.each(function(key, elm){

								if ( $(window).scrollTop() + $(window).height() > $(elm).offset().top + $(window).height() / 2 && ! $(elm).hasClass('current') ) {
									$(elm).addClass('current');
								} else if ( $(window).scrollTop() + $(window).height() < $(elm).offset().top + $(window).height() / 2 && $(elm).hasClass('current') ) {
									$(elm).removeClass('current');
								}

							});

						}

					}).bind(this, _this)).trigger('scroll.product-gallery');

				} else {

					$(window).on('resize.product-gallery', (function(_this) {
						_this.$productGalleryItem.each(function(){

							if ( $('body').hasClass('template-product') && $(this).attr('data-product-media-type') == 'image' && _this.$productGallery.attr('data-images-aspect') == 'fit' && parseFloat($(this).attr('data-ratio')) > 1 ) {
								$(this).find('img').css('marginTop', window.CUBER.Nav.$siteHeader.outerHeight(true) / -2 );
							}

							if ( $(this).attr('data-product-media-type') != 'image' ) {

								if ( $('body').hasClass('template-product') ) {
									$(this).css('height', 'calc(100% - ' + window.CUBER.Nav.$siteHeader.outerHeight(true) + 'px)');
								}

								$productMedia = $(this).children('.box--product-media');

								$productMedia.css({
									paddingTop: ( 100 / $productMedia.data('ratio') ) + '%',
									height: 0,
									width: '100%',
									margin: 0
								});

								if ( $productMedia.outerHeight() > $(this).height() ) {
									$productMedia.css({
										paddingTop: '0',
										height: $(this).height(),
										width: $(this).height() * $productMedia.data('ratio'),
										margin: 'auto'
									});
								}

							}
						});
					}).bind(this, _this)).trigger('resize.product-gallery');

					/* WIP
					if ( $('body').hasClass('template-product') ) {

						$(window).on('scroll.product-gallery', (function(_this) {

							if ( $(window).scrollTop() < window.CUBER.Nav.$siteHeader.outerHeight(true) ) {
								_this.$productGalleryItem.each(function(){
									if ( $(this).attr('data-product-media-type') != 'image' ) {
										// transform media
										$(this).find('.box--product-media').css('transform', 'translateY(' + Math.min( ( $(window).scrollTop() / 2 ), ( window.CUBER.Nav.$siteHeader.outerHeight(true) / 2 ) ) + 'px)');
									}
								});
							}

						}).bind(this, _this)).trigger('scroll.product-gallery');

					}*/

				}

				$(window).on('resize.flickity-helper', window.debounce((function(_this){
					if ( _this.$productCarousel.hasClass('flickity-enabled') ) {
						_this.$productCarousel.flickity('reposition');
						_this.$productCarousel.flickity('resize');
					}
				}).bind(this, _this), 500));

				// init sliding gallery (always, because it turns into this at responsive)

				if ( parseInt(_this.$productCarousel.data('size')) > 1 ) {

					_this.$productCarousel.on('ready.flickity', function(){
						if ( _this.$productCarousel.hasClass('flickity-enabled') ) {
							_this.$productGalleryItem.each(function(){
								if ( ! $(this).hasClass('is-selected') ) {
									$(this).addClass('tab-hidden');
								}
							});
						}
						setTimeout(function(){
							_this.$productCarousel.find('.flickity-viewport').addClass('has-height-animation');
						}, 300);
					});
					
					_this.$productCarousel.flickity({
						cellSelector: '.gallery-item:not(.remove-from-flick)',
						initialIndex: window.CuberProductImageIndex != undefined ? window.CuberProductImageIndex : 0,
						wrapAround: true,
						prevNextButtons: false,
						pageDots: true,
						adaptiveHeight: true,
						watchCSS: _this.$productGallery.hasClass('scroll') ? true : false,
						resize: true
					});

					window.CUBER.Scroll.mount();

					_this.productFlkty = _this.$productCarousel.data('flickity');
					_this.$productCarouselImgs = _this.$productCarousel.find('.gallery-item img');

					_this.$productCarousel.on('select.flickity', (function(){
						_this.$productGalleryIndex.css('width', (( _this.productFlkty.selectedIndex + 1 ) * 100 / parseInt(_this.$productGalleryIndex.data('total'))) + '%');
					}).bind(_this));

					_this.$productCarousel.append('<span class="flickity-custom-nav prev" tabindex="0"><span style="transform:rotate(180deg);display:inline-block;position:relative;top:-1px">' + $.themeAssets.arrowRight + '</span></span><span class="flickity-custom-nav next" tabindex="0"><span style="display:inline-block">' + $.themeAssets.arrowRight + '</span></span>');

					_this.$productCarousel.find('.flickity-custom-nav.prev').on('click', (function(e){
						$(e.target).removeClass('hover');
						_this.productFlkty.previous();
					}).bind(_this)).on('keypress', function(e){
						if ( e.which == 13 ) {
							$(e.target).trigger('click');
							_this.$productCarousel.find('.gallery-item.is-selected').focus();
						}
					});

					_this.$productCarousel.find('.flickity-custom-nav.next').on('click', (function(e){
						$(e.target).removeClass('hover');
						_this.productFlkty.next();
					}).bind(_this)).on('keypress', function(e){
						if ( e.which == 13 ) {
							$(e.target).trigger('click');
							_this.$productCarousel.find('.gallery-item.is-selected').focus();
						}
					});

					_this.$productCarousel.find('.flickity-custom-nav').on('focus', function(e){
				   	$(this).addClass('hover');
					}).on('blur', function(e){
						$(this).removeClass('hover');
					});

					_this.$productCarousel.on('settle.flickity', function(){
						_this.$productGalleryItem.addClass('tab-hidden');
					});
					_this.$productCarousel.on('scroll.flickity', function(){
						_this.$productGalleryItem.removeClass('tab-hidden');
					});

					_this.$productGalleryItem.on('focus, focusin', function(){
						_this.$productCarousel.find('.flickity-viewport').scrollLeft(0);
					});

				} else {
					window.CUBER.Scroll.mount();
				}

				// Product zoom

				if ( $('.product-zoom-in').length > 0 ) {

					$('body').append('<div id="product-zoomed-image"><img /><div id="product-zoom-out" class="product-zoom expand"><span class="zoom-out">' + $.themeAssets.iconZoom + '</span></div></div>');

					$('.product-zoom-in').each((function(i, item){

						$(item).on('click', (function(e){

							// animation out

							$('#section-product').find('.site-box.box__product-content').addClass('animate');
							setTimeout(function(){
								$('#section-product').find('.site-box.box__product-content').addClass('expand');
								$('body').addClass('kill-overflow');
							}, 10);

							$('#section-product').find('.site-box.box__product-gallery').stop().animate({'opacity': 0}, 200);
							$('#shopify-section-header, #shopify-section-footer').stop().animate({'opacity': 0}, 200);

							// object 

							var $image = $('#product-zoomed-image img');
							$image.attr('src', $(e.currentTarget).attr('data-master'));

							setTimeout((function(){
								if ( $image[0].naturalWidth > 0 ) {
										this._productZoomMount($image);
								} else {
									$image.on('load', (function(){
										this._productZoomMount($image);
									}).bind(this))
								}
							}).bind(this), 200);

						}).bind(this));

					}).bind(this));

					$('#product-zoom-out').on('click', (function(e){

						setTimeout(function(){

							// animation out

							$('#section-product').find('.site-box.box__product-content').removeClass('expand');
							$('body').removeClass('kill-overflow')
							setTimeout(function(){
								$('#section-product').find('.site-box.box__product-content').removeClass('animate');
							}, 400);

							$('#section-product').find('.site-box.box__product-gallery').stop().animate({'opacity': 1}, 200);
							$('#shopify-section-header, #shopify-section-footer').stop().animate({'opacity': 1}, 200);

						}, 150);

						// object

						this._productZoomUnmount();

					}).bind(this));

				}

				// Add to cart (& ajax)

				if ( ! $product.find('.product--section').hasClass('onboarding-true') ) {
					this.initProductForm($product, productIsDisabled);
				}

				if ( $product.find('.qty-button').length > 0 ) {

					var $productQty = $product.find('.quantity-selector');

					if ( parseInt($productQty.val()) - 1 < parseInt($productQty.attr('min')) ) {
						$product.find('.qty-minus').addClass('disabled');
					}
					if ( parseInt($productQty.val()) + 1 > parseInt($productQty.attr('max')) ) {
						$product.find('.qty-plus').addClass('disabled');
					}

					$product.find('.qty-minus').on('click', (function($productQty, $productQtyPlus, e){
						if ( ! $(e.target).hasClass('disabled') ) {
							var currentQty = parseInt($productQty.val());
							if ( currentQty - 1 >= parseInt( $productQty.attr('min') ) ) {
								$productQty.val(currentQty - 1);
								$productQtyPlus.removeClass('disabled');
							} 
							if ( currentQty - 1 <= parseInt( $productQty.attr('min') ) ) {
								$(e.target).addClass('disabled');
							}
						}
						e.preventDefault();
					}).bind(this, $productQty, $product.find('.qty-plus')));

					$product.find('.qty-plus').on('click', (function($productQty, $productQtyMinus, e){
						if ( ! $(e.target).hasClass('disabled') ) {
							var currentQty = parseInt($productQty.val());
							if ( currentQty + 1 <= parseInt( $productQty.attr('max') ) ) {
								$productQty.val(currentQty + 1);
								$productQtyMinus.removeClass('disabled');
							}
							if ( currentQty + 1 >= parseInt( $productQty.attr('max') ) ) {
								$(e.target).addClass('disabled');
							}
						}
						e.preventDefault();
					}).bind(this, $productQty, $product.find('.qty-minus')));

				}
				
				this.ajaxProductForm($product);

			},

			ajaxProductForm: function( $product ) {

				if ( $product.find('.product--add-to-cart-form').length > 0 && $product.find('.product--add-to-cart-form').data('type') == 'overlay' ) {

					var $form = $product.find('.product--add-to-cart-form form'),
					  	$submitText = $form.find('.add-to-cart-text'),
					  	$submitButton = $form.find('button[type="submit"]'),
					  	$cartCount = $('.cart-menu .count'),
					  	$cartQty = $product.find('.quantity-selector');
					  	
			  		if ( $form.attr('action').indexOf('.js') < 0 ) {
			  			$form.attr('action', $form.attr('action') + '.js');
			  		}

			  	$form.submit(function(e){

			  		e.preventDefault();

			  		var oldText = $submitText.html();
			  		$submitText.html('<span class="preloader"><span>.</span><span>.</span><span>.</span></span>');
			  		$submitButton.css('pointer-events', 'none');

			  		var itemName = $product.find('.product-title').text(),
			  				itemPrice = $product.find('.product-price').attr('data-price'), 
			  				itemCurrency = Shopify.currency.active,
			  				itemId = $product.find('.product--section').data('id');

			  		$.ajax({

			  			type: $form.prop('method'),
			  			url: $form.prop('action'),
			  			data: $form.serialize(),
			  			dataType: 'json',
			  			success: function(data){
			  				
			  				setTimeout(function(){
			  					$submitText.html(oldText);
			  					$submitButton.css('pointer-events', 'all');
			  				}, 500);

			  				$.ajax({
			  					url: window.cart_url,
			  					success: function(data) {

			  						if ( typeof fbq !== 'undefined' ) {
  										fbq('track', 'AddToCart', {
									      content_name: itemName, 
									      content_ids: [itemId],
									      content_type: 'product_group',
									      value: parseFloat(itemPrice),
									      currency: itemCurrency
  										});
			  						}

										// google pixel

										if ( typeof ga !== 'undefined' ) {
											ga('ec:addProduct', {
											  'id': itemId,
											  'name': itemName,
											  'price': parseFloat(itemPrice),
											  'quantity': $cartQty.length > 0 ? parseInt($cartQty.val()) : 1
											});
											ga('ec:setAction', 'add');
											ga('send', 'event', 'UX', 'click', 'add to cart');     
										}

										// totals update

			  						$('#site-cart .cart-items').html($(data).find('#site-cart .cart-items .cart-item'));
			  						$('#CartTotal').html($(data).find('#CartTotal').html());
			  						$('#CartDetails').html($(data).find('#CartDetails').html());

			  						$('#site-cart .cart-holder').attr('data-items', $(data).find('#site-cart .cart-holder').data('items'));

			  						window.sidebarCartAjaxFunctions();

					  				setTimeout(function(){
					  					$submitText.html(oldText);
					  					$submitButton.css('pointer-events', 'all');
					  				}, 500);

					  				if ( $cartQty.length > 0 ) {

				  						var qty = parseInt($cartQty.val());
				  						if ( qty == 1 ) {
												$('#site-cart .subtitle').html($('#site-cart .subtitle').data('added-singular').replace(/{{ count }}|count|{{count}}/g, qty));
				  						} else {
												$('#site-cart .subtitle').html($('#site-cart .subtitle').data('added-plural').replace(/{{ count }}|count|{{count}}/g, qty));
				  						}

					  					$cartCount.text(parseInt($cartCount.text()) + parseInt($cartQty.val()));

					  				} else {

					  					$cartCount.text(parseInt($cartCount.text()) + 1);
											$('#site-cart .subtitle').html($('#site-cart .subtitle').data('added-singular').replace(/{{ count }}|count|{{count}}/, 1));

					  				}	

					  				$('.site-cart-handle a').trigger('click');

			  					}
			  				});

			  			},

			  			error: function(data) {

			  				alert(data.responseJSON.description);

			  				setTimeout(function(){
			  					$submitText.html(oldText);
			  					$submitButton.css('pointer-events', 'all');
			  				}, 100);

			  			}
			  		});

			  	});

				}

			},

			_productZoomMount: function( $image ) {

				$('#product-zoomed-image').css('display', 'block');
				$image.css({'left': 0, 'top': 0});

				$(window).on('mousemove.product-zoom', function(e) {
					e.preventDefault();
					window.clientX = e.clientX;
					window.clientY = e.clientY;
					var x = e.clientX * ( $(window).width() - $image.width() ) / $(window).width();
					var y = e.clientY * ( $(window).height() - $image.height() ) / $(window).height();
					$image.css({'left': x, 'top': y});
				});

				$image.data('ratio', $image[0].naturalWidth / $image[0].naturalHeight);

				$(window).on('resize.product-zoom', function(){	

					var rf = $(window).width() > 768 ? 1 : 2;

					if ( $image.hasClass('portrait') ) {
						$image.css('width', $(window).width()*rf);
						$image.css('height', $(window).width()*rf / $image.data('ratio'));
					} else {

						$image.css('height', $(window).height()*rf);
						$image.css('width', $(window).height()*rf * $image.data('ratio'));

						if ( $image.width() < $(window).width() ) {
							$image.css('width', $(window).width()*rf);
							$image.css('height', $(window).width()*rf / $image.data('ratio'));
						}

					}

					var x = window.clientX * ( $(window).width() - $image.width() ) / $(window).width();
					var y = window.clientY * ( $(window).height() - $image.height() ) / $(window).height();

				}).trigger('resize');

				$image.css('opacity', 1);
				
				if ( $('html').hasClass('touchevents') ) {
					$('#product-zoomed-image').scrollTop( ( $(window).height() - $image.height() ) / -2 );
					$('#product-zoomed-image').scrollLeft( ( $(window).width() - $image.width() ) / -2 );
				}

			}, 

			_productZoomUnmount: function() {

				$('#product-zoomed-image img').css('opacity', '0');

				setTimeout(function(){
					$(window).off('resize.product-zoom');
					$(window).off('mousemove.product-zoom');
					$('#product-zoomed-image img').attr('src', '');
					$('#product-zoomed-image').css('display', 'none');
				}, 300);

			},

			initProductForm : function( $product, pdisabled ) {

				var firstVariantEver = true;

				var productSingleObject = JSON.parse($product.find('.product-json')[0].innerHTML),
						productVariants = productSingleObject.variants;

				$product.find('form select.product-variants').on('change', (function(e){
					this._initProductVariantChange(false, productSingleObject, $product);
				}).bind(this));

				this._initProductVariantChange(true, productSingleObject, $product);

				if ( $product.find('.product--add-to-cart-form').hasClass('style--classic') ) { 
				
					$product.find('select.product-variants:not(.styled)').each(function(){
						$(this).addClass('styled');
						$(this).styledSelect({
						  coverClass: 'regular-select-cover',
						  innerClass: 'regular-select-inner'
						}).addClass('styled');

					 	$(this).parent().append($.themeAssets.arrowDown);

				 	 	/*$(this).on('focusin', function(){
				 	 		$(this).parent().addClass('focus');
				 	 	}).on('focusout', function(){
				 	 		$(this).parent().removeClass('focus');
				 	 	});*/

					});

					$product.find('.product-variant').removeClass('hidden');

					if ( pdisabled ) {
						$product.find('.product-variant').css('display', 'none');
					} 

				} else {

					var i = 1;

					$product.find('.product-variant').each(function(j){

						var color = window.returnColorVariant($(this).find('label').text()) ? true : false,
								varDOM = '<ul class="color-' + color + '" data-option="option' + (j+1) + '">';

						$(this).find('.product-variants option').each(function(){
							var variant_handle = $(this).val().toLowerCase().replace(/ /g,'_');
varDOM += '<li' + ( $(this).is(':selected') ? ' class="active"' : '' ) + ' tabindex="0" data-text="' + $(this).val() + '"><span' + ( color ? ' style="background-image:url( ' + window.shopifyThemeAssetsFolder.replace('blank', variant_handle) + ')"' : '' ) + '>' + $(this).val() + '</span></li>';
						});

						varDOM += '</ul>';
						$(this).find('select').hide();
						$(this).append(varDOM);

						$(this).removeClass('hidden');

						$(this).find('ul li').on('click', function(){
							$(this).parent().parent().find('select').val(decodeURIComponent($(this).data('text'))).change();
						});

						$(this).find('ul li').on('keyup', function(e){
							if ( e.keyCode == 13 ) {
								$(this).parent().parent().find('select').val(decodeURIComponent($(this).data('text'))).change();
							}
						});

					});

					if ( pdisabled ) {
				 		$product.find('.product-variant').find('li').addClass('disabled');
					} 

				}

			},

			_getProductVariant : function( $product ) {

				/* ---- 
					Get current variant
					---- */

				var optionArray = [];

				$product.find('form select.product-variants').each(function(){
					optionArray.push($(this).find(':selected').val());
				});

				return optionArray;

			},

			_initProductVariantChange : function(firstTime, productSingleObject, $product) {	

				var variant = null,
					options = this._getProductVariant( $product );

				productSingleObject.variants.forEach(function(el){
					if ( $(el)[0].options.equals(options) ) {
						variant = $(el)[0];
					}
				});
				
				this._productSelectCallback(variant, $product, productSingleObject);
				if ( ! firstTime && $product.find('#productSelect option').length > 1 && ! $('body').hasClass('template-index') ) {
					this._updateProductVariantState(variant);
				}

			},

			_updateProductVariantState : function(variant) {

			   if (!history.pushState || !variant) {
			    return;
			  }

			  var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
			  window.history.replaceState({path: newurl}, '', newurl);

			},

			_productSelectCallback : function(variant, $product, productSingleObject) {

				var _po = $product.data('po');

				var $addToCart = $product.find('.product--add-to-cart-form'),
						$addToCartButton = $addToCart.find('button[type="submit"]'),
			      $productPrice = $product.find('.product-price'),
			      $comparePrice = $product.find('.compare-price'),
			      $compareBadge = $product.find('.product-badge.sale'),
			      $quantityElements = $product.find('.quantity-selector, label + .js-qty'),
			      $quantityElementsHolder = $product.find('.quantity-selector-holder'),
			      $addToCartText = $product.find('.add-to-cart-text'),
			      $productGallery = $product.find('.box__product-gallery');

				if (variant) {

					// Set cart value id

					$product.find('#productSelect').find('option[value="' + variant.id + '"]').prop('selected', true);

					// Swipe to variant slide

					if ( variant.featured_media != null ) {

						var variantImg = $productGallery.find('.gallery-item[data-media-id="' + variant.featured_media.id + '"]');

						if ( $productGallery.hasClass('scroll') && variantImg.length > 0 && $(window).width() > 1024 ) {
									
								if ( $(window).scrollTop() > 0 ) {
									$('html, body').stop().animate({'scrollTop': $productGallery.offset().top}, 150, function(){
										$(window).off('scroll.to-junk');
									})
								}

							variantImg.prependTo($product.find('.box__product-gallery .site-box-content'))

						} else if ( _po != undefined && variantImg.length > 0 ) {
							if ( _po.productFlkty != undefined && variantImg.data('index') != _po.productFlkty.selectedElement ) {
								_po.productFlkty.select(variantImg.data('index'));
							} else {
								window.CuberProductImageIndex = variantImg.data('index');
							}
						}

					}

					// Disable other variants

					if ( $addToCart.hasClass('style--minimal') ) {
						$product.find('.product-variant ul').each(function(){
							var option = variant[$(this).data('option')];
							$(this).find('li').each(function(){
								$(this).removeClass('active');
								if ( encodeURIComponent(option) == $(this).data('text') ) {
									$(this).addClass('active');
								}
							});
						})
					}

					// Edit cart buttons based on stock 
						
					var $variantQuantity = $product.find('.variant-quantity');
					$variantQuantity.text('');

					var DOMVariant = $product.find('#productSelect').find('option[value="' + variant.id + '"]');
					if ( DOMVariant.attr('data-quantity') == '0' ) {
						if ( DOMVariant.attr('data-inventory') == 'continue' ) {
							$variantQuantity.html(window.product_words_preorder);
						} else if ( DOMVariant.attr('data-inventory') == 'deny' ) {
							$variantQuantity.html(window.product_words_no_products);
						}
					} else if ( DOMVariant.attr('data-quantity') == '1' ) {
						$variantQuantity.html(window.product_words_one_product);
					} else if ( parseInt( DOMVariant.attr('data-quantity') ) <= 5 ) {
						$variantQuantity.html(window.product_words_few_products.replace('{{ count }}', DOMVariant.attr('data-quantity')));
					} else if ( ! variant.available ) {
						$variantQuantity.html(window.product_words_no_products);
					}

					if ( variant.available ) {

						$quantityElements.prop('max', 999);
						$addToCartButton.removeClass('disabled').prop('disabled', false);
						$addToCartText.text($('body').hasClass('template-product-pre-order') ? $addToCartText.data('text') : window.product_words_add_to_cart_button);
						$quantityElements.show();
						if ( $quantityElementsHolder != null ) {
							$quantityElementsHolder.show();
						}

					} else {
						
						$addToCartButton.addClass('disabled').prop('disabled', true);
						$addToCartText.text(window.product_words_sold_out_variant);
						$quantityElements.hide();
						if ( $quantityElementsHolder != null ) {
							$quantityElementsHolder.hide();
						}

					}

					// Update price

					$productPrice.html( theme.Currency.formatMoney(variant.price, window.shop_money_format) );
					$productPrice.attr( 'data-price', variant.price / 100 );

					if ( variant.compare_at_price > variant.price ) {
						$comparePrice.html(theme.Currency.formatMoney(variant.compare_at_price, window.shop_money_format)).show();
						$compareBadge.show();
					} else {
						$comparePrice.hide();
						$compareBadge.hide();
					}

					if ( $product.find('.unit-price').length > 0 ) {
						if ( variant.unit_price_measurement ) {
							$product.find('.unit-price').html(theme.Currency.formatMoney(variant.unit_price, window.shop_money_format) + " / " + ( variant.unit_price_measurement.reference_value != 1 ? variant.unit_price_measurement.reference_value + " " : "" ) + variant.unit_price_measurement.reference_unit);
						} else {
							$product.find('.unit-price').empty();
						}
					}

					// Update sku

					if ( $product.find('.variant-sku').length > 0 ) {
						if ( variant ) {
							$product.find('.variant-sku').text(variant.sku);
						} else {
							$product.find('.variant-sku').empty();
						}
					}

				} else {

					// Disable variant completely 

					$addToCartButton.addClass('disabled').prop('disabled', true);
					$addToCartText.text(window.product_words_unavailable_variant);
					$quantityElements.hide();
					if ( $quantityElementsHolder != null ) {
						$quantityElementsHolder.hide();
					}

				}

				if ( $product.find('.qty-button').length > 0 ) {

					var $productQty = $product.find('.quantity-selector');
					$product.find('.qty-minus').removeClass('disabled');
					$product.find('.qty-plus').removeClass('disabled');

					if ( parseInt($productQty.val()) - 1 < parseInt($productQty.attr('min')) ) {
						$product.find('.qty-minus').addClass('disabled');
					}
					if ( parseInt($productQty.val()) + 1 > parseInt($productQty.attr('max')) ) {
						$product.find('.qty-plus').addClass('disabled');
					}

				}

			},

			_advancedOptionsSelector: function($product, productJson) {
			  var om = {};
			  $product.data('om', om);
			  var forceMutation = false;
			  var $addToCartForm = $product.find('.product--add-to-cart-form');
			  if (window.MutationObserver && $addToCartForm.length) {
			    if (typeof observer === 'object' && typeof observer.disconnect === 'function') {
			      observer.disconnect();
			    }
			    var config = { childList: true, subtree: true };
			    var observer = new MutationObserver(function() {    
			      Shopify.linkOptionSelectors(productJson, $product);
			      observer.disconnect();
			    });  
			    if ( forceMutation ) {
			      Shopify.linkOptionSelectors(productJson, $product);
			    }
			    observer.observe($addToCartForm[0], config);
			  }
			},

			unmount: function($product) {
				var po = $product.data('po');
				$(window).off('scroll.product-gallery');
				$(window).off('resize.product-gallery');
				$(window).off('resize.flickity-helper');
				po.$productCarousel.off('scroll.flickity');
				po.$productCarousel.off('select.flickity');
				po.productFlkty.destroy();
				$('#product-zoom').off('click');
			}

		},

		Main: {

			$searchForm: null,
			$searchResults: null,
			$searchPreloader: null,
			$searchPagination: null,

			$body: null,
			$siteHeader: null,
			$siteFooter: null,

			$siteBoxes: null,

			_mountScrollMovers: function(props) {

				var $parent = props['parent'],
						parentOutOfFocus = false;

				setTimeout(function(){
					props['items'].removeClass('out-with-you');
				}, 1000);
				props['items'].addClass('animate-owy');

				$(window).on('scroll.scroll-movers', (function(){

					if ( ! parentOutOfFocus && $(window).scrollTop() + $(window).height() > $parent.offset().top + $parent.height() ) {

						// after element
						props['items'].addClass('out-with-you');
						parentOutOfFocus = true;

					} else if ( parentOutOfFocus && $(window).scrollTop() + $(window).height() <= $parent.offset().top + $parent.height() ) {

						// within element
						parentOutOfFocus = false;
						props['items'].removeClass('out-with-you');

					}

				}).bind(this));

			},

			_resizeEverything: function() {

				this.$body.css('paddingTop', this.$siteHeader.outerHeight(true));

				if ( this.$body.hasClass('template-index') ) {

					if ( $('#fix-me-header').css('display') == 'block' ) {

						if ( $('.mount-slideshow').children('div').length > 0 ) {

							$('.shopify-section.mount-slideshow:first-child').css('marginTop', -this.$siteHeader.outerHeight());
							$('.fix-me-with-margin').css('marginTop', this.$siteHeader.outerHeight());

						} else {

							$('.index-section:first-child .fix-me-with-margin').css('marginTop', -this.$siteHeader.outerHeight());
							$('.index-section:first-child .fix-me-with-height').css('height', $(window).height() - this.$siteHeader.outerHeight());

						}

					} else {

						if ( $('.mount-slideshow').children('div').length > 0 ) {

							$('.shopify-section.mount-slideshow:first-child').css('marginTop', '0');
							$('.slideshow-item:first-child .site-box-content').css('marginTop', '0');

						}

					}

				} else {

					if ( $('#fix-me-header').css('display') == 'block' ) {

						$('.fix-me-with-margin').each((function(key, elm){
							if ( $(elm).outerHeight() < $(window).height() ) {
								$(elm).css('marginTop', -this.$siteHeader.outerHeight())
							} else {
								$(elm).css('marginTop', '0')
							}
						}).bind(this));

						$('.fix-me-with-height-hard').css({
							'height': $(window).height() - this.$siteHeader.outerHeight(),
							'min-height': $(window).height() - this.$siteHeader.outerHeight()
						});
						$('.fix-me-with-height').css({
							'min-height': $(window).height() - this.$siteHeader.outerHeight()
						});

					} else {

						$('.fix-me-with-margin').css('marginTop', '0');
						$('.fix-me-with-height, .fix-me-with-height-hard').attr('style', '');

					}

				}

				if ( $('.mount-product').length > 0 ) {

					$('.mount-product').each((function(key, elm){

						$(elm).find('.product--section').removeClass('sticky-because');
						if ( $(elm).find('.site-box.box__product-gallery').css('content') != '"fix-me-also"' && $(elm).find('.site-box.box__product-gallery').height() < $(elm).find('.site-box.box__product-content').height() ) {
							$(elm).find('.product--section').addClass('sticky-because');
						}	

					}).bind(this));

				}

				$('.site-header.desktop-view--classic .submenu').css('top', $('.site-header').outerHeight());

				if ( $('#site-menu-handle').css('opacity') == '1' ) {
					$('.site-nav.style--sidebar a, #site-menu-handle').attr('tabIndex', 0);
				} else {
					$('.site-nav.style--sidebar a, #site-menu-handle').attr('tabIndex', -1);
				}

				$('.site-nav.style--sidebar').css('height', Math.max(document.documentElement.clientHeight, window.innerHeight));

			},

			_animateEverything: function(selector) {

				var i = 0,
						$animateObjects = null;

				if ( selector != '' ) {
					$animateObjects = $(selector);
				} else {
					$animateObjects = this.$siteBoxes;
				}
				$animateObjects.each(function(){

					var vp = 0;
					if ( ! $(this).hasClass('active') && $(window).scrollTop() + $(window).height() > $(this).offset().top + vp ) {

						i++;

						setTimeout((function(){
							$(this).addClass('active');
						}).bind(this), ( 100 * i ) );

					}

				});

				if ( this.$siteFooter != null && ! this.$siteFooter.hasClass('active') && $(window).scrollTop() + $(window).height() > this.$siteFooter.offset().top + 150 ) {

					this.$siteFooter.addClass('active');
					this.$siteFooter.find('.site-box').addClass('active');

				}	

			},

			_mountCustomFooter: function( $footer ) {

				var txtColor = $footer.data('color_txt'),
						bgColor = $footer.data('color_bg'),
						blockId = '#' + $footer.attr('id');

				var style = '<style type="text/css">' + blockId + ' .site-box-background.with-image:after { background-color: ' + bgColor + '; } ' + blockId + ' .site-box-content { color: ' + txtColor + '; } ' + blockId + ' .site-box-content .title:after { background: ' + txtColor + '; } ' + blockId + ' .site-box-content .button { background: ' + txtColor + ' !important; color: ' + window.colorLightness(txtColor) + ' !important; } ' + blockId + ' .site-box-content .button svg * { fill: ' + window.colorLightness(txtColor) + ' !important; }</style>';

				$footer.append(style);

			},

			mountTabs: function($tabs){

				if ( $tabs.data('design') == 'toggles' ) {

	        var $titles = $tabs.children('.titles').children('h5'),
	            $contents = $tabs.find('.contents').children('div'),
	            i = 0;

	        $titles.each(function(){
	        
	          $contents.eq(i++).insertAfter($(this));

	          $(this).on('click', function(){

	            var $toggle = $(this).next('.tab');

	            if ( ! $(this).hasClass('opened') ) {
	              $(this).addClass('opened');
	              $toggle.stop().slideDown(200);
	            } else {
	              $(this).removeClass('opened');
	              $toggle.stop().slideUp(200);
	            }

	          });

	        });

	        $tabs.find('.contents').remove();

		    } else {

	        var $titles = $tabs.children('.titles').children('h5'),
	        $contents = $tabs.children('.contents').children('div'),
	        $openedT = $titles.eq(0),
	        $openedC = $contents.eq(0);

	        $openedT.addClass('opened');
	        $openedC.stop().slideDown(0);

	        $titles.find('a').prop('href', '#').off('click');;

	        $titles.click(function(e){

	          $openedT.removeClass('opened');
	          $openedT = $(this);
	          $openedT.addClass('opened');

	          $openedC.stop().slideUp(200);
	          $openedC = $contents.eq($(this).index());
	          $openedC.stop().delay(200).slideDown(200);

	          e.preventDefault();

	        });

		    }

			},

			mount: function() {

				// Required before animation mount

    		$('.rte').fitVids();

				if ( $('.mount-gallery').length > 0 ) {
					this._mountCustomGalleries();
				}

				if ( $('.box__collection-footer').length > 0 ) {
					$('.box__collection-footer').each((function(key, elm){
						this._mountCustomFooter($(elm));
					}).bind(this));
				}

				// ..continue

    		this.$siteBoxes = $('.site-box:not(.footer-box)');
    		this.$siteFooter = $('.site-footer');

				this._animateEverything('');
    		$(window).on('scroll.fade-animation', (function(e){
 					this._animateEverything('');
    		}).bind(this));

	    	if ( window.show_preloader == "true" ) {
		    	$('.lazyload').each(function(){
		    		if ( $(this).parent().hasClass('site-box-background') || $(this).parent().hasClass('box--product-image') ) {
		    			$(this).parent().addClass('show-lazy-preloader');
		    			$(this).on('lazyloaded', function(){
		    				$(this).parent().removeClass('show-lazy-preloader');
		    			});
		    		}
		    	});
		    }

    		$('html.no-touchevents a[href]').each(function(){
    			window.animateSiteOff($(this));
	    	});

				//

				this.$body = $('body');
				this.$siteHeader = $('#site-header');

				$(window).on('resize', window.debounce((function(){
					this._resizeEverything();
				}).bind(this), 300));
				this._resizeEverything();

				setTimeout((function(){
					this._resizeEverything();
				}).bind(this), 1000);

				if ( $('.logo-img').length > 0 && ! $('.logo-img img')[0].naturalWidth > 0 ) {
					$('.logo-img img').on('load', function(){
						window.CUBER.Main._resizeEverything();
					})
				}
				
				this.$searchForm = $('.search-bar:not(.no-ajax)');
				this.$searchResults = $('#search-results');
				this.$searchPreloader = $('#site-search .preloader');
				this.$searchInput = this.$searchForm.find('input[type="search"]');
				this.$searchMore = $('#site-search-footer');
				this.searchBlank = true;

				var searchInputValue = this.$searchInput.val();
				this.$searchForm.find('input[type="search"]').on('keyup', (function(e){
					if ( searchInputValue != this.$searchInput.val() ) {
						searchInputValue = this.$searchInput.val();
						this._ajaxSearchForm();
					}
				}).bind(this));

				this.$searchForm.submit((function(e){
					e.preventDefault();
					this._ajaxSearchForm();
				}).bind(this));

				if ( $('.krown-tabs').length > 0 ) {
					$('.krown-tabs').each(function(){
						window.CUBER.Main.mountTabs($(this));
					})
				}

		    if ( $('.site-footer .info').length > 0 ) {
		    	if ( $('.site-footer .info').html().split('').length > 18 ) {
		    		$('.site-footer .info').addClass('smaller');
		    	}
		    }

				if ( document.location.href.indexOf('customer_posted=true') > 0 ) {
					setTimeout(function(){
						$('html, body').animate({'scrollTop': $('#contact_form').offset().top}, 1);
					}, 2000);
				}

			},

			_mountCustomGalleries: function() {
				
				if ( $('#product-gallery-split').length > 0 || $('#collection-gallery-split').length > 0 ) {

					window.imagesLoadedLIGHT($('.rte.extract-images'), function(){

						var gallery = [];

				    $('.rte.extract-images img:not(.dont-extract)').each(function(){
				      gallery.push({
				        'src': $(this).attr('src'),
				        'alt': $(this).attr('alt'),
				        'style': $(this)[0].naturalWidth > $(this)[0].naturalHeight ? 'landscape' : 'portrait',
				        'sized': false
				      });
				     $(this).remove();
				    });
				    $('.rte.extract-images p:empty').remove();

				    var galleryDOM = '';

				    gallery.forEach(function(item, key) {

				      var size = 'box--bigger';

				      if ( item['style'] == 'landscape' ) {
				        size = 'box--bigger lap--box--landscape';
				      } else if ( item['style'] == 'portrait' ) {
				        if ( item['sized'] ) {
				          size = 'box--big lap--box--portrait-small';
				        } else {
				          if ( key + 1 < gallery.length ) {
				            if ( gallery[key+1]['style'] == 'portrait' ) {
				              size = 'box--big lap--box--portrait-small';
				              gallery[key+1]['sized'] = true;
				            } else {
				              size = 'box--bigger lap--box--portrait-large';
				            }
				          } else {
				            size = 'box--bigger lap--box--portrait-large';
				          }
				        }
				      }

				      var placeholder = item['src'].replace('10x', 'placeholder');

				      if ( placeholder.indexOf('placeholder') < 0 ) {
				        placeholder = placeholder.replace(/(.jpg|.jpeg|.gif|.png)/i, '_placeholder$1');
				      }

				      var set = [
				        placeholder.replace('_placeholder', '_600x'),
				        placeholder.replace('_placeholder', '_860x'),
				        placeholder.replace('_placeholder', '_1100x'),
				        placeholder.replace('_placeholder', '_1600x'),
				        placeholder.replace('_placeholder', '_2100x')
				      ];

				      galleryDOM += '<div class="site-box ' + size + '"><span class="site-box-background with-image" aria-hidden="true"><img class="lazyload" alt="' + item['alt'] + '" src="' + set[0] + '" data-srcset="' + set[0] + ' 480w, ' + set[1] + ' 720w, ' + set[2] + ' 960w, ' + set[3] + ' 1440w, ' + set[4] + ' 1920w" srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-sizes="auto" /></span></div>'; 

				    });

				    if ( galleryDOM != '' ) {

							if ( $('body').hasClass('template-collection') ) {
				      	$('#collection-gallery-split').html(galleryDOM);
							} else if ( $('body').hasClass('template-product') ) {
								$('#product-gallery-split').html(galleryDOM);
							}

							$('#shopify-section-product').parent().addClass('lift-related-up');
							$('#collection-gallery-split .site-box, #product-gallery-split .site-box').each(function(){
								window.CUBER.Main.$siteBoxes.push($(this));
							});
							window.CUBER.Main._animateEverything('');

				    	if ( window.show_preloader == "true" ) {
					    	$('#collection-gallery-split .lazyload, #product-gallery-split .lazyload').each(function(){
					    		if ( $(this).parent().hasClass('site-box-background') || $(this).parent().hasClass('box--product-image') ) {
					    			$(this).parent().addClass('show-lazy-preloader');
					    			$(this).on('lazyloaded', function(){
					    				$(this).parent().removeClass('show-lazy-preloader');
					    			});
					    		}
					    	});
					    }

				    } else {
							$('#collection-gallery-split, #product-gallery-split').remove();
				    }

				    $(window).trigger('scroll.fade-animation');

					});

			  }

			},

			_ajaxSearchForm: function() {

				var query = this.$searchForm.find('input[type="search"]').val();

				if ( query != '' ) {

					if ( ! this.$searchResults.find('.search-item.blank').length > 0 ) {

						this.$searchResults.html('<a class="search-item blank"><div class="thumbnail"></div><div class="content"><h3 class="title"></h3><span class="caption"></span></div></a><a class="search-item blank"><div class="thumbnail"></div><div class="content"><h3 class="title"></h3><span class="caption"></span></div></a><a class="search-item blank"><div class="thumbnail"></div><div class="content"><h3 class="title"></h3><span class="caption"></span></div></a>');
					}

					this.$searchMore.html('<a class="search-more button" href="' + window.search_url + '?q=' + query + ( '&type=' + "product" + ( window.predictive_search_include_pages == "true" ? ",page" : "" ) + ( window.predictive_search_include_articles == "true" ? ",article" : "" ) ) + ( window.predictive_search_enabled == "true" ? '&options[prefix]=last' : '' ) + '">' + decodeURI(encodeURI(window.search_words_search_for_html.replace('{{ terms }}', query))) + '</a>');

				} else {
					this.$searchResults.html('');
					this.$searchMore.html('');
			  	this.$searchMore.removeClass('push-me');
				}

				if ( window.predictive_search_enabled == "true" ) {

					var searchDOM = '';

					jQuery.getJSON(window.search_url + "/suggest.json", {
					  "q": query,
					  "resources": {
					    "type": "product,collection" + ( window.predictive_search_include_pages == "true" ? ",page" : "" ) + ( window.predictive_search_include_articles == "true" ? ",article" : "" ),
					    "limit": 4
					  }
					}).done((function(response) {

					  var productSuggestions = response.resources.results.products,
					  		articleSuggestions = response.resources.results.articles,
					  		pageSuggestions = response.resources.results.pages,
					  		collectionSuggestions = response.resources.results.collections;

					  if (productSuggestions.length > 0) {

					  	productSuggestions.forEach(function(item){

								searchDOM += '<a class="search-item" href="' + item.url + '" title="' + item.title + '"><div class="thumbnail">' + ( item.featured_image.url != null ? '<img class="lazyload" src="' + window.getSizedImageUrl(item.featured_image.url, '100x100_crop_center') + '" data-srcset="' + window.getSizedImageUrl(item.featured_image.url, '100x100_crop_center') + ' 100w, ' + window.getSizedImageUrl(item.featured_image.url, '200x200_crop_center') + ' 200w" data-sizes="100px" srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="' + item.title + '" />' : '<span class="onboarding-svg">' + window.search_placeholder_image + '</span>' ) + '</div><div class="content"><h3 class="title">' + item.title + '</h3><span class="caption">';

							  if ( window.predictive_search_show_vendor == "true" ) {
							  	searchDOM += '<span class="vendor">' + window.product_words_vendor.replace('{{ vendor }}', item.vendor) + '</span>';
							  }

							  if ( window.predictive_search_show_price == "true" ) {
							  	searchDOM += '<span class="price">' + theme.Currency.formatMoney(item.price, window.shop_money_format);
							  	if ( parseInt(item.compare_at_price_max) > parseInt(item.price_min) ) {
							  		searchDOM += '<span class="st">' + theme.Currency.formatMoney(item.compare_at_price_max, window.shop_money_format) + '</span>';
							  	}
							  	searchDOM += '</span>';
							  }

							  searchDOM += '</span></div></a>';

					  	});

						} 

						if ( collectionSuggestions.length > 0 ) {
							searchDOM += '<span class="search-title">' + window.search_words_collection_results_title + '</span>';
					  	collectionSuggestions.forEach(function(item){
					  		searchDOM += '<a class="search-item article" style="margin-bottom:18px" href="' + item.url +'"><div class="content"><h3 class="title">' + item.title + '</h3></div></a>';
					  	});
						}

					  if ( articleSuggestions.length > 0 ) {
					  	searchDOM += '<span class="search-title">' + window.search_words_article_results_title + '</span>';
					  	articleSuggestions.forEach(function(item){
					  		searchDOM += '<a class="search-item ' + ( item.featured_image.url != null ? '' : 'article' ) + '" href="' + item.url +'">' + ( item.featured_image.url != null ? '<div class="thumbnail"><img class="lazyload" src="' + window.getSizedImageUrl(item.featured_image.url, '100x100_crop_center') + '" data-srcset="' + window.getSizedImageUrl(item.featured_image.url, '100x100_crop_center') + ' 100w, ' + window.getSizedImageUrl(item.featured_image.url, '200x200_crop_center') + ' 200w" data-sizes="100px" srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="' + item.title + '" /></div>' : '' ) + '<div class="content"><h3 class="title">' + item.title + '</h3>' + '<span class="caption"><span class="vendor">' + window.formatTime('%b %d, %Y', item.published_at) + '</span></span>' + '</div></a>';
					  	});
					  }

					  if ( pageSuggestions.length > 0 ) {
					  	searchDOM += '<span class="search-title">' + window.search_words_page_results_title + '</span>';
					  	pageSuggestions.forEach(function(item){
					  		searchDOM += '<a class="search-item article" href="' + item.url +'"><div class="content"><h3 class="title">' + item.title + '</h3>' + ( item.body != '' ? '<span class="caption"><span class="vendor">' + item.body.replace( /(<([^>]+)>)/ig, '').trim().replace('&nbsp;', '').slice(0, 100) + '...' + '</span></span>' : '' ) + '</div></a>';
					  	});
					  }

					  this.$searchResults.html(searchDOM);
					  if ( searchDOM == '' ) {
					  	this.$searchMore.addClass('push-top');
					  } else {
					  	this.$searchMore.removeClass('push-top');
					  }

					}).bind(this));

				} else {

					$.ajax({

		  			type: this.$searchForm.prop('method'),
		  			url: this.$searchForm.prop('action'),
		  			data: this.$searchForm.serialize(),
		  			success: (function(data){
		  				var results = $(data).find('.search-results.with-results').html();
		  				if ( results != undefined ) {
		  					this.$searchResults.html(results);
					  		this.$searchMore.removeClass('push-top');
		  				} else {
		  					this.$searchResults.html('');
					  		this.$searchMore.addClass('push-top');
		  				}

		  			}).bind(this)

		  		});

				}

			}, 

			_ajaxSearchPagination: function() {

				if ( $('#site-search').scrollTop() + $(window).height() >= this.$searchPagination.offset().top - 250 ) {

					this.$searchPreloader.css({'opacity': 1, 'top': 'auto', 'bottom': '-60px'});
					$('#site-search').off('scroll.search-pagination');

					$.ajax({

						url: this.$searchPagination.attr('href'),
						success: (function(data){

							this.$searchResults.find('.next-page').remove();
							this.$searchResults.append($(data).find('.search-item'));

							if ( $(data).find('.search-results .next-page').length > 0 ) {
								this.$searchResults.append($(data).find('.search-results .next-page'));
								this.$searchPagination = $('.search-results').find('.next-page');
								$('#site-search').on('scroll.search-pagination', this._ajaxSearchPagination.bind(this));
							}

							this.$searchPreloader.css({'opacity': 0, 'top': '20px', 'bottom': 'auto'});

						}).bind(this)

					})

				}

			},

			_countdownBannerInterval: null,

			_countdownBannerInit: function(){

	       if ( this._countdownBannerInterval ) {
	      	clearInterval(this._countdownBannerInterval);
	      }

				if ( $('.mount-landing-banner').find('.countdown').length > 0 ) {
 
					var $countdown = $('.mount-landing-banner').find('.countdown');

		      var $days = $countdown.find('.days'),
		          $hours = $countdown.find('.hours'),
		          $minutes = $countdown.find('.minutes'),
		          $seconds = $countdown.find('.seconds');

		      var date = $countdown.data('date').split(','),
		      		gmt = parseInt($countdown.data('timezone')),
		          count = new Date(date[0], (date[1]-1), date[2], date[3]),
		      		timezone = count.getTimezoneOffset() / -60;

		      if (  timezone != gmt ) {
		      	count.setHours(parseInt(date[3]) + timezone - gmt );
		      } 

		      this._countdownBannerInterval = setInterval((function(){

		        if ( $countdown.hasClass('hide') ) {
		          $countdown.removeClass('hide');
		        }

		        var now = new Date().getTime();
		            distance = count - now;

		        var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
		            hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
		            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
		            seconds = Math.floor((distance % (1000 * 60)) / 1000);

		        $days.html(days < 10 ? ('0' + days) : days);
		        $hours.html(hours < 10 ? ('0' + hours) : hours);
		        $minutes.html(minutes < 10 ? ('0' + minutes) : minutes);
		        $seconds.html(seconds < 10 ? ('0' + seconds) : seconds);

		        if ( distance < 0 ) {
		          clearInterval(this._countdownBannerInterval);
		          $days.html('00');
		          $hours.html('00');
		          $minutes.html('00');
		          $seconds.html('00');
		        }

		      }).bind(this), 1000);

		    }

			},

			unmount: function() {
				$(window).off('scroll.scroll-movers');
			}

		},

		ProductMedia: {

			_productHostedVideos: [],
			_productYouTubeVideos: [],
			_productModels: [],

			_plyrStylesLoaded: false,
			_modelStylesLoaded: false,
			_videoLooping: false,

			mount: function($product) {

				var productData = $product.data('po');

				this._videoLooping = productData.$productCarousel.data('video-looping');

				productData.$productGalleryItem.each((function(i, item){

					// init $item variables

					$(item).data('carousel', productData.$productCarousel);
					$(item).data('init', false);

					// push to proper array

					switch ( $(item).data('product-media-type') ) {
						case 'video': 
							this._productHostedVideos.push($(item));
							break;
						case 'external_video': 
							this._productYouTubeVideos.push($(item));
							break;
						case 'model': 
							this._productModels.push($(item));
					}

				}).bind(this));

				// check video array

				if ( this._productHostedVideos.length > 0 ) {
					if ( ! Shopify.Plyr ) {
						window.Shopify.loadFeatures([
			        {
			          name: 'video-ui',
			          version: '1.0',
			          onLoad: (function(){
			          	this._mountSelfHostedVideos();
			          }).bind(this)
			        }
			      ]);
		        this.LibraryLoader.load('plyrShopifyStyles', (function(){
		        	this._plyrStylesLoaded = true;
		        	$('.plyr').addClass('lazyloaded');
							$('.plyr').find('video').addClass('loaded');
							setTimeout(function(){
								$('.plyr').addClass('reset-transitions');
							}, 50);
		        }).bind(this));
					} else {
		      	this._mountSelfHostedVideos();
					}
				}

				// check YouTube array

				if ( this._productYouTubeVideos.length > 0 ) {
					if ( ! window.YT ) {
		        this.LibraryLoader.load('youtubeSdk');
					} else {
						CUBER.ProductMedia._mountYouTubeVideos();
					}
				}

				// check models array

				var $xrButton = $product.find('.product__view-in-space');

				if ( this._productModels.length > 0 ) {

					if ( ! Shopify.ModelViewerUI ) {
						window.Shopify.loadFeatures([
			        {
			          name: 'model-viewer-ui',
			          version: '1.0',
			          onLoad: (function(){
			          	this._mountModels();
			          }).bind(this)
			        }
			      ]);
						this.LibraryLoader.load('modelViewerUiStyles', (function(){
							this._modelStylesLoaded = true;
							$('.shopify-model-viewer-ui').addClass('lazyloaded');
						}).bind(this));
					} else {
						this._mountModels();
					}

					if ( ! Shopify.ShopifyXR ) {
						window.Shopify.loadFeatures([
				      {
				        name: 'shopify-xr',
				        version: '1.0',
				        onLoad: (function(){

				        	document.addEventListener('shopify_xr_initialized', (function(){
				        		if ( $product.find('.model-json').length > 0 ) {
			          			this._setupShopifyXr(JSON.parse($product.find('.model-json')[0].innerHTML));
			          		}
				        	}).bind(this));

				        	document.addEventListener('shopify_xr_launch', (function(){
				        		this._triggerAutoPlayOFF(productData.$productCarousel);
				        	}).bind(this));

			          }).bind(this)
				      }
			      ]);
					} else {
        		if ( $product.find('.model-json').length > 0 ) {
		      		this._setupShopifyXr(JSON.parse($product.find('.model-json')[0].innerHTML));
		      	}
					}
				}

				// bind flickity events for models

				if ( $xrButton.length > 0 ) {
					productData.$productCarousel.on('change.flickity', (function(e, i){
						if ( productData.$productGalleryItem.eq(i).data('product-media-type') == 'model' ) {
							$xrButton.attr('data-shopify-model3d-id', productData.$productGalleryItem.eq(i).data('media-id'));
						} else {
							$xrButton.attr('data-shopify-model3d-id', $xrButton.data('shopify-first-model3d-id'));
						}
					}).bind(this));
				}

				productData.$productCarousel.on('settle.flickity', (function(e, i){
					if ( productData.$productGalleryItem.eq(i).data('product-media-type') == 'model' ) {
						this._triggerAutoPlayON(productData.$productGalleryItem.eq(i));
					}
				}).bind(this));

				productData.$productCarousel.on('staticClick.flickity', (function(e, p, elm, i){
					if ( $(elm).data('product-media-type') == 'model' ) {
						if ( $(elm).find('model-viewer').hasClass('shopify-model-viewer-ui__disabled') ) {
							this._triggerAutoPlayON($(elm));
						}
					}
				}).bind(this));

				// bind flickity events for all media

				var oldIndex = productData.$productCarousel.data('flickity') ? productData.$productCarousel.data('flickity').selectedIndex : 0;
				productData.$productCarousel.on('change.flickity', (function(e, i){

					this._triggerAutoPlayOFF(productData.$productCarousel);
					oldIndex = i;
					if ( productData.$productGalleryItem.eq(i).data('product-media-type') != 'model' ) {
						this._triggerAutoPlayON(productData.$productGalleryItem.eq(i));
					}

				}).bind(this));

				productData.$productCarousel.on('dragStart.flickity', function(e){
					$(e.currentTarget).addClass('dragging');
				});
				productData.$productCarousel.on('dragEnd.flickity', function(e){
					$(e.currentTarget).removeClass('dragging');
				});

			},

			_triggerAutoPlayON: function($slide) {

				if ( $slide.hasClass('init-js-actions') ) {
					if ( $('html').hasClass('no-touchevents') && $(window).width() > 640 )  {
						switch ( $slide.data('product-media-type') ) {
							case 'video':
								$slide.data('player')['obj'].play();
								break;
							case 'external_video':
								$slide.data('player')['obj'].playVideo();
								break;
							case 'model':
								$slide.data('player')['obj'].play();
								break;
						}
					}
				}

			},

			_triggerAutoPlayOFF: function($slider) {

				$slider.find('.gallery-item').each(function(){
					if ( $(this).hasClass('init-js-actions') ) {
						switch ( $(this).data('product-media-type') ) {
							case 'video':
								$(this).data('player')['obj'].pause();
								break;
							case 'external_video':
								if ( $(this).data('player') != 'undefined' ) {
									$(this).data('player')['obj'].pauseVideo();
								}
								break;
							case 'model':
								$(this).data('player')['obj'].pause();
								break;
							}
					}
				});
				
			},

			_mountModels: function() {

				this._productModels.forEach((function($item){

					if ( ! $item.data('init') ) {

						$item.data('init', true);
						var $model = $($item.find('model-viewer')[0]),
								model = new Shopify.ModelViewerUI($model);

						$item.data('player', {
							'type': 'model',
							'obj': model
						});
						$model.data('carousel', $item.data('carousel'));

						if ( parseInt($item.data('carousel').data('size')) > 1 ) {

							$model.on('shopify_model_viewer_ui_toggle_play', (function(e){
								this._updateFlickityDraggable($(e.target).data('carousel'), false);
							}).bind(this));

							$model.on('shopify_model_viewer_ui_toggle_pause', (function(e) {
								this._updateFlickityDraggable($(e.target).data('carousel'), true);
							}).bind(this));

						}

						if ( this._modelStylesLoaded ) {
							$item.find('.shopify-model-viewer-ui').addClass('lazyloaded');
						}
						$item.addClass('init-js-actions');

					}

				}).bind(this));

			},

			_setupShopifyXr: function(modelsJson) {

				window.ShopifyXR.addModels(modelsJson);
		    window.ShopifyXR.setupXRElements();

			},

			_updateFlickityDraggable: function($carousel, draggable) {
				var flkty = $carousel.data('flickity');
				flkty.options.draggable = draggable;
		  	flkty.updateDraggable();
			},

			_mountSelfHostedVideos: function() {

				this._productHostedVideos.forEach((function($item){

					if ( ! $item.data('init') ) {

						$item.data('init', true);

						var player = new Shopify.Plyr($item.find('video')[0], {
							loop: {
								active: this._videoLooping
							}
						});
						$item.find('.plyr').data({
							'parent': $item,
							'carousel': $item.data('carousel')
						});

						player.on('ready', (function($item, e){
							if ( this._plyrStylesLoaded ) {
								$item.addClass('init-js-actions');
								$(e.target).addClass('lazyloaded');
								$(e.target).find('video').addClass('loaded');
								setTimeout((function($player){
									$player.addClass('reset-transitions');
								}).bind(this, $(e.target)), 50);
							} 
						}).bind(this, $item));

						if ( parseInt($item.data('carousel').data('size')) > 1 ) {

							player.on('play', (function(e){
								if ( $(e.target).data('parent').index() == $(e.target).data('carousel').data('flickity').selectedIndex ) {
									this._updateFlickityDraggable($(e.target).data('carousel'), false);
								}
							}).bind(this));

							player.on('pause', (function(e){
								if ( $(e.target).data('parent').index() == $(e.target).data('carousel').data('flickity').selectedIndex ) {
									this._updateFlickityDraggable($(e.target).data('carousel'), true);
								}
							}).bind(this));

						}

						$item.data('player', {
							'type': 'html',
							'obj': player
						});

					}

				}).bind(this));

			},

			_mountYouTubeVideos: function() {

				this._productYouTubeVideos.forEach((function($item){

					if ( ! $item.data('init') ) {

						$item.data('init', true);

						var player = new YT.Player($item.find('iframe')[0], {
							events: {
								'onStateChange': (function(stateId, e){
									if ( e.data === 0 && this._videoLooping ) {
										e.target.seekTo(0);
									} else if ( e.data === 1 ) {
										this._productYouTubeVideos.forEach((function($arrayItem){
											if ( $arrayItem.attr('id') != stateId ) {
												$arrayItem.data('player')['obj'].pauseVideo();
											}
										}).bind(this));
									}
								}).bind(this, $item.attr('id')),
								'onReady': (function($item, $iframe){
									$item.addClass('init-js-actions');
									$iframe.parent().addClass('lazyloaded');
								}).bind(this, $item, $item.find('iframe'))
							}
						});
						$item.data('player', {
							'type': 'youtube',
							'obj': player
						});

					}

				}).bind(this));

			},

			unmount: function($gallery) {

				$gallery.find('.gallery-item').each((function(i, item){

					this._productYouTubeVideos.forEach((function($arrayItem){
						if ( $arrayItem.attr('id') == $(item).attr('id') ) {
							this._productYouTubeVideos = $.grep(this._productYouTubeVideos, function(v){
								return v != $arrayItem;
							});
						}
					}).bind(this));

					this._productModels.forEach((function($arrayItem){
						if ( $arrayItem.attr('id') == $(item).attr('id') ) {
							this._productModels = $.grep(this._productModels, function(v){
								return v != $arrayItem;
							});
						}
					}).bind(this));

					this._productHostedVideos.forEach((function($arrayItem){
						if ( $arrayItem.attr('id') == $(item).attr('id') ) {
							this._productHostedVideos = $.grep(this._productHostedVideos, function(v){
								return v != $arrayItem;
							});
						}
					}).bind(this));

				}).bind(this));

			},

			LibraryLoader: (function() {

				var types = {
			    link: 'link',
			    script: 'script'
			  };

			  var status = {
			    requested: 'requested',
			    loaded: 'loaded'
			  };

			  var cloudCdn = 'https://cdn.shopify.com/shopifycloud/';

			  var libraries = {
			    youtubeSdk: {
			      tagId: 'youtube-sdk',
			      src: 'https://www.youtube.com/iframe_api',
			      type: types.script
			    },
			    plyrShopifyStyles: {
			      tagId: 'plyr-shopify-styles',
			      src: cloudCdn + 'shopify-plyr/v1.0/shopify-plyr.css',
			      type: types.link
			    },
			    modelViewerUiStyles: {
			      tagId: 'shopify-model-viewer-ui-styles',
			      src: cloudCdn + 'model-viewer-ui/assets/v1.0/model-viewer-ui.css',
			      type: types.link
			    }
			  };

			  function load(libraryName, callback) {
			    var library = libraries[libraryName];

			    if (!library) return;
			    if (library.status === status.requested) return;

			    callback = callback || function() {};
			    if (library.status === status.loaded) {
			      callback();
			      return;
			    }

			    library.status = status.requested;

			    var tag;

			    switch (library.type) {
			      case types.script:
			        tag = createScriptTag(library, callback);
			        break;
			      case types.link:
			        tag = createLinkTag(library, callback);
			        break;
			    }

			    tag.id = library.tagId;
			    library.element = tag;

			    var firstScriptTag = document.getElementsByTagName(library.type)[0];
			    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			  }

			  function createScriptTag(library, callback) {
			    var tag = document.createElement('script');
			    tag.src = library.src;
			    tag.addEventListener('load', function() {
			      library.status = status.loaded;
			      callback();
			    });
			    return tag;
			  }

			  function createLinkTag(library, callback) {
			    var tag = document.createElement('link');
			    tag.href = library.src;
			    tag.rel = 'stylesheet';
			    tag.type = 'text/css';
			    tag.addEventListener('load', function() {
			      library.status = status.loaded;
			      callback();
			    });
			    return tag;
			  }

			  return {
			    load: load
			  };
			})()

		},

		Contact: {

			mount: function($elm) {

				if ( $elm.find('.contact-map-holder').length > 0 ) {

					if ( $elm.find('.contact-map-object').data('address') != '' ) {

						if ( typeof google !== 'undefined' ) {
							this._createMap($elm.attr('id'), $elm.find('.contact-map-object'), $elm.find('.contact-map-address-holder'));
						} else {

							if ( window.loadingGoogleMapsScript ) {
								$elm.ti = setInterval((function($elm){
									if ( typeof google !== 'undefined' ) {
										clearInterval($elm.ti);
										this._createMap($elm.attr('id'), $elm.find('.contact-map-object'), $elm.find('.contact-map-address-holder'));
									}
								}).bind(this, $elm), 100);

							} else {

								window.loadingGoogleMapsScript = true;
								$.getScript('https://maps.googleapis.com/maps/api/js?v=3&key='+ $elm.find('.contact-map-holder').data('key')).done((function(){
									this._createMap($elm.attr('id'), $elm.find('.contact-map-object'), $elm.find('.contact-map-address-holder'));
								}).bind(this));

							}
						}

					}

				}

			},

			_createMap: function(id, $mapInsert, $mapAddress) {

				$mapInsert.attr('id', 'contact-map-' + id);

				var coordsKey = 'map-coords-' + $mapInsert.attr('id'),
						coordsStorage = localStorage.getItem(coordsKey) != null ? JSON.parse(localStorage.getItem(coordsKey)) : null,
						mapLat = 0,
						mapLong = 0;

				if ( coordsStorage != null && coordsStorage['address'] == $mapInsert.data('address') ) {
					mapLat = coordsStorage['lat'];
					mapLong = coordsStorage['long'];
				}

	     	var geocoder, map, address;

    		geocoder = new google.maps.Geocoder();
    		address = $mapInsert.data('address');

		    var mapOptions = {
		      zoom: $mapInsert.data('zoom'),
		      center: new google.maps.LatLng(mapLat, mapLong),
		      streetViewControl: false,
		      scrollwheel: false,
		      panControl: true,
		      mapTypeControl: false,
		      overviewMapControl: false,
		      zoomControl: true,
		      draggable: true,
		      styles: $mapInsert.data('style') == 'light' ? window.lightMapStyle : window.darkMapStyle
		    };

		    map = new google.maps.Map(document.getElementById($mapInsert.attr('id')), mapOptions);

		    if ( mapLat != 0 || mapLong != 0 ) {

			    var markerOptions = {
	          position: new google.maps.LatLng(mapLat, mapLong),
	          map: map, 
	          title: address
			    }

			    if( $mapInsert.data('marker') != 'none' ) {
			    	markerOptions['icon'] = {
		          url: $mapInsert.data('marker'),
		          scaledSize: new google.maps.Size(60, 60)
			      }
			    }

			    $mapAddress.find('a').attr('href', 'http://www.google.com/maps/place/' + mapLat + ',' + mapLong);
			    var contentString = $mapAddress.html();
	        var infowindow = new google.maps.InfoWindow({
	          content: contentString
	        });

          var marker = new google.maps.Marker(markerOptions); 
	        marker.addListener('click', function() {
	          infowindow.open(map, marker);
	          if ( $(window).width() < 480 ) {
	          	$('.template-page-contact .box__heading .title').css('marginTop', 50);
	          } else if ( $(window).width() < 768 ) {
	          	$('.template-page-contact .box__heading .title').css('marginTop', 100);
	          }
	        });

          if ( $(window).width() > 768 ) {
						map.panBy(-150, 150);
          } else {
						map.panBy(-75, 75);
          }

		    } else {

			    if ( geocoder ) {

			    	geocoder.geocode( { 'address': address }, function(results, status){

			    		if (status == google.maps.GeocoderStatus.OK) {
			          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {

			          	map.setCenter(results[0].geometry.location);

							    var markerOptions = {
					          position: results[0].geometry.location,
					          map: map, 
					          title: address
							    }

							    if( $mapInsert.data('marker') != 'none' ) {
							    	markerOptions['icon'] = {
						          url: $mapInsert.data('marker'),
						          scaledSize: new google.maps.Size(60, 60)
							      }
							    }

							    $mapAddress.find('a').attr('href', 'http://www.google.com/maps/place/' + results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng());
							    var contentString = $mapAddress.html();
					        var infowindow = new google.maps.InfoWindow({
					          content: contentString
					        });

			            var marker = new google.maps.Marker(markerOptions); 
					        marker.addListener('click', function() {
					          infowindow.open(map, marker);
					        });

				          if ( $(window).width() > 768 ) {
										map.panBy(-150, 150);
				          } else {
										map.panBy(-75, 75);
				          }
				          
			  					localStorage.setItem(coordsKey, JSON.stringify({
			  						'address': $mapInsert.data('address'),
			  						'lat': results[0].geometry.location.lat(),
			  						'long': results[0].geometry.location.lng()
			  					}));

			          } else {
			            alert("No results found for the given address");
			          }
			        } else {
			          console.log("Geocode was not successful for the following reason: " + status);
			        }

			    	});

		   		}

		   	}

			},

			unmount: function() {

			}

		},

		// SCROLL

		Scroll: {

			$body: null,
			$footer: null,

			mount: function() {

				if ( ! $('html').hasClass('csspositionsticky') ) {

					this.$body = $('body');
					this.$footer = $('#shopify-section-footer');
					
					// grid

					var scrollFixArray = [];

					if ( $(window).width() > 768 ) {

						$('.site-box-container.container--fullscreen.box--can-stick').each(function(){

							var $boxChildren = $(this).children('.site-box');

							if ( $boxChildren.length == 2 ) {

								if ( $(this).children('.site-box[data-order="0"]').outerHeight(true) != $(this).children('.site-box[data-order="1"]').outerHeight(true) ) {

									var $bigChild = null,
											$smallChild = null;

									if ( $(this).children('.site-box[data-order="0"]').outerHeight(true) > $(this).children('.site-box[data-order="1"]').outerHeight(true) ) {
										$bigChild = $(this).children('.site-box[data-order="0"]');
										$smallChild = $(this).children('.site-box[data-order="1"]');
									} else if ( $(this).children('.site-box[data-order="1"]').outerHeight(true) > $(this).children('.site-box[data-order="0"]').outerHeight(true) ) {
										$bigChild = $(this).children('.site-box[data-order="1"]');
										$smallChild = $(this).children('.site-box[data-order="0"]');
									}

									scrollFixArray.push({
										'parent': $(this),
										'big-child': $bigChild,
										'small-child': $smallChild
									});

								}

							} else if ( $boxChildren.length == 1 ) {

								if ( $(this).children('.site-box[data-order="0"]').outerHeight(true) > $(window).height() ) {

									scrollFixArray.push({
										'parent': $(this),
										'big-child': $(this).children('.site-box[data-order="0"]'),
										'small-child': null
									});

								}

							}

						});

					}

					scrollFixArray.forEach(function(obj){

						obj['parent'].removeClass('fixing-scroll-now');
							obj['big-child'].css({'position': 'relative', 'top': '0', 'bottom': 'auto', 'marginLeft': '0'});

						if ( obj['small-child'] != null ) {
							obj['small-child'].css({'position': 'relative', 'top': '0', 'bottom': 'auto', 'marginLeft': '0'});
							obj['small-child'].removeClass('ok-scroll');
						}


					});

					$(window).off('scroll.scroll-fix');

					scrollFixArray.forEach(function(obj) {

						if ( $(window).scrollTop() + $(window).height() >= obj['parent'].offset().top + obj['parent'].outerHeight() ) {

							if ( obj['small-child'] != null  ) {
								obj['small-child'].css({'position': 'absolute', 'bottom': 0, 'top': 'auto' });
								if ( obj['small-child'].attr('data-order') == '1' ) {
									obj['small-child'].css('marginLeft', '50%');
								} 
							}

							if ( obj['big-child'].attr('data-order') == '1' ) {
								obj['big-child'].css('marginLeft', '50%');
							}

						}

					})

					$(window).on('scroll.scroll-fix', (function(){

						if ( $(window).scrollTop() >= 0 ) {

							scrollFixArray.forEach(function(obj){

								if ( $(window).scrollTop() >= obj['parent'].offset().top && $(window).scrollTop() + $(window).height() < obj['parent'].offset().top + obj['parent'].outerHeight() && ! obj['parent'].hasClass('fixing-scroll-now') ) {
									
									obj['parent'].addClass('fixing-scroll-now');

									if ( obj['small-child'] != null ) {

										obj['small-child'].css({'position': 'fixed', 'top': 0, 'bottom': 'auto'});

										if ( obj['small-child'].attr('data-order') == '1' ) {
											obj['small-child'].css('marginLeft', '50%');
										} 

										if ( obj['small-child'].height() > $(window).height() ) {
											obj['small-child'].addClass('ok-scroll');
										}

									}

									if ( obj['big-child'].attr('data-order') == '1' ) {
										obj['big-child'].css('marginLeft', '50%');
									} 

								}

								if ( $(window).scrollTop() + $(window).height() >= obj['parent'].offset().top + obj['parent'].outerHeight() && obj['parent'].hasClass('fixing-scroll-now') ) {

									obj['parent'].removeClass('fixing-scroll-now');

									if ( obj['small-child'] != null ) {
										obj['small-child'].removeClass('ok-scroll');
										obj['small-child'].css({'position': 'absolute', 'bottom': 0, 'top': 'auto' });
									}

								}	

								if ( $(window).scrollTop() < obj['parent'].offset().top && obj['parent'].hasClass('fixing-scroll-now') ) {
									
									obj['parent'].removeClass('fixing-scroll-now');
									obj['big-child'].css('marginLeft', '0');

									if ( obj['small-child'] != null ) {
										obj['small-child'].css({'position': 'relative', 'top': '0', 'bottom': 'auto', 'marginLeft': '0'});
									}


								}
								if ( obj['small-child'] != null && obj['small-child'].height() > $(window).height() && obj['small-child'].hasClass('ok-scroll') ) {

									var x = obj['big-child'].height() - $(window).height(),
											y = $(window).height() - obj['small-child'].height(),
											z = $(window).scrollTop();

									//obj['small-child'].css('top', Math.ceil(z * y / x));

								}


							});

						}

					}).bind(this)).trigger('scroll.scroll-fix');

					$(window).off('resize.scroll-fix');
					$(window).on('resize.scroll-fix', window.debounce((function(){
						window.CUBER.Scroll.mount();
					}).bind(this), 250));

				}

			},

			unmount: function() {

				$(window).off('resize.scroll-fix');
				$(window).off('scroll.scroll-fix');

			}

		},

		// IMAGES

		Images: {

			boxImages: [],

			mount: function() {

				this.boxImages = [];

				if ( $('.box--product-image').length > 0 ) {
					$('.box--product-image:not(.on)').each((function(key, elm){

						$(elm).addClass('on');
						this.boxImages.push({
							'$elm': $(elm),
							'img': $(elm).children('img')[0],
							'srcset': $(elm).children('img').data('srcset')
						});

					}).bind(this));	
				}

				$(window).on('resize.box-images', (function(){

					this.boxImages.forEach(function(entry){

	        	var desiredDensity = window.devicePixelRatio <= 2 ? window.devicePixelRatio : 2,
	        			desiredSize = entry['$elm'].width() * desiredDensity;

	        	if ( entry['img'].naturalWidth > 0 ) {

	        		if ( entry['$elm'].width() / entry['$elm'].height() < entry['img'].naturalWidth / entry['img'].naturalHeight ) {
	        			var desiredHeight = Math.ceil(( entry['$elm'].height() * desiredDensity ));
	        			desiredSize = desiredHeight * entry['img'].naturalWidth / entry['img'].naturalHeight;
	        		}

	        	}

						if ( desiredSize <= 480 ) {
							entry['$elm'].css('backgroundImage', 'url(' + entry['srcset'].small + ')');
						} else if ( desiredSize <= 960 ) {
							entry['$elm'].css('backgroundImage', 'url(' + entry['srcset'].medium + ')');
						} else if ( desiredSize <= 1440 ) {
							entry['$elm'].css('backgroundImage', 'url(' + entry['srcset'].large + ')');
						} else if ( desiredSize > 1440 ) {
							entry['$elm'].css('backgroundImage', 'url(' + entry['srcset'].huge + ')');
						} 

					});

				}).bind(this)).trigger('resize.box-images');
				
			},

			unmount: function() {
				$(window).off('resize.box-images');
			}

		},

		Video: {

			mount: function() {

				if ( $('.video-lightbox').length > 0 ) {
					$('.video-lightbox').magnificPopup({
						type: 'iframe',
						iframe: {
							patterns: {
								youtube: {
									index: 'youtube.com',
									id: 'v=',
									src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1'
								}
							}
						}
					});
				}

			},

			unmount: function() {
			}

		},

		VideoBackground: {

			backgroundPlayers: {},

			mount: function() {

				if ( $('.mount-video-background .site-box-video-background .player').length > 0 && $('html').hasClass('no-touchevents') ) {

					if ( typeof YT == 'undefined' ) {
						var tag = document.createElement('script');
						tag.src = "https://www.youtube.com/iframe_api";
						var firstScriptTag = document.getElementsByTagName('script')[0];
						firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
					}

					$('.mount-video-background').each((function(key, elm){
						this.backgroundPlayers[$(elm).find('.site-box-video-background .player').attr('id')] = {
							player: null,
							selector: $(elm).find('.site-box-video-background .player').attr('id'),
							video: $(elm).find('.site-box-video-background').attr('data-video')
						};
					}).bind(this));
						 
					window.onYouTubeIframeAPIReady = (function() {

						for ( var key in this.backgroundPlayers ) {

	    				if ( this.backgroundPlayers.hasOwnProperty(key) ) {
								var item = this.backgroundPlayers[key];
								item['player'] = new YT.Player(item['selector'], {
						    	height: '1080',
						      width: '1920',
						      suggestedQuality: 'highres',
						      videoId: item['video'],
						      playerVars: { 'autoplay': 1, 'controls': 0, 'showinfo': 0, 'rel': 0, 'enablejsapi':1, 'wmode' : 'transparent'},
						      events : {
						     	 	'onReady' : CUBER.VideoBackground._pkOnPlayerReady.bind(this),
						        'onStateChange' : CUBER.VideoBackground._pkOnPlayerStateChange.bind(this)
						      }
						  	});

							}
						}

					}).bind(this);

					setTimeout(function() {
				 		$('.site-box-video-background').fadeIn();
				 	}, 2000);

				}

			},

			unmount: function() {
			},

			_pkOnPlayerStateChange: function(e) {
				var frm = $(e.target.getIframe());
		  	if (e.data === YT.PlayerState.PLAYING) {
		  		this.backgroundPlayers[frm.attr('id')]['player'].setPlaybackQuality('hd1080');
		  	}
		  	if (e.data === YT.PlayerState.ENDED) {
		  		this.backgroundPlayers[frm.attr('id')]['player'].playVideo();
		  	}
			},

			_pkOnPlayerReady: function(e) {
				var frm = $(e.target.getIframe());
	  		this.backgroundPlayers[frm.attr('id')]['player'].mute();
	  		this.backgroundPlayers[frm.attr('id')]['player'].playVideo();
		 	},


		},

		Banner: {

			$banner: null,

			_bannerKey: null,
			_bannerStorage: null,
			_bannerText: '',

			mount: function() {

				this.$banner = $('.shopify-section.mount-banner');

				this._bannerKey = this.$banner.attr('id');
				this._bannerStorage = ! localStorage.getItem(this._bannerKey) ? 'empty' : JSON.parse(localStorage.getItem(this._bannerKey));
				this._bannerText = this._extractText(this.$banner.find('.box__banner .content').html());

				var show = this.$banner.find('.box__banner').data('show');

				// alternate for specific pages
				if ( $('body').hasClass('template-collection') && this.$banner.find('.box__banner').data('collection') != '' && this.$banner.find('.box__banner').data('collection') != $('body').attr('id') ) {
					show = false;
				} else if ( $('body').hasClass('template-product') && this.$banner.find('.box__banner').data('product') != '' && this.$banner.find('.box__banner').data('product') != $('body').attr('id') ) {
					show = false;
				}

				if ( show && ( this._bannerStorage == 'empty' || this._bannerStorage['content'] != this._bannerText ) ) {

					setTimeout((function(){
						this._show(this.$banner);
					}).bind(this), 400);

			   	this.$banner.find('.close').on('click', (function(){
			      this._hide(this.$banner, true);
			    }).bind(this));

				}

			},

			_show: function( $banner ) {
				$banner.addClass('active');
			},

			_hide: function( $banner, remember ) {

				$banner.removeClass('active');

				if ( remember ) {
					localStorage.setItem(this._bannerKey, JSON.stringify({
						'shown': 'yes',
						'content': this._bannerText
					}));
				}

			},

			_extractText: function( content ) {
			  var span = document.createElement('span');
			  span.innerHTML= content;
			  return [span.textContent || span.innerText].toString().replace(/ +/g,'');
			}

		},

		Popup: {

			$popup: null,

			mount: function() {

				this.$popup = $('#shopify-section-popup');

				var show = this.$popup.find('.popup-content').data('show'),
						freq = this.$popup.find('.popup-content').data('freq'),
						enable = this.$popup.find('.popup-content').data('enable');

				if ( show > 0 && enable ) {
					setTimeout((function(){
						this._trigger(show, freq);
					}).bind(this), parseInt(show*1000));
				}

				this.$popup.find('.site-close-handle').on('click', (function(e){
					this._hide();
				}).bind(this));

				this.$popup.find('.popup-background').on('click', (function(e){
					this._hide();
				}).bind(this));

			},

			_show: function() {
				this.$popup.addClass('active');
			},

			_hide: function() {
				this.$popup.removeClass('active');
			},

			_trigger: function(show, freq) {

				var popupKey = 'popup-' + document.location.hostname,
						popupStorage = localStorage.getItem(popupKey) != null ? JSON.parse(localStorage.getItem(popupKey)) : null;

				if ( popupStorage != null ) {
					
					if ( popupStorage['show'] != show || popupStorage['freq'] != freq ) {

						this._refreshStorage(popupKey, show, freq);;

						// user saw the ad but settings are different - show it!
						this._show();

					} else {

						// user saw the ad so we need to check if he should see it again

						if ( freq == 'every' ) { 

							if ( sessionStorage[popupKey] == null || sessionStorage[popupKey] != 'shown' ) {
								this._show();
								this._refreshStorage(popupKey, show, freq);;
							}

						} else {

							var shownAt = popupStorage['shown'],
									nowAt = new Date().getTime(),
									inBetween = Math.round((nowAt - shownAt) / 1000);

							if ( freq == 'day' && inBetween > 129600 ) {
								this._show();
								this._refreshStorage(popupKey, show, freq);;
							} else if ( freq == 'week' && inBetween > 907200 ) {
								this._show();
								this._refreshStorage(popupKey, show, freq);;
							}

						}

					}

				} else {

					this._refreshStorage(popupKey, show, freq);

					// user never saw the ad - show it!

					this._show();

				}

			},

			_refreshStorage: function(popupKey, show, freq) {

				localStorage.setItem(popupKey, JSON.stringify({
					'show': show,
					'freq': freq,
					'shown': new Date().getTime()
				}));

				sessionStorage[popupKey] = 'shown';

			},

			unmount: function() {
			}

		},

		SplitSlider: {

			mount: function( $section ) {
				if ( ! $section.find('.box__slideshow-split').hasClass('one-image') ) {
					$section.KrownSplitScreenSlider();
				} else {
					$(window).on('resize.split-screen-single', function(){
						$section.find('.box__slideshow-split').height($(window).height() - $('#site-header').outerHeight(true)).addClass('remove-min-height');
					}).trigger('resize.split-screen-single');
				}
			},

			unmount: function( $section ) {
				$(window).off('scroll.splid-slider-' + $section.attr('id'));
			}

		},

		ShopLook: {

			mount: function( $section ) {

				if ( parseInt($section.find('.product-carousel').data('size')) > 1 ) {

					var $productCarousel = $section.find('.product-carousel');
					$section.find('.site-box-content').append('<div class="gallery-index"><span class="flickity-custom-nav prev" tabindex="0"><span style="transform:rotate(180deg);display:inline-block;position:relative;top:-1px">' + $.themeAssets.arrowRight + '</span></span><div><span class="current">1</span> / <span class="total">' + $section.find('.product-carousel').data('size') + '</span></div><span class="flickity-custom-nav next" tabindex="0"><span style="display:inline-block">' + $.themeAssets.arrowRight + '</span></span></div>');
						
					var $productCarouselIndex = $section.find('.gallery-index .current');

					$productCarousel.flickity({
						cellSelector: '.product-carousel__item',
						prevNextButtons: false,
						cellAlign: 'left',
						pageDots: false,
						adaptiveHeight: true,
						resize: true
					});

					var productCarouselFlkty = $productCarousel.data('flickity');
					$productCarousel.on('select.flickity', function(){
						$productCarouselIndex.html(productCarouselFlkty.selectedIndex + 1);
					})//.bind(_this));

					$section.find('.flickity-custom-nav.prev').on('click', function(e){
						$(e.target).removeClass('hover');
						productCarouselFlkty.previous();
					});/*.bind(_this)).on('keypress', function(e){
						if ( e.which == 13 ) {
							$(e.target).trigger('click');
							$productCarousel.find('.gallery-item.is-selected').focus();
						}
					});*/

					$section.find('.flickity-custom-nav.next').on('click', function(e){
						$(e.target).removeClass('hover');
						productCarouselFlkty.next();
					});/*.bind(_this)).on('keypress', function(e){
						if ( e.which == 13 ) {
							$(e.target).trigger('click');
							$productCarousel.find('.gallery-item.is-selected').focus();
						}
					});*/

				}

				$('.product-carousel__item').each(function(){
					if ( $(this).data('product-available') ) {
						window.CUBER.Product.initProductForm($(this), false);
						window.CUBER.Product.ajaxProductForm($(this));
					}
				});

			}

		}

	}

	$(document).ready(function(){

		window.CUBER.Nav.mount();
		window.CUBER.Main.mount();
 		window.CUBER.Scroll.mount();

		if ( $('.mount-slideshow').length > 0 ) {
			$('.mount-slideshow').each(function(){
				if ( $(this).find('.box__slideshow-split').length > 0 ) {
					window.CUBER.SplitSlider.mount($(this));
				}
			})
		}

		if ( $('.mount-product').length > 0 ) {
			$('.mount-product').each(function(){
				window.CUBER.Product.mount($(this));
				window.CUBER.ProductMedia.mount($(this));
			});
		}
		if ( $('body').hasClass('template-collection') ) {
			window.CUBER.Collection.mount();
		}
		if ( $('body').hasClass('template-page-contact') || ( $('body').hasClass('template-index') ) && $('.mount-map').length > 0 ) {
			$('.mount-map').each(function(){
				window.CUBER.Contact.mount($(this));
			});
		}

		if ( $('.mount-video-background').length > 0 ) {
			window.CUBER.VideoBackground.mount();
		}

		if ( $('.mount-landing-banner').length > 0 ) {
			window.CUBER.Main._countdownBannerInit();
		}

 		if ( $('.mount-shop-the-look').length > 0 ) {
 			$('.mount-shop-the-look').each(function(){
				window.CUBER.ShopLook.mount($(this));
 			});
 		}

		window.CUBER.Video.mount();
		window.CUBER.Popup.mount();
		window.CUBER.Banner.mount();

		// Section events

		// select

		$(document).on('shopify:section:select', function(e){

	 		var $section = $(e.target);

	 		if ( $section.hasClass('mount-header') ) {

	 			if ( $section.find('#site-header').hasClass('style--sidebar' ) || $section.find('#site-header').hasClass('style--fullscreen' ) ) {
	 				if ( ! $section.find('#site-nav').hasClass('active') ) {
	 					$('#site-menu-handle a').trigger('click');
	 				}
	 			}

	 		}

	 		if ( $('#site-header').hasClass('desktop-view--minimal') && $('#fix-me-header').css('display') == 'none' ) {
	 			setTimeout(function(){
	 				$('html, body').stop().animate({'scrollTop': $section.offset().top}, 0);
	 			}, 400);
	 		}

	 		if ( $section.hasClass('mount-popup') ) {
	 			window.CUBER.Popup._show();
	 		}
	 		if ( $section.hasClass('mount-banner') ) {
	 			window.CUBER.Banner._show($section);
	 		}

	 	});

		// deselect

		$(document).on('shopify:section:deselect', function(e){

	 		var $section = $(e.target);

	 		if ( $section.hasClass('mount-header') ) {

	 			if ( $section.find('#site-header').hasClass('style--sidebar' ) || $section.find('#site-header').hasClass('style--fullscreen' ) ) {
	 				if ( $section.find('#site-nav').hasClass('active') ) {
	 					$('#site-menu-handle a').trigger('click');
	 				}
	 			}

	 		}

	 		if ( $section.hasClass('mount-popup') ) {
	 			window.CUBER.Popup._hide();
	 		}
	 		if ( $section.hasClass('mount-banner') ) {
	 			window.CUBER.Banner._hide($section, false);
	 		}


		});

		// load

		$(document).on('shopify:section:load', function(e){

	 		var $section = $(e.target);

	 		if ( $section.hasClass('mount-header') ) {
	 			window.CUBER.Nav.mount();
	 		} 
	 		if ( $section.hasClass('mount-images') ) {
	 			//window.CUBER.Images.mount();
	 		}
	 		if ( $section.hasClass('mount-video') ) {
				window.CUBER.Video.mount();
	 		}
	 		if ( $section.hasClass('mount-shop-the-look') ) {
				window.CUBER.ShopLook.mount($section);
	 		}
	 		if ( $section.hasClass('mount-video-background') ) {
				window.CUBER.VideoBackground.mount();
	 		}
	 		if ( $section.hasClass('mount-slideshow') && $section.find('.box__slideshow-split').length > 0 ) {
	 			window.CUBER.SplitSlider.mount($section);
	 			$(window).scrollTop(0);
	 		}
	 		if ( $section.hasClass('mount-product') ) {
				window.CUBER.Product.mount($section);
				window.CUBER.ProductMedia.mount($section);
	 		}
	 		if ( $section.hasClass('mount-map') ) {
				window.CUBER.Contact.mount($section);
	 		}

	 		if ( $section.hasClass('mount-popup') ) {
	 			window.CUBER.Popup.mount();
	 		}
	 		if ( $section.hasClass('mount-banner') ) {
	 			window.CUBER.Banner.mount();
	 		}
	 		if ( $section.hasClass('mount-gallery') ) {
	 			window.CUBER.Main._mountCustomGalleries();
	 		}

	 		if ( $section.hasClass('mount-landing-banner') ) {
	 			window.CUBER.Main._countdownBannerInit();
	 		}

	 		window.CUBER.Main.mount();
	 		window.CUBER.Scroll.mount();

		});

		// unload

		$(document).on('shopify:section:unload', function(e){

	 		var $section = $(e.target);

	 		if ( $section.hasClass('mount-header') ) {
	 			window.CUBER.Nav.unmount();
	 		}
	 		if ( $section.hasClass('mount-images') ) {
	 			window.CUBER.Images.unmount();
	 		}
	 		if ( $section.hasClass('mount-video') ) {
	 			window.CUBER.Video.unmount();
	 		}
	 		if ( $section.hasClass('mount-slideshow') && $section.find('.box__slideshow-split').length > 0 ) {
	 			window.CUBER.SplitSlider.unmount($section);
	 		}
	 		if ( $section.hasClass('mount-product') ) {
				window.CUBER.Product.unmount($section);
				window.CUBER.ProductMedia.unmount($section.find('.box__product-gallery'));
	 		}
	 		if ( $section.hasClass('mount-map') ) {
				window.CUBER.Contact.unmount();
	 		}

	 		window.CUBER.Main.unmount();
	 		window.CUBER.Scroll.unmount();

		});

		// blocks

		$(document).on('shopify:block:select', function(e){

			var $block = $(e.target);
			
			if ( $block.hasClass('slideshow-item') ) {
				if ( $block.closest('.responsive-flickity').hasClass('flickity-enabled') ) {
					$block.closest('.responsive-flickity').data('flickity').select($block.index())
				} else {
					$(window).scrollTop($block.offset().top);
					$(window).trigger('scroll.split-slider-' + $block.closest('.shopify-section.mount-slideshow').attr('id'));
				}
	 			$block.find('.caption, .title, .subtitle').css('transform', 'translateY(0)');
			} else if ( $block.hasClass('box__collection-footer') ) {
	 			window.CUBER.Main._mountCustomFooter($block);
			} else if ( $block.hasClass('krown-tab-title') ) {
				$block.trigger('click');
			}

		});

		// Various stuff that doesn't need remounting

		/*$('.simple-grid select:not(.styled)').each(function(){
			$(this).styledSelect({
				coverClass: 'regular-select-cover',
				innerClass: 'regular-select-inner'
			}).addClass('styled');
			$(this).parent().append($.themeAssets.arrowDown);
		});*/

		if ( $('body').hasClass('template-customers-login') ) {

			if ( $('#RecoverPassword').length > 0 ) {

				$('#RecoverPassword').on('click', function(e){
					$('#CustomerLoginForm').hide();
					$('#RecoverPasswordForm').show();
					$('#LoginRecoverTitle').html($('#LoginRecoverTitle').data('password_recovery'));
					e.preventDefault();
				});

				$('#HideRecoverPasswordLink').on('click', function(e){
					$('#RecoverPasswordForm').hide();
					$('#CustomerLoginForm').show();
					$('#LoginRecoverTitle').html($('#LoginRecoverTitle').data('login'));
					e.preventDefault();
				});

				if (window.location.hash == '#recover') { 
					$('#RecoverPassword').trigger('click'); 
				}

			}

		} else if ( $('body').hasClass('template-customers-addresses') ) {
			$('#section-addresses a').on('click', function(){
				window.CUBER.Scroll.mount();
			})
		}

		//

		if ( $('body').hasClass('template-blog') || $('body').hasClass('template-article') ) {

			window.CUBER.Main._mountScrollMovers({
				'parent': $('.scroll-movers-parent')
			});

		} 

	});

	// Show everything up asap

	CUBER.Main._animateEverything('.site-box:not(.footer-box)');

})(jQuery);

function response(data) {
	console.log(data);
}

window._getLuminance = function(hexy) {
  var rgb = this._toRgb(hexy);
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
}

window._toRgb = function(hexy) {
	var hex = hexy.replace('rgb(', '');
		hex = hex.replace(')', '');
		hex = hex.replace(' ', '');
		hex = hex.replace(' ', '');
		hex = hex.split(',');
	return { r: hex[0], g: hex[1], b: hex[2] };
}

$(window).on('load', function(){
	setTimeout(function(){
		if ( $('body').attr('id') == 'challenge' || location.pathname == '/challenge' ) {
			document.location.hash = 'challenge';
			$('html, body').scrollTop(0);
		}
	}, 150);
});

if ( navigator.userAgent.match(/instagram/i) ) {

	var screenHeight = window.screen.height - 100,
			vh100 = screenHeight + 'px',
			vh80 = screenHeight * .8 + 'px',
			vh75 = screenHeight * .75 + 'px',
			vh70 = screenHeight * .7 + 'px',
			vh60 = screenHeight * .6 + 'px',
			vh50 = screenHeight * .5 + 'px',
			vh45 = screenHeight * .45 + 'px',
			vh40 = screenHeight * .40 + 'px',
			vh33 = screenHeight * .33 + 'px',
			vh10 = screenHeight * .1 + 'px',
			vh164 = screenHeight * 1.64 + 'px';

	var stupidBrowserStyle = '.box--small {height: ' + vh50 + ' !important;}.box--small-lg {height: ' + vh50 + ' !important;}.box--small-fl {height: ' + vh50 + ' !important;}.box--big {min-height: ' + vh100 + ';}.box--bigger {min-height: ' + vh100 + ';}@media screen and (max-width: 1024px) {.portable--box--small {height: ' + vh50 + ' !important;}.portable--box--small-lg {height: ' + vh50 + ' !important;}.portable--box--small-fl {height: ' + vh50 + ' !important;}.portable--box--big {min-height: ' + vh100 + ';}.portable--box--bigger {min-height: ' + vh100 + ';}}@media screen and (max-width: 768px),screen and (max-width: 1024px) and (orientation: portrait) {.lap--box--small {height: ' + vh50 + ' !important;}.lap--box--small-lg {height: ' + vh50 + ' !important;}.lap--box--small-fl {height: ' + vh50 + ' !important;}.lap--box--big {min-height: ' + vh100 + ';}}@media screen and (max-width: 480px) {.palm--box--small {height: ' + vh50 + ' !important;}.palm--box--small-lg {height: ' + vh50 + ' !important;}.palm--box--small-fl {height: ' + vh50 + ' !important;}.palm--box--big {min-height: ' + vh100 + ';}.palm--box--bigger {min-height: ' + vh100 + ';}}.site-box.box__blog .blog-item {height: ' + vh50 + ';}@media screen and (max-width: 768px),screen and (max-width: 1024px) and (orientation: portrait) {.template-collection .site-box.box__heading.box--big:not(.fix-me-with-height-hard).lap--box--small-fl {min-height: ' + vh50 + ' !important;}}.site-box.box__heading.box--big,.site-box.box__heading.box--bigger {height: ' + vh100 + ';}@media screen and (min-width: 481px) {.mount-testimonials .site-box-container:not([data-all_posts="2"]) .site-box {height: auto !important;min-height: ' + vh50 + ' !important;}.mount-testimonials .site-box-container[data-all_posts="1"] .site-box {min-height: ' + vh100 + ' !important;}}@media screen and (max-width: 768px),screen and (max-width: 1024px) and (orientation: portrait) {.site-box-container[data-posts="0"] .site-box.box__testimonial:last-child {min-height: ' + vh50 + ' !important;}}@media screen and (max-width: 480px) {.site-box.box__testimonial {min-height: ' + vh33 + ' !important;}}@media screen and (min-width: 481px) {.mount-testimonials .site-box-container:not([data-all_posts="2"]) .ie9 .site-box.box__testimonial {height: ' + vh50 + ' !important;}}@media screen and (max-width: 768px),screen and (max-width: 1024px) and (orientation: portrait) {.box__map .contact-map-holder {height: ' + vh50 + ';}}@media screen and (max-width: 768px) and (orientation: landscape) {.mount-social .box__heading {height: ' + vh50 + ' !important;}}.site-footer-size--sm .box__footer {min-height: ' + vh50 + ' !important;}@media screen and (max-width: 768px) and (orientation: landscape) {.site-box.box__collection {height: ' + vh100 + ' !important;}}.site-box.box__collection.box--big .product-item {height: ' + vh100 + ';}.template-collection .site-box.box__heading.box--big:not(.fix-me-with-height-hard) {min-height: ' + vh100 + ' !important;}@media screen and (max-width: 768px) and (orientation: landscape) {.site-box.box__heading {height: ' + vh80 + ' !important;}.mount-products .site-box.box__heading {height: ' + vh100 + ' !important;}}.site-box.box__slideshow-split .slideshow-item .site-box.box--big.box--big,.site-box.box__slideshow-split .slideshow-item .site-box.box--big.box--bigger {height: ' + vh100 + ';}.site-box.box__slideshow-split .slideshow-item .site-box-background-container, .site-box.box__slideshow-split .slideshow-item .site-box-background-container .site-box-background {height: ' + vh100 + ';}@media screen and (max-width: 768px),screen and (max-width: 1024px) and (orientation: portrait) {.site-box.box__slideshow-split {height: calc(' + vh100 + ' - 91px);}}.site-box.box__image-text.box--big,.site-box.box__image-text.box--bigger {height: ' + vh100 + ';}.site-nav.style--sidebar {height: ' + vh100 + ';}.site-overlay {height: ' + vh100 + ';}@media screen and (max-width: 1024px) {.box__product-gallery.scroll .site-box-content {height: ' + vh100 + ';}}.box__product-gallery.slider .site-box-content {height: ' + vh100 + ';}.gallery-item {height: ' + vh100 + ';}@media screen and (orientation: landscape) {.expand .gallery-item {height: ' + vh100 + ';}}#product-zoomed-image {height: calc(' + vh100 + ' + 20px);}.box__map .map-info {max-height: ' + vh70 + ';}@media screen and (max-width: 768px),screen and (max-width: 1024px) and (orientation: portrait) {.box__product-gallery {height: ' + vh70 + ' !important;}}@media screen and (max-width: 768px) and (orientation: landscape) {.box__product-gallery {height: ' + vh164 + ' !important;}}html .template-collection-lookbook {min-height: ' + vh50 + ' !important;}@media screen and (max-width: 768px),screen and (max-width: 1024px) and (orientation: portrait){ #collection-gallery .lap--box--portrait-small, #section-product_extra .lap--box--portrait-small {height: ' + vh40 + ';} #collection-gallery .lap--box--portrait-large, #section-product_extra .lap--box--portrait-large {height: ' + vh75 + ';} #collection-gallery .lap--box--landscape, #section-product_extra .lap--box--landscape {height: ' + vh45 + ';} .box__collection-footer, .box__video-background {min-height: ' + vh50 + ' !important; padding: ' + vh10 + ';} } .box__landing-banner {min-height: ' + vh60 + '; padding: ' + vh10 + ' 0;} .landing-page-content {min-height: ' + vh50 + ' !important; } .box__next-collection {height: ' + vh40 + ' !important;} .box__custom {height:auto !important;padding: 50px 25px !important;} @media screen and (max-width: 768px), screen and (max-width: 1024px) and (orientation: portrait) { .box__collection-footer { height: auto !important; min-height: ' + vh50 + ' !important; } }';

	$('head').append('<style type="text/css">' + stupidBrowserStyle + '</style>');

}

function onYouTubeIframeAPIReady(){
	window.CUBER.ProductMedia._mountYouTubeVideos();
}

CUBER.Localization = {

	mount: function() {

		$('.localization-form__item .regular-select-cover').each(function(){
			var selectContentWidth = Math.ceil($(this).find('.regular-select-content').outerWidth(true)),
					selectInnerWidth = Math.ceil($(this).find('.regular-select-inner').outerWidth(true));
			$(this).attr('style', 'width: ' + ( Math.max(120, Math.max(selectInnerWidth, selectContentWidth)) + 1 ) + 'px !important');
		});

		$('.localization-form__item .regular-select-cover').on('click', function(e){

			e.stopPropagation();
			var _this = $(this)[0];

			$('.regular-select-cover.content-opened').each(function(){
				if ( $(this)[0] != _this ) {
					$(this).removeClass('content-opened');
					$(this).parent().css('zIndex', 9);
				}
			});

			if ( ! $(this).hasClass('content-opened') ) {

				var htmlHeight = $('html').height();

				$(this).addClass('content-opened');
				$(this).attr('aria-expanded', 'true');
				$(this).parent().css('zIndex', 1000);
				var $selectHandle = $(this);

				if ( $(this).offset().top + $(this).find('.regular-select-content').height() + 55 > htmlHeight ) {
					$(this).addClass('invert');
				}

				$(window).on('click.select-helper', function(){
					if ( $selectHandle.hasClass('content-opened') ) {
					$selectHandle.removeClass('content-opened').removeClass('invert');
						$selectHandle.parent().css('zIndex', 9);
					}
				});

			} else {
				$(this).attr('aria-expanded', 'false');
				$(this).parent().css('zIndex', 9);
				$(this).removeClass('content-opened').removeClass('invert');
				$(window).off('click.select-helper');
			}

		}).on('keypress', function(e){
			if ( e.which == 13 ) {
				if ( ! $(this).hasClass('opened-with-tab') ) {
					$(this).addClass('opened-with-tab');
					$(this).trigger('click');
					$(this).find('.regular-select-item').attr('tabindex', '0');
				}
			}
		});

	}

}

// Mount in page

$(document).ready(function(){
  if ( $('.localization-form__item').length > 0 ) {
    CUBER.Localization.mount();
  }
});

// Shopify events

$(document).on('shopify:section:load', function(e){

  var $section = $(e.target);
  if ( $section.hasClass('mount-footer') && $section.find('.localization-form__item').length > 0 ) {
    CUBER.Localization.mount();
  }

});