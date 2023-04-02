function createMessageDiv(messageClass, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(messageClass);
  const messageText = document.createTextNode(message);
  messageDiv.append(messageText);
  return messageDiv;
}

function showDecorativeImages() {
  const imgElements = document.querySelectorAll("img");
  const ariaHiddenMessageClass = "aria-hidden-message-8892664";
  const presentationRoleMessageClass = "presentation-role-message-8892664";
  const redundantRoleMessageClass = "redundant-role-message-8892664";
  const decorativeMessageClass = "decorative-message-8892664";

  for (let i = 0; i < imgElements.length; i++) {
      const altText = imgElements[i].alt;
      const ariaHidden = imgElements[i].getAttribute('aria-hidden');
      const role = imgElements[i].getAttribute('role');

      if (ariaHidden === 'true') {
          const message = 'aria-hidden set to true used for decorative image. alt="" is the preferred method.';
          const ariaHiddenMessageDiv = createMessageDiv(ariaHiddenMessageClass, message);
          imgElements[i].after(ariaHiddenMessageDiv);
      } else if (role === 'presentation' || role === 'none') {
          const message = 'presentation role used for decorative image. alt="" is the preferred method.';
          const presentationRoleMessageDiv = createMessageDiv(presentationRoleMessageClass, message);
          imgElements[i].after(presentationRoleMessageDiv);
      } else if (altText === '' && (role || ariaHidden)) {
          const roleMessage = role ? `Role ${role}` : 'aria-hidden set to true';
          const message = `Decorative image. ${roleMessage} can be removed as it is redundant.`;
          const redundantRoleMessageDiv = createMessageDiv(redundantRoleMessageClass, message);
          imgElements[i].after(redundantRoleMessageDiv);
      } else if (altText === '' && !role && !ariaHidden) {
          const message = 'This image is decorative';
          const decorativeMessageDiv = createMessageDiv(decorativeMessageClass, message);
          imgElements[i].after(decorativeMessageDiv);
      }
  }
}

showDecorativeImages();