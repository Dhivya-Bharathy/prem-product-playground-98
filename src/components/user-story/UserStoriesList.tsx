
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Users } from "lucide-react";
import { UserStory } from "@/types/user-story";

interface UserStoriesListProps {
  stories: UserStory[];
  handleDeleteStory: (id: string) => void;
  getPriorityColor: (priority: string) => string;
}

export const UserStoriesList = ({
  stories,
  handleDeleteStory,
  getPriorityColor,
}: UserStoriesListProps) => (
  <>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My User Stories</h2>
        <p className="text-gray-600 text-sm">Your saved user stories and specifications</p>
      </div>
      {stories.length > 0 && (
        <Badge className="bg-blue-100 text-blue-800">
          {stories.length} Stories
        </Badge>
      )}
    </div>
    {stories.length === 0 ? (
      null
    ) : (
      <div className="space-y-4">
        {stories.map((story) => (
          <Card key={story.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-base sm:text-lg text-gray-900 mb-2">
                    "{story.fullStory}"
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className={getPriorityColor(story.priority)}>
                      {story.priority}
                    </Badge>
                    <Badge variant="outline">
                      {story.complexity}
                    </Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteStory(story.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-4">
                <div className="p-2 bg-blue-50 rounded">
                  <strong className="text-blue-700">User:</strong>
                  <p className="text-blue-800 break-words">{story.userType}</p>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <strong className="text-green-700">Goal:</strong>
                  <p className="text-green-800 break-words">{story.goal}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <strong className="text-purple-700">Benefit:</strong>
                  <p className="text-purple-800 break-words">{story.benefit}</p>
                </div>
              </div>
              {story.acceptanceCriteria.length > 0 && (
                <div className="mb-4">
                  <strong className="text-sm text-gray-700">Acceptance Criteria:</strong>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    {story.acceptanceCriteria.map((criteria, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span className="break-words">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {story.notes && (
                <div className="mb-4 p-2 bg-yellow-50 rounded">
                  <strong className="text-sm text-yellow-700">Notes:</strong>
                  <p className="text-sm text-yellow-600 mt-1 break-words">{story.notes}</p>
                </div>
              )}
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Created: {story.createdAt.toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )}
  </>
);
