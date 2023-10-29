export async function getTabId(): Promise<number> {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  return tab!.id!;
}

export let options = new Map<string, boolean | string>();