import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSecureForm } from '@/hooks/useSecureForm';

interface ContactFormProps {
  onSuccess?: () => void;
}

export const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const { validateField, sanitizeField, errors: securityErrors, checkRateLimit } = useSecureForm({
    rateLimitKey: 'contact-form',
    maxLength: 1000
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: sanitizeField(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security validation
    if (!checkRateLimit()) return;
    
    if (!validateField('name', formData.name) || 
        !validateField('email', formData.email, 'email') || 
        !validateField('subject', formData.subject) || 
        !validateField('message', formData.message)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate email sending (replace with actual email service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with your email service (SendGrid, AWS SES, etc.)
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setIsSubmitted(true);
      toast({
        title: "Message Sent! 📧",
        description: "Thank you for reaching out. I'll get back to you within 24 hours."
      });
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Message Failed",
        description: "Unable to send message. Please try again or use the email link below.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for reaching out. I'll review your message and get back to you within 24 hours.
          </p>
          <Button variant="outline" onClick={() => setIsSubmitted(false)}>
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageCircle className="w-5 h-5 text-blue-600" />
          </div>
          Send a Message
        </CardTitle>
        <CardDescription>
          Fill out the form below and I'll get back to you within 24 hours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your full name"
                className={securityErrors.name ? "border-red-500" : ""}
                required
              />
              {securityErrors.name && <p className="text-red-500 text-sm mt-1">{securityErrors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                className={securityErrors.email ? "border-red-500" : ""}
                required
              />
              {securityErrors.email && <p className="text-red-500 text-sm mt-1">{securityErrors.email}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="What would you like to discuss?"
              className={securityErrors.subject ? "border-red-500" : ""}
              required
            />
            {securityErrors.subject && <p className="text-red-500 text-sm mt-1">{securityErrors.subject}</p>}
          </div>
          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell me about your project, questions, or how I can help..."
              rows={5}
              className={securityErrors.message ? "border-red-500" : ""}
              required
            />
            {securityErrors.message && <p className="text-red-500 text-sm mt-1">{securityErrors.message}</p>}
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#22325F] text-white hover:bg-[#1a2547]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
          {securityErrors.rateLimit && (
            <p className="text-red-500 text-sm text-center">{securityErrors.rateLimit}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}; 