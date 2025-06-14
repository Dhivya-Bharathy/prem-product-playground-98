
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Linkedin, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Get in Touch</h1>
              <p className="text-gray-600">Let's connect and discuss product management</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Prem Pradeep</h2>
            <p className="text-lg text-gray-600">
              Ready to discuss product management, share insights, or explore collaboration opportunities? 
              I'd love to hear from you!
            </p>
          </div>

          <div className="grid gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Email</CardTitle>
                    <CardDescription>Send me a direct message</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  For detailed discussions, project inquiries, or professional opportunities.
                </p>
                <Button asChild className="w-full">
                  <a href="mailto:prempradeep@live.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Email prempradeep@live.com
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Linkedin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">LinkedIn</CardTitle>
                    <CardDescription>Connect on the professional network</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Let's connect and engage in product management discussions within the professional community.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href="https://www.linkedin.com/in/prempradeep/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    Message on LinkedIn
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <div className="p-6 bg-blue-50 rounded-lg">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Let's Discuss</h3>
              <p className="text-gray-600">
                Whether you're looking to improve your product practice, need guidance on specific challenges, 
                or want to share insights from your own experience - I'm always interested in meaningful conversations 
                about product management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
