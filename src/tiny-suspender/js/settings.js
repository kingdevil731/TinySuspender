
let initSettings = () => {
  chrome.storage.sync.get(['idleTimeMinutes', 'whitelist', 'autorestore', 'skip_audible', 'enable_tab_discard'], (items) => {
    let idleTimeMinutes = parseInt(items.idleTimeMinutes);
    if (isNaN(idleTimeMinutes)) {
      idleTimeMinutes = 30;
    }

    document.querySelector('#config input[name=idle_time]').value = idleTimeMinutes;

    let whitelist = items.whitelist;
    if (!whitelist) {
      whitelist = '';
    }
    document.querySelector('#config textarea[name=whitelist]').value = whitelist;

    if (items.autorestore) {
      document.querySelector('#config input[name=autorestore]').setAttribute('checked', 'checked');
    }
    else {
      document.querySelector('#config input[name=autorestore]').removeAttribute('checked');
    }

    if (items.skip_audible) {
      document.querySelector('#config input[name=skip_audible]').setAttribute('checked', 'checked');
    }
    else {
      document.querySelector('#config input[name=skip_audible]').removeAttribute('checked');
    }

    if (items.enable_tab_discard) {
      document.querySelector('#config input[name=enable_tab_discard]').setAttribute('checked', 'checked');
    }
    else {
      document.querySelector('#config input[name=enable_tab_discard]').removeAttribute('checked');
    }
  });
}


let onSettingsSubmit = (e) => {
  e.preventDefault();

  let idleTimeMinutes = parseInt(document.querySelector('#config input[name=idle_time]').value);
  if (isNaN(idleTimeMinutes)) return;

  idleTimeMinutes = idleTimeMinutes;

  let whitelist = document.querySelector('#config textarea[name=whitelist]').value;
  if (!whitelist) whitelist = '';

  let autorestore = document.querySelector('#config input[name=autorestore]').checked;
  let skip_audible = document.querySelector('#config input[name=skip_audible]').checked;
  let enable_tab_discard = document.querySelector('#config input[name=enable_tab_discard]').checked;

  chrome.storage.sync.set({
    'idleTimeMinutes': idleTimeMinutes,
    'whitelist': whitelist,
    'autorestore': autorestore,
    'skip_audible': skip_audible,
    'enable_tab_discard': enable_tab_discard
  }, () => {
    document.querySelector('#message').textContent = 'Setting saved!';
    document.querySelector('#message2').textContent = 'Setting saved!';
  });
}


document.querySelector('#config').onsubmit = onSettingsSubmit;
initSettings();