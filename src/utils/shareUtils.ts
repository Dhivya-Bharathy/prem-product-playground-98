export interface ShareData {
  title: string;
  text: string;
  url: string;
  hashtags?: string[];
}

export interface ShareOptions {
  platforms?: ('native' | 'twitter' | 'linkedin' | 'facebook' | 'email' | 'copy')[];
  fallbackToCopy?: boolean;
}

class ShareUtils {
  /**
   * Share content using the Web Share API with fallbacks
   */
  async share(data: ShareData, options: ShareOptions = {}): Promise<boolean> {
    const { platforms = ['native'], fallbackToCopy = true } = options;

    // Try native sharing first if available
    if (platforms.includes('native') && navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          text: data.text,
          url: data.url
        });
        return true;
      } catch (error) {
        console.log('Native sharing failed, trying platform-specific methods');
      }
    }

    // Try platform-specific sharing
    for (const platform of platforms) {
      if (platform === 'native') continue;
      
      const success = await this.shareToPlatform(data, platform);
      if (success) return true;
    }

    // Fallback to copy to clipboard
    if (fallbackToCopy) {
      return await this.copyToClipboard(data);
    }

    return false;
  }

  /**
   * Share to specific platform
   */
  private async shareToPlatform(data: ShareData, platform: string): Promise<boolean> {
    try {
      switch (platform) {
        case 'twitter':
          return this.shareToTwitter(data);
        case 'linkedin':
          return this.shareToLinkedIn(data);
        case 'facebook':
          return this.shareToFacebook(data);
        case 'email':
          return this.shareViaEmail(data);
        case 'copy':
          return await this.copyToClipboard(data);
        default:
          return false;
      }
    } catch (error) {
      console.error(`Error sharing to ${platform}:`, error);
      return false;
    }
  }

  /**
   * Share to Twitter/X
   */
  private shareToTwitter(data: ShareData): boolean {
    const hashtags = data.hashtags ? data.hashtags.map(tag => `#${tag}`).join(' ') : '';
    const text = `${data.text} ${hashtags}`.trim();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(data.url)}`;
    
    window.open(url, '_blank', 'width=600,height=400');
    return true;
  }

  /**
   * Share to LinkedIn
   */
  private shareToLinkedIn(data: ShareData): boolean {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.url)}&title=${encodeURIComponent(data.title)}&summary=${encodeURIComponent(data.text)}`;
    
    window.open(url, '_blank', 'width=600,height=400');
    return true;
  }

  /**
   * Share to Facebook
   */
  private shareToFacebook(data: ShareData): boolean {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}&quote=${encodeURIComponent(data.text)}`;
    
    window.open(url, '_blank', 'width=600,height=400');
    return true;
  }

  /**
   * Share via email
   */
  private shareViaEmail(data: ShareData): boolean {
    const subject = encodeURIComponent(data.title);
    const body = encodeURIComponent(`${data.text}\n\n${data.url}`);
    const url = `mailto:?subject=${subject}&body=${body}`;
    
    window.location.href = url;
    return true;
  }

  /**
   * Copy to clipboard
   */
  private async copyToClipboard(data: ShareData): Promise<boolean> {
    try {
      const text = `${data.title}\n\n${data.text}\n\n${data.url}`;
      
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      return true;
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return false;
    }
  }

  /**
   * Generate share data for different content types
   */
  generateShareData(type: 'tool' | 'result' | 'content', data: any): ShareData {
    const baseUrl = window.location.origin;
    
    switch (type) {
      case 'tool':
        return {
          title: `Check out this ${data.toolName} by Prem Pradeep`,
          text: `I just discovered this amazing ${data.toolName} tool for product managers. It's helping me ${data.benefit}.`,
          url: `${baseUrl}${data.path}`,
          hashtags: ['ProductManagement', 'ProductTools', 'PremPradeep']
        };
      
      case 'result':
        return {
          title: `My ${data.assessmentName} Results`,
          text: `Just completed the ${data.assessmentName} assessment. My result: ${data.result}. Discover yours!`,
          url: `${baseUrl}${data.path}`,
          hashtags: ['ProductManagement', 'Assessment', 'Results']
        };
      
      case 'content':
        return {
          title: data.title || 'Great content from Prem Pradeep',
          text: data.description || 'Check out this valuable content for product managers.',
          url: data.url || baseUrl,
          hashtags: data.hashtags || ['ProductManagement', 'Content']
        };
      
      default:
        return {
          title: 'Product Management Tools by Prem Pradeep',
          text: 'Discover amazing tools and frameworks for product excellence.',
          url: baseUrl,
          hashtags: ['ProductManagement', 'Tools', 'PremPradeep']
        };
    }
  }

  /**
   * Get available sharing platforms
   */
  getAvailablePlatforms(): string[] {
    const platforms = ['copy', 'email'];
    
    // Check for native sharing
    if (navigator.share) {
      platforms.unshift('native');
    }
    
    // Always available web platforms
    platforms.push('twitter', 'linkedin', 'facebook');
    
    return platforms;
  }

  /**
   * Create a share button component data
   */
  createShareButtonData(data: ShareData, options: ShareOptions = {}) {
    return {
      onClick: () => this.share(data, options),
      platforms: this.getAvailablePlatforms(),
      hasNativeSharing: !!navigator.share
    };
  }
}

export const shareUtils = new ShareUtils();

// Convenience functions for common sharing scenarios
export const shareTool = (toolName: string, path: string, benefit: string) => {
  const data = shareUtils.generateShareData('tool', { toolName, path, benefit });
  return shareUtils.share(data);
};

export const shareResult = (assessmentName: string, result: string, path: string) => {
  const data = shareUtils.generateShareData('result', { assessmentName, result, path });
  return shareUtils.share(data);
};

export const shareContent = (title: string, description: string, url: string, hashtags?: string[]) => {
  const data = shareUtils.generateShareData('content', { title, description, url, hashtags });
  return shareUtils.share(data);
}; 