import { describe, it, expect, beforeEach } from 'vitest'

describe('Dropdown functionality', () => {
  beforeEach(() => {
    // Create the HTML structure that matches what's in zen.md
    document.body.innerHTML = `
      <p>Test paragraph</p>
      <div class="extra-info">Test extra info content</div>
    `

    // Add the CSS that would be applied by Astro
    const style = document.createElement('style')
    style.textContent = `
      .dropdown-toggle {
        color: #c53030;
        cursor: pointer;
        margin-left: 1rem;
        transition: transform 0.3s ease;
        display: inline-block;
      }
      .dropdown-toggle:hover, .dropdown-toggle.open {
        transform: scale(1.25);
      }
      div.extra-info {
        background: #f9f5ef;
        border-left: 3px solid #c53030;
        border-radius: 0 4px 4px 0;
        margin: 0.5rem 0;
        font-size: 0.9rem;
        color: #5d5d5d;
        padding: 0.75rem;
        display: none !important;
      }
      div.extra-info.open {
        display: block !important;
      }
    `
    document.head.appendChild(style)

    // Simulate the actual script behavior from index.astro
    const extraInfos = document.querySelectorAll('.extra-info')
    extraInfos.forEach(div => {
      const prevElement = div.previousElementSibling
      if (!prevElement) return

      const toggle = document.createElement('span')
      toggle.className = 'dropdown-toggle'
      toggle.textContent = '⊙'
      prevElement.appendChild(toggle)

      toggle.addEventListener('click', () => {
        div.classList.toggle('open')
        toggle.classList.toggle('open')
      })
    })
  })

  it('should hide extra-info divs by default', () => {
    const extraInfo = document.querySelector('.extra-info')
    const computedStyle = window.getComputedStyle(extraInfo)
    expect(computedStyle.display).toBe('none')
  })

  it('should add toggle button to previous element', () => {
    const paragraph = document.querySelector('p')
    const toggle = paragraph.querySelector('.dropdown-toggle')
    expect(toggle).toBeTruthy()
    expect(toggle.textContent).toBe('⊙')
    expect(toggle.className).toBe('dropdown-toggle')
  })

  it('should toggle visibility when clicked', () => {
    const toggle = document.querySelector('.dropdown-toggle')
    const extraInfo = document.querySelector('.extra-info')

    // Initially hidden
    expect(extraInfo.classList.contains('open')).toBe(false)

    // Click to open
    toggle.click()
    expect(extraInfo.classList.contains('open')).toBe(true)

    // Click to close
    toggle.click()
    expect(extraInfo.classList.contains('open')).toBe(false)
  })

  it('should apply open class to toggle when clicked', () => {
    const toggle = document.querySelector('.dropdown-toggle')

    // Initially not open
    expect(toggle.classList.contains('open')).toBe(false)

    // Click to open
    toggle.click()
    expect(toggle.classList.contains('open')).toBe(true)

    // Click to close
    toggle.click()
    expect(toggle.classList.contains('open')).toBe(false)
  })
})
