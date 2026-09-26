document.addEventListener('DOMContentLoaded', async () => {
  const status = document.getElementById('status');
  const fields = ['githubToken', 'bookmarkRepo', 'bookmarkFile'];

  // Load saved settings
  const saved = await chrome.storage.sync.get({
    githubToken: '',
    bookmarkRepo: 'Shutupmilo/github-bookmarks',
    bookmarkFile: 'BOOKMARKS.json'
  });

  fields.forEach((key) => {
    const el = document.getElementById(key);
    if (el) el.value = saved[key];
  });

  document.getElementById('saveSettings').addEventListener('click', async () => {
    const settings = {
      githubToken: document.getElementById('githubToken').value.trim(),
      bookmarkRepo: document.getElementById('bookmarkRepo').value.trim(),
      bookmarkFile: document.getElementById('bookmarkFile').value.trim() || 'BOOKMARKS.json'
    };

    if (!settings.githubToken || !settings.bookmarkRepo) {
      alert('Token and repository are required.');
      return;
    }

    await chrome.storage.sync.set(settings);

    // Visual feedback
    status.classList.add('visible');
    setTimeout(() => status.classList.remove('visible'), 2000);
  });
});
