
import puppeteer from 'puppeteer';

export interface ScrapedData {
  html: string;
  screenshot: string;
  url: string;
  title: string;
  elements: ScrapedElement[];
}

export interface ScrapedElement {
  selector: string;
  text: string;
  tagName: string;
  attributes: Record<string, string>;
  styles: Record<string, string>;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export class WebScrapingService {
  private browser: any = null;

  async initBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });
    }
    return this.browser;
  }

  async scrapeWebsite(url: string): Promise<ScrapedData> {
    const browser = await this.initBrowser();
    const page = await browser.newPage();

    try {
      // Set user agent and viewport
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      await page.setViewport({ width: 1200, height: 800 });

      // Navigate to the page
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      // Wait for dynamic content to load
      await page.waitForTimeout(3000);

      // Get page title
      const title = await page.title();

      // Get full page HTML
      const html = await page.content();

      // Take screenshot
      const screenshot = await page.screenshot({ 
        encoding: 'base64',
        fullPage: true 
      });

      // Extract interactive elements
      const elements = await page.evaluate(() => {
        const extractedElements: any[] = [];
        
        // Selectors for potentially problematic elements
        const selectors = [
          'button', 'a[href]', 'input[type="submit"]', 'input[type="button"]',
          '.btn', '.button', '[role="button"]',
          'form', 'input[type="checkbox"]', 'input[type="radio"]',
          '.modal', '.popup', '.overlay',
          '.price', '.cost', '.fee', '[class*="price"]',
          '.timer', '.countdown', '[class*="urgent"]',
          '.close', '.cancel', '.skip', '.decline',
          '[class*="subscription"]', '[class*="newsletter"]'
        ];

        selectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const styles = window.getComputedStyle(el);
            
            extractedElements.push({
              selector: `${selector}:nth-child(${index + 1})`,
              text: el.textContent?.trim() || '',
              tagName: el.tagName.toLowerCase(),
              attributes: Array.from(el.attributes).reduce((acc, attr) => {
                acc[attr.name] = attr.value;
                return acc;
              }, {} as Record<string, string>),
              styles: {
                fontSize: styles.fontSize,
                color: styles.color,
                backgroundColor: styles.backgroundColor,
                display: styles.display,
                visibility: styles.visibility,
                opacity: styles.opacity,
                zIndex: styles.zIndex
              },
              boundingBox: {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height
              }
            });
          });
        });

        return extractedElements;
      });

      return {
        html,
        screenshot: `data:image/png;base64,${screenshot}`,
        url,
        title,
        elements: elements.filter(el => el.text.length > 0 || el.tagName === 'input')
      };

    } finally {
      await page.close();
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
