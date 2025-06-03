// Listen for clicks on menu buttons - e.g. "Show more actions for codespace"
document.addEventListener('click', (event) => {
  const button = event.target.closest('button[aria-haspopup="true"], button[aria-haspopup="menu"]');
  if (!button) return;
  
  // Wait for menu to appear
  setTimeout(() => {
    // Try to find menu by aria-controls
    const menuId = button.getAttribute('aria-controls');
    if (menuId) {
      const menu = document.getElementById(menuId);
      if (menu) {
        addInsidersOption(menu);
      }
    }
  }, 50);
}, true);

function addInsidersOption(menu) {
  // Find the existing VS Code link
  const vsCodeLink = menu.querySelector('a[href*="editor=vscode"]');
  if (!vsCodeLink) return;
  
  // Check if we already added the Insiders option
  if (menu.querySelector('a[href*="editor=vscode-insiders"]')) return;
  
  // Clone the VS Code menu item
  const vsCodeItem = vsCodeLink.closest('li');
  const insidersItem = vsCodeItem.cloneNode(true);
  
  // Update the link to insiders version
  const insidersLink = insidersItem.querySelector('a');
  insidersLink.href = insidersLink.href.replace('editor=vscode', 'editor=vscode-insiders');
  insidersLink.id = insidersLink.id + '-insiders';
  
  // Update the label
  const label = insidersItem.querySelector('.ActionListItem-label');
  if (label) {
    label.textContent = 'Open in Visual Studio Code – Insiders';
  }
  
  // Insert after the original VS Code item
  vsCodeItem.after(insidersItem);
}