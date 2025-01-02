// ==UserScript==
// @name         Leetcode editor tab 2 spaces
// @namespace    http://tampermonkey.net/
// @version      2025-01-01
// @description  Set leetcode editor tab to 2 spaces
// @author       onescriptkid
// @match        https://leetcode.com/problems/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

// Match examples
// https://leetcode.com/problems/*/*
// https://leetcode.com/problems/two-sum/description/
// https://leetcode.com/problems/two-sum/solutions/

// Toggle Leetcode editor spaces
async function toggleLeetCodeEditor() {

  // Wait for dom elements to load (error prone / jank)
  const wait = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res()
      }, 100)
    })
  }


  // Click settings icon
  await wait()
  const settingsButton = document.getElementById('nav-setting-btn')
  if (!settingsButton) console.error('Unable to click settings button')
  settingsButton?.click()

  // Click "Code Editor" tab button
  await wait()
  const tabs = document.querySelectorAll('button.relative.inline-flex.items-center.text-sm.font-medium')
  const codeEditorTab = tabs?.[1]
  if (!codeEditorTab) console.error('Unable to click codeEditorTab')
  codeEditorTab?.click()

  // Click tab size toggle
  await wait()
  let mostButtons = document.querySelectorAll('button.flex.cursor-pointer.items-center.rounded.text-left')
  let tabSizeToggle = undefined
  for (let i = 0; i < mostButtons.length; i++) {
    const button = mostButtons[i]
    if (button.textContent === '2 spaces' || button.textContent === '4 spaces') {
      tabSizeToggle = button
      break;
    }
  }
  if (!tabSizeToggle) console.error('Unable to click tabSize toggle')
  tabSizeToggle?.click()

  // Click tab size 4 spaces option
  await wait()
  let options = document.querySelectorAll('li.relative > div > div')
  const tabSizeOption4Spaces = options?.[0]
  if (!tabSizeOption4Spaces) console.error('Unable to click 4 spaces option')
  tabSizeOption4Spaces?.click()

  // Reopen tab size toggle
  await wait()
  mostButtons = document.querySelectorAll('button.flex.cursor-pointer.items-center.rounded.text-left')
  tabSizeToggle = undefined
  for (let i = 0; i < mostButtons.length; i++) {
    const button = mostButtons[i]
    if (button.textContent === '2 spaces' || button.textContent === '4 spaces') {
      tabSizeToggle = button
      break;
    }
  }
  if (!tabSizeToggle) console.error('Unable to reopen tabSize toggle')
  tabSizeToggle?.click()

  // Click tab size 2 spaces option
  await wait()
  options = document.querySelectorAll('li.relative > div > div')
  const tabSizeOption2Spaces = options?.[1]
  if (!tabSizeOption2Spaces) console.error('Unable to click 2 spaces option')
  tabSizeOption2Spaces?.click()

  // Close modal
  await wait()
  const closeButton = document.querySelector('.ring-offset-sd-background')
  if (!closeButton) console.error('Unable to click closeButton')
  closeButton?.click()

  // Success
  console.log('Toggled editor to 2 spaces')

}

toggleLeetCodeEditor()