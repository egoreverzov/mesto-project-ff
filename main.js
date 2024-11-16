(()=>{"use strict";function e(e,t,n,r){var o=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),c=o.querySelector(".card__delete-button"),i=o.querySelector(".card__image"),a=o.querySelector(".card__title");return i.src=e.link,i.alt=e.name,a.textContent=e.name,c.addEventListener("click",(function(){return t(o)})),o.addEventListener("click",r),i.addEventListener("click",(function(){n({src:e.link,alt:e.name})})),o}function t(e){e.remove()}function n(e){e.target.classList.contains("card__like-button")&&e.target.classList.toggle("card__like-button_is-active")}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c),e.addEventListener("click",i)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c),e.removeEventListener("click",i)}function c(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}function i(e){e.currentTarget===e.target&&o(document.querySelector(".popup_is-opened"))}var a={inputSelector:".popup__input",submitButton:".popup__button",inputErrorClass:"popup__input_invalid",errorClass:".popup__input_error"},u=function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.validity.typeMismatch?t.setCustomValidity(t.dataset.errorLink):t.setCustomValidity(""),t.validity.valid?s(e,t,n):l(e,t,t.validationMessage,n)},l=function(e,t,n,r){e.querySelector(".".concat(t.id,"-error")).textContent=n,t.classList.add(r.inputErrorClass)},s=function(e,t,n){e.querySelector(".".concat(t.id,"-error")).textContent="",t.classList.remove(n.inputErrorClass)},p=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.disabled=!1:t.disabled=!0};function d(e,t){var n=e.querySelector(t.submitButton);Array.from(e.querySelectorAll(t.errorClass)).forEach((function(e){e.textContent=""}));var r=Array.from(e.querySelectorAll(t.inputSelector));r.forEach((function(n){n.classList.remove(t.inputErrorClass),u(e,n,t)})),p(r,n)}var f=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var y,v=document.querySelector(".places__list"),_=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),h=document.querySelector(".profile__image"),S=document.querySelectorAll(".popup"),q=document.querySelector(".popup_type_edit"),E=document.querySelector(".popup_type_new-card"),g=document.querySelector(".popup_type_image"),C=g.querySelector(".popup__image"),L=g.querySelector(".popup__caption"),k=document.forms["edit-profile"],A=k.elements.name,x=k.elements.description,w=document.forms["new-place"],j=w.elements["place-name"],T=w.elements.link,O=document.querySelector(".profile__edit-button"),M=document.querySelector(".profile__add-button"),z=document.querySelectorAll(".popup__close");function B(e){C.src=e.src,C.alt=e.alt,L.textContent=e.alt,r(g)}S.forEach((function(e){e.classList.add("popup_is-animated")})),z.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return o(t)}))})),O.addEventListener("click",(function(){r(q),A.value=_.textContent,x.value=b.textContent,d(k,a)})),M.addEventListener("click",(function(){r(E),j.value="",T.value="",d(w,a)})),k.addEventListener("submit",(function(e){var t,n;e.preventDefault(),(t=A.value,n=x.value,fetch("https://nomoreparties.co/v1/pwff-cohort-1/users/me",{method:"PATCH",headers:{authorization:"61cdd488-71cb-4a43-8e1b-f3d71b4be19b","Content-Type":"application/json"},body:JSON.stringify({name:t,about:n})}).then(f)).then((function(e){_.textContent=e.name,b.textContent=e.about})).catch((function(e){console.log(e)})),o(q)})),w.addEventListener("submit",(function(r){var c,i;r.preventDefault(),(c=j.value,i=T.value,fetch("https://nomoreparties.co/v1/pwff-cohort-1/cards",{method:"POST",headers:{authorization:"61cdd488-71cb-4a43-8e1b-f3d71b4be19b","Content-Type":"application/json"},body:JSON.stringify({name:c,link:i})}).then(f)).then((function(r){var o=e(r,t,B,n);v.prepend(o)})).catch((function(e){console.log(e)})),r.currentTarget.reset(),o(E)})),y={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_invalid"},Array.from(document.querySelectorAll(y.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){u(e,o,t),p(n,r)}))}))}(e,y)})),Promise.all([fetch("https://nomoreparties.co/v1/pwff-cohort-1/users/me",{headers:{authorization:"61cdd488-71cb-4a43-8e1b-f3d71b4be19b","Content-Type":"application/json"}}).then(f),fetch("https://nomoreparties.co/v1/pwff-cohort-1/cards",{headers:{authorization:"61cdd488-71cb-4a43-8e1b-f3d71b4be19b","Content-Type":"application/json"}}).then(f)]).then((function(r){var o,c,i=(c=2,function(e){if(Array.isArray(e))return e}(o=r)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,i,a=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw o}}return a}}(o,c)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(o,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=i[0],u=i[1];console.log(a,u);var l=a.name,s=a.about,p=a.avatar;_.textContent=l,b.textContent=s,h.style.backgroundImage="url(".concat(p,")"),u.forEach((function(r){var o=e(r,t,B,n);v.append(o)}))})).catch((function(e){console.log(e)}))})();