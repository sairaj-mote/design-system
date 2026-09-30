/* Documentation-site runtime. It intentionally owns only showcase behavior. */
(function () {
    'use strict';

    function getRef(id) {
        return document.getElementById(id);
    }

    function popupById(id) {
        const popup = getRef(id);
        if (!popup) throw new Error(`Popup "${id}" was not found.`);
        return popup;
    }

    function closePopup(popup) {
        const target = popup || document.querySelector('sm-popup[open]');
        if (target) target.hide();
    }

    function openPopup(id, options) {
        const popup = popupById(id);
        popup.show(options);
        return popup;
    }

    function notify(message, mode, options = {}) {
        const drawer = getRef('notification_drawer');
        if (!drawer) return null;
        const icons = {
            success: '<span class="material-icons" aria-hidden="true">check_circle</span>',
            error: '<span class="material-icons" aria-hidden="true">error</span>'
        };
        const settings = {
            icon: icons[mode] || '',
            priority: mode === 'error' ? 'assertive' : 'polite',
            ...options
        };
        if (mode === 'error' && !Object.hasOwn(settings, 'pinned')) settings.pinned = true;
        return drawer.push(message, settings);
    }

    function getConfirmation(title, options = {}) {
        const { message = '', cancelText = 'Cancel', confirmText = 'OK', danger = false } = options;
        const popup = popupById('confirmation_popup');
        const cancelButton = popup.querySelector('.cancel-button');
        const confirmButton = popup.querySelector('.confirm-button');
        getRef('confirm_title').textContent = title;
        getRef('confirm_message').textContent = message;
        cancelButton.textContent = cancelText;
        confirmButton.textContent = confirmText;
        confirmButton.classList.toggle('button--danger', danger);

        return new Promise(resolve => {
            let result = false;
            let settled = false;
            const settle = value => {
                if (settled) return;
                settled = true;
                cancelButton.onclick = null;
                confirmButton.onclick = null;
                resolve(value);
            };
            const onClose = () => settle(result);
            popup.addEventListener('popupclosed', onClose, { once: true });
            const finish = value => {
                result = value;
                popup.hide();
            };
            cancelButton.onclick = () => finish(false);
            confirmButton.onclick = () => finish(true);
            openPopup('confirmation_popup');
        });
    }

    function getPromptInput(title, message = '', options = {}) {
        const { placeholder = '', isPassword = false, cancelText = 'Cancel', confirmText = 'OK' } = options;
        const popup = popupById('prompt_popup');
        const input = getRef('prompt_input');
        const cancelButton = popup.querySelector('.cancel-button');
        const confirmButton = popup.querySelector('.confirm-button');
        getRef('prompt_title').textContent = title;
        getRef('prompt_message').textContent = message;
        input.setAttribute('type', isPassword ? 'password' : 'text');
        input.setAttribute('placeholder', placeholder);
        input.value = '';
        cancelButton.textContent = cancelText;
        confirmButton.textContent = confirmText;

        return new Promise(resolve => {
            let result = null;
            let settled = false;
            const settle = value => {
                if (settled) return;
                settled = true;
                cancelButton.onclick = null;
                confirmButton.onclick = null;
                resolve(value);
            };
            const onClose = () => settle(result);
            popup.addEventListener('popupclosed', onClose, { once: true });
            const finish = value => {
                result = value;
                popup.hide();
            };
            cancelButton.onclick = () => finish(null);
            confirmButton.onclick = () => finish(input.value);
            openPopup('prompt_popup', { pinned: true });
            setTimeout(() => input.focusIn(), 0);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.addEventListener('keyup', event => {
            if (event.key === 'Escape') closePopup();
        });
        document.querySelectorAll('.popup__header__close, .close-popup-on-click').forEach(element => {
            element.addEventListener('click', () => closePopup());
        });
        getRef('pattern_signup_form')?.addEventListener('submit', () => {
            notify('Form submitted locally. No data was sent.', 'success');
        });
    });

    window.getRef = getRef;
    window.openPopup = openPopup;
    window.closePopup = closePopup;
    window.notify = notify;
    window.getConfirmation = getConfirmation;
    window.getPromptInput = getPromptInput;
})();
