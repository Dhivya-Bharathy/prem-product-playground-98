import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

export class WebScrapingService {
  constructor() {
    this.browser = null;
    this.defaultTimeout = 15000; // 15 seconds
    this.defaultViewport = { width: 1920, height: 1080 };
  }

  async initBrowser() {
    if (!this.browser) {
      console.log('🚀 Launching Puppeteer browser...');
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--single-process'
        ],
        executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium'
      });
    }
    return this.browser;
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async scrapeWebsite(url) {
    const startTime = Date.now();
    let page = null;

    try {
      const browser = await this.initBrowser();
      page = await browser.newPage();

      // Set viewport and user agent
      await page.setViewport(this.defaultViewport);
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

      // Set request interception to block unnecessary resources
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const resourceType = req.resourceType();
        if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
          req.abort();
        } else {
          req.continue();
        }
      });

      console.log(`📄 Navigating to: ${url}`);
      
      // Navigate to the website with more tolerant settings
      const response = await page.goto(url, {
        waitUntil: 'domcontentloaded', // More tolerant than networkidle0
        timeout: this.defaultTimeout
      });

      if (!response.ok()) {
        throw new Error(`HTTP ${response.status()}: ${response.statusText()}`);
      }

      // Wait briefly for dynamic content
      await page.waitForTimeout(1000);

      // Get page content and metadata
      const [html, title, screenshot] = await Promise.all([
        page.content(),
        page.title(),
        page.screenshot({
          encoding: 'base64',
          type: 'png',
          clip: { x: 0, y: 0, width: 1200, height: 800 }
        })
      ]);

      console.log('🔍 Extracting page elements...');

      // Parse HTML with Cheerio
      const $ = cheerio.load(html);

      // Extract various elements for analysis
      const extractedData = {
        url,
        title,
        screenshot: `data:image/png;base64,${screenshot}`,
        html: html.substring(0, 50000), // Limit HTML size
        
        // Text content
        bodyText: $('body').text().trim().substring(0, 10000),
        
        // Forms and inputs
        forms: this.extractForms($),
        
        // Buttons and links
        buttons: this.extractButtons($),
        links: this.extractLinks($),
        
        // Modal and popup indicators
        modals: this.extractModals($),
        
        // Privacy-related elements
        privacyElements: this.extractPrivacyElements($),
        
        // Cookie notices
        cookieNotices: this.extractCookieNotices($),
        
        // Subscription/signup elements
        subscriptionElements: this.extractSubscriptionElements($),
        
        // Pricing and urgency elements
        pricingElements: this.extractPricingElements($),
        
        // Social proof elements
        socialProofElements: this.extractSocialProofElements($),
        
        // Accessibility indicators
        accessibilityElements: this.extractAccessibilityElements($),
        
        // Meta information
        meta: {
          description: $('meta[name="description"]').attr('content') || '',
          keywords: $('meta[name="keywords"]').attr('content') || '',
          viewport: $('meta[name="viewport"]').attr('content') || '',
          charset: $('meta[charset]').attr('charset') || '',
        },
        
        // Performance data
        loadTime: Date.now() - startTime
      };

      console.log(`✅ Successfully scraped: ${url} (${extractedData.loadTime}ms)`);

      return {
        success: true,
        data: extractedData,
        performance: {
          scraping_time_ms: Date.now() - startTime
        }
      };

    } catch (error) {
      console.error(`❌ Scraping failed for ${url}:`, error.message);
      return {
        success: false,
        error: error.message,
        performance: {
          scraping_time_ms: Date.now() - startTime
        }
      };
    } finally {
      if (page) {
        await page.close();
      }
    }
  }

  extractForms($) {
    const forms = [];
    $('form').each((i, form) => {
      const $form = $(form);
      forms.push({
        action: $form.attr('action') || '',
        method: $form.attr('method') || 'get',
        inputs: $form.find('input').map((j, input) => {
          const $input = $(input);
          return {
            type: $input.attr('type') || 'text',
            name: $input.attr('name') || '',
            placeholder: $input.attr('placeholder') || '',
            required: $input.attr('required') !== undefined,
            checked: $input.attr('checked') !== undefined
          };
        }).get(),
        submitText: $form.find('button[type="submit"], input[type="submit"]').text() || $form.find('button[type="submit"], input[type="submit"]').attr('value') || ''
      });
    });
    return forms;
  }

  extractButtons($) {
    const buttons = [];
    $('button, input[type="submit"], input[type="button"], .btn, [role="button"]').each((i, button) => {
      const $button = $(button);
      const text = $button.text().trim() || $button.attr('value') || '';
      if (text) {
        buttons.push({
          text,
          type: $button.attr('type') || '',
          class: $button.attr('class') || '',
          onclick: $button.attr('onclick') || ''
        });
      }
    });
    return buttons;
  }

  extractLinks($) {
    const links = [];
    $('a').each((i, link) => {
      const $link = $(link);
      const href = $link.attr('href');
      const text = $link.text().trim();
      if (href && text) {
        links.push({
          href,
          text,
          external: href.startsWith('http') && !href.includes(new URL(href).hostname)
        });
      }
    });
    return links;
  }

  extractModals($) {
    const selectors = [
      '.modal', '.popup', '.overlay', '.lightbox',
      '[role="dialog"]', '[aria-modal="true"]',
      '.modal-backdrop', '.modal-overlay'
    ];
    
    return selectors.map(selector => {
      const elements = $(selector);
      return {
        selector,
        count: elements.length,
        hasDisplayNone: elements.filter('[style*="display: none"]').length
      };
    }).filter(item => item.count > 0);
  }

  extractPrivacyElements($) {
    const privacyKeywords = ['privacy', 'cookie', 'consent', 'gdpr', 'data protection', 'terms'];
    const elements = [];
    
    privacyKeywords.forEach(keyword => {
      $(`*:contains("${keyword}")`).each((i, el) => {
        const $el = $(el);
        if ($el.children().length === 0) { // Only leaf nodes
          elements.push({
            keyword,
            text: $el.text().trim(),
            tag: el.tagName.toLowerCase()
          });
        }
      });
    });
    
    return elements.slice(0, 20); // Limit results
  }

  extractCookieNotices($) {
    const cookieSelectors = [
      '*[class*="cookie"]', '*[id*="cookie"]',
      '*[class*="consent"]', '*[id*="consent"]',
      '*[class*="gdpr"]', '*[id*="gdpr"]'
    ];
    
    const notices = [];
    cookieSelectors.forEach(selector => {
      $(selector).each((i, el) => {
        const $el = $(el);
        notices.push({
          selector,
          text: $el.text().trim().substring(0, 500),
          hasStyle: $el.attr('style') || 'none'
        });
      });
    });
    
    return notices;
  }

  extractSubscriptionElements($) {
    const subscriptionKeywords = ['subscribe', 'newsletter', 'signup', 'sign up', 'join', 'free trial'];
    const elements = [];
    
    subscriptionKeywords.forEach(keyword => {
      $(`*:contains("${keyword}")`).each((i, el) => {
        const $el = $(el);
        if (['button', 'input', 'a'].includes(el.tagName.toLowerCase())) {
          elements.push({
            keyword,
            text: $el.text().trim(),
            tag: el.tagName.toLowerCase(),
            type: $el.attr('type') || ''
          });
        }
      });
    });
    
    return elements.slice(0, 10);
  }

  extractPricingElements($) {
    const pricingPatterns = [
      /\$\d+/g, /€\d+/g, /£\d+/g,
      /\d+\s*(dollars?|euros?|pounds?)/gi,
      /(free|trial|limited time|hurry|expires?|only \d+ left)/gi
    ];
    
    const elements = [];
    const text = $('body').text();
    
    pricingPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        elements.push(...matches.slice(0, 5));
      }
    });
    
    return [...new Set(elements)]; // Remove duplicates
  }

  extractSocialProofElements($) {
    const socialProofKeywords = [
      'customers', 'users', 'reviews', 'testimonials', 'ratings',
      'trusted by', 'join', 'popular', 'bestseller', 'recommended'
    ];
    
    const elements = [];
    socialProofKeywords.forEach(keyword => {
      $(`*:contains("${keyword}")`).each((i, el) => {
        const $el = $(el);
        if ($el.children().length === 0) {
          const text = $el.text().trim();
          if (text.length < 200) {
            elements.push({
              keyword,
              text,
              tag: el.tagName.toLowerCase()
            });
          }
        }
      });
    });
    
    return elements.slice(0, 15);
  }

  extractAccessibilityElements($) {
    return {
      altTexts: $('img[alt]').length,
      missingAltTexts: $('img:not([alt])').length,
      ariaLabels: $('[aria-label]').length,
      headingStructure: {
        h1: $('h1').length,
        h2: $('h2').length,
        h3: $('h3').length,
        h4: $('h4').length,
        h5: $('h5').length,
        h6: $('h6').length
      },
      focusableElements: $('button, input, select, textarea, a[href]').length,
      skipLinks: $('a[href^="#skip"]').length
    };
  }
}

// Singleton instance
export const webScrapingService = new WebScrapingService(); 