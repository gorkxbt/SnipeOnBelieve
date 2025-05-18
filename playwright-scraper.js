// playwright-scraper.js
const { chromium } = require('playwright');

async function scrapeBeliever() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Visit the website
  await page.goto('https://believe.app/', { waitUntil: 'networkidle' });
  
  // Take a full-page screenshot
  await page.screenshot({ path: 'believe-full.png', fullPage: true });
  
  // Extract colors and styles
  const styles = await page.evaluate(() => {
    // Helper to get computed style
    const getStyle = (selector, property) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      return window.getComputedStyle(element).getPropertyValue(property);
    };
    
    // Extract key design elements
    return {
      // Colors
      backgroundColor: getStyle('body', 'background-color'),
      primaryTextColor: getStyle('h1', 'color'),
      secondaryColor: getStyle('.wrapper', 'background-color') || getStyle('main', 'background-color'),
      
      // Typography
      headingFont: getStyle('h1', 'font-family'),
      bodyFont: getStyle('p', 'font-family'),
      headingSize: getStyle('h1', 'font-size'),
      bodySize: getStyle('p', 'font-size'),
      
      // Layout
      containerWidth: getStyle('main', 'max-width'),
      
      // Get all images
      images: Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt,
        width: img.width,
        height: img.height
      })),
      
      // Get button styles
      buttonStyles: {
        backgroundColor: getStyle('button, a.button, .btn', 'background-color'),
        color: getStyle('button, a.button, .btn', 'color'),
        borderRadius: getStyle('button, a.button, .btn', 'border-radius'),
        padding: getStyle('button, a.button, .btn', 'padding'),
      }
    };
  });
  
  console.log('Extracted styles:', JSON.stringify(styles, null, 2));
  
  // Take screenshots of key sections
  await page.screenshot({ path: 'believe-header.png', clip: { x: 0, y: 0, width: 1200, height: 100 } });
  
  // Try to find hero section and screenshot it
  try {
    const heroSection = await page.$('header, .hero, section:first-of-type');
    if (heroSection) {
      const box = await heroSection.boundingBox();
      await page.screenshot({ 
        path: 'believe-hero.png', 
        clip: { x: box.x, y: box.y, width: box.width, height: box.height } 
      });
    }
  } catch (e) {
    console.log('Could not find hero section');
  }
  
  // Get website structure
  const structure = await page.evaluate(() => {
    return {
      sections: Array.from(document.querySelectorAll('section, header, footer')).map(section => ({
        type: section.tagName.toLowerCase(),
        id: section.id,
        className: section.className,
        childrenCount: section.children.length
      })),
      navLinks: Array.from(document.querySelectorAll('nav a')).map(link => ({
        text: link.textContent.trim(),
        href: link.href
      }))
    };
  });
  
  console.log('Website structure:', JSON.stringify(structure, null, 2));
  
  await browser.close();
  console.log('Screenshots saved!');
}

scrapeBeliever().catch(console.error); 