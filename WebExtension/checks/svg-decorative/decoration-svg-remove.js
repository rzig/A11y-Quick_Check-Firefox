function removeInjectedMessageDivs() {
    const injectedMessageDivs = document.querySelectorAll('.svg--decorative-8892664, .svg--decorative-with-name-8892664, .svg--nodecorative-noname-8892664');
    injectedMessageDivs.forEach((messageDiv) => {
        messageDiv.remove();
    });
}

removeInjectedMessageDivs();