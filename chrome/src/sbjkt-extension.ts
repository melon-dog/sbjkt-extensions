import { objkt } from "./objkt";

const sbjktIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248 248" fill="none" xmlns:v="https://vecta.io/nano" style="margin:auto;"><rect width="248" height="248" rx="124" fill="#8c89ff"/><path d="M103.16 132.89c-11.578 11.578-11.578 30.349-.001 41.926s30.349 11.578 41.926 0 11.578-30.348 0-41.926l-12.091 12.091a12.55 12.55 0 0 1-17.743 0L103.16 132.89zm82.958.162l.164-.163c11.577-11.577 11.577-30.348 0-41.926s-30.349-11.577-41.926 0-11.578 30.349 0 41.926l.132.131-.132-.132 12.091-12.092a12.55 12.55 0 0 1 17.743 0l12.092 12.092-.164.164zm-82.356-.036l.127-.127c11.578-11.577 11.578-30.348 0-41.926s-30.348-11.577-41.926 0-11.578 30.349 0 41.926l.167.166-.167-.167 12.092-12.092a12.55 12.55 0 0 1 17.743 0l12.091 12.092-.127.128z" fill-rule="evenodd" fill="#121212"/></svg>`;
const xUserCache = new Map<string, string[]>();

function getXUsername(bookmarkButton: Element) {
    const tweetContainer = bookmarkButton.closest('[data-testid="tweet"]');
    if (!tweetContainer) { return null; }

    const originalUserLink = tweetContainer.querySelector('a[href^="/"][role="link"]');

    if (originalUserLink) {
        const originalUsername = originalUserLink.getAttribute('href')?.slice(1);
        return originalUsername || null;
    }

    return null;
}

function activeSbjktButton(button: HTMLElement, addresses: string[] | undefined) {
    if ((addresses?.length ?? 0) > 0) {
        button.style.display = "flex";

        // On Click.
        button.addEventListener('click', () => {
            window.open(`https://objkt.com/users/${addresses![0]}`); //JUST TESTING! We should go to sbjkt.
        });
    }
}

function addSbjktButton() {
    const bookmarkButtons = document.querySelectorAll('[data-testid="bookmark"]');

    bookmarkButtons.forEach(bookmarkButton => {
        if (bookmarkButton?.parentElement === null) { return; }
        if (bookmarkButton.parentElement.querySelector('.sbjkt-button')) { return; } //Already added.

        const xUser = getXUsername(bookmarkButton);
        if (xUser == null) { return; }

        // Generate button.
        const purpleButton = document.createElement('button');
        purpleButton.className = 'sbjkt-button';
        purpleButton.style.background = "none";
        purpleButton.style.border = "none";
        purpleButton.style.marginRight = "18px";
        purpleButton.style.cursor = "pointer";
        purpleButton.style.padding = "0";
        purpleButton.style.width = "16px";
        purpleButton.style.height = "20px";
        purpleButton.innerHTML = sbjktIcon;
        purpleButton.style.display = "none";

        // Insert.
        bookmarkButton?.parentElement.insertBefore(purpleButton, bookmarkButton);

        if (xUserCache.has(xUser)) {
            activeSbjktButton(purpleButton, xUserCache.get(xUser));
        } else {
            objkt.GetXUserTezosAddresses(xUser).then(x => x)
                .then((addresses) => {
                    if (!xUserCache.has(xUser)) {
                        xUserCache.set(xUser, addresses);
                    }

                    if (addresses.length != 0) {
                        purpleButton.style.display = "flex";

                        // On Click.
                        purpleButton.addEventListener('click', () => {
                            window.open(`https://objkt.com/users/${addresses[0]}`); //JUST TESTING! We should go to sbjkt.
                        });
                    }
                });
        }
    });
}

// Observer
const observer = new MutationObserver(addSbjktButton);
observer.observe(document.body, { childList: true, subtree: true });
addSbjktButton();