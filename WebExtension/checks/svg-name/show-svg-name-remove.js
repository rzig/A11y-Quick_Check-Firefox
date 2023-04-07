function removeInjectedDivsByClass(className) {
    const injectedDivs = document.querySelectorAll(`.${className}`);
    injectedDivs.forEach((injectedDiv) => {
      injectedDiv.remove();
    });
  }
  
  function removeInjectedDivs() {
    const injectedDivClasses = [
      'non-imgRole-8228965',
      'svg--nodecorative-noname-882726654',
      'svg--hasName-882726654'
    ];
  
    injectedDivClasses.forEach((className) => {
      removeInjectedDivsByClass(className);
    });
  }
  
  removeInjectedDivs();
  