"use strict";
const sbjktIcon = `
<svg viewBox="0 0 248 248" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin:auto;">
    <rect width="248" height="248" rx="124" fill="#8C89FF"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M103.16 132.89C103.16 132.89 103.159 132.89 103.159 132.89C91.5818 144.468 91.5818 163.239 103.159 174.816C114.737 186.394 133.508 186.394 145.085 174.816C156.663 163.239 156.663 144.468 145.085 132.89C145.085 132.89 145.085 132.89 145.085 132.89L132.994 144.981C128.094 149.881 120.15 149.881 115.251 144.981L103.16 132.89Z" fill="#121212"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M186.118 133.052C186.173 132.998 186.227 132.944 186.282 132.889C197.859 121.312 197.859 102.541 186.282 90.963C174.704 79.3855 155.933 79.3855 144.356 90.9631C132.778 102.541 132.778 121.312 144.356 132.889C144.4 132.933 144.444 132.977 144.488 133.02L144.356 132.888L156.447 120.796C161.347 115.897 169.29 115.897 174.19 120.796L186.282 132.888L186.118 133.052Z" fill="#121212"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M103.762 133.016C103.804 132.974 103.847 132.932 103.889 132.889C115.467 121.312 115.467 102.541 103.889 90.963C92.3116 79.3855 73.5406 79.3855 61.9631 90.9631C50.3855 102.541 50.3855 121.312 61.9631 132.889C62.0186 132.945 62.0743 133 62.1302 133.055L61.9633 132.888L74.0551 120.796C78.9546 115.897 86.8982 115.897 91.7976 120.796L103.889 132.888L103.762 133.016Z" fill="#121212"/>
</svg>
`;
function addSbjktButton() {
    const bookmarkButtons = document.querySelectorAll('[data-testid="bookmark"]');
    bookmarkButtons.forEach(bookmarkButton => {
        if ((bookmarkButton === null || bookmarkButton === void 0 ? void 0 : bookmarkButton.parentElement) === null) {
            return;
        }
        if (bookmarkButton.parentElement.querySelector('.sbjkt-button')) {
            return;
        } //Already added.
        // Generate button.
        const purpleButton = document.createElement('button');
        purpleButton.className = 'sbjkt-button';
        purpleButton.style.display = "flex";
        purpleButton.style.background = "none";
        purpleButton.style.border = "none";
        purpleButton.style.marginRight = "18px";
        purpleButton.style.cursor = "pointer";
        purpleButton.style.padding = "0";
        purpleButton.style.width = "16px";
        purpleButton.style.height = "20px";
        purpleButton.innerHTML = sbjktIcon;
        // On Click.
        purpleButton.addEventListener('click', () => {
            alert('SBJKT!!!');
        });
        // Insert.
        bookmarkButton === null || bookmarkButton === void 0 ? void 0 : bookmarkButton.parentElement.insertBefore(purpleButton, bookmarkButton);
    });
}
// Observer
const observer = new MutationObserver(addSbjktButton);
observer.observe(document.body, { childList: true, subtree: true });
addSbjktButton();
