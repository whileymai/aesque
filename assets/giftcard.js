/**
 * Gift Card Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Gift Card template.
 */
!function(){function e(e){var t=document.getElementById(e.data.element),n="";if(document.body.createTextRange)n=document.body.createTextRange(),n.moveToElementText(t),n.select();else if(window.getSelection){var o=window.getSelection();n=document.createRange(),n.selectNodeContents(t),o.removeAllRanges(),o.addRange(n)}}var t={qrCode:"#QrCode",printButton:"#PrintGiftCard",giftCardCode:".giftcard__code"},n=$(t.qrCode);new QRCode(n[0],{text:n.attr("data-identifier"),width:120,height:120}),$(t.printButton).on("click",function(){window.print()}),$(t.giftCardCode).on("click",{element:"GiftCardDigits"},e)}();