function removeHGroupMessages() {
  const messages = document.querySelectorAll(".html-hgroup-message-58997365, .aria-hgroup-message-58997365");
  messages.forEach((message) => message.remove());
  
  const hgroups = document.querySelectorAll("hgroup");
  hgroups.forEach((hgroup) => hgroup.classList.remove("hgroup-58997365"));
}

removeHGroupMessages();
