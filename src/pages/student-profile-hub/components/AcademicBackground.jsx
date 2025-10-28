import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AcademicBackground = ({ education, certifications, achievements }) => {
  const getGradeColor = (grade) => {
    const numGrade = parseFloat(grade);
    if (numGrade >= 3.7) return 'text-success';
    if (numGrade >= 3.0) return 'text-primary';
    if (numGrade >= 2.5) return 'text-warning';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-brand border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Academic Background</h2>
        <p className="text-gray-600">
          Educational journey, certifications, and academic achievements
        </p>
      </div>
      <div className="p-6 space-y-8">
        {/* Education Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Icon name="GraduationCap" size={20} className="mr-2" />
            Education
          </h3>
          <div className="space-y-4">
            {education?.map((edu) => (
              <div key={edu?.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={edu?.logo}
                    alt={edu?.logoAlt}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{edu?.degree}</h4>
                    <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                      {edu?.gpa && (
                        <span className={`font-medium ${getGradeColor(edu?.gpa)}`}>
                          GPA: {edu?.gpa}
                        </span>
                      )}
                      <span className="text-sm text-gray-500">{edu?.period}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{edu?.institution}</p>
                  <p className="text-sm text-gray-500 mb-3">{edu?.location}</p>
                  
                  {edu?.coursework && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Relevant Coursework:</p>
                      <div className="flex flex-wrap gap-2">
                        {edu?.coursework?.map((course, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white text-gray-600 text-xs rounded-md border"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {edu?.honors && edu?.honors?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {edu?.honors?.map((honor, index) => (
                        <div key={index} className="flex items-center space-x-1 text-sm text-success">
                          <Icon name="Award" size={14} />
                          <span>{honor}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Icon name="Award" size={20} className="mr-2" />
            Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications?.map((cert) => (
              <div key={cert?.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-brand transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Image
                      src={cert?.logo}
                      alt={cert?.logoAlt}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1">{cert?.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{cert?.issuer}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{cert?.date}</span>
                      {cert?.credentialUrl && (
                        <a
                          href={cert?.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 text-sm flex items-center space-x-1"
                        >
                          <span>View</span>
                          <Icon name="ExternalLink" size={12} />
                        </a>
                      )}
                    </div>
                    {cert?.skills && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {cert?.skills?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
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
        </div>

        {/* Achievements Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Icon name="Trophy" size={20} className="mr-2" />
            Achievements & Awards
          </h3>
          <div className="space-y-4">
            {achievements?.map((achievement) => (
              <div key={achievement?.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  achievement?.type === 'competition' ? 'bg-accent/10 text-accent' :
                  achievement?.type === 'academic' ? 'bg-primary/10 text-primary' :
                  achievement?.type === 'leadership'? 'bg-secondary/10 text-secondary' : 'bg-success/10 text-success'
                }`}>
                  <Icon 
                    name={
                      achievement?.type === 'competition' ? 'Trophy' :
                      achievement?.type === 'academic' ? 'GraduationCap' :
                      achievement?.type === 'leadership'? 'Users' : 'Award'
                    } 
                    size={20} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{achievement?.title}</h4>
                    <span className="text-sm text-gray-500 mt-1 sm:mt-0">{achievement?.date}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{achievement?.organization}</p>
                  <p className="text-sm text-gray-700 mb-3">{achievement?.description}</p>
                  
                  {achievement?.impact && (
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      {achievement?.impact?.participants && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Users" size={14} />
                          <span>{achievement?.impact?.participants} participants</span>
                        </div>
                      )}
                      {achievement?.impact?.ranking && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Medal" size={14} />
                          <span>{achievement?.impact?.ranking}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicBackground;