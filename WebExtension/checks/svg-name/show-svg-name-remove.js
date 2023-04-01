function removeInjectedAccessibleNames() {
    const injectedAccessibleNames = document.querySelectorAll('.non-imgRole-8228965, .svg--nodecorative-noname-882726654, .svg--hasName-882726654');
    injectedAccessibleNames.forEach((accessibleNameDiv) => {
        accessibleNameDiv.remove();
    });
}

removeInjectedAccessibleNames();