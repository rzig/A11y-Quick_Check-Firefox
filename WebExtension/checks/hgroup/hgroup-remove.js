function removeHGroupMessages() {
  const messages = document.querySelectorAll(".html-hgroup-message, .aria-hgroup-message");
  messages.forEach((message) => message.remove());
  
  const hgroups = document.querySelectorAll("hgroup");
  hgroups.forEach((hgroup) => hgroup.style.border = "");
}

removeHGroupMessages();
