import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PeerEndorsements = ({ endorsements, testimonials, onWriteTestimonial }) => {
  const [selectedTab, setSelectedTab] = useState('endorsements');
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  const displayedTestimonials = showAllTestimonials 
    ? testimonials 
    : testimonials?.slice(0, 3);

  const getEndorsementIcon = (type) => {
    switch (type) {
      case 'technical': return 'Code';
      case 'leadership': return 'Users';
      case 'communication': return 'MessageSquare';
      case 'creativity': return 'Lightbulb';
      case 'reliability': return 'Shield';
      default: return 'ThumbsUp';
    }
  };

  const getEndorsementColor = (type) => {
    switch (type) {
      case 'technical': return 'bg-primary/10 text-primary border-primary/20';
      case 'leadership': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'communication': return 'bg-accent/10 text-accent border-accent/20';
      case 'creativity': return 'bg-success/10 text-success border-success/20';
      case 'reliability': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-brand border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Peer Recognition</h2>
            <p className="text-gray-600">
              Endorsements and testimonials from collaborators
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="MessageSquare"
            iconPosition="left"
            onClick={onWriteTestimonial}
          >
            Write Testimonial
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setSelectedTab('endorsements')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              selectedTab === 'endorsements'
                ? 'bg-white text-gray-900 shadow-sm' :'text-gray-600 hover:text-gray-900'
            }`}
          >
            Skill Endorsements
          </button>
          <button
            onClick={() => setSelectedTab('testimonials')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              selectedTab === 'testimonials' ?'bg-white text-gray-900 shadow-sm' :'text-gray-600 hover:text-gray-900'
            }`}
          >
            Testimonials
          </button>
        </div>
      </div>
      <div className="p-6">
        {selectedTab === 'endorsements' ? (
          <div>
            {/* Endorsement Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {endorsements?.map((category) => (
                <div
                  key={category?.type}
                  className={`p-4 rounded-lg border-2 ${getEndorsementColor(category?.type)}`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon name={getEndorsementIcon(category?.type)} size={20} />
                    <div>
                      <h3 className="font-semibold capitalize">{category?.type}</h3>
                      <p className="text-sm opacity-80">{category?.count} endorsements</p>
                    </div>
                  </div>
                  
                  {/* Recent Endorsers */}
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {category?.recentEndorsers?.slice(0, 4)?.map((endorser, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                          title={endorser?.name}
                        >
                          <Image
                            src={endorser?.avatar}
                            alt={endorser?.avatarAlt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {category?.recentEndorsers?.length > 4 && (
                        <div className="w-6 h-6 rounded-full border-2 border-white bg-white flex items-center justify-center">
                          <span className="text-xs font-medium">+{category?.recentEndorsers?.length - 4}</span>
                        </div>
                      )}
                    </div>
                    {category?.recentEndorsers?.length > 0 && (
                      <span className="text-xs opacity-70">
                        and {category?.count - category?.recentEndorsers?.length} others
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Top Endorsers */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Endorsers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {endorsements?.flatMap(category => category?.recentEndorsers)?.slice(0, 6)?.map((endorser, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={endorser?.avatar}
                          alt={endorser?.avatarAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900">{endorser?.name}</h4>
                        <p className="text-sm text-gray-600 truncate">{endorser?.title}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {endorser?.endorsementCount} endorsements
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Testimonials */}
            <div className="space-y-6">
              {displayedTestimonials?.map((testimonial) => (
                <div key={testimonial?.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial?.author?.avatar}
                        alt={testimonial?.author?.avatarAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial?.author?.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial?.author?.title}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)]?.map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={16}
                              className={i < testimonial?.rating ? 'text-accent fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <blockquote className="text-gray-700 mb-3 italic">
                        "{testimonial?.content}"
                      </blockquote>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Project: {testimonial?.project}</span>
                          <span>{testimonial?.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <Icon name="ThumbsUp" size={16} />
                          </button>
                          <span className="text-sm text-gray-500">{testimonial?.helpful}</span>
                        </div>
                      </div>
                      
                      {testimonial?.skills && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {testimonial?.skills?.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {testimonials?.length > 3 && (
              <div className="text-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowAllTestimonials(!showAllTestimonials)}
                  iconName={showAllTestimonials ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                >
                  {showAllTestimonials 
                    ? "Show Less" 
                    : `Show ${testimonials?.length - 3} More Testimonials`
                  }
                </Button>
              </div>
            )}

            {testimonials?.length === 0 && (
              <div className="text-center py-8">
                <Icon name="MessageSquare" size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
                <p className="text-gray-600 mb-4">
                  Start collaborating on projects to receive testimonials from your peers
                </p>
                <Button
                  variant="outline"
                  iconName="Users"
                  iconPosition="left"
                >
                  Find Collaborations
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerEndorsements;